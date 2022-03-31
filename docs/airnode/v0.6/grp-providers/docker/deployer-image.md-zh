---
title: Airnode Deployer Image
---

<TitleSpan>Docker Images</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

Use the deployer image to deploy or remove an Airnode with a cloud provider such as AWS. The simplest way is to use the pre-built packages. If you would rather build the images yourself see the [README](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-deployer/docker) in the deployer package.

The deployer image has two commands.

- `deploy`: Deploys or updates an Airnode using configuration files.
- `remove`: Removes an Airnode using its `receipt.json` file.

::: tip Quick Deploy Demos

See the [Quick Deploy Demos](../tutorial/) to quickly `deploy` and `remove` a preconfigured Airnode using the deployer image.

:::

## Cloud Provider Credentials

In order to deploy Airnode to a serverless cloud provider, you need to provide could provider credentials to the Airnode deployer image. The deployer image currently supports deploying to AWS and GCP.

### AWS

If you are new to AWS watch this [video](https://www.youtube.com/watch?v=KngM5bfpttA) to set up an AWS account and create cloud provider credentials.

### GCP

- Create a [Google Cloud project](https://cloud.google.com/resource-manager/docs/creating-managing-projects)
- Enable [App Engine Admin API](https://console.cloud.google.com/apis/library/appengine.googleapis.com) for your project
- Create a new [service account](https://console.cloud.google.com/iam-admin/serviceaccounts) with the `Owner` role
- Add a new access key of type JSON for the service account and download it as `gcp.json`

## deploy

The `deploy` command will create the Airnode with a cloud provider or update it if it already exists. Three files are needed to run the deploy command.

- config.json
- secrets.env
- aws.env (AWS only)
- gcp.json (GCP only)

A `receipt.json` file will be created upon completion. It contains some deployment information and is used to remove the Airnode.

<!-- Use of .html below is intended. -->
<airnode-WarningSimultaneousDeployments removeLink="./deployer-image.html#manual-removal"/>

<p><airnode-DeployerPermissionsWarning/></p>

### AWS

:::: tabs

::: tab Linux/Mac/WSL2

```sh
docker run -it --rm \
  --env-file aws.env \
  -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
  -v "$(pwd)/config:/app/config" \
  -v "$(pwd)/output:/app/output" \
  api3/airnode-deployer:0.6.0 deploy
```

:::

::: tab Windows

For Windows, use CMD (and not PowerShell).

```sh
docker run -it --rm ^
  --env-file aws.env ^
  -v "%cd%/config:/app/config" ^
  -v "%cd%/output:/app/output" ^
  api3/airnode-deployer:0.6.0 deploy
```

:::

::::

### GCP

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

```sh
docker run -it --rm ^
  -v "%cd%/gcp.json:/app/gcp.json" ^
  -v "%cd%/config:/app/config" ^
  -v "%cd%/output:/app/output" ^
  api3/airnode-deployer:0.6.0 deploy
```

:::

::::

## remove

When an Airnode was deployed using the `deploy` command a `receipt.json` file was created. Use this file to remove an Airnode.

### AWS

:::: tabs

::: tab Linux/Mac/WSL2

```sh
docker run -it --rm \
  --env-file aws.env \
  -v "$(pwd)/output:/app/output" \
  api3/airnode-deployer:0.6.0 remove -r output/receipt.json
```

:::

::: tab Windows

For Windows, use CMD (and not PowerShell).

```sh
docker run -it --rm ^
  --env-file aws.env ^
  -v "%cd%/output:/app/output" ^
  api3/airnode-deployer:0.6.0 remove -r output/receipt.json
```

:::

::::

### GCP

:::: tabs

::: tab Linux/Mac/WSL2

```sh
docker run -it --rm \
  -v "$(pwd)/gcp.json:/app/gcp.json" \
  -v "$(pwd)/output:/app/output" \
  api3/airnode=deployer:0.6.0 remove -r output/receipt.json
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

## Manual Removal

Optionally you can remove an Airnode manually though it is highly recommended that you do so using the deployer image's `remove` command. Airnode has a presence in several areas of both AWS and GCP. An Airnode has a `airnodeAddressShort` (e.g., `0ab830c`) that is included in the element name of AWS and GCP deployed features.

::: danger Remember

Only delete elements of a feature with the `airnodeAddressShort` address in the name you are targeting. There can be more than one Airnode.

:::

:::: tabs

::: tab AWS

<airnode-DeleteAirnodeAws />

:::

::: tab GCP

<airnode-DeleteAirnodeGcp />

:::

::::

Learn more about AWS or GCP resources that Airnode uses in the [Cloud Resources](../../reference/cloud-resources.md) doc.
