---
title: config.json
---

<TitleSpan>模板</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

Airnode配置文件的模板。 下面是帮助理解模板内容的注释。

- `< FILL_*>, < FILL_NUMBER>, < FILL_BOOLEAN>`: 添加值独立于 其他字段，除非另有说明，否则需要一个值。 这些值不被认为是秘密，除非有意为之。

- `< FILL_OPERATION_PARAMETER_1_NAME>`: 如果两个字段包含相同的 表达式, 使用相同的值, 那是因为它们正在相互引用。 通常，这些都不被视为秘密。

- `${CHAIN_PROVIDER_URL}`: 应该添加到 `secrets.env` 的内插值 ${} ，尽管它不需要。

请考虑下面的示例.

- `ois[0].title` 与 `triggers.rrp[0].oisTitle`有关.

- `ois[0].apiSpecifications.paths[path][method].parameters[0].in` is related to
  <code style="overflow-wrap: break-word;">ois[0].endpoints[0].fixedOperationParameters[0].operationParameter.in</code>

- `ois[0].apiSpecifications.paths[path][method].parameters[1].in` is related to
  <code style="overflow-wrap: break-word;">ois[0].endpoints[0].parameters[0].operationParameter.in</code>

构建config.json 文件时，请查看 [config.json](../deployment-files/config-json.md) 作为参考。

```json
{
  "chains": [
    {
      "maxConcurrency": "<FILL_NUMBER>",
      "authorizers": ["<FILL_*>"],
      "contracts": {
        "AirnodeRrp": "<FILL_*>"
      },
      "id": "<FILL_*>",
      "providers": {
        "<FILL_PROVIDER_NAME_1>": {
          "url": "${CHAIN_PROVIDER_URL}" // In secrets.env
        }
      },
      "type": "<FILL_*>",
      "options": {
        "txType": "<FILL_*>",
        "priorityFee": {
          "value": "<FILL_NUMBER>",
          "unit": "<FILL_*>"
        },
        "baseFeeMultiplier": "<FILL_NUMBER>"
      },
      "blockHistoryLimit": "<FILL_*>",
      "minConfirmations": "<FILL_*>",
      "ignoreBlockedRequestsAfterBlocks": "<FILL_*>"
    }
  ],
  "nodeSettings": {
    "cloudProvider": {
      "type": "aws", // local, aws or gcp
      "region": "<FILL_*>",
      "disableConcurrencyReservations": "<FILL_BOOLEAN>", //Use for (type = gcp | aws) only
      "projectId": "${GCP_PROJECT_ID}" // Use for (type = gcp) only
    },
    "airnodeWalletMnemonic": "${AIRNODE_WALLET_MNEMONIC}",
    "heartbeat": {
      "enabled": "<FILL_BOOLEAN>",
      "url": "${HEARTBEAT_API_KEY}", // In secrets.env
      "apiKey": "${HEARTBEAT_API_KEY}", // In secrets.env
      "id": "${HEARTBEAT_ID}" // In secrets.env
    },
    "httpGateway": {
      "enabled": "<FILL_BOOLEAN>",
      "apiKey": "${HTTP_GATEWAY_API_KEY}", // In secrets.env
      "maxConcurrency": "<FILL_NUMBER>"
    },
    "httpSignedDataGateway": {
      "enabled": "<FILL_BOOLEAN>",
      "apiKey": "${HTTP_SIGNED_DATA_GATEWAY_API_KEY}", // In secrets.env
      "maxConcurrency": "<FILL_NUMBER>"
    },
    "logFormat": "json",
    "logLevel": "INFO",
    "nodeVersion": "0.6.0",
    "stage": "<FILL_*>"
  },
  "triggers": {
    "rrp": [
      {
        "endpointId": "<FILL_*>",
        "oisTitle": "<FILL_OIS_TITLE>",
        "endpointName": "<FILL_ENDPOINT_NAME>"
      }
    ],
    "http": [
      {
        "endpointId": "<FILL_*>",
        "oisTitle": "<FILL_OIS_TITLE>",
        "endpointName": "<FILL_ENDPOINT_NAME>"
      }
    ],
    "httpSignedData": [
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
              "name": "<FILL_*>",
              "scheme": "<FILL_*>"
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
      "securitySchemeValue": "${SS_API_KEY}" // In secrets.env
    }
  ]
}
```
