# Pocket Shop: a deliberately vulnerable demo app

> [!WARNING]
> **This code is intentionally insecure. Do not deploy it, do not reuse it, and do not expose it to a network.**
> It exists only as a test fixture for [Repo Medic](https://github.com/halfabillion/repo-medic), an agent-native security triage board.
> Every vulnerability below was planted on purpose.

## Planted issues

| Issue | Where | Found by |
| --- | --- | --- |
| SQL injection (string-built query) | `src/app.js` | Semgrep |
| Reflected XSS (HTML built from input) | `src/app.js` | Semgrep |
| OS command injection | `src/app.js` | Semgrep |
| `eval` of input | `src/app.js` | Semgrep |
| MD5 password hashing | `src/app.js` | Semgrep |
| `Math.random` session tokens | `src/app.js` | Semgrep |
| Hard-coded API key | `src/config.js` | gitleaks |
| Vulnerable `lodash` 4.17.15 | `package.json` | osv-scanner |

The API key is an obviously fake Stripe-style **test** key (`sk_test_REPOMEDICdemoFAKE…`). It has never been valid anywhere.

Pull requests on this repo are opened by Repo Medic after a person approves a verified fix: the patch applies, `npm test` passes, the scanner no longer reports the issue, and no new issue appears.

## Run the tests

```bash
npm install
npm test
```

## Licence

MIT. Use only for security education and tool testing.
