---
title: receipt.json
---
<TitleSpan>Deployment Files</TitleSpan>
# {{$frontmatter.title}}

A `receipt.json` file is outputted after each deployment and contains non-sensitive information about the deployment.
The main use of a receipt file is to remove an Airnode deployment when no longer needed. Use the [docker
image](../../grp-providers/guides/docker/deployer-image.html#remove) to execute the remove command.

- `airnodeWallet`: describes the Airnode that was deployed
- `deployment`: where the Airnode was deployed to
- `api`: contains the details of the Airnode API (e.g.
  [heartbeat](../../grp-providers/guides/build-an-airnode/heartbeat.html) or [testing
  gateway](grp-providers/guides/build-an-airnode/http-gateway.html))

Example receipt:

```json
{
  "airnodeWallet": {
    "airnodeAdress": "0x23722bcdd23e559d7151db284f290fadde9f3cb725859d476ef1f16ab315355e",
    "airnodeAddressShort": "23722b",
    "xpub": "xpub661MyMwAqRbcFgefUsJa8UarHveV9dgvW6bKF13GaJFrw7AAcHCtMVuy3ZkFrTWdW2ji9TdjGHFbf3qk9vWvcNVPVZCtDGyASNs2V5SKcmf"
  },
  "deployment": {
    "airnodeAdressShort": "23722b",
    "cloudProvider": "aws",
    "region": "us-east-1",
    "stage": "starter-example",
    "nodeVersion": "0.1.0"
  },
  "api": {
    "heartbeatId": "74dc44a1ee65",
    "httpGatewayUrl": "https://some.aws.api.gateway.url/v1/test"
  }
}
```
