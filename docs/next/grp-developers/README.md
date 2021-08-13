---
title: Overview
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />


A **Developer** is you, if you wish to consume off-chain data from APIs. You can do so using Airnodes. An Airnode is a first-party oracle that will push off-chain API data to your on-chain contract. In the diagram below your contract is called a requester. It will make a request to the on-chain RRP protocol contract (AirnodeRrp.sol) that will queue the request. The off-chain Airnode will access the queue, get the API data and perform a callback to the requester.

In summary you only need to do two things.

- Call `makeRequest()` on the AirnodeRrp.sol contract which returns a `requestId`.
- Add a `myFulfill()` function (call it what you like) to your requester (your contract) where the off-chain Airnode can send the requested data when ready. The data includes the same `requestId` returned when the request was made.


  > ![call](../assets/images/developer-overview.png)

## What is a Requester?

The term requester is important to remember. It is mentioned in these docs and in the GitHub code. When _requester_ is mentioned, the reference is to your contract that calls an Airnode. As an example see the `myContract.sol` contract in the diagram above, it is a requester.

## What is a Sponsor?

A sponsor is the public address of a wallet you control. You will use the public address to sponsor  requesters and to derive a new "sponsor's wallet" for each Airnode you use. Should you stop using an Airnode the funds from the derived "sponsor's wallet" can be returned to your public address.

>![image](../assets/images/sponsor-overview.png)

A developer decides to build a requester contract that makes requests to a specific Airnode. Using the xpub of the Airnode and the public address of an Ethereum account they control, the developer derives the address of their "sponsor's wallet" for the Airnode. The developer funds this wallet, then calls setSponsorshipStatus() in AirnodeRrp with the address of their requester contract to sponsor it. This means the developer is now the sponsor of their requester contract, i.e., the requester contract can make Airnode requests that will be fulfilled by their sponsor wallet.

<DesignatedWalletWarning/>