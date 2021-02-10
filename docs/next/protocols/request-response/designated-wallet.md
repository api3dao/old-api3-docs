---
title: Designated Wallet
---

Each [provider](./provider.md) keeps a designated wallet for each [requester](./requester.md). [Clients](./client.md) [endorsed](./endorsement.md) by a requester can specify their requests to be fulfilled by the said requester's designated wallet. This allows the requester to cover the gas cost of request fulfillments.

## Deriving the address of the designated wallet

Requesters need to keep their designated wallet topped up if they want the provider to be able to fulfill requests made by their clients. A requester can derive their designated wallet for a specific provider in JS \(using ethers.js\) as:

```javascript
hdNode = ethers.utils.HDNode.fromExtendedKey(xpub);
designatedWalletNode = hdNode.derivePath(`m/0/${requesterIndex}`);
designatedWalletAddress = designatedWalletNode.address;
```

where `xpub` is retrieved from `ProviderStore.sol` using the `providerId`, and `requesterIndex` is assigned by `RequesterStore.sol` when the requester record was created. \(For more information on deriving wallets from a private key using a path, see [HD wallets](https://github.com/ethereumbook/ethereumbook/blob/develop/05wallets.asciidoc#hd_wallets).\)

## The path convention

The path of a designated wallet for the request–response protocol is `m/0/${requesterIndex}`. This means that we assume that `requesterIndex` will be less than `2^31` \(yet this can be extended by using schemes such as `m/0/${requestInd % 2^31}/${requestInd / 2^31}`\). Other branches such as `m/1/...`, `m/2/...`, etc. are reserved for other protocols \(e.g., the pub–sub protocol\).

## The custodial nature of the designated wallets

The requester must keep it in mind that a designated wallet is custodial, i.e., the provider keeps their private key, and the funds are trusted with them. Therefore, a requester should not fund their designated wallet of a provider more than an amount that they can trust the provider with. This risk becomes negligible when:

1. The provider is a first-party oracle, because first-party oracles are trustworthy
2. The provider is being used for a high value use-case, which already implies a high level of trust

If the requester does not trust the provider at all, they can fund the designated just enough to cover a single fulfillment for each request. Therefore, this scheme both supports the traditional per-call payments, but also allows the protocol to leverage the trustworthiness of providers to reduce unnecessary gas costs caused by microtransactions.

## Withdrawals

If the requester decides that they will not use a designated wallet any longer, they can make a request to withdraw funds from it. The provider's Airnode listens for withdrawal requests and fulfills them automatically. Therefore, the requester should be able to receive their funds from their designated wallet in a few minutes notice. The designated wallet does not get deleted, and can be used in the future simply by funding it again.

## How to have the provider cover the gas costs?

Although the designated wallet scheme allows the requester to cover the fulfillment gas costs, it is just as easy to have the provider cover the gas costs. The only thing that needs to be done in this case is for the provider to top up the designated wallet, instead of the requester. Furthermore, this scheme allows hybrid use-cases where the provider covers the fulfillment gas costs for one requester \(e.g., because they have made a special service agreement with them\), while requires others to cover their own fulfillment gas costs.
