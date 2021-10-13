---
title: Heartbeat
---
<TitleSpan>Build an Airnode</TitleSpan>
# {{$frontmatter.title}}


At the end of each of Airnode's runs (every minute), Airnode can make an HTTP POST request to a specified URL. This is both to signal that the Airnode is alive and working (useful especially right after the deployment) and also to send some metrics from its run. 

:::warning Heartbeat (optional)
Using the heartbeat functionality with Airnode is optional.
:::

Turn on the optional heartbeat functionality by setting all fields in the `config.json` section `nodeSettings.heartbeat`.

```json
{ 
  ois:{...},
  triggers:{...},
  chains:{...},
  environment:{...},
  nodeSettings:{
      "nodeVersion": "0.1.0",
      "cloudProvider": "aws",
      "region": "us-east-1",
      "stage": "testnet",
      "airnodeWalletMnemonic": "<FILL_*>",
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
}
```

- enabled: Enable/disable Airnode's heartbeat
- url: The URL to make the heartbeat request to
- apiKey: The API key to authenticate against the heartbeat URL
- id: The Airnode heartbeat ID for accounting purposes


## Build the Endpoint

When building the endpoint to receive the heartbeat call, the following parameters are passed. Your endpoint must be declared using `nodeSettings.heartbeat.url`.

|name|in|type|
|----|--|----|
|api_key|body|string|
|deployment_id|body|string|
|httpGatewayUrl|body|string|
|payload|body|json|


Below is an example of what is included in the request to `heartbeat.url`.
```json
{
  "api_key":"d714a900-3b9e-4e4d-8eae-756ef06a8836",
  "deployment_id":"916d3ec80fda",
  "httpGatewayUrl":"https://some.aws.api.gateway.url/v1/test",
  "payload":{...}
}
```

<table>
  <tr>
    <td>apiKey:</td><td>API key for heartbeat calls configured in nodeSettings.heartbeat.apiKey. Used for authentication against the heartbeat service running on URL from nodeSettings.heartbeat.url.</td>
  </tr>
  <tr>
    <td>deployment_id:</td><td>The Airnode heartbeat ID for accounting purposes.</td>
  </tr>
  <tr>
    <td>httpGatewayUrl:</td><td>If HTTP gateway is enabled this is the URL of the gateway you can make test HTTP calls against.</td>
  </tr>
  <tr>
    <td>payload:</td><td>Metrics from Airnode's run.</td>
  </tr>
</table>
