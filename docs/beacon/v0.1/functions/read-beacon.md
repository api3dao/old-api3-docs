---
title: readBeacon()
---

<TitleSpan>Beacons</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Reading a Beacon value is simple and straight forward. For on-chain smart
contracts the `msg.sender` received by the function
[readBeacon()](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/requesters/RrpBeaconServer.sol#L286-L307)
must be whitelisted. Please contact the
[API3 Business Development API Team](https://api3.org) to be whitelisted.

Calling from off-chain code (_using a library such as `ether.js`_) is not
subject to whitelisting. Off-chain code is beyond the scope of this doc.

## Example Code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@api3/airnode-protocol";

contract mySmartContract {
    int224 private value;
    uint32 private timestamp;

    function myGetBeaconValue(address _contractAddress, bytes32 beaconId) private {
        // Calling the BeaconServer for a Beacon value.
        (value, timestamp) = RrpBeaconServer(_contractAddress).readBeacon(beaconId);
    }
}
```

## Parameters

- `bytes32 beaconId` - The ID of the Beacon to retrieve a value for.

## Returns

- `int224 value` - The value of the Beacon.
- `uint32 timestamp` - The timestamp associated with the Beacon value.

If the `timestamp` of a Beacon is zero, this means that it was never written to.
This may be the case for new Beacons. Therefore a zero value in the `value`
field is not valid if the `timestamp` is zero.

In general, make sure to check if the timestamp of the Beacon is fresh enough,
and definitely disregard Beacons with zero `timestamp`.
