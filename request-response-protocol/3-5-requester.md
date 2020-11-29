# Request–response protocol: Requester

A requester is an entity (individual, business, etc.) whose contracts make requests to [providers](/request-response-protocol/3-2-provider.md).
These contracts are called [clients](/request-response-protocol/3-6-client.md).

After a client makes a request, the provider uses the respective requester's [designated wallet](/request-response-protocol/3-7-designated-wallet.md) to fulfill the request, meaning that the requester covers the gas cost.
This relationship between the requester and the client is announced by the requester [endorsing](/request-response-protocol/3-8-endorsement.md) the client.

## `requesterInd`

A requester needs to create a record on-chain, which results in them being assigned a requester index (`requesterInd`).
Note that unlike `providerId`, this index will not be the same across all chains.

A requester can use the [`xpub` of a provider](/request-response-protocol/3-2-provider.md#xpub) and their `requesterInd` to derive the address of their [designated wallet](/request-response-protocol/3-7-designated-wallet.md) for that provider.

## `requesterAdmin`

`requesterAdmin` is an address that is authorized to update the requester-related properties (e.g., endorsements).

## Requesters and identity

Note that a single entity can create multiple requester records on-chain, and have multiple `requesterInd`s associated.
Below are some example reasons why one would want to have multiple requester identities on-chain:
- To keep separate designated wallets for two separate use-cases for easier accounting
- To duplicate transaction queues for a single use-case and increase response throughput

[Request–response protocol concepts](/request-response-protocol/3-1-general-structure.md#concepts)
