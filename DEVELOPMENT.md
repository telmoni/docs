# Telmoni Documentation Architecture & Development Guide

This document describes the architecture of the Telmoni documentation website (`docs.telmoni.com`), content hierarchy, navigation wiring, environment configuration, and development workflows.

---

## Architecture Overview

The documentation site is powered by [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/):

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
  styles/              Custom CSS overrides for fonts and the Telmoni graphite palette.
public/                Favicons, static icons, and the GitHub Pages `CNAME` file.
astro.config.mjs       Starlight configuration, font optimization, and sidebar hierarchy.
```

### Static Site Generation & Search

- **Build Output:** Astro builds the site into a fully static bundle (`dist/`).
- **Font Pipeline:** Font faces (`Inter` and `Geist Mono`) are configured via Astro's font provider with preloading and metric fallbacks (`size-adjust`) to prevent layout shifts.
- **Client-Side Search:** Search index generation is handled automatically at build time using [Pagefind](https://pagefind.app/).
- **Sitemap:** Sitemaps are automatically generated via `@astrojs/sitemap`.

---

## Content & Navigation Structure

### 1. Reading Order & Sidebar (`astro.config.mjs`)

Navigation is explicitly declared in `astro.config.mjs`:
- Each sidebar item specifies a `slug` referencing a file under `src/content/docs/`.
- Slug resolution is validated at build time; missing or renamed files cause immediate build failures rather than producing dead links.
- Sidebar titles inherit directly from each document's frontmatter `title` to prevent drift.

### 2. Frontmatter Contract

Each page must include frontmatter metadata:

```markdown
---
title: CLI Overview
description: Getting started with the Telmoni command-line interface.
---
```

Optional frontmatter overrides:
- `sidebar.label`: Custom label in the navigation tree if different from `title`.
- `tableOfContents`: Customize table-of-contents depth.

---

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `DOCS_SITE` | Canonical site base URL | `https://docs.telmoni.com` |
| `DOCS_BASE` | Base path prefix for path-scoped deployments (e.g. `/docs`) | `""` |

For standard production builds, both variables are left unset so the build binds to the custom domain configured in `public/CNAME`.

---

## Development Workflows

### Prerequisites

- **Node.js:** Node 24 (pinned in `.nvmrc`)
- **npm:** npm 10+

### Setup & Local Development

Switch to the pinned Node version and install dependencies:

```console
nvm use
npm ci
```

Start the local development server with hot-module reloading:

```console
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

### Verification & Production Build

Verify that all content links, slugs, and static routes compile cleanly:

```console
npm run build
```

Preview the production build locally:

```console
npm run preview
```

### Deployment

The documentation site is automatically deployed to GitHub Pages via `.github/workflows/docs.yml` on every push to the `main` branch.
