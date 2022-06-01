---
title: Getting Started
folder: dApp Developers
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

The
[DapiServer.sol](https://github.com/api3dao/airnode-protocol-v1/blob/v0.5.0/contracts/dapis/DapiServer.sol)
contract serves data feed values to any dApp with the appropriate permissions.
The contract is simple to use and returns immediate data feed values.

::: tip Data feed preview access

Currently access to data feeds does not require a subscription during the
current preview period.

:::

## IDs and Names

When calling the reader functions of the `DapiServer.sol` contract, use either a
Beacon ID, Beacon set ID, or a dAPI name.

- Beacon ID: The hash of a Beacon's parameters.
- Beacon set ID: The hash of the Beacon IDs in the Beacon set.
- dAPI name: A human readable name that represents a Beacon or Beacon set.

Pass an ID or dAPI name to the appropriate `DapiServer` reader function using
the following parameter names.

- `_datafeedId`: Use a Beacon ID or Beacon set ID.
- `_dapiName`: Use a dAPI name.

### Why use a dAPI `name`?

To simplify access, dAPI definitions can return a single Beacon value or the
value of a Beacon set. A dAPI data feed is a live data point associated with
`name`. This is suitable where the more recent data point (meaning its set of
Beacons could change as needed) is always more favorable, e.g., in the context
of an asset price data feed.

## Starter Project

This
[data-feed-reader-example](https://github.com/api3dao/data-feed-reader-example)
starter is an example project for reading API3 data feeds on the Polygon
testnet. Be sure to read through the
[README.md](https://github.com/api3dao/data-feed-reader-example/blob/main/README.md)
and some of the example code such as the
[DataFeedReaderExample.sol](https://github.com/api3dao/data-feed-reader-example/blob/main/contracts/DataFeedReaderExample.sol)
smart contract. Finally follow the instruction in the README to get acquainted
with reading data feeds.

## DapiServer Functions

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

## Resources

- [Chains and Contracts](../reference/chains.md): A list of chains, and
  supporting contracts, that Beacons are available on.
- [Beacon Browser](../reference/beacon-browser.md): A list of functioning
  Beacons that have been deployed.
