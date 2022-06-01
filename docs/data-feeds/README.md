---
title: API3 Data Feeds
folder: Introduction
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Data feeds are continuously updated streams of off-chain data, such as the
latest cryptocurrency, stock and commodities prices. They can power various
decentralized applications, such as DeFi lending, synthetic assets, stable
coins, derivatives, quality assurance, NFTs and more. Operated by the market’s
most trusted and reliable data providers, data feeds are a transparent, cost
efficient and scalable way for smart contracts to connect to the data they need.

API3 serves three kinds of data feeds:

<!--
- [Beacons](./#beacons): A single sourced value from an API provider operating a
  first-party Airnode oracle.
- [dAPIs](./#dapis): A virtual definition for a single Beacon or a set of
  Beacons.
  -->

- [Beacons](./#beacons): A single sourced value from an API provider operating a
  first-party Airnode oracle. A Beacon is addressed by its ID which is the hash
  of its parameters.
- [Beacon Sets](./#beacon-sets): An aggregation of Beacon values. A Beacon sets
  is addressed by its ID which is the hash of the underlying Beacon IDs.
- [dAPIs](./#dapis): A managed data feed that points to a Beacon or a Beacon
  set. A dAPI is addressed by its human-readable name which is used to easily
  acquire a single Beacon or Beacon set on-chain.

<!--
::: tip Coverage Policies

<span style="color:red;font-weight:bold">TODO: Need link to policies.</span>
Each type of data feed shown above has different [coverage policies]() with
different security guarantees.

:::-->

Use the [DapiServer.sol](./#dapiserver-sol) contract to access each of the three
data feeds.

## Beacons

Beacons are the foundation for all data feeds. Behind all Beacons are
first-party oracles run by the API data providers themselves. This means that
when calling a data feed for the latest price of an asset, a smart contract
receives a value directly from the Web3-enabled API data providers - not a
third-party or a network of third party middlemen.

Updating a Beacon is a simple and efficient system that leverages first-party
Airnodes to keep individual Beacon values up-to-date. When a Beacon's value
falls outside a pre-defined tolerance it self-updates by calling its associated
Airnode.

In the figure below, on-chain Beacons request updates from their off-chain
Airnode. The Airnode's owner (an API provider) configures the pre-defined
tolerance of a Beacon's value as well as the frequency to check for tolerance
deviation. The Beacon's value is updated when the off-chain value falls outside
the Beacons value's defined tolerance. Note that an Airnode can be related to
more than one Beacon.

> <img src="./assets/images/beacon-airnode.png" width="500px"/>

The entire implementation of Beacons was designed to be both transparent and
secure. The provider-operated nature of Beacons allows any dApp to consider the
off-chain reputation of the data provider and their suitability for any use
case. Bringing this level of transparency to the source of data in smart
contracts gives dApp developers confidence rather than relying on a pseudonymous
selection of third parties.

## Beacon Sets

A Beacon set is the aggregation of multiple Beacon values. The `DapiServer.sol`
contract aggregates the associated Beacon values when a request is made.

> <img src="./assets/images/dapi-beacons.png" width="550px"/>
>
> <p class="diagram-line" style="color:gray;margin-top:6px;">The DapiServer contract can return the aggregated value of multiple Beacons. </p>

In the diagram above a Beacon set, which defines an ETH/USD price, aggregates
values from multiple Beacons such as the CoinGecko ETH/USD value (3Gpex6g5), the
Binance ETH/USD value (1FeexV6A) and so on.

## dAPIs

To exploit the benefit of Beacons and Beacon sets, dAPIs enable dApp developers
a powerful tool to quickly acquire single or aggregated Beacon values on-chain.
dAPI data feeds add a simplicity layer atop Beacons and Beacons sets by
providing an "ENS like" name that points to either. Think of a dAPI as a virtual
definition (alias) that points to a Beacon or Beacon set.

All data feeds that API3 serves on-chain can be read from a single
[DapiServer.sol](https://github.com/api3dao/airnode-protocol-v1/blob/main/contracts/dapis/DapiServer.sol)
contract. When using a dAPI, a dAPI _name_ is required using the functions
[readDataFeedWithDapiName()](./developers/read-data-feed-with-dapi-name.md) or
[readDataFeedValueWithDapiName()](./developers/read-data-feed-value-with-dapi-name.md).

## DapiServer.sol

Developers use the on-chain contract
[DapiServer.sol](https://github.com/api3dao/airnode-protocol-v1/blob/main/contracts/dapis/DapiServer.sol)
to get a value from any of the three types of data feeds (Beacons, Beacons sets,
dAPIs). See the [dApp Developers](./developers/) section to learn more about
accessing data feeds.

The contract `DapiServer.sol` maintains a cache of on-chain Beacon values.

> <img src="./assets/images/dapp-beacon.png" width="550px"/>

A Beacon is updated when a pre-defined tolerance of the Beacon's value is
detected. Each Beacon has its own configuration parameters that define when and
how it updates.
