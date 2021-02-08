# DEV NOTES

Some issues that may come up while developing with VuePress.

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

## Clean up origin/<branches> caused by missue of the deploy.sh script

```bash
git branch -d -r origin/<remote branch name> (This will not delete the branch on the remote repo!)
```

https://gist.github.com/magnusbae/10182865
