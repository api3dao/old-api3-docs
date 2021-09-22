---
title: HTTP Gateway
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

As part of the Airnode deployment you can decide to deploy an HTTP Gateway. The gateway allows the testing of defined endpoints without accessing the blockchain. You provide endpoint arguments to get a response from an integrated API. Gateway calls the API simulating Airnode. This results in confirmation your integration is set up properly.

:::warning HTTP Gateway (optional)
Using the HTTP gateway functionality with Airnode is optional.
:::

## Setup
Enable the HTTP gateway by setting two fields in the config.json (`nodeSettings.httpGateway`).

- **enabled**: A boolean setting enable/disable for the Airnode's HTTP gateway.
- **apiKey**: A user defined API key to authenticate against the gateway. The key must have a length of between 30 - 120 characters.

```json
"nodeSettings": {
    "cloudProvider": "aws",
    "airnodeWalletMnemonic": "${AIRNODE_WALLET_MNEMONIC}",
    "heartbeat": {
      "enabled": true,
      "apiKey": "${HEARTBEAT_API_KEY}",
      "id": "${HEARTBEAT_ID}",
      "url": "${HEARTBEAT_URL}"
    },
    "httpGateway": {
      "enabled": true,
      "apiKey": "${HTTP_GATEWAY_API_KEY}"
    },
    "logFormat": "plain",
    "logLevel": "INFO",
    "nodeVersion": "0.1.0",
    "region": "us-east-1",
    "stage": "dev"
  },
```

You must also add the [`testable`](ois.md#_5-endpoints) boolean flag for each endpoint you want to test in the OIS (`ois.endpoints[n]testable`). This indicates whether the endpoint can be used via HTTP gateway or not. It’s optional and by default is false.

  ```json
  // in config.json
  // ois.endpoints[n].testable 
  "ois":{
    "endpoints":[
    {
      "name": "convertToUSD",
      "testable": true,
      ...
    ]
    ...
  }
  ```
## Gateway URL

A gateway URL is generated when your Airnode is deployed. You can obtain the URL (`api.httpGatewayUrl`) from the receipt.json file returned by the deployer  or as part of a request sent from Airnode's [heartbeat](heartbeat.md) to your specified heartbeat URL.

## Using CURL

In order to test an endpoint, via the HTTP gateway, make an HTTP POST request with endpointId as a path parameter, the x-api-key in the header and endpoint parameters in the request body. 

An `endpointId` can found in config.json under `ois.triggers[n].endpointId`.

|parameter|in|CURL options|
|---------|--|----------|
|x-api-key|header      |`-H 'x-api-key: 8d890a46-799d-48b3-a337-8531e23dfe8e'`|
|endpointId|path       |`/v1/test/0xe1da7948e4dd95c04b2aaa10f4de115e67d9e109ce618750a3d8111b855a5ee5`|
|&lt;user-defined>|body|`-d '{"parameters": {"param1": "string", "param2": 5}}'`

Replace `https://gateway.url` in the example below with your gateway URL.

```bash
curl -X POST -H 'x-api-key: 8d890a46-799d-48b3-a337-8531e23dfe8e' \
-d '{"parameters": {"param1": "string", "param2": 5}}' \ 
'https://gateway.url/v1/test/0xe1da7948e4dd95c04b2aaa10f4de115e67d9e109ce618750a3d8111b855a5ee5'
```

The response format is a simple JSON object: `{"value": <return value>}`.
