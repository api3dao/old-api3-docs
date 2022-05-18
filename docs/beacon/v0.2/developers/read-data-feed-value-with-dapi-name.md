---
title: readDataFeedWithDapiName()
folder: dApp Developers
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Reading a dAPI Data Feed value and timestamp using the dAPI `name` is simple and
straight forward. For on-chain smart contracts the `msg.sender` argument
received by the function
[readDataFeedWithDapiName()](https://github.com/api3dao/airnode-protocol-v1/blob/v0.5.0/contracts/dapis/DapiServer.sol#L749-L765)
must be whitelisted.

::: tip Get Whitelisted

Please contact the
[API3 Business Development API Team](https://api3dao.typeform.com/to/O1Uvxc8m)
about dAPI Data Feed whitelisting.

:::

Calling from off-chain code (_using a library such as `ether.js`_) is not
subject to whitelisting. Off-chain code is beyond the scope of this doc.

## Example Code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import "@api3/airnode-protocol-v1/contracts/dapis/interfaces/IDapiServer";
contract mySmartContract {

    function myGetBeaconValue(
        address _dapiServerContractAddress,
        bytes32 _dapiName
    ) external {
        int224 private value;

        // Calling the DapiServer for a Beacon value.
        value =
            IDapiServer(_dapiServerContractAddress).readDataFeedValueWithDapiName(_dapiName);
    }
}
```

## Parameters

`readDataFeedValueWithDapiName(bytes32 _dapiName)`

- `bytes32 datafeedId` - The name of the dAPI to retrieve a value and timestamp
  for.

## Returns

- `int224 value` - The value of the dAPI Data Feed.

::: tip Please note:

The `DapiServer.sol` contract casts the reported data point to `int224`. If this
is a problem (because the reported data may not fit into 224 bits or it is of a
completely different type such as `bytes32`), do not use this contract and
implement a customized version instead. The contract casts the timestamps to
`uint32`, which means it will not work work past-2106 in the current form. If
this is an issue, consider casting the timestamps to a larger type.

:::

If the `value` of a dAPI Data Feed is zero, this may mean that it was never
written to. This may be the case for new dAPI Data Feeds. The dAPI Data Feed
value may be 0 if the timestamp is non-zero which can be fetched with
`readDataFeedWithDapiName` instead since it returns both the value and
timestamp.
