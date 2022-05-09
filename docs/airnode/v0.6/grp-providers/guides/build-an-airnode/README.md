---
title: 入门指南
---

<TitleSpan>创建一个 Airnode</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

《建立 Airnode 》指南将详细讨论如何构建 Airnode。 但开始之前，请参阅[快速部署](../../tutorial/README.md)的演示版，以简单了解 Airnode 部署。 针对[AWS快速部署](../../tutorial/quick-deploy-aws/)和[GCP快速部署](../../tutorial/quick-deploy-gcp/)的演示，都有预先配置好的可下载项目文件夹，其中有典型部署的文件。 本指南主要关注 AWS 的部署，也描述了 GCP 部署在遇到时所需的更改。

## 项目文件夹

创建一个名为`/my-airnode`的文件夹，还有两个名为`/config`和`/output`的内部文件夹。 将config.json、secrets.env和aws.env文件创建到下面所示的位置。

```
my-airnode
├── aws.env      <- Only used for AWS deployments.
├── config
│   ├── config.json
│   └── secrets.env
└── output
```

本指南将解释配置文件的内容，并在这个项目文件夹内运行部署。 如果你是Airnode的新手，请使用文档中[模板](../../../reference/templates/config-json.md)部分的文件来获得快速入门。 如果你是Airnode的新手，在使用本指南之前也可以考虑阅读[快速部署演示](../../tutorial/)。

## 配置

创建 Airnode 的主要重点是准备三个文件（其中两个用于 GCP），它们都用于定义和支持其创建。

- `config.json`: 定义 Airnode 及其行为。
- `secrets.env`: 使用插值保存`config.json` 引用的秘密。
- `aws.env`: 保存 Docker 部署镜像，用于将 Airnode 部署到 AWS 的 AWS 凭证。

## 部署

最后是部署。 通常有两种方式来运行Airnode。 最流行的是与AWS或GCP等云供应商合作。 你可以使用Docker[ Airnode部署器镜像](../docker/../../docker/deployer-image.md)进行这种部署。 本指南将使用部署器镜像。

第二种方法是运行内部托管的容器化的Airnode，或者使用云供应商的服务（例如AWS EC2或Lightsail）。 在这种类型的部署中，使用Docker [Airnode客户端镜像](../../docker/client-image.md)。

继续阅读以下章节，以深入了解Airnode的情况。

- [API 集成](api-integration.md)
- [API 安全性](api-security.md)
- [配置 Airnode](configuring-airnode.md)
- [使用授权者](./apply-auth.md) 可选
- [Heartbeat](./heartbeat.md) 可选
- [HTTP 网关](./http-gateways.md) 可选
- [部署 Airnode](./deploying-airnode.md)
