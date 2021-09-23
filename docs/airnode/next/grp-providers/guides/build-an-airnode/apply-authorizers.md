---
title: Applying Authorizers
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Complete the following before applying authorizers.

- [API Integration](api-integration.md)
- [Configuring Airnode](configuring-airnode.md)
- [Deploying Airnode](deploying-airnode.md)
  
When you deployed your Airnode a receipt file was generated. In it is the Airnode's `airnodeAddress`. Sponsors (via their sponsored requesters) use `airnodeAddress` and an `endpointId` to make requests to your Airnode's endpoints. However, you probably do not want to serve them publicly.

- Only serve your own [requester contracts](../../../grp-developers/requesters-sponsors.md).
- Only serve sponsors who have made a subscription payment.
- Only serve sponsors who have gone through KYC.

This guide explains how to do this with the use of authorizers.

## Authorizers

An [authorizer](../../../concepts/authorizer.md) is a contract which typically checks for a single condition ("has the requester made their monthly payment", "is this `requesterAddress` whitelisted", etc.). Authorizers can be combined to enforce more complex policies. If any of the authorizers in the list gives access, the request will considered to be authorized. From a logical standpoint, the authorization outcomes get **OR**ed.

You can apply different authorizers contracts for your Airnode deployment per chain. Do so in the config.json file under `chains[n].authorizers`. Add a list of authorizer contracts addresses for each chain.

```json
{
 ...
 chains:[
    {
      "id": "1",
      ...
      "authorizers": [
        "0xeabb...C123",
        "0xCE5e...1abc"
      ]
    },
    {
      "id": "3",
      ...
      "authorizers": [
        "0xeabb...C123"
      ]
    },
   ]
 } 
}
```

<Fix>Need to track down the EndpointStore.sol contract, it does not appear in the link below. Also who built/builds the Authorizer contract(s).</Fix>

<!-- markdown-link-check-disable-next-line -->
[EndpointStore.sol](../../../reference/concepts/general-structure.md#endpointstore-sol) keeps a list of [authorizer](../../../concepts/authorizer.md) addresses for each `airnode`–`endpointId` pair. An authorizer is a contract that Airnode calls to check if it should respond to a specific request. It can enforce any kind of authorization policy that one could implement as a contract.

## Deny all

A newly created Airnode defaults to **Deny All** for all its endpoints. The authorizers for all endpoints of an Airnode is an empty list. An empty authorizers list means that endpoint is not allowed to be used by anyone. Therefore, after deploying your Airnode, you must also set authorizers for your endpoints to allow access.

## Allow all

<Fix>This is commented out (AN-85) as the use of airnodeAdmin is no longer used. But what replaces this with the newer Authorizers? </Fix>

<!-- markdown-link-check-disable-next-line -->
~~The simplest authorization policy is opening the endpoint to the public, so let us see how to do that first. Authorizers being set to `[0]` means that all requests made to it will be authorized (i.e., will be responded to by Airnode). Only the `airnodeAdmin` of a provider can update the authorizers of its endpoints. Therefore, you will need to make a transaction using the provider admin address (that you have set in `config.json` as `airnodeAdminForRecordCreation`) to [EndpointStore.sol](../../../reference/concepts/general-structure.md#endpointstore-sol). In JS (using ethers.js):~~


```js
airnode.connect(airnodeAdmin).updateEndpointAuthorizers(airnodeAddress, endpointId, [ethers.constants.AddressZero]);
```

~~You can also use [@api3/airnode-admin](https://github.com/api3dao/airnode/tree/pre-alpha/packages/admin#update-authorizers) to update endpoint authorizers.~~

```bash
npx @api3/airnode-admin update-authorizers \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --mnemonic "nature about salad..." \
  --airnode 0xe1e0dd... \
  --endpointId 0x260558... \
  --authorizersFilePath ./authorizers.json
```

~~After making this transaction, your Airnode will respond to all requests.
Note that being able to do this on-chain through `airnodeAdmin` allows you to update your authorization policies without interacting with your Airnode or having to redeploy it.~~

## Custom authorization policies

We have mentioned that authorizer contracts can implement any arbitrary authorization logic.
See [this example](https://github.com/api3dao/airnode/blob/pre-alpha/packages/protocol/contracts/authorizers/MinBalanceAuthorizer.sol) where Airnode only responds to requests if the wallet it will use to fulfill the request has a balance more than an amount set by the provider admin.

The authorizer list allows you to combine single-purpose authorizer contracts to form complex policies as described in the [docs](../../../concepts/authorizer.md#authorizer-list).
If you would like to contribute to this set of authorizer contracts, please join the conversation in [this issue](https://github.com/api3dao/airnode/issues/38).

## Conclusion

The Airnode is completely set up. See [Calling an Airnode](../../../grp-developers/call-an-airnode.md) to learn how requests are made to it.
