---
title: 赞助者
---

<TitleSpan>概念和定义</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

赞助者是一个实体（个人、企业等）。 赞助者建立[请求者](requester.md)和[sponsorWallets](sponsor.md#sponsorwallet)之间的关系。 他们通过赞助请求者和为希望请求者调用的Airnode衍生赞助者钱包来做到这一点。

> ![关系](../assets/images/concepts-sponsor-relationships.png)

通过以下方式建立这种关系：

- 一个赞助者 "赞助 "一个请求者。
- 赞助者为所需的Airnode "衍生 "一个 [sponsorWallet](sponsor.md#sponsorwallet)。

提出请求。

1. 现在 "被赞助 "的请求者向Airnode提出[请求](request.md)。 传递给Airnode的参数包括`sponsorAddress`和 `sponsorWalletAddress`。
2. Airnode验证请求者的赞助者，确认是与Airnode相关的衍生出 `sponsorWallet`的赞助者。
3. Airnode使用各自赞助者的`sponsorWallet`来满足请求，这意味着赞助者承担了gas费用。

请求者如何指代赞助者。

1. 请求者可以拥有多个赞助者。 在提出请求时，请求者提供了想让请求得到满足的`sponsorAddress` 。 AirnodeRrp.sol协议合约检查请求者是否被赞助，如果是，则发出请求事件。

2. 接下来，Airnode使用提供的`sponsorAddress`衍生出 `sponsorWallet`地址，然后检查是否与`sponsorWallet`匹配。 如果两者不匹配，Airnode将忽略请求。 之所以这样做，是因为从链上的`sponsorAddress`衍生出`sponsorAddress`地址是不可行的。

## sponsorAddress

赞助者由`sponsorAddress`识别，通常是赞助者拥有的BIP 44钱包的默认账户`m/44'/60'/0'/0/0`。 如果需要，赞助者可以使用与钱包不同的地址，如`m/44'/60'/0'/0/2`。

请注意，一个赞助者可以使用多个钱包的多个地址。 以下是一些希望在链上拥有多个`sponsorAddress`身份的例子：

- 为两个不同的使用案例保留不同的`sponsorWallets`，以方便核算。
- 为单一用途重复交易队列，提高响应速度。

## sponsorWallet

每个[Airnode](airnode.md)可以为一个赞助者保留一个唯一的`sponsorWallet`。 该钱包由`sponsorAddress/airnodeAddress`配对识别。 赞助者必须对特定的Airnode采取行动， [衍生出](#derive-a-sponsor-wallet) `sponsorWallet` 。 被赞助者赞助的[请求者](requester.md)，可以要求其请求由指定给赞助者的`sponsorWallet`来完成。 这允许赞助者支付Airnode履行请求的gas费用，因为赞助者必须在提出请求之前向该钱包发送资金。

来自同一 `sponsorWallet` 的请求是按顺序进行的，以尊重交易的nonce。 单个Airnode运行中将只尝试满足五个最靠前的请求，防止超时问题。 对于高度不稳定的情况，建议使用多个赞助者(也就是赞助者钱包)，因为来自不同赞助者钱包的请求是并行执行的。

::: 钱包和协议

某个特定赞助者的赞助钱包取决于Airnode 协议(RRP, 即将出台的 PSP 协议等)。 这意味着，为一个特定的赞助者衍生的赞助者钱包地址，在不同的协议中也是不同的。 这是有意为之，并允许一个特定的赞助者只资助一个特定的协议（例如，只有RRP）。

:::

### 衍生路径

每个赞助者都由`sponsorAddress`来识别，他们的赞助者钱包则由衍生路径来暗中指定。 对于RRP协议，`sponsorWallet`的衍生路径以`m/44'/60'/0'/1/...`开始。 其他分支将被用来衍生出其他协议的赞助者钱包。

::: 了解路径路径

了解衍生路径并不重要，也可以简单地使用管理员CLI衍生的地址。

:::

连接到基础Ethereum 地址集的一般路径看起来就像 这样： `m/44'/60'/0'/0`。 这个序列被分解成不同的部分，并根据正在处理的内容而改变。 这个序列是：`m’ / purpose’ / coin_type’ / account’ / change / address_index`。 BIP44衍生路径的`change`部分，用于确定赞助者钱包路径将用于哪个协议。 （`m/44'/60'/0'/1/...`）被保留给RRP协议，其中 `change`的值为1

以太坊地址有20个字节长，达到160 bit。 在HD钱包非硬化衍生路径中，每个索引都达到了2^31。 这需要将这160 bit分为6个31 bit的块，因此，使用RRP协议的请求者的赞助者钱包的推导路径是：

```sh
m/44'/60'/0'/1/...
  /1st least significant 31-bits of the sponsor address (sponsor && 0x7FFFFFFF)…
  /2nd least significant 31-bits of the sponsor address (sponsor >> 31 && 0x7FFFFFFF)…
  /3rd least significant 31-bits of the sponsor address (sponsor >> 62 && 0x7FFFFFFF)…
  /4th least significant 31-bits of the sponsor address (sponsor >> 93 && 0x7FFFFFFF)…
  /5th least significant 31-bits of the sponsor address (sponsor >> 124 && 0x7FFFFFFF)…
  /6th least significant 31-bits of the sponsor address (sponsor >> 155 && 0x7FFFFFFF)
```

任何人都可以使用Airnode已经公布的xpub（通过链外渠道）和赞助者的`sponsorAddress`，衍生出特定Airnode-sponsor配对的s`sponsorWalletAddress`。 换句话说，赞助者可以为一个Airnode计算出他们各自的赞助者钱包的地址，并让请求者立即使用它来提出请求。

### gas费用

虽然`sponsorWallet`方案允许赞助者支付gas费用，但让Airnode支付gas费用也同样简单。 在这种情况下，Airnode为`sponsorWallet`提供资金，而不是赞助者。 此外，该方案允许混合使用的情况，即Airnode为一个赞助者支付gas费用（例如，因为他们已经达成了一个特殊的服务协议），同时要求其他人支付自己的gas费用。

### 信任 `sponsorWallet`

<airnode-SponsorWalletWarning/>

上述风险在下列情况下是微不足道的：

1. Airnode作为第一方预言机，是值得信赖的。
2. Airnode被用于高价值的使用案例，这已经意味着高度的信任。

如果赞助者完全不信任Airnode，他们可以向赞助者钱包提供资金，以满足Airnode的每个请求费用。 因此，这个方案既支持传统的按次支付，又允许协议利用Airnode的可信度来减少微交易造成的不必要的gas费用。

### 取款

如果赞助者决定不再使用某个特定的`sponsorWallet`，他们可以提出从该钱包中提取资金的请求，见[request-withdrawal](../reference/packages/admin-cli.md#request-withdrawal)命令。 Airnode 监听提款请求，并自动完成。 因此，在几分钟内会收到通知，赞助者应该能够从他们的`sponsorWallet`收到资金。 `sponsorWallet`不会被删除，将来只需再次注资即可使用。

::: warning 提现的优先级

一旦申请提款，Airnode将放弃与`sponsorWallet`相关的任何未决的API调用。

:::

## 赞助请求者

赞助者从其拥有的助记符中指定账户的公共地址(`sponsorAddress`) 和请求者的链上请求者地址（`requesterAddress`），以 "赞助一个请求者"。 据了解，该赞助关系需要一个`sponsorAddress/requesterAddress` 地址对，并由其定义。

此赞助允许请求者使用赞助者的 `sponsorWallet`， 来支付特定的 Airnode 响应请求而带来的gas费用。 了解更多关于[赞助关系](../../v0.2/grp-developers/requesters-sponsors.md)的信息。

使用 [Admin CLI tool](../reference/packages/admin-cli.md#sponsor-requester)，赞助一个请求者。 可以在 [请求者和赞助者](../grp-developers/requesters-sponsors.md#how-to-sponsor-a-requester)文档中查看响应的例子。

## 如何衍生赞助者钱包

当一个赞助者希望访问一个Airnode（通过请求者），它必须为Airnode创建一个`sponsorWallet` 。 被同一赞助者赞助的请求者，可以指定他们的请求由属于该赞助者的`sponsorWallet`来完成。 赞助者使用[sponsorAddress](sponsor.md#sponsoraddress)和特定Airnode的 [xpub](airnode.md#xpub)，为Airnode衍生出一个 [sponsorWallet](#sponsorwallet)。 赞助者还必须提供 [airnodeAddress](airnode.md#airnodeaddress)，因为它将被用来验证所提供的`xpub` 是否属于Airnode钱包，然后再衍生出子赞助者钱包地址。

使用 [管理员CLI 工具](../reference/packages/admin-cli.md#derive-sponsor-wallet-address)，衍生 `sponsorWallet`。 可以在 [请求者和赞助者](../grp-developers/requesters-sponsors.md#how-to-derive-a-sponsor-wallet)文档中，查看响应的例子。
