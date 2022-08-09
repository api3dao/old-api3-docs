---
title: Deployer
docSetName: Airnode v0.8
folder: Reference > Packages
basePath: /airnode/v0.8
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,4]" />

The
[airnode-deployer](https://github.com/api3dao/airnode/tree/v0.7/packages/airnode-deployer)
package is used primarily by the [Docker Images](../../grp-providers/docker/).
This CLI tool provides the underlying commands used by the Docker images when
deploying an Airnode.

::: warning Deploying an Airnode

API providers are strongly encouraged to use the
[Docker Images](../../grp-providers/docker/) when deploying an Airnode and not
the deployer CLI commands.

:::

## Usage

The deployer's commands can be run using
[npx](https://nodejs.dev/learn/the-npx-nodejs-package-runner), installing a
global npm package or by manually building the airnode-deployer package. Using
npx is the simplest method to interact with the deployer manually if you do not
wish to use the Docker images.

- [Using npx](./deployer.md#using-npx)
- [Global Package](./deployer.md#global-package)
- [Build Manually](https://github.com/api3dao/airnode/tree/v0.7/packages/airnode-deployer)

### Using npx

The airnode-deployer package can be run as an npm package using npx. This allows
you to run deployer commands without installing the deployer npm package or
having to manually build the airnode-deployer package yourself.

```sh
npx @api3/airnode-deployer deploy --config config/config.json --secrets config/secrets.env --receipt config/receipt.json
```

### Global Package

The airnode-deployer package can be installed globally with yarn or npm. If
installed using yarn make sure yarn bin is added to `PATH`.

```sh
yarn global add @api3/airnode-deployer
# OR
npm install @api3/airnode-deployer -g

# Executing the deployer.
airnode-deployer deploy --config config/config.json --secrets config/secrets.env --receipt config/receipt.json
```

<!--  HOLD THIS UNTIL THE REPO README IS UPDATED
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
  [config.json](https://github.com/api3dao/airnode/blob/v0.7/packages/airnode-deployer/config/config.example.json)
  and
  [secrets.env](https://github.com/api3dao/airnode/blob/v0.7/packages/airnode-deployer/config/secrets.example.env)
  templates to get started quickly, but you will need to edit these with your
  own API details and secrets.

```bash
# Change directories: /packages/airnode-deployer
cd packages/airnode-deployer

cp config/config.json.example config/config.json
cp config/secrets.env.example config/secrets.env
# Edit both `config.json` and `secrets.env` to reflect your configuration.
```
-->

## Commands

### Airnode Deployment

When creating or updating an Airnode the `config.json` and `secrets.env` files
are needed. You can use the provided example
[config.json](https://github.com/api3dao/airnode/blob/v0.7/packages/airnode-deployer/config/config.example.json)
and
[secrets.env](https://github.com/api3dao/airnode/blob/v0.7/packages/airnode-deployer/config/secrets.example.env)
templates to get started quickly, but you will need to edit these with your own
API details and secrets.

<!-- Use of .html below is intended. -->
<airnode-WarningSimultaneousDeployments removeLink="../../grp-providers/docker/deployer-image.html#manual-removal"/>

Make sure `config.json` and `secrets.env` are available in the path for the
`--configuration` argument.

#### deploy

When executed, the `deploy` command defaults to creating a `receipt.json` file
in the `config/` directory, although a different path can be specified using the
path and name with the `--receipt` argument. The receipt contains metadata about
the deployment and can be used to remove the Airnode.

If the deployment isn't successful, the command will try to automatically remove
deployed resources. You can disable this by running the deploy command with a
`--no-auto-remove` argument.

```bash
# Deploys an Airnode instance using the `config.json` and `secrets.env` files.
# This can be used for a new deployment or to update an existing deployment.

Options:
      --version                          Show version number                                                   [boolean]
      --debug                            Run in debug mode                                    [boolean] [default: false]
      --help                             Show help                                                             [boolean]
  -c, --configuration, --config, --conf  Path to configuration file             [string] [default: "config/config.json"]
  -s, --secrets                          Path to secrets file                   [string] [default: "config/secrets.env"]
  -r, --receipt                          Output path for receipt file          [string] [default: "config/receipt.json"]
      --auto-remove                      Enable automatic removal of deployed resources for failed deployments
                                                                                               [boolean] [default: true]

# Basic example
airnode-deployer deploy

# Advanced example
airnode-deployer deploy --config config/config.json --secrets config/secrets.env --receipt config/receipt.json
```

### Airnode Removal

An Airnode can be removed in two different ways:

- **Best:** With `remove-with-receipt`, which uses the deployment receipt
  created when the Airnode was deployed.
- **Alternate:** With `remove-with-deployment-details`, which uses the Airnode
  short address and cloud provider specifications. The `airnodeShortAddress` is
  used in the cloud console within the names of the serverless functions. The
  other values can be found in `config.json`.
  - `nodeSetting.cloudProvider.type`
  - `nodeSetting.cloudProvider.region`
  - <code style="overflow-wrap: break-word;">nodeSetting.cloudProvider.projectId</code>
    (GCP only)
  - `nodeSetting.stage`

#### remove-with-receipt

```bash
# Removes a deployed Airnode instance.

Options:
      --version                Show version number                                                             [boolean]
      --debug                  Run in debug mode                                              [boolean] [default: false]
      --help                   Show help                                                                       [boolean]
  -r, --receipt                Path to receipt file                            [string] [default: "config/receipt.json"]

# Basic example
airnode-deployer remove-with-receipt

# Advanced example specifying the receipt file location
airnode-deployer remove-with-receipt --receipt config/receipt.json
```

#### remove-with-deployment-details

```bash
# Removes a deployed Airnode instance.

Options:
      --version                Show version number                                                             [boolean]
      --debug                  Run in debug mode                                              [boolean] [default: false]
      --help                   Show help                                                                       [boolean]
  -a, --airnode-address-short  Airnode Address (short version)                                                  [string]
  -s, --stage                  Stage (environment)                                                              [string]
  -c, --cloud-provider         Cloud provider                                                    [choices: "aws", "gcp"]
  -e, --region                 Region                                                                           [string]
  -p, --project-id             Project ID (GCP only)                                                            [string]

# Example
airnode-deployer remove-with-deployment-details --airnode-address-short abd9eaa --stage dev --cloud-provider aws --region us-east-1
```
