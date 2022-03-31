---
title: What is a Beacon?
---

<TitleSpan>Introduction</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

Beacons are first-party Web3 data feeds run by the API data providers themselves, without third-party oracle nodes as middlemen. Beacons allow smart contract developers to connect their Web3 applications to continuously updated streams of off-chain data, such as the latest cryptocurrency, stock and commodities prices. They can power various decentralized applications, such as DeFi lending, synthetic assets, stable coins, derivatives, quality assurance, NFTs and more. Operated by the market’s most trusted and reliable data providers, Beacons are a transparent, cost efficient and scalable way for smart contracts to connect to the data that they need.

To achieve a completely transparent and secure design, Beacons are operated directly by the API provider of the data they serve, without third-party node operators used as data relayers. This means that when calling a Beacon for the latest price of an asset, your smart contract receives a value directly from the Web3-enabled API of the source data provider - not a third-party or a network of third party middlemen.

The provider-operated nature of Beacons allows any dApp to consider the off-chain reputation of the data provider and their suitability for any use case. Bringing this level of transparency to the source of data in smart contracts gives dApp developers confidence rather than relying on a pseudonymous selection of third parties.

## Simple Implementation

The Beacon Server contract (_RrpBeaconServer.sol_) maintains a cache of on-chain Beacon values readily available for smart contracts to retrieve instantly as illustrated in figure below. A Beacon is updated when a pre-defined tolerance of the Beacon's value is detected. Each Beacon has its own configuration parameters that define when and how it updates. See the [readBeacon()](./functions/read-beacon.md) function doc and learn how your smart contract can access a Beacon .

> ![dapp-beacon.png](./assets/images/dapp-beacon.png)

## Airnode Enabled

Making it all work is a simple and efficient system that leverages first-party Airnodes to keep individual Beacon values up-to-date. When a Beacon's value falls outside a pre-defined tolerance it self-updates by calling its associated Airnode.

In the figure below, on-chain Beacons request updates from their linked off-chain Airnode. The Airnode's owner (an API provider) configures the pre-defined tolerance of a Beacon's value as well as the frequency to check for tolerance deviation. The Beacon's value is updated when the off-chain value falls outside the Beacons value's defined tolerance. Note that a Airnode can be related to more than one Beacon.

> ![beacon-airnode.png](./assets/images/beacon-airnode.png)

## dAPIs (Building on Beacons)

To further exploit the benefit of Beacons, forthcoming dAPIs will enable dApp developers a powerful new tool to quickly acquire aggregated Beacon values on-chain.

dAPIs, like Beacons, are data feeds built entirely on-chain by aggregating data from more than one Beacon. Because they are built on top of the Beacon layer their data is also from first-party API provider _owned and operated Airnodes_.

::: tip dAPIs are under development for a pending release.

&nbsp;

:::

> ![beacon-airnode.png](./assets/images/dapi-beacons.png)
> 
> <p class="diagram-line" style="color:gray;margin-top:6px;">A dApp would call a dAPI, as it would a Beacon, to get an instant
> response.</p>
dAPIs consume data from Beacons in order to provide an aggregate value. For example, in the diagram above there could be a dAPI for the ETH/USD price where it fetches different prices from multiple Beacons such as a CoinGecko ETH/USD beacon value, a Binance ETH/USD beacon value and so on. Such an dAPI would aggregate and provide a value for the ETH/USD pair. This is just one use case for a dAPI from endless possibilities.
