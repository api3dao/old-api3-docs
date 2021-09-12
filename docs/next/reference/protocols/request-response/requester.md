---
title: Requester
---

# {{$frontmatter.title}}

<!--TocHeader /-->
<TOC class="table-of-contents" :include-level="[2,3]" />

A requester is a contract that makes Airnode requests. While making a request, the requester refers to a [sponsor](sponsor.md) by its [`sponsorAddress`](sponsor.md#sponsorAddress), which means "fulfill my request with the [sponsor wallet](sponsor-wallet.md) of the sponsor identified by `sponsorAddress`. Doing so requires the requester to be [sponsored](sponsor.md) by the said sponsor.

Note that the requester is the contract that makes the request. The requester may specify the request such that the request is fulfilled by the Airnode calling back another contract.

See the [Airnode requester examples](https://github.com/api3dao/airnode-client-examples/tree/main).
