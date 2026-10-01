# Telmoni Docs — Agent Guidelines

The customer documentation site for Telmoni ([docs.telmoni.com](https://docs.telmoni.com), [`telmoni/docs`](https://github.com/telmoni/docs)): [Starlight](https://starlight.astro.build) on Astro, published to GitHub Pages by `.github/workflows/docs.yml` on every push to `main`. Every page restates behaviour implemented in the platform, [`telmoni/telmoni`](https://github.com/telmoni/telmoni), except the CLI and SDK pages, which restate [`telmoni/telmoni-cli`](https://github.com/telmoni/telmoni-cli). Those two repositories are the authority on everything written here.

## Ground Rules
- **Pre-launch:** nothing has shipped, and there are no users. Never write migration notes, upgrade paths or "if you pinned an older rev" guidance; change a page to describe what is true now.
- **Quality gate:** never leave the tree broken.
- **Ask first:** any dependency change (`package.json`, `package-lock.json`), a new top-level sidebar group or a restructure, and any domain or deploy change (`public/CNAME`, the workflows).
- **Document only what a user can reach:**
  - **Covered:** sign-in; self-hosting (Docker Compose, Kubernetes, the console agent, configuration, production); organizations and projects, members and roles, the audit log; notifications and connectors; the CLI, the SDKs, API keys, the read-only `/v1` API and the error catalog; account settings and privacy; billing (the hosted service only, per organization: every organization is on the Hobby plan, with no usage limits and nothing for sale); the legal pages.
  - **Never:** the retired observability product (services, SLOs, alerts, incidents, metrics, logs, traces, ingest), or anything not built yet.
  - **A route is not a feature:** check `web/app` in `telmoni/telmoni` that a user can reach it. Organization export has a server route for owners and admins but no console surface, so it is not documented.
  - **Claim only what a diff could disprove:** describe mechanisms, never outcomes ("tamper-resistant", "never leaks", "guaranteed").

## Where Things Live
| Path | What |
|---|---|
| `src/content/docs/` | The pages: `getting-started/`, `self-host/`, `workspace/`, `integrations/`, `api/`, `account/`, `legal/`, plus `index.mdx`, `errors.mdx` and the `404.mdx` splash outside the sidebar. |
| `astro.config.mjs` | Site configuration, the sidebar, fonts. |
| `src/styles/custom.css` | The theme: graphite monochrome, rounded corners (`.theme-sharp` squares them), Inter, every color in `oklch`. |
| `src/components/` | Starlight overrides: `Head.astro` (font preloads, the corners boot script), `ThemeSelect.astro` (theme and corners switches). |
| `src/content.config.ts` | The `docs` collection, unmodified. |
| `public/CNAME` | The custom domain, `docs.telmoni.com`; must match the GitHub Pages setting. |
| `.github/workflows/docs.yml` | Builds and publishes the site. |
| [`telmoni/telmoni`](https://github.com/telmoni/telmoni) | Sibling repo, checked out as `../telmoni`: the platform every page documents. Its `error_catalog.rs` test reads `errors.mdx` from here. |
| [`telmoni/telmoni-cli`](https://github.com/telmoni/telmoni-cli) | Sibling repo, checked out as `../telmoni-cli`: the source for `api/cli.mdx` and `api/sdks.mdx`. |

## Commands
- **After every change** (no permission needed; report failures verbatim): `npm run build`, which also validates every sidebar slug and the MDX.
- **Only when asked**, in `telmoni/telmoni`: `make test-svc SVC=shared TEST_FILTER=the_error_page_and_the_error_code_name_the_same_types` checks `errors.mdx` against the Rust error types.
- **Locally:** `npm run dev` serves the site with live reload.

## Writing Rules
- **Verify against source before editing:** every header, route, status code, signature scheme, limit and retry schedule, in `telmoni/telmoni` (or `telmoni/telmoni-cli` for the CLI and SDK pages).
- **The sidebar is the reading order:** `astro.config.mjs` holds its 7 groups (Getting started, Self-hosting, Organizations and projects, Notifications, Developer tools & API, Account, Legal); a new page needs its slug there. Entries take no `label`, except the introduction: the page's `title` names it.
- **Links use the served path** (`/integrations/webhooks/`), never a file path (`./webhooks.mdx`).
- **Shell blocks** use the `console` fence with a `$ ` prompt, and show only output a host really produced, or none.
- **Styling** lives only in `src/styles/custom.css`, in `oklch`; fonts go through Astro's font pipeline (`fontProviders.fontsource()`).
- **MDX:** outside a code fence, a bare `<flag>` or `{param}` breaks the build, and HTML comments are invalid.
- **Em-dashes:** a colon, comma or parentheses first; at most one em-dash (or pair) per sentence.
- **`errors.mdx` stays at `src/content/docs/errors.mdx`:** the platform's `error_catalog.rs` test pins it.

## Contracts
These pages restate code; when the code changes, the page follows:
- `integrations/webhooks.mdx`: signatures, the replay window and retries, from `crates/notifications`.
- `api/reference.mdx`: request bodies, status codes and limits, from `crates/auth/src/handler/v1.rs` and `web/app/v1/[...path]/route.ts`.
- `workspace/roles.mdx`: the organization and project roles in `crates/shared/src/types/organization_role.rs` and `types/role.rs`, enforced by `crates/shared/src/rbac.rs`.
- `errors.mdx`: one backticked entry for every error `type` the platform returns.
- `api/cli.mdx`, `api/sdks.mdx`: commands, sign-in and SDKs from `telmoni/telmoni-cli` (`src/commands/`, `src/auth/`, `sdk/`), over the platform's `/cli` door.

## Agent Hygiene
- **This repo only:** change nothing in another repository (`telmoni/telmoni`, `telmoni/telmoni-cli`, any other) unless the user says so for this task; that binds subagents too. Reading is fine. No other repository is a source for this site.
- Edit `AGENTS.md` (the only agent instruction file) only when the user asks outright; otherwise propose a diff.
- Comments say *why*, never *what*. No AI signatures anywhere, pages included.
- No scripted bulk edits: edit each page deliberately and review the diff. One-off scripts, backups and logs go in `/tmp/telmoni/`.
- Keep the repo slim: fix a real problem where it lives. No guard script, lint gate or CI job for a problem that is not happening.

## Git Rules
- Commit only when asked: never `git add` or `git commit` unprompted.
- Conventional commits (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`) of 1–5 lines: a subject, then optionally a blank line and up to 3 lines on *why*. No file lists, test output, AI signatures or `Co-authored-by` trailers.
- No branches, worktrees, pushes or pull requests.

## Definition of Done
- [ ] `npm run build` passes, or the failure is reported verbatim.
- [ ] Every fact on a changed page was checked against current source.
- [ ] Nothing that needs asking happened unasked (dependencies, the sidebar's structure, the domain or deploy, other repos, commits).
