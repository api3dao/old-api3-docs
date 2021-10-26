---
title: Overview
---

<TitleSpan>Packages</TitleSpan>

# {{$frontmatter.title}}

Airnode is a fully-serverless oracle node that is designed specifically for API providers to operate their own oracles. Its code base is a monorepo managed using [Lerna](https://github.com/lerna/lerna).

The [Airnode monorepo](https://github.com/api3dao/airnode/tree/master/packages) has several packages:

[**adapter**:](https://github.com/api3dao/airnode/tree/master/packages/adapter) The module that makes an API call,
processes the response and returns a single value

[**admin**:](https://github.com/api3dao/airnode/tree/master/packages/admin) A package/CLI tool to interact with the
Airnode contracts across chains

[**airnode-abi**:](https://github.com/api3dao/airnode/tree/master/packages/airnode-abi) Encoding and decoding utilities
for Airnode according to the
[Airnode ABI specifications](../specifications/airnode-abi-specifications.md)

[**deployer**:](https://github.com/api3dao/airnode/tree/master/packages/deployer) Tools to automate Airnode deployment

[**examples**:](https://github.com/api3dao/airnode/tree/master/packages/examples) A public list of examples showcasing
the features of Airnode

[**node**:](https://github.com/api3dao/airnode/tree/master/packages/node) Airnode itself

[**ois**:](https://github.com/api3dao/airnode/tree/master/packages/ois) Types for
[Oracle Integration Specification (OIS)](../specifications/ois.md)

[**operation**:](https://github.com/api3dao/airnode/tree/master/packages/operation) Development and testing utilities
for the core parts of Airnode

[**protocol**:](https://github.com/api3dao/airnode/tree/master/packages/protocol) Contracts that implement Airnode RRP
(request–response protocol)

[**validator**:](https://github.com/api3dao/airnode/tree/master/packages/validator) A package that can be used to
validate and convert airnode specification files

Airnode packages are cross platform, available as npm packages or docker containers. You should also be able to clone, build and use the packages on any platform. However we do not guarantee that the development only features (e.g. test or examples) will work out of the box.

It is recommend to use UNIX based systems for development. If you are using Windows, consider [WSL](https://docs.microsoft.com/en-us/windows/wsl/install).