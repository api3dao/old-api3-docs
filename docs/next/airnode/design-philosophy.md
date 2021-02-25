---
title: Design Philosophy
---

# {{$frontmatter.title}}

[[TOC]]

<Version selectedVersion="next" />

<div class="toc-label">Table of Contents</div>

*See the article, [Airnode: The API gateway for blockchains](https://medium.com/api3/airnode-the-api-gateway-for-blockchains-8b07ff136840) for a high level overview of Airnode.*

The API3 solution to the API Connectivity Problem requires an ecosystem of a large number of First-Party Oracles. Airnode's role in this is to make First-Party Oracles a reality.

## Scope

Any non-essential feature added to an application will return an increase in development time, maintenance costs and bugs. On the other hand, essential features should be included out-of-the-box and should not be left to the user to implement. For example, depending on third party external adapters for fundamental functionality is a failure in design. It is important to know exactly what the application will be used for to specify its scope.

Airnode is designed to interface APIs to smart contract platforms.
This means that it can only do this, but do it well.
Note that this scope is not as restrictive as it seems as APIs come in many shapes and forms (HTTP/WebSocket, request–response/publish–subscribe/webhooks, etc.).
The long term plan is to support all API schemes that there are demand for.

## Requirements

Airnode is designed to be operated as a First-party Oracle, i.e., by an API provider themselves.This results in very restrictive requirements:

![airnode.png](../figures/airnode.png)

* The API Provider does not know how to operate an Oracle node. The Oracle node should not require any know-how from the API Provider.
* API–Oracle node integration should be standardized so that tools can be developed to streamline the process.
* The API Provider does not want to invest man-hours to operate the node. The Oracle node should be *set-and-forget*.
* The API Provider does not want to pay for hosting when their Oracle is not being used. The hosting services should be priced on-demand.
* The API Provider cannot accept cryptocurrency as payment due to compliance, legal and accounting reasons. They cannot exchange cryptocurrencies or fund their node wallets for the same reasons. As such, the protocol should not require the API Provider to handle cryptocurrency as a means of payment, or fund their node wallet periodically.
* The API Provider cannot stake funds that would expose them to financial risk due to compliance, legal and accounting reasons. Therefore, the security mechanics of the protocol should not depend on oracles to stake.

*See the article, [Where are the First-Party Oracles?](https://medium.com/api3/where-are-the-first-party-oracles-5078cebaf17) that descibes the obstacles in the way of First-Party oracles.*

