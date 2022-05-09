---
title: 云资源
---

<TitleSpan>参考文件</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

当部署到 AWS 或 GCP 等云端提供商时，Airnode 使用了某些资源来全面运行。

:::: tabs

::: tab AWS

| 资源          | 说明                               |
|:----------- |:-------------------------------- |
| EventBridge | 启动Airnode 服务的计时器。                |
| CloudWatch  | 已部署资源的日志组。                       |
| Lambda      | Airnode的核心。 提供Airnode 服务的无服务器功能。 |
| IAM         | 角色和策略，用于允许其他资源之间的沟通。             |
| API网关       | HTTP网关和HTTP已签名的数据网关端点。           |
| S3          | 描述已部署基础设施状态的文件。                  |

:::

::: tab GCP

| 资源    | 描述                               |
|:----- |:-------------------------------- |
| 云调度工具 | 启动Airnode 服务的计时器。                |
| 云函数   | Airnode的核心。 提供Airnode 服务的无服务器功能。 |
| API网关 | HTTP 网关和HTTP已签名的数据网关端点。          |
| 云存储   | 描述已部署的基础设施状态的文件和云功能的源代码。         |
| IAM   | 服务账户和角色，以允许其他资源之间的沟通。            |

:::

::::
