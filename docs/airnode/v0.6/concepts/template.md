---
title: 模板
---

<TitleSpan>概念和定义</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<!--TocHeader /><TOC class="table-of-contents" :include-level="[2,3]" >

预言机请求有很多参数。 [请求者](requester.md)（例如数据馈送）使用完全相同的参数进行重复请求，是非常常见的。 在这种情况下，重复传递所有参数是很浪费的。

模板是请求者在提出请求时可以参考的请求参数的链上记录。 额外的好处是减少了提出请求所需的模板代码，提高了用户体验，并允许在没有额外gas费用的情况下，使用较大的参数有效载荷（例如，链外计算规范）。

```solidity
struct Template {
    address airnode;
    bytes32 endpointId;
    bytes parameters;
}
```

### templateId

每个模板都由`templateId`来识别，该ID是其内容的哈希值。 这使得Airnode可以通过静态调用来获取模板，并验证收到的参数没有被篡改。

```solidity
templateId = keccak256(abi.encode(
  airnode,
  endpointId,
  parameters
));
```
