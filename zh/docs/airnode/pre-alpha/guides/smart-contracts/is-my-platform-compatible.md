---
title: Is my platform compatible?
---

# {{$frontmatter.title}}
<VersionWarning/>
<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

We are receiving an overwhelming amount of demand by teams of smart contract platforms and decentralized applications built on these about integrating Airnode to gain access to API data and services. These guides are for you to be able to self-serve to assess the feasibility of an integration, and even prototype the integration yourself.

A lot of the smart contract platforms are directly compatible with Airnode, meaning that the integration effort will be trivial and can even be done with minimal support from API3. In this guide, we will go over different factors that determine compatibility.

## EVM support

Airnode is composed of two parts: The protocol contract and the node application. The Airnode protocol contract is implemented in Solidity.

Solidity typically compiles to EVM bytecode, which means that your smart contract platform should be EVM-compatible. In theory, you can also compile Solidity into other types of bytecode (e.g., WASM) that would run natively on your smart contract platform, yet the resulting integration will need to be tested extensively.

**TL;DR** If your smart contract platform runs Solidity contracts, you are good. If it does not, the protocol will have to be implemented in the native smart contract language.

## Ethereum JSON-RPC API compatibility

The node component of the Airnode uses `ethers.js` to interact with the blockchain, which expects to communicate with an Ethereum JSON-RPC API-compatible endpoint.

Typically, chains that do not support EVM will also not be compatible in this regard. However, EVM support does not guarantee node API compatibility. You can compare your node API with the [ Ethereum JSON-RPC API](https://eth.wiki/json-rpc/API) to see if it is any different.

Here, the most obvious tell of a chain supporting the required API functionality is it being compatible with Metamask. This is because Metamask has similar requirements to Airnode. On the other hand, if your smart contract platform requires customized versions of `web3.js`, `ethers.js`, `truffle`, etc. being used, that is probably because the node API is not identical to Ethereum's.

### HTTP vs WSS

Airnode uses the HTTP endpoint to access the JSON-RPC API. Therefore, not supporting WSS endpoints/not having them widely available is not a problem.

**TL;DR** If your users can use Metamask to interact with your smart contract platform, you are good. Otherwise, the parts of Airnode that interacts with the chain will need to be customized.

## What next?

If your platform is compatible, the integration will be trivial, so you can even attempt to [do it yourself](self-serve-integration.md). Do not hesitate to drop by [our Discord](https://discord.gg/qnRrcfnm5W) and ask for support.

If your platform is not directly compatible, this means that a significant amount of development will need to be undertaken for porting Airnode to your chain. Here are some reasons to carry through with this:
- Airnode and its protocol are designed to enable standardized and set-and-forget oracle nodes. Its value-add comes from its design philosophy as much as its implementation.
- The integration effort will only cover the parts of Airnode that interact with the chain. The part that interacts with APIs does not need to be modified at all, and that constitutes roughly 50% of the node.
- Porting Airnode to your chain will make the existing API–oracle integrations made for Airnode available to your chain. Therefore, you would not only be porting a piece of software, but all the APIs that will be made available as a result.

As mentioned above, this porting effort is significant, and will require you to allocate resources. To find out about how we can help, contact us at contact@api3.org
