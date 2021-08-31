---
title: Sponsor
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

A sponsor is an entity (individual, business, etc.) whose contracts make requests to [Airnodes](airnode.md). These contracts are called [requesters](requester.md).

After a requester makes a request, the Airnode uses the respective sponsor's [sponsor wallet](sponsor-wallet.md) to fulfill the request, meaning that the sponsor covers the gas cost. This relationship between the sponsor and the requester is announced by the sponsor [sponsoring](sponsorship.md) the requester.

## sponsorAddress
A sponsor needs to identify itself when sponsoring a requester or deriving a sponsor wallet for an Airnode. This is done with a sponsorAddress which is usually the default BIP derivation path `m/44'/60'/0'/0/0` of a digital wallet owned by the sponsor. The sponsor can use a different address from the wallet if desired such as `m/44'/60'/0'/0/2`.

- A sponsor uses their sponsorAddress and the contract address of a requester to sponsor the requester, see [Sponsorship](sponsorship.md).

- A sponsor uses their sponsorAddress and the <FixInline>Can use either?</FixInline> airnodeAddress or [`xpub`](airnode.md#xpub) of an Airnode to derive the address of a [sponsor wallet](sponsor-wallet.md) for the Airnode.

When the sponsorAddress used to sponsor the requester, matches an Airnode sponsor wallet that was derived using the same sponsorAddress, the requester can make requests of the Airnode. 

## Sponsors and Identity

Note that a sponsor could use multiple sponsorAddresses. Below are some example reasons why one would want to have multiple sponsorAddress identities on-chain:

- To keep separate sponsor wallets for two separate use-cases for easier accounting
- To duplicate transaction queues for a single use-case and increase response throughput
