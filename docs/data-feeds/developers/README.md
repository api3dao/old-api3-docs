---
title: Getting Started
folder: dApp Developers
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

[DapiServer.sol](hhttps://github.com/api3dao/airnode-protocol-v1/blob/v0.5.0/contracts/dapis/DapiServer.sol)
serves Beacon values sourced from a Beacon's underlying Airnode. dAPI
definitions can return a single Beacon value or the value of a Beacon set. A
dAPI data feed is a live data point associated with a `datafeedId` (which is
derived from a `templateId` and `airnode` address) or a `name`. This is suitable
where the more recent data point is always more favorable, e.g., in the context
of an asset price data feed.

dAPI Data feeds are single-Airnode data feeds that can be used individually or
combined to build decentralized data feeds.

- [readDataFeedWithId()](./read-data-feed-with-id.md) - Returns a value and
  timestamp using the `_datafeedId`.
- [readDataFeedWithDapiName()](./read-data-feed-with-dapi-name.md) - Returns a
  value and timestamp using the `_dapiName`.
- [readDataFeedValueWithId()](./read-data-feed-value-with-id.md) - Returns a
  value using the `_datafeedId`.
- [readDataFeedValueWithDapiName()](./read-data-feed-value-with-dapi-name.md) -
  Returns a value using the `_dapiName`.
- [readerCanReadDataFeed()](./reader-can-read-datafeed.md) - Whether a reader
  can read a data feed.
- [dataFeedIdToReaderToWhitelistStatus()](./data-feed-id-to-reader-to-whitelist-status.md) -
  Details about the whitelist status of a reader address.

## Starter Project

::: danger TODO:

When BEC-183 (Beacon Reader Example) is ready this section requires updating.

:::

## Resources

- [Chains and Contracts](../reference/chains.md): A list of chains, and
  supporting contracts, that Beacons are available on.
- [Beacon Browser](../reference/beacon-browser.md): A list of functioning
  Beacons that have been deployed.
