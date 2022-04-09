---
title: 手续费
---

<TitleSpan>开发者</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

调用Airnode会有一些一次性的设置/维护费用和一些持续的费用。 Airnode协议的设计方式是，由请求者承担所有的gas费用，包括请求的实现（响应）交易。

## 赞助者

当赞助者参与设置活动时会遇到费用，如赞助申请者时。 这些是每次调用的交易gas费用，相对较低。 如下所示，这些资金来自赞助者在调用某些 [管理命令](../reference/packages/admin-cli.md) 时提供的钱包助记符。

- [赞助请求者](../reference/packages/admin-cli.md#sponsor-requester)
- [取消赞助请求者](../reference/packages/admin-cli.md#unsponsor-requester)
- [新建模板](../reference/packages/admin-cli.md#create-template)
- [撤回请求](../reference/packages/admin-cli.md#request-withdrawal)

## Airnodes

这些费用采取交易gas费用的形式。 这些费用在为请求者的赞助者钱包提供资金以获得Airnode时，以及在响应请求而执行Airnode时适用。

- 为与Airnode相关的赞助者钱包提供资金：赞助者的钱包，是由赞助者使用其首选的钱包管理工具（如MetaMask）手动提供资金。

- [调用](../grp-developers/call-an-airnode.md) Airnode：交易gas费用从赞助者钱包中提取，与被赞助者请求者调用的Airnode有关。

<airnode-SponsorWalletWarning/>

在参考资料部分，了解更多关于[赞助者钱包](../concepts/sponsor.md)的信息。

## API 提供者费用

一些API供应商对其数据的访问收取订阅费用。 这是典型的做法，通常需要请求者在供应商的网站上创建一个帐户，然后订阅所提供的一定等级的服务。 这种类型的服务通常是按月计费，并且可以根据年费率来计算，以节省费用。 订阅（即使是免费的）将很可能涉及到使用安全方案，如必须使用API密钥来访问数据。 请参阅[调用Airnode](call-an-airnode.md)，了解更多关于如何将安全凭证传递给Airnode的信息。
