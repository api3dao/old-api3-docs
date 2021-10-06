---
title: Quick Deploy
---

<TitleSpan>Quick Deploy Demo</TitleSpan>

# {{$frontmatter.title}}
<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

This demo is a simple Airnode deployment, using a hands-on approach, to better understand the overall deployment process using the [deployer image](../../docker/deployer-image.md). It will use an API endpoint (`GET /coins/{id}`) from [CoinGecko](https://www.coingecko.com/en/api/documentation?).

::: tip Additional Examples
There are additional examples of Airnode deployments in the [examples package](https://github.com/api3dao/airnode/tree/master/packages/examples) of the Airnode repo.

- Run Airnode as a docker container locally while connected to Rinkeby network.
- Run Airnode as a docker container locally, but connected to the hardhat (local) network.
- Deploy Airnode on AWS and use the Rinkeby network.
:::

An Airnode deployment uses a Docker image (called [deployer image](../../docker/deployer-image.md)) which in turn requires three files as input.

- [config.json](./config.json.md)
- [secrets.env](./secrets.env.md)
- [aws.env](./aws.env.md)

For the purpose of this demo these files have been created and only require a few minor changes on your part to make the deployment of the demo Airnode successful. These change are needed to supply AWS credentials and a chain provider url.

## Install Prerequisites

Install [Terraform](https://www.terraform.io/) and [Docker](https://docs.docker.com/get-docker/) if your system does not already have them installed.

## Project Folder

Create a folder called `/quick-deploy-demo` with two more internal folders named `/config` and `/output`. Place the contents of the files provided ([config.json](./config.json.md), [secrets.env](./secrets.env.md) and [aws.env](./aws.env.md)) into each.

```
quick-deploy-demo
├── aws.env
├── config
│   ├── config.json
│   └── secrets.env
└── output
    ├── receipt.json
```

By default, the deployer image looks for `config.json` and `secrets.env` in `/config`, `aws.env` in `/quick-deploy-demo` and writes `receipt.json` to the `/output` folder. You can place the `aws.env` file into the `/config` folder as well but will need to update its path in the deployer image call.

## Configuration


### config.json

This file requires no changes on your part. It has been created with just one API endpoint and will use the Rinkeby test network. There are three variables this file will extract (interpolation) from `secrets.env`.

### secrets.env

Add values for each of the these fields.

- `CHAIN_PROVIDER_URL`: A chain provider url from a provider such as [Infura]. Make sure the provider url you use is for the Rinkeby test network.
  - Sign-up or login to Infura.
  - Create a new project, select the **Settings** tab in the project.
  - Copy the URL (https) for Rinkeby under the Endpoints pick list.

- `AIRNODE_WALLET_MNEMONIC`: Provide the seed phrase (mnemonic) to a digital wallet. It must have eth in it for the Rinkeby test network, use the [faucet](https://faucet.rinkeby.io/) to get some.

- `HTTP_GATEWAY_API_KEY`: Make up an apiKey to authenticate calls to the HTTP Gateway to test yo0ur Airnode with CURL later.

### aws.env

Add the access credentials to your AWS account. The deployer image will use them to install the Airnode functions to Lambda under your account's control. If you do not have an account watch this [video](https://www.youtube.com/watch?v=KngM5bfpttA) to create one.

## Deploy

Make sure Docker is running then run the docker image from the root of the `quick-deploy-demo` folder.

By default, the Deployer is run by the user root. This may lead to some permission issues since the Deployer provides an output in a form of a receipt.json file. To avoid any permission problems, you can specify the UID (user identifier) and GID (group identifier) that the Deployer should use. You can do that by setting the environment variables USER_ID and GROUP_ID:

`-e USER_ID=$(id -u) -e GROUP_ID=$(id -g)`

:::: tabs
::: tab Linux/Mac
  ```sh
  docker run -it --rm \
  --env-file aws.env \
    -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
    -v "$(pwd)/config:/app/config" \
    -v "$(pwd)/output:/app/output" \
    @api3/deployer:latest deploy
  ```
:::
::: tab Windows
If you are using Windows, use CMD (and not PowerShell).
  ```sh
  docker run -it --rm ^
    --env-file aws.env ^
    -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) ^
    -v "%cd%/config:/app/config" ^
    -v "%cd%/output:/app/output" ^
    @api3/deployer:latest deploy
  ```
:::
::::

A `receipt.json` will be created upon completion. It is used to remove the Airnode.

## Testing

After a successful deployment the Airnode can be tested without interacting with the Rinkeby chain using the HTTP Gateway.