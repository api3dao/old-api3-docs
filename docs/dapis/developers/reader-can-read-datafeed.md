---
title: readerCanReadDataFeed()
folder: dApp Developers
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

For on-chain smart contracts, the function
[readerCanReadDataFeed()](https://github.com/api3dao/airnode-protocol-v1/blob/v0.5.0/contracts/dapis/DapiServer.sol#L771-L781)
returns true if the `reader` parameter can access the `dataFeedId` parameter
meaning that the reader address has read access. See
[Coverage Policies](./#coverage-policies) for more information about dAPI read
access.

## Example Usage

```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

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
      IDapiServer(_dapiServerContractAddress).readerCanReadDataFeed(_datafeedId, address(this));
  }
}

```

## Parameters

`readerCanReadDataFeed(bytes32 datafeedId, address reader)`

- `bytes32 datafeedId` - The ID of a dAPI, Beacon, or Beacon set.
- `address reader` - The address to verify such as the reader's smart contract
  address or another address.

::: tip Using a dapiName for datafeedId

If you want to check the status using a `dapiName`, first encode the `dapiName`
to bytes32 and calculate the off-chain hash of the `encodedDapiName` as shown
below. Then pass the value of `dapiNameHash` as `_datafeedId` in the code
example above.

```solidity
// First encode the dapiName (such as AVAX/USD) to bytes32
encodedDapiName = ethers.utils.formatBytes32String("AVAX/USD");

// Then calculate the off-chain hash
dapiNameHash = ethers.utils.solidityKeccak256(['bytes32'], [encodedDapiName]);
```

:::

## Returns

- `bool` - Whether the address passed is whitelisted and therefore can read the
  dAPI, Beacon, or Beacon set ID passed.
