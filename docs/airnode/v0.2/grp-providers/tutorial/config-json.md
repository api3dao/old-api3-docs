---
title: config.json
---

<TitleSpan>Quick Deploy Demo</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/> The config.json file contents shown below is for the [Quick Deploy](./) demo.

```json
{
  "chains": [
    {
      "authorizers": [],
      "contracts": {
        "AirnodeRrp": "0xe469aD70a2CD3A01F4eCb6502161A4F381c1F659"
      },
      "id": "4",
      "providers": {
        "myChainProvider": {
          "url": "${CHAIN_PROVIDER_URL}"
        }
      },
      "type": "evm"
    }
  ],
  "nodeSettings": {
    "cloudProvider": "aws",
    "airnodeWalletMnemonic": "${AIRNODE_WALLET_MNEMONIC}",
    "heartbeat": {
      "enabled": false
    },
    "httpGateway": {
      "enabled": true,
      "apiKey": "${HTTP_GATEWAY_API_KEY}"
    },
    "logFormat": "plain",
    "logLevel": "INFO",
    "nodeVersion": "0.2.2",
    "region": "us-east-1",
    "stage": "dev"
  },
  "triggers": {
    "rrp": [
      {
        "endpointId": "0xf466b8feec41e9e50815e0c9dca4db1ff959637e564bb13fefa99e9f9f90453c",
        "oisTitle": "CoinGecko Basic Request",
        "endpointName": "coinMarketData"
      }
    ]
  },
  "ois": [
    {
      "oisFormat": "1.0.0",
      "title": "CoinGecko Basic Request",
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
          "testable": true,
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
  "apiCredentials": []
}
```
