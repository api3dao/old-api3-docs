---
title: config.json
---

# {{$frontmatter.title}}

[[toc]]

`config.json` is the configuration file used while deploying the Airnode.
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

The config object can be thought of as the static NoSQL database of the Airnode. Its contents can be seen below:

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
  "environment": [
    ...
  ],
  "id": "..."
}
```

- `ois`: API specifications and the corresponding on-chain endpoints, kept as [OIS](/airnode/ois.md) objects

- `triggers`: Which on-chain endpoints will be usable by which protocols (request–response or publish–subcribe) and under what endpoint ID

- `chains`: Blockchains the Airnode will serve on and configuration details

- `nodeSettings`: General node settings such as version, deployment configuration and logging options

- `environment`: Mapping of sensitive values to environment variables

- `id`: Unique identifier for this config object

## ois

`ois` is a list of [OIS](/airnode/ois.md) objects. Since each OIS specifies the integration of a single API to an oracle, an Airnode can serve multiple APIs.

Contents of an `ois` list can be seen below (see the [OIS docs](/airnode/ois.md) for a complete example and the explanation of the fields):

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

`triggers` map external triggers such as a request made through the request–response protocol (or a subscription made through the publish–subscribe protocol, which is not implemented yet) to an endpoint defined in an OIS

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

According to the example above, the Airnode has an OIS with the title `myOisTitle`. This OIS has an endpoint with the name `myEndpointName.` When the Airnode detects a [request](/request-response-protocol/request.md) that references its [`providerId`](/request-response-protocol/provider.md#providerid) and `0xe1da7948e4dd95c04b2aaa10f4de115e67d9e109ce618750a3d8111b855a5ee5` as the [`endpointId`](/request-response-protocol/endpoint.md#endpointId), it will call the specified endpoint (`myOisTitle`-`myEndpointName`) with the provided parameters to fulfill the request. See the [docs](/request-response-protocol/endpoint.md#endpointid) for the default convention for setting the `endpointId.`

## chains

`chains` lists the blockchains the Airnode will serve on, and specifies the configuration.

Contents of a `chains` list can be seen below:

```json
[
    {
      "id": "1",
      "type": "evm",
      "chainProviders": [
        "self-hosted-mainnet",
        "infura-mainnet"
      ],
      "providerAdminForRecordCreation": "0x5e00...F410",
      "blockHistoryLimit": 300,
      "minConfirmations": 0,
      "ignoreBlockedRequestsAfterBlocks": 20
    },
    {
      "id": "3",
      "type": "evm",
      "chainProviders": [
        "infura-ropsten"
      ],
      "contracts": {
        "Airnode": "0xf1d4...0bd1",
        "Convenience": "0x12ab...de56"
      },
      "providerAdminForRecordCreation": "0x5e00...F410",
      "blockHistoryLimit": 300,
      "minConfirmations": 0,
      "ignoreBlockedRequestsAfterBlocks": 20
    }
  ]
```

- `id` (required) - the corresponding chain (or network) ID. If this is an Ethereum-based chain, `id` should be the chain ID as described in [EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md#list-of-chain-ids).
Refer to the documentations of the chain you will be using to find its chain ID.

- `type` (required) - the type of the chain. Currently, only `evm` is supported.

- `chainProviders` (required) - the names of the blockchain providers that will be used. Note that multiple of them can be used simultaneously. The Airnode will expect to find the URLs of each of these providers in its environment variables. See [`environment`](#environment) for more information.

- `contracts` (required) - an object that keeps the addresses of the protocol contracts deployed on the respective chain. It has to include the following contract addresses:

  - `Airnode`

  - `Convenience`

- `providerAdminForRecordCreation` (optional) - the provider admin address the Airnode will set on first deployment. When the Airnode is deployed on a chain for the first time, it makes a transaction with its master wallet to create a provider record. While doing so, it also authorizes an address to set the authorization policies for the endpoints of the provider (see the [protocol docs](/request-response-protocol/general-structure.md) for more information). Changing this field after the provider record is created will not have any effect. This field is optional, but not having it means that the node will not be able to create a provider record.

- `blockHistoryLimit` (optional) - the number of blocks in the past that the Airnode should search for requests. Defaults to `300` (roughly 1 hour for Ethereum).

- `minConfirmations` (optional) - the number of confirmations required for a request to be considered valid. Defaults to `0`.

- `ignoreBlockedRequestsAfterBlocks` (optional) - the number of blocks that need to pass for the node to start ignoring blocked requests. Defaults to `20`.

## nodeSettings

`nodeSettings` is an object containing general node setting parameters. Contents of a `nodeSettings` object can be seen below:

```json
{
  "nodeVersion": "0.1.0",
  "cloudProvider": "aws",
  "region": "us-east-1",
  "stage": "testnet"
}
```

- `nodeVersion` - The node version this config object should be used with.

- `cloudProvider` - The cloud provider that the node will be deployed at. Currently, only `aws` is supported.

- `region` - The cloud provider region that the node will be deployed at. See the cloud provider documentations for possible values.

- `stage` - The label used to distinguish between multiple deployments of the same provider on a cloud provider. For example, the provider may make multiple deployments with `stage`s set as `dev`, `ropsten`, `mainnet`, where each of these deployments would use the same private key and have the same `providerId`.

## environment

Airnode keeps sensitive values such as security scheme values (i.e., API keys) and blockchain provider URLs as environment variables. `environment` tells the Airnode under which environment variable it can find each of these.

Contents of an `environment` object can be seen below:

```json
{
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
}
```

Each entry in `securitySchemes` map to a security scheme defined in an OIS, where `oisTitle` is the `title` field of the related OIS, and `name` is the name of the respective security scheme (these would be `myOisTitle` and `mySecurityScheme` in the example in the [OIS docs](/airnode/ois.md)). `envName` is the environment variable name that the security scheme value (e.g., the API key) will be found under. The recommended naming convention is `ss_${oisTitle}_${name}`.

Each entry in `chainProviders` map to an entry in `chainProviders` under [`chains`](#chains). Example values would be `evm` for `chainType`, `1` for `chainId` and `self-hosted-mainnet` for `name`. Here, the `envName` is the name of the environment variable that keeps the respective blockchain provider URL. The recommended naming convention is `cp_${chainType}_${chainId}_${name}`.

## id

`id` is a unique identifier for the config object (e.g., a [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)).
