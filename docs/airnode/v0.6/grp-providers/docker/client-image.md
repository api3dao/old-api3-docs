---
title: Airnode 客户端镜像
---

<TitleSpan>Docker 镜像</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

通常使用 [部署器](./deployer-image.md)， 在无服务器平台上部署Airnode 。 不过，还有另一个选择，那就是在本地机器上的docker容器中运行Airnode，无论是在本地还是在云端托管。

docker客户端镜像已在 [Docker Hub](https://hub.docker.com/r/api3/airnode-client) 上发布。 如果您想要从源代码中自行构建容器， 您可以在 [Airnode 仓库](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-node/docker) 中找到镜像以及生成说明。

## 配置

Airnode 运行需要两个配置文件： `config.json` and `secrets.env`。 这些文件需要通过 卷传递到 Docker容器。

Docker容器寻找内部安装在 `/app/config` 目录下的配置文件。

你当前的工作目录应该包含有上述配置文件的`config`文件夹，使用`--volume`参数将其绑定到docker的`/app/config`目录。

:::: tabs

::: tab Linux/Mac/WSL2

```sh
$ tree
.
└── config
    ├── config.json
    └── secrets.env
$ docker run --volume $(pwd)/config:/app/config ...
```

:::

::: tab Windows PowerShell

```sh
$ tree
.
└── config
    ├── config.json
    └── secrets.env
$ docker run --volume $(pwd)/config:/app/config ...
```

:::

::: tab Windows CMD

```sh
$ tree
.
└── config
    ├── config.json
    └── secrets.env
$ docker run --volume %cd%:/config:/app/config ...
```

:::

::::

## 用法

运行 Airnode Docker 容器的示例目录结构和命令。 下面的命令是从描述的目录运行的。

### 运行Airnode

建议使用 `--detach` 参数以分离模式运行 Airnode ，但也可以在没有它的情况下运行它。

:::: tabs

::: tab Linux/Mac/WSL2

```sh
docker run --detach \
  --volume $(pwd)/config:/app/config \
  --name airnode \
  api3/airnode-client:0.6.0
```

:::

::: tab Windows PowerShell

```sh
docker run --detach \
  --volume $(pwd)/config:/app/config \
  --name airnode \
  api3/airnode-client:0.6.0
```

:::

::: tab Windows

```sh
docker run --detach ^
  --volume %cd%/config:/app/config ^
  --name airnode ^
  api3/airnode-client:0.6.0
```

:::

::::

> 如果你想把Airnode连接到运行在localhost上的区块链，需要让区块链可以从docker内部访问。 如果你使用版本的linux，可以使用 `--network="host"` 参数。 对于windows、wsl或mac，连接到`host.docker.internal`而不是`127.0.0.1`。 请参阅 [https://stackoverflow.com/a/24326540](https://stackoverflow.com/a/24326540)。

### 检查 Airnode 日志

如果您以分离模式运行Airnode ，您需要使用 `日志` 命令到 访问日志。 你也可以使用`--follow` 参数来串联Airnode的日志输出。

```bash
docker logs airnode
```

或者

```bash
docker logs --follow airnode
```

## 停止Airnode

```bash
docker stop airnode
```
