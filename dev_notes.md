# Development Notes

Some side-notes while developing with VuePress.

## language does not exist

While the message does not seem to be an issue it is annoying.

```bash
4:47:20 PM: Language does not exist: text
4:47:20 PM: Language does not exist: text
```

This message may appear (may times) when running `yarn docs:dev or build`. Try running `NODE_OPTIONS="--max-old-space-size=4096" yarn docs:dev or build`. Afterwards go back to using `yarn docs:dev` and the message should go away.

The package.json script can also be updated if the message does not go away.

https://github.com/vuejs/vuepress/issues/1066

## Deploying Docs to GitHub Pages

1. Commit and push to remote repo.
1. Merge branches @remote repo to master.
1. Switch to local master branch.
1. Pull remote master to local repo.
1. Run the deploy.sh script (passphrase for ssh key will be needed).
1. Switch back to your next development branch.

It is important to pull down the master after commit/push of a local working branch and then a merge to master @remote. This insures the local build of the dist folder gets the latest from all contributors

## Clean up origin/<branches>

May be needed to clear origin/gh-pages locally if you do not want it hanging around. Caused by missue of the deploy.sh script.

```bash
git branch -d -r origin/<remote branch name> (This will not delete the branch on the remote repo!)
```

https://gist.github.com/magnusbae/10182865
