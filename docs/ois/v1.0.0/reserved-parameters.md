---
title: 保留参数
---

<TitleSpan>OIS</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,4]" />

保留参数是OIS对象的一部分，是`endpoints`字段（Airnode 终端节点）的一部分，值得深入解释。 它们是OIS对象中Airnode定义的节点的一部分，但不映射到操作参数（API参数）。 它们被Airnode用于特殊目的。

请求者可以通过引用包含参数的[模板](/airnode/v0.5/concepts/template.md)来传递请求参数，或者作为[AirnodeRrp.sol](/airnode/v0.5/concepts/#airnoderrp-sol)的请求制作方法的一个参数。 在这两种情况下，这些参数都会使用[AirnodeRrp ABI](/airnode/v0.5/reference/specifications/airnode-abi-specifications.md)进行编码。 作为[OIS](/ois/v1.0.0/)对象的一部分，有两种类型的参数:

1. [节点参数](/ois/v1.0.0/ois.md#_5-5-parameters) - Airnode节点参数被映射到API操作参数。
2. [保留参数](/ois/v1.0.0/ois.md#_5-4-reservedparameters) - 保留参数在完成请求之前对响应进行特定的操作。 保留的参数名称以`_`开头。

## `_type`

标志着 API 响应在执行前将被编码为何种 Solidity 类型。

对大多数常见的 [Solidity 类型](https://docs.soliditylang.org/en/latest/abi-spec.html#types)提供支持，但不支持以下类型。

- 自定义位的整数类型--如`uint32`或`uint8`
- 固定点十进制数字--如`fixed128x18`或`ufixed128x18`
- 自定义固定大小的字节--例如`byte4`
- 元组--例如`(int256, string)`

在支持的实体类型的基础上，还支持一些为特殊目的而创建的 "人工" 类型，否则就很难或无法表示。

- [`string32`](reserved-parameters.md#string32-encoded-to-bytes32-on-chain)
- [`timestamp`](reserved-parameters.md#timestamp-encoded-to-uint256-on-chain)

你也可以为一个单一的API调用编码多个值--但这影响到所有的保留参数，并在下面的[编码多个值](./reserved-parameters.md#encoding-multiple-values)部分进行解释。

### 转换和编码行为

在API响应值被编码以便在链上使用之前，它被解析和转换。 任何给定类型的转换行为在[适配器包文档](/airnode/v0.5/reference/packages/adapter.md#conversion)中都有深入解释。

然后，转换后的值由[ethers ABI Coder](https://docs.ethers.io/v5/api/utils/abi/coder/#AbiCoder)使用以下方式进行内部编码

```js
ethers.utils.defaultAbiCoder.encode([solidityType], [value]);
```

#### 支持的原始值

- `int256`
- `uint256`
- `bool`
- `bytes32`
- `address`
- `bytes`
- `string`

#### string32 (在链上编码为 `bytes32`)

`string32`是一种不被solidity支持的人工类型。 它被编码为`bytes32`，为少于32个字符的值提供了一个比普通`string`类型更便宜的选择。

::warning 局限性

虽然使用`string32`更有效率，但在链上从`bytes32`解码原始字符串既困难又昂贵。

还要记住，这种类型只能对短于32个字符的字符串进行编码。 如果值更长，它将被修剪，只有前31个字符会被编码。

:::

#### timestamp (在链上编码为 `uint256`)

`timestamp`是一个人造的类型，不被solidity支持。 它被编码为`uint256`，并指定了事务被编码时的UNIX时间戳值。 你可以在链上使用这个值来检查Airnode响应的 "新鲜度"。 这在某些情况下可能是有用的，因为Airnode不能保证一个特定的交易何时会在链上被开采。

当使用`timestamp`类型时，相应的`_path`和`_times`变量必须是空字符串或不提供。

#### 数组

除了上面定义的基元以及我们创建的所有 "人工 "类型之外，你可以自由地将数组与上述任何类型一起使用。 多维数组也被支持。 Solidity 允许你定义固定大小的数组，这对编码来说更省gas，你也可以使用这些数组。

举例

- `int256[]` - 正整数数组
- `uint256[8]` - 有8个元素的无符号整数数组
- `int256[] []` - 2维整数数组
- `string32[]` - 是一个`string32`值的数组，在链上将被编码为`byte32[] `
- `string[2][][3]` - 3维字符串数组，其中第一维包含3个元素，第二维不受限制地包含许多元素，最后一维只有2个元素。 注意，与C语言相比，这个[定义是逆向读取](https://ethereum.stackexchange.com/questions/64331/why-is-multidimensional-array-declaration-order-reversed)的

## `_path`

假设API响应将是一个JSON对象，使用点符号来定义用于满足请求的字段。 例如，如果API返回

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

那么`_path` 为 `field1.fieldA.1`，其响应将是 `valueA2`。

如果响应是一个迭代值（即不是JSON对象），并且`_path`没有提供或为空字符串（需要对[多个值进行编码](./reserved-parameters.md#encoding-multiple-values)），Airnode将使用API响应本身来完成请求。

::warning 小心分隔符

确保API响应的路径中的键不包含`.`，因为它将被错误地认为是一个分隔符。

```
{
  "strange.key": "123"
}
```

定义为 `"sange.key"` 的`_path`将无法工作。 作为变通方法，你可以[转义分隔符](./reserved-parameters.md#escaping-separators)。

:::

### 转义分隔符

在少数情况下，当API响应的`_path`包含`,`或`.`（逗号或点）时，事情会变得有点复杂。 这些符号在解析保留参数时有非常特殊的意义，如果它们被视为字面意义，就需要转义。 例如，如果API提供者的响应看起来像下面这样

```
{
  "very,strange.key": "123"
}
```

那么你需要转义这些符号，在这种情况下`_path="very//,strange\\.key"`。

## `_times`

如果`_type`是`int256`或`uint256`，并且提供了一个有效的`_times`参数，Annode在完成请求前将API返回的值与`_times`参数相乘。 例如，如果API返回：

```
{
  "data": "1.238",
  "apiVersion": "1.0.4"
}
```

而保留的参数是

```
_type: int256
_path: data
_times: "100"
```

该请求将以`123`的值实现。 请注意，这个数字会乘`100`，然后被向下取整。 这是因为乘法的结果在之后被[转换](/airnode/v0.5/reference/packages/adapter.md)为`int256`。

请确保将`_times`参数作为字符串传递。 Airnode将在内部把这个字符串转换为数字。 你也可以将空字符串`""`传递给`_times`参数--这与不提供`_times`参数的效果相同。 然而，在对[多个数值进行编码](./reserved-parameters.md#encoding-multiple-values)时，这一点很重要。

`_times`参数还可以与数组和多维数组一起使用。 API响应数组的所有元素在被编码之前都将被乘上一个数。

## 多值编码

Solidity支持解码和 "解构" 多个值。 例如

```solidity
function decodeMultipleParameters(bytes calldata data)
    public
    pure
    returns (string memory str, uint256 num, address addr)
{
    (str, num, addr) = abi.decode(data, (string, uint256, address));
}
```

上面的例子演示了分别对`string`、`uint256`和`address`的三个值进行链上解码。 你可以指示Airnode使用保留参数对这些值进行编码，用`,`（逗号）来分隔这些值。 例如，使用以下保留参数的组合

```js
{
  _type: 'string,uint256,address',
  _path: 'pathToString,pathToFloat,pathToAddress',
  _times: ',10000,'
}
```

Airnode将把保留的参数按`,`分割成 "分割值"，并确保它们都包含相同数量的参数。 它将提取并转换每个 "分割值"。 注意，一个`""`（空字符串）用于指定某个保留参数不应该用于某个 "分割值"。

例如，让我们假设API响应看起来像这样

```json
{
  "pathToString": "some string",
  "pathToFloat": "1234.567",
  "pathToAddress": "0xe021...08a74"
}
```

Airnode将分别提取和转换每个 "分割值"

1. `_type="string"`,`_path="pathToString`"和`__times=""` 的组合结果是一些 `"string"`
2. `_type="uint256"`, `_path="pathToFloat"` 和`__times="10000"` 的组合结果为`12345670`
3. 结合`_type="address"`, `_path="pathToAddress"`和`__times="" `结果是 `"0xe021...8a74"`

所有这些值然后一起被编码为单字节值，可以在链上发送。 你可以使用[测试网关](/airnode/v0.5/grp-providers/guides/build-an-airnode/deploying-airnode.md#testing-with-http-gateway)来检查原始API响应，投票结果和最终的编码值。
