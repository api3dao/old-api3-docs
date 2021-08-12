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

## The Term Requester

The term requester is important to remember. It is mentioned in these docs and in the GitHub code. When _requester_ is mentioned, the reference is to your contract that calls an Airnode. As an example see the `myContract.sol` contract in the diagram above, it is a requester.

## Sponsor

<Todo><p>Need better insight here.</p></Todo>
A requester needs to be sponsored. These docs will cover that in detail as you go. Basically you sponsor a requester with a wallet

A developer decides to build a contract that makes requests to a specific Airnode (we will call this contract requester). Using the xpub of the Airnode and the address of an Ethereum account they control, the developer derives the address of their sponsor wallet (see below for how this is done). The developer funds this sponsor wallet, then calls setSponsorshipStatus() in AirnodeRrp with the address of their requester contract to sponsor it. This means the developer is now the sponsor of their requester contract, i.e., the requester contract can make Airnode requests that will be fulfilled by their sponsor wallet.