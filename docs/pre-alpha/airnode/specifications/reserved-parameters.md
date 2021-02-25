---
title: Reserved parameters
---

# {{$frontmatter.title}}

[[TOC]]

<Version selectedVersion="pre-alpha" />

<div class="toc-label">Table of Contents</div>

A requester can pass request parameters either by referencing a [template](../../protocols/request-response/template.md) that contains them, or as an argument of the request-making methods of [Airnode.sol](../../protocols/request-response/general-structure.md#airnodesol).
In either case, these parameters are encoded in a `bytes`-type variable using [Airnode ABI](airnode-abi-specifications.md).
There are two types of parameters:

1. [Endpoint parameters](https://github.com/api3dao/api3-docs/blob/master/airnode/ois.md#55-parameters) mapped to API operation parameters
1. [Reserved parameters](https://github.com/api3dao/api3-docs/blob/master/airnode/ois.md#54-reservedparameters)

Reserved parameters signal to the provider to perform a specific operation while fulfilling the request.
Reserved parameter names start with `_`.

## `_type`

Can be `int256`, `bool`, or `bytes32`.
Signifies what Solidity type the API response will be typecast to before fulfillment.
See the [conversion behavior docs](https://github.com/api3dao/airnode/tree/master/packages/adapter#conversion-behaviour) for details.

## `_path`

Assuming that the API response will be a JSON object, defines the field to be used to fulfill the request using dot notation.
For example, if the API returns
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

If `_type` is `int256` and a `_times` parameter is provided, Airnode multiplies the value returned by the API with the `_times` parameter before fulfilling the request.
For example, if the API returns:
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
the request will be fulfilled with the value `123`.
Note that the number gets multiplied by `100`, and then gets floored.
