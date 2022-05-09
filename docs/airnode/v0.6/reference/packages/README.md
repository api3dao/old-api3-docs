---
title: 概述
---

<TitleSpan>软件包</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

Airnode是一个完全无服务器的预言机节点，是专门为API供应商操作自己的预言机而设计的。 它的代码库是一个使用[Lerna](https://github.com/lerna/lerna)a管理的monorepo。 [Airnode monorepo](https://github.com/api3dao/airnode/tree/v0.5/packages) 有好几个软件包。 其中一些软件包被dApp开发者和API提供者用来与Airnode交互，或构建Airnode。 有一些只是用于Airnode的内部开发。

- [airnode-adapter](./adapter.md)
- [airnode-admin](./admin-cli.md)
- [airnode-abi](./airnode-abi.md)
- [airnode-deployer](./deployer.md)
- [airnode-validator](./validator.md)

---

**阅读monorepo中每个软件包的相关信息。**

Airnode软件包是跨平台的，可作为npm包或docker容器。 你也应该能够在任何平台上克隆、构建和使用这些包。 然而，不能保证只有开发的功能（如测试或例子）能够开箱即用。 建议使用基于UNIX的系统进行开发。 如果你使用的是Windows，可以考虑[WSL2](https://docs.microsoft.com/en-us/windows/wsl/install)。

[**airnode-adapter**:](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-adapter) 进行API调用的模块, 处理响应, 并返回单个 值。

[**airnode-admin**:](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-admin) 一个与Airnode合约进行跨链互动的软件包/CLI 工具。

[**airnode-abi**:](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-abi) 依照[Airnode ABI 规格](../specifications/airnode-abi-specifications.md) ，为Airnode提供编码和解码工具。

[**airnode-deployer**:](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-deployer)自动部署的工具。

[**airnode-examples**:](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-examples) 显示Airnode功能的示例列表。

[**airnode-node**:](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-node) Airnode 的节点部分允许将多个区块链连接到其余的世界。

[**airnode-ois**:](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-ois) [预言机集成规格(OIS)](/ois/v1.0.0/ois.md)的类型。

[**airnode-operation**:](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-operation) Airnode核心部件的开发和测试工具。

[**airnode-protocol**:](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-protocol) 实现Airnode RRP (请求-响应协议)的合约。

[**airnode-validator**:](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-validator) 可以用于验证和转换airnode规范文件的软件包。
