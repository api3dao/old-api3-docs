---
title: Overview
---

<TitleSpan>Functions</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

[RrpBeaconServer.sol](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/requesters/RrpBeaconServer.sol)
serves Beacon values sourced from Airnode. A Beacon is a live data point
associated with a `beaconId` which is derived from a `templateId` and additional
parameters. This is suitable where the more recent data point is always more
favorable, e.g., in the context of an asset price data feed.

Another definition of Beacons are single-Airnode data feeds that can be used
individually or combined to build decentralized data feeds or
[dAPIs](../#dapis-building-on-beacons).

- [readBeacon()](./read-beacon.md) - Returns a Beacon's value.
- [readerCanReadBeacon()](./reader-can-read-beacon.md) - Check if a reader
  address is whitelisted to read the beacon.
- [beaconIdToReaderToWhitelistStatus()](./beaconid-reader-whiteliststatus.md) -
  Details about the whitelist status of a reader address.
- [requestBeaconUpdate()](./request-beacon-update.md) - Triggers an update to a
  Beacon's value.

## Beacon Reader Example

A great place to get started is the
[beacon-reader-example](https://github.com/api3dao/beacon-reader-example) GitHub
repository. This starter project steps through reading Beacon values from a
smart contract. Be sure to read through some of the example code such as the
[BeaconReaderExample.sol](https://github.com/api3dao/beacon-reader-example/blob/main/contracts/BeaconReaderExample.sol)
smart contract.

## RrpBeaconServer Contract Addresses

See the [Contract Addresses](../reference/contract-addresses.md) doc for a list
of addresses available on specific networks.

## Solidity Videos

The following short videos are relevant to smart contracts when calling other
contracts such as `RrpBeaconServer.sol`.

- [Call contract with an interface](https://www.youtube.com/watch?v=tbjyc-VQaQo)
- [Call other contracts](https://www.youtube.com/watch?v=6aQErpWPLbk)
