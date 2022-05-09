---
title: ETHDenver - Feb 2022
---

<TitleSpan>Introduction</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

> **Experience building with Beacons at ETHDenver during [#BUIDLWEEK](https://www.ethdenver.com/buidlweek)!**

This guide will walk you through developing a smart contract that uses the Beacons that API3 has set up using the first-party oracle operated by Amberdata.

## Amberdata Beacons

[Amberdata](https://amberdata.io) is among the leading cryptocurreny market data providers and has made some of their API endpoints available as Beacons for you to build DeFi applications with. You can see the complete list [here](../reference/beacon-ids.md). These Beacons represent VWAP (Volume Weighted Average Price) pair values and are an aggregated form of trade data. VWAP is the average price of an asset over a time interval, based on both volume and price. Please see the Amberdata documentation links below for a better understanding of the values provided.

- [Data Dictionary](https://amberdata.io/dictionary/)
- [Latest [ENT]](https://docs.amberdata.io/reference#spot-vwap-pairs-latest) - (VWAP)
- [Gas Predictions](https://docs.amberdata.io/reference#get-gas-predictions)

## Requirements

The Beacons are made available on the following networks:

| Network        | Faucet                                                                   |
|:-------------- |:------------------------------------------------------------------------ |
| Ropsten        | [https://faucet.egorfine.com/](https://faucet.egorfine.com/)             |
| Rinkeby        | [https://www.rinkebyfaucet.com/](https://www.rinkebyfaucet.com/)         |
| Goerli         | [https://faucet.goerli.mudit.blog/](https://faucet.goerli.mudit.blog/)   |
| Polygon-Mumbai | [https://faucet.polygon.technology/](https://faucet.polygon.technology/) |

Choose the network that you want to work on, create a wallet with a mnemonic, and fund it from the respective faucet.

::: tip

You can run `npx @api3/airnode-admin generate-mnemonic` to generate a mnemonic.

:::

You will also need a blockchain provider URL. You can create a free [Infura](https://infura.io/) account for Ropsten, Rinkeby and Goerli, or use one of the [publicly available provider URLs](https://docs.polygon.technology/docs/develop/network-details/network/) for Polygon-Mumbai such as `https://rpc-mumbai.matic.today`. Your wallet mnemonic and blockchain provider URL will go in your `credentials.json` file in the following steps.

## Instructions

Clone the [Beacon reader example](https://github.com/api3dao/beacon-reader-example):

```sh
git clone https://github.com/api3dao/beacon-reader-example.git
cd beacon-reader-example
```

Install the dependencies:

```sh
npm install
```

### Tests

Run the unit tests defined in the `test/` directory:

```sh
npm run test
```

### Network: `localhost`

Start a local Ethereum node on a separate terminal:

```sh
npm run eth-node
```

Deploy `MockRrpBeaconServer`, `BeaconReaderExample`, and mock-set a beacon value:

```sh
npm run deploy:localhost
```

You can skip the whitelisting step on `localhost`.

Have `BeaconReaderExample` read the mocked beacon value and print it on the terminal:

```sh
npm run read-beacon:localhost
```

### Networks: `ropsten`, `rinkeby`, `goerli`, `polygon-mumbai`

Create a `credentials.json` file at the root of the repo, similar to `credentials.example.json`. Fill in the mnemonic and the provider URL for the chain you will be working on.

::: tip

You can replace `polygon-mumbai` in the following commands with `ropsten`, `rinkeby` or `goerli`.

:::

Deploy `BeaconReaderExample` that is pointed to the pre-deployed `RrpBeaconServer`:

```sh
npm run deploy:polygon-mumbai
```

Whitelist the `BeaconReaderExample` you have deployed for the `ETH/USD` Beacon powered by Amberdata:

```sh
npm run whitelist-reader:polygon-mumbai
```

Have `BeaconReaderExample` read the Beacon value and print it on the terminal:

```sh
npm run read-beacon:polygon-mumbai
```

::: tip

You can read Beacons other than `ETH/USD` by modifying `scripts/whitelist-reader.js` and `scripts/read-beacon.js`. Refer to the [Beacons IDs](../reference/beacon-ids.md) doc for a complete list.

:::

This should get you started on building a project that uses Beacons! Continue reading if you want to learn more.

## Dependencies

Amberdata is using [Airnode `v0.3`](/airnode/v0.3) as the oracle node, which we have developed to enable API provider-operated oracles. You are recommended to use `v0.1` of `@api3/services` in your project to easily fetch the information about a specific Beacon.

## `@api3/services` API

The `@api3/services` API exposes two functions:

1. [whitelistBeaconReader](https://github.com/api3dao/services/blob/main/src/index.ts#L66) - This function can be used to programatically whitelist a Beacon reader contract that you have implemented and deployed to read values from a particular Beacon. You can see it used by the whitelisting script in the Beacon reader example project [here](https://github.com/api3dao/beacon-reader-example/blob/main/scripts/whitelist-reader.js#L34). This function requires 5 parameters:
   - `beaconId` - the ID of the Beacon for which the Beacon reader will be whitelisted
   - `beaconReaderAddress` - the address of the Beacon reader that will be whitelisted
   - `chain` - the name of the chain, e.g. `ropsten`
   - `providerUrl` - the URL of the blockchain provider that will be used to create a transaction
   - `senderAccount` - an object with two fields, `mnemonic` (required) and `derivationPath` (optional) specifying the account that will be used to make the whitelisting transaction
2. [getServiceData](https://github.com/api3dao/services/blob/main/src/index.ts#L27) - You can use this function to get the details of a particular Beacon. The most important fields that this will return are the address of `RrpBeaconServer` (which you need to deploy your Beacon reader smart contract) and `beaconId` (which you need to read a Beacon value). This function requires 3 parameters:
   - `apiName` - the [name of the API](https://github.com/api3dao/operations/tree/main/data/apis). Currently, the only option is `Amberdata`
   - `beaconName` - the name of one of the [beacons](https://docs.api3.org/beacon/v0.1/reference/beacon-ids.html), e.g. `ETH/USD`
   - `chain` - the name of the chain, e.g. `ropsten`

Using `@api3/services` is not required to create a Beacon reader application. You can whitelist a Beacon reader smart contract manually by following the instructions below. You can get the `beaconId` from [Beacon IDs Section](../reference/beacon-ids.md) and an address of the `RrpBeaconServer` from the [Contract Addresses Section](../reference/contract-addresses.md).

## Whitelisting

Before a smart contract can read a Beacon value, it needs to be whitelisted by an on-chain mechanism authorized by the API3 DAO. This is done for protection and monetization of premium, first-party oracle services. The Beacons set up for the hackathon allow self-whitelisting, which means that you are allowed to make the transaction that will whitelist your contract to read the specific Beacon.

::: tip

Amberdata Beacons are made available on a number of testnets for _#BUIDLWEEK_. For production usage, you will need to get in contact with an API3 DAO representative to have your contract whitelisted for it to be able to read Beacons.

:::

### Manual whitelisting

In addition to using the `@api3/services` API, you can manually whitelist your contracts by making a transaction over a block explorer.

1. Open [Etherscan](https://etherscan.io/)/[Polygonscan](https://polygonscan.com/) and select the desired testnet using the icon to the right of the Sign-In button in the top right corner.

2. Enter the address for the [SelfServeRrpBeaconServerWhitelister](../reference/contract-addresses.md#selfserverrpbeaconserverwhitelister-sol) contract in the search field.

3. Click _contract > write contract > connect to web3_. Connect your wallet using the testnet you have selected in Etherscan/Polygonscan.

4. Select the `whitelistReader` function (#5) and enter the [beaconId](../reference/beacon-ids.md) and the address of your smart contract (i.e., Beacon reader).

5. Click the _Write_ button and execute the transaction from your wallet.

::: warning

Each deployed Beacon reader contract needs to be whitelisted for all the respective Beacons that it will read.

:::

## Getting Help

If you need any assistance, please drop by the [API3 Discord support channel](https://discord.com/channels/758003776174030948/871787274386411580).

## Work with API3

Consider working with the Core Technical Team at API3. Our search for you is never ending. We want talented individuals that think blockchain technology is _the big thing_, that are ready to make it better and embrace collaboration as an endless journey. [Work with API3](/api3/introduction/work.md).
