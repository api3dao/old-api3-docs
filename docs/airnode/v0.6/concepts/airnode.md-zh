---
title: Airnode
---

<TitleSpan>概念和定义</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

Airnode 是一个无服务器的预言机节点，以 _"设置后就不用管"_ [的设计理念](../grp-providers/airnode/design-philosophy.md)来实现。

<!-- TODO: Link why should you use Airnode -->

Airnode能够为[请求者](./requester.md) 提供一个或多个API，这些请求者是链上的智能合约，他们请求特定Airnode的数据服务器。 每个Airnode都有一个[独特的助记符](../grp-providers/guides/build-an-airnode/configuring-airnode.md#airnodewalletmnemonic)来识别它的钱包。 这个助记符是保密的，Airnode使用助记符衍生的默认[地址](airnode.md#airnodeaddress) ，以便被公开识别。

## `airnodeAddress`

Airnode 通过一个 BIP 44 钱包的默认地址来识别(使用路径 `m/44'/60'/0'/0/0`)。 这个地址对Airnode运作的所有区块链都是一样的。 你在部署Airnode时使用的[`secrets.env`](../grp-providers/guides/build-an-airnode/configuring-airnode.md#creating-secrets-env)文件中，指定了钱包的助记符。

您也可以使用ethers.js从助记符中衍生出`airnodeAddress`，供参考使用。

<!-- TODO: This should probably be supported in the admin CLI package -->

```js
// Get the default address of the airnode-wallet using its mnemonic.
airnodeHdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
airnodeAddress = airnodeHdNode.address;
```

## `xpub`

Airnode所有者在链外公布他们的扩展公钥（硬衍生路径 `m/44'/60'/0'`的`xpub` ），以便赞助者能够衍生出他们的[赞助者钱包](sponsor.md#sponsorwallet)。 然后这个钱包将被Airnode用来满足请求者合约提出的每个请求。 Airnode所有者公布的`xpub` 是不在链上验证的。

然而，赞助者可以在链下验证它。 您可以使用来自管理员CLI的 [`Verify-xpub`](../reference/packages/admin-cli.md#verify-airnode-xpub) 命令来实现。
