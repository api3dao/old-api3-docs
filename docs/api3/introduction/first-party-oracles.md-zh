---
title: 第一方预言机
---

# {{$frontmatter.title}}

<TOC class="table-of-contents" :include-level="[2,3]" />

预言机是一个作为智能合约平台和API之间中介的代理。换句话说，一个去中心化的应用程序可以使用一个预言机来调用一个API。

<p align="center">
  <img src="../assets/images/oracle.png" />
</p>

一个预言机主要有两个部分组成：

- 预言机节点，作为代理监听区块链上的请求，通过网络调用API，然后促成区块链上的交易来满足请求。需要注意的是，预言机节点是一个传统的应用程序，需要托管。
- 实现协议的智能合约，执行规定去中心化应用程序如何向预言机发出请求并接收响应的协议。这一部分部署在区块链上，以无许可的方式运行，即不需要特定的一方来托管它。

照这样看，貌似一个预言机就能解决API连接性问题。然而，有一个重要的问题需要考虑：谁来托管这个预言机节点？

1. 如果 [API 提供商](./apis.md#api-provider) 托管了预言机节点， 则预言机叫作 **第一方预言机**。
2. 如果是由第三方中间人托管了预言机节点，则该预言机叫作 **第三方预言机**

_查看我们的文章 [First Party vs Third Party Oracles](https://medium.com/api3/first-party-vs-third-party-oracles-90356e3cffe5) 来比较一下两种预言机。_

第三方预言机既不安全又昂贵(详见
<a href="/api3-whitepaper-v1.0.2.pdf#Issues%20with%20Third-Party%20Oracles%20as%20Middlemen" target="_api3-whitepaper">API3白皮书</a> _第三方预言机中间商问题（Issues with Third-Party Oracles as Middlemen_)。 相比之下，由于在接口路径上没有中间人，第一方预言机既安全又经济。
