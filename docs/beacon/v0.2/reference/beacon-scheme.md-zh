---
title: Beacon ID方案
---

<TitleSpan>参考</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

<!-- See BEC-102 on the Beacon Board. -->

一个`beaconId`和其`templateId`跨链中是相同的。 调用方只需要`beaconId`即可使用 [readBeacon()](../functions/read-beacon.md)函数来访问其Beacon值。 而`templateId`仅在当需要更新信标值时才会被使用。 通常这是由Beacon本身调用的，且**不**是beacon消费者需要关注的正常操作过程。

Beacon会在达到其当前值允许的偏差的时候进行自我更新。 每个Beacon后面都有一个模板。 另外，每个Beacon背后的模板都有一个Airnode从API端点返回Beacon的值。 这个模板包含了Airnode在调用API端点的参数。 这可能需要额外的Beacon参数来参与Airnode调用，并和API端点的模板合并。 这整个过程是使用函数[requestBeaconUpdate()](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/requesters/RrpBeaconServer.sol#L202)完成的。

::: 提示

如果您打算要求Beacon进行自我更新，那么在其正常的更新过程外，使用Beacon的模板与否将不太重要。 但是，如果要手动更新Beacon，请求者需要Beacon的templateId以调用[requestBeaconUpdate()](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/requesters/RrpBeaconServer.sol#L202)函数。

:::

## 派生ID

通过对Airnode地址、端点id（endpointId）和模板参数进行哈希处理来创建`templateId`。 详情请参阅monorepo里的[createTemplate()](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/TemplateUtils.sol#L17-L46)函数。

通过对`templateId`和Beacon参数进行哈希处理来创建`beaconId`。 详情请参阅monorepo里的[requestBeaconUpdate()](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/requesters/RrpBeaconServer.sol#L212)函数。

但`templateId`不能从`beaconId`中派生。
