---
title: OIS Template
docSetName: OIS v1.1
folder:
basePath: /ois/v1.1
tags:
---

# {{$frontmatter.title}}

<VersionWarning/>

An OIS (Oracle Integration Specifications) JSON object is part of an Airnode's
`config.json` file.

In the OIS template, there are some fields that contain <FILL\_\*>. This means
that the value you will be replacing this with is independent from the other
fields. On the other hand, if two fields contain the same expression (e.g.,
<FILL_OPERATION_PARAMETER_1_NAME>), you must use the same value in them, because
they are referencing each other.

The file below is a basic template for OIS. Note, that it might look differently
for your particular use case. You can also check out the OISes created for our
[examples in Airnode repository](https://github.com/api3dao/airnode/tree/v0.7/packages/airnode-examples/integrations).

```json
{
  "oisFormat": "1.1.1",
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
