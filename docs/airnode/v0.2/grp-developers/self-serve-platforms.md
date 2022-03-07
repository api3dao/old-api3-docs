---
title: Self-Serve Smart Contract Platforms
---

# {{$frontmatter.title}}

<VersionWarning/>
<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Airnode is composed of two parts: the off-chain **Airnode** (a.k.a. "the node")
deployed as self hosted or cloud provider functions, e.g., AWS) and the on-chain
**protocol contract** AirnodeRrp.sol. API3 has deployed the AirnodeRrp.sol
protocol contract to several EVM-compatible blockchains. An API provider deploys
an Airnode application to a cloud provider which can communicate with one or
more AirnodeRrp.sol protocol contracts on different blockchains.

> ![2-parts](../assets/images/airnode-is-2-parts.png) <br/><br/>
>
> <p class="diagram-line" style="color:black;">Airnode is composed of two parts: the off-chain <b>Airnode</b> (a.k.a. "the node") deployed usually as cloud provider functions, e.g., AWS) and the on-chain protocol contract <b>AirnodeRrp.sol</b>.</p>

## Is my platform compatible?

The [Airnode contract addresses](../reference/airnode-addresses.md) doc lists
all EVM compatible blockchains (smart contract platforms) that API3 has deployed
the `AirnodeRrp.sol` protocol contract on.

This does not mean only these chains can be used. If you are using a smart
contract platform that does not have the _AirnodeRrp.sol protocol contract_
deployed by API3 you could add it yourself. API3 has received requests by teams
of smart contract platforms and decentralized applications built on them to
integrate Airnode and thus gaining access to API data and services. A lot of the
smart contract platforms are directly compatible with Airnode, meaning that the
integration effort will be trivial and can even be done with minimal support
from API3.

This document enables you to "self-serve" and assess the feasibility of an
integration, and even prototype the integration yourself.

## EVM Support

Let's go over different factors that determine compatibility. Airnode is
composed of two parts: the off-chain **Airnode** (a.k.a. "the node") deployed as
self hosted or cloud provider functions, e.g., AWS) and the on-chain **protocol
contract** AirnodeRrp.sol. The protocol contract is implemented in Solidity.

Solidity typically compiles to EVM bytecode, which means that your smart
contract platform should be EVM-compatible. In theory, you can also compile
Solidity into other types of bytecode (e.g., WASM) that would run natively on
your smart contract platform, yet the resulting integration will need to be
tested extensively. So if your smart contract platform runs Solidity contracts,
you are good. If it does not, the protocol will have to be implemented in the
native smart contract language.

If your platform is not directly compatible, this means that a significant
amount of development will need to be undertaken to port Airnode on your chain.
To learn more about how API3 can help, contact us at contact@api3.org. The
following list details some reasons to carry through with this.

- Airnode and its protocol are designed to enable standardized and
  set-and-forget oracle nodes. Its value-add comes from its design philosophy as
  much as its implementation.
- The integration effort will only cover the parts of Airnode that interact with
  the chain. The part that interacts with APIs does not need to be modified at
  all, and that constitutes roughly 50% of the node.
- Porting Airnode to your chain will make the existing API–oracle integrations
  made for Airnode available to your chain. Therefore, you would not only be
  porting a piece of software, but all the APIs that will be made available as a
  result.

## Ethereum JSON-RPC API Compatibility

The Airnode application part of Airnode uses `ethers.js` to interact with the
blockchain, which expects to communicate with an Ethereum JSON-RPC
API-compatible endpoint.

Typically, chains that do not support EVM will also not be compatible in this
regard. However, EVM support does not guarantee blockchain node API
compatibility. You can compare your blockchain node API with the
[ Ethereum JSON-RPC API](https://eth.wiki/json-rpc/API) to see if it is any
different.

The most obvious sign of a chain supporting the required API functionality is it
being compatible with Metamask. This is because Metamask has similar
requirements as Airnode. On the other hand, if your smart contract platform
requires customized versions of _web3.js, ethers.js, truffle, etc._ being used,
that is probably because the blockchain node API is not identical to Ethereum's.

## HTTP vs WSS

The Airnode application uses the HTTP endpoint to access the JSON-RPC API.
Therefore, not supporting WSS endpoints/not having them widely available is not
a problem. So if your users can use Metamask to interact with your smart
contract platform, you are good. Otherwise, the parts of Airnode application
that interacts with the chain will need to be customized.

## Next Steps

Assuming you have determined that your smart contract platform can support
Airnode, you can attempt the integration yourself by following the steps below.
Do not hesitate to drop by [our Discord](https://discord.gg/qnRrcfnm5W) and ask
for support.

### Part 1: Protocol contract deployment

_Replace parts starting with `$`_

1. Clone the [Airnode monorepo](https://github.com/api3dao/airnode) (use the
   `v0.2` branch).

```sh
git clone --single-branch --branch v0.2 https://github.com/api3dao/airnode.git
```

2. Install its dependencies and build it

```sh
cd airnode
yarn run bootstrap
yarn run build
```

3. Go to the
   [protocol package](https://github.com/api3dao/airnode/tree/v0.2/packages/airnode-protocol)

```sh
cd packages/airnode-protocol
```

4. Create a `credentials.json` file, similar to
   [credentials.example.json](https://github.com/api3dao/airnode/blob/v0.2/packages/airnode-protocol/credentials.example.json)

```sh
cp credentials.example.json credentials.json
```

5. Add the following entry to `credentials.json`

```json
"$CHAIN_NAME" :{
  "mnemonic": "$MNEMONIC",
  "providerUrl": "$PROVIDER_URL"
}
```

`$CHAIN_NAME` is the name that will be used to refer to your chain.

`$MNEMONIC` is the mnemonic of the wallet that you will use to deploy the
protocol contracts. Make sure that it is funded (if applicable).

`$PROVIDER_URL` is the URL of the node JSON-RPC API you will use to deploy the
protocol contracts.

6. Add the following entry to
   [hardhat.config.js](https://github.com/api3dao/airnode/blob/v0.2/packages/airnode-protocol/hardhat.config.js)

```js
$CHAIN_NAME: {
      url: credentials.$CHAIN_NAME.providerUrl || '',
      accounts: { mnemonic: credentials.$CHAIN_NAME.mnemonic || '' },
    }
```

7. Add the following script to
   [package.json](https://github.com/api3dao/airnode/blob/v0.2/packages/airnode-protocol/package.json)

```json
"deploy:$CHAIN_NAME": "hardhat deploy --network $CHAIN_NAME"
```

8. Finally, run the added script to deploy the contracts, which will record the
   deployment details including the contract address in the
   [`/deployments`](https://github.com/api3dao/airnode/tree/v0.2/packages/airnode-protocol/deployments)
   directory.

```sh
yarn run deploy:$CHAIN_NAME
```

If your chain has a customized flow for deploying contracts, you can find the
bytecodes of the compiled contracts in the `artifacts/` directory.

### Part 2: Make a test call

After completing Part 1, you must have two contract addresses, one for
`AirnodeRrp.sol` and one for `Convenience.sol`. Now follow the steps below to
make a test call:

1. Clone the
   [airnode-starter](https://github.com/api3dao/airnode-starter/tree/pre-alpha)
   repo

```sh
git clone --single-branch --branch 0.1.0 https://github.com/api3dao/airnode-starter.git
```

2.  Open the
    [config.example.json](https://github.com/api3dao/airnode-starter/blob/pre-alpha/config/config.example.json)
    file in `config/`. Replace the following values:

        - `nodeSettings.chains.0.id`: `3` -> The ID of your chain
        - `nodeSettings.chains.contracts.Airnode`: `0xF8d32C3e53F7DA6e7CB82323f2cAB2159776b832` -> The address of the `AirnodeRRP.sol` contract you have deployed
        - `nodeSettings.chains.contracts.Convenience`: `0x1552cF617711D6Da04E0EDC9e5C26eBbA08625ac` -> The address of the `Convenience.sol` contract you have deployed

3.  Follow the
    [instructions](https://github.com/api3dao/airnode-starter/tree/pre-alpha#setup#setup)
    (both Step 1 and 2). Note that you can use the `$MNEMONIC` and the
    `$PROVIDER_URL` you have used while deploying the contracts in your `.env`
    file.

The final step of the instructions is to run the `make-request` script, which
will make a request on your chain for the Airnode to fulfill it. This example
project working as intended is a very good indicator that the integration has
succeeded. After doing this, you are recommended to take a deep dive into more
of these docs to learn more about Airnode.
