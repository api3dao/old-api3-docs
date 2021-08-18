---
title: Sponsor wallet
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Each [Airnode](Airnode.md) keeps a sponsor wallet for each [sponsor](requester.md).
[Requesters](client.md) [sponsored](endorsement.md) by a sponsor can specify their requests to be fulfilled by the said sponsor's sponsor wallet.
This allows the sponsor to cover the gas cost of request fulfillments by the Airnode.

## Deriving the address of the sponsor wallet

Sponsors need to keep their sponsor wallet topped up if they want the Airnode to be able to fulfill requests made by their requesters. A sponsor can derive their sponsor wallet for a specific Airnode in JS (using ethers.js).


<Todo><p>The code needs correction.</p></Todo>
```js
hdNode = ethers.utils.HDNode.fromExtendedKey(xpub);
sponsorWalletNode = hdNode.derivePath(`m/0/${requesterIndex}`);
sponsorWalletAddress = designatedWalletNode.address;
```
<Todo><p>Correction below needed based on the code above.</p></Todo>
In the above example `xpub` is retrieved from `AirnodeParameterStore.sol` using the `airnodeId`, and `requesterIndex` is assigned by `RequesterStore.sol` when the requester record was created. (For more information on deriving wallets from a private key using a path, see [HD wallets](https://github.com/ethereumbook/ethereumbook/blob/develop/05wallets.asciidoc#hd_wallets).)

## The path convention

<Todo><p>Correction needed next paragraph.</p></Todo>
The path of a sponsor wallet for the request–response protocol is `m/0/${requesterIndex}`. This means that we assume that `requesterIndex` will be less than `2^31` (yet this can be extended by using schemes such as `m/0/${requestInd % 2^31}/${requestInd / 2^31}`). Other branches such as `m/1/...`, `m/2/...`, etc. are reserved for other protocols (e.g., the pub–sub protocol).

## Airnode-controlled nature of the sponsor wallets


<SponsorWalletWarning/>

This risk mentioned above becomes negligible when:

1. The Airnode is a first-party oracle, because first-party oracles are trustworthy
2. The Airnode is being used for a high value use-case, which already implies a high level of trust

If the sponsor does not trust the Airnode at all, they can fund the sponsor wallet just enough to cover a single fulfillment for each request to the Airnode. Therefore, this scheme both supports the traditional per-call payments, but also allows the protocol to leverage the trustworthiness of Airnodes to reduce unnecessary gas costs caused by microtransactions.

## Withdrawals

<Todo><p>Verify request-withdrawal command has not changed.</p></Todo>
If the sponsor decides that they will not use a sponsor wallet any longer, they can make a request to withdraw funds from it, see the [`request-withdrawal`](../../cli-commands.md#request-withdrawal) command. The Airnode listens for withdrawal requests and fulfills them automatically. Therefore, the sponsor should be able to receive their funds from their sponsor wallet in a few minutes notice. The sponsor wallet does not get deleted, and can be used in the future simply by funding it again.

## How to have the Airnode cover the gas costs?

Although the sponsor wallet scheme allows the sponsor to cover the fulfillment gas costs, it is just as easy to have the Airnode cover the gas costs. The only thing that needs to be done in this case is for the Airnode to top up the sponsor wallet, instead of the sponsor. Furthermore, this scheme allows hybrid use-cases where the Airnode covers the fulfillment gas costs for one sponsor (e.g., because they have made a special service agreement with them), while requiring others to cover their own fulfillment gas costs.
