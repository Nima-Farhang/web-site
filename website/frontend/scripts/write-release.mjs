import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const commit = process.env.GITHUB_SHA ?? execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
writeFileSync(new URL('../dist/release.json', import.meta.url), JSON.stringify({ commit }) + '\n');
