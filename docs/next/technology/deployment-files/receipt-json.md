---
title: receipt.json
---

# {{$frontmatter.title}}

<TocHeader />
[[TOC]]

A `receipt.json` file is outputted after deployment that has (non-sensitive) information about the deployments.
The main use of a receipt file is to detect deployments that are now obsolete and need to be removed.
For example, the user may have deployed their Airnode on cloud providers A, B and C.
In the next deployment, they decide to only deploy on cloud provider A and B.
After deployment (which updates the previous deployments on A and B), the deployer needs to refer to the previous deployment's receipt to be able to tell that it also needs to remove the deployment on cloud provider C.

Below is an example receipt:
```json
{
  "providerId": "0x23722bcdd23e559d7151db284f290fadde9f3cb725859d476ef1f16ab315355e",
  "providerIdShort": "23722bc",
  "xpub": "xpub661MyMwAqRbcFgefUsJa8UarHveV9dgvW6bKF13GaJFrw7AAcHCtMVuy3ZkFrTWdW2ji9TdjGHFbf3qk9vWvcNVPVZCtDGyASNs2V5SKcmf",
  "masterWalletAddress": "0x0B8C5Bb520C4807da256A2a2e523d898ccdE6722",
  "deployments": [
    {
      "configId": "bd877060-edc1-4ba9-ad75-c2d3c47b260e",
      "chainIds": [
        "1"
      ],
      "cloudProvider": "aws",
      "region": "us-east-1",
      "stage": "starter-example"
    },
    {
      "configId": "981d57c2-a004-4526-99da-1b04608fb463",
      "chainIds": [
        "3",
        "4"
      ],
      "cloudProvider": "aws",
      "region": "us-east-1",
      "stage": "starter-example"
    }
  ]
}
```
