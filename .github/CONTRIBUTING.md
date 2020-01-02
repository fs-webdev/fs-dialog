# Contributing

Looking to contribute to the TreeWeb codebase? You've come to the right place! We welcome pull requests, issues, feedback, etc., and have a few guidelines for contributions:

##### To maximize the visibility and reviewability of code, all code contributions are made through pull requests.

### Contributing Bug Reports

Bug reports are primarily handled through [JIRA](https://almtools.ldschurch.org/fhjira/issues/). Add a JIRA to the _Tree Web_ project and it will be prioritized and assigned out (typically at the start of each iteration).

### Contributing Pull Requests

- Follow ESLint/CSSLint best practices. Enforced by Code Climate, `eslint`, and `stylelint`.
- Increment bower.json version (used to automatically tag a new release).
- **Include tests that test the range of behavior that changes with your PR.** If your PR fixes a bug, make sure your tests capture that bug. If your PR adds new behavior, make sure that behavior is fully tested. Every PR must include associated tests (unit, component, acceptance) as appropriate.
- Update any associated documentation affected by your change.
- Submit your PR, making sure it references any relevant issues (JIRAs, V1 Stories, etc.)
- Ensure your pull request description accurately describes the changes you are proposing. See [short reason](https://twitter.com/dzaporozhets/status/870268536404533249) and [long reason](https://medium.com/square-corner-blog/how-square-writes-commit-messages-8e92fcbf77c9).
- If your PR fixes a bug, make sure the issue includes clear steps to reproduce the bug so the fix can be easily tested. It is helpful to add a comment containing the JIRA number for non-obvious fixes.

### Merging Pull Requests

See: [TreeWeb PR Merging Best Practices](https://github.com/fs-webdev/tree/wiki/Merging-Pull-Requests)

- The default merge mode should be **rebase and merge**.
- Pure merges should **never** be done. This unnecessarily clutters GitHub history, and shows the wrong information in team Slack build alerts.
- NOTE: When using the GitHub web interface, it automatically selects your last-performed merge type, so be careful when clicking the button.
- **Delete the PR branch** after merging.
