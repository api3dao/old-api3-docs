---
title: Heartbeat (optional)
---

<TitleSpan>Build an Airnode</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

At the end of an Airnode's run (every minute), Airnode can make an HTTP POST request to a specified URL. This is both to signal that the Airnode is alive and working (useful especially right after the deployment) and also as a notification every time it runs (self-operates).

> ![config-json](../../../assets/images/heartbeat.png)
> 
> 1. <p class="diagram-line" style="color:blue;">Airnode gathers on-chain requests targeting the API it supports.</p>
> 2. <p class="diagram-line" style="color:green;">The required API endpoint for each request is called.</p>
> 3. <p class="diagram-line" style="color:red;">A response is sent to each request.</p>
> 4. <p class="diagram-line" style="color:black;">Finally Airnode makes a request to the heartbeat URL (HTTP POST). This could be to an endpoint within API the Airnode supports or to any cloud REST endpoint such as a monitoring service.</p>

Turn on the optional heartbeat functionality by setting all fields in the `config.json` section for `nodeSettings.heartbeat`.

```json
{
  ois:{...},
  triggers:{...},
  chains:{...},
  environment:{...},
  nodeSettings:{
      "airnodeWalletMnemonic": "<FILL_*>",
      "cloudProvider": {
        "type": "aws",
        "region": "us-east-1"
      },
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
      "logLevel": "INFO",
      "nodeVersion": "0.6.0",
      "stage": "testnet",
  }
}
```

- `enabled`: Enable/disable Airnode's heartbeat.
- `url`: The URL to make the heartbeat request to.
- `apiKey`: The API key to authenticate with the heartbeat URL.
- `id`: The Airnode heartbeat ID for accounting purposes.

## Heartbeat Endpoint

The table below illustrates the parameters passed to the Heartbeat URL.

| name                             | in     | type   |
| -------------------------------- | ------ | ------ |
| airnode-heartbeat-api-key        | header | string |
| deployment_id                    | body   | string |
| http_gateway_url               | body   | string |
| http_signed_data_gateway_url | body   | string |

Below is an example of what is included in the request body to `heartbeat.url`.

```json
{
  "deployment_id": "916d3ec80fda",
  "http_gateway_url": "https://some.aws.http.gateway.url/v1",
  "http_signed_data_gateway_url": "https://some.aws.http.signed.data.gateway.url/v1"
}
```

<table>
  <tr>
    <td>airnode-heartbeat-api-key:</td><td>API key for heartbeat calls configured in nodeSettings.heartbeat.apiKey. Used for authentication against the heartbeat service running on URL from nodeSettings.heartbeat.url.</td>
  </tr>
  <tr>
    <td>deployment_id:</td><td>An ID for accounting purposes, unique to the deployed Airnode.</td>
  </tr>
  <tr>
    <td>http_gateway_url:</td><td>If HTTP gateway is enabled this is the URL of the gateway you can make test HTTP calls against.</td>
  </tr>
    <tr>
    <td>http_signed_data_gateway_url:</td><td>If HTTP signed data gateway is enabled this is the URL of the gateway you can make HTTP calls against.</td>
  </tr>
</table>
