---
title: 概述
---

<TitleSpan>部署文档</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

Airnode 部署需要有两个文件：

- [config.json](./config-json.md) 是规定API-Airnode集成以及各种节点和部署参数的文件。

- [secrets. nv](./secrets-env.md) 是保存秘密参数的文件 (airnode助记符、 Airnode部署将使用的 API 密钥、区块链供应商的 URL 等)。

- [aws.env](./aws-env.md)是在Airnode被部署到AWS云服务供应商时保存证书的文件。 它是Docker [部署镜像](../../grp-providers/docker/deployer-image.md) 所需要的。

Airnode 部署使用安全方案值（例如API 密钥）和区块链提供者URL等秘密。 在填充`config.json`时，你可以使用标准的shell变量插值语法（例如`${VARIABLE}`）来插入来自`secrets.env`的值。 这种保密方式是单独保存的，但在 Airnode 运行时 可以作为配置的一部分。

`config.json` 文件在 `aws.env` 中没有参考值，因为它是直接通过部署镜像阅读的。

部署镜像在部署后输出一个 [receipt.json](receipt-json.md) 文件，其中包含有关部署的信息，以后可以参考这些信息进行交互或删除。
