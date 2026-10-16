# Telmoni Docs — Agent Guidelines

The customer documentation for Telmoni ([`telmoni/docs`](https://github.com/telmoni/docs)): the book every Telmoni console serves at `/docs`, `telmoni.com/docs` among them. The platform's console ([`telmoni/telmoni`](https://github.com/telmoni/telmoni)) builds it in, and the hosted service's console lays `hosted/` over it. The repository is public, and every file in it is published as written.

## Ground Rules
- **Pre-launch:** nothing has shipped. Rename, restructure and rewrite pages to their ideal state; no redirects or migration notes.
- **Quality gate:** never leave the tree broken.
- **Ask first:** a new top-level group in the book's sidebar; renaming or moving a page, since the console (`../telmoni/web`), the skill (`../skills`), the READMEs and `.github` link pages by their path and nothing checks those links, so the ask names each link it would leave wrong; any dependency (a GitHub Action, a tool CI or the `Makefile` installs); and any external-state change.
- **The code is the authority:** a page says what the platform, the CLI and the SDKs do today, checked against their source, and never anything not built yet.

## Where Things Live
| Path | What |
|---|---|
| `content/` | The book: one `.mdx` file per page, each folder's `meta.json` its reading order. The platform's `make book` lays it into the console's `web/content/docs`. |
| `hosted/` | The hosted service's own pages, `legal/` and `workspace/billing.mdx`, laid over the book by the hosted service's console alone; a self-hosted console never serves them. |
| `Makefile` | `check`, the gate. |
| `typos.toml` | The spell-check's exceptions. |
| `.github/workflows/ci.yml` | CI: `make check` with the platform checked out beside this repository, and the spell-check. |
| [`telmoni/telmoni`](https://github.com/telmoni/telmoni) | Sibling repo, checked out as `../telmoni`: the platform, its four SDKs (`sdk/`) and the console that serves this book; the authority on the API, ingest, errors, webhooks and self-hosting. |
| [`telmoni/telmoni-cli`](https://github.com/telmoni/telmoni-cli) | Sibling repo, checked out as `../telmoni-cli`: the CLI, the authority on `content/api/cli.mdx`. |
| [`telmoni/skills`](https://github.com/telmoni/skills) | Sibling repo, checked out as `../skills`: the agent skill, whose references restate pages here and link them by path. |

## Commands
- **After every change** (no permission needed; report failures verbatim): `make check`, which runs `make book-check` in `../telmoni`: it lays `content/` into the console, builds it, which compiles every page and fails on invalid MDX, and runs the platform's tests that read pages, `error_catalog.rs` and `field_inventory.rs`. It needs `npm ci` done in `../telmoni/web`, and Rust. Then `typos`.
- **Locally:** `make up` in `../telmoni` serves the book at http://localhost:3000/docs and lays each edit in within a second. `hosted/` is served only by the hosted service's console, so `make check` builds `content/` alone.

## Writing Rules
- A page is an `.mdx` file with `title` and `description` in its frontmatter; the title is also its name in the sidebar.
- Each folder's `meta.json` is the reading order, and the only place that holds it: a new page goes into its folder's `pages`, and the `...` at the end stays, since it takes in the pages a console built on the platform lays over the tree, `hosted/`'s among them.
- Use only what the platform's `web/components/mdx.tsx` provides: Fumadocs' defaults (`Cards`, `Card` and `Callout` among them) and `Steps`, `Step`, `Tabs` and `Tab`.
- Links use the served path (`/docs/integrations/webhooks`), never a file path. A page in `content/` links a `hosted/` page by its address on telmoni.com (`https://telmoni.com/docs/legal/subprocessors`), since a self-hosted console serves no `hosted/` page.
- Shell blocks use the `console` fence with a `$ ` prompt, and show only output a host really produced.
- Outside a code fence, a bare `<flag>` or `{param}` breaks the build, and HTML comments are invalid.
- A comment inside a code sample is one short line, and says *why*, never *what*: the page around it does the explaining.
- Runnable specs live in the platform's code, and the book prints them: a golden vector, a constant, a limit. Check every value against source before writing it; when the code changes, the page changes with it.
- `content/errors.mdx` and `content/api/field-inventory.mdx` keep their paths: the platform's `error_catalog.rs` and `field_inventory.rs` read them there, and fail when a row and the code disagree.
- `hosted/workspace/billing.mdx`'s table is the hosted service's catalogue, held to it by that service's own test: it changes only with the catalogue.

## Agent Hygiene
- **This repo only:** change nothing in another repository unless the user says so for this task; that binds subagents too. Reading is fine. A platform change that leaves a page wrong fixes the page here, in the same task.
- Edit `AGENTS.md` only when the user asks outright; otherwise propose a diff.
- No AI signatures anywhere.
- No scripted bulk edits: edit each file deliberately. One-off scripts and logs go in `/tmp/telmoni/`.
- Never put a real key, token or secret in a page, an example or a commit: examples use placeholders anyone can see are placeholders.
- Keep the repo slim: no guard script, lint gate or CI job for a problem that is not happening.

## Git Rules
- Commit only when asked: never `git add` or `git commit` unprompted.
- Conventional commits (`docs:`, `fix:`, `chore:`) of 1–5 lines: a subject, then optionally a blank line and up to 3 lines on *why*. No file lists, AI signatures or `Co-authored-by` trailers.
- No branches, worktrees, pushes or pull requests.

## Definition of Done
- [ ] `make check` and `typos` pass, or the failure is reported verbatim.
- [ ] Every fact on a changed page was checked against current source, and every link resolves.
- [ ] Nothing that needs asking happened unasked (dependencies, external state, other repos, commits).
