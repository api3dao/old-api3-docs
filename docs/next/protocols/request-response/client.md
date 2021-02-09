---
title: Client
---

A client is a contract that makes Airnode requests. While making a request, the client refers to a [requester](/request-response-protocol/requester.md) by its [`requesterIndex`](/request-response-protocol/requester.md#requesterIndex), which means "fulfill my request with the [designated wallet](/request-response-protocol/designated-wallet.md) of the requester identified by `requesterIndex`". Doing so requires the client to be [endorsed](/request-response-protocol/endorsement.md) by the said requester.

Note that the client is the contract that makes the request. The client may specify the request such that the request is fulfilled by the provider's Airnode calling back another contract.

See the [Airnode client examples](https://github.com/api3dao/airnode-client-examples).