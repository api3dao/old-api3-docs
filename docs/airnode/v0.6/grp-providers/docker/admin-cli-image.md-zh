---
title: Airnode Admin CLI镜像
---

<TitleSpan>Docker 镜像</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" /><!-- TODO: link \[docker hub\](https://hub.docker.com/r/api3/airnode-admin) once image is published --><!-- TODO: link \[Airnode repository\](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-admin/docker) once image is published -->使用 admin CLI 图像作为替代方法，使用npx执行 [AdminCLI 命令](../../reference/packages/admin-cli.md)。 两种方法将实现相同的结果。 该镜像放弃下载admin CLI软件包，每次使用npx执行命令时都会重新下载。

如果您想要从源代码创建管理员CLI镜像， 您可以在 Airnode 仓库中找到这个[镜像生成说明](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-admin/docker)。

关于 [admin CLI image](../../reference/packages/admin-cli.md#using-docker) 的其他信息，可在管理员CLI 命令文档中获取。

## 用法

下面的示例显示了在执行`get-sponsor-status` 管理员CLI 命令时，使用docker镜像与npx 之间的差异。

```sh
#npx
npx @api3/airnode-admin get-sponsor-status \
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --sponsor-address 0x9Ec6C4... \
  --requester-address 0x2c2e12...

# Docker
docker run api3/airnode-admin:0.6.0 get-sponsor-status \
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --sponsor-address 0x9Ec6C4... \
  --requester-address 0x2c2e12...
```
