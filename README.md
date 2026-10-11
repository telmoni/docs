# Telmoni docs

The customer documentation for [Telmoni](https://telmoni.com), served at [telmoni.com/docs](https://telmoni.com/docs) and by every Telmoni console at its own `/docs`.

These pages are not a site of their own. The console of the open-source platform, [`telmoni/telmoni`](https://github.com/telmoni/telmoni), builds them in with [Fumadocs](https://fumadocs.dev), so they share its header and theme, a self-hosted deployment serves them too, and the console agent answers from them.

## Layout

```text
content/   the book: an .mdx file per page, each folder's meta.json its reading order
hosted/    the hosted service's own pages (legal/, workspace/billing.mdx), laid over the book on telmoni.com alone
```

## Working on a page

Check this repository out beside the platform, as `../docs` from it:

```console
$ git clone https://github.com/telmoni/telmoni.git
$ git clone https://github.com/telmoni/docs.git
$ cd telmoni && make first-run && make up
```

`make up` in the platform serves these pages at http://localhost:3000/docs and lays each edit in within a second. [Developing](https://telmoni.com/docs/contributing/developing#the-docs) says how a page is written.

```console
$ make check
```

`make check` is the gate CI runs: it builds the platform's console with these pages and runs the platform's tests that read them (`make book-check` there).

## License

Apache-2.0 ([LICENSE](LICENSE), [NOTICE](NOTICE)). Unless you say otherwise, a contribution you submit is licensed the same way.
