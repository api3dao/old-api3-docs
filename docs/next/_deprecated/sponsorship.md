---
title: Sponsorship
---
<Fix>Move to sponsors.md</Fix>
# {{$frontmatter.title}}

A [sponsor](sponsor.md) announcing that a [requester](requester.md) can specify their requests to be fulfilled by the sponsor's [sponsor wallet](sponsor-wallet.md) is called a sponsorship. This is done by the sponsor calling `AirnodeRrp.sol` with the requester's contract address. This verifies that a requester is sponsored by the sponsor, whose `sponsor-wallet` it wants to have the request fulfilled with is done at the protocol level (and not by Airnodes).

## How an sponsored requester refers to the sponsor

1. A requester can have multiple sponsors that have sponsored it. While making a request, the requester provides the `sponsorAddress` that it wants to have the request fulfilled by. The protocol contract checks if the requester is sponsored, and if so, emits the request event.

2. Next Airnode derives the `sponsor-wallet` address using the provided `sponsorAddress`, then checks if this matches `sponsorWallet`. Airnode will ignore the request if the two do not match. This is done this way because deriving the sponsor wallet address from the `sponsorAddress` on-chain is not feasible.
