# Telmoni documentation

The documentation site for [Telmoni](https://docs.telmoni.com), built on
[Starlight](https://starlight.astro.build).

This repository holds the documentation site and nothing else. The product it
documents resides in the local `telmoni` repository.

## Working on it

```console
nvm use            # the version in .nvmrc
npm ci             # the lockfile is the input, never `npm install`
npm run dev        # a local server with live reload
npm run build      # what CI publishes, into dist/
```

## How it is laid out

Pages are under `src/content/docs/`, in subdirectories by group:
- `getting-started/`
- `workspace/`
- `integrations/`
- `api/`
- `account/`

`index.mdx` (the home page) and `errors.mdx` sit at the root. `errors.mdx` must stay
where it is: `crates/shared/tests/error_catalog.rs` in `telmoni` reads it from that path.

**The sidebar in `astro.config.mjs` is the reading order and the only place that
holds it**: each `slug` is checked against the pages on disk at build time, so a
renamed page fails the build rather than shipping a dead nav entry. It is five
groups: `Getting started`, `Teams`, `Notifications`, `API`, and `Account`.

An entry carries no `label` of its own, so the name in the nav **is the page's
own `title`** and the two cannot drift apart. A page whose title is too long for
a nav column overrides just that in its own frontmatter:

```yaml
sidebar:
  label: "Short Navigation Label"
```

A page links to another **by the path the site serves it at**
(`/integrations/webhooks/`), never by a file beside it. Starlight's own header
is used as it ships; `src/styles/custom.css` carries the palette: graphite,
corner curvature matching Telmoni (curved by default with sharp toggle support), Inter over Geist Mono.

## How it ships

`.github/workflows/docs.yml` builds on every push to `main` and deploys to GitHub
Pages. `public/CNAME` holds the domain (`docs.telmoni.com`), and its DNS record
must stay DNS-only rather than proxied. Pages must be set to build from GitHub
Actions in the repository's settings; the workflow reads that configuration and
does not create it.

The site defaults to `https://docs.telmoni.com` at the domain root. `DOCS_SITE`
and `DOCS_BASE` override both for a preview served from somewhere else:

```console
DOCS_SITE=https://telmoni.github.io DOCS_BASE=/docs npm run build
```
