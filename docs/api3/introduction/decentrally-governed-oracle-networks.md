---
title: 去中心化治理预言机网络
---

# {{$frontmatter.title}}

<TOC class="table-of-contents" :include-level="[2,3]" />

_查看medium文章： [On DAOs: Decentralized Autonomous Organizations](https://medium.com/api3/on-daos-decentralized-autonomous-organizations-84c00abb89bc) 了解DAO和去中心化治理。_

[第一方预言机](./first-party-oracles.md) 有着理想的安全性和成本效益。 尽管如此，它们不能被视为所有用例的完整解决方案。这是因为第一方预言机是由单一的API供应商操作的，并且只为他们的API服务。那么，使用单一的第一方预言机会在API层面上产生集中化，并要求API提供商被信任。这在某些用例中是不可接受的，例如，如果需要保证大量资金安全的用例。

在这种情况下，预言机网络实现了要求的去中心化。一个预言机网络向多个独立的预言机提出相同的请求，并通过预先确定的共识规则将它们的响应减少到一个单一的答案，该规则以称为聚合器的智能合约的形式实施。单一恶意的预言机不能操纵这个过程的结果，这就提供了一定程度的去中心化和免信任性。

<p align="center">
  <img src="../assets/images/central-governance.png" />
  <img src="../assets/images/decentral-governance.png" />
</p>

在这里，还需要考虑的一个重要问题是如何管理预言机网络。如果一个中心实体可以切换聚合器中使用的预言机或API，甚至可以利用代理机制替换聚合器本身，他们就可以有效地随意操纵预言机网络的输出，这就消除了使用预言机网络所提供的去中心化和免信任的品质。因此，使用预言机网络进行去中心化是不够的，还需要对预言机网络进行去中心化的管理。
