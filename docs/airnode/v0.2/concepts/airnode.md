---
title: Airnode
---

<TitleSpan>Concepts and Definitions</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>
<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

Airnode is a serverless oracle node implemented with a _"set and forget"_ [philosophy](../grp-providers/airnode/design-philosophy.md).

<!-- TODO: Link why should you use Airnode -->

Airnode is capable of serving one or more APIs to it's [requesters](./requester.md) which are smart contracts on chain who request the data server by the particular Airnode. Each Airnode has a [unique mnemonic](../grp-providers/guides/build-an-airnode/configuring-airnode.md#airnodewalletmnemonic) identifying its wallet. This mnemonic is kept in secret and Airnode is publicly identified using the default [address](airnode.md#airnodeaddress) derived from the mnemonic.

## `airnodeAddress`

An Airnode is identified by the default address of a BIP 44 wallet (with the path `m/44'/60'/0'/0/0`). This address is same for all chains on which Airnode operates. You specify the wallet mnemonic in the [`secrets.env`](../grp-providers/guides/build-an-airnode/configuring-airnode.md#creating-secrets-env) file which you use when deploying the Airnode.

You can also use ethers.js to derive the `airnodeAddress` from the mnemonic for informational purposes.

<!-- TODO: This should probably be supported in the admin CLI package -->

```js
// Get the default address of the airnode-wallet using its mnemonic.
airnodeHdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
airnodeAddress = airnodeHdNode.address;
```

## `xpub`

The Airnode owner announces their extended public key (`xpub` of the hardened derivation path `m/44'/60'/0'`) off-chain for sponsors to be able to derive their [sponsor wallets](sponsor.md#sponsorwallet). This wallet will then be used by the Airnode to fulfill each request made by the requester contracts. The `xpub` that the owner has announced is not verified on-chain.

However, the sponsor can verify it off-chain. You can use the [`verify-xpub`](../reference/packages/admin-cli-commands.md#verify-airnode-xpub) command from the admin CLI.
