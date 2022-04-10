---
title: 端点
---

<TitleSpan>概念和定义</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

Airnode根据[预言机集成规范（OIS）](/ois/v1.0.0/)向区块链提供API。 API是由[操作](/ois/v1.0.0/ois.md#_5-2-operation)组成的，这些操作代表了一个API所提供的各个功能。 OIS将每个API操作映射到一个[端点](/ois/v1.0.0/ois.md#_5-endpoints)，这可以被认为是一个Airnode操作。 Airnode将通过请求-响应协议提供服务的端点列在[config.json](../reference/deployment-files/config-json.md)的[触发器](../reference/deployment-files/config-json.md#triggers)下。

## `endpointId`

> 您可以使用 [管理员CLI](../reference/packages/admin-cli.md) 从您的终端生成端点id。

`endpointId` 标识了Airnode所服务的特定端点，在JS中（使用ethers.js）计算如下：

```js
ethers.utils.keccak256(
  ethers.utils.defaultAbiCoder.encode(
    ['string', 'string'],
    [oisTitle, endpointName]
  )
);
```

请注意，这意味着`endpointId`不是唯一的，两个Airnode可以使用相同的ID为相等的端点提供服务（事实上，这也是我们希望的结果）。这不是一个问题，因为请求是用`airnode` （Airnode的`address`)）和 `endpointId`配对提出的。

这种确定 `endpointId`的惯例，在协议层面上并没有被强制执行。 例如，人们可以选择随机生成一个`endpointId`，只要请求者使用正确的`endpointId`，这就不是一个问题。

## 授权者

Airnodes可以给他们的端点分配一个授权者的列表。 更多信息请参见[授权者](authorization.md)一节。
