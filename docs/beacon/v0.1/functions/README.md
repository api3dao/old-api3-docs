---
title: Overview
---

<TitleSpan>Beacons</TitleSpan>

# {{$frontmatter.title}}

/// @title The contract that serves beacons using Airnode RRP /// @notice A
beacon is a live data point associated with a beacon ID, which is /// derived
from a template ID and additional parameters. This is suitable /// where the
more recent data point is always more favorable, e.g., in the /// context of an
asset price data feed. Another definition of beacons are /// one-Airnode data
feeds that can be used individually or combined to build /// decentralized data
feeds. /// @dev This contract casts the reported data point to `int224`. If this
is /// a problem (because the reported data may not fit into 224 bits or it is
of /// a completely different type such as `bytes32`), do not use this contract
/// and implement a customized version instead. /// The contract casts the
timestamps to `uint32`, which means it will not work /// work past-2106 in the
current form. If this is an issue, consider casting /// the timestamps to a
larger type.

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
