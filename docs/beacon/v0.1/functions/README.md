---
title: Overview
---

<TitleSpan>Beacons</TitleSpan>

# {{$frontmatter.title}}

RrpBeaconServer.sol serves Beacons sourced from Airnode. A Beacon is a live data
point associated with a `beaconID` which is derived from a `templateID` and
additional parameters. This is suitable where the more recent data point is
always more favorable, e.g., in the context of an asset price data feed.

Another definition of beacons are single-Airnode data feeds that can be used
individually or combined to build decentralized data feeds or dAPIs.

This contract casts the reported data point to `int224`. If this is a problem
(because the reported data may not fit into 224 bits or it is of a completely
different type such as `bytes32`), do not use this contract and implement a
customized version instead. The contract casts the timestamps to `uint32`, which
means it will not work work past-2106 in the current form. If this is an issue,
consider casting the timestamps to a larger type.

- [readBeacon()]() - Returns a Beacon's value.
- [readerCanReadBeacon()](./reader-can-read-beacon.md) - Called to check if a
  reader is whitelisted to read the beacon
- [beaconIdToReaderToWhitelistStatus()](./beaconid-reader-whiteliststatus.md) -
  Get details about the whitelist status of an address.
- [requestBeaconUpdate()](./request-beacon-update.md) - Triggers an update to a
  Beacon's value.

## RrpBeaconServer Contract Addresses

Following is a list of the contract addresses currently deployed. Use them to
make function calls on `RrpBeaconServer`.

```solidity
RrpBeaconServer(address _contractAddress).readBeacon(bytes32 beaconId)
```

| Network | Chain ID | Contract Address |
| ------- | -------- | ---------------- |
| mainnet | #        | #                |

## Solidity Videos

The following short videos are relevant to smart contracts when calling other
contracts such as `RrpBeaconServer`.

- [Call contract with an interface](https://www.youtube.com/watch?v=tbjyc-VQaQo)
- [Call other contracts](https://www.youtube.com/watch?v=6aQErpWPLbk)
