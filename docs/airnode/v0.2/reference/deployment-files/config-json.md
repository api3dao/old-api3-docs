---
title: config.json
---

<TitleSpan>Deployment Files</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>
<TocHeader /> <TOC class="table-of-contents" :include-level="[2, 4]" />

The `config.json` defines a single Airnode deployment. The file contents are a single JSON object. Each config object can be thought of as the static NoSQL database of an Airnode deployment. It contains five fields as show below.

```json
{
  "chains": [],
  "nodeSettings": {},
  "triggers": {},
  "ois": [],
  "apiCredentials": []
}
```

- [chains](./config-json.md#chains): Blockchains the Airnode deployment will serve on and configuration details
- [nodeSettings](./config-json.md#nodesettings): General deployment parameters such as node version and deployment configuration.
- [triggers](./config-json.md#triggers): Which on-chain endpoints will be usable by which an available protocol (currently only RRP) and under what endpoint ID.
- [ois](./config-json.md#ois): API specifications and the corresponding on-chain endpoints, kept as [OIS](../specifications/ois.md) objects.
- [apiCredentials](./config-json.md#apicredentials): Which API credentials will be usable by which OIS and security scheme.

## chains

Lists the blockchains the Airnode deployment will serve on and specifies respective parameters.

```json
// chains
[
  {
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
    "blockHistoryLimit": 300,
    "ignoreBlockedRequestsAfterBlocks": 20
  },
  {
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
    "type": "evm"
  }
]
```

<!-- "minConfirmations": 0, -->

### `authorizers`

(required) - The list of authorizer contract addresses specifying the authorization patterns that the Airnode should use. An empty array would allow-all.

### `contracts`

(required) - An object that keeps the addresses of the protocol contracts deployed on the respective chain. It must include the `AirnodeRRP` contract address.

### `id`

(required) - The corresponding chain (or network) ID. If this is an Ethereum-based chain, `id` should be the chain ID as described in [EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md#list-of-chain-ids). Refer to the documentations of the chain you will be using to find its chain ID.

### `providers`

(required) - List of chain providers that will be used. Note that multiple of them can be used simultaneously. The Airnode deployment will expect to find the URLs of each of these chain providers in their respective `url` fields.

### `type`

(required) - The type of chain. Currently only `evm` is supported.

### `blockHistoryLimit`

(optional) - The number of blocks in the past that the Airnode deployment should search for requests. Defaults to `300` (roughly 1 hour for Ethereum).

<!--### `minConfirmations`

(optional) - The number of confirmations required for a request to be considered
valid. Defaults to `0`. -->

### `ignoreBlockedRequestsAfterBlocks`

(optional) - The number of blocks that need to pass for the node to start ignoring blocked requests. Defaults to `20`. A request is blocked whenever the API call cannot be made. For example, endpoint (specified by its id in the request) cannot be found in config.json.

## nodeSettings

An object containing general deployment parameters of an Airnode.

```json
// nodeSettings
{
  "nodeVersion": "0.2.2",
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

### `cloudProvider`

(required) - The cloud provider that the node will be deployed at. Currently, only `aws` is supported for serverless ([deployer-image](../../grp-providers/docker/deployer-image.md)). Use `local` if you want to run Airnode as a docker container locally ([client-image](../../grp-providers/docker/client-image.md)).

### `airnodeWalletMnemonic`

(required) - The wallet mnemonic that will be used by the Airnode.

### `heartbeat`

(required) - The Airnode's "call home" functionality. Airnode can periodically make a request to the specified URL signaling that it's active. There are plans in the future to allow the sending of a payload with information for reporting purposes.

#### `heartbeat.enabled`

(required) - Enable/disable Airnode's heartbeat.

#### `heartbeat.apiKey`

(only if enabled) - The API key to authenticate against the heartbeat URL.

#### `heartbeat.id`

(only if enabled) - The Airnode heartbeat ID for accounting purposes.

#### `heartbeat.url`

(only if enabled) - The URL to make the heartbeat request to.

### `httpGateway`

The Airnode's HTTP gateway to test out endpoints without using the blockchain.

#### `httpGateway.enabled`

(required) - Enable/disable Airnode's HTTP gateway.

#### `httpGateway.apiKey`

(only if enabled) - The API key to authenticate against the gateway.

### `logFormat`

(required) - The format that will be used to output logs. Either `json` or `plain`.

### `logLevel`

(required) - The highest verbosity level of the logs that will be outputted. `DEBUG`, `INFO`, `WARN` or `ERROR`.

### `nodeVersion`

(required) - The version of the node (Airnode) that will be deployed with this config object.

### `region`

(required) - The cloud provider region that the node will be deployed at. See the cloud provider's documentation for possible values.

### `stage`

(required) - The label used to distinguish between multiple deployments of the same Airnode on a cloud provider. For example, the same Airnode may have multiple deployments with `stage` set to a different value (dev, public, prod). `stage` cannot be longer than 16 characters and can only include alphanumeric characters (`a–z`, `A–Z`, `0–9`), hyphen (`-`) and underscore (`_`).

## triggers

An array that maps external triggers such as a request made through RRP (or a subscription made through PSP, which is not implemented yet) to an endpoint defined in an OIS.

```json
// triggers
{
  "rrp": [
    {
      "endpointId": "0xe1da7948e4dd95c04b2aaa10f4de115e67d9e109ce618750a3d8111b855a5ee5",
      "oisTitle": "myOisTitle",
      "endpointName": "myEndpointName"
    },
    ...
  ]
}
```

In the example above, the Airnode deployment has an OIS with the title `myOisTitle`. This OIS has an endpoint with the name `myEndpointName`. When the Airnode deployment detects a [request](../../concepts/request.md) that references its [`airnodeAddress`](../../concepts/airnode.md#airnodeaddress) and `0xe1da7948e4dd95c04b2aaa10f4de115e67d9e109ce618750a3d8111b855a5ee5` as the [`endpointId`](../../concepts/endpoint.md#endpointid), it will call the specified endpoint (`myOisTitle`-`myEndpointName`) with the parameters provided in the request to fulfill it. See the [endpoint id documentation](../../concepts/endpoint.md#endpointid) for the default convention for deriving the `endpointId`.

### `rrp`

(required) - An array of endpoints from OIS that the Airnode will respond to.

#### `rrp.endpointId`

(required) - A identifier derived for an oisTitle/endpointName pair, see [derive-endpoint-id](../packages/admin-cli-commands.md#derive-endpoint-id).

#### `rrp.oisTitle`

(required) - The title of an OIS object.

#### `rrp.endpointName`

(required) - The endpoint name of an OIS endpoint.

## ois

A list of OIS objects. Since each OIS specifies the integration of an API to an oracle, a single Airnode deployment can serve multiple APIs. To avoid duplication of content, see the [OIS doc](../specifications/ois.md) for a complete example and the explanation of its fields.

## apiCredentials

Each entry in `apiCredentials` maps to a security scheme defined in an OIS (`ois[n].components.securitySchemes.{securitySchemeName}`), where `oisTitle` is the `title` field of the related OIS, and `securitySchemeName` is the name of the respective security scheme. These would be `myOisTitle` and `mySecurityScheme` in the example below. `securitySchemeValue` is the value used for the authentication with the security scheme (e.g., the API key) which would be in `secrets.env` in the example below.

The `security` field in the OIS object must be included and hold the names of all security schemes the API operation

Use of apiCredentials is not required, leave its array empty.

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

(required) - The `ois.title` of the OIS where the `securitySchemeName` can be found.

### `securitySchemeName`

(required) - The name of a security scheme from `ois[n].components.securitySchemes.{securitySchemeName}`.

### `securitySchemeValue`

(required) - The value of the security scheme used (as defined by `ois[n].components.securitySchemes.{securitySchemeName}` for the authentication. Usually stored in `secrets.env`.
