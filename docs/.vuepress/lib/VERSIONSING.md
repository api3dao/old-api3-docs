## Versioning

Each subfolder in `docs/` will represent a documentation version,
except `docs/pages/` that will remain the same for all docs versions.

This ensures that the docs are always in sync with the released version of Lighthouse.
Version specific changes are handled by keeping the docs for each version separate.

| Path                                 | Web route                                           |
| ------------------------------------ | --------------------------------------------------- |
| `docs/next/requesters/installation.md` | `https://mysite.com/next/requesters/installation.html` |
| `docs/0.1.0/requesters/installation.md`    | `https://mysite.com/0.1.0/requesters/installation.html`    |
| `docs/pages/README.md`                | `https://mysite.com/pages/README.html`                |

### Updating existing versions

When you improve the docs, consider if the change you are making applies to
multiple versions of Lighthouse.

Just change the relevant parts of each separate docs folder and commit it all
in a single PR.

### Tagging a new version

1. First, finish your work on `docs/next`.

1. Enter a new version number. We only tag minor releases, so `3.1` will get separate
    docs, but `3.1.4` will not.

        yarn bump 3.1

This will copy the contents of `docs/next/` into `docs/<version>/`
and place a new version number in `docs/.vuepress/versions.json`.