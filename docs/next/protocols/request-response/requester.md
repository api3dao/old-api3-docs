---
title: Requester
---

# {{$frontmatter.title}}

A requester is an entity \(individual, business, etc.\) whose contracts make requests to [providers](./provider.md). These contracts are called [clients](./client.md).

After a client makes a request, the provider uses the respective requester's [designated wallet](./designated-wallet.md) to fulfill the request, meaning that the requester covers the gas cost. This relationship between the requester and the client is announced by the requester [endorsing](./endorsement.md) the client.

## `requesterIndex`

A requester needs to create a record on-chain, which results in them being assigned a requester index \(`requesterIndex`\). Note that unlike `providerId`, this index will not be the same across all chains.

A requester can use the [`xpub` of a provider](./provider.md#xpub) and their `requesterIndex` to derive the address of their [designated wallet](./designated-wallet.md) for that provider.

## `requesterAdmin`

`requesterAdmin` is an address that is authorized to update the requester-related properties \(e.g., endorsements\).

## Requesters and identity

Note that a single entity can create multiple requester records on-chain, and have multiple `requesterIndex`s associated. Below are some example reasons why one would want to have multiple requester identities on-chain:

* To keep separate designated wallets for two separate use-cases for easier accounting
* To duplicate transaction queues for a single use-case and increase response throughput
