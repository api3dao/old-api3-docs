---
title: 使用授权者(可选)
---

<TitleSpan>创建一个 Airnode</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

Airnode可以使用[授权者](../../../concepts/authorization.md)，授权请求者合约访问其底层API。 这种方法是在链上操作的，需要API供应商具备一些区块链知识。

[授权者](../../../concepts/authorization.md)是一个合约，它通常检查一个单一的条件（"请求者是否已经支付了他们的月费"，"这个`requesterAddress`是否被列入白名单"，等等）。 授权者可以被组合起来以执行更复杂的策略。 如果列表中的任何一个授权者给予访问权，该请求将被认为是已授权的。 从逻辑的角度看，授权结果得到**OR**。

::: tip 备选方案：中继的元数据

作为授权者的替代品，API提供者可以使用[中继元数据](./api-security.md#relayed-meta-data-security-schemes)来验证请求。 这种方法是链外的，不需要API供应商的区块链知识。 请注意，有可能同时使用授权者和中继元数据。

:::

当你部署Airnode时，会产生一个包含Airnode的`airnodeAddress`的收据文件。 赞助者（通过其赞助的请求者）使用`airnodeAddress`和`endpointId`来向你的Airnode的端点提出请求。 然而，你可能也不希望公开为他们服务。

- 仅为您自己的 [请求者合约](../../../grp-developers/requesters-sponsors.md) 服务。
- 仅为已经支付订阅费的赞助者服务。
- 只为已通过KYC的赞助者服务。

你可以通过在`config.json`文件中的`chains[n].authorizers`提出声明，为Airnode部署的每条链使用不同的授权者合约。 为每个链添加一个授权者合约地址列表。 如果`chains[n].authorizers`数组为空，那么所有的请求都会被Airnode接受，但仍然可以通过第二种授权方法，即[中继安全方案](./apply-auth.md#relay-security-schemes)进行过滤。

```json
{
 ...
 "chains":[
    {
      "id": "1",
      ...
      "authorizers": [  // Requests must satisfy at least one contract
        "0xeabb...C123",
        "0xCE5e...1abc"
      ]
    },
    {
      "id": "2",
      ...
      "authorizers": [], // All requests will be processed
    },
    {
      "id": "3",
      ...
      "authorizers": [   // Requests must satisfy one contract
        "0xeabb...C123"
      ]
    },
   ]
 }
}
```

无论调用哪个端点，您使用的授权者都会授权所有请求。 端点需要在 `config.json` 文件的 `ois.endpoints` 字段中声明。 要进一步通过一个特定的端点进行过滤，你必须使用像RequesterAuthorizerWithAirnode这样的授权器。

## RequesterAuthorizerWithAirnode

授权者的一个常见用例是，为Airnode运营商开发的[RequesterAuthorizerWithAirnode](../../../concepts/authorization.md#requesterauthorizerwithairnode)授权者合约，可直接使用。 它允许在每个端点的基础上，对请求者合约（有或没有过期时间戳）设置白名单。 这是最常见的用例，实际上可以满足许多 Airnode 的需求。 你可以在[Airnode合约地址](../../../reference/airnode-addresses.md)文档中找到这个授权者的合同地址。

要使用 Requester AuthorizerWairnode 授权器：

1. 将授权者合同地址添加到`chain[n].authorizers[]`数组中。
2. 在你的Airnode部署后，调用Admin CLI命令[set-whitelist-expiration](../../../reference/packages/admin-cli.md#set-whitelist-expiration)，将所需的请求者合约地址添加到RequesterAuthorizerWithAirnode维护的白名单中。

一旦实施，只有你添加到RequesterAuthorizerWithAirnode的请求者合约地址，才能访问你的Airnode。
