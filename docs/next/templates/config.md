---
title: config.json
---

# {{$frontmatter.title}}

```json
{
  "ois": [
    {
      "oisFormat": "1.0.0",
      "title": "{FILL_OISTITLE}",
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
          "name": "{FILL_ENDPOINTNAME}",
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
  ],
  "triggers": {
    "request": [
      {
        "endpointId": "{FILL_*}",
        "oisTitle": "{FILL_OISTITLE}",
        "endpointName": "{FILL_ENDPOINTNAME}"
      }
    ]
  },
  "nodeSettings": {
    "nodeVersion": "0.1.0",
    "cloudProvider": "aws",
    "region": "{FILL_*}",
    "stage": "{FILL_*}",
    "logFormat": "json",
    "chains": {
      "id": "{FILL_*}",
      "type": "evm",
      "providers": [
        {
          "name": "{FILL_*}",
          "url": "{FILL_*}"
        }
      ],
      "contracts": {
        "Airnode": "{FILL_*}",
        "Convenience": "{FILL_*}"
      },
      "providerAdminForRecordCreation": "{FILL_*}"
    }
  },
  "id": "{FILL_ID}"
}
````
