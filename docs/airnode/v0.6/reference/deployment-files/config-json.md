---
title: config.json
---

<TitleSpan>部署文档</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2, 4]" />

`config.json`定义了一个单一的Airnode部署。 该文件内容是一个单一的JSON对象。 每个配置对象可以被认为是Airnode部署的静态NoSQL数据库。 它包含五个字段，如下所示。

```json
{
  "chains": [],
  "nodeSettings": {},
  "triggers": {},
  "ois": [],
  "apiCredentials": []
}
```

- [chain](./config-json.md#chains): Airnode 部署将 服务的区块链及其配置细节
- [nodeSettings](./config-json.md#nodesettings): 常规部署参数，例如节点版本和部署配置。
- [triggers](./config-json.md#triggers): 哪些链上的端点将被哪些可用的协议（目前只有RRP）使用，以及在什么端点ID下使用。
- [ois](./config-json.md#ois): API规格和相应的链上端点，作为[OIS](/ois/v1.0.0/ois.md)对象保存。
- [apiCredentials](./config-json.md#apicredentials): 哪些API凭证，可用于哪些OIS和安全方案。

## 区块链

列出Airnode 部署将服务的区块链，并规定相关参数。

<!--  -->

```json
// chains
[
  {
    "maxConcurrency": 100,
    "authorizers": ["0xeabb...C123", "0xCE5e...1abc"],
    "contracts": {
      "AirnodeRRP": "0x12B4...0C1a"
    },
    "id": "1",
    "providers": {
      "selfHostedMainnet": {
        "url": "${CP_SELF_HOSTED_MAINNET_URL}"
      },
      "infuraMainnet": {
        "url": "${CP_INFURA_MAINNET_URL}"
      }
    },
    "type": "evm",
    "options": {
      "txType": "eip1559",
      "priorityFee": {
        "value": 3.12,
        "unit": "gwei"
      },
      "baseFeeMultiplier": 2
    },
    "blockHistoryLimit": 300,
    "minConfirmations": 0,
    "ignoreBlockedRequestsAfterBlocks": 20
  },
  {
    "maxConcurrency": 100,
    "authorizers": [],
    "contracts": {
      "AirnodeRRP": "0xf1d4...0bd1"
    },
    "id": "3",
    "providers": {
      "infuraRopsten": {
        "url": "${CP_INFURA_ROPSTEN_URL}"
      }
    },
    "type": "evm",
    "options": {
      "txType": "eip1559",
      "priorityFee": {
        "value": 3.12,
        "unit": "gwei"
      },
      "baseFeeMultiplier": 2
    }
  }
]
```

### `maxConcurrency`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#maxconcurrency) (必须) - 最大并发数，指定了每个单一的Airnode调用的最大并发处理程序数量。

### `authorizers`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#authorizers) (必须) - 授权者合同地址列表，指定Airnode应该使用的授权模式。 一个空数组将允许所有。

### `contracts`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#contracts) （必须）一个对象，用于保存部署在各自链上的协议合约的地址。 必须包括`AirnodeRRP` 合约地址。

### `id`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#id) (必须) - 相应的链(或网络) ID。 如果这是一个基于Ethereum的链，`id` 应该是[EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md#list-of-chain-ids)中描述的链ID。 请参考你将要使用的链的文件，以找到它的链ID。

### `providers`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#providers) (必须) - 将要使用的区块链供应商名单。 注意，其中的多个可以同时使用。 Airnode部署将期望在各自的`url`字段中找到这些链提供商的URL。

### `type`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#type) (必须) - 链的类型。 目前只支持 `evm`。

### `options`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#options) (必须) - 配置链相关选项的对象。

#### `options.txType`

(必须) - 要使用的交易类型：

- `"legacy"` - 传统的交易类型
- `"eip1559"` - [EIP-1559交易类型](https://eips.ethereum.org/EIPS/eip-1559)

#### `options.priorityFee`

(可选) - 配置EIP-1559为优先收费的对象 (默认为 为`{"value": 3.12, "value": "gwei"}`)

#### `options.baseFeeMultiplier`

(可选) - 将 EIP-1559基础费用定义为最大费用乘数 (默认为 `2`)

最终最大费用将等于 `(Base Fee * baseFeeMultiplier) + priorityFee`

### `blockHistoryLimit`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#blockhistorylimit) (可选) - Airnode部署应搜索请求的过去区块的数量。 默认值为 `300` (Etherum大约为1小时)。

### `minConfirmations`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#minconfirmations) (可选) - 请求被视为有效的确认数。 最小确认数指的是自当前确认的区块以来已经过去的区块数。 默认值为：`0`。

### `ignoreBlockedRequestsAfterBlocks`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#ignoreblockedrequestsafterblocks) （可选) - 需要通过的块数，节点才能启动，忽略被阻止的请求。 默认值为：`20`。 当无法调用API时，请求将被阻止。 在config.json中找不到端点（由请求中的id指定）。 (可选) - Airnode部署应该搜索请求的过去的区块数。 默认值为 `300` (Etherum大约为1小时)。

## nodeSettings

一个包含Airnode常规部署参数的对象。

```json
// nodeSettings
{
  "nodeVersion": "0.6.0",
  "cloudProvider": {
    "type": "gcp",
    "region": "us-east1",
    "disableConcurrencyReservations": false,
    "projectId": "${GCP_PROJECT_ID}"
  },
  "stage": "testnet",
  "airnodeWalletMnemonic": "${AIRNODE_WALLET_MNEMONIC}",
  "heartbeat": {
    "enabled": true,
    "url": "${HEARTBEAT_URL}",
    "apiKey": "${HEARTBEAT_API_KEY}",
    "id": "${HEARTBEAT_ID}"
  },
  "httpGateway": {
    "enabled": true,
    "apiKey": "${HTTP_GATEWAY_API_KEY}",
    "maxConcurrency": 20
  },
  "httpSignedDataGateway": {
    "enabled": true,
    "apiKey": "${HTTP_SIGNED_DATA_GATEWAY_API_KEY}",
    "maxConcurrency": 20
  },
  "logFormat": "json",
  "logLevel": "INFO"
}
```

### `cloudProvider`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#cloudprovider) (必填) - 节点将被部署的云供应商及其配置。

#### `cloudProvider.type`

(必须) - 目前无服务器([deployer-image](../../grp-providers/docker/deployer-image.md))支持`aws` 和`gcp`。 如果你想把Airnode作为一个docker容器在本地运行（[client-image](../../grp-providers/docker/client-image.md)），则使用 `local`。

#### `cloudProvider.region`

（AWS和GCP必须) - 节点将被部署在的云供应商区域。 关于可能的值，请参见云提供商的文档。 当使用GCP时，确保选择一个[**区域**而不是位置](https://cloud.google.com/compute/docs/regions-zones)。

#### `cloudProvider.disableConcurrencyReservations`

(AWS 和 GCP所需) - 禁用生成云端函数的缓存保留。 欲了解更多信息，请参阅 [`maxConcurrency`](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#maxconcurrency) 部分。

#### `cloudProvider.projectId`

(GCP所需) -Airnode将被部署在GCP项目下的项目ID。

### `airnodeWalletMnemonic`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#airnodewalletmnemonic) (必需) - 将被Airnode使用的钱包助记符。

### `heartbeat`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#heartbeat) (必须) - Airnode的“调用主页”功能。 Airnode可以定期向指定的URL发出请求，表示它是激活的。 未来有计划允许发送一个有效载荷，其中包括用于报告目的的信息。

#### `heartbeat.enabled`

(required) - 启用/禁用，使用 true/false，Airnode的heartbeat。

#### `heartbeat.apiKey`

(仅在启用时) - 用于验证heartbeat URL 的 API 密钥。

#### `heartbeat.id`

(仅在启用时) - 为了核算目的的 Airnode heartbeat ID。

#### `heartbeat.url`

(仅在启用时) - 作出heartbeat请求的URL。

### `httpGateway`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#httpgateway) （必须) - Airnode的HTTP网关，可以在不使用区块链的情况下请求端点。

#### `httpGateway.enabled`

(必须) - 启用/禁用，使用 true/false, Airnode访问 HTTP网关。

#### `httpGateway.apiKey`

(仅在启用时) - 要在网关上进行身份验证的 API 密钥。

#### `httpGateway.maxConcurrency`

(只有在启用的情况下，可选) - 一个大于零的数字，代表同时运行的服务于HTTP网关请求的无服务器函数的最大数量。 当省略时，没有设置最大并发数。

### `httpSignedDataGateway`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#httpsigneddatagateway) （必须) - Airnode的HTTP网关，可以在不使用区块链的情况下请求端点。

#### `httpSignedDataGateway.enabled`

(必须) - 启用/禁用，使用 true/false, Airnode访问 HTTP网关。

#### `httpSignedDataGateway.apiKey`

(仅在启用时) - 要在网关上验证的 API 密钥。

#### `httpSignedDataGateway.maxConcurrency`

(只有在启用的情况下，可选) - 一个大于零的数字，代表同时运行的服务于HTTP网关请求的无服务器函数的最大数量。 当省略时，没有设置最大并发量。

### `logFormat`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#logformat) (必须) - 用于输出日志的格式。 要么是`json`，要么是 `plain`.

### `logLevel`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#loglevel) (必须) - 将要输出的日志的最高级别. `DEBUG`, `INFO`, `WARN` 或是 `ERROR`.

### `nodeVersion`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#nodeversion) (必须) - 将与此配置对象一起部署的节点(Airnode)。

### `stage`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#stage) (必须) - 用于区分云供应商上同一Airnode的多个部署的标签。

### `skipValidation`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#skipvalidation) (可选) - 是否应该跳过 config.json 验证。 默认值为 `false`。

## 触发器

一个数组，用于将外部触发器，如通过RRP提出的请求（或通过PSP提出的订阅，目前尚未实现）映射到OIS中定义的端点。

```json
// triggers
{
  "rrp": [
    {
      "endpointId": "0xd7ddc8ee64d6e540682ec844a5dd9737663ec3afe5751102eb4f966744751838",
      "oisTitle": "myOisTitle",
      "endpointName": "myEndpointName"
    }
  ],
  "http": [
    {
      "endpointId": "0xd7ddc8ee64d6e540682ec844a5dd9737663ec3afe5751102eb4f966744751838",
      "oisTitle": "myOisTitle",
      "endpointName": "myEndpointName"
    }
  ],
  "httpSignedData": [
    {
      "endpointId": "0xd7ddc8ee64d6e540682ec844a5dd9737663ec3afe5751102eb4f966744751838",
      "oisTitle": "myOisTitle",
      "endpointName": "myEndpointName"
    }
  ]
}
```

在上面的例子中，Airnode部署有一个OIS，标题为`myOisTitle`。 这个OIS有一个端点，名称为`myEndpointName`。 当Airnode部署检测到引用其[`airnodeAddress`](../../concepts/airnode.md#airnodeaddress)和
<code style="overflow-wrap: break-word;">0xe1da7948e4dd95c04b2aaa10f4de115e67d9e109ce618750a3d8111b855a5ee5</code>作为 [`endpointId`](../../concepts/endpoint.md#endpointid)的[request](../../concepts/request.md) 时，它将调用指定的端点（`myOisTitle`-`myEndpointName`）与请求中提供的参数来实现它。 请参阅[endpoint id documentation](../../concepts/endpoint.md#endpointid)文档，了解衍生 `endpointId`的默认惯例。

### `rrp`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#rrp) (必须) - 来自OIS的端点数组，Airnode将对RRP协议进行响应。

#### `rrp[n].endpointId`

(必须) - 为 oisTitle/endpointName配对导出的标识符，见 [derive-endpoint-id](../packages/admin-cli.md#derive-endpoint-id)。

#### `rrp[n].oisTitle`

(必须) - OIS对象的标题。

#### `rrp[n].endpointName`

(必须) - OIS端点的端点名称。

### `http`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#http) (必须) - Airnode 将响应的 OIS 数组端点。

#### `http[n].endpointId`

(required) - 为 oisTitle/endpointName 衍生出的标识符，见 [derive-endpoint-id](../packages/admin-cli.md#derive-endpoint-id)。

#### `http[n].oisTitle`

(必须) - OIS对象的标题。

#### `http[n].endpointName`

(必须) - OIS端点的端点名称。

### `httpSignedData`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#httpsigneddata) (必须) - Airnode 将响应的 OIS 数组端点。

#### `httpSignedData[n].endpointId`

(必须) - 为 oisTitle/endpointName配对导出的标识符，见 [derive-endpoint-id](../packages/admin-cli.md#derive-endpoint-id)。

#### `httpSignedData[n].oisTitle`

(必须) - OIS对象的标题。

#### `httpSignedData[n].endpointName`

(必须) - OIS端点的端点名称。

## ois

一个OIS对象的列表。 由于每个OIS都规定了一个API与一个预言机的集成，所以一个Airnode部署可以为多个API提供服务。 为了避免内容的重复，请参阅[预言机集成(OIS)](/ois/v1.0.0/) ，了解完整的例子及其字段的解释。

## apiCredentials

`apiCredentials` 中的每个条目都映射到OIS（`ois[n].components.securitySchemes.{securitySchemeName}`）中定义的安全方案，其中 `oisTitle`是相关OIS的`title`字段，`securitySchemeName`是各自安全方案的名称。 在下面的例子中，将是 `myOisTitle` 和 `mySecurityScheme` 。 `securitySchemeValue`是用于安全方案认证的值（例如，API密钥），在下面的例子中是`secrets.env` 。

OIS对象中的 `security`字段必须包括在内，并持有API操作的所有安全方案的名称。

不需要使用apiCredentials，将其数组留为空。

```json
// apiCredentials
[
  {
    "oisTitle": "myOisTitle",
    "securitySchemeName": "mySecurityScheme",
    "securitySchemeValue": "${SS_MY_API_KEY}"
  }
]

// components and security field in OIS object
{
"title": "myOisTitle",
...,
"components": {
  "securitySchemes": {
    "mySecurityScheme": {
      "in": "header",
      "type": "apiKey",
      "name": "X-api-key"
    }
  }
},
"security": {
  "mySecurityScheme" []
}
...
}
```

### `oisTitle`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#oistitle) （必要) - OIS 的`ois.title`，可以在此找到 `securitySchemeName` 。

### `securitySchemeName`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#securityschemename) (必须) - 来自 `ois[n].components.securitySchemes.{securitySchemeName}` 的安全方案的名称。

### `securitySchemeValue`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#securityschemevalue) (必须) - 使用的安全方案的值（由 `ois[n].components.securitySchemes.{securitySchemeName}` 定义，用于认证。 通常存储在 `secrets.env`中。
