---
title: API3是什么？
---

<p align="center">
  <img src="./assets/images/api3.png" width="400" />
</p>

# {{$frontmatter.title}}

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

**API3** ([https://api3.org](https://api3.org)) 是一个合作项目，以去中心化和信任最小化的方式向智能合约平台提供传统API服务。 它由一个 _去中心化 组织_ (DAO)管理，这个DAO即 **API3 DAO** 。 因此，API3的代码是开源的，其运作也是透明的。

## 概述

去中心化的应用程序需要的绝大多数外部集成都是商业网络API，这也是传统企业为实现其数据和服务的变现而建立的。

因此，广为人知的 _预言机问题_ 实际上是 _一个 API 连通性问题_。

现有的预言机解决方案由于不能做出这种区分而显得不足，导致依赖第三方预言机的劣质解决方案和排除_API提供商_的生态系统。 通过深入分析问题，**API3**旨在提供一个更加优化的解决方案。

::: tip API3 白皮书(pdf)

为进一步详细讨论API3项目，请阅读
<a href="/api3-whitepaper-v1.0.2.pdf" target="_api3-whitepaper">API3
白皮书</a>。

:::

## Airnode

**API3** 的核心为API提供商提供了轻松运行他们自己的_预言机节点_的能力。 这使他们能够在链上不需要中间人，就可以向任何对他们的服务感兴趣的 _去中心化应用程序_ （dApp）提供数据。

这个机制的核心是 **Airnode**, 一个开源的预言机节点。 它被设计成可由任何API提供商轻松部署，而且几乎无需维护。 因为有了Airnode，dApp开发者可以编写_智能合约_，与API提供商的链上数据进行互动。

Airnode的设计机制是为了消除API提供商链上或链下的担忧。 Airnode的无忧式（set-and-forget）框架设计是为了便于实施。

::: tip

可以在<a href="/api3-whitepaper-v1.0.2.pdf#Airnode:%20A%20Node%20Designed%20for%20First-Party%20Oracles" target="_api3-whitepaper">API3白皮书<em x-id="4"></a>_第四章Airnode: 专为第一方预言机设计的节点_中了解更多Airnode。

:::

## 关于 API3更多内容

<!-- START TAB BOX -->

:::: tabs

::: tab  API3 网站

API3网站[https://api3.org/](https://api3.org/)是 了解更多API3信息的最好地方。

:::

::: tab 白皮书

**<a href="/api3-whitepaper-v1.0.2.pdf" target="_api3-whitepaper">API3白皮书</a>摘要**

随着去中心化应用开始在去中心化金融等领域提供有意义的服务，这些应用越来越需要使用传统的Web API来接收数据或触发事件。

然而，由于过于笼统和误导性，通用预言机解决方案无法正确解决API连接问题。 为了解决此问题，API3将致力于推动协作以创建新一代的区块链原生、去中心化API（简称dAPI）。

dAPI由API提供商运营的第一方预言机组成，因此比采用中间人的替代解决方案更安全、更经济。 该方案的治理、安全性和价值获取机制的核心将是API3代币。 对API3代币进行质押将授予其持有者对API3 DAO的全部管理权以及所有相关激励。

质押的API3代币将用作链上保险服务的抵押品，该链上保险服务将为dAPI用户提供可量化且去信任的安全保证。 这些机制将消除在生态系统层面的中央权威机构的需求。 因此，API3项目将允许智能合约平台利用API，以真正去中心化和信任最小化的方式来构建有意义的应用。

:::

::: tab 博文

对学术风格的论文不适应？ 下面的博客文章以浅显易懂的方式解释白皮书。

<blog-posts :tab="'byGroup'"/>

**所有博文**

你可以在我们的[Medium网页](https://medium.com/api3)上找到我们的所有博文。

:::

::: tab  社区

加入API3社区

[[API3 论坛](https://forum.api3.org/)](https://forum.api3.org/)

社区电报交流群[Telegram](https://t.me/API3DAO)

开发者交流群在 [Discord](https://discord.gg/qnRrcfnm5W)

[YouTube 频道[YouTube](https://www.youtube.com/channel/UCCpUthOhahxjdeX9T7t7nJQ)](https://www.youtube.com/channel/UCCpUthOhahxjdeX9T7t7nJQ)

:::

::: tab GitHub

访问 [API3 GitHub](https://github.com/api3dao) 页面可以找到任何你想知道的事情 ， 查阅众多代码库以深入了解API3.

- 白皮书
- 源代码
- 文档
- 用例

欢迎随时为API3的GitHub代码库做出贡献。

:::

::::

<!-- END TAB BOX -->

## 贡献

**API3**对任何建议和改进都是开放的，欢迎所有人做出自己的贡献。

- 新建议题
- 提出合并请求
- 功能建议

在[贡献](./introduction/contributing.md) 章节了解更多关于贡献。
