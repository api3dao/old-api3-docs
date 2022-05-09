---
title: 中继元数据身份验证
---

<TitleSpan>概念和定义</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

有两种方法可以通过 API 供应商管理他们的 API 的 访问，这两种方法可以被称为请求者的链上智能合约管理。

- [授权者](../grp-providers/guides/build-an-airnode/apply-auth.md)(链上)
- [中继元数据安全方案](../grp-providers/guides/build-an-airnode/api-security.md)(链下)

中继元数据是已知的请求者(智能合约) 通过 Airnode传递到 API 端点的信息。

使用中继元数据安全方案，不需要区块链特定知识或API供应商的区块链交互，也没有区块链交易（gas）费用。 只需在部署Airnode的过程中，在Airnode `config.json` 文件中应用所需的安全方案字段，见[构建Airnode](../grp-providers/guides/build-an-airnode/)。 然后让你的API操作根据客户数据库，检查配置的任何安全方案值（通常是 `sponsorAddress`）。

## 简单示例

下面的图示是将传输的元数据用于安全 目的的一种方式。 这里是一个赞助者 (例如 开发者或客户）提交了他们的 `sponsorAddress` ，由一个 API 供应商存储。 `sponsorAddress`可以用来验证赞助者的智能合约的请求。</p>

![概念授权人](../assets/images/relay-meta-flow.png)

以下各节与上图中的数字相关。

### 1： 部署 Airnode

将Airnode部署为 `sponsorAddress` 安全方案，指示Airnode将 `sponsorAddress` 与所有请求一起传递。

### 2： 注册赞助者

赞助者是一个链上智能合约的开发者，希望从API供应商那里请求链外数据。 每个赞助商都有一个已知的 `sponsorAddress`。 API供应商可以使用网络表格向赞助者索取 `sponsorAddress` ，作为付费订阅设置的一部分。

### 3：提出请求

当智能合约(请求者) 提出任何API操作的请求时，`sponsorAddress` 将成为请求的一部分。 每个赞助者可以有一个以上的请求者。

- 3a: 请求者向Airnode提出请求。
- 3b: Airnode 将 `sponsorAddress`添加到请求中，然后将 请求传递到 API 操作中。 API 操作在 `sponsorAddress`上进行查找，验证它是否获得订阅。 如果获得验证，则API操作返回对 Airnode的响应。
- 3c: Airnode向请求者返回响应。

## 安全方案

包含用于 [简单例子](./relay-meta-auth. md#simple-example) 的`sponsorAddress`，我们有五个 _中继元数据安全方案_， 都可以被纳入任何Airnode中。

- [remedyChainId](../grp-providers/guides/build-an-airnode/api-security. md#relaychainid) - 请求的链ID。
- [relayChainType](../grp-providers/guides/build-an-airnode/api-security. md#relaychaintype) - 请求的链类型。
- [relaySponsorAddress](../grp-providers/guides/build-an-airnode/api-security. md#relaysponsoraddress) - 赞助者的钱包地址。 赞助者拥有并运营一个或多个请求者。
- [relaySponsorWalletAddress](../grp-providers/guides/build-an-airnode/api-security. md#relaysponsorwalletaddress) - 其他与每个请求者相关联的钱包地址。 这些都是由赞助商拥有和资助的，以支付链上的gas费用。
- [relayRequesterAddress](../grp-providers/guides/build-an-airnode/api-security. md#relayrequesteraddress) - 请求者的链上地址 (智能合同)。
