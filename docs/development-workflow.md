# Development workflow

Work directly on `master` as the sole developer. No branch, pull request, or approval process is required for routine repository work. User instructions in the current task take precedence over earlier documented preferences; update the affected records when they change.

## Record decisions and documentation requests

Whenever the user makes a decision, persist it in repository documentation during the same task. Whenever the user says to document something, write it into the relevant guide or record before finishing. Chat history is context, not the lasting source of truth.

Use an ADR for enduring architecture, infrastructure ownership, environment, security, CI/CD, or development-workflow decisions. Use the nearest guide for routine coding conventions, commands, and operating details. If a decision changes instructions, update the guide as well as the record. Do not create an ADR for every small edit or turn an implementation choice into a supposed user decision.

For a new ADR, allocate the next unused four-digit number and use the [template](adr/template.md). Include status, recording date, decision source, context, decision, consequences, and related documents. Add it to the [index](adr/README.md). Mark suggestions as Proposed until accepted; never imply user approval of unapproved scope. When replacing an accepted decision, keep its history, mark it Superseded, and link it to the replacement. Correct factual mistakes in place without rewriting the history of why a decision was made.

The initial records summarize decisions already made in this repository's setup conversation. Their recording date is not a claim about when deployment happened. Current implementation details are identified separately from explicit user requirements.

## Validate the change

| Change | Relevant checks |
| --- | --- |
| Documentation only | Local Markdown links, consistency with code/ADRs, `git diff --check` |
| Frontend | `./scripts/build_website.sh` |
| Terraform | `./scripts/validate_terraform.sh` |
| Deployment scripts | Bash syntax and `python3 -m unittest discover -s scripts/tests -v` |
| Workflows | Actionlint when available, plus checks for affected scripts/builds |

Live plans or deployment checks may be appropriate for an infrastructure task, but writing documentation or making a local commit does not itself request a deployment. Report which checks ran and any limitations; do not claim an AWS deployment from local validation.

## Commit completed work

Every completed change must include a local Git commit. Update the documentation, run appropriate checks, inspect `git status` and the diff, then stage only task-related files and commit them. Preserve unrelated user work. Use a short imperative message describing the outcome, such as `Document repository standards and accepted decisions`.

Do not commit secrets, state, plans, dependencies, or generated build output. Do not amend, reset, force-push, or push unless requested. Report the resulting commit hash and checks in the final response. If a check or commit fails, explain the failure and leave the changes available for review rather than claiming completion.
