---
title: Sponsor
---

# {{$frontmatter.title}}

<TitleSpan left=137>Concepts and<br/>Definitions</TitleSpan>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

A sponsor is an entity (individual, business, etc.) whose contracts make requests to [Airnodes](airnode.md). These contracts are called [requesters](requester.md).

After a requester makes a request, the Airnode uses the respective sponsor's [sponsor wallet](sponsor-wallet.md) to fulfill the request, meaning that the sponsor covers the gas cost. This relationship between the sponsor and the requester is announced by the sponsor [sponsoring](sponsorship.md) the requester.

## `sponsorAddress`
A sponsor is identified by a `sponsorAddress` which is usually the default account `m/44'/60'/0'/0/0` of a BIP 44 wallet owned by the sponsor. The sponsor can use a different address from the wallet if desired such as `m/44'/60'/0'/0/2`.

Note that a sponsor could use multiple addresses from multiple wallets. Below are some example reasons why one would want to have multiple `sponsorAddress` identities on-chain:

- To keep separate `sponsor-wallets` for two separate use-cases for easier accounting.
- To duplicate transaction queues for a single use-case and increase response throughput.

### PLACE THESE

- A sponsor uses their `sponsorAddress` and the contract address of a requester to sponsor the requester, see [Sponsorship](sponsorship.md).

- A sponsor uses their `sponsorAddress` and the `airnodeAddress` of a particular Airnode to derive a [sponsor-wallet](sponsor-wallet.md) for the Airnode.

~~When the `sponsorAddress` used to sponsor the requester, matches an Airnode [`sponsor-wallet`](sponsor.md#sponsor-wallet) that was derived using the same `sponsorAddress`, the requester can make requests of the Airnode.~~


## Sponsoring a Requester

Teh 

## `sponsor-wallet`

When a sponsor wishes to access an Airnode (via a requester) it must create a `sponsor-wallet` for the Airnode. Requesters that have been sponsored by a sponsor, can specify their requests be fulfilled by the `sponsor-wallet` belonging to the sponsor. This allows the sponsor to cover the gas cost of request fulfillments by the Airnode.

#

