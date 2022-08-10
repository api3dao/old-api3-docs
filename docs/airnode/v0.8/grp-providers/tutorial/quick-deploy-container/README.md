---
title: Instructions
docSetName: Airnode v0.8
folder: API Providers > Tutorials > Quick Deploy Container
basePath: /airnode/v0.8
tags:
  - quick deploy container
  - tutorial tutorials
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

This demo is a simple Airnode deployment, using a hands-on approach, to better
understand the overall deployment process of the Airnode
[client image](../../../grp-providers/docker/client-image.md) which deploys the
off-chain component of Airnode ([a.k.a., the node](../../../)) to a Docker
container, in this case a locally run Docker container. It uses an API endpoint
(`GET /simple/price`) from
[CoinGecko](https://www.coingecko.com/en/api/documentation) which returns the
current value of a coin. This demo does not detail the overall configuration of
an Airnode, it is just a quick start.

An Airnode Docker container deployment uses a Docker image (called
[client image](../../../grp-providers/docker/client-image.md)) which in turn
requires two files as input.

- [config.json](./config-json.md)
- [secrets.env](./secrets-env.md)

For the purpose of this demo these files have been created and only require a
few minor changes on your part to make the deployment of the demo Airnode
successful. These changes are needed to supply a chain provider url and a
mnemonic.

## Install Prerequisites

Install the [Docker Desktop](https://docs.docker.com/get-docker/) and launch it.

## Project Folder

A project folder is needed for this demo. You can create it manually or download
a zip file ready to go.

:::: tabs

::: tab Create Manually

Create a folder called `quick-deploy-container`. Place the contents of the files
provided ([config.json](./config-json.md) and [secrets.env](./secrets-env.md))
into the folder as shown below.

```
quick-deploy-container
├── config.json
└── secrets.env
```

:::

::: tab Download

Download the <a href="/zip-files/quick-deploy-container-v0.8.zip" download>
quick-deploy-container</a> project folder.

:::

::::

## Configuration

Prepare the two configuration files, `config.json` and `secrets.env`. By
default, the Airnode client image looks for them in the project root directory.

### config.json

This file requires no changes on your part. It has been created with just one
API endpoint. It will instruct the Airnode to attach to the Rinkeby test
network. There are a few variables this file will extract (interpolate) from
`secrets.env`.

### secrets.env

Add values for each of the these fields.

- `CHAIN_PROVIDER_URL`: A chain provider url from a provider such as
  [Infura](https://infura.io/). Make sure the provider url you use is for the
  Rinkeby test network. Using another chain provider other than Infura is
  acceptable.

  - Sign-up or login to Infura.
  - Create a new project, select the **Settings** tab in the project.
  - Copy the URL (https) for Rinkeby under the Endpoints pick list.

- `AIRNODE_WALLET_MNEMONIC`: Provide the seed phrase (mnemonic) to a digital
  wallet. For the purpose of this demo it does not need eth in it for the
  Rinkeby test network. If you don't have one use the Admin CLI command
  [generate-airnode-mnemonic](../../../reference/packages/admin-cli.md#generate-airnode-mnemonic)
  to create one or another method you prefer.

- `HTTP_GATEWAY_API_KEY`: The authentication API key that needs to be sent with
  every HTTP gateway request.

## Deploy

Make sure Docker is running and then run the Airnode client container from the
root of the `quick-deploy-container` folder.

Run the following command to deploy the Airnode locally. Note that the version
of `api3/airnode-client` matches the `nodeVersion` in the config.json file.

:::: tabs

::: tab Linux

```sh
docker run --detach \
  --volume "$(pwd):/app/config" \
  --name quick-deploy-container-airnode \
  --network host \
  api3/airnode-client:0.7.2
```

:::

::: tab Mac/WSL2/PowerShell

```sh
docker run --detach \
  --volume "$(pwd):/app/config" \
  --name quick-deploy-container-airnode \
  --publish 3000:3000 \
  api3/airnode-client:0.7.2
```

:::

::: tab Windows CMD

For Windows CMD:

```batch
docker run --detach ^
  --volume "%cd%:/app/config" ^
  --name quick-deploy-container-airnode ^
  --publish 3000:3000 ^
  api3/airnode-client:0.7.2
```

:::

::::

Note that `--publish HOST_PORT:CONTAINER_PORT` parameter can have different
values for the `HOST_PORT` and `CONTAINER_PORT`. E.g. parameter
`--publish 8000:3000` would expose the web server on port 8000 on the host
machine. If run using [host networking](https://docs.docker.com/network/host/)
you need to change the port via
[gatewayServerPort](../../../reference/deployment-files/config-json.md#cloudprovider-gatewayserverport)
property inside config.json.

For Linux, it's recommended to use
[host networking](https://docs.docker.com/network/host/).

## Test the Airnode

### Request

Make a CURL request using the example below. Be sure to replace
`HTTP_GATEWAY_API_KEY` with your key from `secrets.env`.

```sh
# For Windows CMD replace line termination marker \ with ^
curl -X POST \
  -d '{"parameters":{"coinIds":"api3","coinVs_currencies":"usd"}}' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <HTTP_GATEWAY_API_KEY>' \
  'http://localhost:3000/http-data/0x6db9e3e3d073ad12b66d28dd85bcf49f58577270b1cc2d48a43c7025f5c27af6'
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

## Start and Stop

You can start and stop the Airnode with the Docker desktop application or via
terminal commands.

```sh
docker stop quick-deploy-container-airnode

docker start quick-deploy-container-airnode
```

## Logs

You can view the Airnode's logs with the Docker desktop application or via
terminal commands.

```sh
docker logs quick-deploy-container-airnode

docker logs --follow quick-deploy-container-airnode
```

## Remove the Airnode

When you are done with this demo you can remove it. Do so using the Docker
desktop application or by using the following terminal command. When using the
terminal command be sure to stop the container first if running.

```sh
# Stop the container if it is running.
docker stop quick-deploy-container-airnode

docker rm quick-deploy-container-airnode
```

## Summary

You have deployed an Airnode into a Docker container. This Airnode attaches
itself to the Rinkeby testnet as stated in the `config.json` file. The Airnode,
upon deployment, started contacting the AirnodeRrpV0 contract on the Rinkeby
testnet to gather any requests made by requesters to this Airnode.

This tutorial did not address making a request on-chain as its purpose was
simply to quickly deploy a functional Airnode.

Finally the API integration was tested using the
[HTTP gateway](../../guides/build-an-airnode/http-gateways.md#http-gateway). You
made a CURL request (using HTTP) to the HTTP gateway and Airnode queried the API
provider and sent back a response. All of this was performed without accessing
the blockchain.
