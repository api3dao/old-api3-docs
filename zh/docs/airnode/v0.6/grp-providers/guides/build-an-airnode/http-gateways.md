---
title: HTTP Gateways (optional)
---

<TitleSpan>Build an Airnode</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

As part of the Airnode deployment you can decide to deploy two different HTTP Gateways.

- HTTP Gateway: testing
- HTTP Signed Data Gateway: production use

## Gateway Differences

Both gateways are setup identically. The differences are in their purpose and response. Gateways are allowed only when deploying to AWS and GCP.

> ![gateway](../../../assets/images/gateway.png)

### HTTP Gateway

The regular HTTP gateway is strictly for testing purposes. Using a simple tool like CURL you can test that endpoints in the Airnode configuration are working properly without accessing the blockchain.

### HTTP Signed Data Gateway

The HTTP signed data gateway is used for production purposes. While it is executed in a similar way as the HTTP gateway, its response is signed and does not contain a `rawValue` field. This gateway is executed by an off-chain code source that may in turn push data to a blockchain.

## Setup

Enable either gateway in the `config.json` file fields `nodeSettings.httpGateway` and `nodeSettings.httpSignedDataGateway`.

- **enabled**: A boolean to enable/disable for the gateway.
- **apiKey**: A user defined API key to authenticate against the gateway. The key must have a length of between 30 - 120 characters.
- **maxConcurrency**: (optional) A number higher than zero that represents the maximum number of serverless functions serving gateway requests. When omitted, there is no maximum concurrency set.

```json
"nodeSettings": {
  "cloudProvider": {
    "type": "aws",
    "region": "us-east-1"
  },
  "airnodeWalletMnemonic": "${AIRNODE_WALLET_MNEMONIC}",
  "heartbeat": {...},
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
  ...
},
```

Add the desired endpoints the gateways can respond to in the `triggers.http[n]` and/or `triggers.httpSignedData[n]` arrays. The corresponding arrays do not need to match. You may want to test all endpoints but only serve certain endpoints using the HTTP signed data gateway or via RRP.

```json
// in config.json
"triggers": {
  "rrp": [
    {
      "endpointId": "0xf466b8feec41e9e50815e0c9dca4db1ff959637e564bb13fefa99e9f9f90453c",
      "oisTitle": "CoinGecko Basic Request",
      "endpointName": "coinMarketData",
    }
  ],
  "http": [
    {
      "endpointId": "0xf466b8feec41e9e50815e0c9dca4db1ff959637e564bb13fefa99e9f9f90453c",
      "oisTitle": "CoinGecko Basic Request",
      "endpointName": "coinMarketData",
    }
  ],
  "httpSignedData": [
    {
      "endpointId": "0xf466b8feec41e9e50815e0c9dca4db1ff959637e564bb13fefa99e9f9f90453c",
      "oisTitle": "CoinGecko Basic Request",
      "endpointName": "coinMarketData",
    }
  ]
}
```

## Gateway URLs

A gateway URL is generated for each gateway (when enabled) when Airnode is deployed. You can obtain the URLs `api.httpGatewayUrl` and `api.httpSignedDataGatewayUrl` from the [receipt.json](../../../reference/deployment-files/receipt-json.md) file returned by the Airnode deployer. They are also available as part of the payload sent from Airnode's [heartbeat](./heartbeat.md) to your specified heartbeat URL.

## Using CURL

In order to execute an endpoint served by either gateway, the following are required as part of the CURL call.

- Make a POST request with the `endpointId` as a path parameter. An `endpointId` can found in config.json under `triggers.http.endpointId` or `triggers.httpSignedData.endpointId`.
- Add the `Content-Type` header, set to `application/json`.
- Add the `x-api-key` header, set to the apiKey. The `x-api-key` can found in config.json under `nodeSettings.httpGateway.apiKey` or `nodeSettings.httpSignedDataGateway.apiKey`.
- Place the parameters/encodedParameters in the request body.

<style type="text/css" rel="stylesheet">
.tSmall { font-size:x-small; margin-left:13px;}
</style>

| CURL Parameters                                 | In     | CURL Options                                              |
| ----------------------------------------------- | ------ | --------------------------------------------------------- |
| Content-Type                                    | header | `-H 'Content-Type: application/json'`                     |
| x-api-key                                       | header | `-H 'x-api-key: 8d890a46-799d-48b3-a337-8531e23dfe8e'`    |
| endpointId                                      | path   | `<gatewayUrl>/0xf466b8feec...99e9f9f90453c`         |
| \* parameters<div class="tSmall">HTTP Gateway</div>        | body   | `-d '{"parameters": {"param1": "myValue", "param2": 5}}'` |
| \* encodedParameters<div class="tSmall">HTTP Signed Data Gateway</div> | body   | `-d '{"encodedParameters": "0x3173737300....000"}'`       |

\* Parameters for the gateways are named differently. The HTTP signed data gateway requires that the `encodedParameters` be encoded using [Airnode ABI](../../../reference/specifications/airnode-abi-specifications.md).

Replace `<gatewayUrl>` in the examples below with a URL from the `receipt.json` file using the `httpGatewayUrl` or `httpSignedDataGatewayUrl` field. The [receipt.json](../../../reference/deployment-files/receipt-json.md) file is created when you deploy an Airnode.

### Request

:::: tabs

::: tab HTTP Gateway

```sh
curl \
-X POST \
-H 'Content-Type: application/json' \
-H 'x-api-key: 8d890a46-799d-48b3-a337-8531e23dfe8e' \
-d '{"parameters": {"param1": "myValue", "param2": 5}}' \
'<gatewayUrl>/0xf466b8feec...99e9f9f90453c'
```

:::

::: tab HTTP Signed Data Gateway

```sh
curl \
-X POST \
-H 'Content-Type: application/json' \
-H 'x-api-key: 8d890a46-799d-48b3-a337-8531e23dfe8e' \
-d '{"encodedParameters": "0x3173737300....000"}' \
'<gatewayUrl>/0xf466b8feec...99e9f9f90453c'
```

:::

::::

### Response

:::: tabs

::: tab HTTP Gateway

```json
{
  "rawValue": { "usd": "6421.4" },
  "encodedValue": "0x0000000000000000000000000000000000000000000000000000000ef373e180",
  "values": ["64214000000"]
}
```

The response format is a simple JSON object with the following fields:

- `rawValue` - the API response
- `values` - an array of values after they are [extracted and converted](../../../reference/packages/adapter.md#conversion) to the target type
- `encodedValue` - the encoded bytes value that is sent as payload in the response transaction on chain

:::

::: tab HTTP Signed Data Gateway

```json
{
  "data": {
    "timestamp": "1648226003",
    "value": "0x0000000000000000000000000000000000000000000000000000000a571a14c0"
  },
  "signature": "0xa74e4312e2e6fa2de2997ef43e417e3b82d0019ac2a84012300f706f8b213e0d6e1ae9301052ec25b71addae1b1bceb4617779abfc6acd5a951e20a0aaabe6f61b"
}
```

The response format is a simple JSON object with the following fields:

- `data.timestamp` - The timestamp applied to the response.
- `data.value` - The encoded bytes value that is sent as payload in the response. Suitable for use on-chain.
- `signature` - The response has been signed by Airnode.

:::

::::

There are additional examples of using CURL to call the HTTP gateway in both the [Quick Deploy AWS](../../tutorial/quick-deploy-aws/#execute-endpoint) and [Quick Deploy GCP](../../tutorial/quick-deploy-gcp/#execute-endpoint) tutorials.
