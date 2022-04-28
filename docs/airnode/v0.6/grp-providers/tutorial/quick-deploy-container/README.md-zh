---
title: 说明
---

<TitleSpan>快速部署容器</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

这个演示是一个简单的Airnode部署，使用实践的方法，以更好地理解Airnode[客户端镜像](../../../grp-providers/docker/deployer-image.md)的整体部署过程，它将Airnode的链外组件（[又称节点](../../../)）部署到Docker容器中，在这种情况下，作为一个本地运行的Docker容器。 它使用来自[CoinGecko](https://www.coingecko.com/en/api/documentation)的API端点（`GET /simple/price`），返回一个代币的当前价值。 这个演示并没有详细说明Airnode的整体配置，它只是一个快速入门。

Airnode Docker容器部署使用Docker镜像 (称为 [客户端镜像](../../../grp-providers/docker/deployer-image.md))，反过来 需要两个文件作为输入。

- [config.json](./config-json.md)
- [secrets.env](./secrets-env.md)

为了开展演示，这些文件已经创建，只需要你做一些小的改动，就可以成功部署演示的Airnode。 这些修改是为了提供一个链供应商的网址和一个助记符。

## 安装预设

安装 [Docker桌面](https://docs.docker.com/get-docker/) 并启动它。

## 项目文件夹

此演示需要一个项目文件夹。 您可以手动创建它，或下载准备就绪的压缩文件。

:::: tabs

::: tab 手动创建

创建一个名为`quick-deploy-container`的文件夹，内部文件夹名为`/config`。 将所提供的文件（[config.json、[secrets.env](./secrets-env.md)和aws.env](./config-json.md)）的内容放入以下所示的位置。

```
quick-deploy-container
├── config
    ├── config.json
    └── secrets.env
```

:::

::: tab 下载

下载 <a href="/zip-files/quick-deploy-container-v0.6.zip" download>
quick-deploy-aws</a> 项目文件夹。

:::

::::

## 系统配置

Airnode 运行需要两个配置文件： `config.json` 以及 `secrets.env`。 默认情况下，Airnode客户端镜像会在`/config`文件夹中寻找它们。

### config.json

这个文件不需要你做任何改动。 它只用一个API端点创建。 它将指示Airnode连接到Rinkeby测试网络。 此文件将从 `secrets.env` 中提取两个变量。

### secrets.env

为每个字段添加值。

- `CHAIN_PROVIDER_URL`:来自链供应商（如[Infura](https://infura.io/)）的网址。 请确保你使用的提供者网址是Rinkeby测试网络的。 使用Infura以外的其他连锁供应商也是可以接受的。

  - 注册或登录Infura。
  - 创建一个新的项目，选择项目中的**设置**标签。
  - 在端点选择列表下复制Rinkeby的 URL (https)

- `AIRNODE_WALLET_MNEMONIC`: 为数字钱包提供种子短语（助记符）。 在本演示中，它不需要Rinkeby测试网络中的eth。 如果你没有，请使用管理员CLI命令[generate-mnemonic](../../../reference/packages/admin-cli.md#generate-mnemonic)来创建一个助记符，或使用其他你喜欢的方法。

## 部署

确保Docker正在运行，然后从`quick-deploy-aws`文件夹的根部执行部署器镜像。

运行以下命令以在本地部署演示Airnode。 注意，`api3/airnode-deployer`的版本与config.json文件中的`nodeVersion`一致。

:::: tabs

::: tab Linux/Mac/WSL2/PowerShell

```sh
docker run --detach \
  --volume "$(pwd)/config:/app/config" \
  --name quick-deploy-container-airnode \
  api3/airnode-client:0.6.0
```

:::

::: tab Windows CMD

对于Windows，使用 CMD (而不是 PowerShell)。

```sh
docker run --detach ^
  --volume "%cd%/config:/app/config" ^
  --name quick-deploy-container-airnode ^
  api3/airnode-client:0.6.0
```

:::

::::

## 开始和停止

您可以使用 Docker 桌面应用程序或通过 终端命令来启动和停止 Airnode 。

```sh
docker stop quick-deploy-container-airnode

docker start quick-deploy-container-airnode
```

## 日志

您可以使用 Docker 桌面应用程序或 终端命令查看Airnode的日志。

```sh
docker logs quick-deploy-container-airnode

docker logs --follow quick-deploy-container-airnode
```

## 测试 Airnode

在成功部署后，可以使用[test-api.js](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-node#testing-api)脚本测试Airnode，它允许你在不访问区块链的情况下执行Airnode端点。

::: 警告 test-api.js

`test-api.js` nodejs 脚本是一个不支持的功能，用于内部 开发，不应用于任何生产目的。 这里完全用于演示目的。

:::

Nodejs 脚本 `test-api.js` 需要两个参数, endpointId 和 参数才能从集成的 API 获得响应。 这些参数从 `config.json` 文件获取.

- -e, --endpoint-id \[string\]\[required\]: 参见 config.json `triggers.rrp[0].endpointId`
- -p, --parameters \[string\] \[default: "{}"\]: 查看 config.json `ois.endpoints[0].parameters[0].name`.

在下面的请求代码中，预先填写参数。 注意JSON响应值是ETH价格乘以`1e6`，这是由于在`config.json`中设置`_times`保留参数为`1000000`的结果。 此操作 是正确处理浮点数所必需的。

### 请求

```sh
# For Windows CMD replace line termination marker \ with ^
docker exec -it quick-deploy-container-airnode node src/cli/test-api.js \
  -e 0x6db9e3e3d073ad12b66d28dd85bcf49f58577270b1cc2d48a43c7025f5c27af6 \
  -p '{"coinIds":"api3", "coinVs_currencies":"usd"}'
```

或者，您可以使用 Docker 桌面应用程序为 容器提供的 CLI 命令提示来运行测试。

```sh
# For Windows CMD replace line termination marker \ with ^
node src/cli/test-api.js \
  -e 0x6db9e3e3d073ad12b66d28dd85bcf49f58577270b1cc2d48a43c7025f5c27af6 \
  -p '{"coinIds":"api3", "coinVs_currencies":"usd"}'
```

### 响应

```json
{
  "encodedValue": "0x0000000000000000000000000000000000000000000000000000000000362b30",
  "rawValue": { "api3": { "usd": 3.55 } },
  "values": ["3550000"]
}
```

<airnode-tutorials-TutorialResponse/>

## 移除Airnode

当你完成这个演示时，你可以删除它。 使用 Docker 桌面应用程序或使用以下终端命令。 当使用 终端命令时，如果正在运行，会先停止容器。

```sh
# 如果容器正在运行，请停止它。
docker stop quick-deploy-container-airnode

docker rm quick-deploy-container-airnode
```

## 总结

您已经在 Docker 容器中部署了一个 Airnote，并使用 `test-api.js` Nodejs 脚本测试了它。 请记住不支持脚本在生产环境中使用。

如`config.json`文件中所述，这个Airnode将自己连接到Rinkeby testnet。 Airnode在部署后，开始与Rinkeby testnet上的AnnodeRrp合约联系，以收集请求者向这个Airnode提出的任何请求。 本教程不涉及在链上发出请求，因为其目的只是为了快速部署一个功能性的Airnode。
