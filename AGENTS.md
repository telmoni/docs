# Telmoni Docs - Agent Guidelines

**Context:** This repository contains the public customer-facing documentation site for Telmoni ([docs.telmoni.com](https://docs.telmoni.com)), built with [Starlight](https://starlight.astro.build) on Astro and deployed to Vercel on every push to `main`.

## 🚧 Project Status & Documentation Scope

**Telmoni is pre-launch, local-first, and unaudited.** There is no production deployment, no customer data, no external review, and no installed user base.

**Document only what is built and user-accessible:**
- **Covered scope:** Sign-in, teams, members and roles, audit log, notifications and connectors, API keys, the read-only `/v1` API, account settings, and billing (per team; Hobby tier only, uncapped).
- **Retired observability product:** Telmoni has no observability product (services, SLOs, alerts, incidents, metrics, logs, traces, ingest). Do **not** document any of these features.
- **Unbuilt roadmap items:** `ROADMAP.md` in Telmoni plans heartbeat monitoring for AI agents and cron jobs; none of this is built. Do **not** document roadmap items as existing features.
- **Backend route vs. console surface:** Built in a backend service does not equal reachable by a user. For example, account export has a route in auth, but nothing in the console calls it, so it is omitted. Always check `web/app` in `telmoni` to confirm user reachability before documenting.
- **Voice and factual claims:** Claim nothing the project cannot back. Describe mechanisms a diff can disprove. Do not write outcome guarantees ("tamper-resistant", "never leaks", "guaranteed"). Do not write migration notes, upgrade paths, or "if you pinned an older rev" guidance for non-existent users.

## 🛠️ Verification Commands (Run Before Completing Tasks)

- **Build Gate:** `npm run build` (Builds static output to `dist/`, validates all sidebar slugs against disk, validates MDX syntax). Must pass with zero errors before every commit.
- **Font Preload Verification (if touching `fonts` in `astro.config.mjs` or `Head.astro`):**
  ```console
  npm run build && grep -o 'rel="preload"' dist/integrations/webhooks/index.html | wc -l
  ```
  *(Expected count: `2`)*
- **Cross-Repo Error Catalog Test (in `~/Desktop/telmoni`):**
  ```console
  make test-svc SVC=shared TEST_FILTER=the_error_page_and_the_error_code_name_the_same_types
  ```
  *(Checks that `errors.mdx` backticked types stay in sync with Rust code).*

## 🏗️ Architecture & Boundaries

### Always Do
- **Verify Against Current Source:** Every page restates behaviour implemented in `~/Desktop/telmoni`. Verify every header name, route path, status code, signature scheme, limit, and retry schedule directly against current source in `~/Desktop/telmoni` before editing.
- **Sidebar is Reading Order:** The sidebar in `astro.config.mjs` is the single source of truth for the site's reading hierarchy across the 5 groups (`Getting started`, `Teams`, `Notifications`, `API`, `Account`). Adding a page requires adding its slug there.
- **Derive Nav Label from Frontmatter:** Sidebar entries must omit custom `label` properties (except the root introduction). Use the page's own `title` frontmatter so navigation and titles never drift.
- **Link by Canonical URL:** Link between pages using the exact path served by the site (e.g., `/integrations/webhooks/`), never relative file paths (e.g., `./webhooks.mdx`).
- **Format Shell Blocks Accurately:** Code blocks showing terminal sessions must use the `console` language fence with a prompt (`$ `), and only show verbatim output actually produced by a host, with host and date when relevant, or omit output entirely.
- **Palette and Typography:** Styling belongs exclusively in `src/styles/custom.css` using `oklch` color definitions (graphite monochrome, square corners, Inter over Geist Mono). Font definitions must use Astro's font pipeline (`fontProviders.fontsource()`).
- **Em-dash Restraint:** Use a colon, comma, or parentheses first. Reserve em-dashes for cases where alternatives are ambiguous or weak; maximum one (or one pair) per sentence.

### Ask First (Require User Approval)
- **Adding Dependencies:** Do not add packages to `package.json` without explicit user permission.
- **Sidebar Structure:** Do not add new top-level sidebar groups or restructure the site without approval.
- **Domain or Deployment Changes:** Do not alter `public/CNAME` or GitHub Actions deploy workflows without instruction.

### Never Do (Strictly Forbidden)
- **Do Not Modify This File:** You are strictly **forbidden** from updating or modifying this `AGENTS.md` file (and its symlink `CLAUDE.md`).
- **No Speculative or Outdated Features:** Never document retired observability products (SLOs, traces, metrics, ingest) or unbuilt roadmap plans (heartbeats, cron).
- **No Unverifiable Guarantees:** Never write claims the codebase cannot enforce, or migration instructions for non-existent users.
- **No Bare JSX / HTML Comments in MDX:** Outside fenced code blocks, bare angle brackets (`<flag>`) or bare braces (`{param}`) fail the MDX build. HTML comments (`<!-- -->`) are invalid in MDX; do not use them.
- **Do Not Move or Rename `errors.mdx`:** Its location (`src/content/docs/errors.mdx`) is pinned by `telmoni`'s `crates/shared/tests/error_catalog.rs`.
- **No Relative File Links:** Never link to a document via relative filesystem paths like `./webhooks.mdx` or `../workspace/roles.mdx`.
- **No Code or Commit Signatures:** Do not add comments like `// Added by AI` or include AI identifiers in documentation.
- **No Scripted Bulk Edits:** Never run scripts (Python, shell, Node, regex) to rewrite documentation source files in bulk. Edit each file deliberately and review diffs manually.
- **No Extra Agent Files:** `AGENTS.md` at the repository root is the only agent instruction file.
- **No External Assumptions:** `telmoni-mcp` and `telmoni-cli` on the desktop belong to other projects; do not reference or source documentation from them.

## 📂 Repository Layout

| Path | Description |
|---|---|
| `src/content/docs/**/*.mdx` | Content pages grouped by topic: `getting-started/`, `workspace/`, `integrations/`, `api/`, `account/`. Root contains `index.mdx` and `errors.mdx`. Splash page `404.mdx` sits outside the sidebar. |
| `src/content.config.ts` | Starlight `docs` collection configuration (unmodified loader and schema). |
| `src/styles/custom.css` | Site theme: graphite monochrome, square corners, Inter typography. All colors in `oklch`. |
| `src/components/Head.astro` | Starlight head override adding font preload links. |
| `astro.config.mjs` | Site configuration, sidebar navigation, fonts, and Starlight options. |
| `public/CNAME` | Custom domain configuration (`docs.telmoni.com`). Must match GitHub Pages settings and remain DNS-only. |
| `public/favicon.svg` | SVG favicon with dark/light mode `prefers-color-scheme` adaptation. |
| `.github/workflows/docs.yml` | GitHub Actions workflow publishing to GitHub Pages on pushes to `main`. |
| `.nvmrc` | Node version specification (`24`). |

## 📚 Cross-Repository Contract with Telmoni

The documentation repository is separate from the application codebase, but documents contracts enforced across `~/Desktop/telmoni`:
- **Webhooks & Integrations:** `integrations/webhooks.mdx` documents webhook signatures, replay windows, and retry policies implemented in `crates/notifications`.
- **API Reference:** `api/reference.mdx` documents request bodies, status codes, and limits defined in `crates/auth/src/handler/v1.rs` and proxied through `web/app/v1/[...path]/route.ts`.
- **Roles & Permissions:** `workspace/roles.mdx` details RBAC scopes enforced by `crates/shared/src/rbac.rs` and `types/team_role.rs`.
- **Error Catalog Synchronization:** `errors.mdx` contains an error catalog validated by `telmoni`'s `error_catalog.rs` test. Every error `type` URI produced in Rust must match a backticked entry in `errors.mdx`.

Whenever contracts in `telmoni` change, verify and update the corresponding documentation here.

## 📝 Git Workflow & Commits (Strict Rule)

- **Agent Commits:** You (the AI agent) must **ONLY** stage and commit changes (`git add .` and `git commit -m "..."`) when the user explicitly instructs you to do so. Do **NOT** commit automatically on your own initiative.
- **Commit Messages:** When instructed to commit, use conventional commits (e.g., `feat: ...`, `fix: ...`, `refactor: ...`, `docs: ...`).
- **Hard Ceiling on Commit Messages:** Commit messages must be **1 to 5 lines maximum**. The subject line describes what changed. An optional body (up to 4 lines including blank line) explains why if not clear from the diff. Never dump test output, file lists, or conversation transcripts into commit messages.
- **No Commit Signatures:** You are strictly **forbidden** from adding AI signatures, agent identifiers, or trailers like `Co-authored-by: AI` or `Generated by Assistant`.
- **NO BRANCHES:** You are strictly **forbidden** from creating branches (`git checkout -b`, `git switch -c`, `git branch`). All work is committed to the currently checked-out branch.
- **NO PUSHING:** You are strictly **forbidden** from pushing to remote repositories (`git push`). The operator reviews and pushes all changes.
- **Pull Requests:** A coding agent never opens, approves, or merges pull requests (`gh pr create`, `gh pr merge`). All PRs are owned and handled by human operators.
