---
title: Deployer
---

<TitleSpan>Packages</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

The [airnode-deployer](https://github.com/api3dao/airnode/tree/v0.4/packages/airnode-deployer) package is used primarily by the [Docker Images](../../grp-providers/docker/). This CLI tool provides the underlying commands used by the Docker images when deploying an Airnode.

::: warning Deploying an Airnode

API providers are strongly encouraged to use the [Docker Images](../../grp-providers/docker/) when deploying an Airnode and not the deployer CLI commands.

:::

## Usage

The deployer's commands can be run using [npx](https://nodejs.dev/learn/the-npx-nodejs-package-runner), installing a global npm package or by manually building the airnode-deployer package. Using npx is the simplest method to interact with the deployer manually if you do not wish to use the Docker images.

- [Using npx](./deployer.md#using-npx)
- [Global Package](./deployer.md#global-package)
- [Build Manually](https://github.com/api3dao/airnode/tree/v0.4/packages/airnode-deployer)

### Using npx

The airnode-deployer package can be run as an npm package using npx. This allows you to run deployer commands without installing the deployer npm package or having to manually build the airnode-deployer package yourself.

```sh
npx @api3/airnode-deployer deploy --config pathTo/config.json --secrets pathTo/secrets.env -r myOutput/receipt.json
```

### Global Package

The airnode-deployer package can be installed globally with yarn or npm. If installed using yarn make sure yarn bin is added to `PATH`.

```sh
yarn global add @api3/airnode-deployer
# OR
npm install @api3/airnode-deployer -g

# Executing the deployer.
airnode-deployer deploy --config pathTo/config.json --secrets pathTo/secrets.env --receipt myOutput/receipt.json
```<!--  HOLD THIS UNTIL THE REPO README IS UPDATED
### Prerequisites

- Install [Terraform](https://www.terraform.io/downloads.html) and make sure
  that the terraform binary is available in your `PATH`.
- Make sure your AWS credentials are stored in the
  [configuration file](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html#cli-configure-files-where)
  or exported as
  [environment variables](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-envvars.html#envvars-set).
  If you need help setting up an AWS IAM user you can follow
  [this video tutorial](https://www.youtube.com/watch?v=bT19B3IBWHE). Note that
  this step is done for you when using the Docker
  [deployer image](../../grp-providers/docker/deployer-image.md).

### Setup

- Download the Airnode monorepo and build the Airnode packages.

```bash
git clone https://github.com/api3dao/airnode.git
cd airnode

# Run from the root of the airnode directory
git checkout v0.3
yarn run bootstrap
yarn build
```

- Make sure `config.json` and `secrets.env` are available in the `config`
  directory. You can use the provided example
  [config.json](https://github.com/api3dao/airnode/blob/v0.4/packages/airnode-deployer/config/config.json.example)
  and
  [secrets.env](https://github.com/api3dao/airnode/blob/v0.4/packages/airnode-deployer/config/secrets.env.example)
  templates to get started quickly, but you will need to edit these with your
  own API details and secrets.

```bash
# Change directories: /packages/airnode-deployer
cd packages/airnode-deployer

cp config/config.json.example config/config.json
cp config/secrets.env.example config/secrets.env
# Edit both `config.json` and `secrets.env` to reflect your configuration.
```
-->## Examples

The deployer has two commands. To re-deploy an existing Airnode run the `deploy` command again.

- [deploy](./deployer.md#deploy)
- [remove](./deployer.md#remove)

### Workflows

1. Make sure you have `config.json` and `secrets.env` ready. Then, use the `deploy` command to trigger your first deployment.
2. In order to update the Airnode configuration:
   - Update the `config.json` and `secrets.env` files as needed.
   - Run the `deploy` command again.
3. Use the `remove` command to remove the Airnode deployment. Use the `-r` option to provide the receipt file from the latest deployment or manually add the required arguments.

### deploy

When creating or updating an Airnode the `config.json` and `secrets.env` files are needed. You can use the provided example [config.json](https://github.com/api3dao/airnode/blob/v0.4/packages/airnode-deployer/config/config.json.example) and [secrets.env](https://github.com/api3dao/airnode/blob/v0.4/packages/airnode-deployer/config/secrets.env.example) templates to get started quickly, but you will need to edit these with your own API details and secrets.

<!-- Use of .html below is intended. -->
<airnode-WarningSimultaneousDeployments removeLink="../../grp-providers/docker/deployer-image.html#manual-removal"/>

Make sure `config.json` and `secrets.env` are available in the path for the `--configuration` argument.

When completed the `deploy` command creates a receipt using the path and name from the `--receipt` argument. The receipt contains metadata about the deployment and can be used to remove the Airnode.

```bash
# Deploys an Airnode instance using the `config.json` and `secrets.env` files.
# This can be used for a new deployment or to update an existing deployment.

Options:
      --version                          Show version number                                                   [boolean]
      --debug                            Run in debug mode                                    [boolean] [default: false]
      --help                             Show help                                                             [boolean]
  -c, --configuration, --config, --conf  Path to configuration file             [string] [default: "config/config.json"]
  -s, --secrets                          Path to secrets file                   [string] [default: "config/secrets.env"]
  -r, --receipt                          Output path for receipt file          [string] [default: "output/receipt.json"]

# Example
airnode-deployer deploy --config pathTo/config.json --secrets pathTo/secrets.env --receipt myOutput/receipt.json
```

### remove

An Airnode can be removed using the remove command two different ways.

- **Best:** With a deployment receipt created when the Airnode was deployed.
- **Alternate:** With the Airnode short address and cloud provider specifications. The `airnodeShortAddress` is used in the cloud console within the names of the serverless functions. The other values can be found in `config.json`.
  - `nodeSetting.cloudProvider.type`
  - `nodeSetting.cloudProvider.region`
  - <code style="overflow-wrap: break-word;">nodeSetting.cloudProvider.projectId</code>
(GCP only)
  - `nodeSetting.stage`

```bash
# Removes a deployed Airnode instance.

Options:
      --version                Show version number                                                             [boolean]
      --debug                  Run in debug mode                                              [boolean] [default: false]
      --help                   Show help                                                                       [boolean]
  -r, --receipt                Path to receipt file                                                             [string]
  -a, --airnode-address-short  Airnode Address (short version)                                                  [string]
  -s, --stage                  Stage (environment)                                                              [string]
  -c, --cloud-provider         Cloud provider                                                    [choices: "aws", "gcp"]
  -e, --region                 Region                                                                           [string]
  -p, --project-id             Project ID (GCP only)                                                            [string]

# Examples
airnode-deployer remove --receipt myOutput/receipt.json
airnode-deployer remove --airnode-address-short abd9eaa --stage dev --cloud-provider aws --region us-east-1
```
