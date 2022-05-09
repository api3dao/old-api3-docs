---
title: Instructions
---

<TitleSpan>Quick Deploy GCP</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

This demo is a simple Airnode deployment, using a hands-on approach, to better understand the overall deployment process of the Airnode [deployer image](../../../grp-providers/docker/deployer-image.md) which deploys the off-chain component of Airnode (a.k.a., the node) to GCP. It uses an API endpoint (`GET /simple/price`) from [CoinGecko](https://www.coingecko.com/en/api/documentation) which returns the current value of a coin. This demo does not detail the overall configuration of an Airnode, it is just a quick start.

An Airnode cloud provider deployment uses a Docker image (called [deployer image](../../../grp-providers/docker/deployer-image.md)) which in turn requires three files as input.

- [config.json](./config-json.md)
- [secrets.env](./secrets-env.md)

For the purpose of this demo these files have been created and only require a few minor changes on your part to make the deployment of the demo Airnode successful. These changes are needed to supply a GCP project ID, chain provider url, and a mnemonic.

## Install Prerequisites

- Install the [Docker Desktop](https://docs.docker.com/get-docker/) and launch it.
- Install [Google Cloud SDK](https://cloud.google.com/sdk/docs/install).

## Project Folder

A project folder is needed for this demo. You can create it manually or download a zip file ready to go.

:::: tabs

::: tab Create Manually

Create a folder called `/quick-deploy-gcp` with two more internal folders named `/config` and `/output`. Place the contents of the files provided ([config.json](./config-json.md) and [secrets.env](./secrets-env.md) into the locations show below.

```
quick-deploy-gcp
├── config
│   ├── config.json
│   └── secrets.env
└── output
    ├── receipt.json
```

:::

::: tab Download

Download the <a href="/zip-files/quick-deploy-gcp-v0.3.zip" download>
quick-deploy-gcp</a> project folder.

:::

::::

## Configuration

Prepare the configuration files, setup a GCP project and obtain credentials. By default, the Airnode deployer image looks for `config.json` and `secrets.env` in `/config` and writes `receipt.json` to the `/output` folder.

### config.json

This file requires no changes on your part. It has been created with just one API endpoint. It will instruct the Airnode to attach to the Rinkeby test network. There are three variables this file will extract (interpolation) from `secrets.env`.

### secrets.env

Add values for each of the these fields.

- `CHAIN_PROVIDER_URL`: A chain provider url from a provider such as [Infura](https://infura.io/). Make sure the provider url you use is for the Rinkeby test network. Using another chain provider other than Infura is acceptable.

  - Sign-up or login to Infura.
  - Create a new project, select the **Settings** tab in the project.
  - Copy the URL (https) for Rinkeby under the Endpoints pick list.

- `AIRNODE_WALLET_MNEMONIC`: Provide the seed phrase (mnemonic) to a digital wallet. For the purpose of this demo it does not need eth in it for the Rinkeby test network. If you don't have one use the Admin CLI command [generate-mnemonic](../../../reference/packages/admin-cli.md#generate-mnemonic) to create one or another method you prefer.

- `PROJECT_ID`: Project ID of your GCP project. [Create a GCP project](https://cloud.google.com/resource-manager/docs/creating-managing-projects) under which will the Airnode be deployed and copy the project ID.

### GCP Project Setup & Credentials

In order for Airnode to deploy successfully, you need to enable these APIs for your GCP project:

- [CloudFunction API](https://console.cloud.google.com/apis/library/cloudfunctions.googleapis.com)
- [Cloud Build API](https://console.cloud.google.com/apis/library/cloudbuild.googleapis.com)
- [Cloud Scheduler API](https://console.cloud.google.com/apis/library/cloudscheduler.googleapis.com)

After enabling these, wait a few minutes before the deployment itself so the changes will take place.

The easiest way to obtain GCP credentials is via [Google Cloud SDK](https://cloud.google.com/sdk/docs/install). Once installed, run the following command to retrieve your [Application Default Credentials](https://cloud.google.com/sdk/gcloud/reference/auth/application-default/login):

```bash
gcloud auth application-default login --project <PROJECT ID>
```

where `<PROJECT ID>` is your project ID.

## Deploy

Make sure Docker is running and then execute the deployer image from the root of the `quick-deploy-demo` folder. A `receipt.json` file will be created upon completion. It contains some deployment information and is used to remove the Airnode.

Run the following command to deploy the demo Airnode. Note that the version of `api3/airnode-deployer` matches the `nodeVersion` in the config.json file. <airnode-DeployerPermissionsWarning/>

When deploying to GCP, the location of the credentials file will vary depending on which operating system you use.

:::: tabs

::: tab Linux/Mac/WSL2

```sh
docker run -it --rm \
  -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
  -v "${HOME}/.config/gcloud:/app/gcloud" \
  -v "$(pwd)/config:/app/config" \
  -v "$(pwd)/output:/app/output" \
  api3/airnode-deployer:0.3.1 deploy
```

:::

::: tab Windows

For Windows, use CMD (and not PowerShell).

```sh
docker run -it --rm ^
  -v "%cd%/config:/app/config" ^
  -v "%cd%/output:/app/output" ^
  -v "%AppData%/gcloud:/app/gcloud" ^
  api3/airnode-deployer:0.3.1 deploy
```

:::

::::

## Confirm the Airnode Deployment

After a successful deployment you can see the Airnode logs in your [GCP Logs Explorer](https://console.cloud.google.com/logs). If the logs look like the following illustration, the Airnode is up and running.

```
INFO Coordinator starting...
...
INFO Pending requests: 0 API call(s), 0 withdrawal(s)
...
INFO Coordinator completed
```

<!-- Not really sure what else to put here. HTTP gateway is not available for GCP -->

## Remove the Airnode

When you are done with this demo you can remove it. When the Airnode was deployed a `receipt.json` file was created in the `/output` folder. This file is needed to remove an Airnode.

The location of the credentials file will vary depending on which operating system you use.

:::: tabs

::: tab Linux/Mac/WSL2

```sh
docker run -it --rm \
  -v "${HOME}/.config/gcloud:/app/gcloud"
  -v "$(pwd)/output:/app/output" \
  api3/airnode-deployer:0.3.1 remove -r output/receipt.json
```

:::

::: tab Windows

For Windows, use CMD (and not PowerShell).

```sh
docker run -it --rm ^
  -v "%cd%/output:/app/output" ^
  -v "%AppData%/gcloud:/app/gcloud" ^
  api3/airnode-deployer:0.3.1 remove -r output/receipt.json
```

:::

::::

## Summary

You have deployed an Airnode on GCP. The Airnode, upon deployment, started contacting the AirnodeRrp contract on the Rinkeby testnet to gather any requests made by requesters to this Airnode. This tutorial did not address making a request as its purpose was simply to quickly deploy a functional Airnode.
