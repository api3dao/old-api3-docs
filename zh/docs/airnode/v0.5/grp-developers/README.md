---
title: Overview
---

<TitleSpan>Developers</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

A **developer** is you, if you wish to consume off-chain data from APIs. You do so using Airnodes. An Airnode is a first-party oracle that pushes off-chain API data to your on-chain contract. In the diagram below, your contract is called a requester. It makes a request to the on-chain RRP protocol contract (AirnodeRrp.sol) that adds the request to the event logs. The off-chain Airnode then accesses the event logs, gets the API data and performs a callback to the requester.

In summary, you only need to do two things.

- Call `makeFullRequest()` or `makeTemplateRequest()` on the AirnodeRrp.sol contract, which returns a [`requestId`](../concepts/request.md#requestid).
- Add a `myFulfill()` function (call it what you like) to your requester (your contract) where the off-chain Airnode can send the requested data when ready. The data includes the same `requestId` as the one returned at the time of making the request.

> ![call](../assets/images/developer-overview.png)
> 
> 1. <p class="diagram-line" style="color:black;">The requester (myContract.sol) makes a request to the RRP protocol contract (AirnodeRrp.sol) by calling <code>makeFullRequest()</code> which adds the request to the event logs and returns a <code>requestId</code> to the requester.</p>
> 2. <p class="diagram-line" style="color:black;">Airnode retrieves the on-chain request from the event logs.</p>
> 3. <p class="diagram-line" style="color:green;">Airnode gathers response data from the API specified in the request.</p>
> 4. <p class="diagram-line" style="color:blue;">Airnode performs a callback to a named function <code>myFulfill()</code> in myContract.sol via the AirnodeRrp.sol function <code>fulfill()</code> with the requested data and the <code>requestId</code>.</p>

For a more detailed diagram see the first image in the [Calling an Airnode](./call-an-airnode.md) doc.
