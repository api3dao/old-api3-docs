---
title: 概述
---

<TitleSpan>Docker 镜像</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

使用Docker是将Airnode部署到云供应商和在本地运行Airnode的最简单方法。 有两个Docker镜像：Airnode部署器镜像和Airnode客户端镜像。

还有一个docker镜像包装了admin CLI软件包，作为使用`npx`的替代方案。

要使用这些镜像，首先要安装[Docker](https://docs.docker.com/get-docker/)（如果你的系统上没有的话）。

- [Airnode部署器镜像](./deployer-image.md)将节点以无服务器功能的形式，部署到无服务器云供应商（例如AWS Lambda）。

- [Airnode客户端镜像](client-image.md)是节点本身的容器化。 容器可以在本地运行，也可以部署到云托管服务（如AWS EC2或Lightsail）。

- [Airnode管理员CLI镜像](admin-cli-image.md)将管理员CLI包包裹在docker镜像中，为管理员CLI命令（npx）提供替代使用选项。

## DockerHub

所有镜像都可在 DockerHub 上获取。 不需要手动下载这些镜像，因为在运行所提供的Docker命令时，它们会自动推送。

<ul>
  <li>
    <a
      :href="'https://hub.docker.com/r/api3/airnode-deployer/tags'"
      target="_docker-hub"
      >Airnode 部署器镜像      <ExternalLinkImage />
    </a>
  </li>

  <li>
    <a
      :href="'https://hub.docker.com/r/api3/airnode-client/tags'"
      target="_docker-hub"
      >Airnode 客户端镜像      <ExternalLinkImage />
    </a>
  </li>

  <li>
    <a
      :href="'https://hub.docker.com/r/api3/airnode-admin/tags'"
      target="_docker-hub"
      >Airnode 管理员CLI镜像      <ExternalLinkImage />
    </a>
  </li>
</ul>

<DockerImageVersions/>
