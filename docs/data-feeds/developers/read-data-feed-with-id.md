---
title: readDataFeedWithId()
folder: dApp Developers
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Reading a dAPI Data Feed value and timestamp using the dAPI `_datafeedId` is
simple and straight forward. For on-chain smart contracts the `msg.sender`
argument received by the function
[readDataFeedWithId()](https://github.com/api3dao/airnode-protocol-v1/blob/v0.5.0/contracts/dapis/DapiServer.sol#L691-L703)
must have a [subscription](./#subscriptions) for the data feed requested.

Calling from off-chain code (_using a library such as `ether.js`_) is not
subject to whitelisting. Off-chain code is beyond the scope of this doc.

## Example Code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@api3/airnode-protocol-v1/contracts/dapis/interfaces/IDapiServer.sol";
contract mySmartContract {

    function myGetDataFeedValue(
        address _dapiServerContractAddress,
        bytes32 _datafeedId
    ) external {
        int224 private value;
        uint32 private timestamp;

        // Calling the DapiServer for a Beacon value.
        (value, timestamp) =
            IDapiServer(_dapiServerContractAddress).readDataFeedWithId(_datafeedId);
    }
}
```

See another code example of `readDataFeedWithId()` in the
[data-feed-reader-example repo](https://github.com/api3dao/data-feed-reader-example/blob/main/contracts/DataFeedReaderExample.sol#L9).

## Parameters

`readDataFeedWithId(bytes32 _datafeedId)`

- `bytes32 datafeedId` - The ID of the dAPI Data Feed to retrieve a value and
  timestamp for.

## Returns

- `int224 value` - The value of the dAPI Data Feed.
- `uint32 timestamp` - The timestamp associated with the dAPI Data Feed value.

::: tip Please note:

The `DapiServer.sol` contract casts the reported data point to `int224`. If this
is a problem (because the reported data may not fit into 224 bits or it is of a
completely different type such as `bytes32`), do not use this contract and
implement a customized version instead. The contract casts the timestamps to
`uint32`, which means it will not work work past-2106 in the current form. If
this is an issue, consider casting the timestamps to a larger type.

:::

If the `timestamp` of a dAPI Data Feed is zero, this means that it was never
written to. This may be the case for new dAPI Data Feeds. Therefore a zero value
in the `value` field is not valid if the `timestamp` is zero.

In general, make sure to check if the timestamp of the dAPI Data Feed is fresh
enough, and definitely disregard dAPI Data Feeds with zero `timestamp`.
