---
title: Sponsor Wallet
---
<Fix>Move to sponsors.md</Fix>
# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Each [Airnode](Airnode.md) can keep a unique `sponsorWallet` for a [sponsor](sponsor.md). which is identified by a `sponsorAddress/airnodeAddress` pair. [Requesters](requester.md) that have been  [sponsored](sponsorship.md) by a sponsor, can specify their requests be fulfilled by the  `sponsor-wallets` belonging to the sponsor. This allows the sponsor to cover the gas cost of request fulfillments by the Airnode.

## Deriving the address of the sponsor wallet

Each sponsor is identified by their address, and their sponsor wallets are designated implicitly by the following path

m/0...

- /1st least significant 31-bits of the sponsor address...
- /2nd least significant 31-bits of the sponsor address...
- /3rd least significant 31-bits of the sponsor address...
- /4th least significant 31-bits of the sponsor address...
- /5th least significant 31-bits of the sponsor address...
- /6th least significant 31-bits of the sponsor address

In other words, a sponsor can calculate the address of their respective sponsor wallet for an Airnode and have requesters use it to make requests right away.

Sponsors need to keep their sponsor wallet topped up if they want the Airnode to be able to fulfill requests made by their requesters. A sponsor can derive their sponsor wallet account for a specific Airnode in JS (using ethers.js) with the Airnode's `xpub`.


<Fix>Does this code need any corrections. Why are we not using the admin package here? This is a problem `m/0/${requesterIndex}`?</Fix>
```js
hdNode = ethers.utils.HDNode.fromExtendedKey(xpub);
sponsorWalletNode = hdNode.derivePath(`m/0/${requesterIndex}`);
sponsorWalletAddress = sponsorWalletNode.address;
```
<Fix>Correction below needed based on the code above and changing airnodeId and requesterIndex. Some contract names may be incorrect.</Fix>

In the above example `xpub` is retrieved from `AirnodeParameterStore.sol` using the `airnodeId`, and `requesterIndex` is assigned by `RequesterStore.sol` when the requester record was created. (For more information on deriving wallets from a private key using a path, see [HD wallets](https://github.com/ethereumbook/ethereumbook/blob/develop/05wallets.asciidoc#hd_wallets).)

## The path convention

<Fix>Correction needed next paragraph. It is assumed that since sponsorAddress is used rather than requesterIndex that this may not be needed.</Fix>
~~The path of a sponsor wallet for the request–response protocol is `m/0/${requesterIndex}`. This means that we assume that `requesterIndex` will be less than `2^31` (yet this can be extended by using schemes such as `m/0/${requestInd % 2^31}/${requestInd / 2^31}`). Other branches such as `m/1/...`, `m/2/...`, etc. are reserved for other protocols (e.g., the pub–sub protocol).~~

## Airnode-controlled nature of the sponsor wallets

<SponsorWalletWarning/>

The risk mentioned above becomes negligible when:

1. The Airnode is a first-party oracle, because first-party oracles are trustworthy
2. The Airnode is being used for a high value use-case, which already implies a high level of trust

If the sponsor does not trust the Airnode at all, they can fund the sponsor wallet just enough to cover a single fulfillment for each request to the Airnode. Therefore, this scheme both supports the traditional per-call payments, but also allows the protocol to leverage the trustworthiness of Airnodes to reduce unnecessary gas costs caused by microtransactions.

## Withdrawals

<Fix>Should we be using admin commands here or admin contract calls as other RRP files are doing?</Fix>

If the sponsor decides not use a particular sponsor wallet any longer, they can make a request to withdraw funds from it, see the [`request-withdrawal`](../../cli-commands.md#request-withdrawal) command. The Airnode listens for withdrawal requests and fulfills them automatically. Therefore, the sponsor should be able to receive their funds from their sponsor wallet in a few minutes notice. The sponsor wallet does not get deleted, and can be used in the future simply by funding it again.

## Can Airnode cover the gas costs?

Although the sponsor wallet scheme allows the sponsor to cover the fulfillment gas costs, it is just as easy to have the Airnode cover the gas costs. In this case the Airnode funds the sponsor wallet, instead of the sponsor. Furthermore, this scheme allows hybrid use-cases where the Airnode covers the fulfillment gas costs for one sponsor (e.g., because they have made a special service agreement with them), while requiring others to cover their own fulfillment gas costs.
