"""Exercise deployment failure boundaries with fake tools; never contact AWS."""
import json
import os
from pathlib import Path
import subprocess
import shutil
import tempfile
import unittest

REPO_ROOT = Path(__file__).resolve().parents[2]


class DeploymentScriptsTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.directory = Path(self.temp.name)
        self.repo = self.directory / 'repo'
        shutil.copytree(REPO_ROOT / 'scripts', self.repo / 'scripts', ignore=shutil.ignore_patterns('__pycache__'))
        build = self.repo / 'website/frontend/dist'
        build.mkdir(parents=True)
        (build / 'index.html').write_text('<html>fixture</html>')
        (build / 'release.json').write_text('{"commit":"fixture"}')
        self.log = self.directory / 'calls.jsonl'
        tool = self.directory / 'tool'
        tool.write_text('''#!/usr/bin/env python3
import json, os, pathlib, sys
name = pathlib.Path(sys.argv[0]).name
args = sys.argv[1:]
with open(os.environ['TOOL_LOG'], 'a') as stream:
    stream.write(json.dumps({'tool': name, 'args': args, 'data_dir': os.environ.get('TF_DATA_DIR')}) + '\\n')
if name == 'terraform':
    if 'plan' in args and os.environ.get('FAIL_PLAN'):
        sys.exit(1)
    if 'output' in args and '-raw' in args:
        print({'website_bucket_name':'fixture-bucket', 'cloudfront_distribution_id':'FIXTURE', 'website_url':'https://fixture.invalid'}[args[-1]])
if name == 'aws' and 'create-invalidation' in args:
    print('fixture-invalidation')
if name == 'curl':
    target = pathlib.Path(args[args.index('-o') + 1])
    # URL is immediately before -o.
    url = args[args.index('-o') - 1]
    source = pathlib.Path(os.environ['FRONTEND_BUILD']) / ('release.json' if url.endswith('release.json') else 'index.html')
    target.write_bytes(b'wrong release' if os.environ.get('WRONG_RELEASE') and url.endswith('release.json') else source.read_bytes())
''')
        tool.chmod(0o755)
        for name in ('terraform', 'aws', 'curl'):
            (self.directory / name).symlink_to(tool)
        self.env = dict(os.environ, PATH=f'{self.directory}:{os.environ["PATH"]}',
                        TOOL_LOG=str(self.log), APPLY_APPROVE='true',
                        FRONTEND_BUILD=str(build))
        self.env.pop('ENVIRONMENT', None)

    def run_script(self, script, *args, **overrides):
        return subprocess.run(['bash', str(self.repo / 'scripts' / script), *args],
                              cwd=self.directory, env=dict(self.env, **overrides),
                              capture_output=True, text=True)

    def calls(self):
        return [json.loads(line) for line in self.log.read_text().splitlines()] if self.log.exists() else []

    def test_invalid_environment_cannot_invoke_tools(self):
        self.assertNotEqual(self.run_script('deploy_environment.sh', 'dev').returncode, 0)
        self.assertEqual(self.calls(), [])

    def test_failed_plan_cannot_apply(self):
        self.assertNotEqual(self.run_script('deploy_environment.sh', 'test', FAIL_PLAN='1').returncode, 0)
        self.assertFalse(any('apply' in call['args'] for call in self.calls()))

    def test_applies_exact_saved_plan_and_isolates_environment(self):
        result = self.run_script('deploy_environment.sh', ENVIRONMENT='prod')
        self.assertEqual(result.returncode, 0, result.stderr)
        calls = self.calls()
        plan = next(call for call in calls if 'plan' in call['args'])
        apply = next(call for call in calls if 'apply' in call['args'])
        plan_path = next(arg.split('=', 1)[1] for arg in plan['args'] if arg.startswith('-out='))
        self.assertEqual(apply['args'][-1], plan_path)
        self.assertTrue(any(arg.endswith('/environments/prod.tfvars') for arg in plan['args']))
        init = next(call for call in calls if 'init' in call['args'])
        self.assertTrue(any(arg.endswith('/terraform/backend-prod.hcl') for arg in init['args']))
        self.assertTrue(plan['data_dir'].endswith('/.terraform/prod'))
        self.assertNotIn('-auto-approve', apply['args'])

    def test_wrong_deployed_release_fails_verification(self):
        result = self.run_script('deploy_website.sh', 'test', WRONG_RELEASE='1')
        self.assertNotEqual(result.returncode, 0)
        self.assertNotIn('Verified test', result.stdout)

    def test_assets_precede_html_and_invalidation_precedes_verification(self):
        result = self.run_script('deploy_website.sh', 'test')
        self.assertEqual(result.returncode, 0, result.stderr)
        calls = self.calls()
        uploads = [call for call in calls if call['tool'] == 'aws' and call['args'][0] == 's3']
        self.assertEqual(uploads[0]['args'][1], 'sync')
        self.assertTrue(uploads[1]['args'][2].endswith('/index.html'))
        wait = next(i for i, call in enumerate(calls) if 'invalidation-completed' in call['args'])
        first_fetch = next(i for i, call in enumerate(calls) if call['tool'] == 'curl')
        self.assertLess(wait, first_fetch)
        self.assertIn('Verified test', result.stdout)


if __name__ == '__main__':
    unittest.main()
