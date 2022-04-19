---
title: Airnode 部署器镜像
---

<TitleSpan>Docker 镜像</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

可以使用部署器映像来部署或删除与AWS等云提供商的Airnode。 最简单的方法是使用预设置的软件包。 如果您希望 自行构建镜像，请在部署器软件包[README](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-deployer/docker)中查看。

部署器镜像有两条命令。

- `deploy`: 使用配置文件部署或更新一个Airnode。
- `remove`: 使用 `receivt.json` 文件删除一个 Airnode

::: tip 快速部署演示

请参阅 [快速部署演示](../tutorial/)，用部署器镜像快速`deploy` 和 `remove`预配置的Airnode。

:::

## 云供应商账户

为了将Airnode部署到无服务器的云提供商，你需要向Airnode部署器镜像提供供应商的凭证。 该部署器镜像目前支持部署到AWS和GCP。

### AWS

如果你是AWS的新用户，请观看此[视频](https://www.youtube.com/watch?v=KngM5bfpttA)，以设置AWS账户并创建云供应商的凭证。

### GCP

- 创建一个[谷歌云项目](https://cloud.google.com/resource-manager/docs/creating-managing-projects)。
- 为你的项目启用[App Engine Admin API](https://console.cloud.google.com/apis/library/appengine.googleapis.com)。
- 创建一个具有`Owner` 角色的新的

服务</code>账户。</p></li> 
  
  - 为服务账户添加一个新的JSON类型的访问密钥，并将其下载另存为`gcp.json`。</ul> 



## 部署

`deploy`命令将创建带有云供应商的Airnode，如果它已经存在，则更新它。 运行deploy命令需要三个文件。

- config.json
- secrets.env
- aws.env (仅适用于 AWS)
- gcp.json (仅限GP)

`receivt.json` 文件将在完成后创建。 它包含一些部署信息，并用于移除Airnode。

<!-- Use of .html below is intended. -->
<airnode-WarningSimultaneousDeployments removeLink="./deployer-image.html#manual-removal"/>

<p><airnode-DeployerPermissionsWarning/></p>

### AWS

:::: tabs

::: tab Linux/Mac/WSL2



```sh
docker run -it --rm \
  --env-file aws.env \
  -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
  -v "$(pwd)/config:/app/config" \
  -v "$(pwd)/output:/app/output" \
  api3/airnode-deployer:0.6.0 deploy
```


:::

::: tab Windows

For Windows, use CMD (而不是PowerShell).



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



```sh
docker run -it --rm ^
  -v "%cd%/gcp.json:/app/gcp.json" ^
  -v "%cd%/config:/app/config" ^
  -v "%cd%/output:/app/output" ^
  api3/airnode-deployer:0.6.0 deploy
```


:::

::::



## 移除

当使用`deploy`命令部署Airnode时，会创建一个 `receipt.json`文件。 使用此文件来删除 Airnode。



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

For Windows, use CMD (而不是PowerShell).



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
  api3/airnode=deployer:0.6.0 remove -r output/receipt.json
```


:::

::: tab Windows

For Windows, use CMD (而不是PowerShell).



```sh
docker run -it --rm ^
  -v "%cd%/gcp.json:/app/gcp.json" ^
  -v "%cd%/output:/app/output" ^
  api3/airnode-deployer:0.6.0 remove -r output/receipt.json
```


:::

::::



## 手动移除

你可以选择手动删除Airnode，但强烈建议使用部署者镜像的`remove`命令来删除。 Airnode在AWS和GCP的多个领域都有存在。 Airnode有一个`airnodeAddressShort`短地址（例如0ab830c），它包含在AWS和GCP部署功能的元素名称中。

::: 危险提示

只删除你所针对的名称中带有`airnodeAddressShort`地址的元素。 因为可能存在不止一个的Airnode。

:::

:::: tabs

::: tab AWS

<airnode-DeleteAirnodeAws />

:::

::: tab GCP

<airnode-DeleteAirnodeGcp />

:::

::::

如需了解更多关于 AWS 或 GCP 的资源，请通过 [云资源](../../reference/cloud-resources.md) 文档查看。
