---
title: beaconIdToReaderToWhitelistStatus()
---

<TitleSpan>函数</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

对于链上智能合约，函数[beaconIdToReaderToWhitelistStatus()](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/requesters/RrpBeaconServer.sol#L363-L383)返回`reader`和`beaconId`参数详细的白名单状态。

::: 提示  获取白名单

请联系[API3 Business Development API Team](https://api3dao.typeform.com/to/O1Uvxc8m)（API3业务开发API团队）了解Beacon白名单。

:::

## 示例代码

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@api3/airnode-protocol/contracts/rrp/requesters/interfaces/IRrpBeaconServer.sol";
contract mySmartContract {

  function myReadableDetails(
    bytes32 _beaconId
    address _beaconContractAddress
  ) external {
    uint64 private expirationTimestamp;
    uint192 private indefiniteWhitelistCount;

    // Calling the BeaconServer for detailed whitelist status
    // where "this" is the contract address of this contract (myReadableDetails).
    (expirationTimestamp, indefiniteWhitelistCount) =
      RrpBeaconServer(_beaconContractAddress).beaconIdToReaderToWhitelistStatus(
        _beaconId,
        this
      );
  }
}
```

## 参数

`beaconIdToReaderToWhitelistStatus(bytes32 beaconId, address reader)`

- `bytes32 beaconId` -  beacon的ID。
- `address reader` - 获取白名单详细信息的地址。

## 返回

- `uint64 private expirationTimestamp` - T读取器白名单过期的时间戳。
- `uint192 indefiniteWhitelistCount` - reader因beaconId而被无限期列入白名单的次数。 阅读器白名单管理帐号或是具有[<span style="overflow-wrap: break-word;">INDEFINITE_WHITELISTER_ROLE_DESCRIPTION</span>](https://github.com/api3dao/airnode/blob/6d902da259ec3084c8f4764cadc74e270e5c7162/packages/airnode-protocol/contracts/whitelist/WhitelistRoles.sol#L32-L33)角色的任何其他的帐号无限期地列入白名单。 每次授权账户将读取器无限期地列入白名单时，记录的次数都会增加。 当读取器的白名单状态被撤销时，计数将递减。 这意味着只要计数（`indefiniteWhitelistCount`）大于0，读取器会无限期地被列入白名单。

当`address`尚未被列入白名单时，此函数返回：

```bash
expirationTimestamp   uint64 :  0
indefiniteWhitelistCount   uint192 :  0
```
