---
title: readerCanReadBeacon()
---

<TitleSpan>函数</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

对于链上智能合约，如果`reader`参数可以访问`beaconId`参数，则函数[readerCanReadBeacon()](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/requesters/RrpBeaconServer.sol#L349-L361)返回ture，意味着这个读取器地址在白名单中。 请联系[API3 Business Development API Team](https://api3.org)（API3业务开发API团队）加入白名单。

从链下代码(_使用类似于 `ether.js`_的库) 调用不受白名单的约束。 链下代码的讨论不在本文档的范围内。

## 示例代码

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@api3/airnode-protocol/contracts/rrp/requesters/interfaces/IRrpBeaconServer.sol";
contract mySmartContract {


  function myVerifyReadable(
    address _beaconContractAddress,
    bytes32 _beaconId
  ) external {
    bool private canRead;

    // Calling the BeaconServer for reader status
    // where "this" is the contract address of this contract (myVerifyReadable).
     (canRead) =
      RrpBeaconServer(_beaconContractAddress).readerCanReadBeacon(_beaconId, this);
  }
}

```

## 参数

`readerCanReadBeacon(bytes32 beaconId, address reader)`

- `bytes32 beaconId` -  beacon的ID。
- `address reader` -  要验证的地址，比如读取器智能合约的地址或是另外的地址。

## 返回

- `bool` -无论拟验证的地址是否被列入白名单，都可读取验证的Beacon的ID。
