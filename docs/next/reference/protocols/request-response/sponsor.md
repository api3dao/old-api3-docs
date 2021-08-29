---
title: Sponsor
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

A sponsor is an entity (individual, business, etc.) whose contracts make requests to [Airnodes](airnode.md).
These contracts are called [requesters](requesters.md).

After a requester makes a request, the Airnode uses the respective sponsor's [sponsor wallet](sponsor-wallet.md) to fulfill the request, meaning that the sponsor covers the gas cost. This relationship between the sponsor and the requester is announced by the sponsor [sponsoring](endorsement.md) the requester.

## `requesterIndex`

A requester needs to create a record on-chain, which results in them being assigned a requester index (`requesterIndex`). Note that unlike `airnodeId`, this index will not be the same across all chains.

A requester can use the [`xpub` of an Airnode](airnode.md#xpub) and their `requesterIndex` to derive the address of their [designated wallet](designated-wallet.md) for that Airnode.

## `requesterAdmin`

`requesterAdmin` is an address that is authorized to update the requester-related properties (e.g., endorsements).

## Sponsoring a Requester

A [sponsor](sponsor.md) announcing that a [requester](requester.md) can specify their requests to be fulfilled by the sponsor's [sponsor wallets](sponsor-wallet.md) is called a sponsorship. <FixInline>Fix next sentence.</FixInline>This is done by the `requesterAdmin` calling `RequesterStore.sol` with the requester contract's address. Verifying that a requester is sponsored by the sponsor, whose sponsor wallet it wants to have the request fulfilled with, is done at the protocol level (and not by Airnodes).

~~HEADING 3 How an endorsed client refers to the endorser~~

A requester can have multiple sponsors that have sponsored it. While making a request, the requester both provides the `sponsorWallet` address that it wants to have the request fulfilled by, and also the `sponsorAddress` of the sponsor that this wallet belongs to. <FixInline>Is the next sentence right?</FixInline>The AirnodeRrp.sol protocol contract checks if the requester is sponsored, and if so, emits the request event.

<Fix>Is this paragraph needed. Seems hard to understand, maybe reworded?.</Fix>
Airnode derives the sponsor wallet address using the provided `sponsorAddress`, then checks if this matches `sponsorWallet`. Airnode will ignore the request if the two do not match. This is done this way because deriving the sponsor wallet address from the `sponsorAddress` on-chain is not feasible.


<Fix>It seem the following section is no longer needed.</Fix>
~~## Requesters and identity~~


~~Note that a single entity can create multiple requester records on-chain, and have multiple `requesterIndex` records. Below are some example reasons why one would want to have multiple requester identities on-chain:~~

~~- To keep separate designated wallets for two separate use-cases for easier accounting~~
~~- To duplicate transaction queues for a single use-case and increase response throughput~~
