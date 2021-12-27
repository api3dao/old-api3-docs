---
title: readBeacon()
---

<TitleSpan>Beacons</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Reading a Beacon value is simple and straight forward. The sender must be
[whitelisted](../whitelisting.md) if the Beacon does not allow public access.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@api3/airnode-protocol";

contract mySmartContract {
    int224 private value;
    uint32 private timestamp;

    function callBeacon(address _contractAddress, bytes32 beaconId) external {
        // Calling the Beacon
        (value, timestamp) = RrpBeaconServer(_contractAddress).readBeacon(beaconId);
    }
}
```

## Parameters

- `bytes32 beaconId` - The ID of the beacon to retrieve: `readBeacon(beaconId)`.

## Returns

- `int224 value` - The value of the Beacon.
- `uint32 timestamp` - The timestamp associated with the Beacon value.

If the `timestamp` of a beacon is zero, this means that it was never written to.
This may be the case for new Beacons. Therefore a zero value in the `value`
field is not valid if the `timestamp` is zero.

In general, make sure to check if the timestamp of the beacon is fresh enough,
and definitely disregard beacons with zero `timestamp`.
