---
title: OIS 模板
---

<TitleSpan>OIS</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

一个 OIS (Oracle Introduction Specifications) JSON 对象是Airnode的 `config.json` 文件的一部分。

在 OIS 模板中，一些字段包含 <FILL\_\*>。 这意味着你要替换的值与其他字段是独立的。 另一方面，如果两个字段包含相同的表达式（例如， <FILL_OPERATION_PARAMETER_1_NAME>），你必须在其中使用相同的值，因为它们是互相引用的。

下面的文件是OIS的一个基本模板。 请注意，对于你的特定用例，它可能看起来不一样。 你也可以在[ Airnode资源库中](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-examples/integrations)查看为我们的例子创建的OIS。

```json
{
  "oisFormat": "1.0.0",
  "title": "<FILL_*>",
  "version": "<FILL_*>",
  "apiSpecifications": {
    "servers": [
      {
        "url": "<FILL_*>"
      }
    ],
    "paths": {
      "<FILL_PATH>": {
        "<FILL_METHOD>": {
          "parameters": [
            {
              "in": "<FILL_OPERATION_PARAMETER_1_IN>",
              "name": "<FILL_OPERATION_PARAMETER_1_NAME>"
            },
            {
              "in": "<FILL_OPERATION_PARAMETER_2_IN>",
              "name": "<FILL_OPERATION_PARAMETER_2_NAME>"
            }
          ]
        }
      }
    },
    "components": {
      "securitySchemes": {
        "<FILL_SECURITY_SCHEME_NAME>": {
          "in": "<FILL_*>",
          "type": "<FILL_*>",
          "name": "<FILL_*>"
        }
      }
    },
    "security": {
      "<FILL_SECURITY_SCHEME_NAME>": []
    }
  },
  "endpoints": [
    {
      "name": "<FILL_*>",
      "operation": {
        "method": "<FILL_METHOD>",
        "path": "<FILL_PATH>"
      },
      "fixedOperationParameters": [
        {
          "operationParameter": {
            "in": "<FILL_OPERATION_PARAMETER_1_IN>",
            "name": "<FILL_OPERATION_PARAMETER_1_NAME>"
          },
          "value": "<FILL_*>"
        }
      ],
      "reservedParameters": [
        {
          "name": "<FILL_*>"
        },
        {
          "name": "<FILL_*>"
        },
        {
          "name": "<FILL_*>"
        },
        {
          "name": "<FILL_*>"
        }
      ],
      "parameters": [
        {
          "name": "<FILL_*>",
          "operationParameter": {
            "in": "<FILL_OPERATION_PARAMETER_2_IN>",
            "name": "<FILL_OPERATION_PARAMETER_2_NAME>"
          }
        }
      ]
    }
  ]
}
```
