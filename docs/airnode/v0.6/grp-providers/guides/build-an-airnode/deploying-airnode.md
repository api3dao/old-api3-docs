---
title: 部署 Airnode
---

<TitleSpan>创建一个 Airnode</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

在集成API（[API Integration](api-integration.md)）和创建配置文件（[Configuring Airnode](configuring-airnode.md)）之后，下一步是部署Airnode。

::: tip 在部署Airnode之前完成以下工作。

- [API 集成](api-integration.md)
- [API 安全性](api-security.md)
- [配置 Airnode](configuring-airnode.md)
- [使用授权者](./apply-auth.md) 可选
- [Heartbeat](./heartbeat.md) 可选
- [HTTP 网关](./http-gateways.md) 可选

:::

## 使用 Docker 部署

建议使用Docker[部署器镜像](../../docker/deployer-image.md)来部署Annode。 这个镜像只是一个针对[deployer CLI](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-deployer)的包装。 如果你想先熟悉一下部署器镜像，可以试试[快速部署](../../tutorial/)教程。

部署器与云供应商交互，以编程方式部署Airnode，而不需要你点击大量不断变化的图形界面。 要做到这一点，需要一个云项目设置和证书，这个在[配置Airnode](./configuring-airnode.md#aws-setup-aws-deployment-only)中讨论过。

## 安裝 Docker

[部署者镜像](../../docker/deployer-image.md)被容器化为Docker镜像。 这将把Airnode部署到云供应商，而不用担心安装依赖性，这也是推荐的部署方式。 如果你还没有安装Docker，请到[Docker网站](https://docs.docker.com/get-docker/)上安装它。

## 部署

在这一点上，你的项目应该类似于以下内容。 `config.json`, `secrets.env`和`aws.env`（如果部署到AWS）和`gcp.json`（如果部署到GCP）文件应该已经准备就绪。 你可能添加的其他文件是预期需要的，但不会被部署器镜像使用。

```
my-airnode
├── aws.env
├── gcp.json
├── config
│   ├── config.json
│   └── secrets.env
└── output
```

从项目目录的根目录运行Docker[部署器镜像](../../docker/deployer-image.md)，将会部署Airnode。 当部署完成后，`receipt.json`文件将被写入`/output`文件夹中。 这个文件包含了关于Airnode的重要配置信息，如果必要的话，需要删除Airnode。

<!-- Use of .html below is intended. -->
<airnode-WarningSimultaneousDeployments removeLink="../../docker/deployer-image.html#manual-removal"/>

<p><airnode-DeployerPermissionsWarning/></p>

### AWS

:::: tabs

::: tab Linux/Mac/WSL2

```
docker run -it --rm \
  --env-file aws.env \
  -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
  -v "$(pwd)/config:/app/config" \
  -v "$(pwd)/output:/app/output" \
  api3/airnode-deployer:0.6.0 deploy
```

:::

::: tab Windows

对于Windows，使用 CMD (而不是 PowerShell)。

```sh
docker run -it --rm ^
  --env-file aws.env ^
  -v "%cd%/config:/app/config" ^
  -v "%cd%/output:/app/output" ^
  api3/airnode-deployer:0.6.0 deploy
```

:::

::::

### GCP

:::: tabs

::: tab Linux/Mac/WSL2

```sh
docker run -it --rm \
  -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
  -v "$(pwd)/gcp.json:/app/gcp.json" \
  -v "$(pwd)/config:/app/config" \
  -v "$(pwd)/output:/app/output" \
  api3/airnode-deployer:0.6.0 deploy
```

:::

::: tab Windows

For Windows, use CMD (而不是PowerShell).

```sh
docker run -it --rm ^
  -v "%cd%/gcp.json:/app/gcp.json" ^
  -v "%cd%/config:/app/config" ^
  -v "%cd%/output:/app/output" ^
  api3/airnode-deployer:0.6.0 deploy
```

:::

::::

当部署完成后，`receipt.json`文件将被写入`/output`文件夹中。

### receipt.json

`receipt.json` 文件是成功部署的产品。 它包含了Airnode的配置信息，如果你选择的话，必须用它来删除Airnode。

```json
{
  "airnodeWallet": {
    "airnodeAddress": "0xaBd9daAdf32fCd96eE4607bf3d5B31e19a244Cac",
    "airnodeAddressShort": "abd9daa",
    "xpub": "xpub661MyMwAqRbcGHp9uC7...vbeziJwFHuNs"
  },
  "deployment": {
    "airnodeAddressShort": "abd9daa",
    "cloudProvider": {
      "type": "aws",
      "region": "us-east-1"
    },
    "stage": "dev",
    "nodeVersion": "0.6.0"
  },
  "api": {
    "httpGatewayUrl": "https://6vmx3xp8tj.execute-api.us-east-1.amazonaws.com/v1"
  }
}
```

## 使用 HTTP 网关测试

如果你选择了启用HTTP网关，它可以用来测试Airnode，同时绕过它所部署的链。 在其他文档中，有三个例子详细说明了如何做到这一点。

- [HTTP网关](./http-gateways.md#using-curl)
- [快速部署 AWS](../../tutorial/quick-deploy-aws/#test-the-airnode)
- [快速部署 GCP](../../tutorial/quick-deploy-gcp/#test-the-airnode)

## 移除Airnode

当Airnode被部署时，在`/output`文件夹中创建了一个 `receipt.json`文件。 需要此文件才能删除 Airnode。

### AWS

:::: tabs

::: tab Linux/Mac/WSL2

```sh
docker run -it --rm \
  --env-file aws.env \
  -v "$(pwd)/output:/app/output" \
  api3/airnode-deployer:0.6.0 remove -r output/receipt.json
```

:::

::: tab Windows

对于Windows，使用 CMD (而不是 PowerShell)。

```sh
docker run -it --rm ^
  --env-file aws.env ^
  -v "%cd%/output:/app/output" ^
  api3/airnode-deployer:0.6.0 remove -r output/receipt.json
```

:::

::::

### GCP

:::: tabs

::: tab Linux/Mac/WSL2

```sh
docker run -it --rm \
  -v "$(pwd)/gcp.json:/app/gcp.json" \
  -v "$(pwd)/output:/app/output" \
  api3/airnode-deployer:0.6.0 remove -r output/receipt.json
```

:::

::: tab Windows

对于Windows，使用 CMD (而不是 PowerShell)。

```sh
docker run -it --rm ^
  -v "%cd%/gcp.json:/app/gcp.json" ^
  -v "%cd%/output:/app/output" ^
  api3/airnode-deployer:0.6.0 remove -r output/receipt.json
```

:::

::::

## 调用Airnode

Airnode部署完毕，请参阅[调用Airnode](../../../grp-developers/call-an-airnode.md)，以了解如何向其发出请求。
