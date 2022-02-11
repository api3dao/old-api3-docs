---
title: ETHDenver - Feb 2022
---

<TitleSpan>Introduction</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

> **Experience building with Beacons at ETHDenver during
> [#BUIDLWEEK](https://www.ethdenver.com/buidlweek)!**

API3 has set up Beacons using the first-party oracle operated by Amberdata, and
this guide will walk you through developing a "Beacon reader" smart contract
using them.

## Dependencies

Amberdata is using [Airnode `v0.3`](/airnode/v0.3) as the oracle node, which we
have developed to enable API provider-operated oracles. You are recommended to
use `v0.1` of `@api3/services` in your project to easily fetch the information
needed to read a specific Beacon.

## Networks

The Beacons are made available on the following networks for _#BUIDLWEEK_:

| Network        | Faucet                                                                   |
| :------------- | :----------------------------------------------------------------------- |
| Goerli         | [https://faucet.goerli.mudit.blog/](https://faucet.goerli.mudit.blog/)   |
| Polygon-Mumbai | [https://faucet.polygon.technology/](https://faucet.polygon.technology/) |
| Rinkeby        | [https://www.rinkebyfaucet.com/](https://www.rinkebyfaucet.com/)         |
| Ropsten        | [https://faucet.egorfine.com/](https://faucet.egorfine.com/)             |

## Amberdata Beacons

[Amberdata](https://amberdata.io) is among the leading cryptocurreny market data
providers and has made some of their API endpoints available as Beacons, which
will be very useful in building DeFi applications. You can see the complete list
[here](../reference/beacon-ids.md). These Beacons represent VWAP (Volume
Weighted Average Price) pair values and are an aggregated form of trade data.
VWAP is the average price of an asset over a time interval, based on both volume
and price. Please see the Amberdata documentation links below for a better
understanding of the values provided.

- [Data Dictionary](https://amberdata.io/dictionary/)
- [Latest [ENT]](https://docs.amberdata.io/reference#spot-vwap-pairs-latest) -
  (VWAP)
- [Gas Predictions](https://docs.amberdata.io/reference#get-gas-predictions)

## Creating a starter project

### Using the CLI tool

The easiest way to create a new Beacon reader project is by running the
`@api3/services` CLI tool, which generates the minimal project files that will
get you started. Simply run:

```
npm exec --package @api3/services --call create-beacon-reader-app
```

The CLI tool will ask you for the path in which the project will be initialized
and the template on which the project files will be based on. As of now, there
is only one template to choose, which uses JavaScript, ethers.js and Hardhat,
yet there will be more in the future. See below for more options:

```
# To show help
npm exec --package @api3/services --call "create-beacon-reader-app --help"
# To provide the path and template directly through CLI
npm exec --package @api3/services --call "create-beacon-reader-app  --path=./my-app --template=javascript-ethers-hardhat"
```

::: warning Git needed

In order to install the `@api3/services` repository you need to have `git`
installed.

:::

### Clone or download an existing repo

Alternatively, you can clone or download the
[beacon-reader-example](https://github.com/api3dao/beacon-reader-example)
repository from GitHub. This project was created by the CLI tool mentioned
above.

This starter project steps through reading a Beacon value from a smart contract.
Be sure to read through the
[README.md](https://github.com/api3dao/beacon-reader-example/blob/main/README.md)
and the example code such as the
[BeaconReaderExample.sol](https://github.com/api3dao/beacon-reader-example/blob/main/contracts/BeaconReaderExample.sol)
smart contract.

## Services API

The `@api3/services` API exposes two functions:

1. [whitelistBeaconReader](https://github.com/api3dao/services/blob/main/src/index.ts#L66) -
   This function can be used to programatically whitelist a Beacon reader
   contract that you have implemented and deployed to read values from a
   particular Beacon. You can see it used by the whitelisting script in the
   Beacon reader example project
   [here](https://github.com/api3dao/beacon-reader-example/blob/main/scripts/whitelist-reader.js#L34).
   This functions requires 5 parameters:
   - `beaconId` - the `beaconId` for which the Beacon reader will be whitelisted
   - `beaconReaderAddress` - the address of the Beacon reader that will be
     whitelisted
   - `chain` - the name of the chain, e.g. `ropsten`
   - `providerUrl` - the URL of the blockchain provider that will be used to
     create a transaction
   - `senderAccount` - an object with two fields, `mnemonic` (required) and
     `derivationPath` (optional) specifying the account that will be used to
     make the whitelisting transaction
2. [getServiceData](https://github.com/api3dao/services/blob/main/src/index.ts#L27) -
   You can use this function to get the details of the particular Beacon. Most
   important fields are the address of `RrpBeaconServer` (which you need to
   deploy your Beacon reader smart contract) and `beaconId` (which you need to
   read a Beacon value). This function requires 3 parameters:
   - `apiName` - the
     [name of the API](https://github.com/api3dao/operations/tree/main/data/apis).
     Currently, the only option is `Amberdata`
   - `beaconName` - one of the filenames (without extension) from
     [this directory](https://github.com/api3dao/operations/tree/main/data/apis/Amberdata/beacons),
     e.g. `eth_usd`
   - `chain` - the name of the chain, e.g. `ropsten`

Using `@api3/services` is not required to create a Beacon reader application.
You can whitelist a Beacon reader smart contract manually by following the
instructions below. You can get the `beaconId` from
[Beacon IDs docs section](../reference/beacon-ids.md) and an address of the
`RrpBeaconServer` from the
[Contract Addresses docs section](../reference/contract-addresses.md).

## Beacon Whitelisting

::: warning Please Note

For _#BUIDLWEEK_, you do not need to contact an API3 DAO representative to gain
access to the Amberdata Beacons. You can whitelist yourself on the supported
testnets using a blockchain explorer compatible with the network you are working
with (e.g., [etherscan](https://etherscan.io/) or
[polygonscan](https://polygonscan.com/)).

:::

Before a smart contract can read a Beacon value, it first needs to be
whitelisted by an on-chain mechanism authorized by the API3 DAO. This is done
for protection and monetization of premium, first-party oracle services. The
Beacons set up for the hackathon allow self-whitelisting, which means that you
are allowed to make the transaction that will whitelist your contract to read
the specific Beacon.

::: warning Whitelisting works per Beacon reader

When you deploy multiple Beacon reader smart contracts, each of them needs to
whitelisted.

:::

### Whitelisting using API3 services API

If you created your application using the `@api3/services` CLI or based it on
the Beacon reader example project, you can whitelist your contract using the
`whitelist-reader` script. Refer to the
[README.md](https://github.com/api3dao/beacon-reader-example) and
[implementation](https://github.com/api3dao/beacon-reader-example/blob/main/scripts/whitelist-reader.js)
for more details.

### Self-whitelisting

Another option to self-whitelist your smart contract is by using Etherscan or
Polygonscan.

1. Open Etherscan/Polygonscan and select the desired testnet using the icon to
   the right of the Sign-In button in the top right corner.

2. Enter the address for the
   [SelfServeRrpBeaconServerWhitelister.sol](../reference/contract-addresses.md#selfserverrpbeaconserverwhitelister-sol)
   contract in the search field.

3. Click _contract > write contract > connect to web3_. Connect your wallet
   using the testnet you have selected in Etherscan/Polygonscan.

4. Select the `whitelistReader` function (#5) and enter the
   [beaconId](../reference/beacon-ids.md) and the address of your smart contract
   (i.e., Beacon reader).

5. Click the _Write_ button and execute the transaction from your wallet.

## Getting Help

If you need any assistance, please drop by the
[API3 Discord support channel](https://discord.com/channels/758003776174030948/871787274386411580).

## Work with API3

Consider working with the Core Technical Team at API3. Our search for you is
never ending. We want talented individuals that think blockchain technology is
_the big thing_, that are ready to make it better and embrace collaboration as
an endless journey. [Work with API3](/api3/introduction/work.md).
