---
title: secrets.env
---

<TitleSpan>部署文档</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

`secrets.env` 文件与 [config.json](config-json.md) 文件绑定在一起，包含了相应的 Airnode 部署将需要的秘密信息。 `secrets.env`文件中定义的所有变量，将通过变量插值（`${VARIABLE_NAME}`的方式，在`config.json`文件中可用。

**强烈推荐**其中几个数据通过变量提供。 显示的变量名称可以调整为任何想要的名称。 只要确保在`config.json`中改变相关的插值。

| 变量名称                                 | `config.json` 字段名称                          | 说明                           |
| ------------------------------------ | ------------------------------------------- | ---------------------------- |
| AIRNODE_WALLET_MNEMONIC            | `nodeSettings.airnodeWalletMnemonic`        | 将被Airnode 使用的钱包助记符           |
| CHAIN_PROVIDER_URL                 | `chains[].providers.<name>.url`       | 区块链供应商网址                     |
| SS_MY_API_KEY                      | `apiCredentials[].securitySchemeValue`      | 安全计划值                        |
| HEARTBEAT_URL                        | `nodeSettings.heartbeat.url`                | 要让heartbeat请求的 URL           |
| HEARTBEAT_API_KEY                  | `nodeSettings.hearbeat.apiKey`              | 对heartbeat URL进行身份验证的 API 密钥 |
| HEARTBEAT_ID                         | `nodeSettings.hearbeat.id`                  | 用于核算的Airnode heartbeat ID    |
| HTTP_GATEWAY_API_KEY               | `nodeSettings.httpGateway.apiKey`           | 使用 HTTP 网关进行身份验证的 API 密钥     |
| HTTP_SIGNED_DATA_GATEWAY_API_KEY | `nodeSettings.httpSignedDataGateway.apiKey` | 验证已签名数据的 HTTP 网关的 API 密钥     |
| GCP_PROJECT_ID                     | `nodeSettings.cloudProvider.projectId`      | (仅限GCP) 供部署的GCP项目 ID         |

如下是 `customRuntimeOptions` 的示例。

- 变量名称不能包含破折号 (-)。

<!-- TODO: Reference a file from Airnode examples instead -->

```
AIRNODE_WALLET_MNEMONIC="achieve climb couple wait accident symbol spy blouse reduce foil echo label"
CHAIN_PROVIDER_URL="https://mainnet.infura.io/v3/5122f3ff104f30f21412aa38fd143d53"

SS_MY_API_KEY="FRACZKMH4F32BZ8X5uTd"

HEARTBEAT_API_KEY="d714a900-3b9e-4e4d-8eae-756ef06a8836"
HEARTBEAT_ID="916d3ec80fda"
HEARTBEAT_URL="https://your.heartbeat.service.io/airnode"

HTTP_GATEWAY_API_KEY="441ffc41-3c8b-44b9-a689-63b500fd17da"
HTTP_SIGNED_DATA_GATEWAY_API_KEY="58b0c6d6-b250-4f2e-b9ed-700655d1c8ae"

# GCP only
GCP_PROJECT_ID="my-gcp-airnode-project-01"
```
