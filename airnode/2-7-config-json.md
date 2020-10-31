# `config.json`

`config.json` is the configuration file used for deploying Airnode.
It is composed of four main sections:

1. A list of [OIS](/airnode/2-6-ois.md)
2. An object of lists of triggers, each mapping to an endpoint defined in an OIS in 1
3. An object containing node configuration parameters
4. A UUID named `id` that specifies a `config.json`/`security.json` pair

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

`ois` is a list of OIS as described in [OIS](/airnode/2-6-ois.md).
Since each OIS defines the integration of a single API to an oracle, this means that a node can serve multiple APIs.
However, this does not mean that nodes can be shared between multiple providers.
Each node serves the APIs of a single provider.

## `triggers`

`triggers` are events that trigger an API call and an Ethereum transaction by Airnode.
Triggers of different types are kept in lists under their respective keys:

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

1. `logFormat` - The format that Airnode should use to output logs. Either `json` or `plain`

1. `chains` - A list of blockchain configurations. See [chains](#chains) below.

### `chains`

Airnode can be configured to work with multiple blockchain providers, types and networks.

`providerAdminForRecordCreation` - the master address that will be authorized to update the authorizers of the provider's endpoints.
Note that the node only uses this while creating the provider record.
Changing this after the provider record is created will not have any effect.

`id` - the corresponding chain (or network) ID. A list of known Ethereum chain IDs can be found at [EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md#list-of-chain-ids), although this list is not exhaustive and the `id` does not necessarily need to be a popular or known value.

`type` - the type of blockchain to connect to. Currently only `evm` is supported for Ethereum and other EVM compatible blockchains, although other blockchain types will be supported in the future.

`providers` - one or more providers serving the given chain ID and type. Each `provider` must have the following keys:

**Required**

1. `name` - a *unique* name across ALL configured providers in `config.json`

2. `url` - an HTTP endpoint that Airnode should use to connect to.

**Optional**

1. `blockHistoryLimit` - the number of block in the past that Airnode should use to search for requests or events. Defaults to `600` (roughly 1 hour for Ethereum)

2. `minConfirmations` - the number of confirmations required for a request or event to be considered valid. Default to `6`

```json
{
  "providerAdminForRecordCreation": "0x5e00...F410",
  "id": 1,
  "type": "evm",
  "providers": [
    {
      "name": "my-infura-mainnet",
      "url": "https://mainnet.infura.io/v3/<your key>",
      "blockHistoryLimit": 600,
      "minConfirmations": 6
    },
    {
      "name": "secondary-mainnet",
      "url": "https://..."
    }
  ]
}
```

`contracts` - An optional object of contracts to use instead of the default Airnode contract addresses.

The following contracts can be overridden:

1. `Airnode`

2. `Convenience`

3. `GasPriceFeed`

**NOTE** Contract addresses cannot be overridden for EVM chain ID 1 (Ethereum mainnet).

Contract overrides are provided as with a name (key) and override address (value). i.e. `{ Airnode: '0xf1d4...0bd3' }`. You can provide as many or as few overrides as needed.

```json
{
  "providerAdminForRecordCreation": "0x5e00...F410",
  "id": 1,
  "type": "evm",
  "providers": [{ "name": "infura-mainnet", "url": "https://..." }],
  "contracts": {
    "Airnode": "0xf1d4...0bd1"
  }
}
```

### Example

A more complete example of a `nodeSettings` configuration:

```json
{
  "logFormat": "plain",
  "chains": [
    {
      "providerAdminForRecordCreation": "0x5e00...F410",
      "id": 1,
      "type": "evm",
      "providers": [
        {
          "name": "infura-mainnet",
          "url": "https://mainnet.infura.io/v3/<your key>",
          "blockHistoryLimit": 600,
          "minConfirmations": 6
        }
      ]
    },
    {
      "providerAdminForRecordCreation": "0x5e00...F410",
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
      }
    }
  ]
}
```

## `id`

A UUID defined by the platform for the specific `config.json` file and its corresponding `security.json` file.

[Home](/README.md#contents)
