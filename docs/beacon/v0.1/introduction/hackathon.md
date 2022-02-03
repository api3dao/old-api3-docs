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

## Beacon Whitelisting

::: warning Please Note

For _#BUIDLWEEK_ you do not need to contact the API3 Business Development Team
for access to the Amberdata Beacons. You can whitelist yourself on the supported
testnets using [etherscan](https://etherscan.io/).

:::

### Self Whitelisting

You self-whitelist your smart contract using etherscan.

1. Open Etherscan and select the desired testnet using the icon to the right of
   the Sign-In button in the top right corner.

2. Enter the address for the
   [SelfServeRrpBeaconServerWhitelister.sol](../reference/contract-addresses.md#selfserverrpbeaconserverwhitelister-sol)
   contract in the search field.

3. Click _contract > write contract > connect to web3_. Connect your wallet
   using the testnet you have selected in Etherscan.

4. Select the `whitelistReader` function (#5) and enter the
   [beaconId](../reference/beacon-ids.md) and the address of your smart contract
   (reader).

5. Select the Write button and execute the transaction from your wallet.

## Work with API3

Consider working with the Core Development Team at API3. Our search for you is
never ending. We want talented individuals that think blockchain technology is
_the big thing_, that are ready to make it better and embrace collaboration as
an endless journey. [Work with API3](/api3/introduction/work.md).
