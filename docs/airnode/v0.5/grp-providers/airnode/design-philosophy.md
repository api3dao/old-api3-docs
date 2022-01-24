---
title: Design Philosophy
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

_See our article,
[Airnode: The API gateway for blockchains](https://medium.com/api3/airnode-the-api-gateway-for-blockchains-8b07ff136840)
for a high level overview of Airnode._

The API3 solution to the API connectivity problem requires an ecosystem of a
large number of first-party oracles. Airnode's role in this is to make
first-party oracles a reality.

## Scope

Any non-essential feature added to an application will return as an increase in
development time, maintenance cost and bugs. On the other hand, essential
features should be included out-of-the-box, and should not be left to the user
to implement. For example, depending on third party external adapters for
fundamental functionality is a failure in design. Then, it is important to know
what exactly the application will be used for to specify its scope.

Airnode is designed to interface APIs to smart contract platforms. This means
that it can only do this, but do it well. Note that this scope is not as
restrictive as it seems, as APIs come in many shapes and forms (HTTP/WebSocket,
request–response/publish–subscribe/webhooks, etc.). The long term plan is to
support all API schemes that there are demand for.

## Requirements

_See our article,
[Where are the first-party oracles?](https://medium.com/api3/where-are-the-first-party-oracles-5078cebaf17)
that lists the obstacles in the way of first-party oracles._

Airnode is designed to be operated as a first-party oracle, i.e., by the API
provider themselves. This results in very restrictive requirements:

<p align="center">
  <img src="../../assets/images/airnode.png" />
</p>

- The API provider does not know how to operate an oracle node. Then, the oracle
  node should not require any know-how from the API provider.
- API–oracle node integration should be standardized so that tools can be
  developed to streamline the process.
- The API provider does not want to invest man-hours to operate the node. Then,
  the oracle node should be _set-and-forget_.
- The API provider does not want to pay for hosting when their oracle is not
  being used. Then, the hosting services should be priced on-demand.
- The API provider cannot accept cryptocurrency as payment due to compliance,
  legal and accounting reasons. They cannot exchange cryptocurrencies or fund
  their node wallets for the same reasons. Then, the protocol should not require
  the API provider to handle cryptocurrency as a means of payment, or fund their
  node wallet periodically.
- The API provider cannot stake funds that would expose them to financial risk
  due to compliance, legal and accounting reasons. Therefore, the security
  mechanics of the protocol should not depend on oracles to stake.
