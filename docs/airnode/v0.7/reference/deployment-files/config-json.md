---
title: config.json
folder: Reference > Deployment Files
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2, 4]" />

The `config.json` defines a single Airnode deployment. The file contents are a
single JSON object. Each config object can be thought of as the static NoSQL
database of an Airnode deployment. It contains five fields as show below.

```json
{
  "chains": [],
  "nodeSettings": {},
  "triggers": {},
  "ois": [],
  "apiCredentials": []
}
```

- [chains](./config-json.md#chains): Blockchains the Airnode deployment will
  serve on and configuration details
- [nodeSettings](./config-json.md#nodesettings): General deployment parameters
  such as node version and deployment configuration.
- [triggers](./config-json.md#triggers): Which on-chain endpoints will be usable
  by which an available protocol (currently only RRP) and under what endpoint
  ID.
- [ois](./config-json.md#ois): API specifications and the corresponding on-chain
  endpoints, kept as [OIS](/ois/v1.0.0/ois.md) objects.
- [apiCredentials](./config-json.md#apicredentials): Which API credentials will
  be usable by which OIS and security scheme.

## chains

Lists the blockchains the Airnode deployment will serve on and specifies
respective parameters.

<!--  -->

```json
// chains
[
  {
    "authorizers": [
      "0xf18c105D0375E80980e4EED829a4A68A539E6178",
      "0xCE5e...1abc"
    ],
    "contracts": {
      "AirnodeRrp": "0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"
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
      "baseFeeMultiplier": 2,
      "fulfillmentGasLimit": 500000
    },
    "maxConcurrency": 100,

    "blockHistoryLimit": 300,
    "minConfirmations": 0
  },
  {
    "authorizers": [],
    "contracts": {
      "AirnodeRrp": "0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"
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
      "baseFeeMultiplier": 2,
      "fulfillmentGasLimit": 500000
    },
    "maxConcurrency": 100,
    "blockHistoryLimit": 300,
    "minConfirmations": 0
  }
]
```

### `authorizers`

(required) - The list of authorizer contract addresses specifying the
authorization patterns that the Airnode should use. An empty array would
allow-all. See the [Authorization](../../concepts/authorization.md) doc for more
information.

### `contracts`

(required) - An object that keeps the addresses of the protocol contracts
deployed on the respective chain. It must include the `AirnodeRrp` contract
address. Although you can deploy these contracts yourself, you are recommended
to use the ones that were deployed by API3 listed
[here](../airnode-addresses.md).

### `id`

(required) - The corresponding chain (or network) ID. If this is an
Ethereum-based chain, `id` should be the chain ID as described in
[EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md#list-of-chain-ids).
Refer to the documentations of the chain you will be using to find its chain ID.
Supported chains are listed under
[Airnode Contract Addresses](../airnode-addresses.md).

### `providers`

(required) - List of chain providers. Note that multiple can be used
simultaneously. The Airnode deployment will expect to find the URLs of each of
these chain providers in their respective `url` fields. It is generally
recommended to provide `url` via interpolation from the `secrets.env` file.

### `type`

(required) - The type of chain. Currently only `evm` is supported.

### `options`

(required) - An object that configures chain-related options. See
[Configuring an Airnode](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#considerations-transaction-options)
for some considerations.

#### `options.txType`

(required) - The transaction type to use:

- `"legacy"` - Legacy Transaction Type
- `"eip1559"` -
  [EIP-1559 Transaction Type](https://eips.ethereum.org/EIPS/eip-1559)

#### `options.priorityFee`

(optional) - An object that configures the EIP-1559 Priority Fee. Defaults:
`{"value": 3.12, "unit": "gwei"}`.

##### `options.priorityFee.value`

(required) - The EIP-1559 priority fee value.

##### `options.priorityFee.unit`

(required) - The unit of the priority fee value. It can be one of the following:

- `wei`
- `kwei`
- `mwei`
- `gwei`
- `szabo`
- `finney`
- `ether`

#### `options.baseFeeMultiplier`

(optional) - Number multiplied by the Base Fee to yield the Maximum Fee for
EIP-1559 transactions. Defaults to: `2`.

The resulting Maximum Fee will equal
`(Base Fee * baseFeeMultiplier) + priorityFee`

#### `options.gasPriceMultiplier`

(optional) - Number with a maximum of two decimals that gets multiplied by the
legacy gas price. No multiplier is used by default.

The resulting Gas Price will equal `Gas Price * gasPriceMultiplier`

#### `options.fulfillmentGasLimit`

(required) - The maximum gas limit allowed when Airnode responds to a request,
paid by the requester. If exceeded, the request is marked as failed and will not
be repeated during Airnode's next run cycle.

### `maxConcurrency`

(required) - The maximum number of concurrent handler calls per single Airnode
invocation. Airnode is reserving
([AWS](https://docs.aws.amazon.com/lambda/latest/operatorguide/reserved-concurrency.html))
and limiting
([AWS](https://docs.aws.amazon.com/lambda/latest/operatorguide/reserved-concurrency.html),
[GCP](https://cloud.google.com/functions/docs/configuring/max-instances)) the
number of spawned cloud functions based on this field.

If you want to disable this behavior, see
[`disableConcurrencyReservations`](#cloudprovider-disableconcurrencyreservations).

See
[Configuring an Airnode](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#considerations-concurrency)
for additional considerations.

### `blockHistoryLimit`

(optional) - The number of blocks in the past that the Airnode deployment should
search for requests. Defaults to `300` (roughly 1 hour for Ethereum).

### `minConfirmations`

(optional) - The number of confirmations required for a request to be considered
valid. Minimum confirmations refers to the number of blocks that have elapsed
since the current confirmed block. Defaults to `0`.

## nodeSettings

An object containing general deployment parameters of an Airnode.

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

(required) - The cloud provider that the node will be deployed at and its
configuration. Learn more about AWS or GCP resources that Airnode uses in the
[Cloud Resources](../cloud-resources.md) documentation.

#### `cloudProvider.type`

(required) - Currently `aws` and `gcp` are supported for serverless
([deployer-image](../../grp-providers/docker/deployer-image.md)). Use `local` if
you want to run Airnode as a docker container locally
([client-image](../../grp-providers/docker/client-image.md)).

#### `cloudProvider.region`

(required for AWS and GCP) - The cloud provider region that the node will be
deployed at. An example value for AWS would be `us-east-1`. See the cloud
provider's documentation for possible values. When using GCP, make sure to
choose a
[**zone** not a location](https://cloud.google.com/compute/docs/regions-zones).
Note that transferring a deployment from one region to the other is not trivial
(i.e., it does not take one command like deployment, but rather three).
Therefore, try to choose a region and stick to it for this specific deployment.

#### `cloudProvider.disableConcurrencyReservations`

(required for AWS and GCP) - Disables concurrency reservations for spawned cloud
functions. For more information refer to the [maxConcurrency](#maxconcurrency)
section.

#### `cloudProvider.projectId`

(required for GCP) - Project ID of the GCP project the Airnode will be deployed
under.

### `airnodeWalletMnemonic`

(required) - The wallet mnemonic that will be used as the Airnode's BIP 44
wallet from which the Airnode's
[address](../../concepts/airnode.md#airnodeaddress) will be derived. It is not
required to fund the wallet to run the Airnode but must be funded to announce
the [xpub](../../concepts/airnode.md#xpub) of the Airnode on-chain which is
optional.

### `heartbeat`

(required) - Object configuring Airnode's heartbeat functionality. Airnode can
periodically make a request to the specified URL signaling that it's active at
the end of each cycle (every minute). There are plans in the future to allow the
sending of a payload with information for reporting purposes. See the
[Heartbeat](../../grp-providers/guides/build-an-airnode/heartbeat.md)
documentation for more information.

#### `heartbeat.enabled`

(required) - Enable or disable, using `true` or `false`, Airnode's heartbeat.

#### `heartbeat.apiKey`

(only if enabled) - The API key to authenticate against the heartbeat URL.

#### `heartbeat.id`

(only if enabled) - The Airnode heartbeat ID for accounting purposes.

#### `heartbeat.url`

(only if enabled) - The URL to make the heartbeat request to.

### `httpGateway`

(required) - The Airnode's HTTP gateway can request endpoints without using the
blockchain. See the
[HTTP Gateways](../../grp-providers/guides/build-an-airnode/http-gateways.md)
documentation for more info.

#### `httpGateway.enabled`

(required) - Enable or disable, using `true` or `false`, Airnode's access to the
HTTP gateway.

#### `httpGateway.apiKey`

(only if enabled) - The API key to authenticate against the gateway. The key
must have a length of between 30 - 120 characters. Do not use the same key for
`httpGateway` and `httpSignedDataGateway`.

#### `httpGateway.maxConcurrency`

(only if enabled, optional) - A number higher than zero representing the maximum
number of serverless functions serving HTTP gateway requests running at the same
time. When omitted, there is no maximum concurrency set.

### `httpSignedDataGateway`

(required) - The Airnode's HTTP gateway can request endpoints without using the
blockchain. See the
[HTTP Gateways](../../grp-providers/guides/build-an-airnode/http-gateways.md)
documentation for more info.

#### `httpSignedDataGateway.enabled`

(required) - Enable/disable, using true/false, Airnode's access to the HTTP
gateway.

#### `httpSignedDataGateway.apiKey`

(only if enabled) - The API key to authenticate against the gateway. The key
must have a length of between 30 - 120 characters. Do not use the same key for
`httpGateway` and `httpSignedDataGateway`.

#### `httpSignedDataGateway.maxConcurrency`

(only if enabled, optional) - A number higher than zero representing the maximum
number of serverless functions serving HTTP gateway requests running at the same
time. When omitted, there is no maximum concurrency set.

### `logFormat`

(required) - The format that will be used to output logs. Either `json` or
`plain`.

### `logLevel`

(required) - The highest verbosity level of the logs that will be outputted.
Options: `DEBUG`, `INFO`, `WARN` or `ERROR`.

### `nodeVersion`

(required) - The version of the node (Airnode) that will be deployed with this
config object, of the form `#.#.#`. Since the `config.json` format may change
with node versions, always match the `config.json` version with the Airnode
being deployed. See the
[Releases page of the Airnode repo](https://github.com/api3dao/airnode/releases)
for available versions.

### `stage`

(required) - The label used to distinguish between multiple deployments of the
same Airnode on a cloud provider. For example, the same Airnode may have
multiple deployments with `stage` set to a different value (dev, public, prod).
`stage` cannot be longer than 16 characters and can only include lowercase
alphanumeric characters (`a–z`, `0–9`) and hyphens (`-`).

## triggers

An array that maps external triggers such as a request made through RRP (or a
subscription made through PSP, which is not implemented yet) to an endpoint
defined in an OIS.

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

In the example above, the Airnode deployment has an OIS with the title
`myOisTitle`. This OIS has an endpoint with the name `myEndpointName`. When the
Airnode deployment detects a [request](../../concepts/request.md) that
references its [`airnodeAddress`](../../concepts/airnode.md#airnodeaddress) and
<code style="overflow-wrap: break-word;">0xe1da7948e4dd95c04b2aaa10f4de115e67d9e109ce618750a3d8111b855a5ee5</code>
as the [`endpointId`](../../concepts/endpoint.md#endpointid), it will call the
specified endpoint (`myOisTitle`-`myEndpointName`) with the parameters provided
in the request to fulfill it. See the
[endpoint id documentation](../../concepts/endpoint.md#endpointid) for the
default convention for deriving the `endpointId`.

### `rrp`

(required) - An array of endpoints from OIS that the Airnode will respond to via
the RRP protocol [AirnodeRrpV0.sol](../../concepts/).

#### `rrp[n].endpointId`

(required) - A identifier derived for an oisTitle/endpointName pair. For
derivation see:
[derive-endpoint-id](../packages/admin-cli.md#derive-endpoint-id).

#### `rrp[n].oisTitle`

(required) - The title of an OIS object.

#### `rrp[n].endpointName`

(required) - The endpoint name of an OIS endpoint.

### `http`

(required) - An array of endpoints from OIS that the Airnode will respond to via
the HTTP gateway.

#### `http[n].endpointId`

(required) - A identifier derived for an oisTitle/endpointName pair. For
derivation see:
[derive-endpoint-id](../packages/admin-cli.md#derive-endpoint-id).

#### `http[n].oisTitle`

(required) - The title of an OIS object.

#### `http[n].endpointName`

(required) - The endpoint name of an OIS endpoint.

### `httpSignedData`

(required) - An array of endpoints from OIS that the Airnode will respond to via
the HTTP Signed Data Gateway.

#### `httpSignedData[n].endpointId`

(required) - A identifier derived for an oisTitle/endpointName pair, see
[derive-endpoint-id](../packages/admin-cli.md#derive-endpoint-id).

#### `httpSignedData[n].oisTitle`

(required) - The title of an OIS object.

#### `httpSignedData[n].endpointName`

(required) - The endpoint name of an OIS endpoint.

## ois

A list of OIS objects. Since each OIS specifies the integration of an API to an
oracle, a single Airnode deployment can serve multiple APIs. To avoid
duplication of content, see the
[API Integration](../../grp-providers/guides/build-an-airnode/api-integration.md)
guide and the [Oracle Integration Specifications (OIS)](/ois/v1.0.0/)
documentation.

## apiCredentials

Each entry in `apiCredentials` maps to a security scheme defined in an OIS
(`ois[n].components.securitySchemes.{securitySchemeName}`), where `oisTitle` is
the `title` field of the related OIS, and `securitySchemeName` is the name of
the respective security scheme. These would be `myOisTitle` and
`mySecurityScheme` in the example below. `securitySchemeValue` is the value used
for the authentication with the security scheme (e.g., the API key) which would
be in `secrets.env` in the example below. For more implementation details, see
the [API Security](../../grp-providers/guides/build-an-airnode/api-security.md)
documentation.

The `security` field in the OIS object must be included and hold the names of
all security schemes the API operation

Note that if you do not need a security scheme, leave the `apiCredentials` array
empty.

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

(required) - The `ois.title` of the OIS where the `securitySchemeName` can be
found.

### `securitySchemeName`

(required) - The name of a security scheme from
`ois[n].components.securitySchemes.{securitySchemeName}`.

### `securitySchemeValue`

(required) - The value of the security scheme used (as defined by
`ois[n].components.securitySchemes.{securitySchemeName}` for the authentication.
Usually stored in `secrets.env`.
