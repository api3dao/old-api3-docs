---
title: Reserved parameters
---

<TitleSpan>Specifications</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/> <TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

A requester can pass request parameters either by referencing a [template](../../concepts/template.md) that contains them, or as an argument of the request-making methods of [Airnode.sol](../../concepts/#airnoderrp-sol). In either case, these parameters are encoded in a `bytes`-type variable using [Airnode ABI](airnode-abi-specifications.md). There are two types of parameters:

1. [Endpoint parameters](ois.md#_5-5-parameters) are mapped to API operation parameters.
2. [Reserved parameters](ois.md#_5-4-reservedparameters) signal the provider to perform a specific operation while fulfilling the request. Reserved parameter names start with `_`.

## `_type`

Can be `int256`, `bool`, or `bytes32`. Signifies what Solidity type the API response will be typecast to before fulfillment. See the [conversion behavior docs](https://github.com/api3dao/airnode/tree/v0.2/packages/airnode-adapter#conversion-behaviour) for details.

## `_path`

Assuming that the API response will be a JSON object, defines the field to be used to fulfill the request using dot notation. For example, if the API returns

```
{
  "field1": {
    "fieldA": [
      "valueA1",
      "valueA2"
    ],
    "fieldB: "valueB"
  },
  "field2": {
    "fieldZ": "valueZ"
  }
}
```

and `_path` is `field1.fieldA.1`, the response will be `valueA2`.

If the response is a literal value (i.e., not a JSON object) and `_path` is not provided, Airnode will use the literal value to fulfill the request.

## `_times`

If `_type` is `int256` and a `_times` parameter is provided, Airnode multiplies the value returned by the API with the `_times` parameter before fulfilling the request. For example, if the API returns:

```
{
  "data": "1.238",
  "apiVersion": "1.0.4"
}
```

and the reserved parameters are

```
_type: int256
_path: data
_times: 100
```

the request will be fulfilled with the value `123`. Note that the number gets multiplied by `100`, and then gets floored.

## `_relay_metadata`

By setting this reserved parameter to a specific version string then Airnode will attach its metadata as request parameters before performing the API call.

For example, `v1` will add the following request parameters with their corresponding values:

```
_airnode_airnode_id: '0x19255a4ec31e89cea54d1f125db7536e874ab4a96b4d4f6438668b6bb10a6adb',
_airnode_requester_address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
_airnode_sponsor_wallet: '0x1c5b7e13fe3977a384397b17b060Ec96Ea322dEc',
_airnode_endpoint_id: '0xeddc421714e1b46ef350e8ecf380bd0b38a40ce1a534e7ecdf4db7dbc9319353',
_airnode_request_id: '0xd1984b7f40c4b5484b756360f56a41cb7ee164d8acd0e0f18f7a0bbf5a353e65',
_airnode_chain_id: '31337',
_airnode_chain_type: 'evm',
_airnode_airnode_rrp: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
```

Available values: `v1`.

Learn more about `_relay_meta_data` in the _Concepts and Definitions_ section [Authorization](../../concepts/authorization.md) doc.
