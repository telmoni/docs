# Telmoni Documentation

[![Docs](https://github.com/telmoni/docs/actions/workflows/docs.yml/badge.svg)](https://github.com/telmoni/docs/actions/workflows/docs.yml)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

The official documentation website for [Telmoni](https://telmoni.com), served at [docs.telmoni.com](https://docs.telmoni.com) and built with [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/).

This repository contains the documentation source, site styling, and deployment workflows. The core platform implementation is maintained in [`telmoni`](https://github.com/telmoni/telmoni) and the command-line client in [`telmoni-cli`](https://github.com/telmoni/telmoni-cli).

---

## Getting Started

### Prerequisites

- Node.js 24 (pinned in `.nvmrc`)
- npm 10+

### Setup & Running Locally

```console
nvm use            # Use the Node.js version pinned in .nvmrc
npm ci             # Install dependencies strictly from package-lock.json
npm run dev        # Start the local development server with hot reload
```

Open [http://localhost:4321](http://localhost:4321) in your browser to view the documentation locally.

---

## Repository Layout

```text
src/
  content/
    docs/              Markdown (.md) and MDX (.mdx) source documents.
      account/         Account settings and privacy.
      api/             CLI guides, SDK documentation, and API references.
      getting-started/ First-run and sign-in tutorials.
      integrations/    Slack, Discord, notifications, and webhooks.
      legal/           Privacy policy, terms of service, and security disclosures.
      self-host/       Docker Compose, Kubernetes, and self-hosted topologies.
      workspace/       Organizations, members, roles, audit logging, and billing.
      errors.mdx       The platform's error catalog.
  components/          Starlight overrides: font preloads, theme and corners switches.
  styles/              Custom CSS overrides and Telmoni graphite palette.
public/                Favicons, static icons, and the GitHub Pages `CNAME` file.
astro.config.mjs       Starlight configuration, font optimization, and sidebar hierarchy.
```

---

## Content Organization & Navigation

- **Sidebar Ordering:** The sidebar in `astro.config.mjs` defines the reading hierarchy. Each item points to a `slug` verified against disk during build. Renaming or moving a file without updating the config triggers an immediate build failure.
- **Titles & Labels:** Navigation labels default to each document's frontmatter `title`. Long titles can be overridden using `sidebar.label` in frontmatter.
- **Link Resolution:** Documents link to each other using absolute web paths (e.g. `/integrations/webhooks/`) rather than filesystem relative paths.
- **Error Catalog:** `src/content/docs/errors.mdx` sits at a fixed path verified by contract tests in the primary platform repository.

---

## Development & Verification

Run the production build gate to verify all links, routes, and assets:

```console
npm run build      # Static compilation into dist/
```

Preview the production build locally:

```console
npm run preview
```

For detailed architecture, font loading mechanics, and workflows, see [DEVELOPMENT.md](DEVELOPMENT.md).

---

## Deployment

The site is automatically deployed to GitHub Pages on every push to `main` via `.github/workflows/docs.yml`.

- `public/CNAME` pins the custom domain `docs.telmoni.com`.
- Deployments to alternative environments or preview paths can be configured via environment variables:

```console
DOCS_SITE=https://telmoni.github.io DOCS_BASE=/docs npm run build
```

---

## Security

Please report vulnerabilities following our [Security Policy](SECURITY.md). Do not open public issues for security vulnerabilities.

---

## Community & License

- [Contributing](CONTRIBUTING.md) — DCO requirements, content standards, and PR workflows.
- [Code of Conduct](CODE_OF_CONDUCT.md) — Contributor Covenant v2.1.
- [Development Guide](DEVELOPMENT.md) — Architecture and development documentation.
- [Security Policy](SECURITY.md) — Vulnerability reporting channels and safe harbor.
- [License](LICENSE) — Licensed under the Apache License, Version 2.0.
