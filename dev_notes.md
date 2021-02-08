# Dev Notes

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

This message may appear (may times) when running `yarn docs:dev or build`. Try running `NODE_OPTIONS="--max-old-space-size=8192" yarn docs:dev or build`. Afterwards go back to using `yarn docs:dev` and the message should go away.

The package.json script can also be updated if the mesagae appears. 

https://github.com/vuejs/vuepress/issues/1066

## vuepress-theme-reco

A possible solution to the lack of a page-right sub-sidebar.

https://github.com/vuepress-reco/vuepress-theme-reco/tags

## Clean up origin/<branches>

May be needed to clear origin/gh-pages locally if you donot want it hanging around. Caused by missue of the deploy.sh script

```bash
git branch -d -r origin/<remote branch name> (This will not delete the branch on the remote repo!)
```

https://gist.github.com/magnusbae/10182865
