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

那么`_path` 是 `field1.fieldA.1`，响应将是 `value A2`。

If the response is a literal value (i.e., not a JSON object) and `_path` is not provided or is an empty string (needed for [encoding multiple values](./reserved-parameters.md#encoding-multiple-values)), Airnode will use the API response itself to fulfill the request.

:::warning Beware the separator

Make sure the keys in the path of the API response do not contain `.`, because it will be incorrectly considered as a separator.

```
{
  "strange.key": "123"
}
```

The `_path` defined as `"strange.key"` will not work. As workaround you can [escape the separator](./reserved-parameters.md#escaping-separators).

:::

### Escaping Separators

In rare cases, when the `_path` to the API response would contain `,` or `.` (comma or a dot) things get a bit complicated. Those symbols have a very specific meaning when parsing the reserved parameters and they need to be escaped if they are to be considered as literals. For example, if the API provider response looks like the following

```
{
  "very,strange.key": "123"
}
```

Then you need to escape those symbols, in this case `_path="very//,strange\\.key"`.

## `_times`

If `_type` is `int256` or `uint256` and a valid `_times` parameter is provided Airnode multiplies the value returned by the API with the `_times` parameter before fulfilling the request. For example, if the API returns:

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
_times: "100"
```

the request will be fulfilled with the value `123`. Note that the number gets multiplied by `100`, and then gets floored. This is because the result of the multiplication is [cast](/airnode/v0.5/reference/packages/adapter.md) to `int256` afterwards.

Make sure to pass the `_times` parameter as string. Airnode will convert this string to number internally. You can also pass and empty string `""` to `_times` parameter - this has the same effect as if the `_times` parameter was not provided. However, this is important when [encoding multiple values](./reserved-parameters.md#encoding-multiple-values).

The `_times` parameter also works in conjunction with arrays and multidimensional arrays. All elements of the API response array will be multiplied before they are encoded.

## Encoding Multiple Values

Solidity has support for decoding and "destructuring" multiple values. For example

```solidity
function decodeMultipleParameters(bytes calldata data)
    public
    pure
    returns (string memory str, uint256 num, address addr)
{
    (str, num, addr) = abi.decode(data, (string, uint256, address));
}
```

The example above demonstrates the decoding on chain of three values of types `string`, `uint256` and `address` respectively. You can instruct Airnode to encode these values using the reserved parameters by separating the values using `,` (comma). For example using the following combination of reserved parameters

```js
{
  _type: 'string,uint256,address',
  _path: 'pathToString,pathToFloat,pathToAddress',
  _times: ',10000,'
}
```

Airnode will split the reserved parameters by `,` into "split values" and ensure they all contain the same number of them. It will extract and convert each of the "split values". Notice, that an `""` (empty string) is used to specify that a certain reserved parameter should not be used for a certain "split value".

For example, let's say the API response looks like this

```json
{
  "pathToString": "some string",
  "pathToFloat": "1234.567",
  "pathToAddress": "0xe021...08a74"
}
```

Airnode will extract and convert each of the "split values" separately

1. Combination of `_type="string"`, `_path="pathToString"` and `__times=""` results in `"some string"`
2. Combination of `_type="uint256"`, `_path="pathToFloat"` and `__times="10000"` results in `12345670`
3. Combination of `_type="address"`, `_path="pathToAddress"` and `__times=""` results in `"0xe021...8a74"`

All of these values are then together encoded to single bytes value that can be sent on chain. You can use [testing gateway](/airnode/v0.5/grp-providers/guides/build-an-airnode/deploying-airnode.md#testing-with-http-gateway) to inspect the raw API response, casting results and the final encoded value.
