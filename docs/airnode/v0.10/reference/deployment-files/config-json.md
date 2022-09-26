---
title: config.json
docSetName: Airnode v0.10
folder: Reference > Deployment Files
basePath: /airnode/v0.10
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2, 5]" />

The `config.json` defines a single Airnode deployment. The file contents are a
single JSON object. Each config object can be thought of as the static NoSQL
database of an Airnode deployment. It contains five fields as show below.

```json
{
  "chains": [],
  "nodeSettings": {},
  "triggers": {},
  "templates": [],
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
- [templates](./config-json.md#templates):
- [ois](./config-json.md#ois): API specifications and the corresponding on-chain
  endpoints, kept as [OIS](/ois/v1.1/ois.md) objects.
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
    "authorizers": {
      "requesterEndpointAuthorizers": [
        "0xf18c105D0375E80980e4EED829a4A68A539E6178",
        "0xCE5e...1abc"
      ]
    },
    "authorizations": {
      "requesterEndpointAuthorizations": {}
    },
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
      "fulfillmentGasLimit": 500000,
      "gasPriceOracle": [
        {
          "gasPriceStrategy": "latestBlockPercentileGasPrice",
          "percentile": 60,
          "minTransactionCount": 20,
          "pastToCompareInBlocks": 20,
          "maxDeviationMultiplier": 2
        },
        {
          "gasPriceStrategy": "providerRecommendedGasPrice",
          "recommendedGasPriceMultiplier": 1.2
        },
        {
          "gasPriceStrategy": "providerRecommendedEip1559GasPrice",
          "baseFeeMultiplier": 2,
          "priorityFee": {
            "value": 3.12,
            "unit": "gwei"
          }
        },
        {
          "gasPriceStrategy": "constantGasPrice",
          "gasPrice": {
            "value": 10,
            "unit": "gwei"
          }
        }
      ]
    },
    "maxConcurrency": 100,

    "blockHistoryLimit": 300,
    "minConfirmations": 0
  },
  {
    "authorizers": {
      "requesterEndpointAuthorizers": []
    },
    "authorizations": {
      "requesterEndpointAuthorizations": {}
    },
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
      "fulfillmentGasLimit": 500000,
      "gasPriceOracle": [
        {
          "gasPriceStrategy": "latestBlockPercentileGasPrice",
          "percentile": 60,
          "minTransactionCount": 20,
          "pastToCompareInBlocks": 20,
          "maxDeviationMultiplier": 2
        },
        {
          "gasPriceStrategy": "providerRecommendedGasPrice",
          "recommendedGasPriceMultiplier": 1.2
        },
        {
          "gasPriceStrategy": "providerRecommendedEip1559GasPrice",
          "baseFeeMultiplier": 2,
          "priorityFee": {
            "value": 3.12,
            "unit": "gwei"
          }
        },
        {
          "gasPriceStrategy": "constantGasPrice",
          "gasPrice": {
            "value": 10,
            "unit": "gwei"
          }
        }
      ],
      "withdrawalRemainder": {
        "value": 0,
        "unit": "wei"
      }
    },
    "maxConcurrency": 100,
    "blockHistoryLimit": 300,
    "minConfirmations": 0
  }
]
```

### `authorizers`

(required) - An object containing authorizer scheme types that list authorizer
contract addresses specifying the auth patterns that the
[AirnodeRrpV0](../../concepts/#airnoderrpv0-sol) contract should use on-chain.
An empty `<authorizerSchemeType>` array would allow-all. See the
[Authorizers](../../concepts/authorizers.md) doc for more information.

### `authorizations`

(required) - An object containing authorization types that list authorized
requester addresses for specific endpoints. If an authorization for a requester
address and `endpointId` is found in the `config.json`, the on-chain
authorization check is skipped.

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
[Configuring an Airnode](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#chains)
for some considerations.

#### `options.fulfillmentGasLimit`

(required) - The maximum gas limit allowed when Airnode responds to a request,
paid by the requester. If exceeded, the request is marked as failed and will not
be repeated during Airnode's next run cycle.

#### `options.withdrawalRemainder`

(optional) - An object of the form `{"value": 0, "unit": "wei"}` that configures
the amount to subtract from the funds returned to the sponsor when making a
[withdrawal](../../concepts/sponsor.md#withdrawals). Defaults to zero and is
relevant only for some chains (e.g.
[Optimism](../chain-idiosyncrasies.md#optimism)).

##### `options.withdrawalRemainder.value`

<p style="margin-left:35px;">(required:<span style="font-size:small;color:gray;"> <code>if option.withdrawalRemainder present</code></span>) - A number specifying the <code>withdrawalRemainder</code> value.</p>

##### `options.withdrawalRemainder.unit`

<p style="margin-left:35px;">(required:<span style="font-size:small;color:gray;"> <code>if withdrawalRemainder present</code></span>) - The unit of the <code>withdrawalRemainder</code> value. It can be one of the following:
(wei, kwei, mwei, gwei, szabo, finney, ether).</p>

#### `options.gasPriceOracle[n]`

(required) - A list of gas price oracle strategies that the Airnode will use in
the specified order. Each strategy has its own unique set of associated fields
that describes it. See [Gas Price Strategies](../../concepts/gas-prices.md) for
an in-depth understanding.

<!-- ##### `options.gasPriceOracle[n].gasPriceStrategy`

(required) - The name of the gas price strategy. The supported strategies are
below. For more detail on each, see the
[Gas Prices](../../concepts/gas-prices.md) page.-->

- [latestBlockPercentileGasPrice](../../concepts/gas-prices.md#latestblockpercentilegasprice)
  - `percentile`<br/>(required) - The percentile of gas prices to return from a
    block.
  - `minTransactionCount`<br/>(required) - The minimum amount of transactions
    required in a block to use for calculating a gas price percentile.
  - `pastToCompareInBlocks`<br/>(required) - The number of blocks to look back
    for the reference block.
  - `maxDeviationMultiplier`<br/>(required) - The maximum deviation multiplier
    of the latest block gas price percentile compared to the reference block gas
    price percentile. Used to protect against large gas price spikes.
- [providerRecommendedGasPrice](../../concepts/gas-prices.md#providerrecommendedgasprice)
  - `recommendedGasPriceMultiplier`<br/>(required) - A number with a maximum of
    two decimals that gets multiplied by the provider reported gas price. The
    resulting Gas Price will equal `Gas Price * providerRecommendedGasPrice`.
- [providerRecommendedEip1559GasPrice](../../concepts/gas-prices.md#providerrecommendedeip1559gasprice)
  - `baseFeeMultiplier`<br/>(required) - Number multiplied by the Base Fee to
    yield the Maximum Fee for EIP-1559 transactions. Defaults to: `2`. The
    resulting Maximum Fee will equal
    `(Base Fee * baseFeeMultiplier) + priorityFee`.
  - `priorityFee`:<br/>(required) - An object that configures the EIP-1559
    Priority Fee. Defaults: `{"value": 3.12, "unit": "gwei"}`.
    - `priorityFee.value`<br/>(required) - A number specifying the EIP-1559
      priority fee value.
    - `priorityFee.unit`<br/>(required) - The unit of the priority fee value. It
      can be one of the following: (wei, kwei, mwei, gwei, szabo, finney,
      ether).
- [constantGasPrice](../../concepts/gas-prices.md#constantgasprice)
  - `gasPrice`<br/>(required) - An object of the form
    `{"value": 0, "unit": "wei"}` that configures the amount to use as gas
    price.
    - `gasPrice.value`<br/>(required) - A number specifying the gasPrice value.
    - `gasPrice.unit`<br/>(required) The unit of the gasPrice value. It can be
      one of the following: (wei, kwei, mwei, gwei, szabo, finney, ether).

### `maxConcurrency`

(required) - The maximum number of concurrent handler calls per single Airnode
invocation. Airnode is reserving
([AWS](https://docs.aws.amazon.com/lambda/latest/operatorguide/reserved-concurrency.html))
and limiting
([AWS](https://docs.aws.amazon.com/lambda/latest/operatorguide/reserved-concurrency.html),
[GCP](https://cloud.google.com/functions/docs/configuring/max-instances)) the
number of spawned cloud functions based on this field.

If you want to disable this behavior, see
[disableConcurrencyReservations](#cloudprovider-disableconcurrencyreservations).

See
[Configuring an Airnode](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#considerations-concurrency)
for additional considerations.

### `blockHistoryLimit`

(optional) - The number of blocks in the past that the Airnode deployment should
search for requests. Defaults to `300`, roughly 1 hour for Ethereum.

### `minConfirmations`

(optional) - The number of confirmations required for a request to be considered
valid. Minimum confirmations refers to the number of blocks that have elapsed
since the current confirmed block. Defaults to `0`.

## nodeSettings

An object containing general deployment parameters of an Airnode.

```json
// nodeSettings
{
  "nodeVersion": "0.10.0",
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
    "apiKey": "${HEARTBEAT_API_KEY}"
  },
  "httpGateway": {
    "enabled": true,
    "maxConcurrency": 20,
    "corsOrigins": []
  },
  "httpSignedDataGateway": {
    "enabled": true,
    "maxConcurrency": 20,
    "corsOrigins": []
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
([deployer-image](../../grp-providers/docker/deployer-image.md)). Use `local` to
run Airnode as a docker container locally
([client-image](../../grp-providers/docker/client-image.md)).

#### `cloudProvider.region`

(required:<span style="font-size:small;color:gray">
`if cloudProvider.type is AWS or GCP`</span>) - The cloud provider region that
Airnode will be deployed to. An example AWS value would be `us-east-1` and an
example GCP value would be `us-east1`. See the cloud provider's documentation
for possible values, though not all regions can be deployed to. For GCP, make
sure to choose a **region** and not a zone, and see the list below for regions
that have been confirmed to work. For AWS, some regions are disabled by default
and you must
[enable them](https://docs.aws.amazon.com/general/latest/gr/rande-manage.html)
before you can create and manage resources. Note that transferring a deployment
from one region to the other is not trivial (i.e., it does not take one command
like deployment, but rather three) and is not advised.

Supported GCP regions:

- asia-northeast1
- australia-southeast1
- europe-west1
- europe-west2
- us-central1
- us-east1
- us-east4
- us-west2
- us-west4

#### `cloudProvider.disableConcurrencyReservations`

(required:<span style="font-size:small;color:gray">
`if cloudProvider.type is AWS or GCP`</span>) - Disables concurrency
reservations for spawned cloud functions. For more information refer to the
[maxConcurrency](#maxconcurrency) section.

#### `cloudProvider.projectId`

(required:<span style="font-size:small;color:gray">
`if cloudProvider.type is GCP`</span>) - Project ID of the GCP project the
Airnode will be deployed under.

#### `cloudProvider.gatewayServerPort`

(optional:<span style="font-size:small;color:gray">
`if cloudProvider.type is local`</span>) - The port number (defaults to `3000`)
of the API gateway inside the docker container. This property is especially
useful, if the container is run using
[host networking](https://docs.docker.com/network/host/).

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

(required: <span style="font-size:small;color:gray;">
`if heartbeat.enabled is true`</span>) - The API key to authenticate against the
heartbeat URL.

#### `heartbeat.url`

(required: <span style="font-size:small;color:gray;">
`if heartbeat.enabled is true`</span>) - The URL to make the heartbeat request
to.

### `httpGateway`

(required) - The Airnode's HTTP gateway can request endpoints without using the
blockchain. See the
[HTTP Gateways](../../grp-providers/guides/build-an-airnode/http-gateways.md)
documentation for more info.

#### `httpGateway.enabled`

(required) - Enable or disable, using `true` or `false`, Airnode's access to the
HTTP gateway.

#### `httpGateway.maxConcurrency`

(required: <span style="font-size:small;color:gray;">
`if httpGateway.enabled is true`</span>) - A number higher than zero
representing the maximum number of serverless functions serving HTTP gateway
requests running at the same time. When omitted, there is no maximum concurrency
set.

#### `httpGateway.corsOrigins`

(required: <span style="font-size:small;color:gray;">
`if httpGateway.enabled is true`</span>) - A list of allowed origins. An empty
array (`[]`) can be used to disable CORS and the wildcard (`['*']`) can be used
to allow all origins.

### `httpSignedDataGateway`

(required) - The Airnode's HTTP gateway can request endpoints without using the
blockchain. See the
[HTTP Gateways](../../grp-providers/guides/build-an-airnode/http-gateways.md)
documentation for more info.

#### `httpSignedDataGateway.enabled`

(required) - Enable/disable, using true/false, Airnode's access to the HTTP
gateway.

#### `httpSignedDataGateway.maxConcurrency`

(required: <span style="font-size:small;color:gray;">
`if httpSignedDataGateway.enabled is true`</span>) - A number higher than zero
representing the maximum number of serverless functions serving HTTP gateway
requests running at the same time. When omitted, there is no maximum concurrency
set.

#### `httpSignedDataGateway.corsOrigins`

(required: <span style="font-size:small;color:gray;">
`if httpSignedDataGateway.enabled is true`</span>) - A list of allowed origins.
An empty array (`[]`) can be used to disable CORS and the wildcard (`['*']`) can
be used to allow all origins.

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
      "endpointName": "myEndpointName",
      "cacheResponses": false
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
<code style="overflow-wrap: break-word;">0xd7ddc8ee64d6e540682ec844a5dd9737663ec3afe5751102eb4f966744751838</code>
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

#### `rrp[n].cacheResponses`

(required) - Whether to cache API responses for an endpoint by `requestId` and
return the cached response. Useful for non-idempotent API operations like random
number generators.

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

## templates

An array that includes the necessary information to make
[Template Requests](../../concepts/request.md#template-request). The `templates`
array must be included in the `config.json` file. The array can be left empty if
no templates are used . Valid templates will be used to make template requests
without calling the contract to fetch the template from the chain. For details
see [Using Templates](../../grp-developers/using-templates.md).

```json
// templates
[
  {
    "templateId": "0x02834eb43d56133982b7d6e5aa8b466c7ea4ba0fadf697698c1fee0996bba0fc",
    "endpointId": "0xd9e8c9bcc8960df5f954c0817757d2f7f9601bd638ea2f94e890ae5481681153",
    "encodedParameters": "0x3173000000000000000000000000000000000000000000000000000000000000636f696e49640000000000000000000000000000000000000000000000000000657468657265756d000000000000000000000000000000000000000000000000"
  }
]
```

### `templateId`

(required: <span style="font-size:small;color:gray;">
`for each row in templates`</span>) - An identifier derived by hashing the
Airnode address, the endpointId and the encoded parameters of the template. For
derivation see: [Templates](../../concepts/template.md#templateid).

### `endpointId`

(required: <span style="font-size:small;color:gray;">
`for each row in templates`</span>) - An identifier derived for an
oisTitle/endpointName pair. For derivation see:
[derive-endpoint-id](../packages/admin-cli.md#derive-endpoint-id).

### `encodedParameters`

(required: <span style="font-size:small;color:gray;">
`for each row in templates`</span>) - The encoded request parameters.

## ois

A list of OIS objects. Since each OIS specifies the integration of an API to an
oracle, a single Airnode deployment can serve multiple APIs. To avoid
duplication of content, see the
[API Integration](../../grp-providers/guides/build-an-airnode/api-integration.md)
guide and the [Oracle Integration Specifications (OIS)](/ois/v1.1/)
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

(required: <span style="font-size:small;color:gray;">
`for each row in apiCredentials`</span>) - The `ois.title` of the OIS where the
`securitySchemeName` can be found.

### `securitySchemeName`

(required: <span style="font-size:small;color:gray;">
`for each row in apiCredentials`</span>) - The name of a security scheme from
`ois[n].components.securitySchemes.{securitySchemeName}`.

### `securitySchemeValue`

(required: <span style="font-size:small;color:gray;">
`for each row in apiCredentials`</span>) - The value of the security scheme used
(as defined by `ois[n].components.securitySchemes.{securitySchemeName}` for the
authentication. Usually stored in `secrets.env`.
