---
title: readerCanReadDataFeed()
folder: dApp Developers
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

For on-chain smart contracts, the function
[readerCanReadDataFeed()](https://github.com/api3dao/airnode-protocol-v1/blob/v0.5.0/contracts/dapis/DapiServer.sol#L771-L781)
returns true if the `reader` parameter can access the `dataFeedId` parameter
meaning that the reader address has the appropriate data feed subscription. See
[Coverage Plans](./#coverage-plans) for more information about dAPI access.

## Example Code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@api3/airnode-protocol-v1/contracts/dapis/interfaces/IDapiServer.sol";
contract mySmartContract {


  function myVerifyReadable(
    address _dapiServerContractAddress,
    bytes32 _datafeedId
  ) external {
    bool private canRead;

    // Calling the DapiServer for reader status
    // where "this" is the contract address of this contract (myVerifyReadable).
    (canRead) =
      IDapiServer(_dapiServerContractAddress).readerCanRereaderCanReadDataFeedadBeacon(_datafeedId, address(this));
  }
}

```

::: tip dAPI name

If you want to check the status for a dAPI `name`, you first need to calculate
the hash off-chain of `name`. Then pass `dapiNameHash` as `_datafeedId` in the
example above.

```solidity
dapiNameHash = ethers.utils.solidityKeccak256(['string'], [dapiName]);
```

:::

## Parameters

`readerCanReadDataFeed(bytes32 datafeedId, address reader)`

- `bytes32 datafeedId` - The ID of a dAPI, Beacon, or Beacon set.
- `address reader` - The address to verify such as the reader's smart contract
  address or another address.

## Returns

- `bool` - Whether the address passed is whitelisted and therefore can read the
  dAPI, Beacon, or Beacon set ID passed.