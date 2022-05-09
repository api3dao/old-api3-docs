---
title: Applying Authorization (optional)
---

<TitleSpan>Build an Airnode</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>
<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

An Airnode can authorize requester contract access to its underlying API using two methods.

- Authorizers: Using authorizer contracts.
- Relay Metadata: Using Airnode metadata known as (`_relay_metadata`).

This guide explains how to use _authorizers_ and _relay metadata_. See the _Concepts and Definitions_ section [Authorization](../../../concepts/authorization.md) doc for details on these two authorization methods. You can use one or the other, or both at the same time.

Complete the following before applying authorizers or integrating relay metadata.

- [API Integration](api-integration.md)
- [Configuring Airnode](configuring-airnode.md)

When you deployed your Airnode a receipt file was generated. In it is the Airnode's `airnodeAddress`. Sponsors (via their sponsored requesters) use `airnodeAddress` and an `endpointId` to make requests to your Airnode's endpoints. However, you probably do not want to serve them publicly.

- Only serve your own [requester contracts](../../../grp-developers/requesters-sponsors.md).
- Only serve sponsors who have made a subscription payment.
- Only serve sponsors who have gone through KYC.

## Authorizers

An [authorizer](../../../concepts/authorization.md) is a contract which typically checks for a single condition ("has the requester made their monthly payment", "is this `requesterAddress` whitelisted", etc.). Authorizers can be combined to enforce more complex policies. If any of the authorizers in the list gives access, the request will considered to be authorized. From a logical standpoint, the authorization outcomes get **OR**ed.

You can use different authorizers contracts for your Airnode deployment per chain by declaring them in the config.json file under `chains[n].authorizers`. Add a list of authorizer contracts addresses for each chain. If the `chains[n].authorizers` array is left empty then all requests will be accepted by the Airnode but still could be filtered by the second method of authorization, [relay metadata](./apply-auth.md#relay-metadata).

```json
{
 ...
 chains:[
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

The authorizers you use will authorize all requests regardless of which endpoint is called. Endpoints are declared in the `ois.endpoints` field of the `config.json` file. To further filter by a particular endpoint you must use an authorizer like RequesterAuthorizerWithAirnode or use [relay metadata](../../../concepts/authorization.md#relay-metadata).

### RequesterAuthorizerWithAirnode

A common use case for an authorizer is the [RequesterAuthorizerWithAirnode](../../../concepts/authorization.md#requesterauthorizerwithairnode) authorizer contract developed for Airnode operators to use right out-of-the-box. It allows the whitelisting of requester contracts (with or without expiration timestamps) on a per endpoint basis. This is the most common use case and may in fact satisfy the needs of many Airnodes. You can find the contract address of this authorizer in the [Airnode Contract Addresses](../../../reference/airnode-addresses.md) doc.

To use the RequesterAuthorizerWithAirnode authorizer:

1. Add the authorizer contract address to the `chains[n].authorizers[]` array.
2. After your Airnode is deployed, call the Admin CLI command [`set-whitelist-expiration`](../../../reference/packages/admin-cli-commands.md#set-whitelist-expiration) to add the desired requester contract addresses to the whitelist maintained by RequesterAuthorizerWithAirnode.

Once implemented, only requester contract addresses you have added to RequesterAuthorizerWithAirnode will have access to your Airnode.

## Relay MetaData

You can use Airnode's [relay metadata](../../../concepts/authorization.md#relay-metadata) in an API endpoint to authorize requests with or without authorizers. Simple setup each endpoint to receive the metadata.

In the OIS object of the `config.json` file set a reserved parameter named `_relay_metadata` to have a value of `v1`.

```json
"reservedParameters": [
  {
    "name": "_relay_metadata",
    "default": "v1"
  },
  ...
],
```

The metadata will be sent to the endpoint in the query string for GET and in the request body for POST. Use the metadata as required to filter inbound requests.

```sh
_airnode_airnode_id: '0x19255a4ec31e89cea54d1f125db7536e874ab4a96b4d4f6438668b6bb10a6adb',
_airnode_requester_address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
_airnode_sponsor_wallet: '0x1c5b7e13fe3977a384397b17b060Ec96Ea322dEc',
_airnode_endpoint_id: '0xeddc421714e1b46ef350e8ecf380bd0b38a40ce1a534e7ecdf4db7dbc9319353',
_airnode_request_id: '0xd1984b7f40c4b5484b756360f56a41cb7ee164d8acd0e0f18f7a0bbf5a353e65',
_airnode_chain_id: '31337',
_airnode_chain_type: 'evm',
_airnode_airnode_rrp: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
```
