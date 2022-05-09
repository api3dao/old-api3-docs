---
title: 说明
---

<TitleSpan>快速部署 GCP</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,4]" />

这个演示是一个简单的Airnode部署，使用实践的方法，以更好地理解Airnode[部署器镜像](../../../grp-providers/docker/deployer-image.md)的整体部署过程，它将Airnode的链外组件（又称节点）部署到GCP。 它使用来自[CoinGecko](https://www.coingecko.com/en/api/documentation)的API端点（`GET /simple/price`），返回代币的当前价值。 这个演示并没有详细说明Airnode的整体配置，它只是一个快速入门。

Airnode云供应商的部署使用了一个Docker镜像（称为[deployer](../../../grp-providers/docker/deployer-image.md)镜像），这又需要三个文件作为输入。

- [config.json](./config-json.md)
- [secrets.env](./secrets-env.md)
- gcp.json

为了这个演示的目的，这些文件已经被创建，只需要你做一些小的改动，就可以成功地部署演示的Airnode。 这些修改需要提供GCP项目ID、链供应商的URL和一个助记符。

## 安装预设

- 安装 [Docker桌面](https://docs.docker.com/get-docker/) 并启动它。
- 安装[Google Cloud SDK](https://cloud.google.com/sdk/docs/install)。

## 项目文件夹

这个演示需要一个项目文件夹。 您可以手动创建它，或下载准备就绪的压缩文件。

:::: tabs

::: tab 手动创建

创建一个名为`/quick-deploy-gcp`的文件夹，还有两个名为`/config`和`/output`的内部文件夹。 将所提供的文件（[config.json](./config-json.md) 和 [secrets.env](./secrets-env.md)）的内容放入以下所示的位置。

```
quick-deploy-gcp
├── config
│   ├── config.json
│   └── secrets.env
└── output
```

:::

::: tab 下载

下载 <a href="/zip-files/quick-deploy-gcp-v0.6.zip" download>
quick-deploy-gcp</a> 项目文件夹。

:::

::::

## 系统配置

准备配置文件，设置一个 GCP 项目并获取凭据。 默认情况下，Airnode部署器镜像会在`/config`中寻找`config.json`和`secrets.env`，并将 `receipt.json`写到`/output`文件夹中。

### config.json

这个文件不需要你做任何改动。 它只用一个API端点创建。 它将指示Airnode连接到Rinkeby测试网络。 这个文件将从`secrets.env`中提取（插值）三个变量。

### secrets.env

为每个字段添加值。

- `CHAIN_PROVIDER_URL`: 来自链供应商（如[Infura](https://infura.io/)）的网址。 请确保你使用的提供者网址是Rinkeby测试网络的。 使用Infura以外的其他链供应商也是可以接受的。

  - 注册或登录Infura。
  - 创建一个新的项目，选择项目中的**设置**标签。
  - 在端点选择列表下复制Rinkeby的 URL (https)。

- `AIRNODE_WALLET_MNEMONIC`: 为数字钱包提供种子短语（助记符）。 在本演示中，它不需要Rinkeby测试网络中的eth。 如果你没有的话，请使用管理员CLI命令[generate-mnemonic](../../../reference/packages/admin-cli.md#generate-mnemonic)来创建一个助记符，或使用其他你喜欢的方法。

- `PROJECT_ID`: GCP 项目ID。 该项目部署的 [创建一个 GCP 项目](https://cloud.google.com/resource-manager/docs/creating-managing-projects)， 并复制项目 id。

- `HTTP_GATEWAY_API_KEY`：创建一个apiKey来验证对HTTP网关的调用。 稍后使用 CURL 测试您的 Airnode 预计长度为 30 - 128 个字符。

### GCP 项目设置 & 证书

1. 首先[创建一个GCP项目](https://cloud.google.com/resource-manager/docs/creating-managing-projects)，Airnode将被部署在那里。 一旦项目被创建，将项目ID添加到[secrets.env](./secrets-env.md)文件中。

2. 为了让Airnode成功部署，你需要专门为该项目启用[App Engine Admin API](https://console.cloud.google.com/apis/library/appengine.googleapis.com)。 启用后，在部署Airnode之前等待几分钟，以便这一变化生效。

<!-- 3. Enable the
   [API Gateway](https://console.cloud.google.com/marketplace/product/google/apigateway.googleapis.com?returnUrl=%2Fapi-gateway%2Fapi&project=zzz).
   Select the proper project on the GCP Gateway page, then select the Enable
   button. If the Manage button is present for the project, the GCP Gateway is
   already enabled.-->

3. 从服务账户菜单中创建一个新的[服务账户](https://console.cloud.google.com/iam-admin/serviceaccounts)。 在创建过程中，通过添加角色`Owner`，授予该账户对项目的访问权。

4. 一旦新的服务账户被创建，点击它就会弹出其管理页面。 选择KEYS标签，为这个账户添加一个新的JSON类型的访问密钥。 下载密钥文件，放在`/quick-deploy-gcp`目录的根部。 重命名 `gcp.json`。

## Deploy

确保Docker正在运行，然后从`quick-deploy-gcp`文件夹的根部执行deployer镜像。 A `receipt.json` 文件将在完成后创建。 它包含一些部署信息，并将用于删除Airnode。

<!-- Use of .html below is intended. -->
<airnode-WarningSimultaneousDeployments removeLink="../../docker/deployer-image.html#manual-removal"/>

运行以下命令来部署演示Airnode。 注意，`api3/airnode-deployer`的版本与config.json文件中的`nodeVersion`一致。 <airnode-DeployerPermissionsWarning/>

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

对于Windows，使用 CMD (而不是 PowerShell)。

```sh
docker run -it --rm ^
  -v "%cd%/gcp.json:/app/gcp.json" ^
  -v "%cd%/config:/app/config" ^
  -v "%cd%/output:/app/output" ^
  api3/airnode-deployer:0.6.0 deploy
```

:::

::::

## 测试 Airnode

在成功部署后，Airnode可以直接使用[HTTP网关](../../guides/build-an-airnode/http-gateways.md)进行测试，而无需访问区块链。 您需要提供端点参数，以便从集成API中获得响应。

### HTTP网关

查看下面的[config.json](./config-json.md)代码片段，可以看到Airnode的HTTP网关被激活了。 此外，`/simple/price`的端点（`endpointId`为`0xf...53c`）已被添加到`triggers.http[n]`。 只有添加到 `http` 数组的端点才能够测试。

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

### 执行端点

使用CURL来执行Airnode，并从CoinGecko端点`/simple/price`获得结果，绕过Airnode部署的Rinkeby测试网络。 作为CURL的替代品，请尝试使用[Insomnia](https://insomnia.rest/)或[Postman](https://www.postman.com/product/rest-client/)等应用程序。 Windows用户也可以使用[Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install)（WSL2）来运行CURL for Linux。

为了测试一个端点，提出一个HTTP POST请求，将`endpointId`作为路径参数，`Content-Type`头设置为`application/json`，`x-api-key`头设置为key，将端点参数作为一个key/value对，放在请求体中。

- `-X`: POST
- `-H`: `Content-Type` 使用 `application/json` 的值。
- `-H`: `x-api-key` 使用 `HTTP_GATEWAY_API_KEY` 来自 `secrets.env` 文件的值。
- `-d`: 使用请求正文数据来传递端点参数键/值对。

URL：

<code style="overflow-wrap:break-word;">&#60;httpGatewayUrl>/0xf466b8feec41e9e50815e0c9dca4db1ff959637e564bb13fefa99e9f9f90453c</code>

- `<httpGatewayUrl>`：网关的基本URL，可以在`receipts.json`文件中找到。 用它的值更新下面CURL例子中的占位符。
- <code style="overflow-wrap:break-word;">0xf466b8feec41e9e50815e0c9dca4db1ff959637e564bb13fefa99e9f9f90453c</code>: 作为路径参数传递，要调用的endpointId，见`config.json`文件中的 `triggers.rrp[0].endpointId`。

#### 请求

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

#### 响应

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

## 移除Airnode

当你完成这个演示时，你可以删除它。 当部署完成后，`receipt.json`文件将被写入`/output`文件夹中。 需要此文件才能删除 Airnode。

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

对于Windows，使用 CMD (而不是 PowerShell)。

```sh
docker run -it --rm ^
  -v "%cd%/gcp.json:/app/gcp.json" ^
  -v "%cd%/output:/app/output" ^
  api3/airnode-deployer:0.6.0 remove -r output/receipt.json
```

:::

::::

::: danger Post Removal

移除一个 Airnode 后，可能需要等待几分钟才能在 再次部署/重新部署Airnode 到同一个项目。 GCP需要几分钟时间来完成对配置资源的幕后清理。

:::

## 总结

您已经在 GCP 上部署了一个 Airnode。 Airnode一经部署，就开始与Rinkeby testnet上的AnnodeRrp合约联系，以收集请求者对该Airnode提出的任何请求。 本教程没有涉及提出请求，因为其目的只是为了快速部署一个功能性的Airnode。

在[云资源](../../../reference/cloud-resources.md)文档中了解更多关于Airnode使用的GCP资源。
