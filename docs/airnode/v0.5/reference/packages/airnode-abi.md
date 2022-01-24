---
title: ABI
---

<TitleSpan>Packages</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,4]" />

The
[airnode-abi](https://github.com/api3dao/airnode/tree/v0.3/packages/airnode-abi)
package is a unique way to encode and decode parameters for use with Airnode.
Parameters are provided with encoding types, names and values. The types are
shortened and grouped with a version as the "header". The name/value pairs are
then grouped and encoded as the rest of the body.

An advantage of encoding parameters this way is that parameters can be decoded
natively using the language(s) of the specific blockchain. In the case of EVM
blockchains, this means that parameters can be encoded as well as decoded in
Solidity (or Vyper), without any additional requirements.

You can find additional documentation in
[Airnode ABI Specifications](../specifications/airnode-abi-specifications.md)
doc.

## Installation

You can install
[@api3/airnode-abi](https://www.npmjs.com/package/@api3/airnode-abi?activeTab=dependencies)
with either
[npm](https://docs.npmjs.com/getting-started/installing-node#install-npm--manage-npm-versions)
or [Yarn](https://yarnpkg.com/en/docs/install)

```sh
# npm
npm install --save @api3/airnode-abi

# Yarn
yarn add @api3/airnode-abi
```

## Usage

### `encode`

Accepts an array of objects with the following required keys:

1. `type` - The full list of accepted types can be found in the
   [Airnode ABI](../specifications/airnode-abi-specifications.md#type-encodings)
   specifications doc.

2. `name`

3. `value`

It is important to note that numeric values (`int256` and `uint256`) should be
submitted as **strings** in order to preserve precision.

```ts
import { encode } from '@api3/airnode-abi';

const parameters = [
  { type: 'string32', name: 'from', value: 'ETH' },
  { type: 'uint256', name: 'amount', value: '100000' },
];
const encodedData = encode(parameters);

console.log(encodedData);
// '0x...'
```

## `decode`

Returns an object where the keys are the "names" and the values are the "values"
from the initial encoding.

It is important to note that `int256` and `uint256` will be decoded back to
strings.

```ts
import { decode } from '@api3/airnode-abi';

const encodedData = '0x...';
const decoded = decode(encodedData);

console.log(decoded);
// { from: 'ETH', amount: ethers.BigNumber.from('100000') }
```
