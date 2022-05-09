---
title: 部署器
---

<TitleSpan>软件包</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

[Airnode部署器](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-deployer)软件包主要用于 [Docker 镜像](../../grp-providers/docker/)。 此 CLI 工具提供了Docker 镜像在 部署Airnode时使用的基本命令。

::: warning Deploying an Airnode

强烈推荐API供应商在部署 Airnode 时，使用 [Docker 镜像](../../grp-providers/docker/) 而不要使用部署器CLI 命令。

:::

## 用法

部署器的命令可以使用npx、安装全局[npx](https://nodejs.dev/learn/the-npx-nodejs-package-runner)软件包或通过手动构建airnode-deployer软件包来运行。 如果不希望使用Docker镜像，使用npx是与部署器手动交互的最简单方法。

- [使用 npx](./deployer.md#using-npx)
- [全局套件](./deployer.md#global-package)
- [手动创建](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-deployer)

### 使用 npx

airnode-deployer软件包可以使用npx作为npm软件包来运行。 这允许在不安装deployer npm软件包或不需要自己手动构建airnode-deployer软件包的情况下运行deployer命令。

```sh
npx @api3/airnode-deployer deploy --config pathTo/config.json --secrets pathTo/secrets.env --receipt myOutput/receipt.json
```

### 全局套件

airnode-deployer软件包，可以用yarn或npm全局安装。 如果使用 yarn 安装 ，请确保yarn bin 被添加到 `PATH` 中。

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
  [config.json](https://github.com/api3dao/airnode/blob/v0.5/packages/airnode-deployer/config/config.example.json)
  and
  [secrets.env](https://github.com/api3dao/airnode/blob/v0.5/packages/airnode-deployer/config/secrets.example.env)
  templates to get started quickly, but you will need to edit these with your
  own API details and secrets.

```bash
# Change directories: /packages/airnode-deployer
cd packages/airnode-deployer

cp config/config.json.example config/config.json
cp config/secrets.env.example config/secrets.env
# Edit both `config.json` and `secrets.env` to reflect your configuration.
```
-->## 示例

部署器有两条命令。 若要重新部署一个现有的 Airnode ，请重新运行 `deploy`命令。

- [部署](./deployer.md#deploy)
- [删除](./deployer.md#remove)

### 工作流程

1. 请确保您已经准备好了 `config.json` 和`secrets.env` 然后，使用 `deploy` 命令来触发您的首次部署。
2. 为了更新Airnode 配置：
   - 需要更新 `config.json` 和`secrets.env` 这两个文件。
   - 重新运行 `deploy` 命令。
3. 使用 `remove` 命令，删除 Airnode 部署。 使用 `-r`选项，提供最新部署的收据文件，或手动添加所需的参数。

### 部署

创建或更新Airnode 时，需要 `config.json` 和 `secrets.env` 两个文件。 您可以使用提供的示例[config.json](https://github.com/api3dao/airnode/blob/v0.5/packages/airnode-deployer/config/config.example.json)和 [secrets.env](https://github.com/api3dao/airnode/blob/v0.5/packages/airnode-deployer/config/secrets.example.env)，使用上述模板可以快速启动，但您还需要使用自己的API详细信息和秘密来编辑这些模板。

<!-- Use of .html below is intended. -->
<airnode-WarningSimultaneousDeployments removeLink="../../grp-providers/docker/deployer-image.html#manual-removal"/>

请确认 `config.json` 和`secrets.env` 可在 `--configuration` 参数的路径中使用。

完成 `deploy` 命令后来自使用`--receiving` 参数的路径和名称 创建收据。 该收据包含关于部署的元数据，可用于删除Airnode。

```bash
# 使用 `config.json` 和 `secrets.env` 文件部署一个 Airnode 实例。
# 这可以用于新部署或更新现有部署。

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

### 删除

删除一个 Airnode, 可以有两种不同的方式。

- **最佳：** 部署了 Airnode 时创建了部署收据。
- **备选：** 使用Airnode短地址和云供应商的规格。 `airnodeShortAddress` 被用于无服务器函数名称的 云端控制台。 其它值可以在 `config.json` 中找到。
  - `nodeSetting.cloudProvider.type`
  - `nodeSetting.cloudProvider.region`
  - <code style="overflow-wrap: break-word;">nodeSetting.cloudProvider.projectId</code>
(仅限GCP)
  - `nodeSetting.stage`

```bash
# 移除已部署的 Airnode 实例。

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
