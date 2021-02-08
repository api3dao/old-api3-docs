# DEV NOTES

Some issues that may come up while developing with VuePress.

## Netlify ENV vars

Adding environment variables to the Netlify deployment setup caused deploy errors.

```bash
vuepress not found
```

## language does not exist

While the message does not seem to be an issue it is annoying.

```bash
4:47:20 PM: Language does not exist: text
4:47:20 PM: Language does not exist: text
4:47:20 PM: Language does not exist: text
4:47:20 PM: Language does not exist: text
4:47:20 PM: Language does not exist: text
```

This message may appear (may times) when running `yarn docs:dev`. Try running `NODE_OPTIONS="--max-old-space-size=8192" yarn docs:dev`. Afterwards go back to using `yarn docs:dev` and the message should go away.

The package.json script can also be updated if the mesagae appears on Netlify auto builds. This of course will make the command used each time with local developement.

https://github.com/vuejs/vuepress/issues/1066

## vuepress-theme-reco

A poosible solutions to the lack of a page-right sub-sidebar.

https://github.com/vuepress-reco/vuepress-theme-reco/tags

