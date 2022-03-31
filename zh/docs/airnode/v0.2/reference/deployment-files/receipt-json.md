---
title: receipt.json
---

<TitleSpan>Deployment Files</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/> A `receipt.json` file is outputted after each deployment and contains non-sensitive information about the deployment. The main use of a receipt file is to remove an Airnode deployment when no longer needed. Use the [docker image](../../grp-providers/docker/deployer-image.md#remove) to execute the remove command.

It also provides the Airnode xpub for the hardened derivation path `m/44'/60'/0'` that must be announced off-chain in order for sponsors to derive their designated sponsor wallet. This wallet will then be used by the Airnode to fulfill each request made by the requester contracts.

- `airnodeWallet`: describes the Airnode that was deployed
- `deployment`: where the Airnode was deployed to
- `api`: contains the details of the Airnode API (e.g. [heartbeat](../../grp-providers/guides/build-an-airnode/heartbeat.md) or [testing gateway](../../grp-providers/guides/build-an-airnode/http-gateway.md))

Example receipt:

```json
{
  "airnodeWallet": {
    "airnodeAddress": "0xA30CA71Ba54E83127214D3271aEA8F5D6bD4Dace",
    "airnodeAddressShort": "a30ca71",
    "airnodeXpub": "xpub6C8tvRgYkjNVaGMtpyZf4deBcUQHf7vgWUraVxY6gYiZhBYbPkFkLLWJzUUeVFdkKpVtatmXHX8kB76xgfmTpVZWbVWdq1rneaAY6a8RtbY"
  },
  "deployment": {
    "airnodeAddressShort": "a30ca71",
    "cloudProvider": "aws",
    "region": "us-east-1",
    "stage": "starter-example",
    "nodeVersion": "0.2.2"
  },
  "api": {
    "heartbeatId": "74dc44a1ee65",
    "httpGatewayUrl": "https://some.aws.api.gateway.url/v1/test"
  }
}
```
