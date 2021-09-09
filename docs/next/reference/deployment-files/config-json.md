---
title: config.json
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2, 3]" />

The `config.json` defines a single Airnode deployment. The deployment will have an [`airnodeId`](../protocols/request-response/airnode.md#airnodeid), master private key and a  [sponsor wallet](../protocols/request-response/sponsor-wallet.md), etc.).

The file contents will be in the format show below as a single JSON object

```json
{
  // config object
}
```

Each config object can be thought of as the static NoSQL database of an Airnode deployment. It contains five fields as show below.

```json
{
  "ois": [
    ...
  ],
  "triggers": {
    ...
  },
  "chains": [
    ...
  ],
  "nodeSettings": {
    ...
  },
  "apiCredentials": [
    ...
  ]
}
```

- [`ois`](#ois): API specifications and the corresponding on-chain endpoints, kept as [OIS](../specifications/ois.md) objects

- [`triggers`](#triggers): Which on-chain endpoints will be usable by which protocols (RRP or PSP) and under what endpoint ID

- [`chains`](#chains): Blockchains the Airnode deployment will serve on and configuration details

- [`nodeSettings`](#nodesettings): General deployment parameters such as node version and deployment configuration

- [`apiCredentials`](#apiCredentials): Which API credentials will be usable by which OIS and security scheme

## ois

`ois` is a list of [OIS](../specifications/ois.md) objects.
Since each OIS specifies the integration of an API to an oracle, a single Airnode deployment can serve multiple APIs.

Contents of an `ois` list can be seen below (see the [OIS doc](../specifications/ois.md) for a complete example and the explanation of the fields):

```json
[
  {
    "oisFormat": "1.0.0",
    "title": "myOisTitle",
    "version": "1.2.3",
    "apiSpecifications": {
      ...
    },
    "endpoints": [
      ...
    ]
  }
]
```

## triggers

`triggers` map external triggers such as a request made through RRP (or a subscription made through PSP, which is not implemented yet) to an endpoint defined in an OIS.

Contents of a `triggers` object can be seen below:

```json
{
  "request": [
    {
      "endpointId": "0xe1da7948e4dd95c04b2aaa10f4de115e67d9e109ce618750a3d8111b855a5ee5",
      "oisTitle": "myOisTitle",
      "endpointName": "myEndpointName"
    },
    ...
  ]
}
```

According to the example above, the Airnode deployment has an OIS with the title `myOisTitle`.
This OIS has an endpoint with the name `myEndpointName`.
When the Airnode deployment detects a [request](../protocols/request-response/request.md) that references its [`airnodeId`](../protocols/request-response/airnode.md#airnodeid) and `0xe1da7948e4dd95c04b2aaa10f4de115e67d9e109ce618750a3d8111b855a5ee5` as the [`endpointId`](../protocols/request-response/endpoint.md#endpointid), it will call the specified endpoint (`myOisTitle`-`myEndpointName`) with the parameters provided in the request to fulfill it.
See the [Endpoints](../protocols/request-response/endpoint.md#endpointid) for the default convention for setting the `endpointId`.

## chains

`chains` lists the blockchains the Airnode deployment will serve on and specifies respective parameters.

Contents of a `chains` list can be seen below:

```json
[
    {
      "id": "1",
      "type": "evm",
      "providers": {
        "selfHostedMainnet": {
          "url": "${CP_SELF_HOSTED_MAINNET_URL}"
        },
        "infuraMainnet": {
          "url": "${CP_INFURA_MAINNET_URL}"
        }
      },
      "contracts": {
        "AirnodeRRP": "0x12B4...0C1a"
      },
      "authorizers": [
        "0xeabb...C123",
        "0xCE5e...1abc"
      ],
      "blockHistoryLimit": 300,
      "minConfirmations": 0,
      "ignoreBlockedRequestsAfterBlocks": 20
    },
    {
      "id": "3",
      "type": "evm",
      "providers": {
        "infuraRopsten": {
          "url": "${CP_INFURA_ROPSTEN_URL}"
        }
      },
      "contracts": {
        "AirnodeRRP": "0xf1d4...0bd1"
      },
      "authorizers": [
        "0x0000000000000000000000000000000000000000"
      ],
      "blockHistoryLimit": 300,
      "minConfirmations": 0,
      "ignoreBlockedRequestsAfterBlocks": 20
    }
  ]
```

- `id` (required) - the corresponding chain (or network) ID.
If this is an Ethereum-based chain, `id` should be the chain ID as described in [EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md#list-of-chain-ids).
Refer to the documentations of the chain you will be using to find its chain ID.

- `type` (required) - the type of the chain.
Currently, only `evm` is supported.

- `providers` (required) - list of blockchain providers that will be used.
Note that multiple of them can be used simultaneously.
The Airnode deployment will expect to find the URLs of each of these providers in their respective `url` fields.

- `contracts` (required) - an object that keeps the addresses of the protocol contracts deployed on the respective chain. It has to include the following contract addresses:

  - `AirnodeRRP`

- `authorizers` (required) - the list of authorizer contract addresses the Airnode deployment will set on-chain. ~~Note that the Airnode wallet has to be funded (on the respective chain) to be able to make the transaction that will set or update this value.~~ For more information about authorizers see the [protocol Airnode](../protocols/request-response/airnode.md#setting-endpoint-authorizers) and [protocol Authorizer](../protocols/request-response/authorizer.md) docs.


- `blockHistoryLimit` (optional) - the number of blocks in the past that the Airnode deployment should search for requests.
Defaults to `300` (roughly 1 hour for Ethereum).

- `minConfirmations` (optional) - the number of confirmations required for a request to be considered valid.
Defaults to `0`.

- `ignoreBlockedRequestsAfterBlocks` (optional) - the number of blocks that need to pass for the node to start ignoring blocked requests.
Defaults to `20`.

## nodeSettings

`nodeSettings` is an object containing general deployment parameters.
Contents of a `nodeSettings` object can be seen below:

```json
{
  "nodeVersion": "0.1.0",
  "cloudProvider": "aws",
  "region": "us-east-1",
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
    "apiKey": "${HTTP_GATEWAY_API_KEY}"
  },
  "logFormat": "json",
  "logLevel": "INFO"
}
```

- `nodeVersion` - The version of the node (Airnode) that will be deployed with this config object.

- `cloudProvider` - The cloud provider that the node will be deployed at. Currently, only `aws` is supported.

- `region` - The cloud provider region that the node will be deployed at. See the cloud provider's documentation for possible values.

- `stage` - The label used to distinguish between multiple deployments of the same Airnode on a cloud provider. For example, the same Airnode may have multiple deployments with `stage`s set as `dev`, `ropsten`, `mainnet`, where each of these deployments would use the same private key and have the same `airnodeId`. `stage` cannot be longer than 16 characters and can only include alphanumeric characters (`a–z`, `A–Z`, `0–9`), hyphen (`-`) and underscore (`_`).

- `airnodeWalletMnemonic` - The wallet mnemonic that will be used by the Airnode

- `heartbeat` - The Airnode's "call home" functionality. Airnode can periodically make a request to the specified URL signaling that it's active and providing some statistics from its run

  - `enabled` - Enable/disable Airnode's heartbeat

  - `url` - The URL to make the heartbeat request to

  - `apiKey` - The API key to authenticate against the heartbeat URL

  - `id` - The Airnode heartbeat ID for accounting purposes

- `httpGateway` - The Airnode's HTTP gateway to test out your endpoints without using the blockchain.

  - `enabled` - Enable/disable Airnode's HTTP gateway

  - `apiKey` - The API key to authenticate against the gateway

- `logFormat` - The format that will be used to output logs. Either `json` or `plain`.

- `logLevel` - The highest verbosity level of the logs that will be outputted. `DEBUG`, `INFO`, `WARN` or `ERROR`.

## apiCredentials

Each entry in `apiCredentials` maps to a security scheme defined in an OIS, where `oisTitle` is the `title` field of the related OIS, and `securitySchemeName` is the name of the respective security scheme (these would be `myOisTitle` and `mySecurityScheme` in the example in the [OIS docs](../specifications/ois.md)). `securitySchemeValue` is the value used for the authentication with said security scheme (e.g., the API key).


```json
[
  {
    "oisTitle": "myOisTitle",
    "securitySchemeName": "mySecurityScheme",
    "securitySchemeValue": "${SS_MY_API_KEY}"
  }
]
```
