---
title: 区块链供应商
---

<TitleSpan>概念和定义</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

区块链供应商代表一个API供应商提供对evm的访问权限。 Airnode将与一个或多个区块链供应商交互，并对请求作出回应 可以为每条链使用多个区块链供应商，并声明多条链，每条链有一个或多个区块链供应商。 下面是您可能会用到的一些区块链供应商。

- [Pocket](https://www.pokt.network/)
- [Infura](https://infura.io)
- [Alchemy](https://www.alchemy.com/)

## 一条链：一个供应商

举例来说，`chains`字段声明其使用的是区块链4，_Rinkeby_。 `type` 被设置为 _evm_ ，这是目前Airnode支持的唯一类型。 然后它在 `providers`数组中，为区块链供应商使用了一个任意的名称 "infura_rinkeby"。

```json
"chains": [
  {
    "maxConcurrency": 100,
    "authorizers": [
      "0x5Fgh48...3F6f64180acc"
    ],
    "contracts": {
      "AirnodeRrp": "0xF6d267546...BC9A384fa418"
    },
    "id": "4",
    "type": "evm",
    "options": {
      "txType": "eip1559",
      "priorityFee": {
        "value": 3.12,
        "unit": "gwei"
      },
      "baseFeeMultiplier": 2
    },
    "providers": [
      "infura_rinkeby": {
        "url": "${INFURA_RINKEBY_PROVIDER_URL}"
      }
    ]
  }
],
```

## 一个链：多个提供商

一条链可以使用多个供应商。 只需将另一个对象添加到`providers`中。 在这种情况下，两个区块链供应商将具有相同的链`id` 和`type`。

```json
"chains": [
  {
    "maxConcurrency": 100,
    "authorizers": [
      "0x5Fgh48...3F6f64180acc"
    ],
    "contracts": {
      "AirnodeRrp": "0xF6d267546...BC9A384fa418"
    },
    "id": "4",
    "type": "evm",
    "options": {
      "txType": "eip1559",
      "priorityFee": {
        "value": 3.12,
        "unit": "gwei"
      },
      "baseFeeMultiplier": 2
    },
    "providers": [
      "infura_rinkeby": {
        "url": "${INFURA_RINKEBY_PROVIDER_URL}"
      },
      "alchemy_rinkeby": {
        "url": "${ALCHEMY_RINKEBY_PROVIDER_URL}"
      }
    ]
  }
],
```

## 多条链：多个提供商

并不像听起来那么复杂。 首先创建两个或更多的链对象，每个对象都有一个独特的`id` 和 `type`，以及每个对象的`providers`列表。

```json
"chains": [
  {
    "maxConcurrency": 100,
    "authorizers": [
      "0x5Fgh48...3F6f64180acc"
    ],
    "contracts": {
      "AirnodeRrp": "0xF6d267546...BC9A384fa418"
    },
    "id": "4",
    "type": "evm",
    "options": {
      "txType": "eip1559",
      "priorityFee": {
        "value": 3.12,
        "unit": "gwei"
      },
      "baseFeeMultiplier": 2
    },
    "providers": [
      "infura_rinkeby": {
        "url": "${INFURA_RINKEBY_PROVIDER_URL}"
      },
      "alchemy_rinkeby": {
        "url": "${ALCHEMY_RINKEBY_PROVIDER_URL}"
      }
    ]
  },
  {
    "maxConcurrency": 100,
    "authorizers": [
      "0x5gh48...3F6f6418dee9"
    ],
    "contracts": {
      "AirnodeRrp": "0xG9e39...BC9A384df3434"
    },
    "id": "3",
    "type": "evm",
    "options": {
      "txType": "eip1559",
      "priorityFee": {
        "value": 3.12,
        "unit": "gwei"
      },
      "baseFeeMultiplier": 2
    },
    "providers": [
      "infura_ropsten": {
        "url": "${INFURA_ROPSTEN_PROVIDER_URL}"
      }
    ]
  }
],
```
