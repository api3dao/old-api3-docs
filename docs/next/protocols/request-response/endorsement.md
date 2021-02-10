---
title: Endorsement
---

A [requester](./requester.md) announcing that a [client](./client.md) can specify their requests to be fulfilled by the requester's [designated wallets](./designated-wallet.md) is called an endorsement.
This is done by the `requesterAdmin` calling `RequesterStore.sol` with the client contract's address.
The check of if a client is endorsed by the requester whose designated wallet it wants to have the request fulfilled with is done at the protocol level (and not by Airnodes).

## How an endorsed client refers to the endorser

A client contract can have multiple requesters that have endorsed it.
While making a request, the client both provides the `designatedWallet` address that it wants to have the request fulfilled by, and also the `requesterInd` of the requester that this wallet belongs to.
The contract checks if the client is endorsed, and if so, emits the request event.

Airnode derives the designated wallet address using the provided `requesterIndex`, then checks if this matches `designatedWallet`.
Airnode will ignore the request if the two do not match.
This is done this way because deriving the designated wallet address from the `requesterIndex` on-chain is not feasible.
