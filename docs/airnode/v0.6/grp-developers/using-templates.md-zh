---
title: 使用模板
---

<TitleSpan>开发者</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />


<!-- TODO: 2021-11-02 wkande: Should this doc speak to creating a templateId? See the code
example ./code/create-template-id.js which may not be used anywhere in
these docs at this time. -->

对 Airnode 的请求可能有许多参数。 请求者合约（例如数据馈送）用完全相同的参数重复请求是很常见的。 在这种情况下，重复传递所有参数是很浪费的。 模板用于在链上保存一组参数值，当从[AirnodeRrp.sol](https://github.com/api3dao/airnode/blob/v0.5/packages/airnode-protocol/contracts/rrp/AirnodeRrp.sol) 中调用`makeTemplateRequest()`函数时，可以重复使用。 不同于`makeFullRequest(), makeTemplateRequest()`要求请求者通过`模板Id`指定模板。

```solidity
function makeTemplateRequest(
    bytes32 templateId,
    address sponsor,
    address sponsorWallet,
    address fulfillAddress,
    bytes4 fulfillFunctionId,
    bytes calldata parameters
) external override returns (bytes32 requestId) {
```

当使用模板提出请求时， 在模板参数中，编码的参数和在请求时提供的参数(如果有的话) 将被Airnode使用。 如果两者包括一个具有相同名称的参数，将使用请求时提供的参数。

如下所示，模板的结构很简单。

- 所需的 Airnode 地址
- airnode 的 endpointId
- 端点参数

```solidity
struct Template {
  address airnode;
  bytes32 endpointId;
  bytes parameters;
}
```

创建和放置一个模板到链上用于请求者合约，只需要几个步骤。 每个模板都由`templateId`确定，该模板是其内容的哈希值。 当您创建一个链上的模板记录时， [查看第二部分：上传模板](using-templates.md#part-2-upload-template)，将返回一个模板ID。

<divider/>

## 第#1部分：构建模板

首先创建一个包含模板对象的文件。 参见下面的示例。 您需要调用 Airnode 及其endpointId 地址。 下面是讨论请求参数的链接，如果你需要帮助，可以自行查看。

- [参考资料 > 请求-响应协议 > 请求](../concepts/request.md)
- [调用Airnode](../grp-developers/call-an-airnode.md#request-parameters)

```
{
  "airnode": "0x15e7097beac1fd23c0d1e3f5a882a6f99ecbcf2e0c1011d1bd43707c6c0ec717",
  "endpointId": "0x2605589dfc93c8f9c35eecdfe1e666c2193df30a8b13e1e0dd72941f59f9064c",
  "parameters": [
    {
      "name": "name1",
      "value": "value1",
      "type": "string"
    },
    {
      "name": "name2",
      "value": "1000",
      "type": "uint256"
    }
  ]
}
```

如果您使用相同的参数值为 Airnode/endpointID 创建多个模板，每个模板将返回相同的`templateId` 当参数相同时，仅创建一个 模板。

<divider/>

## 第#2部分：上传模板

使用@api3/airnode-admin包中的[create-template](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-admin#create-template)命令，将你的模板移到链上。 通过命令`create-template`读取一个文件，使用其内容创建一个模板，并返回`templateId`。 若要创建一个新的模板记录，您需要关注以下要点。

- 来自区块链供应商的providerURL。
- 资助记录创建的gas的助记符。
- 模板文件的路径。

::: tip mnemonic

这个钱包通过支付交易gas费用，写入模板记录。 这不是支付实际执行任何Airnode的gas费用的钱包，因为Airnode本身将代表你的赞助者，记录创建赞助者钱包。

:::

```bash
npx @api3/airnode-admin create-template \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --mnemonic "nature about salad..." \
  --templateFilePath ./template.json
```

<divider/>

## 关于模板的更多信息

您可以根据需要创建更多模板。 调用 `getTemplates`命令在 @api3/airnode-admin软件包获取模板列表的 `templateIds`。
