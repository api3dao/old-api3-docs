---
title: dAPI (去中心化API)
---

# {{$frontmatter.title}}

<TOC class="table-of-contents" :include-level="[2,3]" />

考虑以下内容：

- 分散的应用程序需要访问 [API](./apis.md)；
- API应通过 [第一方预言机](./first-party-oracles.md) 与智能合约平台对接。
- 对于API级别的去中心化， 应该采用[去中心化方式治理的预言机网络](./decentrally-governed-oracle-networks.md)。

可以得出的结论是，去中心化治理的第一方预言机网络解决了API连接性问题。当然这在技术上是没问题的，但同样的解决方案可以通过一个更有用的场景来达成。

去中心化应用程序不能访问网络API，预言机解决方案则致力于建立去中心化接口来解决这个问题。 然而，这种方法的结果是劣质的解决方案和生态系统(详情请参阅
<a href="/api3-whitepaper-v1.0.2.pdf" target="_api3-whitepaper">API3
白皮书r</a>)。

<p align="center">
  <img src="../assets/images/dapi.png" />
</p>

相反，API3构建了完整的产品，称为去中心化API（简称dAPIs），是区块链原生的、去中心化的API服务。从用户（即使用去中心化应用的实体）的角度来看，使用dAPI的经验将与使用传统API的网络开发者非常相似；他们会找到他们需要的dAPI，支付订阅费并享受访问。

与传统的预言机网络不同的是，dAPI被定义为一个完整的产品而不是一个接口，dAPI包括底层API。这成就了一个卓越的解决方案（安全又经济的第一方预言机）和生态系统（将API供应商作为其成员）。
