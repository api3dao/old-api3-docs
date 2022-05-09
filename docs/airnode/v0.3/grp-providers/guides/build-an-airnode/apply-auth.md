---
title: Applying Authorization (optional)
---

<TitleSpan>Build an Airnode</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

An Airnode can authorize requester contract access to its underlying API using two methods.

- [Authorizers](apply-auth.md#authorizers)
- [Relay security schemes](apply-auth.md#relay-security-schemes)

This guide focuses on the usage of these concepts. See the [Authorization section](../../../concepts/authorization.md) for details on these two authorization methods. You can use one or the other, or both at the same time.

When you deployed your Airnode a receipt file was generated. In it is the Airnode's `airnodeAddress`. Sponsors (via their sponsored requesters) use `airnodeAddress` and an `endpointId` to make requests to your Airnode's endpoints. However, you probably do not want to serve them publicly.

- Only serve your own [requester contracts](../../../grp-developers/requesters-sponsors.md).
- Only serve sponsors who have made a subscription payment.
- Only serve sponsors who have gone through KYC.

## Authorizers

An [authorizer](../../../concepts/authorization.md) is a contract which typically checks for a single condition ("has the requester made their monthly payment", "is this `requesterAddress` whitelisted", etc.). Authorizers can be combined to enforce more complex policies. If any of the authorizers in the list gives access, the request will considered to be authorized. From a logical standpoint, the authorization outcomes get **OR**ed.

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

### RequesterAuthorizerWithAirnode

A common use case for an authorizer is the [RequesterAuthorizerWithAirnode](../../../concepts/authorization.md#requesterauthorizerwithairnode) authorizer contract developed for Airnode operators to use right out-of-the-box. It allows the whitelisting of requester contracts (with or without expiration timestamps) on a per endpoint basis. This is the most common use case and may in fact satisfy the needs of many Airnodes. You can find the contract address of this authorizer in the [Airnode Contract Addresses](../../../reference/airnode-addresses.md) doc.

To use the RequesterAuthorizerWithAirnode authorizer:

1. Add the authorizer contract address to the `chains[n].authorizers[]` array.
2. After your Airnode is deployed, call the Admin CLI command [`set-whitelist-expiration`](../../../reference/packages/admin-cli.md#set-whitelist-expiration) to add the desired requester contract addresses to the whitelist maintained by RequesterAuthorizerWithAirnode.

Once implemented, only requester contract addresses you have added to RequesterAuthorizerWithAirnode will have access to your Airnode.

## Relay Security Schemes

Define the relay security schemes you want to use for your API. See the [Supported Security Schemes](./api-security.md#supported-security-schemes) section of the API Security doc for more details about _relay security schemes_.

In the following example Airnode will relay the requester address (named `requesterAddress`) to the API operation. The value of `requesterAddress` will either be in the body for a POST request or query string for a GET request.

```json
{
  "ois": [
    {
      "title": "My OIS title",
      "apiSpecifications": {
        "components": {
          "securitySchemes": {
            "forwardsRequesterAddress": {
              "in": "query",
              "type": "relayRequesterAddress",
              "name": "requesterAddress"
            }
          }
        },
        "security": {
          "forwardsRequesterAddress": []
        }
      }
    }
  ]
}
```
