---
title: Oracle Integration Specifications (OIS) 1.0.0
---

<TitleSpan>Specifications</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/> <TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

The Oracle Integration Specification (OIS) is based on [Open API specification (OAS)](https://swagger.io/specification/), but there are some differences, so be sure to read our documentation when working on your OIS file.

::: warning OAS

It is not recommended to refer to OAS for help while creating your OIS object. OIS only borrows formatting practices from OAS. Everything needed to create an OIS object is in these docs.

:::

See the article, [Setting Oracle Integration Standards](https://medium.com/api3/setting-oracle-integration-standards-ac9104c38f9e) for an overview of OIS.

- Fields denoted by \* are for documentation purposes and not used by the oracle node.
- The [OAS](https://swagger.io/specification/) equivalents are given as reference to assist in the populating of OIS fields. The OIS fields should be reviewed and customized by the integrating party.
- All URLs are absolute (i.e., [relative URLs](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#relative-references-in-urls) are not supported).

## OIS Object Summary

An OIS has five fields.

- [`oisFormat`](ois.md#_1-oisformat)
- [`title`](ois.md#_2-title)
- [`version`](ois.md#_3-version)
- [`apiSpecifications`](ois.md#_4-apispecifications)
- [`endpoints`](ois.md#_5-endpoints)

`apiSpecifications` describe the API's operations which are mapped to the `endpoints` that Airnode exposes on-chain.

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

(Required) The OIS format version followed while generating the specifications.

## 2. `title`

(Required) The OIS title. Title field is at most 64 characters, can only include alphanumeric characters, hyphens, underscores and whitespaces.

OAS equivalent: `info.title`

## 3. `version`

(Required) The version for this specific OIS.

## 4. `apiSpecifications`

(Required) An object specifying the API with the following fields:

- [`servers`](ois.md#_4-1-servers)
- [`paths`](ois.md#_4-2-paths)
- [`components`](ois.md#_4-3-components)
- [`security`](ois.md#_4-4-security)

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

(Required) An array of objects containing the base URL of the API. Only one object (i.e., base URL) is allowed in the array. Applies to all operations.

OAS equivalent: `servers.0` (raise warning during conversion if `servers` has multiple elements)

### 4.2. `paths`

(Required) An object where operations can be found under `{path}.{method}` with the following elements:

- [`parameters`](#431-parameters)

#### 4.2.1. `parameters`

(Required) A list of operation parameters, each with the following fields:

- [`name`](ois.md#_4-2-1-1-name)
- [`in`](ois.md#_4-2-1-2-in)

##### 4.2.1.1. `name`

(Required) The name of the parameter.

OAS equivalent: `paths.{path}.{method}.parameters.{#}.name`

##### 4.2.1.2. `in`

(Required) The location of the parameter.

Allowed values: `query`, `header`, `path`, `cookie`

OAS equivalent: `paths.{path}.{method}.parameters.{#}.in`

When integrating a POST method, define the body parameters with `in: query`. Airnode will convert all `query` types into the `requestBody`. Note that only the non-nested application/json content-type is supported.

### 4.3. `components`

(Required) An object where security schemes can be found under `securitySchemes.{securitySchemeName}` with the following elements:

- [`type`](ois.md#_4-3-1-type)
- [`name`](ois.md#_4-3-2-name)
- [`in`](ois.md#_4-3-3-in)
- [`scheme`](ois.md#_4-3-4-scheme)

#### 4.3.1. `type`

(Required) The type of the security scheme.

Allowed values: `apiKey`, `http`

OAS equivalent: `components.securitySchemes.{securitySchemeName}.type`

#### 4.3.2. `name`

(Only if `type` is apiKey) The name of the security scheme variable.

OAS equivalent: `components.securitySchemes.{securitySchemeName}.name`

#### 4.3.3. `in`

(Only if type is apiKey) The location of the security scheme variable.

Allowed values: `query`, `header`, `cookie`

OAS equivalent: `components.securitySchemes.{securitySchemeName}.in`

#### 4.3.4. `scheme`

(Only if `type` is http) The name of the HTTP Authorization scheme to be used in the [Authorization header as defined in RFC7235](https://tools.ietf.org/html/rfc7235#section-5.1).

Allowed values:<!--The values used SHOULD be registered in the \[IANA Authentication Scheme registry\](https://www.iana.org/assignments/http-authschemes/http-authschemes.xhtml). The OIS object supports-->`basic` and `bearer`.

OAS equivalent: `components.securitySchemes.{securitySchemeName}.scheme`

### 4.4. `security`

(Required) An object containing all security schemes that need to be used to access the API. Applies to all operations. Unlike in OAS, security cannot be a list. Each security scheme maps to an empty list as:

```json
"security": {
  "mySecurityScheme1": []
}
```

OAS equivalent: `security`, or `security.0` if security is a list.

::: warning Please note:

Currently Airnode reads the security schemes from `component.securitySchemes` and not `security`. Using the `security` field now provides for a smooth transition to future releases of Airnode with regards to security scheme implementation. This will allow assigning of security schemes to individual API operations. Currently security schemes are assign to the entire API.

:::

## 5. `endpoints`

(Required) A list of objects, each specifying an oracle endpoint with the following fields:

- [`name`](ois.md#_5-1-name)
- [`operation`](ois.md#_5-2-operation)
- [`fixedOperationParameters`](ois.md#_5-3-fixedoperationparameters)
- [`reservedParameters`](ois.md#_5-4-reservedparameters)
- [`parameters`](ois.md#_5-5-parameters)
- [`summary`\*](ois.md#_5-6-summary)
- [`description`\*](ois.md#_5-7-description)
- [`externalDocs`\*](ois.md#_5-8-externaldocs)

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
      },
      {
        "name": "_relay_metadata",
        "default": "v1"
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
    ],
    "testable": true
  }
]
```

### 5.1. `name`

(Required) The name of the endpoint, must be unique in OIS.

OAS equivalent: `paths.{path}.{method}.operationId` of the corresponding operation

### 5.2. `operation`

(Required) An object that refers to an operation defined in `apiSpecifications.paths`, has the following elements:

- [`path`](ois.md#_5-2-1-path)
- [`method`](ois.md#_5-2-2-method)

#### 5.2.1. `path`

(Required) The path of the operation.

OAS equivalent: The `{path}` parameter in the `paths.{path}.{method}` for the respective operation

#### 5.2.2. `method`

(Required) The method of the operation.

Allowed values: `get`, `post`

OAS equivalent: The `{method}` parameter in the `paths.{path}.{method}` for the respective operation

### 5.3. `fixedOperationParameters`

(Required) A list of objects specifying fixed operation parameters. While required, the fixedOperationParameters array can be left empty. Each object has the following elements:

- [`operationParameter`](ois.md#_5-3-1-operationparameter)
- [`value`](ois.md#_5-3-2-value)

#### 5.3.1. `operationParameter`

(Required) An object that refers to an operation parameter, has the following elements:

- [`name`](ois.md#_4-4-1-1-name)
- [`in`](ois.md#_4-4-1-2-in)

#### 5.3.2. `value`

(Required) The value to be used for the respective operation parameter that cannot be overridden by the requester.

### 5.4. `reservedParameters`

(Optional) A list of objects that specify reserved endpoint parameters that do not map to operation parameters, but used for special purposes by the oracle node. Each object has the following elements:

- [`name`](ois.md#_5-4-1-name)
- [`fixed`](ois.md#_5-4-2-fixed)
- [`default`](ois.md#_5-4-3-default)

#### 5.4.1. `name`

(Required) The name of the reserved parameter. Always starts with `_`.

Allowed values: `_type`, `_path`, `_times`, `_relay_metadata`

#### 5.4.2. `fixed`

(Optional) The fixed (i.e., non-overrideable) value for the reserved parameter.

#### 5.4.3. `default`

(Optional) The default value for the reserved parameter. Used when no value is provided.

### 5.5. `parameters`

(Optional) A list of objects that specify endpoint parameters that map to operation parameters. Each object has the following elements:

- [`operationParameter`](ois.md#_5-5-1-operationparameter)
- [`name`](ois.md#_5-5-2-name)
- [`default`](ois.md#_5-5-3-default)
- [`description`\*](ois.md#_5-5-4-description)
- [`required`\*](ois.md#_5-5-5-required)
- [`example`\*](ois.md#_5-5-6-example)

#### 5.5.1. `operationParameter`

(Required) An object that refers to an operation parameter, has the following elements:

- [`name`](ois.md#_4-4-1-1-name)
- [`in`](ois.md#_4-4-1-2-in)

#### 5.5.2. `name`

(Required) The name of the endpoint parameter. Is not allowed to start with `_`.

OAS equivalent: `paths.{path}.{method}.parameters.{#}.name` of corresponding operation parameter

#### 5.5.3. `default`

(Optional) The default value for the endpoint parameter. Used when no value is provided.

OAS equivalent: `paths.{path}.{method}.parameters.{#}.default` of corresponding operation parameter

#### 5.5.4. `description`\*

(Optional) A description of what the endpoint parameter does.

OAS equivalent: `paths.{path}.{method}.parameters.{#}.description` of the corresponding operation parameter

#### 5.5.5. `required`\*

(Optional) If the endpoint parameter is required, is a boolean value.

OAS equivalent: `paths.{path}.{method}.parameters.{#}.required` of the corresponding operation parameter

#### 5.5.6. `example`\*

(Optional) The example value to be used in test calls.

OAS equivalent: `paths.{path}.{method}.parameters.{#}.example` of the corresponding operation parameter

### 5.6. `summary`\*

(Optional) A one sentence summary of what the endpoint does.

OAS equivalent: `paths.{path}.{method}.summary` of corresponding operation

### 5.7. `description`\*

(Optional) A more detailed description of what the endpoint does.

OAS equivalent: `paths.{path}.{method}.description` of corresponding operation

### 5.8. `externalDocs`\*

(Optional) URL to external documentation for the endpoint.

OAS equivalent: `paths.{path}.{method}.externalDocs` of corresponding operation

### 5.9. `testable`

(Optional) Flag that indicates if the endpoint can be tested with the HTTP gateway. The gateway must be enabled.

Allowed values: true, false
