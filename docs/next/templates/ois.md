---
title: ois.json
---

# {{$frontmatter.title}}

```json
{
  "oisFormat": "1.0.0",
  "title": "{FILL_*}",
  "version": "{FILL_*}",
  "apiSpecifications": {
    "servers": [
      {
        "url": "{FILL_*}"
      }
    ],
    "paths": {
      "{FILL_PATH}": {
        "{FILL_METHOD}": {
          "parameters": [
            {
              "in": "{FILL_OPERATION_PARAMETER_1_IN}",
              "name": "{FILL_OPERATION_PARAMETER_1_NAME}"
            },
            {
              "in": "{FILL_OPERATION_PARAMETER_2_IN}",
              "name": "{FILL_OPERATION_PARAMETER_2_NAME}"
            }
          ]
        }
      }
    },
    "components": {
      "securitySchemes": {
        "{FILL_SECURITY_SCHEME_NAME}": {
          "in": "{FILL_*}",
          "type": "{FILL_*}",
          "name": "{FILL_*}"
        }
      }
    },
    "security": {
      "{FILL_SECURITY_SCHEME_NAME}": []
    }
  },
  "endpoints": [
    {
      "name": "{FILL_*}",
      "operation": {
        "method": "{FILL_METHOD}",
        "path": "{FILL_PATH}"
      },
      "fixedOperationParameters": [
        {
          "operationParameter": {
            "in": "{FILL_OPERATION_PARAMETER_1_IN}",
            "name": "{FILL_OPERATION_PARAMETER_1_NAME}"
          },
          "value": "{FILL_*}"
        }
      ],
      "reservedParameters": [
        {
          "name": "{FILL_*}"
        },
        {
          "name": "{FILL_*}"
        },
        {
          "name": "{FILL_*}"
        }
      ],
      "parameters": [
        {
          "name": "{FILL_*}",
          "operationParameter": {
            "in": "{FILL_OPERATION_PARAMETER_2_IN}",
            "name": "{FILL_OPERATION_PARAMETER_2_NAME}"
          }
        }
      ]
    }
  ]
}
```
