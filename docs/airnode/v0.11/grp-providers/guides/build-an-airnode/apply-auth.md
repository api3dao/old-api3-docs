---
title: Using Authorizers (optional)
docSetName: Airnode v0.11
folder: API Providers > Build an Airnode
basePath: /airnode/v0.11
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

An Airnode can authorize smart contracts (know as requesters) access to its
endpoints using [Authorizers](../../../concepts/authorizers.md). This method is
on-chain and requires some blockchain knowledge by an API provider.

An [Authorizer](../../../concepts/authorizers.md) is a contract which typically
checks for a single condition ("has the requester made their monthly payment",
"is this `requesterAddress` whitelisted", etc.). Authorizers can be combined to
enforce more complex policies. If any of the authorizers in the list gives
access, the request will considered to be authorized. From a logical standpoint,
the authorization outcomes get *OR*ed.

::: tip Alternative: Relayed Meta Data

As an alternative to authorizers and authorizations, an API provider can use
[Relayed Meta Data](./api-security.md#relayed-meta-data-security-schemes) to
authenticate a request. This approach is off-chain and requires no blockchain
knowledge by the API provider. Note that it is possible to use authorizers,
authorizations, and relayed meta data together.

:::

When you deploy your Airnode a receipt file is generated which contains the
Airnode's `airnodeAddress`. Sponsors (via their sponsored requesters) use
`airnodeAddress` and an `endpointId` to make requests to your Airnode's
endpoints. However, rather than serve them publicly, you may want to:

- Only serve your own
  [requester contracts](../../../grp-developers/requesters-sponsors.md).
- Only serve sponsors who have made a subscription payment.
- Only serve sponsors who have gone through KYC.

The `chains[n].authorizers` object within `config.json` enables requests to be
authorized in a variety of ways and even across chains. Currently, the
authorizers include `requesterEndpointAuthorizers`,
`crossChainRequesterAuthorizers`, `requesterAuthorizersWithErc721`, and
`crossChainRequesterAuthorizersWithErc721`.

Note that when all `chains[n].authorizers` values are empty arrays, all requests
are authorized, but still can be filtered by using
[Relayed Meta Data Security Schemes](./api-security.md#relayed-meta-data-security-schemes).

Below are examples of how to use the authorizers.

```json
{
 ...
 "chains":[
    {                   Scheme type requesterEndpointAuthorizers lists
      "id": "1",        on-chain authorizer contract addresses
      ...               such as RequesterAuthorizerWithAirnode
      "authorizers": {  ⬇︎
        "requesterEndpointAuthorizers": [  // Requests must be authorized by
          "0xeabb...C123",                 // one of the authorizer contracts
          "0xCE5e...1abc"
        ],
        "crossChainRequesterAuthorizers": [],
        "requesterAuthorizersWithErc721": [],
        "crossChainRequesterAuthorizersWithErc721": []
      }
    },
    {
      "id": "2",
      ...
      "authorizers": { // All requests are authorized
        "requesterEndpointAuthorizers": [],
        "crossChainRequesterAuthorizers": [],
        "requesterAuthorizersWithErc721": [],
        "crossChainRequesterAuthorizersWithErc721": []
      },
    },
    {
      "id": "3",
      ...
      "authorizers": {
        "requesterEndpointAuthorizers": [  // Requests must be authorized by
          "0xeabb...C123"                  // a single authorizer contract
        ],                                 // OR an authorizer contract deployed
                                           // on a different chain (Ethereum mainnet)
        "crossChainRequesterAuthorizers": [
          {
            "requesterEndpointAuthorizers": ["0xCE5e...1abc"],
            "chainType": "evm",
            "chainId": "1",
            "contracts": {
              "AirnodeRrp": "0xa0AD...a1Bd"
            },
            "chainProvider": {
              "url": "https://mainnet.infura.io/..."
            }
          }
        ],
        "requesterAuthorizersWithErc721": [],
        "crossChainRequesterAuthorizersWithErc721": []
      }
    },
    {
      "id": "4",
      ...
      "authorizers": {
        "requesterEndpointAuthorizers": [],
        "crossChainRequesterAuthorizers": [],
        "requesterAuthorizersWithErc721": [
          {  // Requests are authorized by an NFT deposit on the same chain as the request
            "erc721s": ["0x00bDB2315678afecb367f032d93F642f64180a00"],
            "RequesterAuthorizerWithErc721": "0x999DB2315678afecb367f032d93F642f64180aa9"
          }
        ],
        "crossChainRequesterAuthorizersWithErc721": []
      }
    },
    {
      "id": "5",
      ...
      "authorizers": {
        "requesterEndpointAuthorizers": [],
        "crossChainRequesterAuthorizers": [],
        "requesterAuthorizersWithErc721": [],
        "crossChainRequesterAuthorizersWithErc721": [
          {  // Requests are authorized by an NFT deposit on Ethereum mainnet
            "erc721s": ["0x3FbDB2315678afecb367f032d93F642f64180aa6"],
            "chainType": "evm",
            "chainId": "1",
            "contracts": {
              "RequesterAuthorizerWithErc721": "0x6bbbb2315678afecb367f032d93F642f64180aa4"
            },
            "chainProvider": {
              "url": "http://127.0.0.2"
            }
          }
        ]
      }
    },
   ]
}
```

## RequesterAuthorizerWithAirnode

A common use case for an authorizer is the
[RequesterAuthorizerWithAirnode](../../../concepts/authorizers.md#requesterauthorizerwithairnode)
authorizer contract developed for Airnode operators to use right out-of-the-box.
It allows the whitelisting of requester contracts (with or without expiration
timestamps) on a per endpoint basis. Endpoints are declared in the
`ois.endpoints` field of the `config.json` file. This is the most common use
case and can be implemented with the following steps:

1. Add the RequesterAuthorizerWithAirnode
   [authorizer contract address](../../../reference/airnode-addresses.md#requesterauthorizerwithairnode)
   to the array `chains[n].authorizers.requesterEndpointAuthorizers`.
2. After your Airnode is deployed, call the Admin CLI command
   [set-whitelist-expiration](../../../reference/packages/admin-cli.md#set-whitelist-expiration)
   to add the desired requester contract addresses to the whitelist maintained
   by RequesterAuthorizerWithAirnode.

Once implemented, only requester contract addresses you have added to
RequesterAuthorizerWithAirnode will have access to your Airnode.
