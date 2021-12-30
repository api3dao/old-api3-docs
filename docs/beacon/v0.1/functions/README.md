---
title: Overview
---

<TitleSpan>Beacons</TitleSpan>

# {{$frontmatter.title}}

[RrpBeaconServer.sol](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/requesters/RrpBeaconServer.sol)
serves Beacons sourced from Airnode. A Beacon is a live data point associated
with a `beaconId` which is derived from a `templateId` and additional
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

## RrpBeaconServer Contract Addresses

Following is a list of the contract addresses for `RrpBeaconServer.sol`
currently deployed. Use them to make function calls on `RrpBeaconServer.sol`.

```solidity
(int224 value, uint32 timestamp) =
RrpBeaconServer(address _beaconContractAddress).readBeacon(
  bytes32 beaconId
);
```

| Network | Chain ID | Contract Address |
| ------- | -------- | ---------------- |
| mainnet | #        | #                |

## Solidity Videos

The following short videos are relevant to smart contracts when calling other
contracts such as `RrpBeaconServer.sol`.

- [Call contract with an interface](https://www.youtube.com/watch?v=tbjyc-VQaQo)
- [Call other contracts](https://www.youtube.com/watch?v=6aQErpWPLbk)
