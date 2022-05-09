---
title: ABI
---

<TitleSpan>软件包</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,4]" />

[airnode-abi](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-abi) 软件包是用于使用 Airnode编码和解码参数的唯一方式。 参数包含编码类型、名称和值。 这些类型被缩短，并以一个版本作为 "头部 "进行分组。 然后，这些名/值配对被分组，并作为正文的其余部分进行编码。

这种编码参数的一个优点是，可以使用特定区块链中的语言来解码参数 。 在 EVM区块链中， 这意味着参数可以在 Solidity (or Vyper) 中编码和解码，而不需要任何额外的要求。

您可以在 [Airnode ABI 规格](../specifications/airnode-abi-specifications.md) 文档中找到其他文档。

## 安装

您可以安装 [@api3/airnode-abi](https://www.npmjs.com/package/@api3/airnode-abi?activeTab=dependencies)，通过 [npm](https://docs.npmjs.com/getting-started/installing-node#install-npm--manage-npm-versions) 或 [Yarn](https://yarnpkg.com/en/docs/install)。

```sh
# npm
npm install --save @api3/airnode-abi

# Yarn
yarn add @api3/airnode-abi
```

## 用法

### `编码`

接受一个包含以下所需密钥的对象数组：

1. `type`- 可以在[Airnode ABI](../specifications/airnode-abi-specifications.md#type-encodings) 规格文件中找到完整的可接受类型列表。

2. `name`

3. `值`

必须注意的是，数值(`int256` 和`uint256`) 应以 **strings** 形式提交，以保持精度。

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

## `解码`

从初始编码返回键值为“name”，而值为“value” 的对象。

需要注意的是，`int256` 和`uint256` 将解码回到 字符串。

```ts
import { decode } from '@api3/airnode-abi';

const encodedData = '0x...';
const decoded = decode(encodedData);

console.log(decoded);
// { from: 'ETH', amount: ethers.BigNumber.from('100000') }
```
