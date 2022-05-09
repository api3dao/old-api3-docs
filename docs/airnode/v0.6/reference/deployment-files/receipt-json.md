---
title: receipt.json
---

<TitleSpan>部署文档</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

每次部署后都会输出一个`receipt.json` 文件，其中包含关于部署的非敏感信息。 收据文件的主要用途是，在不再需要时删除Airnode部署。 使用[docker镜像](../../grp-providers/docker/deployer-image.md#remove)来执行删除命令。

它还为硬化衍生路径`m/44'/60'/0'` 提供了Airnode xpub，并且必须在链外宣布，以便赞助者衍生出他们指定的赞助者钱包。 然后这个钱包将被Airnode使用，满足请求者合约提出的每个请求。

- `airnodeWallet`: 描述已部署的 Airnode
- `deployment`：Airnode被部署到哪里
- `api`: 包含 Airnode API 的详细信息(例如， [heartbeat](../../grp-providers/guides/build-an-airnode/heartbeat.md) 或 [测试网关](../../grp-providers/guides/build-an-airnode/http-gateways.md))

AWS或GCP部署都会创建一个 `receipt.json`文件 客户端部署（部署到Docker容器）不会生成收据。

:::: tabs

::: tab AWS

```json
{
  "airnodeWallet": {
    "airnodeAddress": "0xA30CA71Ba54E83127214D3271aEA8F5D6bD4Dace",
    "airnodeAddressShort": "a30ca71",
    "airnodeXpub": "xpub6C8tvRgYkjNVaGMtpyZf4deBcUQHf7vgWUraVxY6gYiZhBYbPkFkLLWJzUUeVFdkKpVtatmXHX8kB76xgfmTpVZWbVWdq1rneaAY6a8RtbY"
  },
  "deployment": {
    "airnodeAddressShort": "a30ca71",
    "cloudProvider": {
      "type": "aws",
      "region": "us-east-1",
      "disableConcurrencyReservations": false
    },
    "stage": "starter-example",
    "nodeVersion": "0.6.0"
  },
  "api": {
    "heartbeatId": "74dc44a1ee65",
    "httpGatewayUrl": "https://some.http.api.gateway.url/v1",
    "httpSignedDataGatewayUrl": "https://some.httpSignedData.api.gateway.url/v1"
  }
}
```

:::

::: tab GCP

```json
{
  "airnodeWallet": {
    "airnodeAddress": "0xAcCc602FA6d1dD57cE11559Fe0c07895396a7359",
    "airnodeAddressShort": "accc602",
    "airnodeXpub": "xpub6C6wfzZ8EptS8Ti2xZgukJFWkgBcFY2ygU4BDTTGtR2GmX3vvrx3YFat3i1XLfwvhtiCEty1GZnV1MSCKBBt7uYKBbrHaqWvP623w9jUNhW"
  },
  "deployment": {
    "airnodeAddressShort": "accc602",
    "cloudProvider": {
      "type": "gcp",
      "region": "us-east4",
      "disableConcurrencyReservations": false,
      "projectId": "api3-753118"
    },
    "stage": "dev",
    "nodeVersion": "0.6.0"
  },
  "api": {}
}
```

:::

::::
