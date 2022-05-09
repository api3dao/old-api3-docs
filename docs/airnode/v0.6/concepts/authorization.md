---
title: 授权者
---

<TitleSpan>概念和定义</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,5]" />

Airnode可以使用授权者，授权请求者对其底层API的合约访问。 作为一种选项，API供应商也可以使用[中继元数据](./relay-meta-auth.md) 来验证请求。 授权者需要API供应商具备区块链相关知识，中继元数据则不需要。

与授权者和中继元数据相关的其他文档：

- [使用授权者](../grp-providers/guides/build-an-airnode/apply-auth.md)
- [API 安全性](../grp-providers/guides/build-an-airnode/api-security.md)

当Airnode收到一个请求时，它可以使用链上的授权者合约来验证是否有必要作出回应。 授权者允许Airnode采取各种各样的措施。 以下是一些示例：

- 响应已经用DAI支付每月订阅费的赞助者的请求。
- 响应已用API3代币支付每次调用费用的个别请求。
- 响应被API3 DAO列入白名单的请求者提出的请求。
- 响应由Airnode所有者的后台（例如基于PayPal付款）列入白名单的赞助者提出的请求。

授权者的一个常见用例是为Airnode运营商开发的[RequesterAuthorizerWithAirnode](#requesterauthorizerwithairnode)授权者合约，这是可直接使用的。 它允许在每个端点的基础上，对请求者合约（有或没有过期时间戳）设置白名单。 这是最常用的情况，实际上已经可以满足许多Airnodes的需要。

下图说明Airnode 如何使用授权者。

> ![概念授权人](../assets/images/concepts-authorizers.png)
> 
> 1. <p class="diagram-line">当Airnode启动时，它会读取其在config.json中声明的授权者合约列表。</p>
> 2. <p class="diagram-line">Airnode在其运行周期内从事件日志中收集请求。</p>
> 3. <p class="diagram-line">Airnode 将每个请求与授权者合约列表一起，发送到 <code>checkAuthorizationStatus()</code>。</p>
> 4. <p class="diagram-line"><code>checkauthorizationStatus()</code> 执行每个授权者合约中的<code>isAuthorized()</code>函数。 如果任何一个授权者合同返回 "true"，那么 "true "就会返回给Airnode，Airnode进而着手继续执行请求。</p>

### Airnode 授权策略

Airnode提供了两个授权者合同，其中一个（RequesterAuthorizerWithAirnode）可以被任何API供应商使用。 另一个（RequesterAuthorizerWithManager）则是由API3 DAO使用的。 本文档中的以下章节将会对它进行详细介绍。

- [`RequesterAuthorizerWithAirnode`](#requesterauthorizerwithairnode)
- [`RequesterAuthorizerWithManager`](#requesterauthorizerwithmanager)

这两个授权者合约都继承和扩展了`RequesterAuthorizer`抽象合约，该合约也扩展了 `Whitelist`合约。 这意味着这两个授权者合约在向Airnode提供请求者合约之前，都需要对其设置白名单（对于`RequesterAuthorizerWithAirnode` ，可以使用[admin-cli](../reference/packages/admin-cli.md#requesterauthorizerwithairnode)完成）。

它们之间的主要区别是： `RequterAuthorizerWiAirnode` 允许 Airnode 为指定的 Airnode授予白名单角色。 另一方面， `RequestterAuthorizerWiManager` 允许管理员地址(阅读：API3 DAO) 对所有使用它的Airnode授予白名单角色。

一些常用的函数包括：

- `requestterIsWhitelisted`: 被调用，用来来检查请求者是否列入白名单，可以使用Airnode-endpoint 配对。
- <code style="  overflow-wrap: break-word;">airnodeToEndpointIdToRequesterToWhitelistStatus</code>: 调用他，从Airnode–endpoint配对获得请求者的详细的白名单状态。

### 自定义授权者

自定义授权者合约，可以执行任意授权逻辑。 可能有这样的例子，如果请求者上个月向Airnode发出的请求少于特定数量，Airnode才会回应请求，从而有效地实现了链上呼叫配额。

### 授权者列表

Airnode 授权者放于config.json 文件中，位于 [`chain[n].authorers`](../grp-providers/guides/build-an-airnode/configuring-airnode.md#chains) 中。 授权者通常检查单个条件 (请求者是否每月支付了费用 ，是不是`请求者` 白名单等)。 授权者也可以合并来执行更复杂的策略。 如果列表中的任何授权者都允许访问，请求将被视为已授权。 从逻辑 的角度来看，授权结果已完成`or`操作。

### 授权者界面

继承自 `IAuthorizer` 的授权者合约，可以用来执行基于其输入参数的任意授权策略。

- `requestId`: bytes32
- `airnode`: address
- `endpointId`: bytes32
- `sponsor`: address
- `requester`: address

请注意，授权者不必使用所有的参数，甚至可以决定任意的链上标准，如`block.number`（例如，不要对block number N之后的任何请求做出回应）。 授权者是与以下接口的合约：

```solidity
interface IAuthorizer {
    function isAuthorized(
        bytes32 requestId,
        address airnode,
        bytes32 endpointId,
        address sponsor,
        address requester
    ) external view returns (bool);
}
```

以下是如何创建最简单的授权者形式的例子。 授权者允许任何请求者合约调用endpointId(0xf2ee...)。

```solidity
contract myAuthorizer is IAuthorizer
{
  function isAuthorized(
      bytes32 requestId,
      address airnode,
      bytes32 endpointId,
      address sponsor,
      address requester
  ) external view override returns (bool) {
      bytes32 expected = 0xf2ee...;
      return endpointId == expected;
  }
}
```

### 为什么需要授权计划？

Aircode需要有选择性地满足请求的能力。 这是由于两个主要原因:

1. Airnode 只能满足已向Airnode 所有者支付费用 的请求者提出的请求，这使得他们能够将自己的服务货币化。
2. Airnode 的服务是敏感的，只能被某些请求者，例如已经通过 KYC 的访问。

没有授权者计划或同等功能的协议不能被视为无需许可，并且将无法实现广泛应用。

### 是否需要授权者？

授权者不是必需的。 Airnode运营商可以使用 [中继元数据安全方案](../grp-providers/guides/build-an-airnode/api-security.md#relayed-meta-data-security-schemes)。 可以同时使用授权者和中继安全方案。

### 如何执行授权者？

关于如何执行授权策略，有两点要考虑：

1. 如果这些策略被保存在链外，请求者就无法看到它们或检查它们是否满足。 此外，Airnode 所有者更新策略 (例如增加服务费)需要与请求者进行链下的协调。
2. 将策略嵌入到请求-响应循环，会带来gas费用开销。

基于这些考虑，Airnode 采用混合方法。 Airnode通过链外渠道宣布其授权策略，作为授权者合约列表的地址。 每当Airnode收到一个请求时，它就会通过静态调用来检查是否应该满足这个请求，这个静态调用就是查询链上策略。 同样，请求者可以通过 进行静态调用来检查是否获得授权。 这个方案允许Airnode 设置透明和灵活的策略，并且不会用到gas间接费用。

### Access (deny, allow, filter)

授权者是基于特定Airnode的`config.json`的`chains`字段影响访问的。

#### Deny All

如果Airnode 想要拒绝某个特定链上的所有访问权限，它就不应该在这条链上运行 (例如，它不应该存在于 `chain` 的列表中。) 下面的例子中，将会把 "拒绝所有 "应用到链1和3-n，因为它们在`chains`字段中没有相关条目。

```json
 chains:[
   {
    id:2,
    authorizers:[],
    ...
   }
 ]
```

#### 全部允许

`chains.authorizers` 列出的[]，意味着“让所有的都能通过”。 在下面的示例中，链2将允许访问任何请求者。

```json
  chains:[
    {
      id:2,
      authorizers:[]
      ...
    },
    ...
 ]
```

#### 全部过滤

如果Airnode 想要选择性地授予访问权限，它应该使用一个或多个执行过滤逻辑的授权者。 在下面的示例中，Airnode 将接受链上 _"2"_ 上的请求，请求者将被两个授权者过滤。

```json
 chains:[
   id:2,
   authorizers:['0xcd...cd8d','0xff...d19c]
   ...
 ]
```

### RequesterAuthorizerWithAirnode

此合约实现了一个基于请求的RRP授权者，具有三种类型的角色。

1. 白名单过期扩展程序：允许延长临时白名单过期时间。
2. 白名单过期设置：允许设置临时白名单 过期时间(即他们也可以缩短过期时间)。
3. 无限期白名单：允许无限期的白名单/非白名单。每个Airnode的地址被视为拥有所有这三个角色的，他们也可以将这些角色授予其他账户，其中包括实现任意业务逻辑的合约。

#### extendWhitelistExpiration

`extendWhitelistExpiration()` 函数可以被白名单过期扩展器或 Airnotode 地址调用，以延长Airnode-endpoint 对应的请求者 的白名单过期期限。

此函数发布`ExtendedWhitelistExpiration`事件，并且有以下签名：

```
    event ExtendedWhitelistExpiration(
        address indexed airnode,
        bytes32 endpointId,
        address indexed requester,
        address indexed sender,
        uint256 expiration
    );
```

#### setWhitelistExpiration

`extendWhitelistExpiration()` 函数可以被白名单过期扩展器或 Airnotode 地址调用，以延长Airnode-endpoint 对应的请求者 的白名单过期期限。 这可能会加速过期。

此函数发布`ExtendedWhitelistExpiration`事件，并且有以下签名：

```
    event SetWhitelistExpiration(
        address indexed airnode,
        bytes32 endpointId,
        address indexed requester,
        address indexed sender,
        uint256 expiration
    );
```

#### setWhitelistStatusPastExpiration

`setWhitelistStatusPastExpiration()` 函数可以被一个无限期的 白名单或Airnode 地址调用，以设置请求者的白名单状态超过Airnode-终端对的到期时间。 这对允许访问一个API很有用，即使过了有效期。 例如，继续授权请求，同时锁定一定数量的API3代币。

此函数发布`ExtendedWhitelistExpiration`事件，并且有以下签名：

```
    event SetWhitelistStatusPastExpiration(
        address indexed airnode,
        bytes32 endpointId,
        address indexed requester,
        address indexed sender,
        bool status
    );
```

#### isAuthorized

`isAuthorized()` 函数将被 AirnodeRrp 调用，来验证请求的授权状态。 此函数将返回所有白名单请求者合约、管理员和 Airnode 运营商地址的真实值。

### RequesterAuthorizerWithManager

该合同实现了一个基于请求者的RRP授权器，并指定API3 DAO作为管理者，或者换句话说，所有Airnodes中排名最高的管理员。

管理器和它授予白名单过期扩展、白名单过期设置和无限期白名单角色的账户，使用`RequesterAuthorizerWithManager`将所有Airnode的请求者列入白名单。

#### extendWhitelistExpiration

`extendWhitelistExpiration()` 函数可以被白名单过期扩展器或 Airnotode 地址调用，以延长Airnode-endpoint 对应的请求者的白名单过期期限。

此函数发布`ExtendedWhitelistExpiration`事件，并且有以下签名：

```
    event ExtendedWhitelistExpiration(
        address indexed airnode,
        bytes32 endpointId,
        address indexed requester,
        address indexed sender,
        uint256 expiration
    );
```

#### setWhitelistExpiration

`extendWhitelistExpiration()` 函数可以被白名单过期扩展器或 Airnotode 地址调用，以延长Airnode-endpoint 对应的请求者的白名单过期期限。 这可能会加速过期。

此函数发布`ExtendedWhitelistExpiration`事件，并且有以下签名：

```
    event SetWhitelistExpiration(
        address indexed airnode,
        bytes32 endpointId,
        address indexed requester,
        address indexed sender,
        uint256 expiration
    );
```

#### setWhitelistStatusPastExpiration

`setWhitelistStatusPastExpiration()` 函数可以被一个无限期的白名单或Airnode 地址调用，以设置请求者的白名单状态超过Airnode-endpoint配对的到期时间。 即使过期日期已过，这对于允许访问API 非常有用。 例如，在一定数量的API3代币被锁定时，可以保持授权请求。

此函数发布`ExtendedWhitelistExpiration`事件，并且有以下签名：

```
    event SetWhitelistStatusPastExpiration(
        address indexed airnode,
        bytes32 endpointId,
        address indexed requester,
        address indexed sender,
        bool status
    );
```

#### isAuthorized

`isAuthorized()` 函数将被 AirnodeRrp 调用，来验证请求的授权状态。 此函数将返回所有白名单请求者合约、管理员和 Airnode 运营商地址的真实值。

<divider/>
