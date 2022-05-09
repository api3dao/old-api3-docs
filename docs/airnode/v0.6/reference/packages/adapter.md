---
title: 适配器
---

<TitleSpan>软件包</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,4]" />

[Airnode-adapter](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-adapter) 软件包有多重用途。 它用于从[预言机集成规范（OIS）)](/ois/v1.0.0/)中建立请求，执行它们，解析响应，还可以转换和编码它们以用于链上。

它是Airnode的内部不可或缺的组成部分，但也可以作为一个独立的API。

## 安装

您可以在项目中将 `@api3/airnode-adapter` 添加到 `package.json` 文件 。

```sh
npm install --save @api3/airnode-adapter
# or by
yarn add @api3/airnode-adapter
```

你不用直接使用适配器软件包。 然而，仍然存在着这种情况，您可能想要 使用 API 来检查您的转换或编码行为，可以安装这个软件包并验证你的假设。

## 转换

虽然适配器软件包有许多用途，但其中许多可以作为实现细节来对待。 另一方面，在根据目标转换响应值并在链上进行响应交易时，有几个重要的行为需要注意。

总之，响应周期由多个步骤组成。

1. API成功调用，Airnode 收到响应值。
2. 要转换的值是从 OIS 对象中使用 [\_path](/ois/v1.0.0/reserved-parameters.md#path) 从响应中提取的。
3. 这个提取的值被转换为目标类型。 转换由`castValue(value, type)` 函数在其内部进行。
4. 转换后的值被编码为基于OIS对象中的[\_type](/ois/v1.0.0/reserved-parameters.md#type) 的本地 solidity 类型。 编码是由`encodeValue(value, type)` 函数内部执行的。

<!-- TODO: Create a page about how to read Airnode logs (probably the troubleshooting guide) and link it-->

如果上面的任何步骤失败，将出现错误。 这将导致指定的 API 请求失败，错误原因可以在日志中找到。

本节的其余部分包含所有支持 类型的转换逻辑。

### `int256` or `uint256`

转换下面示例中的任意一个值会导致错误：

```ts
const ERROR_VALUES = [
  null,
  undefined,
  Infinity,
  NaN,
  '', // empty string
  'randomstring',
  [], // arrays of any kind
  {}, // objects of any kind
];
```

有几个特殊字符串和布尔值可转换为 `int256` 或 `uint256`：

```ts
const SPECIAL_INT_VALUES = [false, 'false', true, 'true'];

const values = SPECIAL_INT_VALUES.map((v) => adapter.castValue(v, 'int256'));
console.log(values);
// [0, 0, 1, 1];
```

数字字符串和数字将尝试转换为 [BigNumbers](https://mikemcl.github.io/bignumber.js/). 该值还将乘以[\_times](/ois/v1.0.0/reserved-parameters.md#times) 参数的值（如果存在）。

```ts
const VALID_INT_VALUES = ['123.456', 7777];

const values = VALID_INT_VALUES.map((v) => adapter.castValue(v, 'uint256'));
console.log(values);
// [new BigNumber(123.456), new BigNumber(7777)];
```

`int256` 和`uint256` 的转换也是类似的过程- 这意味着 `-123` 也可以被转换成`uint256`。 然而，在编码时会出现错误。

:::warning Flooring

请注意，任何浮点数都将是 **浮动的**。 这是必要的，因为浮点数在solidity中是无效的。 为了减少精度丢失，您可以使用 [`_times`](/ois/v1.0.0/reserved-parameters.md#times)，这些参数足够大。

例如，如果API响应为美元货币， 您可能想要使用`_times: "100"` 来将该值转换为美分。

:::

### `bool`

转换示例中的值都被视为 `fals`。

```ts
const FALSE_BOOLEAN_VALUES = [0, '0', false, 'false', undefined, null];

const values = FALSE_BOOLEAN_VALUES.map((v) => {
  return adapter.castValue(v, 'bool');
});

console.log(values);
// [false, false, false, false, false, false];
```

所有其他值都被转换为 `true`。

### `bytes32`

`bytes32` 不会发生任何转换--该值被期望是一个有效的十六进制字符串，代表编码的32字节的值。 这意味着，编码**必须**在API端实现。 如果你想把编码委托给Airnode，请看[`string32`](adapter.md#string32-encoded-to-bytes32-on-chain)的文档。

例如， API如果想要编码下面的字符串 `simple string` ，其长度为13位。 其编码是
<code style="overflow-wrap: break-word;">0x73696d706c652073472696e670000000000000000000000000000000000000000000000000000</code>
这个值应该作为对 Airnode 请求的响应，与 `0x` 前缀一道发送。

你可以使用 [ethers](https://docs.ethers.io/v5/) 在 API 编码这些课程

```js
const value = 'simple string';
const encoded = ethers.utils.formatBytes32String(value);
console.log(encoded); // 0x73696d706c6520737472696e6700000000000000000000000000000000000000
```

### `address`

对`address`没有发生任何转换--该值将是一个代表有效地址的字符串。 有效例子有：

- <code style="overflow-wrap: break-word;">0x0765baA22F6D4A53847D63B056DC79400b9A592a</code> - 对地址的[EIP-55 混合大小写校验](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-55.md)。
- <code style="overflow-wrap: break-word;">0x0765baa22f6d4a53847d63b056dc79400b9a592a</code> - 所有小写地址。

### `bytes`

`bytes` 没有任何转换--该值将是代表编码值的有效十六进制字符串。 这意味着，编码**必须**在API端实现。 如果您想要发送一个字符串，请参阅 [`string`](adapter.md#string) 的文档。

例如， API如果想要编码下面的字符串 `this is an example string that is a bit longer`。 其编码是
<code style="overflow-wrap: break-word;">0x7468697320697320616e2065716d706c6520737472696e67207468617420694206c6f6e676572</code>。 这个值应该作为对 Airnode 请求的响应，与 `0x` 前缀一道发送。

你可以使用 [ethers](https://docs.ethers.io/v5/) 在 API 编码。

```js
const value = 'this is an example string that is a bit longer';
const encodedValue = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(value));
console.log(encodedValue); // 0x7468697320697320616e206578616d706c6520737472696e672074686174206973206120626974206c6f6e676572
```

### `string`

您可以传递任何值将其转换为字符串 - 但数组和对象除外，它们会提示错误。 所有其他的值将被转换为`string`，并在链上使用`string`类型进行编码。

```js
const values = [
  -1,
  0,
  777.89,
  null,
  'simple string',
  'this is an example string that is a bit longer',
];

// ["-1", "0", "777.89", "null", "simple string", "this is an example string that is a bit longer"]
const mappedValues = values.map((v) => {
  return adapter.castValue(v, 'string');
});
```

### `string32`

你可以传递任何值来将其转换为字符串--但数组和对象除外，它们会提示错误。

然而，有一个例外，如果字符变量包含超过31个字符，那么在转换过程中会被**裁剪**，只剩下前31个字符。

例如， API如果想要编码下面的字符串 `this is an example string that is a bit longer`，它有64位长。 它将首先被修剪为31个字符，字符串`this is an example string that` ，之后转换为<code style="overflow-wrap: break-word;">0x7468697320697320616e206578616d706c6520737472696e6720746861742000</code>。

你可以使用 [ethers](https://docs.ethers.io/v5/) 在 API 编码。

```js
const encoded =
  '0x7468697320697320616e206578616d706c6520737472696e6720746861742000';
const decoded = ethers.utils.parseBytes32String(encoded);
console.log(decoded); // "this is an example string that "
```

### 数组

数组的转换取决于原始类型。 数组（或嵌套数组）的所有值都将根据原始类型的规则进行转换。

例如：

- `int256[]` - 原型是 `int256`。 此数组的所有元素都遵循 [`int256`](adapter.md#int256-or-uint256) 规则。
- `string32[7][][5]` - 是一个多维数组，其中某些维度是 固定的，有些则不是固定的。 不过这并不重要，所有的元素都是根据[`string32`](adapter.md#string32-encoded-to-bytes32-on-chain)规则转换的。
