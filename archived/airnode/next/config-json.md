---
title: config.json
---

<TitleSpan>Example Files</TitleSpan>

# {{$frontmatter.title}}

<!-- TODO: This URL needs a repo tag for v0.2 -->

You can also view this example
[config.json](https://github.com/api3dao/airnode/blob/master/packages/airnode-node/config/config.json.example)
in the Airnode repo.

<RepoCode urlRaw="https://raw.githubusercontent.com/api3dao/airnode/master/packages/airnode-node/config/config.json.example"/>

<!--
```json
{
  "chains": [
    {
      "authorizers": [],
      "contracts": {
        "AirnodeRrp": "0x534DfA0d242e7fDCFD096C2B1a3D70F172008778"
      },
      "id": "4",
      "providers": {
        "rinkeby": {
          "url": "${RINKEBY_PROVIDER_URL}"
        }
      },
      "type": "evm"
    }
  ],
  "nodeSettings": {
    "cloudProvider": "aws",
    "airnodeWalletMnemonic": "${AIRNODE_WALLET_MNEMONIC}",
    "heartbeat": {
      "enabled": true,
      "apiKey": "${HEARTBEAT_API_KEY}",
      "id": "${HEARTBEAT_ID}",
      "url": "${HEARTBEAT_URL}"
    },
    "httpGateway": {
      "enabled": true,
      "apiKey": "${HTTP_GATEWAY_API_KEY}"
    },
    "logFormat": "plain",
    "logLevel": "INFO",
    "nodeVersion": "1.0.0",
    "region": "us-east-1",
    "stage": "dev"
  },
  "triggers": {
    "rrp": [
      {
        "endpointId": "0xeddc421714e1b46ef350e8ecf380bd0b38a40ce1a534e7ecdf4db7dbc9319353",
        "oisTitle": "Currency Converter API",
        "endpointName": "convertToUSD"
      }
    ]
  },
  "ois": [
    {
      "oisFormat": "1.0.0",
      "version": "1.2.3",
      "title": "Currency Converter API",
      "apiSpecifications": {
        "servers": [
          {
            "url": "http://localhost:5000"
          }
        ],
        "paths": {
          "/convert": {
            "get": {
              "parameters": [
                {
                  "in": "query",
                  "name": "from"
                },
                {
                  "in": "query",
                  "name": "to"
                },
                {
                  "in": "query",
                  "name": "amount"
                },
                {
                  "in": "query",
                  "name": "date"
                }
              ]
            }
          }
        },
        "components": {
          "securitySchemes": {
            "Currency Converter Security Scheme": {
              "in": "header",
              "type": "apiKey",
              "name": "X_access_key"
            }
          }
        },
        "security": {
          "Currency Converter Security Scheme": []
        }
      },
      "endpoints": [
        {
          "name": "convertToUSD",
          "operation": {
            "method": "get",
            "path": "/convert"
          },
          "fixedOperationParameters": [
            {
              "operationParameter": {
                "in": "query",
                "name": "to"
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
              "fixed": "result"
            },
            {
              "name": "_times",
              "default": "1000000"
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
                "in": "query",
                "name": "from"
              }
            },
            {
              "name": "amount",
              "default": "1",
              "operationParameter": {
                "name": "amount",
                "in": "query"
              }
            }
          ],
          "testable": true
        }
      ]
    }
  ],
  "apiCredentials": [
    {
      "oisTitle": "Currency Converter API",
      "securitySchemeName": "Currency Converter Security Scheme",
      "securitySchemeValue": "${SS_CURRENCY_CONVERTER_API_KEY}"
    }
  ]
}
```
-->
