---
title: Provider
---

A provider is an entity \(individual, business, etc.\) that operates an Airnode to serve one or more APIs to smart contracts. Each provider has only one private key, which they use across all chains.

## `providerId`

Providers are identified by their `providerId`, which is of type `bytes32`. A provider's `providerId` is derived from their private key, and there is a one-to-one mapping between the two. Since the provider uses the same private key across all chains, they will have the same `providerId` across all chains.

To derive `providerId` in Solidity:

```text
providerId = keccak256(abi.encode(masterWalletAddress));
```

To derive `providerId` in JS \(using ethers.js\):

```javascript
providerId = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['address'], [masterWalletAddress]));
```

where `masterWalletAddress` is the address of the wallet derived from the private key of the provider with the path `m`. \(For deriving wallets from a private key using a path, see [HD wallets](https://github.com/ethereumbook/ethereumbook/blob/develop/05wallets.asciidoc#hd_wallets).\) Here is an example of how one derives the master wallet address from the mnemonic in JS \(using ethers.js\):

```javascript
masterHdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
masterWalletAddress = masterHdNode.address;
```

## Creating a provider record

Before being able to serve on a chain, a provider has to have a record created. To do this, the provider's master wallet has to be used to call `createProvider()` of `ProviderStore.sol`, where the contract assigns the corresponding `providerId` as such:

```text
function createProvider(
    address admin,
    string calldata xpub
    )
    external
    payable
    override
    returns (bytes32 providerId)
    {
        providerId = keccak256(abi.encode(msg.sender));
        ...
```

Note that since `msg.sender` is used to derive the `providerId`, no one but the provider can claim their `providerId` on any chain.

This provider record creation is done automatically by Airnode. The provider only needs to fund their master wallet for it to be able to afford this transaction, and the master wallet will send the remaining funds to `providerAdmin` along with this transaction. The Airnode deployment displays instructions for how to do this, and the `masterWalletAddress` is included in the receipt that the deployer outputs for future reference.

## `providerAdmin`

`providerAdmin` is an address that is authorized to update provider-related properties \(e.g., endpoint authorizers\). Airnode sets a `providerAdmin` while creating the provider record, and this is sourced from [`config.json`](/airnode/config-json.md) under the name `providerAdminForRecordCreation`.

`providerAdmin` can transfer its authority to another address. The master wallet can reclaim the authority by calling `createProvider()` and setting another `providerAdmin`.

## `xpub`

The provider announces their extended public key \(`xpub`\) in `ProviderStore.sol` for requesters to be able to derive their designated wallets. The `xpub` that the provider has announced is not verified on-chain. However, the requester can verify it off-chain. For example, in JS \(using ethers.js\):

```javascript
hdNode = ethers.utils.HDNode.fromExtendedKey(xpub);
masterNode = hdNode.derivePath('m');
providerIdDerivedFromXpub = keccak256(abi.encode(masterNode.address));
assert(providerIdDerivedFromXpub === providerId);
```

See the [section about designated wallets](/request-response-protocol/designated-wallet.md) to see how requesters can use `xpub` to derive their designated wallets.

## Setting endpoint authorizers

An important responsibility of the `providerAdmin` is to set endpoint authorizers. Authorizers are used to enforce rules about which requests will be responded to, and this can be used to enforce KYC, monthly subscription payments, etc. See the sections about [endpoints](/request-response-protocol/endpoint.md) and [authorizers](/request-response-protocol/authorizer.md) for more details.
