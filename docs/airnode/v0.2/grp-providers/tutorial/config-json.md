---
title: config.json
docSetName: Airnode v0.2
folder: API Providers > Tutorial
basePath: /airnode/v0.2
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>
The config.json file contents shown below is for the [Quick Deploy](./) demo.

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
        "endpointId": "0x6db9e3e3d073ad12b66d28dd85bcf49f58577270b1cc2d48a43c7025f5c27af6",
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
