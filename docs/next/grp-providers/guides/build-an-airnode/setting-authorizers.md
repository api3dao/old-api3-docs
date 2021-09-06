---
title: Setting Authorizers
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Complete the following before settings authorizers.

- [API Integration](api-integration.md)
- [Configuring Airnode](configuring-airnode.md)
- [Deploying Airnode](deploying-airnode.md)
  
When you deployed your Airnode a receipt file was generated. In it is the `airnodeId`. Sponsors (via their sponsored requesters) use your `airnodeId` and an `endpointId` to make requests to your Airnode endpoints. However, you probably do not want to serve your Airnode endpoints publicly.

- Only serve your own [requester contracts](../../../grp-developers/requesters-sponsors.md)
- Only serve sponsors who have made a subscription payment
- Only serve sponsors who have gone through KYC

In this guide, we will explain how you can achieve this.

## `authorizers`

<Fix>Need to track down the EndpointStore.sol contract, it does not appear in the link below. Also who built/builds the Authorizer contract(s).</Fix>

[EndpointStore.sol](../../../reference/protocols/request-response/general-structure.md#endpointstore-sol) keeps a list of [authorizer](../../../reference/protocols/request-response/authorizer.md) addresses for each `airnodeId`–`endpointId` pair. An authorizer is a contract that Airnode calls to check if it should respond to a specific request. It can enforce any kind of authorization policy that one could implement as a contract.

## Deny all

A newly created Airnode defaults to **Deny All** for all its endpoints. The authorizers for all endpoints of an Airnode is an empty list. An empty authorizers list means that endpoint is not allowed to be used by anyone. Therefore, after deploying your Airnode, you must also set authorizers for your endpoints to allow access.

## Allow all

<Fix>This is commented out (AN-85) as the use of airnodeAdmin is no longer used. But what replaces this with the newer Authorizers? </Fix>

~~The simplest authorization policy is opening the endpoint to the public, so let us see how to do that first. Authorizers being set to `[0]` means that all requests made to it will be authorized (i.e., will be responded to by Airnode). Only the `airnodeAdmin` of a provider can update the authorizers of its endpoints. Therefore, you will need to make a transaction using the provider admin address (that you have set in `config.json` as `airnodeAdminForRecordCreation`) to [EndpointStore.sol](../../../reference/protocols/request-response/general-structure.md#endpointstore-sol). In JS (using ethers.js):~~


```js
airnode.connect(airnodeAdmin).updateEndpointAuthorizers(airnodeId, endpointId, [ethers.constants.AddressZero]);
```

~~You can also use [@api3/airnode-admin](https://github.com/api3dao/airnode/tree/pre-alpha/packages/admin#update-authorizers) to update endpoint authorizers.~~

```bash
npx @api3/airnode-admin update-authorizers \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --mnemonic "nature about salad..." \
  --airnodeId 0xe1e0dd... \
  --endpointId 0x260558... \
  --authorizersFilePath ./authorizers.json
```

~~After making this transaction, your Airnode will respond to all requests.
Note that being able to do this on-chain through `airnodeAdmin` allows you to update your authorization policies without interacting with your Airnode or having to redeploy it.~~

## Custom authorization policies

We have mentioned that authorizer contracts can implement any arbitrary authorization logic.
See [this example](https://github.com/api3dao/airnode/blob/pre-alpha/packages/protocol/contracts/authorizers/MinBalanceAuthorizer.sol) where Airnode only responds to requests if the wallet it will use to fulfill the request has a balance more than an amount set by the provider admin.

The authorizer list allows you to combine single-purpose authorizer contracts to form complex policies as described in the [docs](../../../reference/protocols/request-response/authorizer.md#authorizer-list).
If you would like to contribute to this set of authorizer contracts, please join the conversation in [this issue](https://github.com/api3dao/airnode/issues/38).

## Conclusion

The Airnode is completely set up. See [Calling an Airnode](../../../grp-developers/call-an-airnode.md) to learn how requests are made to it.
