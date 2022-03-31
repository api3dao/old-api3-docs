---
title: readBeacon()
---

<TitleSpan>Functions</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

Reading a Beacon value is simple and straight forward. For on-chain smart contracts the `msg.sender` argument received by the function [readBeacon()](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/requesters/RrpBeaconServer.sol#L326-L361) must be whitelisted.

::: tip Get Whitelisted

Please contact the [API3 Business Development API Team](https://api3dao.typeform.com/to/O1Uvxc8m) about Beacon whitelisting.

:::

Calling from off-chain code (_using a library such as `ether.js`_) is not subject to whitelisting. Off-chain code is beyond the scope of this doc.

## Example Code

There is an additional example of a contract that reads a Beacon in the [beacon-reader-example](https://github.com/api3dao/beacon-reader-example/blob/main/contracts/BeaconReaderExample.sol) GitHub repository.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@api3/airnode-protocol/contracts/rrp/requesters/interfaces/IRrpBeaconServer.sol";
contract mySmartContract {

    function myGetBeaconValue(
        address _beaconContractAddress,
        bytes32 _beaconId
    ) external {
        int224 private value;
        uint32 private timestamp;

        // Calling the BeaconServer for a Beacon value.
        (value, timestamp) =
            RrpBeaconServer(_beaconContractAddress).readBeacon(_beaconId);
    }
}
```

## Parameters

`readBeacon(bytes32 _beaconId)`

- `bytes32 beaconId` - The ID of the Beacon to retrieve a value for.

## Returns

- `int224 value` - The value of the Beacon.
- `uint32 timestamp` - The timestamp associated with the Beacon value.

::: tip Please note:

The `RrpBeaconServer.sol` contract casts the reported data point to `int224`. If this is a problem (because the reported data may not fit into 224 bits or it is of a completely different type such as `bytes32`), do not use this contract and implement a customized version instead. The contract casts the timestamps to `uint32`, which means it will not work work past-2106 in the current form. If this is an issue, consider casting the timestamps to a larger type.

:::

If the `timestamp` of a Beacon is zero, this means that it was never written to. This may be the case for new Beacons. Therefore a zero value in the `value` field is not valid if the `timestamp` is zero.

In general, make sure to check if the timestamp of the Beacon is fresh enough, and definitely disregard Beacons with zero `timestamp`.
