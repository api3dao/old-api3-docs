---
title: HTTP Gateway
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

As part of the Airnode deployment you can decide to also deploy an HTTP Gateway. This gateway allows you to test out your defined endpoints without accessing the blockchain, simulating the Airnode functionality. You can provide any endpoint arguments as you normally would and you'll get a response from the integrated API. Gateway is actually calling the API the same way Airnode would so it's a good way to test that the integration is set up correctly.

You can enable the HTTP gateway by setting all the necessary fields in the config.json section nodeSettings.httpGateway:

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

>- enabled: Enable/disable Airnode's HTTP gateway
>- apiKey: The API key to authenticate against the gateway
<Fix>Where does one get an API Gateway key?</Fix>

<Fix>Add a link to OIS testable and explain this better.</Fix>
You also need to add a testable flag for each endpoint you want to be callable this way in your OIS (TODO link to OIS)

Once deployed, you can obtain the gateway's URL either from receipt.json (field api.httpGatewayUrl) or from Airnode's heartbeat (TODO Link AN-110: Document heartbeat functionalityREADY 2 GO LIVE)

In order to test some endpoint via the HTTP gateway you have to make an HTTP POST request with endpoint ID (found in config.json) as a path parameter and endpoint parameters in the request body:

```curl
curl -X POST -d '{"parameters": {"param1": "string", "param2": 5}}' '<https://some.aws.api.gateway.url/v1/test/0xe1da7948e4dd95c04b2aaa10f4de115e67d9e109ce618750a3d8111b855a5ee5'
```

Where param1 and param2 are endpoint parameters and 0xe1da7948e4dd95c04b2aaa10f4de115e67d9e109ce618750a3d8111b855a5ee5 is endpoint ID.

Below is the example of the response format:

`{"value": <return value>}`
 

 

Also, the section 5 of OIS documentation (Oracle Integration Specifications (OIS) 1.0.0 | Documentation ) will contain one additional parameter testable which is a boolean indicating whether the endpoint can be used via HTTP gateway or not. It’s optional, by default is false and there is no OAS equivalent.