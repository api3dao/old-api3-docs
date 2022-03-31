---
title: Requester
---

<TitleSpan>Concepts and Definitions</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>
<!--TocHeader /-->
<!--TOC class="table-of-contents" :include-level="[2,3]" /-->

A requester is a contract that makes Airnode requests. While making a request, the requester refers to a [sponsor](sponsor.md) by its [sponsorAddress](sponsor.md#sponsoraddress), which means "fulfill my request with the [sponsor wallet](sponsor.md#sponsorwallet) of the sponsor identified by `sponsorAddress`. Doing so requires the requester to be [sponsored](sponsor.md) by the said sponsor.

Note that the requester is the contract that makes the request. The requester may specify the request such that the request is fulfilled by the Airnode calling back another contract.

See the [Airnode requester examples](https://github.com/api3dao/airnode/tree/v0.2/packages/airnode-examples/contracts).
