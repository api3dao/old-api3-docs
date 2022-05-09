---
title: 概述
---

<TitleSpan>函数</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

[RrpBeaconServer.sol](https://github.com/api3dao/airnode/blob/master/packages/airnode-protocol/contracts/rrp/requesters/RrpBeaconServer.sol)提供来自Airnode的Beacon值， Beacon值是与派生自`templateId` 和其他参数的`beaconId`关联的实时数据点。 这适用于青睐新数据的场合，比如在资产价格数据传送的情况中。

Beacon的另一种定义是单Airnode数据传递，可以单独使用或是组合使用以构建去中心化数据传递或[dAPIs](../#dapis-building-on-beacons)。

- [readBeacon()](./read-beacon.md) - 返回 Beacon的值。
- [readerCanReadBeacon()](./reader-can-read-beacon.md) - 检查读取地址是否被列入白名单以读取beacon。
- [beaconIdToReaderToWhitelistStatus()](./beaconid-reader-whiteliststatus.md) - 有关读取地址白名单状态的详细信息。

## 创建启动项目

### 使用CLI工具

创建新项目最简单的方式就是运行一个CLI工具，该工具会生成最少的项目文件，并协助您开始基于Beacon构建应用程序。 简单运行命令：

```
npm exec --package @api3/services --call create-beacon-reader-app
```

CLI工具将要求您提供初始化项目的项目文件，及其所基于的模板的路径。 截止目前，只有一个模板可供选择（使用javascript + hardhat），但未来会有更多可选择的模板，敬请期待。 您还可以显示需要帮助或是直接传递的参数。

```
# To show help
npm exec --package @api3/services --call "create-beacon-reader-app --help"
# To provide the path and template directly through CLI
npm exec --package @api3/services --call "create-beacon-reader-app  --path=./my-app --template=javascript-ethers-hardhat"
```

::: 警告  需要安装Git

为了安装`@api3/services`数据储存库，您事先需要安装`git`。

:::

### 克隆或是下载已有的repo

您也可以选择从GitHub克隆或是下载[beacon-reader-example](https://github.com/api3dao/beacon-reader-example)储存库。 这是由以上提到的服务CLI工具创建。

这个入门项目逐步完成从一个智能合约读取Beacon值的过程。 请务必通读[README.md](https://github.com/api3dao/beacon-reader-example/blob/main/README.md)这一链接里的文章以及一些示例代码，比如[BeaconReaderExample.sol](https://github.com/api3dao/beacon-reader-example/blob/main/contracts/BeaconReaderExample.sol)智能合约。

## RrpBeaconServer合约地址

请点击[Contract Addresses](../reference/contract-addresses.md) 文档查阅有关特定网络上可用地址的列表。

## Solidity 视频

以下短视频有关于调用其他合约时与智能合约，比如`RrpBeaconServer.sol`。

- [Call contract with an interface](https://www.youtube.com/watch?v=tbjyc-VQaQo)
- [Call other contracts](https://www.youtube.com/watch?v=6aQErpWPLbk)
