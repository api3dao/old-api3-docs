---
title: Overview
---

# {{$frontmatter.title}}

<VersionWarning/>

A **Developer** is you, if you wish to consume off-chain data from APIs. You do so using Airnodes. An Airnode is a first-party oracle that will push off-chain API data to your on-chain contract. In the diagram below your contract is called a requester. It will make a request to the on-chain RRP protocol contract (AirnodeRrp.sol) that will add the request to the event logs. The off-chain Airnode will access the event logs, get the API data and perform a callback to the requester.

In summary you only need to do two things.

- Call `makeFullRequest()` or `makeTemplateRequest()` on the AirnodeRrp.sol contract which returns a [`requestId`](../concepts/request.md#requestid).
- Add a `myFulfill()` function (call it what you like) to your requester (your contract) where the off-chain Airnode can send the requested data when ready. The data includes the same `requestId` returned when the request was made.

> ![call](../assets/images/developer-overview.png)
> 
> 1. <p class="diagram-line" style="color:black;">The requester (myContract.sol) makes a request to the RRP protocol contract (AirnodeRrp.sol) by calling `makeFullRequest()` which adds the request to the event logs and returns a requestId to the requester.</p>
> 2. <p class="diagram-line" style="color:black;">Airnode retrieves the on-chain request from the event logs.</p>
> 3. <p class="diagram-line" style="color:green;">Airnode gathers response data from the API specified in the request.</p>
> 4. <p class="diagram-line" style="color:blue;">Airnode performs a callback to a named function `myFulfill()` in myContract.sol via the AirnodeRrp.sol function `fulfill()` with the requested data and the requestId.</p>

For a more detailed diagram see the first image in the [Calling an Airnode](./call-an-airnode.md) doc.
