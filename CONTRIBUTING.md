# Contributing to Telmoni Documentation

Thanks for your interest in contributing to the Telmoni Documentation (`docs.telmoni.com`).

All contributors are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). For security vulnerabilities, please refer to our [Security Policy](SECURITY.md). For detailed site architecture, navigation rules, and dev workflows, see [DEVELOPMENT.md](DEVELOPMENT.md).

---

## Developer Certificate of Origin (DCO)

We do not require a Contributor License Agreement (CLA). Instead, we use the standard [Developer Certificate of Origin (DCO)](https://developercertificate.org/).

By adding a `Signed-off-by:` line to your commit message, you certify that you have the right to submit the work under the project's [Apache-2.0 License](LICENSE).

Sign your commits using `git commit -s`:

```console
git commit -s -m "docs(api): add CLI device authentication guide"
```

---

## Guidelines & Principles

- **Open an issue first for major structural additions.** Before proposing new top-level categories, major reorganizations, or large batches of documentation, open an issue so design and reading flow can be coordinated.
- **Content Organization:** All documentation pages live in `src/content/docs/` as Markdown (`.md`) or MDX (`.mdx`) files.
- **Sidebar & Navigation:** Every new page or section must be registered in the `sidebar` array in `astro.config.mjs` to appear in the site's reading hierarchy.
- **Frontmatter Standards:** Every document requires `title` and `description` in its frontmatter. The `title` is the sidebar label; set `sidebar.label` only where a shorter one fits better.
- **Link Integrity:** Use the served path (e.g. `/self-host/overview/`, `/api/cli/`), never a filesystem path (`./overview.mdx`). Verify all links resolve cleanly without broken anchors.
- **Tone & Voice:** Keep explanations concise, technical, and accurate. Provide concrete, copy-pasteable configuration snippets and shell commands.

---

## Running Tests and Validation

Before opening a pull request, verify that the site builds cleanly without errors or warnings:

```console
# Use the repository Node version (.nvmrc)
nvm use

# Install dependencies exactly from lockfile
npm ci

# Verify build and sitemap generation
npm run build
```

To run the local preview server with live reloading:

```console
npm run dev
```

The site will be available at [http://localhost:4321](http://localhost:4321).

---

## Submitting Pull Requests

1. **Keep Pull Requests Focused:** Submit PRs that address a single documentation update, feature guide, or fix.
2. **Commit Style:** Use [Conventional Commits](https://www.conventionalcommits.org/) (`docs:`, `fix:`, `chore:`).
3. **Sign Your Commits:** Ensure every commit includes the DCO sign-off (`-s`).
4. **No AI Signatures:** Do not include automated AI co-author or attribution tags in commits or PR bodies.
5. **Ensure Clean Build:** Verify that `npm run build` completes successfully with all routes rendered.
