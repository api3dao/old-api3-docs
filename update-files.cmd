REM Unlike the file update-files.sh, it is not neccessary here for Windows (CMD) user 
REM to pull down files from the repo. These get done several times a day by
REM Linux/Mac/WSL2 users.

REM Move customized VuePress file from doc to node_modules vuepress, all versions
yarn copy:navbar
yarn copy:sidebar
yarn copy:searchbox
