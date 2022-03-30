---
title: 规范细节
airnodeVersion: v0.5
---

<TitleSpan>OIS</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,5]" />

预言机集成规范 (OIS) 基于 [Open API 规范（OAS）](https://swagger.io/specification/)，但存在一些不同，在作用于 OIS 文件时肯定会侧重于以下文档所提的内容。

::: warning OAS

我们不建议在创建OIS对象时参考OAS的帮助。 OIS只是借用了OAS的格式实践。 创建OIS对象所需的一切都在这些文档中。

:::

看这篇文章，[设置预言机集成标准](https://medium.com/api3/setting-oracle-integration-standards-ac9104c38f9e)以了解OIS的概况。

- 由 (\*) 表示的字段用于文档目的，不被Airnode使用。
- <!--The [OAS](https://swagger.io/specification/) equivalents are given as
  reference to assist in the populating of OIS fields.--> OIS字段应该由集成方审核和定制。
- 所有的URLs都是绝对路径（就是说[相对路径](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#relative-references-in-urls)是不支持的）。

## OIS 对象摘要

OIS有五个根域(key)。

1. [oisFormat](ois.md#_1-oisformat)
1. [title](ois.md#_2-title)
1. [version](ois.md#_3-version)
1. [apiSpecifications](ois.md#_4-apispecifications)
1. [endpoints](ois.md#_5-endpoints)

`apiSpecifications`描述了API的操作，它被映射到 `endpoints`，Airnode在链上公开了这些节点。

```json
{
  "oisFormat": "1.0.0",
  "title": "myOisTitle",
  "version": "1.2.3",
  "apiSpecifications": {
    ...
  },
  "endpoints": [
    ...
  ]
}
```

## 1. `oisFormat`

(必填) 在生成规范时遵循的 OIS 格式版本。

## 2. `title`

(必填) OIS标题。 标题字段最多为64个字符，只能包含字母数字字符、连字符、下划线和空格。

<!--OAS equivalent: `info.title`.-->

## 3. `version`

(必填) 用户定义的 OIS 对象。 不要与 `oisForm` 版本混淆，oisForm定义的是 OIS 格式。

## 4. `apiSpecifications`

(必填) 指定的API对象，有以下根级字段：

- 4.1. [servers](ois.md#_4-1-servers)
- 4.2. [paths](ois.md#_4-2-paths)
- 4.3. [components](ois.md#_4-3-components)
- 4.4. [security](ois.md#_4-4-security)

```json
// apiSpecifications
{
  "servers": [
    {
      "url": "https://myapi.com/api/v1"
    }
  ],
  "paths": {
    "/myPath": {
      "get": {
        "parameters": [
          {
            "name": "myParameter",
            "in": "query"
          }
        ]
      }
    }
  },
  "components": {
    "securitySchemes": {
      "mySecurityScheme1": {
        "type": "apiKey",
        "name": "X-MY-API-KEY",
        "in": "query"
      }
    }
  },
  "security": {
    "mySecurityScheme1": []
  }
}
```

### 4.1. `servers`

(必填) 一个包含API的基本URL的对象数组。 数组中只允许一个对象 (即基础URL)。 适用于所有 API 操作。

<!--OAS equivalent: `servers[0]` (raise warning during conversion if `servers` has
multiple elements)-->

### 4.2. `paths`

（必填）一个对象，其中API的操作是由`{path}.{method}`定义的。(即`paths./myPath.get`），每个都有一个 `parameters` 数组。

#### 4.2.1. `parameters`

(必填) API操作参数的列表，每个参数都有以下字段：

- `name`
- `in`

##### 4.2.1.1. `name`

<p style="margin-left:35px;">
(必填) 参数名称。</p>

<!--p style="margin-left:35px;">OAS equivalent: <code>paths.{path}.{method}.parameters.{#}.name</code></p-->

##### 4.2.1.2. `in`

<p class="h5-indent">(必填) 参数的位置。 当集成的是 POST 方法时，用<code>in: query</code>定义body参数。
Airnode 会将所有 <code>query</code> 类型转换为 <code>requestBody</code>. 请注意，只支持非嵌套的 application/json 内容类型。</p>

<p class="h5-indent">允许的值： <code>query, header, path, cookie</code>。</p>

<!--p class="h5-indent">OAS equivalent: <code>paths.{path}.{method}.parameters.{#}.in</code></p-->

### 4.3. `components`

[<InfoBtnBlue/>](/airnode/v0.5/grp-providers/guides/build-an-airnode/api-security.md) (必填) 一个对象，在 `securitySchemes.{securitySchemeName}` 下可以找到安全方案，有以下元素：

- `type`
- `name`
- `in`
- `scheme`

#### 4.3.1. `type`

(必填) 安全方案的类型。

允许的值：

- 用于 API 操作来验证Airnode。
  - `apiKey`
  - `http`
- 允许API操作获取请求者和/或链的信息。
  - `relayRequesterAddress`
  - `relaySponsorAddress`
  - `relaySponsorWalletAddress`
  - `relayChainId`
  - `relayChainType`

<!--OAS equivalent: `components.securitySchemes.{securitySchemeName}.type`.-->

#### 4.3.2. `name`

(只有 `类型` 是 apiKey 时) 安全方案变量的名称。

<!--OAS equivalent: `components.securitySchemes.{securitySchemeName}.name`.-->

#### 4.3.3. `in`

(仅当类型是 apiKey时) 安全类型变量的位置。

允许的值： `query`, `header`, `cookie`

<!--OAS equivalent: `components.securitySchemes.{securitySchemeName}.in`.-->

#### 4.3.4. `scheme`

(仅当 `type` 是 http时) HTTP 授权方案名称，被用于授权header，其定义在[RFC7235 ](https://tools. ietf.org/html/rfc7235#section-5.1) 中。

允许的值：(`basic` 和 `bearer`)。

```json
"mySecurityScheme2": {
  "type": "http",
  "scheme": "bearer"
}
```<!--The values used SHOULD be registered in the \[IANA Authentication Scheme registry\](https://www.iana.org/assignments/http-authschemes/http-authschemes.xhtml). The OIS object supports--><!--OAS equivalent: `components.securitySchemes.{securitySchemeName}.scheme`.-->

### 4.4. `security`

(必填) 包含API调用所要求的所有安全方案的对象。 适用于所有操作。 安全方案可以包含API要求的信息，以验证Airnode，以及API可能需要的请求者（中继）的信息。 关于更多安全方案，在 _构建一个 Airnode_ 指南的[API 安全](../../airnode/v0.5/grp-providers/guides/build-an-airnode/api-security.md)部分和_概念和定义_ 中的[Airnode 身份验证](../../airnode/v0.5/concepts/airnode-auth.md) 部分。

`security` 对象保留了所有使用过的安全方案的名称。 在 `security` 中的每一个安全方案都映射到空列表。 空列表会被用于Airnode未来提供给个人节点认证的版本。 `components.securitySchemes。{name}` 对象定义了安全方案。 不像OAS，`security` 是一个对象，不是一个数组。

```json
// OIS object
"components": {
  "securitySchemes": {
    "my-api-key-scheme": {
      "in": "query",
      "type": "apiKey",
      "name": "access_key"
      "scheme": "<FILL_*>" // Used when type="http".
    }
  }
},
"security": {
  "my-api-key-scheme": []
}
```

`apiCredential` 对象 (不属于OIS 对象的一部分) 持有任何安全方案所需的凭据。

```json
// config.json root object.
// Not part of the OIS object.
"apiCredentials": [
    {
      "oisTitle": "my-ois-title", // Must match the ois.title field the security scheme is in.
      "securitySchemeName": "my-api-key-scheme",
      "securitySchemeValue": "${API_KEY}" // In secrets.env
    }
  ]
```

<!--OAS equivalent: `security`, or `security.0` if security is a list.-->

::: warning 请注意:

目前Airnode 从 `component.securitySchemes` 读取安全方案，而不是 `security`。 现在使用 `security` 字段（与 `component.securitySchemes`）提供了一个平稳的过渡到未来的Airnode版本的安全方案实现。 这将允许将安全方案分配给单个API操作。 目前安全方案是分配给整个API。

:::

## 5. `endpoints`

(必填) 对象的列表，每个对象指定一个带有以下字段的 Airnode终端节点：

- 5.1. [name](ois.md#_5-1-name)
- 5.2. [operation](ois.md#_5-2-operation)
- 5.3. [fixedOperationParameters](ois.md#_5-3-fixedoperationparameters)
- 5.4. [reservedParameters](ois.md#_5-4-reservedparameters)
- 5.5. [parameters](ois.md#_5-5-parameters)
- 5.6. [summary](ois.md#_5-6-summary)
- 5.7. [description](ois.md#_5-7-description)
- 5.8. [externalDocs](ois.md#_5-8-externaldocs)

```json
// endpoints
[
  {
    "name": "convertToUsd",
    "operation": {
      "path": "/myPath",
      "method": "get"
    },
    "fixedOperationParameters": [
      {
        "operationParameter": {
          "name": "to",
          "in": "query"
        },
        "value": "USD"
      }
    ],
    "reservedParameters": [
      {
        "name": "_type",
        "fixed": "int256"
      },
      {
        "name": "_path",
        "default": "data.0.price"
      },
      {
        "name": "_times"
      }
    ],
    "parameters": [
      {
        "name": "from",
        "default": "EUR",
        "operationParameter": {
          "name": "from",
          "in": "query"
        }
      }
    ]
  }
]
```

### 5.1. `name`

(必填) Airnode 终端节点的名称，在OIS里必须是唯一的。

<!--OAS equivalent: `paths.{path}.{method}.operationId` of the corresponding
operation.-->

### 5.2. `operation`

(必填) 在`apiSpecifications.path`中定义的 API 操作的对象具有以下元素：

- `path`
- `method`

#### 5.2.1. `path`

(必填) API 操作的路径。

<!--OAS equivalent: The `{path}` parameter in the `paths.{path}.{method}` for the
respective API operation.-->

#### 5.2.2. `method`

(必填) API 操作的方法。

允许的值： `get`, `post`

<!--OAS equivalent: The `{method}` parameter in the `paths.{path}.{method}` for the
respective API operation.-->

### 5.3. `fixedOperationParameters`

[<InfoBtnBlue/>](/airnode/v0.5/grp-providers/guides/build-an-airnode/api-integration.md#fixedoperationparameters) (必填) 对应 API 操作的固定参数的对象列表。 当需要时，fixedOperationParameters 数组可以留空。 每个对象有以下要素：

- `operationParameter`
- `value`

#### 5.3.1. `operationParameter`

(必填) 一个具有以下元素的 API 操作参数的对象：

- `name`
- `in`

##### 5.3.1.1. `name`

<p class="h5-indent">API操作参数的名称，该参数将具有固定值。</p>

##### 5.3.1.2. `in`

<p class="h5-indent">必须是三个可能的值之一（<code>query, header, path, cookie</code>）。</p>

#### 5.3.2. `value`

(必填) 不能被请求者覆盖的 API 操作的参数的值。

### 5.4. `reservedParameters`

[<InfoBtnBlue/>](/airnode/v0.5/grp-providers/guides/build-an-airnode/api-integration.md#reservedparameters) (可选) 指定保留的Airnode节点参数的对象列表，这些参数没有映射到任何API操作参数，但被Airnode用于特殊目的。 请参阅 [保留参数](./reserved-parameters.md)文档以获得深入解释。 每个对象都有以下元素：

- `name`
- `fixed`
- `default`

#### 5.4.1. `name`

(必填) 保留参数的名称。 始终以 `_` 开始。

允许的值： `_type`, `_path` 或 `_times`

#### 5.4.2. `fixed`

(可选) 保留参数的固定值(即不可覆盖)。

#### 5.4.3. `default`

(可选) 保留参数的默认值。 当没有提供值时使用。

### 5.5. `parameters`

[<InfoBtnBlue/>](/airnode/v0.5/grp-providers/guides/build-an-airnode/api-integration.md#parameters) (可选）指定Airnode终端节点参数的对象列表，这些参数映射到特定的API操作的参数。 每个对象都有以下元素：

- `operationParameter`
- `name`
- `default`
- `description`
- `require`
- `example`

#### 5.5.1. `operationParameter`

(必填) 指的是一个API操作的参数的对象，有以下元素：

- `name`
- `in`

##### 5.5.1.1. `name`

<p class="h5-indent">从 API 操作中的参数名称。</p>

##### 5.5.1.2. `in`

<p class="h5-indent">必须是四个可能的值之一(<code>query, header, path, cookie</code>)。</p>

#### 5.5.2. `name`

(必填) Airnode 节点参数的名称。 不允许以 `_` 开始。

<!--OAS equivalent: `paths.{path}.{method}.parameters.{#}.name` of a corresponding
API operation parameter.-->

#### 5.5.3. `default`

(可选) Airnode 节点参数的默认值。 当没有提供值时使用。

<!--OAS equivalent: `paths.{path}.{method}.parameters.{#}.default` of a
corresponding API operation parameter.-->

#### 5.5.4. `description` \*

(可选) Airnode 节点参数的描述。

<!--OAS equivalent: `paths.{path}.{method}.parameters.{#}.description` of the
corresponding operation parameter.-->

#### 5.5.5. `required`

(可选) 是否需要Airnode 节点参数，布尔值。

<!--OAS equivalent: `paths.{path}.{method}.parameters.{#}.required` of the
corresponding operation parameter.-->

#### 5.5.6. `example`

(可选) 用于测试调用的示例值。

<!--OAS equivalent: `paths.{path}.{method}.parameters.{#}.example` of the
corresponding operation parameter.-->

### 5.6. `summary` \*

(可选) Airnode 终端节点意图的一句话摘要。

<!--OAS equivalent: `paths.{path}.{method}.summary` of corresponding operation.-->

### 5.7. `description` \*

(可选) Airnode 终端节点的更详细描述。

<!--OAS equivalent: `paths.{path}.{method}.description` of corresponding operation.-->

### 5.8. `externalDocs` \*

（可选）Airnode 终端节点外部文档的 URL。

<!--OAS equivalent: `paths.{path}.{method}.externalDocs` of corresponding operation.-->

::: tip 请注意

由 (\*) 表示的字段用于文档目的，不被Airnode使用。

:::
