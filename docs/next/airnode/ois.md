---
title: Oracle Integration Specifications (OIS)
---

# {{$frontmatter.title}}

[[toc]]

**Oracle Integration Specifications (OIS) 1.0.0** 

*This will be migrated from docs to its own repo.*

*Fields denoted by \* are for documentation purposes and not used by the oracle node.*

*The OAS equivalents given are used to automatically populate OIS fields.
These prepopulated fields are expected to be reviewed and customized by the integrating party.*

- [`oisFormat`](#1-oisFormat)
- [`title`](#2-title)
- [`version`](#3-version)
- [`apiSpecifications`](#4-apiSpecifications)
- [`endpoints`](#5-endpoints)

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

(Required) The OIS title.

OAS equivalent: `info.title`

## 3. `version`

(Required) The version for this specific OIS.

## 4. `apiSpecifications`

(Required) An object specifying the API with the following fields:

- [`servers`](#41-servers)
- [`components`](#42-components)
- [`security`](#43-security)
- [`paths`](#44-paths)

```json
{
  "servers": [
    {
      "url": "https://myapi.com/api/v1"
    }
  ],
  "components": {
    "securitySchemes": {
      "mySecurityScheme": {
        "type": "apiKey",
        "name": "X-MY-API-KEY",
        "in": "query"
      }
    }
  },
  "security": {
    "mySecurityScheme": []
  },
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
  }
}
```

### 4.1. `servers`

(Required) An array of objects containing the base URL of the API.
Only one object (i.e., base URL) is allowed in the array.
Applies to all operations.

OAS equivalent: `servers.0` (raise warning during conversion if `servers` has multiple elements)

### 4.2. `components`

(Required) An object where security schemes can be found under `securitySchemes.{securitySchemeName}` with the following elements:

- [`type`](#421-type)
- [`name`](#422-name)
- [`in`](#423-in)
- [`scheme`](#424-scheme)

#### 4.2.1. `type`

(Required) The type of the security scheme.

Allowed values: `apiKey`, `http`

OAS equivalent: `components.securitySchemes.{securitySchemeName}.type`

#### 4.2.2. `name`

(Required if `scheme` is not `http`) The name of the security scheme variable.

OAS equivalent: `components.securitySchemes.{securitySchemeName}.name`

#### 4.2.3. `in`

(Required) The location of the security scheme variable.

Allowed values: `query`, `header`, `cookie`

OAS equivalent: `components.securitySchemes.{securitySchemeName}.in`

#### 4.2.4. `scheme`

(Required if security scheme `type` is `http`) The name of the HTTP Authorization scheme to be used in the [Authorization header as defined in RFC7235](https://tools.ietf.org/html/rfc7235#section-5.1).

Allowed values: The values used SHOULD be registered in the [IANA Authentication Scheme registry](https://www.iana.org/assignments/http-authschemes/http-authschemes.xhtml).
We support `Basic` and `Bearer`.

OAS equivalent: `components.securitySchemes.{securitySchemeName}.scheme`

### 4.3. `security`

(Required) An object containing all security schemes that need to be used to access the API.
Applies to all operations.
Unlike in OAS, `security` cannot be a list.
Each security scheme maps to an empty list as:

```json
"security": {
  "mySecurityScheme": []
}
```

OAS equivalent: `security`, or `security.0` if `security` is a list (raise warning during conversion if `security` is a list with multiple elements)

### 4.4. `paths`

(Required) An object where operations can be found under `{path}.{method}` with the following elements:

- [`parameters`](#441-parameters)

#### 4.4.1. `parameters`

(Required) A list of operation parameters, each with the following fields:

- [`name`](#4411-name)
- [`in`](#4412-in)

##### 4.4.1.1. `name`

(Required) The name of the parameter.

OAS equivalent: `paths.{path}.{method}.parameters.{#}.name`

##### 4.4.1.2. `in`

(Required) The location of the parameter.

Allowed values: `query`, `header`, `path`, `cookie`

OAS equivalent: `paths.{path}.{method}.parameters.{#}.in`

## 5. `endpoints`

(Required) A list of objects, each specifying an oracle endpoint with the following fields:

- [`name`](#51-name)
- [`operation`](#52-operation)
- [`fixedOperationParameters`](#53-fixedOperationParameters)
- [`reservedParameters`](#54-reservedParameters)
- [`parameters`](#55-parameters)
- [`summary`*](#56-summary*)
- [`description`*](#57-description*)
- [`externalDocs`*](#58-externalDocs*)

```json
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
        "name": "f",
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

(Required) The name of the endpoint, must be unique in OIS.

OAS equivalent: `paths.{path}.{method}.operationId` of the corresponding operation

### 5.2. `operation`

(Required) An object that refers to an operation defined in `apiSpecifications.paths`, has the following elements:

- [`path`](#521-path)
- [`method`](#522-method)

#### 5.2.1. `path`

(Required) The path of the operation.

OAS equivalent: The `{path}` parameter in the `paths.{path}.{method}` for the respective operation

#### 5.2.2. `method`

(Required) The method of the operation.

Allowed values: `get`, `post`

OAS equivalent: The `{method}` parameter in the `paths.{path}.{method}` for the respective operation

### 5.3. `fixedOperationParameters`

(Optional) A list of objects specifying fixed operation parameters.
Each object has the following elements:

- [`operationParameter`](#531-operationParameter)
- [`value`](#532-value)

#### 5.3.1. `operationParameter`

(Required) An object that refers to an operation parameter, has the following elements:

- [`name`](#4411-name)
- [`in`](#4412-in)

#### 5.3.2. `value`

(Required) The value to be used for the respective operation parameter that cannot be overridden by the requester.

### 5.4. `reservedParameters`

(Optional) A list of objects that specify reserved endpoint parameters that do not map to operation parameters, but used for special purposes by the oracle node.
Each object has the following elements:

- [`name`](#541-name)
- [`fixed`](#542-fixed)
- [`default`](#543-default)

#### 5.4.1. `name`

(Required) The name of the reserved parameter.
Always starts with `_`.

Allowed values: `_type`, `_path`, `_times`

#### 5.4.2. `fixed`

(Optional) The fixed (i.e., non-overrideable) value for the reserved parameter.

#### 5.4.3. `default`

(Optional) The default value for the reserved parameter.
Used when no value is provided.

### 5.5. `parameters`

(Optional) A list of objects that specify endpoint parameters that map to operation parameters.
Each object has the following elements:

- [`operationParameter`](#551-operationParameter)
- [`name`](#552-name)
- [`default`](#553-default)
- [`description`*](#554-description*)
- [`required`*](#555-required*)
- [`example`*](#556-example*)

#### 5.5.1. `operationParameter`

(Required) An object that refers to an operation parameter, has the following elements:

- [`name`](#4411-name)
- [`in`](#4412-in)

#### 5.5.2. `name`

(Required) The name of the endpoint parameter.
Is not allowed to start with `_`.

OAS equivalent: `paths.{path}.{method}.parameters.{#}.name` of corresponding operation parameter

#### 5.5.3. `default`

(Optional) The default value for the endpoint parameter.
Used when no value is provided.

OAS equivalent: `paths.{path}.{method}.parameters.{#}.default` of corresponding operation parameter

#### 5.5.4. `description`*

(Optional) A description of what the endpoint parameter does.

OAS equivalent: `paths.{path}.{method}.parameters.{#}.description` of the corresponding operation parameter

#### 5.5.5. `required`*

(Optional) If the endpoint parameter is required, is a boolean value.

OAS equivalent: `paths.{path}.{method}.parameters.{#}.required` of the corresponding operation parameter

#### 5.5.6. `example`*

(Optional) The example value to be used in test calls.

OAS equivalent: `paths.{path}.{method}.parameters.{#}.example` of the corresponding operation parameter

### 5.6. `summary`*

(Optional) A one sentence summary of what the endpoint does.

OAS equivalent: `paths.{path}.{method}.summary` of corresponding operation

### 5.7. `description`*

(Optional) A more detailed description of what the endpoint does.

OAS equivalent: `paths.{path}.{method}.description` of corresponding operation

### 5.8. `externalDocs`*

(Optional) URL to external documentation for the endpoint.

OAS equivalent: `paths.{path}.{method}.externalDocs` of corresponding operation
