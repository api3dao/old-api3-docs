---
title: Chain Providers
docSetName: Airnode v0.10
folder: Concepts and Definitions
basePath: /airnode/v0.10
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Chain providers provide access to an evm on behalf of an API provider. Your
Airnode will interact with one or more chain providers and respond to requests.
You can use multiple chain providers for each chain and declare multiple chains
each with one of more chain providers. Below are some of the chain providers you
might use.

- [Pocket](https://www.pokt.network/)
- [Infura](https://infura.io)
- [Alchemy](https://www.alchemy.com/)

## One Provider

In this example, the first (and only) element of the `chains` array specifies
the _Sepolia_ blockchain via the `id` _11155111_. The `type` is set to _evm_,
which is the only type currently supported by Airnode. The `providers` field
specifies a single provider, the name of which is arbitrary and in this case is
_infuraSepolia_. The inner object contains a single `url` field, the value of
which is interpolated from `secrets.env`.

```json
"chains": [
  {
    "authorizers": {
      "requesterEndpointAuthorizers": [
        "0xf18c105D0375E80980e4EED829a4A68A539E6178"
      ],
      "crossChainRequesterAuthorizers": []
    },
    "authorizations": {
        "requesterEndpointAuthorizations": {}
      },
    "contracts": {
      "AirnodeRrp": "0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"
    },
    "id": "11155111",
    "providers": {
      "infuraSepolia": {
        "url": "${INFURA_SEPOLIA_PROVIDER_URL}"
      }
    },
    "type": "evm",
    "options": {
      "fulfillmentGasLimit": 500000,
      "gasPriceOracle": [
        {
          "gasPriceStrategy": "latestBlockPercentileGasPrice",
          "percentile": 60,
          "minTransactionCount": 20,
          "pastToCompareInBlocks": 20,
          "maxDeviationMultiplier": 2,
        },
        {
          "gasPriceStrategy": "providerRecommendedGasPrice",
          "recommendedGasPriceMultiplier": 1.2,
        },
        {
          "gasPriceStrategy": "providerRecommendedEip1559GasPrice",
          "baseFeeMultiplier": 2,
          "priorityFee": {
            "value": 3.12,
            "unit": "gwei",
          }
        },
        {
          "gasPriceStrategy": "constantGasPrice",
          "gasPrice": {
            "value": 10,
            "unit": "gwei"
          }
        }
      ],
    },
    "maxConcurrency": 100
  }
],
```

## Multiple Providers

Multiple providers can be used per chain, for example to improve resiliency.
Simply add another uniquely named object to `providers` as shown below.

```json
"chains": [
  {
    "authorizers": {
      "requesterEndpointAuthorizers": [
        "0xf18c105D0375E80980e4EED829a4A68A539E6178"
      ],
      "crossChainRequesterAuthorizers": []
    },
    "authorizations": {
        "requesterEndpointAuthorizations": {}
      },
    "contracts": {
      "AirnodeRrp": "0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"
    },
    "id": "11155111",
    "providers": {
      "infuraSepolia": {
        "url": "${INFURA_SEPOLIA_PROVIDER_URL}"
      },
      "alchemySepolia": {
        "url": "${ALCHEMY_SEPOLIA_PROVIDER_URL}"
      }
    },
    "type": "evm",
    "options": {
      "fulfillmentGasLimit": 500000,
      "gasPriceOracle": [
        {
          "gasPriceStrategy": "latestBlockPercentileGasPrice",
          "percentile": 60,
          "minTransactionCount": 20,
          "pastToCompareInBlocks": 20,
          "maxDeviationMultiplier": 2,
        },
        {
          "gasPriceStrategy": "providerRecommendedGasPrice",
          "recommendedGasPriceMultiplier": 1.2,
        },
        {
          "gasPriceStrategy": "providerRecommendedEip1559GasPrice",
          "baseFeeMultiplier": 2,
          "priorityFee": {
            "value": 3.12,
            "unit": "gwei",
          }
        },
        {
          "gasPriceStrategy": "constantGasPrice",
          "gasPrice": {
            "value": 10,
            "unit": "gwei"
          }
        }
      ],
    },
    "maxConcurrency": 100
  }
],
```
