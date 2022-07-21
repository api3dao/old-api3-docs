---
title: Airnode Deployer Image
folder: API Providers > Docker Images
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Use the deployer image to deploy or remove an Airnode with a cloud provider such
as AWS. The simplest way is to use the pre-built packages. If you would rather
build the images yourself see the
[README](https://github.com/api3dao/airnode/tree/v0.7/packages/airnode-deployer/docker)
in the deployer package.

::: tip Quick Deploy Demos

See the [Quick Deploy Demos](../tutorial/) to quickly deploy and remove a
preconfigured Airnode using the deployer image.

:::

## Configuration Files

The files `config.json` and `secrets.env` are used to configure the Airnode. The
`aws.env` and `gcp.json` files are used to define environment information the
deployer uses to connect to these cloud providers.

```
my-airnode
├── aws.env     <- Used for AWS deployment
├── gcp.json    <- Used for GCP deployment
├── config.json
└── secrets.env
```

## Cloud Provider Credentials

In order to deploy Airnode to a serverless cloud provider, you need to provide
could provider credentials to the Airnode deployer image. The deployer image
currently supports deploying to AWS and GCP. For AWS deployment, see the
[AWS Setup](../guides/build-an-airnode/configuring-airnode.md#aws-setup-aws-deployment-only)
and for GCP deployment, see the
[GCP Setup](../guides/build-an-airnode/configuring-airnode.md#gcp-setup-gcp-deployment-only).

## Deployer Image Commands

All three commands are the same for AWS and GCP with an exception of GCP. It
requires an additional parameter of `projectId` when removing a deployment.

- [deploy](./deployer-image.md#deploy)
- [remove-with-receipt](./deployer-image.md#remove-with-receipt)
- [remove-with-deployment-details](./deployer-image.md#remove-with-deployment-details)

### `deploy`

The [deploy](../../reference/packages/deployer.md#deploy) command will create
the Airnode with a cloud provider or update it if it already exists. Three files
are needed to run the deploy command.

- config.json
- secrets.env
- aws.env (AWS only)
- gcp.json (GCP only)

See
[Deploying an Airnode](../guides/build-an-airnode/deploying-airnode.md#deploy-with-docker)
for deployment commands specific to various operating systems and cloud
providers.

Note that a `receipt.json` file will be created upon completion. It contains
some deployment information and is used to remove the Airnode.

<!-- Use of .html below is intended. -->

<airnode-WarningSimultaneousDeployments removeLink="./deployer-image.html#manual-removal"/>

<p><airnode-DeployerPermissionsWarning/></p>

:::: tabs

::: tab Linux/Mac/WSL2

```sh
docker run -it --rm \
  -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
  -v "$(pwd):/app/config" \
  api3/airnode-deployer:0.8.0 deploy
```

:::

::: tab Windows

```sh
# For Windows, use CMD (not PowerShell).
docker run -it --rm ^
  -v "%cd%:/app/config" ^
  api3/airnode-deployer:0.8.0 deploy
```

:::

::::

:::tip Re-deployments

A unique deployment is defined by the value of
[nodeSetting.stage](../../reference/deployment-files/config-json.html#stage). If
you deploy again, using the same `nodeSetting.stage` value, then you are
re-deploying or updating the previous deployment.

- If the re-deployment fails (and
  [--auto-remove](../../reference/packages/deployer.html#deploy) = false) the
  Airnode could be left in an unstable state.
- If the re-deployment fails (and
  [--auto-remove](../../reference/packages/deployer.html#deploy) = true) the
  deployer will attempt to remove the Airnode.

For production systems consider changing the value of `nodeSetting.stage` to
create a new deployment and follow-up by removing the previous deployment.

:::

### `remove-with-receipt`

When an Airnode was deployed using the `deploy` command, a `receipt.json` file
was created. This file is used to remove the Airnode. The
[remove-with-receipt](../../reference/packages/deployer.md#remove-with-receipt)
command (identical for AWS and GCP) is the recommended way to remove a
deployment, but there are alternatives as described below.

:::: tabs

::: tab Linux/Mac/WSL2

```sh
docker run -it --rm \
  -v "$(pwd):/app/config" \
  api3/airnode-deployer:0.8.0 remove-with-receipt
```

:::

::: tab Windows

```sh
# For Windows, use CMD (not PowerShell).
docker run -it --rm ^
  -v "%cd%:/app/config" ^
  api3/airnode-deployer:0.8.0 remove-with-receipt
```

:::

::::

### `remove-with-deployment-details`

The
[remove-with-deployment-details](../../reference/packages/deployer.md#remove-with-deployment-details)
command is available as an alternative to `remove-with-receipt` and uses the
Airnode short address and cloud provider specifications. All values, other than
`airnodeShortAddress`, can be found in
[config.json](../../reference/deployment-files/config-json.md).

- `--airnode-address-short`: Can be found in the
  [receipt.json](../../reference/deployment-files/receipt-json.md) file or in
  the AWS or GCP consoles within the names of the serverless functions (e.g.,
  `abd9eaa`).
- `--stage`:
  [nodeSetting.stage](../../reference/deployment-files/config-json.md#stage)
- `--cloud-provider`:
  [nodeSetting.cloudProvider.type](../../reference/deployment-files/config-json.md#cloudprovider-type)
- `--region`:
  [nodeSetting.cloudProvider.region](../../reference/deployment-files/config-json.md#cloudprovider-region)
- `--project-id`: (GCP only)
  [cloudProvider.projectId](../../reference/deployment-files/config-json.md#cloudprovider-projectid)

Note that the example commands below use placeholder values that should be
replaced.

:::: tabs

::: tab Linux/Mac/WSL2

```sh
docker run -it --rm \
  -v "$(pwd):/app/config" \
  api3/airnode-deployer:0.8.0 remove-with-deployment-details \
  --airnode-address-short abd9eaa \
  --stage dev \
  --cloud-provider aws \
  --projectId myAirnode101 \ ← GCP only
  --region us-east-1
```

:::

::: tab Windows

```sh
#For Windows, use CMD (not PowerShell).
docker run -it --rm ^
  -v "$(pwd):/app/config" ^
  api3/airnode-deployer:0.8.0 remove-with-deployment-details ^
  --airnode-address-short abd9eaa ^
  --stage dev ^
  --cloud-provider aws ^
  --projectId myAirnode101 ^ ← GCP only
  --region us-east-1
```

:::

::::

## Manual Removal

Optionally you can remove an Airnode manually though it is highly recommended
that you do so using the deployer image's `remove-with-receipt` or
`remove-with-deployment-details` commands. Airnode has a presence in several
areas of both AWS and GCP. An Airnode has a `airnodeAddressShort` (e.g.,
`0ab830c`) that is included in the element name of AWS and GCP deployed
features.

::: danger Remember

Only delete elements of a feature with the `airnodeAddressShort` address in the
name you are targeting. There can be more than one Airnode.

:::

:::: tabs

::: tab AWS

<airnode-DeleteAirnodeAws />

:::

::: tab GCP

<airnode-DeleteAirnodeGcp />

:::

::::

Learn more about AWS or GCP resources that Airnode uses in the
[Cloud Resources](../../reference/cloud-resources.md) doc.
