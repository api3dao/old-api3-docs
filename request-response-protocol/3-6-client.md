# Request–response protocol: Client

A client is a contract that makes Airnode requests.
While making a request, the client refers to a [requester](/request-response-protocol/3-5-requester.md) by its [`requesterInd`](/request-response-protocol/3-5-requester.md#requesterInd), which means "fulfill my request with the [designated wallet](/request-response-protocol/3-7-designated-wallet.md) of the requester identified by `requesterInd`".
Doing so requires the client to be [endorsed](/request-response-protocol/3-8-endorsement.md) by the said requester.

Note that the client is the contract that makes the request.
The client may specify the request such that the request is fulfilled by the provider's Airnode calling back another contract.

[Request–response protocol concepts](/request-response-protocol/3-1-general-structure.md#concepts)
