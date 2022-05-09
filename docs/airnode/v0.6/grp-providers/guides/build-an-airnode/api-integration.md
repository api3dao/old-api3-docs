---
title: API 集成
---

<TitleSpan>创建一个 Airnode</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,4]" />

API与Airnode的成功集成，需要彼此的接口映射。 这是用OIS（[Oracle集成规范](/ois/v1.0.0/ois.md)）json对象完成的，在config.json文件中可以找到，根据设计，其集成需遵循三个基本步骤。

- 指定 API 操作
- 指定了Airnode 端点
- Airnode 端点已映射到 API 操作

<!-- prettier-ignore-->
> ![api-integration-ois](../../../assets/images/api-integration-ois.png) <br/><br/>
> 
> <p class="diagram-line">config.json中的OIS对象，包含API操作与Airnode端点定义的映射信息。</p>
OIS是一个API操作的映射，如`GET /coins/{id}`，将其映射到Airnode端点。 当请求者合约调用AirnodeRrp.sol合同请求函数，如`makeFullRequest(..., callData) `时，呼叫数据被传达给链外的Airnode，Airnode使用OIS映射，将呼叫数据转化为适合API操作的有效HTTP请求。

将 API 集成到 Airnode，唯一需要做的就是在 Airnode 的 config.json 文件中创建一个 OIS 对象。 本指南是创建 OIS 对象的指导方法。 OIS 借鉴了 [OAS OpenAPI 规范](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md)的格式. 如果您有 OAS的经验，适应OIS起来也会很快。

::: tip OAS

然而，我们不建议在创建OIS对象时参考OAS的经验。 OIS只是借用了OAS的格式化做法。 创建OIS对象所需的一切，都在下列这些文档中。

:::

**使用本指南的小贴士：**

- 在另一个浏览器窗口中打开[OIS模板](../../../reference/templates/ois-json.md)，以便进行跟踪。
- 查看Airnode入门教程中的一个[Airnode config.json文件](../../../reference/examples/config-json.md)的例子。

## OIS 模板

OIS是一个json对象，作为 (`ois`) _键_添加到Airnode的[config.json](../../../reference/templates/config-json.md)文件中，有时也被称为_字段_。 你可以尝试使用[OIS模板](../../../reference/templates/ois-json.md)来构建一个OIS，并在以后将其添加到Airnode的config.json文件中。

在 OIS 模板中，一些字段包含 `{FILL_*}`。 这意味着添加的值是独立于其他字段的。 另一方面，如果两个字段包含相同的表达式（例如，`{FILL_OPERATION_PARAMETER_1_NAME}`) ，你必须在其中使用相同的值，因为它们是互相引用的。

OIS使用简化的OAS版本。 这意味着，如果你有要集成的API的OpenAPI规范，你就完成了80%，因为你可以复制粘贴整个部分（但要确保进行必要的修改，以符合OIS的格式）。

<!--
::: tip

If you already have an OAS file it may be possible to convert it to OIS. To
assist in converting between various specifications e.g. from OAS to OIS, there
is a `convert` command within the Airnode
[validator](../../../reference/packages/validator.md#convertor) package.

:::
-->

本指南将假设在没有要集成的API的OpenAPI规格时开展的操作。

<!--------------- STEP 1 ---------------->

## 第1步：指定OIS的定义

通过向OIS json对象的根目录添加三个描述性字段，开始构建OIS。

```json
{
  "oisFormat": "1.0.0",
  "title": "myOisTitle",
  "version": "0.1.0",
  ...
}
```

### oisFormat

将其保留为 `1.0.0`, 这是当前的 OIS 格式版本。

### title

这是该OIS的唯一标题。 注意，一个Airnode可以配置一个以上的OIS，并使用标题作为OIS的标识符。

### version

这是OIS的版本，可以对OIS的集成进行版本控制。 建议使用[semver](https://semver.org/)版本控制 最初的版本可以设置成`<0.1.0>`。

<!--------------- STEP 2 ---------------->

## 第2步：指定API

`apiSpecifications`字段用于描述API及其操作。

```json
"apiSpecifications": {
  "servers": [...],
  "paths": {...},
  "components": {...}
}
```

### Servers

指定你的API，第一步是在`apiSpecifications.servers[0].url`字段中输入其_baseUR_。 `apiSpecifications.servers`数组中只允许有一个对象（即 url）。 如果服务器有多 个元素，则会在转换期间引发警告。 此 baseURL 将适用于所有操作。

#### 选择基本 URL

考虑以下完整 URL 来执行返回所有已知令牌的 API 操作。

<!-- markdown-link-check-disable-next-line -->

> https://www.myapi.com/v1/tokens

有两种方式解决此问题。

<!-- markdown-link-check-disable-next-line -->

> **baseURL:** https://www.myapi.com
> 
> **path:** /v1/data

或者

<!-- markdown-link-check-disable-next-line -->

> **baseURL**: https://www.myapi.com/v1
> 
> **path:** /data

因为调用`baseURL+path`的结果，都是同一个完整的URL。

<!-- markdown-link-check-disable-next-line -->

将baseURL设置为你期望被所有操作共享的完整URL的部分。 从上面的例子来看，建议使用`https://www.myapi.com`，以备将来在API中添加以` /v2`开头的额外路径。 正如大家都知道的那样，API集成需要许多主观的选择，而且是艺术多于科学。

```json
"apiSpecifications": {
  "servers": [ // Only one element is allowed in the servers array.
    {
      "url": "https://www.myapi.com"
    }
  ],
  ...
}
```

### 路径

_paths_字段定义了所有的API操作，很像一个OpenAPI规范文件。

_什么是API操作？_

> API操作被指定为一个 _**path**_ 和HTTP _**method**_的唯一组合。 `GET /token/{id}`

#### 操作

在下面的例子中， `GET`指的是一种[HTTP请求方法](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)。 这意味着你可以有另一个API操作，可以使用不同的方法来指定，但路径相同。

> path: /data
> 
> method: GET

> path: /data
> 
> method: POST

因此，仅靠路径不足以指定 API 操作，还必须提供方法。 如果需要新路径，则它必须使用自己的方法，在路径中启动一个新对象。 目前 Airnode 仅支持 GET 和 POST 方法。

对于 [OIS 模板](../../../reference/templates/ois-json.md)，元素的名称（表示为`{FILL_PATH}`）应替换为路径（例如` /data`）。 同样，`{FILL_METHOD} `应替换为您要集成的操作的方法（例如 `get`)。 这种方法必须使用小写。

下面的例子说明了三种操作, `GET /data`, `POST /data`, `GET /tokens`.

```json
"paths": {
  "/data": {   // path    {FILL_PATH}
    "get": {   // method  {FILL_METHOD}
      ...      // parameters
    },
    "post": {  // method  {FILL_METHOD}
      ...      // parameters
    }
  },
  "/tokens": { // path    {FILL_PATH}
    "get": {   // method  {FILL_METHOD}
      ...      // parameters
    }
  }
}
```

#### 参数 (操作)

在指定 API 操作的路径和方法后，最后一步是指定其参数。 每个参数都是 `apiSpecifications.paths.{PATH}.{METHOD}.parameters`数组中的一个对象，其中包含字段` in`和 `name`。 `in`告诉参数在 HTTP 请求中的位置，`name`告诉参数值将被发送的名称。 目前 Airnode 支持以下参数类型，可与`in`一起使用。

- query
- header
- path
- cookie

集成 POST 方法时，使用` in: query`定义body参数。 Airnode 会将所有`query` 类型转换为 `requestBody`。 请注意，仅支持非嵌套的 application/json 内容类型。

不必指定所有 API 操作参数，只需指定链上请求者需要的、能够提供的参数（请参阅 Airnode 端点[参数](./api-integration.md#parameters)），以及您要为其硬编码值的参数（请参阅 Airnode 端点[固定操作参数](./api-integration.md#fixedoperationparameters)）。

```json
"paths": {
  "/data/{id}": {
    "get": {
      "parameters": [
        {
          "in": "path",
          "name": "id"
        },
        {
          "in": "header",
          "name": "Accept"
        }
      ]
    }
  }
}
```

_Example: 获取代币_

`GET /token/{id}` 函数使用作为`path` 参数的代币`id` ，返回一个代币。

| Method | Path        | in   | name |
| ------ | ----------- | ---- | ---- |
| GET    | /token/{id} | path | id   |

_示例：创建代币_

`POST /token` 操作可以接受三个参数。 代币的名称和描述放在类型`query` 中，并在调用 API 操作时由 Airnode 移动到 requestBody。 第三个是`header`参数，描述请求的Content-Type，例如`application/json`或者 `application/x-www-form-urlencoded`。

| Method | Path   | in     | name        |
| ------ | ------ | ------ | ----------- |
| POST   | /token | query  | name        |
|        |        | query  | description |
|        |        | header | Accept      |

_示例：获取所有代币_

`GET /tokens` 返回所有代币的列表。 列表计数可以使用 API 操作认为是可选的 `limit' 参数来限制，因为如果省略它不会返回错误。

> `GET /tokens` 返回所有代币。
> 
> `GET /tokens?limit=10` 返回前10个代币。

| Method | Path   | in    | name  |
| ------ | ------ | ----- | ----- |
| GET    | /token | query | limit |

<!--------------- STEP 1 ---------------->

## 第 3 步：指定 Airnode 端点

Airnode 端点是 Airnode 向链上请求者公开的服务。 它映射到 API 操作，但这种映射的性质是可定制的。 集成者的工作就是定义这个服务是什么。

例如，如果您的 API 操作根据其代码（例如 `BTC`）返回资产价格，您可以指定端点，以便请求者将代码作为参数提供。 由此产生的端点将是一个通用的端点，可以返回任何种类资产的价格。 另一方面，您可以将 `BTC` 硬编码为将返回其价格的资产（使用[固定操作参数](./api-integration.md#fixedoperationparameters)），这将使你的端点成为一个特定的端点，只返回BTC的价格。

推荐的端点定义模式是为每个API操作创建一个Airnode端点，并允许请求者自己提供所有操作参数。 这将带来最佳的灵活性，并从本质上允许请求者在链上使用完整的API功能。 通常情况下，预言机集成会努力对尽可能多的API参数进行硬编码，因为在链上传递这些参数会产生gas 成本开销。 然而，Airnode协议使用[模板](../../../concepts/template.md)（不要与本指南使用的OIS模板相混淆），它允许请求者在没有额外gas 成本的情况下，指定大量的端点参数。

请注意，在某些情况下，你可能不希望将端点与API操作一一对应。 例如，一个API操作可以有一个`header` 参数：`Accept`, 它可以取值为 `application/json`或 `applicatino/xml `，以确定如何格式化API将响应调用的数据。 Airnode期望响应为`JSON `格式的，因此将这个参数硬编码为JSON比让请求者决定更合适，因为只有一个有效的选择。 同样，集成商的工作就是要意识到这些微妙之处，并做出判断。

在这个简短的迂回之后，让我们回到填写我们的OIS模板上。

### 端点

字段 `endpoints`是一个数组，每一行代表一个 Airnode 端点。 您需要填写的第一个字段是 `name`。 确保它是描述性的并且与其他端点名称不同。 如果您将 API 操作一对一地集成到 Airnode 端点，使用 API 操作路径作为端点名称是一个不错的选择（即`/token`）。 请注意， 如果对单个路径（即`GET/token`）有多个使用不同方法的操作，您也可以将方法添加到此名称中。

下一步是填写`operation` 对象 。 在这里，您需要输入您在 `apiSpecifications.paths`,中定义的 API 操作`path` 和`method`， 从而导致 Airnode 端点调用现在链接的 API 操作。

#### fixedOperationParameters

硬编码 API 参数并不少见（回想一下上面示例中的`Accept `操作参数）。 这种硬编码的参数称为`fixedOperationParameters`。

OIS模板中`endpoints[n].fixedOperationParameters`下有一个固定的操作参数，指的是第一个API操作参数。 这意味着，每当 Airnode 收到对该端点的请求时，都会使用设置为 <code style="overflow-wrap:break-word;">endpoints[n].fixedOperationParameters[n].value </code>的 API 操作参数进行相应的 API 调用。 请求者不提供` fixedOperationParameters `的值。

一个 Airnode 端点可以有多个` fixedOperationParameters`。 API 操作参数不能同时存在于 `endpoints[n].fixedOperationParameters` 和`endpoints[n].parameters`.。

#### reservedParameters

请求者可以提供一些未映射到 API 操作参数的参数。 这些参数被称为“保留参数”，他们的名称 以下划线开头。 有关更多信息，请参阅[相关的 OIS 文档](/ois/v1.0.0/ois.md#_5-4-reservedparameters)。

当前的保留参数列表是`_type`, `_path` 和 `_times`。 请参阅 OIS 文档集中的[保留参数](/ois/v1.0.0/reserved-parameters.md)以了解每个参数的用途。 在大多数情况下，所有三个都应定义为没有固定/默认值的保留参数，因为这样做为请求者提供了最大的灵活性。

#### parameters

Airnode端点参数，映射到允许请求者提供值的API操作参数。 它通过其字段`operationParameter`指代API操作。 你也可以为端点参数提供 `default` ，但在大多数情况下不建议这样做。

端点参数有一个 `name`字段，它不一定与其所映射的API操作参数相同。 作为一个单独的说明，一个Airnode端点可以有多个参数。

## 结论

现在，API操作和Airnode端点已被指定。 每个Airnode端点映射到一个API操作，每个Airnode端点参数或fixedOperationParameter映射到一个API操作参数。 由此产生的OIS不包括特定于用户的信息，这意味着你可以分享它，让其他人轻松地提供相同的服务（例如，建立一个第三方预言机网络）。

请注意，在定义Airnode端点的时候，存在一些主观性。 这意味着对于相同的 API，可以存在两个不同的 OIS，根据集成商如何设计请求者将使用的接口而有所不同。 然而，在大多数情况下，我们只需将API操作直接映射到Airnode端点，并让请求者通过Airnode端点参数提供所有API操作参数。

现在你已经设置好了OIS对象，下一步就是[Airnode安全性](api-security.md)。
