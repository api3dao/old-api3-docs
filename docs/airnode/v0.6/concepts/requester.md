---
title: 请求者
---

<TitleSpan>概念和定义</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<!--TocHeader /-->
<!--TOC class="table-of-contents" :include-level="[2,3]" /-->

请求者是一个可以触发Airnode 请求的合约。 在提出请求时，请求者通过其[sponsorAddress](sponsor.md#sponsoraddress)指代[赞助者](sponsor.md) ，这意味着 ”通过`sponsorAddress`所确定的 [赞助者钱包](sponsor.md#sponsorwallet) 来满足其请求 “。 这样做需要请求者被上述赞助者[赞助](sponsor.md)。

请注意，请求者是提出请求的合约。 请求者可以指定请求，以便通过 Airnode调用另一个合约来满足请求。

参见[Airnode请求者示例](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-examples/contracts).
