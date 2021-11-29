---
title: Deployer
---

<TitleSpan>Reference</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

The
[airnode-deployer](https://github.com/api3dao/airnode/tree/v0.2/packages/airnode-deployer)
package is used primarily by the [Docker Images](../../grp-providers/docker/).
This CLI tool provides the underlying commands used by the Docker images when
deploying an Airnode.

::: warning Deploying an Airnode

API providers are strongly encouraged to use the
[Docker Images](../../grp-providers/docker/) when deploying an Airnode and not
the deployer CLI commands.

:::

## Usage

Following are the instructions to build and use the deployer CLI.

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
  [config.json](https://github.com/api3dao/airnode/blob/v0.2/packages/airnode-deployer/config/config.json.example)
  and
  [secrets.env](https://github.com/api3dao/airnode/blob/v0.2/packages/airnode-deployer/config/secrets.env.example)
  templates to get started quickly, but you will need to edit these with your
  own API details and secrets.

```bash
# Change directories: /packages/airnode-deployer
cd packages/airnode-deployer

cp config/config.json.example config/config.json
cp config/secrets.env.example config/secrets.env
# Edit both `config.json` and `secrets.env` to reflect your configuration.
```

### Common user flow

1. Make sure you have `config.json` and `secrets.env` ready. Then, use the
   `deploy` command to trigger your first deployment.
2. In order to update the Airnode configuration:
   - Update the `config.json` and `secrets.env` files as needed.
   - Run the `deploy` command again.
3. Use the `remove` command to remove the Airnode deployment. Use the `-r`
   option to provide the receipt file from the latest deployment.

### Commands

#### deploy

```bash
# Deploys an Airnode instance using the `config.json` and `secrets.env` files.
# This can be used for a new deployment or to update an existing deployment.

Options:
      --version                          Show version number              [boolean]
      --debug                            Run in debug mode                [boolean] [default: false]
      --help                             Show help                        [boolean]
  -c, --configuration, --config, --conf  Path to configuration file       [string] [default: "config/config.json"]
  -s, --secrets                          Path to secrets file             [string] [default: "config/secrets.env"]
  -r, --receipt                          Output path for receipt file     [string] [default: "output/receipt.json"]
      --interactive                      Run in interactive mode          [boolean] [default: true]

# Example
deployer deploy --config myConfig/config.json --secrets myConfig/secrets.env -r myOutput/receipt.json
```

#### remove

An Airnode can be removed using the remove command two different ways.

- Best > With a deploy receipt created when the Airnode was deployed.
- Alternate > With the Airnode short address and AWS specifications. The
  `airnodeShortAddress` is used in the AWS console within the names of the
  Lambda functions. The other values can be found in `config.json`.
  - `nodeSetting.cloudProvider`
  - `nodeSetting.stage`
  - `nodeSetting.region`

```bash
# Removes a deployed Airnode instance.

Options:
      --version             Show version number                   [boolean]
      --debug               Run in debug mode                     [boolean] [default: false]
      --help                Show help                             [boolean]
  -r, --receipt             Path to receipt file                  [string]
  -a, --airnodeAddressShort Airnode address (short version)       [string]
  -s, --stage               Stage (environment)                   [string]
  -c, --cloudProvider       Cloud provider                        [string]
  -e, --region              Region                                [string]

  #Examples
  deployer remove --receipt myOutput/receipt.json

  deployer remove --airnodeAddressShort abd9eaa --stage dev --cloudProvider aws --region us-east-1
```
