---
title: config.json
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2, 5]" />

The `config.json` specifies one or multiple deployments.
All of these deployments will belong to the same Airnode (will have the same [`airnodeId`](../protocols/request-response/provider.md#providerid), master private key, [designated wallets](../protocols/request-response/designated-wallet.md), etc.).

For a single deployment, the file contents will be in the format below:

```json
[
  {
    // config object
  }
]
```

A `config.json` file can also define multiple deployments:

```json
[
  {
    // deployment #1 config object
  },
  {
    // deployment #2 config object
  }
]
```

Some example use cases for multiple deployments:
- #1 on AWS `us-east-1` and #2 on AWS `us-west-1` for good availability
- #1 on AWS and #2 on GCP for even better availability
- #1 on Ethereum mainnet with a stable node version and a dedicated API key, #2 on testnets with a more experimental configuration

---

Each config object can be thought of as the static NoSQL database of an Airnode deployment.
Its contents can be seen below:

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
  "environment": {
    ...
  },
  "id": "..."
}
```

- [`ois`](#ois): API specifications and the corresponding on-chain endpoints, kept as [OIS](../specifications/ois.md) objects

- [`triggers`](#triggers): Which on-chain endpoints will be usable by which protocols (RRP or PSP) and under what endpoint ID

- [`chains`](#chains): Blockchains the Airnode deployment will serve on and configuration details

- [`nodeSettings`](#nodesettings): General deployment parameters such as node version and deployment configuration

- [`environment`](#environment): Mapping of secrets to environment variables

- [`id`](#id): Unique identifier for this config object

## ois

`ois` is a list of [OIS](../specifications/ois.md) objects.
Since each OIS specifies the integration of an API to an oracle, a single Airnode deployment can serve multiple APIs.

Contents of an `ois` list can be seen below (see the [OIS docs](../specifications/ois.md) for a complete example and the explanation of the fields):

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
When the Airnode deployment detects a [request](../protocols/request-response/request.md) that references its [`airnodeId`](../protocols/request-response/provider.md#providerid) and `0xe1da7948e4dd95c04b2aaa10f4de115e67d9e109ce618750a3d8111b855a5ee5` as the [`endpointId`](../protocols/request-response/endpoint.md#endpointid), it will call the specified endpoint (`myOisTitle`-`myEndpointName`) with the parameters provided in the request to fulfill it.
See the [docs](../protocols/request-response/endpoint.md#endpointid) for the default convention for setting the `endpointId`.

## chains

`chains` lists the blockchains the Airnode deployment will serve on and specifies respective parameters.

Contents of a `chains` list can be seen below:

```json
[
    {
      "id": "1",
      "type": "evm",
      "providerNames": [
        "self-hosted-mainnet",
        "infura-mainnet"
      ],
      "contracts": {
        "AirnodeRRP": "0x12B4...0C1a"
      },
      "airnodeAdmin": "0x5e00...F410",
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
      "providerNames": [
        "infura-ropsten"
      ],
      "contracts": {
        "AirnodeRRP": "0xf1d4...0bd1"
      },
      "airnodeAdmin": "0x5e00...F410",
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

- `providerNames` (required) - the names of the blockchain providers that will be used.
Note that multiple of them can be used simultaneously.
The Airnode deployment will expect to find the URLs of each of these providers in its environment variables.
See [`environment`](#environment) for more information.

- `contracts` (required) - an object that keeps the addresses of the protocol contracts deployed on the respective chain.
It has to include the following contract addresses:

  - `AirnodeRRP`

- `airnodeAdmin` (required) - the admin address the Airnode deployment will set on-chain.
See the [protocol docs](../protocols/request-response/provider.md#provideradmin) for more information.
Note that the Airnode master wallet has to be funded (on the respective chain) to be able to make the transaction that will set or update this value.

- `authorizers` (required) - the list of authorizer contract addresses the Airnode deployment will set on-chain.
See the [protocol docs](../protocols/request-response/provider.md#setting-endpoint-authorizers) for more information.
Note that the Airnode master wallet has to be funded (on the respective chain) to be able to make the transaction that will set or update this value.

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
  "logFormat": "json",
  "logLevel": "INFO"
}
```

- `nodeVersion` - The version of the node that will be deployed with this config object.

- `cloudProvider` - The cloud provider that the node will be deployed at.
Currently, only `aws` is supported.

- `region` - The cloud provider region that the node will be deployed at.
See the cloud provider documentations for possible values.

- `stage` - The label used to distinguish between multiple deployments of the same Airnode on a cloud provider.
For example, the same Airnode may have multiple deployments with `stage`s set as `dev`, `ropsten`, `mainnet`, where each of these deployments would use the same private key and have the same `airnodeId`.
`stage` cannot be longer than 16 characters and can only include alphanumeric characters (`a–z`, `A–Z`, `0–9`), hyphen (`-`) and underscore (`_`).

- `logFormat` - The format that will be used to output logs.
Either `json` or `plain`.

- `logLevel` - The highest verbosity level of the logs that will be outputted.
`DEBUG`, `INFO`, `WARN` or `ERROR`.

## environment

Airnode deployments keep secrets such as security scheme values (i.e., API keys) and blockchain provider URLs as environment variables. `environment` tells the Airnode under which environment variable it can find each of these.

Contents of an `environment` object can be seen below.

```json
"securitySchemes": [
  {
    "oisTitle": "...",
    "name": "...",
    "envName": "..."
  }
],
"chainProviders": [
  {
    "chainType": "...",
    "chainId": "...",
    "name": "...",
    "envName": "..."
  }
]
```

### securitySchemes

Each entry in `environment.securitySchemes` maps to a security scheme defined in an OIS, where `oisTitle` is the `title` field of the related OIS, and `name` is the name of the respective security scheme (these would be `myOisTitle` and `mySecurityScheme` in the example in the [OIS docs](../specifications/ois.md)). `envName` is the environment variable name that the security scheme value (e.g., the API key) will be found under. The recommended naming convention is `ss_${oisTitle}_${name}` where spaces in the names are replaced with underscores(`_`).

<Todo>

Need to add code block showing the mapping much like chainProviders below.

</Todo>

```json
"securitySchemes": [


]
```

### chainProviders

Each entry in `environment.chainProviders[n]` maps to an entry in `chains[n]`. The following code block illustrates this a relationship with the [`chains object`](config-json.md#chains) shown above in the section **chains**. 

Note that the value of `envName` is the name of the environment variable that holds the respective blockchain provider URL from secrets.env. 

The recommended naming convention is `CP_${chainType}_${chainId}_${name}` where spaces in the names are replaced with underscores(`_`) and all characters are uppercase.


```json
"chainProviders": [
  {                                // Maps to:
    "chainType": "evm",            // chains[0].type
    "chainId": "1",                // chains[0].id
    "name": "self-hosted-mainnet", // chains[0].providerNames[0]
    "envName": "CP_EVM_1_SELF-HOSTED-MAINNET"
  },
  {                                // Maps to:
    "chainType": "evm",            // chains[0].type
    "chainId": "1",                // chains[0].id
    "name": "infura-mainnet",      // chains[0].providerNames[1]
    "envName": "CP_EVM_1_INFURA-MAINNET"
  },
  {                                // Maps to:
    "chainType": "evm",            // chains[1].type
    "chainId": "3",                // chains[1].id
    "name": "infura-ropsten",      // chains[1].providerNames[0]
    "envName": "CP_EVM_1_INFURA-ROPSTEN"
  }
]
```
## id

`id` is a unique identifier for the config object (e.g., a [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
