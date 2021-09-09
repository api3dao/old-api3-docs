---
title: Airnode
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Use Airnode to serve one or more APIs to smart contracts (requesters). Each Airnode has only one private key, which they use across all chains.

## `airnodeId`

<Fix>The airnode wallet address is now the “id” for the airnode. The airnode (address).</Fix>

<Fix>The following paragraph needs reflect teh newer Airnode address.</Fix>
Airnodes are identified by their `airnodeId`, which is the default BIP 44 wallet derived from the seed of the respective Airnode (with the path m/44'/60'/0'/0/0). An Airnode will have the same `airnodeId` across all chains.

- To derive `airnodeId` in Solidity:
    <FixInline>Check this code.</FixInline>
    ```solidity
    airnodeId = keccak256(abi.encode(masterWalletAddress));
    ```

- To derive `airnodeId ` in JS (using ethers.js):
    <FixInline>Check this code.</FixInline>
    ```js
    airnodeId = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['address'], [masterWalletAddress]));
    ```

For both of the above examples the `AirnodeWalletAddress` is the address of the wallet derived from the private key of the owner with the path `m`. (For deriving wallets from a private key using a path, see [HD wallets](https://github.com/ethereumbook/ethereumbook/blob/develop/05wallets.asciidoc#hd_wallets).) To derive the Airnode wallet address from the mnemonic in JS (using ethers.js):

```js
airnodeHdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
airnodeWalletAddress = airnodeHdNode.address;
```

## `xpub`

The Airnode owner announces their extended public key (`xpub`) as stored in `AirnodeParameterStore.sol` for sponsors to be able to derive their sponsor wallets. The `xpub` that the owner has announced is not verified on-chain. However, the sponsor can verify it off-chain. For example, in JS (using ethers.js):

```js
hdNode = ethers.utils.HDNode.fromExtendedKey(xpub);
masterNode = hdNode.derivePath('m');
airnodeIdDerivedFromXpub = keccak256(abi.encode(masterNode.address));
assert(airnodeIdDerivedFromXpub === airnodeId);
```

See the [section about sponsor wallets](sponsor-wallet.md) to see how sponsors can use `xpub` to derive their sponsor wallets.

## `setAirnodeXpub()`
<Fix>Add content about `setAirnodeXpub()`.</Fix> 

## Setting endpoint authorizers
<Fix>airnodeAdmin is no longer used. What (if anything) replaces it here?</Fix>
An important responsibility of the ~~`airnodeAdmin`~~ is to set endpoint authorizers. Authorizers are used to enforce rules about which requests will be responded to, and this can be used to enforce KYC, monthly subscription payments, etc. See the sections about [endpoints](endpoint.md) and [authorizers](authorizer.md) for more details.

