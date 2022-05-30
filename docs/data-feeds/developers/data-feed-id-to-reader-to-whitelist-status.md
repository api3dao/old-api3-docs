---
title: dataFeedIdToReaderToWhitelistStatus()
folder: dApp Developers
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

For on-chain smart contracts, the function
[dataFeedIdToReaderToWhitelistStatus()](https://github.com/api3dao/airnode-protocol-v1/blob/v0.5.0/contracts/dapis/DapiServer.sol#L791-L806)
returns the `expirationTimestamp` and `indefiniteWhitelistCount` of a reader for
the specified dAPI `datafeedId`.

The reader will not be able to read the dAPI data feed past the
expirationTimestamp (assuming their `indefiniteWhitelistCount` is 0 ).

If the `indefiniteWhitelistCount` is greater than 0 , the reader will be able to
read the dAPI data feed indefinitely (regardless of the value of
`expirationTimestamp`).

Please contact the [API3 Business Development API Team](https://api3.org) to be
whitelisted.

Calling from off-chain code (_using a library such as `ether.js`_) is not
subject to whitelisting. Off-chain code is beyond the scope of this doc.

## Example Code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@api3/airnode-protocol-v1/contracts/dapis/interfaces/IDapiServer.sol";
contract mySmartContract {


  function myReadable(
    address _dapiServerContractAddress,
    bytes32 _datafeedId
  ) external {
    uint64 expirationTimestamp;
    uint192 indefiniteWhitelistCount;

    // Calling the DapiServer for reader status
    // where "this" is the contract address of this contract (myReadable).
    (expirationTimestamp, indefiniteWhitelistCount) =
      IDapiServer(_dapiServerContractAddress).dataFeedIdToReaderToWhitelistStatus(_datafeedId, address(this));
  }
}

```

## Parameters

`readerCanReadDataFeed(bytes32 datafeedId, address reader)`

- `bytes32 datafeedId` - The ID of the dAPI datafeed.
- `address reader` - The address to verify such as the reader's smart contract
  address or another address.

## Returns

- `expirationTimestamp` - Timestamp at which the whitelisting of the reader will
  expire

- `indefiniteWhitelistCount` - Number of times `reader` was whitelisted
  indefinitely for `dataFeedId`
