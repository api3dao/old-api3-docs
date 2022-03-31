---
title: Heartbeat (optional)
---

<TitleSpan>Build an Airnode</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

At the end of each of Airnode's runs (every minute), Airnode can make an HTTP POST request to a specified URL. This is both to signal that the Airnode is alive and working (useful especially right after the deployment) and also to send some metrics from its run.

Turn on the optional heartbeat functionality by setting all fields in the `config.json` section `nodeSettings.heartbeat`.

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
        "apiKey": "${HTTP_GATEWAY_API_KEY}"
      },
      "logFormat": "json",
      "logLevel": "INFO",
      "nodeVersion": "0.4.1",
      "stage": "testnet",
  }
}
```

- enabled: Enable/disable Airnode's heartbeat
- url: The URL to make the heartbeat request to
- apiKey: The API key to authenticate against the heartbeat URL
- id: The Airnode heartbeat ID for accounting purposes

## Heartbeat Endpoint

Every time an HTTP POST request is made against the heartbeat endpoint declared with `nodeSettings.heartbeat.url`, the following parameters are passed:

| name                      | in     | type   |
| ------------------------- | ------ | ------ |
| airnode-heartbeat-api-key | header | string |
| deployment_id             | body   | string |
| http_gateway_url        | body   | string |

Below is an example of what is included in the request to `heartbeat.url`.

```json
{
  "deployment_id": "916d3ec80fda",
  "http_gateway_url": "https://some.aws.api.gateway.url/v1/test"
}
```

<table>
  <tr>
    <td>airnode-heartbeat-api-key:</td><td>API key for heartbeat calls configured in nodeSettings.heartbeat.apiKey. Used for authentication against the heartbeat service running on URL from nodeSettings.heartbeat.url.</td>
  </tr>
  <tr>
    <td>deployment_id:</td><td>The Airnode heartbeat ID for accounting purposes.</td>
  </tr>
  <tr>
    <td>http_gateway_url:</td><td>If HTTP gateway is enabled this is the URL of the gateway you can make test HTTP calls against.</td>
  </tr>
</table>
