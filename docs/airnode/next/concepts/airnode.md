---
title: Airnode
---
<TitleSpan>Concepts and Definitions</TitleSpan>
# {{$frontmatter.title}}


<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Use Airnode to serve one or more APIs to smart contracts (requesters). An Airnode has only one identifier (airnodeAddress), which is used across all chains.

## `airnodeAddress`

An Airnode is identified by the default address of a BIP 44 wallet (with the path m/44'/60'/0'/0/0). 

To accomplish this an Airnode is assigned a mnemonic which is used to derived a wallet, known as the `airnode-wallet`. The wallet's default address becomes the Airnode's identifier, know as the `airnodeAddress` which is used to identify the Airnode across all chains.

The process by which this happens is simple:

- The API provider uses the [deployer's](../../deployer-commands.md#deploy) `deploy` command to create a new Airnode and supplies a mnemonic defined in the config.json as `nodeSettings.airnodeWalletMnemonic`.
- `deploy` uses the supplied mnemonic to generate the `airnode-wallet`.
- `deploy` uses the default address of the `airnode-wallet` as the `airnodeAddress`.
- `deploy` returns output which includes the `airnodeAddress`.

You can also use ethers.js to derive the `airnodeAddress` from the mnemonic for informational purposes.

```js
// Get the default address of the airnode-wallet using its mnemonic.
airnodeHdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
airnodeAddress = airnodeHdNode.address; 
```

## `xpub`

The Airnode owner announces their extended public key (`xpub`) as stored in `AirnodeParameterStore.sol` for sponsors to be able to derive their sponsor wallets. The `xpub` that the owner has announced is not verified on-chain. However, the sponsor can verify it off-chain. For example, in JS (using ethers.js):

```js
hdNode = ethers.utils.HDNode.fromExtendedKey(xpub);
masterNode = hdNode.derivePath('m');
airnodeAddressDerivedFromXpub = keccak256(abi.encode(masterNode.address));
assert(airnodeAddressDerivedFromXpub === airnodeAddress);
```

See the [section about sponsor wallets](sponsor-wallet.md) to see how sponsors can use `xpub` to derive their sponsor wallets.

## `setAirnodeXpub()`
<Fix>Add content about `setAirnodeXpub()`.</Fix> 

## Setting endpoint authorizers
<Fix>airnodeAdmin is no longer used. What (if anything) replaces it here?</Fix>
<Fix>This should probably be removed and addressed in Authorizers.</Fix>
An important responsibility of the ~~`airnodeAdmin`~~ is to set endpoint authorizers. Authorizers are used to enforce rules about which requests will be responded to, and this can be used to enforce KYC, monthly subscription payments, etc. See the sections about [endpoints](endpoint.md) and [authorizers](authorization.md) for more details.

