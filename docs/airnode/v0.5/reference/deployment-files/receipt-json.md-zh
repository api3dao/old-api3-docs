---
title: receipt.json
---

<TitleSpan>Deployment Files</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

A `receipt.json` file is outputted after each deployment and contains non-sensitive information about the deployment. The main use of a receipt file is to remove an Airnode deployment when no longer needed. Use the [docker image](../../grp-providers/docker/deployer-image.md#remove) to execute the remove command.

It also provides the Airnode xpub for the hardened derivation path `m/44'/60'/0'` that must be announced off-chain in order for sponsors to derive their designated sponsor wallet. This wallet will then be used by the Airnode to fulfill each request made by the requester contracts.

- `airnodeWallet`: describes the Airnode that was deployed
- `deployment`: where the Airnode was deployed to
- `api`: contains the details of the Airnode API (e.g. [heartbeat](../../grp-providers/guides/build-an-airnode/heartbeat.md) or [testing gateways](../../grp-providers/guides/build-an-airnode/http-gateways.md))

A `receipt.json` file is created for both a AWS or GCP deployment. A receipt is not generated for client deployments (deploying to a Docker container).

:::: tabs

::: tab AWS

```json
{
  "airnodeWallet": {
    "airnodeAddress": "0xA30CA71Ba54E83127214D3271aEA8F5D6bD4Dace",
    "airnodeAddressShort": "a30ca71",
    "airnodeXpub": "xpub6C8tvRgYkjNVaGMtpyZf4deBcUQHf7vgWUraVxY6gYiZhBYbPkFkLLWJzUUeVFdkKpVtatmXHX8kB76xgfmTpVZWbVWdq1rneaAY6a8RtbY"
  },
  "deployment": {
    "airnodeAddressShort": "a30ca71",
    "cloudProvider": {
      "type": "aws",
      "region": "us-east-1",
      "disableConcurrencyReservations": false
    },
    "stage": "starter-example",
    "nodeVersion": "0.5.0"
  },
  "api": {
    "heartbeatId": "74dc44a1ee65",
    "httpGatewayUrl": "https://some.http.api.gateway.url/v1",
    "httpSignedDataGatewayUrl": "https://some.httpSignedData.api.gateway.url/v1"
  }
}
```

:::

::: tab GCP

```json
{
  "airnodeWallet": {
    "airnodeAddress": "0xAcCc602FA6d1dD57cE11559Fe0c07895396a7359",
    "airnodeAddressShort": "accc602",
    "airnodeXpub": "xpub6C6wfzZ8EptS8Ti2xZgukJFWkgBcFY2ygU4BDTTGtR2GmX3vvrx3YFat3i1XLfwvhtiCEty1GZnV1MSCKBBt7uYKBbrHaqWvP623w9jUNhW"
  },
  "deployment": {
    "airnodeAddressShort": "accc602",
    "cloudProvider": {
      "type": "gcp",
      "region": "us-east4",
      "disableConcurrencyReservations": false,
      "projectId": "api3-753118"
    },
    "stage": "dev",
    "nodeVersion": "0.5.0"
  },
  "api": {}
}
```

:::

::::
