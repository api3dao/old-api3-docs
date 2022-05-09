---
title: Instructions
---

<TitleSpan>Quick Deploy Container</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

This demo is a simple Airnode deployment, using a hands-on approach, to better understand the overall deployment process of the Airnode [client image](../../../grp-providers/docker/deployer-image.md) which deploys the off-chain component of Airnode ([a.k.a., the node](../../../)) to a Docker container, in this case a locally run Docker container. It uses an API endpoint (`GET /simple/price`) from [CoinGecko](https://www.coingecko.com/en/api/documentation) which returns the current value of a coin. This demo does not detail the overall configuration of an Airnode, it is just a quick start.

An Airnode Docker container deployment uses a Docker image (called [client image](../../../grp-providers/docker/deployer-image.md)) which in turn requires two files as input.

- [config.json](./config-json.md)
- [secrets.env](./secrets-env.md)

For the purpose of this demo these files have been created and only require a few minor changes on your part to make the deployment of the demo Airnode successful. These changes are needed to supply a chain provider url and a mnemonic.

## Install Prerequisites

Install the [Docker Desktop](https://docs.docker.com/get-docker/) and launch it.

## Project Folder

A project folder is needed for this demo. You can create it manually or download a zip file ready to go.

:::: tabs

::: tab Create Manually

Create a folder called `quick-deploy-container` with an internal folder named `/config`. Place the contents of the files provided ([config.json](./config-json.md) and [secrets.env](./secrets-env.md)) into the locations show below.

```
quick-deploy-container
├── config
    ├── config.json
    └── secrets.env
```

:::

::: tab Download

Download the <a href="/zip-files/quick-deploy-container-v0.4.zip" download>
quick-deploy-container</a> project folder.

:::

::::

## Configuration

Prepare the two configuration files, `config.json` and `secrets.env`. By default, the Airnode client image looks for them in the `/config` folder.

### config.json

This file requires no changes on your part. It has been created with just one API endpoint. It will instruct the Airnode to attach to the Rinkeby test network. There are two variables this file will extract (interpolation) from `secrets.env`.

### secrets.env

Add values for each of the these fields.

- `CHAIN_PROVIDER_URL`: A chain provider url from a provider such as [Infura](https://infura.io/). Make sure the provider url you use is for the Rinkeby test network. Using another chain provider other than Infura is acceptable.

  - Sign-up or login to Infura.
  - Create a new project, select the **Settings** tab in the project.
  - Copy the URL (https) for Rinkeby under the Endpoints pick list.

- `AIRNODE_WALLET_MNEMONIC`: Provide the seed phrase (mnemonic) to a digital wallet. For the purpose of this demo it does not need eth in it for the Rinkeby test network. If you don't have one use the Admin CLI command [generate-mnemonic](../../../reference/packages/admin-cli.md#generate-mnemonic) to create one or another method you prefer.

## Deploy

Make sure Docker is running and then execute the client image from the root of the `quick-deploy-container` folder.

Run the following command to deploy the demo Airnode locally. Note that the version of `api3/airnode-deployer` matches the `nodeVersion` in the config.json file.

:::: tabs

::: tab Linux/Mac/WSL2/PowerShell

```sh
docker run --detach \
  --volume "$(pwd)/config:/app/config" \
  --name quick-deploy-container-airnode \
  api3/airnode-client:0.4.1
```

:::

::: tab Windows CMD

For Windows, use CMD (and not PowerShell).

```sh
docker run --detach ^
  --volume "%cd%/config:/app/config" ^
  --name quick-deploy-container-airnode ^
  api3/airnode-client:0.4.1
```

:::

::::

## Start and Stop

You can start and stop the Airnode with the Docker desktop application or via terminal commands.

```sh
docker stop quick-deploy-container-airnode

docker start quick-deploy-container-airnode
```

## Logs

You can view the Airnode's logs with the Docker desktop application or via terminal commands.

```sh
docker logs quick-deploy-container-airnode

docker logs --follow quick-deploy-container-airnode
```

## Test the Airnode

After a successful deployment the Airnode can be tested using the [test-api.js](https://github.com/api3dao/airnode/tree/v0.4/packages/airnode-node#testing-api) script which allows you to execute an Airnode endpoint without accessing the blockchain.

::: warning test-api.js

The `test-api.js` nodejs script is an unsupported feature used for internal development and should not be used for any production purposes. It is used here purely for demonstration purposes.

:::

The Nodejs script `test-api.js` requires two arguments, endpointId and parameters to get a response from an integrated API. These arguments come from the `config.json` file.

- -e, --endpoint-id \[string\]\[required\]: See config.json `triggers.rrp[0].endpointId`.
- -p, --parameters \[string\] \[default: "{}"\]: See config.json `ois.endpoints[0].parameters[0].name`.

The arguments are pre-filled for you in the request code below. Note the JSON response value is the ETH price multiplied by `1e6`, which results from setting the `_times` reserved parameter to `1000000` in `config.json`. This manipulation is necessary in order to correctly handle floating point numbers.

### Request

```sh
# For Windows CMD replace line termination marker \ with ^
docker exec -it quick-deploy-container-airnode node src/cli/test-api.js \
  -e 0xf466b8feec41e9e50815e0c9dca4db1ff959637e564bb13fefa99e9f9f90453c \
  -p '{"coinIds":"api3", "coinVs_currencies":"usd"}'
```

Alternately you could run the test using the CLI command prompt provided for the container in the Docker desktop application.

```sh
# For Windows CMD replace line termination marker \ with ^
node src/cli/test-api.js \
  -e 0xf466b8feec41e9e50815e0c9dca4db1ff959637e564bb13fefa99e9f9f90453c \
  -p '{"coinIds":"api3", "coinVs_currencies":"usd"}'
```

### Response

```json
{
  "encodedValue": "0x0000000000000000000000000000000000000000000000000000000000362b30",
  "rawValue": { "api3": { "usd": 3.55 } },
  "values": ["3550000"]
}
```

<airnode-tutorials-TutorialResponse/>

## Remove the Airnode

When you are done with this demo you can remove it. Do so using the Docker desktop application or by using the following terminal command. When using the terminal command be sure to stop the container first if running.

```sh
# Stop the container if it is running.
docker stop quick-deploy-container-airnode

docker rm quick-deploy-container-airnode
```

## Summary

You have deployed an Airnode into a Docker container and tested it using the `test-api.js` Nodejs script. Please remember the script is not supported for use in production environments.

This Airnode attaches itself to the Rinkeby testnet as stated in the `config.json` file. The Airnode, upon deployment, started contacting the AirnodeRrp contract on the Rinkeby testnet to gather any requests made by requesters to this Airnode. This tutorial did not address making a request on-chain as its purpose was simply to quickly deploy a functional Airnode.
