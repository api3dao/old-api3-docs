---
title: readBeacon()
---

<TitleSpan>函数</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

读取Beacon非常简单直接。 而对于链上智能合约，函数[readBeacon()](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/requesters/RrpBeaconServer.sol#L326-L361)收到的`msg.sender` 必须加入白名单中。

::: 提示  获取白名单

请联系[API3 Business Development API Team](https://api3dao.typeform.com/to/O1Uvxc8m)（API3业务开发API团队）了解Beacon白名单。

:::

从链下代码(_使用类似于 `ether.js`_的库) 调用不受白名单的约束。 链下代码的讨论不在本文档的范围内。

## 示例代码

从GitHub 储存库[beacon-reader-example](https://github.com/api3dao/beacon-reader-example/blob/main/contracts/BeaconReaderExample.sol)中还有一个读取Beacon的合约另一个示例。

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

## 参数

`readBeacon(bytes32 _bearaconId)`

- `bytes32 beaconId` - 为其检索的Beacon的ID。

## 返回

- `int224 value` - Beacon的值。
- `data.timestamp` -  与 Beacon 值关联的时间戳。

::: 提示  请注意:

`RrpBeaconServer.sol`合约将已经报告的数据点转为 `int224`。 如果这有问题（因为报告的的数据可能不适用于224位或者它是完全不同的类型，比如 `bytes32`），请不要使用此合约，并使用其自定义版本。 合约的时间戳转为`uint32`，这意味着它不会以当前形式在past-2106工作。 如果还是有问题，请考虑将时间戳转为更大容量的类型。

:::

如果Beacon的 `timestamp` 为0，这意味着它从未被写入。 新的Beacon有可能就会面临这样的情况。 因此，如果 `timestamp` 为0，`value`字段中的0值无效。

通常而言，请确保检查Beacon的时间戳是否足够新，并且忽略`timestamp`为0的Beacon。
