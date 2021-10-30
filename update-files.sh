#!/bin/bash

# Update files from airnode repo for v0.2
curl -s https://raw.githubusercontent.com/api3dao/airnode/v0.2/packages/airnode-node/config/config.json.example \
-o ./docs/airnode/v0.2/reference/examples/config-local.json
curl -s https://raw.githubusercontent.com/api3dao/airnode/v0.2/packages/airnode-deployer/config/config.json.example \
-o ./docs/airnode/v0.2/reference/examples/config-provider.json

# Update files from airnode repo for v0.3

# Move customized VuePress file from doc to node_modules vuepress, all versions
yarn copy:navbar
yarn copy:sidebar
yarn copy:searchbox
