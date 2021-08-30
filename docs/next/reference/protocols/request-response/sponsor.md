---
title: Sponsor
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

A sponsor is an entity (individual, business, etc.) whose contracts make requests to [Airnodes](airnode.md). These contracts are called [requesters](requester.md).

After a requester makes a request, the Airnode uses the respective sponsor's [sponsor wallet](sponsor-wallet.md) to fulfill the request, meaning that the sponsor covers the gas cost. This relationship between the sponsor and the requester is announced by the sponsor [sponsoring](sponsorship.md) the requester.

## `sponsorAddress`
A sponsor needs to identify itself when sponsoring a requester or deriving a sponsor wallet for an Airnode. This is done with a sponsorAddress which is usually the default BIP derivation path `m/44'/60'/0'/0/0` of a digital wallet owned by the sponsor. The sponsor can use a different address from the wallet it desired.

- A sponsor uses a mnemonic with a sponsorAddress of the default BIP derivation path `m/44'/60'/0'/0/0` and the requester's contract address to sponsor a requester. Another address from the mnemonic can be used by adding the parameter `derivationPath` e.g.: `m/44'/60'/0'/0/2`.


- A sponsor uses the <FixInline>xpub or airnodeAddress?</FixInline> [`xpub`](airnode.md#xpub) of an Airnode and their `sponsorAddress` to derive the address of a [sponsor wallet](designated-wallet.md) for an Airnode.

<Fix>It seems the following section is no longer needed.</Fix>
~~## Requesters and identity~~


~~Note that a single entity can create multiple requester records on-chain, and have multiple `requesterIndex` records. Below are some example reasons why one would want to have multiple requester identities on-chain:~~

~~- To keep separate designated wallets for two separate use-cases for easier accounting~~
~~- To duplicate transaction queues for a single use-case and increase response throughput~~
