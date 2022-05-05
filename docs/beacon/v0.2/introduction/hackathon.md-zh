---
title: ETHDenver - 2022年2月
---

<TitleSpan>Introduction</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

> **尝试通过 [#BUIDLWEEK](https://www.ethdenver.com/buidlweek) 在ETHDenver来构建Beacon吧！”**

这个指南将引导您开发一个智能合约，该合约将使用API3以Amberdata运营的第一方预言机设定的Beacon。

## Amberdata Beacons

[Amberdata](https://amberdata.io) 是行业领先的加密货币市场数据提供商之一，并已将其一些API端点开放给了Beacon使用，以供您构建DeFi应用程序。 您可以[在此](../reference/beacon-browser.md)查看完整的名单。 这些Beacon代表着VWAP（成交量加权平均价）对值，是交易数据的一种汇总方式。 VWAP是资产在一段时间内基于交易量和价格的平均价格。 详细介绍请看下面的Amberdata文档链接，以便更好地理解所提供值的意思。

- [Data Dictionary](https://amberdata.io/dictionary/)
- [Latest [ENT]](https://docs.amberdata.io/reference#spot-vwap-pairs-latest) - (VWAP)
- [Gas Predictions](https://docs.amberdata.io/reference#get-gas-predictions)

## 需求

Beacon在以下网络中可使用：

| Network        | Network                                                                  |
|:-------------- |:------------------------------------------------------------------------ |
| Ropsten        | [https://faucet.egorfine.com/](https://faucet.egorfine.com/)             |
| Rinkeby        | [https://www.rinkebyfaucet.com/](https://www.rinkebyfaucet.com/)         |
| Goerli         | [https://faucet.goerli.mudit.blog/](https://faucet.goerli.mudit.blog/)   |
| Polygon-Mumbai | [https://faucet.polygon.technology/](https://faucet.polygon.technology/) |

选择您想要处理工作的网络，创建一个钱包，然后从相应的源头为其提供资金。

::: tip

你可以运行 `npx @api3/airnode-admin 生成助记符号`。

:::

您还需要一个区块链提供商URL。 您可以在Ropsten，Rinkeby和Goerli创建一个免费的[Infura](https://infura.io/) 账户，或者使Polygon-Mumbai的公开提供商URL之一，例如 `https://rpc-mumbai.today`。 在接下来的步骤中，您钱包的助记词和区块链提供商URL将放入您的 `credentials.json` 文件中。

## 操作指南

复制这个 [Beacon reader example](https://github.com/api3dao/beacon-reader-example)

```sh
git clone https://github.com/api3dao/beacon-reader-example.git
cd beacon-reader-example
```

安装dependencies

```sh
npm install
```

### 测试

运行 `test/` 目录中定义的单元测试：

```sh
npm run test
```

### 网络： `localhost`

在单独的终端上启动一个本地的Ethereum节点：

```sh
npm run eth-node
```

部署 `MockRrpBeaconServer`, `BeaconReaderExample`,并模拟设置一个Beacon值：

```sh
npm run deploy:localhost
```

您可以跳过 `localhost` 的白名单步骤。

让 `BeaconReaderExample`读取模拟的beacon值，然后将其输出在终端上：

```sh
npm run read-beacon:localhost
```

### 网络： `ropsten`, `rinkeby`, `goerli`, `polygon-mumbai`

在repo的根目录创建一个 `credentials.json` 文件，类似于 `credentials.example.json`。 填写您将使用的链的助记符和提供者 URL。

::: tip

您可以在以下命令中将`polygon-mumbai` 替换为`ropsten`，`rinkeby` 或是`goerli`。

:::

部署`BeaconReaderExample`指向预部署的`RrpBeaconServer`：

```sh
npm run deploy:polygon-mumbai
```

将`BeaconReaderExample`列为白名单，您为由 Amberdata 提供支持的Beacon部署`ETH/USD`D 案例：

```sh
npm run whitelist-reader:polygon-mumbai
```

让 `BeaconReaderExample`读取模拟的beacon值，然后在终端上输出：

```sh
npm run read-beacon:polygon-mumbai
```

::: tip

您可以通过修改`scripts/whitelist-reader.js`和 `scripts/read-beacon.js`来读取 `ETH/USD`以外的Beacon值。 请参阅[Beacons IDs](../reference/beacon-browser.md) 文档。

:::

这些应该可以让您开始构建一个Beacon项目了！ 如果您想要了解更多信息，请继续阅读。

## 依赖项

Amberdata 使用 [Airnode `v0.3`](/airnode/v0.3) 作为预言机节点，我们 开发了这些节点以支持API提供商操作的预言机. 建议您在项目中使用`@api3/services`的 `v0.1` 版本，以便轻松获取有关特定 Beacon 的信息。

## `@api3/services` API

`@api3/services` API公开了两个函数：

1. [whitelistBeaconReader](https://github.com/api3dao/services/blob/main/src/index.ts#L66)  （白名单Beacon读取器）：此函数可用于以编程的方式将您已实现和部署的Beacon读取合约列入白名单，以从特定Beacon读取相关值。 您可以在[此处](https://github.com/api3dao/beacon-reader-example/blob/main/scripts/whitelist-reader.js#L34)的Beacon读取示例项目中看到白名单脚本并使用它。 1.该函数需要5个参数：
   - `beaconId` - 被Beacon读取器列为白名单的Beacon的ID。
   - `beaconReaderAddress` - 被Beacon读取器列为白名单的Beacon的地址。
   - `chain` - 链的名称，例如 `ropsten`
   - `providerUrl` - 用于创建交易的区块链提供商的URL。
   - `senderAccount` -具有两个方面的对象，`助记词`（必需）和`derivationPath` （可选）指定将用于创建白名单的交易。
2. [getServiceData（获取服务数据）](https://github.com/api3dao/services/blob/main/src/index.ts#L27) - 您可以使用此函数来获取特定Beacon的详细信息。 其中返还的信息里最总要的是 `RrpBeaconServer`（您需要部署的Beacon读取智能合约）以及`beaconId`（您需要读取Beacon值）。 这个函数需要3个参数：
   - `apiname` - [API名称](https://github.com/api3dao/operations/tree/main/data/apis). 目前唯一的选项是 `Amberdata`。
   - code>beaconName</code> - 其中一个[beacons](https://docs.api3.org/beacon/v0.1/reference/beacon-ids.html)的名字，例如`ETH/USD`。
   - `chain` - 链的名称，例如 `ropsten`

使用`@api3/services`不要求创建一个Beacon读取应用程序。 您可以按照以下说明手册将Beacon读取器智能合约列入白名单中。 您可以从[Beacon IDs Section](../reference/beacon-browser.md) 部分库中获取`beaconId` ，从[Contract Addresses Section](../reference/contract-addresses.md)部分库获取`RrpBeaconServer`的地址。

## 白名单

在智能合约可以读取Beacon值之前，需要通过 API3 DAO 授权的链上机制将其列入白名单。 这是为了保护和货币化第一方预言机服务。 为黑客松设置的Beacon允许自选白名单，这意味着您可以进行交易，并将合同列入白名单以读取特定的Beacon值。

::: 提示

Amberdata Beacon可以在_#BUIDLWEEK_中很多测试网上使用。 对于产出用途而言，您需要与API3 DAO代表联系，将您的合约加入白名单中以便能够读取Beacon值。

:::

### 手动白名单

除了使用 `@api3/services` API之外，您还可以通过区块浏览器进行交易来手动将您的合约加入白名单中。

1. 1.打开[Etherscan](https://etherscan.io/)/[Polygonscan](https://polygonscan.com/)，并使用右上角登录按钮右侧的图标选择所需的测试网。

2. 2.在搜索字段中输入[SelfServeRrpBeaconServerWhitelister](../reference/contract-addresses.md#selfserverrpbeaconserverwhitelister-sol)合约的地址。

3. 点击 _contract > write contract > connect to web3_。 使用您在Etherscan/Polygonscan中选择的测试网链接您的钱包。

4. 选择 `whitelistReader`  函数（#5），然后输入[beaconId](../reference/beacon-browser.md)和您的智能合约地址（即Beacon读取器）。

5. 点击_Write_ 按钮，从您的钱包中执行交易。

::: 警告

每个已部署的Beacon读取合约都需要被它将读取的所有Beacon列入白名单。

:::

## 获取帮助

如果您需要任何帮助，请访问[API3 Discord support channel](https://discord.com/channels/758003776174030948/871787274386411580)。

## 与API3一起工作

如果您考虑与API3的核心团队合作。 我们对您的期待永无止境。 我们希望有才华的人认可区块链技术是_大件事_，是未来的大创新，已经准备好让它变得更好，并拥抱未来无数需要协作的旅程。 [请加入我们API3](/api3/introduction/work.md)，一起创造未来吧！
