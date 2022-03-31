---
title: Deploying Airnode
---

<TitleSpan>Build an Airnode</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>
<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

After integrating your API ([API Integration](api-integration.md)) and creating the configuration files ([Configuring Airnode](configuring-airnode.md)), the next step is to deploy the Airnode.

::: tip Complete the following before deploying your Airnode.

- [API Integration](api-integration.md)
- [Configuring Airnode](configuring-airnode.md)
- [Applying Authorization](./apply-auth.md) optional
- [Heartbeat](./heartbeat.md) optional
- [HTTP Gateway](./http-gateway.md) optional

:::

## Deploy with Docker

The recommended way to deploy Airnode is by using the Docker [deployer image](../../docker/deployer-image.md). This image is simply a wrapper around the [deployer CLI](https://github.com/api3dao/airnode/tree/v0.2/packages/airnode-deployer). Try out the [Quick Deploy](../../tutorial/) tutorial if you wish to become familiar with the deployer image first.

The deployer interacts with a cloud provider (AWS) to deploy Airnode programmatically, without requiring you to click through a lot of ever-changing graphical interfaces. For it to do so, an `aws.env` file is required and was discussed in [Configuring an Airnode](./configuring-airnode.md#creating-aws-env).

## Install Docker

The [deployer image](../../docker/deployer-image.md) is containerized as a Docker image. This will deploy the Airnode to AWS Lambda without the worry of installing dependencies and is the recommended way to do a deployment. If you do not already have docker installed go to the [Docker website](https://docs.docker.com/get-docker/) and install it.

## Deployment

At this point your project should resemble the following. The `config.json`, `secrets.env` and `aws.env` files should be ready to go. Other files you may have added are expected but not used by the deployer image.

```
my-airnode
├── aws.env
├── config
│   ├── config.json
│   └── secrets.env
└── output
    ├── receipt.json
```

From the root of the project directory run the Docker [deployer image](../../docker/deployer-image.md) which will deploy the Airnode to AWS. When the deployment has completed a `receipt.json` file will be written to the `/output` folder. This file contains important configuration information about the Airnode and is needed to remove the Airnode should the need arise.

<p><airnode-DeployerPermissionsWarning/></p>

:::: tabs

::: tab Linux/Mac/WSL2

```
docker run -it --rm \
  --env-file aws.env \
  -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
  -v "$(pwd)/config:/app/config" \
  -v "$(pwd)/output:/app/output" \
  api3/airnode-deployer:0.2.2 deploy
```

:::

::: tab Windows

```sh
docker run -it --rm ^
  --env-file aws.env ^
  -v "%cd%/config:/app/config" ^
  -v "%cd%/output:/app/output" ^
  api3/airnode-deployer:0.2.2 deploy
```

:::

::::

When the deployment is complete a `receipt.json' file is placed into the`/output` folder.

### receipt.json

The `receipt.json` file is a product of a successful deployment. It contains configuration information for the Airnode and must be used to remove the Airnode should you choose.

```json
{
  "airnodeWallet": {
    "airnodeAddress": "0xaBd9daAdf32fCd96eE4607bf3d5B31e19a244Cac",
    "airnodeAddressShort": "abd9daa",
    "xpub": "xpub661MyMwAqRbcGHp9uC7...vbeziJwFHuNs"
  },
  "deployment": {
    "airnodeAddressShort": "abd9daa",
    "cloudProvider": "aws",
    "region": "us-east-1",
    "stage": "dev",
    "nodeVersion": "0.2.2"
  },
  "api": {
    "httpGatewayUrl": "https://6vmx3xp8tj.execute-api.us-east-1.amazonaws.com/v1/test"
  }
}
```

## Testing with HTTP Gateway

If you opted to enable the HTTP Gateway it can be used to test the Airnode while bypassing the chain it was deployed to. There are two examples in other docs that detail how to do this.

- [HTTP Gateway](./http-gateway.md#using-curl)
- [Quick Deploy](../../tutorial/README.md#test-the-airnode)

## Removing the Airnode

When the Airnode was deployed a `receipt.json` file was created in the `/output` folder. This file is needed to remove an Airnode.

- `--env-file`: Location of the `aws.env` file.
- `-v`: Location of the `receipt.json` file.

:::: tabs

::: tab Linux/Mac/WSL2

```sh
docker run -it --rm \
  --env-file aws.env \
  -v "$(pwd)/output:/app/output" \
  api3/airnode-deployer:0.2.2 remove -r output/receipt.json
```

:::

::: tab Windows

For Windows, use CMD (and not PowerShell).

```sh
docker run -it --rm ^
  --env-file aws.env ^
  -v "%cd%/output:/app/output" ^
  api3/airnode-deployer:0.2.2 remove -r output/receipt.json
```

:::

::::

## Calling the Airnode

Once the Airnode is deployed, see [Calling an Airnode](../../../grp-developers/call-an-airnode.md) to learn how requests are made to it.
