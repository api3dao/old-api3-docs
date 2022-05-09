---
title: config.json
---

# {{$frontmatter.title}}
<VersionWarning/>
<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

`config.json` is the configuration file used for deploying Airnode. It is composed of four main sections:

1. `ois`: A list of [OIS](ois.md) objects
2. `triggers`: A list of trigger objects, each mapping to an endpoint defined in an OIS in 1
3. `nodeSettings`: An object containing node configuration parameters
4. `id`: A UUID that specifies a `config.json`/`security.json` file pair

Contents of a `config.json` file:

```json
{
  "ois": [
    ...
  ],
  "triggers": {
    ...
  },
  "nodeSettings": {
    ...
  },
  "id": "..."
}
```

## `ois`

`ois` is a list of OIS objects as described in [OIS](ois.md). Since each OIS defines the integration of a single API to an oracle, this means that a node can serve multiple APIs. However, this does not mean that nodes can be shared between multiple providers. Each node serves the APIs of a single provider.

## `triggers`

`triggers` are events that trigger an API call and an Ethereum transaction by Airnode. Triggers of different types are kept in lists under their respective keys:

- `request` - When the node sees an event with its `providerId` and this trigger's `endpointId` emitted from the central Airnode contract, it responds to it with the respective endpoint defined in the OIS.
  - `endpointId`
  - `oisTitle`
  - `endpointName`


```json
{
  "request": [
    {
      "endpointId": "...",
      "oisTitle": "...",
      "endpointName": "..."
    },
    ...
  ],
  ...
}
```

## `nodeSettings`

An object containing the following configuration parameters:

- `providerIdShort` - The label used to identify this specific provider among the cloud deployments. The deployer uses the first 7 characters of the full `providerId` by default. For example, if the `providerId` is `0x9e5a89de5a7e780b9eb5a61425a3a656f0c891ac4c56c07037d257724af490c9`, `providerIdShort` would be `9e5a89d`. **This field must not exist for the first deployment, and must exist for redeployments.**

- `nodeVersion` - The node version this `config.json` is supposed to be used with. The deployer checks this and refuses to deploy if its node version does not agree with this field.

- `cloudProvider` - The cloud provider that will be used to deploy the node. Can be `aws`.

- `region` - The cloud provider region that the node will be deployed at.

- `stage` - The label used to distinguish between multiple deployments of the same provider on a cloud provider. For example, the provider may make multiple deployments with `stage`s set as `dev`, `ropsten`, `mainnet`, where each of these deployments would use the same private key and have the same `providerId`. `stage` cannot be longer than 16 characters and can only include alphanumeric characters (`a–z`, `A–Z`, `0–9`) and hyphens (`-`).

- `logFormat` - The format that Airnode should use to output logs. Either `json` or `plain`.

- `chains` - A list of blockchain configurations. See [chains](#nodesettingschains) below.

### `nodeSettings.chains`

Airnode can be configured to work with multiple blockchain providers, types and networks. Configurations for each chain is represented with an object in this `chains` list.

**Required**

- `id` - the corresponding chain (or network) ID. A list of known Ethereum chain IDs can be found at [EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md#list-of-chain-ids), although this list is not exhaustive and the `id` does not necessarily need to be a popular or known value.

- `type` - the type of blockchain to connect to. Currently only `evm` is supported for Ethereum and other EVM-based blockchains, although other types are planned to be supported in the future.

- `providers` - one or more providers serving the given chain ID and type. Each `provider` must have the following keys:

  1. `name` - a *unique* name across ALL configured providers in `config.json`

  2. `url` - an HTTP endpoint that Airnode should use to connect to

- `contracts` - An object that keeps the addresses of the contracts deployed on the respective chain. It has to include the following contract addresses:

  1. `Airnode`

  2. `Convenience`

**Optional**

- `providerAdminForRecordCreation` - the master address that will be authorized to update the authorizers of the provider's endpoints (see the [protocol docs](../../protocols/request-response/general-structure.md) for more information). Note that the node only uses this while creating the provider record. Changing this after the provider record is created will not have any effect. This field is optional, but not having it means that the node will not be able to create a provider record on the respective chain.

- `blockHistoryLimit` - the number of blocks in the past that Airnode should use to search for requests or events. Defaults to `600` (roughly 1 hour for Ethereum).

- `minConfirmations` - the number of confirmations required for a request or event to be considered valid. Default to `0`.

- `ignoreBlockedRequestsAfterBlocks` - the number of blocks that needs to pass for the node to start ignoring blocked requests. Defaults to `20`.

An example object from the `chains` list:

```json
{
  "id": 1,
  "type": "evm",
  "providers": [
    {
      "name": "my-infura-mainnet",
      "url": "https://mainnet.infura.io/v3/<your key>"
    },
    {
      "name": "secondary-mainnet",
      "url": "https://..."
    }
  ],
  "contracts": {
    "Airnode": "0xf1d4...0bd1",
    "Convenience": "0x12ab...de56"
  },
  "providerAdminForRecordCreation": "0x5e00...F410",
  "blockHistoryLimit": 600,
  "minConfirmations": 6,
  "ignoreBlockedRequestsAfterBlocks": 20,
}
```

### Example

A more complete example of a `nodeSettings` configuration:

```json
{
  "providerIdShort": "9e5a89d",
  "nodeVersion": "0.1.0",
  "cloudProvider": "aws",
  "region": "us-east-1",
  "stage": "testnet",
  "logFormat": "plain",
  "chains": [
    {
      "id": 1,
      "type": "evm",
      "providers": [
        {
          "name": "infura-mainnet",
          "url": "https://mainnet.infura.io/v3/<your key>"
        }
      ],
      "providerAdminForRecordCreation": "0x5e00...F410",
      "blockHistoryLimit": 600,
      "minConfirmations": 0,
      "ignoreBlockedRequestsAfterBlocks": 20
    },
    {
      "id": 3,
      "type": "evm",
      "providers": [
        {
          "name": "infura-ropsten",
          "url": "https://ropsten.infura.io/v3/<your key>"
        }
      ],
      "contracts": {
        "Airnode": "0xf1d4...0bd1"
      },
      "providerAdminForRecordCreation": "0x5e00...F410"
    }
  ]
}
```

## `id`

A UUID for the specific `config.json` file and its corresponding `security.json` file.
