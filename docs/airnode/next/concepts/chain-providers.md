---
title: Chain Providers
---

<TitleSpan>Concepts and Definitions</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Chain providers provide access to an evm on behave of an API provider. Your Airnode will interact with one or more chain providers and respond to requests. You can use multiple chain providers for each chain and declare multiple chains each with one of more chain providers. Below is the list of chain providers  you might use.

<Fix>Need list of usable chain providers here.</Fix>
- [Infura](https://infura.io)

## One Chain: One Provider

As an example the `chains` field declares its use of blockchain 4, _Rinkeby_. The `type` is set to _evm_ which is the only type currently supported by Airnode. It then applies an arbitrary name for the blockchain provider "infura_rinkeby" in the `provider` array.

```json
"chains": [
  {
    "authorizers": [
      "0x5Fgh48...3F6f64180acc"
    ],
    "contracts": {
      "AirnodeRrp": "0xF6d267546...BC9A384fa418"
    },
    "id": "4",
    "type": "evm",
    "providers": [
      "infura_rinkeby": {
        "url": "${INFURA_RINKEBY_PROVIDER_URL}"
      }
    ]
  }
],
```

## One Chain: Multiple Providers

Multiple providers can be used per chain. Simply add another object to `providers`. In this case both blockchain providers will have the same chain `id` and `type`.

```json
"chains": [
  {
    "authorizers": [
      "0x5Fgh48...3F6f64180acc"
    ],
    "contracts": {
      "AirnodeRrp": "0xF6d267546...BC9A384fa418"
    },
    "id": "4",
    "type": "evm",
    "providers": [
      "infura_rinkeby": {
        "url": "${INFURA_RINKEBY_PROVIDER_URL}"
      },
      "infura_ropsten": {
        "url": "${INFURA_ROPSTEN_PROVIDER_URL}"
      }
    ]
  }
],
```

## Multiple Chains: Multiple Providers

Not as complicated as it sounds. First create two or more chain objects were each has a unique `id` and `type` and a list of `providers` for each.

```json
"chains": [
  {
    "authorizers": [
      "0x5Fgh48...3F6f64180acc"
    ],
    "contracts": {
      "AirnodeRrp": "0xF6d267546...BC9A384fa418"
    },
    "id": "4",
    "type": "evm",
    "providers": [
      "infura_rinkeby": {
        "url": "${INFURA_RINKEBY_PROVIDER_URL}"
      },
      "infura_ropsten": {
        "url": "${INFURA_ROPSTEN_4_PROVIDER_URL}"
      }
    ]
  },
  {
    "authorizers": [
      "0x5gh48...3F6f6418dee9"
    ],
    "contracts": {
      "AirnodeRrp": "0xG9e39...BC9A384df3434"
    },
    "id": "3",
    "type": "evm",
    "providers": [
      "infura_ropsten": {
        "url": "${INFURA_ROPSTEN_3_PROVIDER_URL}"
      }
    ]
  }
],
```
