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
contract serves dAPI values to any dApp with the appropriate
[coverage policy](https://forms.monday.com/forms/embed/f44d0ed9dfd0154885f48fdb3b87a489?r=use1).
The contract is simple to use and returns immediate data feed values.

## Starter Project

The
[data-feed-reader-example](https://github.com/api3dao/data-feed-reader-example)
starter is an example project for reading from dAPI a on the Polygon testnet. Be
sure to read through the
[README.md](https://github.com/api3dao/data-feed-reader-example/blob/main/README.md)
and some of the example code such as the
[DataFeedReaderExample.sol](https://github.com/api3dao/data-feed-reader-example/blob/main/contracts/DataFeedReaderExample.sol)
contract. Read through this entire page before running the starter project to
better understand some of the terms and concepts mentioned. Finally follow the
instruction in the README to get acquainted with reading data feeds.

## Coverage Policies

`DapiServer.sol` will check that the requester has a cover policy for each dAPI
it may attempt to read. During the _preview period_, all dAPIs on production
networks have free access (limited time offer). Please go to the
[dAPI Coverage Policy](https://forms.monday.com/forms/embed/f44d0ed9dfd0154885f48fdb3b87a489?r=use1)
page to request dAPI access on production networks. See
[Chains and Contracts](../reference/chains.md) which includes supported
production networks as well as testnets.

### Testnets

For testnets like polygon-testnet, developers can _self-enable_ the use of any
dAPI. During the deployment flow of your smart contract that reads a data feed,
add code that self-enables the desired dAPI. The following scripts from the
[Starter Project](./#starter-project) detail how this is done. Please be sure to
explore the starter project in its entirety.

- [allow-to-read-with-name.js](https://github.com/api3dao/data-feed-reader-example/blob/main/scripts/allow-to-read-with-name.js)
- [allow-to-read-with-id.js](https://github.com/api3dao/data-feed-reader-example/blob/main/scripts/allow-to-read-with-id.js)

## dAPI `names`

A dAPI is a live data point associated with human readable `name`. dAPI
definitions simplify access and can return aggregated Beacon values or a single
Beacon value. This is suitable where the more recent data point (meaning its set
of Beacons could change as needed) is always more favorable, e.g., in the
context of an asset price data feed.

Pass a dAPI `name` to the appropriate `DapiServer.sol` reader function.

- [readDataFeedWithDapiName(\_dapiName)](./read-data-feed-with-dapi-name.md) -
  returns a value and timestamp
- [readDataFeedValueWithDapiName(\_dapiName)](./read-data-feed-value-with-dapi-name.md) -
  returns a value

```solidity
// Calling a dAPI, such as AVAX/USD, using the DapiServer contract.
(value, timestamp) =
  IDapiServer(_dapiServerContractAddress).readDataFeedWithDapiName('AVAX/USD');
```

::: tip Optionally use Beacon and Beacon set IDs

As an alternative to calling a dAPI by it name, it is possible to use a Beacon
or Beacon set ID known as a `datafeedId`. See
[readDataFeedId()](./read-data-feed-with-id.md) and
[readDataFeedValueById()](./read-data-feed-value-with-id.md). However the
preferred method is to use a dAPI `name'.

:::

## DapiServer Functions

- [readDataFeedWithDapiName()](./read-data-feed-with-dapi-name.md) - Returns a
  value and timestamp using the `_dapiName`.
- [readDataFeedValueWithDapiName()](./read-data-feed-value-with-dapi-name.md) -
  Returns a value using the `_dapiName`.
- [readerCanReadDataFeed()](./reader-can-read-datafeed.md) - Whether a reader
  can read a dAPI, Beacon, or Beacon set.
- [dataFeedIdToReaderToWhitelistStatus()](./data-feed-id-to-reader-to-whitelist-status.md) -
  Details about the coverage policy status of a reader address for a dAPI,
  Beacon, or Beacon set.
- [readDataFeedWithId()](./read-data-feed-with-id.md) - Returns a value and
  timestamp using a Beacon or Beacon set ID . Use as an option to reading a
  value using the dAPI `name` which is the preferred method.
- [readDataFeedValueWithId()](./read-data-feed-value-with-id.md) - Returns a
  value using a Beacon or Beacon set ID . Use as an option to reading a value
  using the dAPI `name` which is the preferred method.

## Resources

- [Chains and Contracts](../reference/chains.md): A list of chains, and
  supporting contracts, that Beacons are available on.
- [Beacon Browser](../reference/beacon-browser.md): A list of functioning
  Beacons that have been deployed.
