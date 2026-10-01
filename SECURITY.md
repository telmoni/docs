# Security Policy

## Supported Versions

Telmoni Documentation is continuously deployed from the active development branch (`main`).

| Version | Supported          |
| ------- | ------------------ |
| `main`  | :white_check_mark: |

## Scope

Security vulnerability reports are welcome for:
- The Telmoni documentation website (`docs.telmoni.com`).
- Build configurations and static site generation pipelines (`astro.config.mjs`, GitHub Actions).
- Embedded scripts, assets, and dependency vulnerabilities affecting visitors.

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues, pull requests, or discussions.**

We offer two private channels for reporting:

1. **GitHub Private Vulnerability Reporting (Preferred):**  
   Use GitHub's [Private Vulnerability Reporting](https://github.com/telmoni/docs/security/advisories/new) under the repository's **Security > Advisories** tab.

2. **Email:**  
   Send details to **hello@telmoni.com**.

When reporting, please provide:
- A clear description of the vulnerability and its potential impact.
- Step-by-step reproduction instructions or a minimal proof of concept (PoC).
- The commit SHA or URL tested against.
- Any proposed remediation, if known.

## Response & Disclosure Timeline

- **Initial Response:** We will acknowledge receipt of your report within three working days.
- **Triage & Status:** We will keep you informed of our investigation, confirmation status, and planned timeline for shipping a fix.
- **Coordinated Disclosure:** We request that you give us a reasonable window to remediate the vulnerability before public disclosure.
- **Bug Bounty:** There is currently no paid bug bounty programme.

## Testing Guidelines & Safe Harbor

When testing for vulnerabilities:
- Do not degrade the performance of the hosted documentation site or GitHub Pages infrastructure.
- Do not attempt social engineering or denial of service attacks.

We consider vulnerability research conducted in compliance with these guidelines to be authorized and will not initiate legal action against researchers acting in good faith.
