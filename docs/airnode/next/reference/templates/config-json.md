---
title: config.json
---
<TitleSpan>Templates</TitleSpan>
# {{$frontmatter.title}}

Below is a template for an Airnode's configuration file. There are some fields that contain <FILL_*>. This means that
the value added is independent from other fields. On the other hand, if two fields contain the same expression (e.g.,
<FILL_OPERATION_PARAMETER_1_NAME>), you must use the same value in them, because they are referencing each other. Consider the following relationships.

> - `ois[0].title` is related to `triggers.rrp[0].oisTitle` when they share the same field name. 
> - `ois[0].apiSpecifications.paths[path][method].parameters[0].in` shows up in
>   `ois[0].endpoints[0].fixedOperationParameters[0].operationParameter.in`

See [config.json](../deployment-files/config-json.md) as a reference while building a config.json file.

```json
{
  "chains": [
    {
      "authorizers": [
        "<FILL_*>"
      ],
      "contracts": {
        "AirnodeRrp": "<FILL_*>"
      },
      "id": "<FILL_CHAIN_ID_1>",
      "providers": {
        "<FILL_PROVIDER_NAME_1>": {
          "url": "${CHAIN_PROVIDER_URL}"
        }
      },
      "type": "<FILL_CHAIN_TYPE_1>"
    }
  ],
  "nodeSettings": {
    "cloudProvider": "aws",
    "airnodeWalletMnemonic": "<FILL_*>",
    "heartbeat": {
      "enabled": true,
      "url": "<FILL_*>",
      "apiKey": "<FILL_*>",
      "id": "<FILL_*>"
    },
    "httpGateway": {
      "enabled": true,
      "apiKey": "<FILL_*>"
    },
    "logFormat": "json",
    "logLevel": "INFO",
    "nodeVersion": "1.0.0",
    "region": "<FILL_*>",
    "stage": "<FILL_*>"
  },
  "triggers": {
    "rrp": [
      {
        "endpointId": "<FILL_*>",
        "oisTitle": "<FILL_OIS_TITLE>",
        "endpointName": "<FILL_ENDPOINT_NAME>"
      }
    ]
  },
  "ois": [
    {
      "oisFormat": "1.0.0",
      "version": "<FILL_*>",
      "title": "<FILL_OIS_TITLE>",
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
          "name": "<FILL_ENDPOINT_NAME>",
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
              "name": "<FILL_*>",
              "fixed": "<FILL_*>"
            },
            {
              "name": "<FILL_*>",
              "fixed": "<FILL_*>"
            },
            {
              "name": "<FILL_*>",
              "default": "<FILL_*>"
            },
            {
              "name": "<FILL_*>"
            }
          ],
          "parameters": [
            {
              "name": "<FILL_*>",
              "default": "<FILL_*>",
              "operationParameter": {
                "in": "<FILL_OPERATION_PARAMETER_2_IN>",
                "name": "<FILL_OPERATION_PARAMETER_2_NAME>"
              }
            }
          ]
        }
      ]
    }
  ],
  "apiCredentials": [
    {
      "oisTitle": "<FILL_OIS_TITLE>",
      "securitySchemeName": "<FILL_SECURITY_SCHEME_NAME>",
      "securitySchemeValue": "<FILL_*>"
    }
  ]
}
```
