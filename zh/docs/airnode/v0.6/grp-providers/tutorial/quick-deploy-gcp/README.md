---
title: Instructions
---

<TitleSpan>Quick Deploy GCP</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,4]" />

This demo is a simple Airnode deployment, using a hands-on approach, to better understand the overall deployment process of the Airnode [deployer image](../../../grp-providers/docker/deployer-image.md) which deploys the off-chain component of Airnode (a.k.a., the node) to GCP. It uses an API endpoint (`GET /simple/price`) from [CoinGecko](https://www.coingecko.com/en/api/documentation) which returns the current value of a coin. This demo does not detail the overall configuration of an Airnode, it is just a quick start.

An Airnode cloud provider deployment uses a Docker image (called [deployer image](../../../grp-providers/docker/deployer-image.md)) which in turn requires three files as input.

- [config.json](./config-json.md)
- [secrets.env](./secrets-env.md)
- gcp.json

For the purpose of this demo these files have been created and only require a few minor changes on your part to make the deployment of the demo Airnode successful. These changes are needed to supply a GCP project ID, chain provider url, and a mnemonic.

## Install Prerequisites

- Install the [Docker Desktop](https://docs.docker.com/get-docker/) and launch it.
- Install [Google Cloud SDK](https://cloud.google.com/sdk/docs/install).

## Project Folder

A project folder is needed for this demo. You can create it manually or download a zip file ready to go.

:::: tabs

::: tab Create Manually

Create a folder called `/quick-deploy-gcp` with two more internal folders named `/config` and `/output`. Place the contents of the files provided ([config.json](./config-json.md) and [secrets.env](./secrets-env.md)) into the locations show below.

```
quick-deploy-gcp
├── config
│   ├── config.json
│   └── secrets.env
└── output
```

:::

::: tab Download

Download the <a href="/zip-files/quick-deploy-gcp-v0.6.zip" download>
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

- `HTTP_GATEWAY_API_KEY`: Make up an apiKey to authenticate calls to the HTTP Gateway. Used to test your Airnode with CURL later. The expected length is 30 - 128 characters.

### GCP Project Setup & Credentials

1. First [create a GCP project](https://cloud.google.com/resource-manager/docs/creating-managing-projects) where the Airnode will be deployed. Once the project is created, add the project ID to the [secrets.env](./secrets-env.md) file.

2. In order for Airnode to deploy successfully, you need to enable the [App Engine Admin API](https://console.cloud.google.com/apis/library/appengine.googleapis.com) specifically for the project. After enabling it, wait a few minutes before deploying the Airnode for this change to take effect.

<!-- 3. Enable the
   [API Gateway](https://console.cloud.google.com/marketplace/product/google/apigateway.googleapis.com?returnUrl=%2Fapi-gateway%2Fapi&project=zzz).
   Select the proper project on the GCP Gateway page, then select the Enable
   button. If the Manage button is present for the project, the GCP Gateway is
   already enabled.-->

3. Create a new service account from the [Service accounts](https://console.cloud.google.com/iam-admin/serviceaccounts) menu. Grant this account access to the project by adding the role `Owner` during creation.

4. Once the new service account is created, click on it to bring up its management page. Select the KEYS tab and add a new access key of type JSON for this account. Download the key file and place in the root of the `/quick-deploy-gcp` directory. Rename it `gcp.json`.

## Deploy

Make sure Docker is running and then execute the deployer image from the root of the `quick-deploy-gcp` folder. A `receipt.json` file will be created upon completion. It contains some deployment information and is used to remove the Airnode.

<!-- Use of .html below is intended. -->
<airnode-WarningSimultaneousDeployments removeLink="../../docker/deployer-image.html#manual-removal"/>

Run the following command to deploy the demo Airnode. Note that the version of `api3/airnode-deployer` matches the `nodeVersion` in the config.json file. <airnode-DeployerPermissionsWarning/>

:::: tabs

::: tab Linux/Mac/WSL2

```sh
docker run -it --rm \
  -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
  -v "$(pwd)/gcp.json:/app/gcp.json" \
  -v "$(pwd)/config:/app/config" \
  -v "$(pwd)/output:/app/output" \
  api3/airnode-deployer:0.6.0 deploy
```

:::

::: tab Windows

For Windows, use CMD (and not PowerShell).

```sh
docker run -it --rm ^
  -v "%cd%/gcp.json:/app/gcp.json" ^
  -v "%cd%/config:/app/config" ^
  -v "%cd%/output:/app/output" ^
  api3/airnode-deployer:0.6.0 deploy
```

:::

::::

## Test the Airnode

After a successful deployment the Airnode can be tested directly using the [HTTP Gateways](../../guides/build-an-airnode/http-gateways.md) without accessing the blockchain. You provide endpoint parameters to get a response from an integrated API.

### HTTP Gateway

Looking at the [config.json](./config-json.md) code snippet below shows the HTTP gateway was activated for the Airnode. Furthermore the endpoint for `/simple/price` (with an `endpointId` of `0xf...53c`) has been added to `triggers.http[n]`. Only those endpoints added to the `http` array can be tested.

```json
"nodeSettings": {
  ...
  "httpGateway": {
    "enabled": true, // The gateway is activated for this Airnode
    "apiKey": "${HTTP_GATEWAY_API_KEY}", // Gateway apiKey
    "maxConcurrency": 20
  },
  ...
},
"triggers": {
  "rrp": [
    {
      "endpointId": "0x6db9e3e3d073ad12b66d28dd85bcf49f58577270b1cc2d48a43c7025f5c27af6",
      "oisTitle": "CoinGecko Basic Request",
      "endpointName": "coinMarketData",
    }
  ],
  "http": [
    {
      "endpointId": "0x6db9e3e3d073ad12b66d28dd85bcf49f58577270b1cc2d48a43c7025f5c27af6",
      "oisTitle": "CoinGecko Basic Request",
      "endpointName": "coinMarketData",
    }
  ],
  ...
}
```

### Execute Endpoint

Use CURL to execute the Airnode and get the results from the CoinGecko endpoint `/simple/price` bypassing the Rinkeby test network that Airnode was deployed for. As an alternative to CURL try an app such as [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/product/rest-client/). Windows users can also use [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install) (WSL2) to run CURL for Linux.

In order to test an endpoint make a HTTP POST request with the `endpointId` as a path parameter, the `Content-Type` header set to `application/json`, the `x-api-key` header set to the key and place the endpoint parameter in the request body as a key/value pair.

- `-X`: POST
- `-H`: The `Content-Type` using the value of `application/json`.
- `-H`: The `x-api-key` using the value of `HTTP_GATEWAY_API_KEY` from `secrets.env` file.
- `-d`: Use request body data to pass the endpoint parameter key/value pair.

URL:

<code style="overflow-wrap:break-word;">&#60;httpGatewayUrl>/0xf466b8feec41e9e50815e0c9dca4db1ff959637e564bb13fefa99e9f9f90453c</code>

- `<httpGatewayUrl>`: The base URL to the gateway, found in the `receipts.json` file. Update the placeholder in the CURL example below with its value.
- <code style="overflow-wrap:break-word;">0xf466b8feec41e9e50815e0c9dca4db1ff959637e564bb13fefa99e9f9f90453c</code>: Passed as a path parameter, the endpointId to call, see `triggers.rrp[0].endpointId` in the `config.json` file.

#### Request

:::: tabs

::: tab Linux/Mac/WSL2

```sh
curl -v \
-X POST \
-H 'Content-Type: application/json' \
-H 'x-api-key: 123-my-key-must-be-30-characters-min' \
-d '{"parameters": {"coinIds": "api3", "coinVs_currencies": "usd"}}' \
'<httpGatewayUrl>/0x6db9e3e3d073ad12b66d28dd85bcf49f58577270b1cc2d48a43c7025f5c27af6'
```

:::

::: tab Windows

```sh
curl -v ^
-X POST ^
-H 'Content-Type: application/json' ^
-H "x-api-key: 123-my-key-must-be-30-characters-min" ^
-d '{"parameters": {"coinIds": "api3", "coinVs_currencies": "usd"}}' ^
"<httpGatewayUrl>/0x6db9e3e3d073ad12b66d28dd85bcf49f58577270b1cc2d48a43c7025f5c27af6"
```

:::

::::

#### Response

```json
{
  "encodedValue": "0x0000000000000000000000000000000000000000000000000000000000362b30",
  "rawValue": {
    "api3": {
      "usd": 3.55
    }
  },
  "values": ["3550000"]
}
```

<airnode-tutorials-TutorialResponse/>

## Remove the Airnode

When you are done with this demo you can remove it. When the Airnode was deployed a `receipt.json` file was created in the `/output` folder. This file is needed to remove an Airnode.

:::: tabs

::: tab Linux/Mac/WSL2

```sh
docker run -it --rm \
  -v "$(pwd)/gcp.json:/app/gcp.json" \
  -v "$(pwd)/output:/app/output" \
  api3/airnode-deployer:0.6.0 remove -r output/receipt.json
```

:::

::: tab Windows

For Windows, use CMD (and not PowerShell).

```sh
docker run -it --rm ^
  -v "%cd%/gcp.json:/app/gcp.json" ^
  -v "%cd%/output:/app/output" ^
  api3/airnode-deployer:0.6.0 remove -r output/receipt.json
```

:::

::::

::: danger Post Removal

After removing an Airnode it may be necessary to wait several minutes before deploying / redeploying Airnode again to the same project. GCP takes several minutes to complete its behind the scenes clean-up of configured resources.

:::

## Summary

You have deployed an Airnode on GCP. The Airnode, upon deployment, started contacting the AirnodeRrp contract on the Rinkeby testnet to gather any requests made by requesters to this Airnode. This tutorial did not address making a request as its purpose was simply to quickly deploy a functional Airnode.

Learn more about GCP resources that Airnode uses in the [Cloud Resources](../../../reference/cloud-resources.md) doc.
