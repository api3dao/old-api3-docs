---
title: Client
---

# {{$frontmatter.title}}

[[TOC]]

<Version selectedVersion="pre-alpha" />

<div class="toc-label">Table of Contents</div>

A client is a contract that makes Airnode requests.
While making a request, the client refers to a [requester](requester.html) by its [`requesterIndex`](requester.html#requesterIndex), which means "fulfill my request with the [designated wallet](designated-wallet.html) of the requester identified by `requesterIndex`".
Doing so requires the client to be [endorsed](endorsement.html) by the said requester.

Note that the client is the contract that makes the request.
The client may specify the request such that the request is fulfilled by the provider's Airnode calling back another contract.

See the [Airnode client examples](https://github.com/api3dao/airnode-client-examples).
