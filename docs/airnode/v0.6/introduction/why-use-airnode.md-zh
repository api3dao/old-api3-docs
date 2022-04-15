---
title: 为什么要使用 Airnode？
---

<TitleSpan>简介</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

API3 拥护去中心化的网络思想和开放源代码的力量。 此外，我们认为[预言机问题是不成立的](https://medium.com/api3/the-api-connectivity-problem-bd7fa0420636)，相反，要解决的问题是如何将API连接到区块链。 Airnode是解决这个问题的第一方预言机解决方案。 然而，就像所有的设计决策一样，下面介绍的优势也应该是有所取舍的，希望大家理解。

## 优势

- 第一方——第一方预言机克服了第三方预言机节点解决方案的重大缺点，后者使用中间商向区块链提供API。 您可以在 [这篇博文](https://medium. com/api3/first-party-vs-third-party-oracles-90356e3cffe5) 中阅读这些内容。
- 简单——Airnode 简单的“一劳永逸”设计，避免了其他第三方预言机节点解决方案的时间、复杂性和成本。
- 无状态——Airnode 是无状态的，并将区块链视为唯一的真相来源。 仅此一项就解决了传统第三方预言机节点的大部分操作问题，同时提供了更高的整体简易性。
- 变革性—— 不要求Airnode运营商拥有任何加密货币，API3为无数传统的API供应商提供了进入快速增长的区块链市场的机会，并为他们的数据提供创新的使用案例。 为了实现这一点，Airnode协议的设计方式是，请求者（提出请求的合约）指定一个赞助者（赞助交易的账户）来支付响应交易的费用。
- 开源 ——Airnode和其他API3项目是在[github](https://github. com/api3dao)上开发的。
- 安全——由于其无状态特性，Airnode 本质上比其他解决方案更安全。 尽管如此，API3仍然高度重视安全问题，并且拥有良好的 [外部安全审计](https://github. com/api3dao/api3-dao/tree/main/reports)记录。
- 免费 - API3对部署和使用Airnode不收费。 在AWS lambda免费层级下，运营一个Airnode甚至可以是免费的。

## 决策权衡

- 需要知识——本质上需要具备一些关于 Airnode 如何工作知识。 API 供应商需要了解如何配置 [Airnode](../grp-providers/guides/build-an-airnode/#configuration)Airnode </a>以成功部署，而 [请求者](../concepts/requester. md) 需要了解如何发出请求。 API3 的目的是使双方都尽可能方便。
- Airnode 成为供应商——当 API 提供商开始使用 Airnode 时，他们成为“供应商”，因此放弃了对API交付的技术方面的一些控制权。
- 更高的请求响应时间 ——Airnode被设计为定期唤醒，检查任何新请求并处理它们。 这意味着 Airnode 有一个“休眠”的窗口。 这通常不会有问题，因为响应交易在链上记录的具体时间从来没有得到保证，这个 "休眠时间 "是可以配置的。
<!-- TODO: provide benchmarks -->

## 结论

Airnode提供的优势，应该远远超过大多数使用情况下的权衡。
