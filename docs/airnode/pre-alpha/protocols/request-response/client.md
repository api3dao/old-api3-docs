---
title: Client
---

# {{$frontmatter.title}}
<VersionWarning/>
<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

A client is a contract that makes Airnode requests. While making a request, the client refers to a [requester](requester.md) by its [`requesterIndex`](requester.md#requesterindex), which means "fulfill my request with the [designated wallet](designated-wallet.md) of the requester identified by `requesterIndex`". Doing so requires the client to be [endorsed](endorsement.md) by the said requester.

Note that the client is the contract that makes the request. The client may specify the request such that the request is fulfilled by the provider's Airnode calling back another contract.
