---
title: config.example.json
folder: Tutorials > Config Examples
basePath: /airnode/pre-alpha
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}
<VersionWarning/>
```json
{
  "ois": [
    {
      "oisFormat": "1.0.0",
      "title": "CoinGecko-starter-example",
      "version": "1.0.0",
      "apiSpecifications": {
        "servers": [
          {
            "url": "https://api.coingecko.com/api/v3"
          }
        ],
        "paths": {
          "/coins/{id}": {
            "get": {
              "parameters": [
                {
                  "in": "path",
                  "name": "id"
                },
                {
                  "in": "query",
                  "name": "localization"
                },
                {
                  "in": "query",
                  "name": "tickers"
                },
                {
                  "in": "query",
                  "name": "market_data"
                },
                {
                  "in": "query",
                  "name": "community_data"
                },
                {
                  "in": "query",
                  "name": "developer_data"
                },
                {
                  "in": "query",
                  "name": "sparkline"
                }
              ]
            }
          }
        },
        "components": {
          "securitySchemes": {}
        },
        "security": {}
      },
      "endpoints": [
        {
          "name": "coinMarketData",
          "operation": {
            "method": "get",
            "path": "/coins/{id}"
          },
          "fixedOperationParameters": [
            {
              "operationParameter": {
                "in": "query",
                "name": "localization"
              },
              "value": "false"
            },
            {
              "operationParameter": {
                "in": "query",
                "name": "tickers"
              },
              "value": "false"
            },
            {
              "operationParameter": {
                "in": "query",
                "name": "market_data"
              },
              "value": "true"
            },
            {
              "operationParameter": {
                "in": "query",
                "name": "community_data"
              },
              "value": "false"
            },
            {
              "operationParameter": {
                "in": "query",
                "name": "developer_data"
              },
              "value": "false"
            },
            {
              "operationParameter": {
                "in": "query",
                "name": "sparkline"
              },
              "value": "false"
            }
          ],
          "reservedParameters": [
            {
              "name": "_type",
              "fixed": "int256"
            },
            {
              "name": "_path",
              "fixed": "market_data.current_price.usd"
            },
            {
              "name": "_times",
              "fixed": "1000000"
            },
            {
              "name": "_relay_metadata",
              "default": "v1"
            }
          ],
          "parameters": [
            {
              "name": "coinId",
              "operationParameter": {
                "in": "path",
                "name": "id"
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
        "endpointId": "0xe811f1a71c3f0d159472ec8bfa281483d74920e26a9d116de667858e12d1943e",
        "oisTitle": "CoinGecko-starter-example",
        "endpointName": "coinMarketData"
      }
    ]
  },
  "nodeSettings": {
    "nodeVersion": "0.1.0",
    "cloudProvider": "aws",
    "region": "us-east-1",
    "stage": "starter-example",
    "logFormat": "json",
    "chains": [
      {
        "id": "3",
        "type": "evm",
        "providers": [
          {
            "name": "my-provider",
            "url": "{FILL_PROVIDER_URL}"
          }
        ],
        "contracts": {
          "Airnode": "0xF8d32C3e53F7DA6e7CB82323f2cAB2159776b832",
          "Convenience": "0x1552cF617711D6Da04E0EDC9e5C26eBbA08625ac"
        },
        "providerAdminForRecordCreation": "{FILL_PROVIDER_ADMIN}"
      }
    ]
  },
  "id": "981d57c2-a004-4526-99da-1b04608fb463"
}
```
