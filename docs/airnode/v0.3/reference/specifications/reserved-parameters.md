---
title: Reserved parameters
---

<TitleSpan>Specifications</TitleSpan>

# {{$frontmatter.title}}

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

A requester can pass request parameters either by referencing a
[template](../../concepts/template.md) that contains them, or as an argument of
the request-making methods of [Airnode.sol](../../concepts/#airnoderrp-sol). In
either case, these parameters are encoded using the
[Airnode ABI](airnode-abi-specifications.md). There are two types of parameters:

1. [Endpoint parameters](ois.md#_5-5-parameters) - endpoint parameters are
   mapped to API operation parameters
2. [Reserved parameters](ois.md#_5-4-reservedparameters) - reserved parameters
   signal to the provider to perform a specific operation while fulfilling the
   request. Reserved parameter names start with `_`.

## `_type`

Signifies what Solidity type the API response will be encoded to before
fulfillment.

We support most common
[solidity types](https://docs.soliditylang.org/en/latest/abi-spec.html#types),
but there a few less popular we do not support

- Custom bits integer types - e.g. `uint32` or `uint8`
- Fixed point decimal numbers - e.g. `fixed128x18` or `ufixed128x18`
- Custom fixed size bytes - e.g. `bytes4`
- Tuples - e.g. `(int256, string)`

On top of solidity types, we support a few "artificial" types, that we created
for special purpose that would otherwise be hard or impossible to represent

- [`string32`](reserved-parameters.md#string32)

### Conversion behavior

Before the API response value is encoded for on chain use, it is parsed and
converted. The conversion behaviors for any given type is explained in depth in
the [adapter package docs](../packages/adapter.md#conversion-and-encoding).

### Supported primitive values

We support the following primitive values

- `int256`
- `uint256`
- `bool`
- `bytes32`
- `address`
- `bytes`
- `string`

### Arrays

Apart from the primitives defined above, you are free to use arrays of any of
the base types. Multidimensional arrays are supported as well. Solidity allows
you to define fixed size arrays, which are more gas efficient to encode and you
can use those as well.

Supported examples

- `int256[]` - regular integer array
- `uint256[8]` - unsigned integer array with 8 elements
- `int256[][]` - 2 dimensional integer array
- `string[2][][3]` - 3 dimensional string array, where first dimension contains
  3 elements, second unboundedly many and last dimension only 2. Notice, that
  this
  [definition is read backwards](https://ethereum.stackexchange.com/questions/64331/why-is-multidimensional-array-declaration-order-reversed)
  compared to C-style languages.

### string32

The `string32` is an artificial type that is not supported by solidity. It is
instead encoded to `bytes32` and provides a cheaper alternative to the regular
`string` type with less than 32 characters.

:::warning Beware the limitations

While using `string32` is more efficient, decoding the original string from
`bytes32` on chain is both difficult and expensive.

Also bear in mind that this type is able to encode only strings shorter than 32
characters. If the value is longer, it will be trimmed and only first 31
characters will be encoded.

:::

## `_path`

Assuming that the API response will be a JSON object, defines the field to be
used to fulfill the request using dot notation. For example, if the API returns

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

If the response is a literal value (i.e., not a JSON object) and `_path` is not
provided, Airnode will use the literal value to fulfill the request.

:::warning Beware the separator

Make sure the keys in the path of the API response do not contain `.`, because
it will be incorrectly considered as a separator.

```
{
  "strage.key": "123"
}
```

The `_path` defined as `strange.key` will not work.

:::

## `_times`

If `_type` is `int256` and a `_times` parameter is provided, Airnode multiplies
the value returned by the API with the `_times` parameter before fulfilling the
request. For example, if the API returns:

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

the request will be fulfilled with the value `123`. Note that the number gets
multiplied by `100`, and then gets floored. This is because the result of the
multiplication is [cast](../packages/adapter.md) to `int256` afterwards.

The `_times` parameter also works in conjunction with arrays and
multidimensional arrays. All elements of the API response array will be
multiplied before they are encoded.

## `_relay_metadata`

By setting this reserved parameter to a specific version string then Airnode
will attach its metadata as request parameters before performing the API call.

For example, `v1` will add the following request parameters with their
corresponding values:

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

Learn more about `_relay_meta_data` in the _Concepts and Definitions_ section
[Authorization](../../concepts/authorization.md) doc.
