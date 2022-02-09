---
title: ETHDenver - Feb 2022
---

<TitleSpan>Introduction</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Experience API3 **Beacons** at ETHDenver (February 11-20, 2022) during
[#BUIDLWEEK](https://www.ethdenver.com/buidlweek).

## Versions

API3 has set up Beacons (supported by Airnodes) using the following versions.

- Airnode version `v0.3.1`
- Beacon version `v0.1.0`

## Contract Addresses

Access Beacons using the appropriate `RrpBeaconServer.sol` contract address for
the network you choose to work with. Specific network addresses are in the
[Contract Addresses](../reference/contract-addresses.md) doc. For _#BUIDLWEEK_
please use any of the following networks.

| Network        | Faucet                                                                   |
| :------------- | :----------------------------------------------------------------------- |
| Goerli         | [https://faucet.goerli.mudit.blog/](https://faucet.goerli.mudit.blog/)   |
| Polygon-Mumbai | [https://faucet.polygon.technology/](https://faucet.polygon.technology/) |
| Rinkeby        | [https://www.rinkebyfaucet.com/](https://www.rinkebyfaucet.com/)         |
| Ropsten        | [https://faucet.egorfine.com/](https://faucet.egorfine.com/)             |

## Amberdata Beacons

[Amberdata](https://amberdata.io) has connected some of their great API
endpoints to API3 Beacons for _#BUIDLWEEK_. See the
[Beacon IDs](../reference/beacon-ids.md) doc for a list of beaconIds used to
access Beacon values with the `RrpBeaconServer.sol` contract function
[readBeacon()](../functions/read-beacon.md).

The Amberdata Beacon values provided for the hackathon are VWAP (Volume Weighted
Average Price) pair values and are an aggregated form of trade data. VWAP is the
average price of an asset over a time interval, based on both volume and price.
Please see the Amberdata documentation links below for a better understanding of
the values provided.

- [Data Dictionary](https://amberdata.io/dictionary/)
- [Latest [ENT]](https://docs.amberdata.io/reference#spot-vwap-pairs-latest) -
  (VWAP)
- [Gas Predictions](https://docs.amberdata.io/reference#get-gas-predictions)

## Creating a starter project

### Using a CLI tool

The easiest way to create a new project is by running a CLI tool, which
generates the minimal project files that will get you started with building your
application based on beacons. Simply run:

```
npx --package @api3/services --call create-beacon-reader-app
```

The CLI tool will ask you for path in which to initialize the project and
template on which the project files are based. As of now, there is only one
template to choose (using javascript + hardhat), but there will be more
templates in the future. You can also show help or pass the arguments directly:

```
# To show help
npx --package @api3/services --call "create-beacon-reader-app --help"
# To provide the path and template directly through CLI
npx --package @api3/services --call "create-beacon-reader-app  --path=./my-app --template=javascript-ethers-hardhat"
```

::: warning Git needed

In order to install the `@api3/services` repository you need to have `git`
installed.

:::

### Clone or download an existing repo

Alternatively, you can clone or download the
[beacon-reader-example](https://github.com/api3dao/beacon-reader-example)
repository from GitHub. This project was created by the services CLI tool
mentioned above.

This starter project steps through reading a Beacon value from a smart contract.
Be sure to read through the
[README.md](https://github.com/api3dao/beacon-reader-example/blob/main/README.md)
and some of the example code such as the
[BeaconReaderExample.sol](https://github.com/api3dao/beacon-reader-example/blob/main/contracts/BeaconReaderExample.sol)
smart contract.

## Services API

The `@api3/services` API exposes two functions:

1. [whitelistBeaconReader](https://github.com/api3dao/services/blob/main/src/index.ts#L66) -
   This function can be used to programatically whitelist a beacon reader to
   read values from a particular beacon. You can see it used by the whitelisting
   script in the beacon reader example project
   [here](https://github.com/api3dao/beacon-reader-example/blob/main/scripts/whitelist-reader.js#L34).
   This functions requires 5 parameters:
   - `beaconId` - the `beaconId` to be whitelisted
   - `beaconReaderAddress` - the address of the beacon reader contract that you
     implemented and deployed
   - `chain` - the name of the chain, e.g. `ropsten`
   - `providerUrl` - the URL of the blockchain provider that should be used to
     create a transaction
   - `senderAccount` - an object with two fields, `mnemonic` (required) and
     `derivationPath` (optional) specifying an account that should be used to
     make the whitelisting transaction
2. [getServiceData](https://github.com/api3dao/services/blob/main/src/index.ts#L27) -
   You can use this function to get the details of the particular beacon. Most
   important fields are address of `RrpBeaconServer` (which you need to deploy
   the beacon reader smart contract) and `beaconId` (which you need to read a
   beacon value). This function requires 3 parameters:
   - `apiName` - The
     [name of the api](https://github.com/api3dao/operations/tree/main/data/apis).
     Currently, only option is `Amberdata`
   - `beaconName` - one of the filenames (without extension) from
     [this directory](https://github.com/api3dao/operations/tree/main/data/apis/Amberdata/beacons),
     e.g. `eth_usd`
   - `chain` - the name of the chain, e.g. `ropsten`

However, using the services API is not required to create an beacon reader
application. You can whitelist a beacon reader smart contract manually. You can
also get the `beaconId` from
[beacon IDs docs section](../reference/beacon-ids.md) and an address of the
`RrpBeaconServer` from the
[Contract Addresses docs section](../reference/contract-addresses.md).

## Beacon Whitelisting

::: warning Please Note

For _#BUIDLWEEK_ you do not need to contact the API3 Business Development Team
for access to the Amberdata Beacons. You can whitelist yourself on the supported
testnets using the respective blockchain explorer of the testnet
([etherscan](https://etherscan.io/) or [polygonscan](https://polygonscan.com/)).

:::

Before a smart contract can read a beacon value, it first needs to be
whitelisted. This is a way for API providers to protect and monetize their data.
For production there will be different means of whitelisting. However, for the
hackaton all of the Amberdata endpoints can be self-whitelisted. This means that
when you deploy a smart contract that reads the beacon value you can whitelist
that beacon yourself.

::: warning Whitelisting works per beacon reader

When you deploy multiple beacon reader smart contracts, each of them needs to
whitelisted. However, you need to whitelist a particular beacon reader only
once.

:::

### Whitelisting using API3 services API

If you created your application using the service CLI or downloaded beacon
reader example project, you can whitelist it using `whitelist-reader` script.
Refer to the [README.md](https://github.com/api3dao/beacon-reader-example) and
[implementation](https://github.com/api3dao/beacon-reader-example/blob/main/scripts/whitelist-reader.js)
for more details.

### Self Whitelisting

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
   (reader).

5. Select the _Write_ button and execute the transaction from your wallet.

## Work with API3

Consider working with the Core Development Team at API3. Our search for you is
never ending. We want talented individuals that think blockchain technology is
_the big thing_, that are ready to make it better and embrace collaboration as
an endless journey. [Work with API3](/api3/introduction/work.md).
