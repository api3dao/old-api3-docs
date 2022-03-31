---
title: Self-serve integration
---

# {{$frontmatter.title}}
<VersionWarning/>
<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

Assuming you have determined that your platform [is compatible](is-my-platform-compatible.md), you can attempt to do the integration yourself by following the steps below.

## Part 1: Protocol contract deployment

*Replace parts starting with `$`*

1. Clone the [Airnode monorepo](https://github.com/api3dao/airnode) (currently you need to use the `pre-alpha` branch)

```sh
git clone --single-branch --branch pre-alpha https://github.com/api3dao/airnode.git
```

2. Install its dependencies and build it

```sh
cd airnode
yarn run bootstrap
yarn run build
```

3. Go to the [protocol package](https://github.com/api3dao/airnode/tree/pre-alpha/packages/protocol)

```sh
cd packages/protocol
```

4. Create a `credentials.json` file, similar to [credentials.example.json](https://github.com/api3dao/airnode/blob/pre-alpha/packages/protocol/credentials.example.json)

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

`$MNEMONIC` is the mnemonic of the wallet that you will use to deploy the protocol contracts. Make sure that it is funded (if applicable).

`$PROVIDER_URL` is the URL of the node JSON-RPC API you will use to deploy the protocol contracts.

6. Add the following entry to [hardhat.config.js](https://github.com/api3dao/airnode/blob/pre-alpha/packages/protocol/hardhat.config.js)

```js
$CHAIN_NAME: {
      url: credentials.$CHAIN_NAME.providerUrl || '',
      accounts: { mnemonic: credentials.$CHAIN_NAME.mnemonic || '' },
    }
```

7. Add the following script to [package.json](https://github.com/api3dao/airnode/blob/pre-alpha/packages/protocol/package.json)

```json
"deploy:$CHAIN_NAME": "hardhat deploy --network $CHAIN_NAME"
```

8. Finally, run the added script to deploy the contracts, which will record the deployment details including the contract address in the [`/deployments`](https://github.com/api3dao/airnode/tree/pre-alpha/packages/protocol/deployments) directory.

```sh
yarn run deploy:$CHAIN_NAME
```

If your chain has a customized flow for deploying contracts, you can find the bytecodes of the compiled contracts in the `artifacts/` directory.

Note that you will need to deploy both [Airnode.sol](../../protocols/request-response/general-structure.md#airnode-sol) and [Convenience.sol](../../protocols/request-response/general-structure.md#convenience-sol).

## Part 2: Make a test call

After completing Part 1, you must have two contract addresses, one for `Airnode.sol` and one for `Convenience.sol`. Now follow the steps below to make a test call:

1. Clone the [airnode-starter](https://github.com/api3dao/airnode-starter/tree/pre-alpha) repo

```sh
git clone --single-branch --branch pre-alpha https://github.com/api3dao/airnode-starter.git
```

2. Open the [config.example.json](https://github.com/api3dao/airnode-starter/blob/pre-alpha/config/config.example.json) file in `config/`. Replace the following values:

    - `nodeSettings.chains.0.id`: `3` -> The ID of your chain
    - `nodeSettings.chains.contracts.Airnode`: `0xF8d32C3e53F7DA6e7CB82323f2cAB2159776b832` -> The address of the `Airnode.sol` contract you have deployed
    - `nodeSettings.chains.contracts.Convenience`: `0x1552cF617711D6Da04E0EDC9e5C26eBbA08625ac` -> The address of the `Convenience.sol` contract you have deployed

3. Follow the [instructions](https://github.com/api3dao/airnode-starter/tree/pre-alpha#setup#setup) (both Step 1 and 2). Note that you can use the `$MNEMONIC` and the `$PROVIDER_URL` you have used while deploying the contracts in your `.env` file.

The final step of the instructions is to run the `make-request` script, which will make a request on your chain for the Airnode to fulfill it. This example project working as intended is a very good indicator that the integration has succeeded. After doing this, you are recommended to take a deep dive into [our docs](https://github.com/api3dao/api3-docs) next to learn more about Airnode and its protocol.
