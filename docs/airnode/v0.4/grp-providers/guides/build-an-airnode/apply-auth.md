---
title: Using Authorizers (optional)
---

<TitleSpan>Build an Airnode</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

An Airnode can authorize requester contract access to its underlying API using [Authorizers](../../../concepts/authorization.md). This method is on-chain and requires some blockchain knowledge by an API provider.

An [authorizer](../../../concepts/authorization.md) is a contract which typically checks for a single condition ("has the requester made their monthly payment", "is this `requesterAddress` whitelisted", etc.). Authorizers can be combined to enforce more complex policies. If any of the authorizers in the list gives access, the request will considered to be authorized. From a logical standpoint, the authorization outcomes get **OR**ed.

::: tip Alternative: Relayed Meta Data

As an alternative to authorizers, an API provider can use [Relayed Meta Data](./api-security.md#relayed-meta-data-security-schemes) to authenticate a request. This approach is off-chain and requires no blockchain knowledge by the API provider. Note that it is possible to use both authorizers and relayed meta data together.

:::

When you deploy your Airnode a receipt file is generated which contains the Airnode's `airnodeAddress`. Sponsors (via their sponsored requesters) use `airnodeAddress` and an `endpointId` to make requests to your Airnode's endpoints. However, you probably do not want to serve them publicly.

- Only serve your own [requester contracts](../../../grp-developers/requesters-sponsors.md).
- Only serve sponsors who have made a subscription payment.
- Only serve sponsors who have gone through KYC.

You can use different authorizers contracts for your Airnode deployment per chain by declaring them in the `config.json` file under `chains[n].authorizers`. Add a list of authorizer contracts addresses for each chain. If the `chains[n].authorizers` array is left empty then all requests will be accepted by the Airnode but still could be filtered by the second method of authorization, [relay security schemes](./apply-auth.md#relay-security-schemes).

```json
{
 ...
 "chains":[
    {
      "id": "1",
      ...
      "authorizers": [  // Requests must satisfy at least one contract
        "0xeabb...C123",
        "0xCE5e...1abc"
      ]
    },
    {
      "id": "2",
      ...
      "authorizers": [], // All requests will be processed
    },
    {
      "id": "3",
      ...
      "authorizers": [   // Requests must satisfy one contract
        "0xeabb...C123"
      ]
    },
   ]
 }
}
```

The authorizers you use will authorize all requests regardless of which endpoint is called. Endpoints are declared in the `ois.endpoints` field of the `config.json` file. To further filter by a particular endpoint you must use an authorizer like RequesterAuthorizerWithAirnode.

## RequesterAuthorizerWithAirnode

A common use case for an authorizer is the [RequesterAuthorizerWithAirnode](../../../concepts/authorization.md#requesterauthorizerwithairnode) authorizer contract developed for Airnode operators to use right out-of-the-box. It allows the whitelisting of requester contracts (with or without expiration timestamps) on a per endpoint basis. This is the most common use case and may in fact satisfy the needs of many Airnodes. You can find the contract address of this authorizer in the [Airnode Contract Addresses](../../../reference/airnode-addresses.md) doc.

To use the RequesterAuthorizerWithAirnode authorizer:

1. Add the authorizer contract address to the `chains[n].authorizers[]` array.
2. After your Airnode is deployed, call the Admin CLI command [set-whitelist-expiration](../../../reference/packages/admin-cli.md#set-whitelist-expiration) to add the desired requester contract addresses to the whitelist maintained by RequesterAuthorizerWithAirnode.

Once implemented, only requester contract addresses you have added to RequesterAuthorizerWithAirnode will have access to your Airnode.
