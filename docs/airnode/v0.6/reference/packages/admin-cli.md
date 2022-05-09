---
title: Admin CLI
---

<TitleSpan>软件包</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

使用[airnode-admin](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-admin)Admin CLI工具与Airnode进行跨区块链互动。 这里有针对开发者（dApp）和API供应商的命令。 开发人员可以赞助[请求者](../../concepts/requester.md)合约，并为Airnode派生出[sponsorWallets](../../concepts/sponsor.md#sponsorwallet)。 API供应商可以建立[Airnode](../../concepts/airnode.md)，将他们的API数据提供给请求者合约。

::: warning 交易gas费用

一些命令将会产生交易费用。 这些是每次调用的交易gas费用，相对较低。 查看 [<span style="color:green;">开发者费用</span>](../../grp-developers/fees.md)文档。

:::

几乎所有命令都要求你提供一个区块链 `providerUrl`。 以下只是许多可能性中的两个例子。 更多信息请参阅 [链供应商](../../concepts/chain-providers.md) 文档 。

- <code style="overflow-wrap: break-word;">https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID></code>
- `https://ropsten.infura.io/v3/<KEY>`

CLI连接到[AirnodeRrp.sol](https://github.com/api3dao/airnode/blob/v0.5/packages/airnode-protocol/contracts/rrp/AirnodeRrp.sol) 和[RequesterAuthorizerWithAirnode.sol](https://github.com/api3dao/airnode/blob/v0.5/packages/airnode-protocol/contracts/authorizers/RequesterAuthorizerWithAirnode.sol)合约，这些地址由当前链衍生而来。 你可以通过提供可选的`airnode-rrp-address`或 `requester-authorizer-with-airnode` 命令参数，在目标链上提供已部署合约的地址，来选择自己指定合约地址。

需要`mnemonic`的命令将进行链上交易。 应用程序将通过默认的以太坊派生路径`m/44'/60'/0'/0/0`，从助记符中衍生出账户。 你可以通过使用可选的参数`derivation-path` （`m/44'/60'/0'/0/...`），覆盖这个问题。 确保与助记符相关的钱包在目标链上有资金。 在交易被确认之前，应用程序不会退出。

### 使用交易覆盖

CLI命令还支持以下交易覆盖作为可选参数： `gas-limit`, `gas-price` （传统交易）、`max-fee` 和 `max-priority-fee`（EIP-1559交易）和`nonce`。

### 默认交易覆盖

如果没有覆盖，交易将默认以下值：

**EIP-1559 交易**

```sh
maxPriorityFeePerGas: 3.12 gwei
maxFeePerGas: baseFeePerGas of the last block * 2 + maxPriorityFeePerGas
```

**传统交易**

```sh
gasPrice: gasPrice returned by the ethers getGasPrice method
```

## 使用 npx

查看所有命令：

```sh
npx @api3/airnode-admin --help
```

查看命令的参数：

```sh
npx @api3/airnode-admin $COMMAND --help
```

## 使用 Docker

使用 Admin CLI docker镜像替代 `npx`:

```sh
docker run api3/airnode-admin:0.6.0 --help
```

查看命令的参数：

```sh
docker run api3/airnode-admin:0.6.0 $COMMAND --help
```

## SDK

你也可以以编程方式使用该包。 SDK为所有的CLI命令导出了相应的函数，以及用于获取目标链上的合约实例的辅助函数。

```js
import { sponsorRequester, getAirnodeRrpWithSigner } from '@api3/admin';

// First obtain the contract instance on target chain
const airnodeRrp = await getAirnodeRrpWithSigner(
  mnemonic,
  derivation - path,
  providerUrl,
  airnodeRrpAddress
);
// Pass the contract instance as the first argument to the SDK function
const requester = await sponsorRequester(airnodeRrp, requester);
```

如果打算使用多个命令，那么将合约实例传递给每个函数调用，可能会很繁琐。 由于这个原因，也有基于类的`AdminSdk` ，你只需用`AdminSdk` 合约初始化一次就行。

```js
import { AdminSdk } from '@api3/admin';

// First initialize the SDK with AirnodeRrp contract instance.
// You can use static AdminSdk functions or provide your own instance.
const airnodeRrp = await AdminSdk.getAirnodeRrpWithSigner(
  mnemonic,
  derivation - path,
  providerUrl,
  airnodeRrpAddress
);
// Create sdk instance
const adminSdk = new AdminSdk(airnodeRrp);
// Call the method you need
const requester = await adminSdk.sponsorRequester(requester);

// You can switch the contract instance anytime. E.g. if you are using ethers
adminSdk.airnodeRrp = airnodeRrp.connect(someOtherWallet);
```

SDK还将提供开箱即用的TS类型。 更多细节请参考实施方案。

### 使用交易覆盖

您也可以使用交易覆盖来自定义gas限制和费用设置。 SDK只是将覆盖参数传递给合约方法，因此你可以使用ethers库支持的任何参数覆盖。

```js
import { ethers } from 'ethers';

// Legacy transaction overrides
const overrides = {
  gasLimit: ethers.BigNumber.from('200000'),
  gasPrice: ethers.utils.parseUnits('20', 'gwei')
};

// EIP-1559 transaction overrides
const overrides = {
  gasLimit: ethers.BigNumber.from('200000'),
  maxFeePerGas: ethers.utils.parseUnits('20', 'gwei')
  maxPriorityFeePerGas: ethers.utils.parseUnits('10', 'gwei')
};

// The transaction overrides parameter is optional and can be passed in as the last parameter
const requester = await adminSdk.sponsorRequester(requester, overrides);
```

## 赞助者

以下是与[赞助者的](../../concepts/sponsor.md) 的相关命令，包括 [请求者](../../concepts/requester.md) 和[sponsorWallets](../../concepts/sponsor.md#sponsorwallet) 之间关系，以及赞助请求者使用的[模板](../../concepts/template.md)。 其中一些命令连接到[AirnodeRrp.sol](https://github.com/api3dao/airnode/blob/v0.5/packages/airnode-protocol/contracts/rrp/AirnodeRrp.sol)协议合约，签署者是赞助者账户。

- [sponsor-requester](admin-cli.md#sponsor-requester)
- [unsponsor-requester](admin-cli.md#unsponsor-requester)
- [get-sponsor-status](admin-cli.md#get-sponsor-status)
- [derive-sponsor-wallet-address](admin-cli.md#derive-sponsor-wallet-address)
- [create-template](admin-cli.md#create-template)
- [get-template](admin-cli.md#get-template)
- [request-withdrawal](admin-cli.md#request-withdrawal)
- [check-withdrawal-request](admin-cli.md#check-withdrawal-request)
- [verify-airnode-xpub](admin-cli.md#verify-airnode-xpub)

### `sponsor-requester`

[赞助](../../concepts/sponsor.md)一个[请求者](../../concepts/requester.md)合约，以便其请求可以由Airnode的[sponsorWallet](../../concepts/sponsor.md#sponsorwallet)完成。 您提供的账户必须来自赞助者 `mnemonic`。

赞助一个请求者并使用返回的 `sponsorAddress`为 Airnode 衍生出一个 `sponsorWallet`，在请求者和 Airnode 之间建立一种[关系](../../concepts/sponsor.md)，详见[`derive-sponsor-wallet-address`](admin-cli.md#derive-sponsor-wallet-address) 命令。

- `provider-url`: 有效的区块链供应商URL。
- `sponsor-mnemonic`: 一个由赞助者拥有的钱包。 用于派生出一个`sponsorAddress`作为助记符的默认账户，除非指定`derivation-path`。 它也用于从助记符的默认账户中支付gas费用，除非指定`derivation-path`。
- `requester-address`: 要赞助的请求者的合约地址。
- `airnode-rrp-address (optional)`：AirnodeRrp.sol协议合约的公共地址。
- `derivation-path (optional)`：从助记符中选择一个备用账户来使用，而不是默认账户。
- `gas-limit` (可选): 交易中要使用的gas限额。
- `gas-price` (optional): 交易中使用的gas价格（单位：gwei）（仅适用于传统交易）。
- `max-fee` (可选): 交易中使用的gas的最高费用（单位：gwei）（仅适用于EIP-1559交易）。
- `max-priority-fee` (可选): 用于交易的gas的最高优先级费用（单位：gwei）（仅适用于EIP-1559交易）。
- `nonce` (可选): 交易要使用的nonce。

:::: tabs

::: tab Linux/Mac/WSL2

```sh
npx @api3/airnode-admin sponsor-requester \
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --sponsor-mnemonic "nature about salad..." \
  --requester-address 0x2c2e12...
```

:::

::: tab Windows

```sh
npx @api3/airnode-admin sponsor-requester ^
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> ^
  --sponsor-mnemonic "nature about salad..." ^
  --requester-address 0x2c2e12...
```

:::

::::

### `unsponsor-requester`

移除 [请求者](../../concepts/requester. md) 合约的赞助者， 这样它的请求就不能再由 [sponsorWallet](../../concepts/sponsor. md#sponsorwallet)来完成。 在这里提供的`mnemonic` 所衍生的账户必须属于赞助商。

- `provider-url`: 有效的区块链供应商URL。
- `sponsor-mnemonic`: 由赞助者拥有的钱包。 必须是用于赞助请求者的助记符。 用来从助记符的默认账户支付gas费用，除非指定了 `derivation-path`。
- `requester-address`: 请求者要取消赞助的合同地址。
- `airnode-rrp-address (optional)`：AirnodeRrp.sol协议合约的公共地址。
- `derivation-path (optional)`：从助记符中选择一个备用账户来使用，而不是默认账户。
- `gas-limit` (可选): 交易中要使用的gas限额。
- `gas-price` (可选): 交易中使用的gas价格（单位：gwei）（仅适用于传统交易）。
- `max-fee` (可选): 交易中使用的gas的最高费用（单位：gwei）（仅适用于EIP-1559交易）。
- `max-priority-fee` (可选): 用于交易的gas的最高优先级费用（单位：gwei）（仅适用于EIP-1559交易）。
- `nonce` (可选)：用于交易的nonce。

:::: tabs

::: tab Linux/Mac/WSL2

```bash
npx @api3/airnode-admin unsponsor-requester \
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --sponsor-mnemonic "nature about salad..." \
  --requester-address 0x2c2e12...
```

:::

::: tab Windows

```sh
npx @api3/airnode-admin unsponsor-requester ^
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> ^
  --sponsor-mnemonic "nature about salad..." ^
  --requester-address 0x2c2e12...
```

:::

::::

### `get-sponsor-status`

返回给定的 [赞助者](../../concepts/sponsor.md) 和 [请求者](../../concepts/requester.md) 状态(如果赞助，返回`true` ，反之，返回 `false`）。

- `provider-url`: 有效的区块链供应商URL。
- `sponsor-address`: 在请求者获得赞助时`sponsorAddress`返回值。
- `requester-address`: 请求者合约地址。
- `airnode-rrp-address (optional)`：AirnodeRrp.sol协议合约的公共地址。

:::: tabs

::: tab Linux/Mac/WSL2

```sh
npx @api3/airnode-admin get-sponsor-status \
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --sponsor-address 0x9Ec6C4... \
  --requester-address 0x2c2e12...
```

:::

::: tab Windows

```sh
npx @api3/airnode-admin get-sponsor-status ^
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> ^
  --sponsor-address 0x9Ec6C4... ^
  --requester-address 0x2c2e12...
```

:::

::::

### `derive-sponsor-wallet-address`

生成Airnode为[赞助者](../../concepts/sponsor.md)指定的钱包的地址，这个钱包被称为[sponsorWallet](../../concepts/sponsor.md#sponsorwallet)。 如果`airnode-xpub`不属于路径为`m/44'/60'/0'`的Airnode钱包的HDNode，这个命令会出错。 查看 [`derive-airnode-xpub`](admin-cli.md#derive-airnode-xpub) 命令。

- `airnode-xpub`：路径`m/44'/60'/0'`的Airnode的扩展公共地址。
- `airnode-address`: Airnode的公共地址。
- `sponsor-address`: 赞助者帐户的地址。

:::: tabs

::: tab Linux/Mac/WSL2

```sh
npx @api3/airnode-admin derive-sponsor-wallet-address \
  --airnode-xpub xpub6CUGRUo... \
  --airnode-address 0xe1e0dd... \
  --sponsor-address 0x9Ec6C4...
```

:::

::: tab Windows

```sh
npx @api3/airnode-admin derive-sponsor-wallet-address ^
  --airnode-xpub xpub6CUGRUo... ^
  --airnode-address 0xe1e0dd... ^
  --sponsor-address 0x9Ec6C4...
```

:::

::::

### `create-template`

读取文件，使用其内容创建一个 [template](../../concepts/template.md)并返回一个`template-id`。 参见 [使用模板](../../grp-developers/using-templates.md) 的示例 模板文件。

- `provider-url`: 有效的区块链供应商URL。
- `mnemonic`：用来从助记符的默认账户支付gas费用，除非指定了 `derivation-path`。
- `template-file-path`： 在链上创建模板文件的路径。
- `airnode-rrp-address (optional)`：AirnodeRrp.sol协议合约的公共地址。
- `derivation-path (optional)`：从助记符中选择一个备用账户来使用，而不是默认账户。
- `gas-limit` (可选): 交易中要使用的gas限额。
- `gas-price` (可选): 交易中使用的gas价格（单位：gwei）（仅适用于传统交易）。
- `max-fee` (可选): 交易中使用的gas的最高费用（单位：gwei）（仅适用于EIP-1559交易）。
- `max-priority-fee` (可选): 用于交易的gas的最高优先级费用（单位：gwei）（仅适用于EIP-1559交易）。
- `nonce` (可选)：用于交易的nonce。

:::: tabs

::: tab Linux/Mac/WSL2

```sh
npx @api3/airnode-admin create-template \
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --mnemonic "nature about salad..." \
  --template-file-path ./template.json
```

:::

::: tab Windows

```sh
npx @api3/airnode-admin create-template ^
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> ^
  --mnemonic "nature about salad..." ^
  --template-file-path ./template.json
```

:::

::::

### `get-template`

返回给定的`template-id`的 [模版](../../concepts/template.md)。

- `provider-url`: 有效的区块链供应商URL。
- `template-id`: 要返回的模板的 id。
- `airnode-rrp-address (optional)`：AirnodeRrp.sol协议合约的公共地址。

:::: tabs

::: tab Linux/Mac/WSL2

```sh
npx @api3/airnode-admin get-template \
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --template-id 0x8d3b9...
```

:::

::: tab Windows

```sh
npx @api3/airnode-admin get-template ^
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> ^
  --template-id 0x8d3b9...
```

:::

::::

### `request-withdrawal`

清求从由Airnode管理的[sponsorWallet](../../concepts/sponsor.md#sponsorwallet)进行[提款](../../concepts/sponsor.md#withdrawals) 。

资金将退回到从 `sponsor-mnemonic`衍生的账户。 这个账户必须属于命令中指定的[赞助者钱包地址](../../concepts/sponsor.md#sponsorwallet)的[赞助者](../../concepts/sponsor.md)。

请求发出后，需要由Airnode来完成，所以这个命令的返回值只是一个`withdrawal-request-id` ，你可以用来调用[check-withdrawal-request](admin-cli.md#check-withdrawal-request)来查看请求是否被处理。

::: warning 提现的优先级

一旦申请提款，Airnode将放弃与`sponsorWallet`相关的任何待执行的API调用。

:::

- `provider-url`: 有效的区块链供应商URL。
- `sponsor-mnemonic`: 由赞助者拥有的钱包。 用来从助记符的默认账户支付gas费用，除非指定了 `derivation-path`。 除非指定一个`derivation-path` ，否则提取资金将被添加到此助记符的默认地址。
- `airnode-address`: Airnode的公共地址。
- `sponsor-wallet-address`： 赞助者钱包的公共地址，可以以从中取款。 这个地址是由`derive-sponsor-wallet-address`命令返回的。
- `airnode-rrp-address (optional)`：AirnodeRrp.sol协议合约的公共地址。
- `derivation-path (optional)` : 如果不希望使用默认地址，将会把提取的资金添加到`mnemonic`参数的目标地址。
- `gas-limit` (可选): 交易中要使用的gas限额。
- `gas-price` (optional): 交易中使用的gas价格（单位：gwei）（仅适用于传统交易）。
- `max-fee` (可选): 交易中使用的gas的最高费用（单位：gwei）（仅适用于EIP-1559交易）。
- `max-priority-fee` (可选): 用于交易的gas的最高优先级费用（单位：gwei）（仅适用于EIP-1559交易）。
- `nonce` (可选): 交易要使用的nonce。

:::: tabs

::: tab Linux/Mac/WSL2

```sh
npx @api3/airnode-admin request-withdrawal \
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --sponsor-mnemonic "nature about salad..." \
  --airnode-address 0xe1e0dd... \
  --sponsor-wallet-address 0x9Ec6C4...
```

:::

::: tab Windows

```sh
npx @api3/airnode-admin request-withdrawal ^
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> ^
  --sponsor-mnemonic "nature about salad..." ^
  --airnode-address 0xe1e0dd... ^
  --sponsor-wallet-address 0x9Ec6C4...
```

:::

::::

### `check-withdrawal-request`

通过 [请求提款命令](admin-cli.md#request-withdrawal)，检查 [提款](../../concepts/sponsor.md#withdrawals) 请求的状态与给定的 `withdrawal-request-id` 。

- `provider-url`: 有效的区块链供应商URL。
- `withdrawal-request-id` 这个id 是由 `request-remission`命令返回的。
- `airnode-rrp-address (optional)`：AirnodeRrp.sol协议合约的公共地址。

:::: tabs

::: tab Linux/Mac/WSL2

```sh
npx @api3/airnode-admin check-withdrawal-request \
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --withdrawal-request-id 0x011d1b...
```

:::

::: tab Windows

```sh
npx @api3/airnode-admin check-withdrawal-request ^
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> ^
  --withdrawal-request-id 0x011d1b...
```

:::

::::

### `verify-airnode-xpub`

验证`airnode-xpub`是否属于HDNode，其路径为Airnode钱包的`m/44'/60'/0'`路径。 该命令检查Airnode地址是否可以通过提供的Airnode [xpub](../../concepts/airnode.md#xpub)与默认衍生路径`m/44'/60'/0'/0/0`进行衍生，并与`airnode-address`进行比较。 在调用[derive-sponsor-wallet-address](admin-cli.md#derive-sponsor-wallet-address)命令之前，这个命令很可能被[赞助者](../../concepts/sponsor.md)用来验证xpub是否属于Airnode。

:::: tabs

::: tab Windows

```sh
npx @api3/airnode-admin verify-airnode-xpub \
  --airnode-xpub xpub6CUGRUo... \
  --airnode-address 0xe1e0dd...
```

:::

::: tab Windows

```sh
npx @api3/airnode-admin verify-airnode-xpub ^
  --airnode-xpub xpub6CUGRUo... ^
  --airnode-address 0xe1e0dd...
```

:::

::::

## Airnodes

先前部署的Airnode的助手命令。 其中一些命令连接到AirnodeRrp.sol协议合同，签署者必须是Airnode钱包。

- [derive-airnode-xpub](admin-cli.md#derive-airnode-xpub)
- [derive-endpoint-id](admin-cli.md#derive-endpoint-id)
- [generate-mnemonic](admin-cli.md#generate-mnemonic)
- [derive-airnode-address](admin-cli.md#derive-airnode-address)

### `derive-airnode-xpub`

生成 Airnode 扩展公钥 ([xpub](../../concepts/airnode.md#xpub))。 这个xpub必须通过链外渠道公布，因为需要它来衍生[sponsorWallet](../../concepts/sponsor.md#sponsorwallet) 地址。 参见 [derive-sponsor-wallet-address](admin-cli.md#derive-sponsor-wallet-address)命令.

- `airnode-mnemonic`: 衍生出xpub的Airnode助记符。

:::: tabs

::: tab Windows

```sh
npx @api3/airnode-admin derive-airnode-xpub --airnode-mnemonic "nature about salad..."
```

:::

::: tab Windows

```sh
npx @api3/airnode-admin derive-airnode-xpub --airnode-mnemonic "nature about salad..."
```

:::

::::

### `derive-endpoint-id`

从OIS的标题和端点的名称中得出 [endpointId](../deployment-files/config-json. md#triggers)。 该命令使用配置airnode文档中的[触发器](../../grp-providers/guides/build-an-airnode/configuring-airnode. md#triggers)部分描述的惯例用法。 将`endpointId`添加到config.json文件中（`triggers.rrp[n].endpointId`）。

- `ois-title`: 来自config.json (`ois.title`) 的 OIS 标题。
- `endpoint-name`:来自 config.json (`triggers.rrp[n].endpointName`)的短点名称。

:::: tabs

::: tab Linux/Mac/WSL2

```sh
npx @api3/airnode-admin derive-endpoint-id \
  --ois-title "My OIS title..." \
  --endpoint-name "My endpoint name..."
```

:::

::: tab Windows

```sh
npx @api3/airnode-admin derive-endpoint-id ^
  --ois-title "My OIS title..." ^
  --endpoint-name "My endpoint name..."
```

:::

::::

### `generate-mnemonic`

生成一个独特的助记符，用于创建一个 [airnode钱包](../../grp-providers/guides/build-an-airnode/configuring-airnode. md#airnodewalletmnemonic) 除了助记符外，该命令还将显示相应的[airnode 地址](../../concepts/airnode.md#airnodeaddress)及其扩展公钥（[xpub](../../concepts/airnode.md#xpub)）。

```sh
npx @api3/airnode-admin generate-mnemonic
```

### `derive-airnode-address`

生成 [airnode 地址](../../concepts/airnode.md#airnodeaddress)，该地址是链上特定的 Airnode 标识符。 您需要此标识符，用于其他许多管理员CLI 命令，如 [derive-sponsor-wallet-address](admin-cli.md#derive-sponsor-wallet-address)。

```sh
npx @api3/airnode-admin derive-airnode-address
```

## RequesterAuthorizerWithAirnode

Requester AuthorizerWandAirnode 合约由 API3 编写，为[授权者](../../concepts/authorization.md)合约，任何Airnode都可以使用。 Airnode所有者可以在他们自己编写的授权者合约之外使用这个合约。

这个授权者合同可以将[请求者](../../concepts/requester.md)列入白名单，其中每个Airnode 都是由他们自己管理的。

这些命令连接到[RequesterWidairnode.sol](https://github.com/api3dao/airnode/blob/v0.5/packages/airnode-protocol/contracts/authorizers/RequesterAuthorizerWithAirnode.sol)合约。

- [set-whitelist-expiration](admin-cli.md#set-whitelist-expiration)
- [extend-whitelist-expiration](admin-cli.md#extend-whitelist-expiration)
- [set-indefinite-whitelist-status](admin-cli.md#set-indefinite-whitelist-status)
- [get-whitelist-status](admin-cli.md#get-whitelist-status)
- [is-requester-whitelisted](admin-cli.md#is-requester-whitelisted)

### `set-whitelist-expiration`

由Airnode钱包或白名单过期设置者调用，以设置Airnode-端点配对的请求者的白名单过期。 在新的过期时间戳早于先前设置的时间戳的情况下，可以加速过期。

- `mnemonic`：用来从助记符的默认账户支付gas费用，除非指定了 `derivation-path`。 助记符必须至少是一个管理员或 Airnode 钱包。
- `provider-url`: 有效的区块链供应商URL。
- `endpoint-id`: 授予权限的 [`endpointId`](../deployment-files/config-json.md#triggers)（来自OIS）。
- `requester-address`:: 请求者合约的公共地址。
- `expiration-timestamp`:: Unix格式化的时间戳.
- `airnode-address`: Airnode的公共地址。
- `requester-authorizer-with-airnode (optional)`: 授权者合约地址。
- `derivation-path (optional)`：从助记符中选择一个备用账户来使用，而不是默认账户。
- `gas-limit` (可选): 交易中要使用的gas限额。
- `gas-price` (可选): 交易中使用的gas价格（单位：gwei）（仅适用于传统交易）。
- `max-fee` (可选): 交易中使用的gas的最高费用（单位：gwei）（仅适用于EIP-1559交易）。
- `max-priority-fee` (可选): 用于交易的gas的最高优先级费用（单位：gwei）（仅适用于EIP-1559交易）。
- `nonce` (可选): 交易要使用的nonce。

:::: tabs

::: tab Linux/Mac/WSL2

```sh
npx @api3/airnode-admin set-whitelist-expiration \
  --mnemonic "nature about salad..." \
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --endpoint-id 0xda088e2d94... \
  --requester-address 0x2c2e12... \
  --expiration-timestamp 1947451793 \
  --airnode-address 0xe1e0dd...
```

:::

::: tab Windows

```sh
npx @api3/airnode-admin set-whitelist-expiration ^
  --mnemonic "nature about salad..." ^
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> ^
  --endpoint-id 0xda088e2d94... ^
  --requester-address 0x2c2e12... ^
  --expiration-timestamp 1947451793 ^
  --airnode-address 0xe1e0dd...
```

:::

::::

### `extend-whitelist-expiration`

由Airnode钱包或白名单过期扩展器调用，以延长Airnode-端点配对的请求者的白名单过期时间。 该命令希望新的过期时间戳晚于先前设置的时间戳。

- `mnemonic`: 用于支付该命令交易的链上gas费用。 助记符必须至少是一个管理员或Airnode 钱包。
- `provider-url`: 有效的区块链供应商URL。
- `endpoint-id`: 授予权限的 [`endpointId`](../deployment-files/config-json.md#triggers)（来自OIS）。
- `requester-address`:: 请求者合约的公共地址。
- `expiration-timestamp`:: Unix格式化的时间戳.
- `airnode-address`: Airnode的公共地址。
- `requester-authorizer-with-airnode (optional)`: 授权者合约地址。
- `derivation-path (optional)`：从助记符中选择一个备用账户来使用，而不是默认账户。
- `gas-limit` (可选): 交易中要使用的gas限额。
- `gas-price` (optional): 交易中使用的gas价格（单位：gwei）（仅适用于传统交易）。
- `max-fee` (可选): 交易中使用的gas的最高费用（单位：gwei）（仅适用于EIP-1559交易）。
- `max-priority-fee` (可选): 用于交易的gas的最高优先级费用（单位：gwei）（仅适用于EIP-1559交易）。
- `nonce` (可选): 交易要使用的nonce。

:::: tabs

::: tab Linux/Mac/WSL2

```sh
npx @api3/airnode-admin extend-whitelist-expiration \
  --mnemonic "nature about salad..." \
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --endpoint-id 0xda088e2d94... \
  --requester-address 0x2c2e12... \
  --expiration-timestamp 1947451793 \
  --airnode-address 0xe1e0dd...
```

:::

::: tab Windows

```sh
npx @api3/airnode-admin extend-whitelist-expiration ^
  --mnemonic "nature about salad..." ^
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> ^
  --endpoint-id 0xda088e2d94... ^
  --requester-address 0x2c2e12... ^
  --expiration-timestamp 1947451793 ^
  --airnode-address 0xe1e0dd...
```

:::

::::

### `set-indefinite-whitelist-status`

由Airnode钱包或无限期白名单调用，对Airnode-端点配对的请求者列入无限期白名单。 在需要允许请求超过有效期的情况下，这个命令可以用来使白名单永久化。

- `mnemonic`: 用于支付该命令交易的链上gas费用。 助记符必须至少是一个管理员或Airnode 钱包。 助记符的默认地址将被使用，除非提供衍生工具路径。
- `provider-url`: 有效的区块链供应商URL。
- `endpoint-id`: 被授予权限的[`endpointId`](../deployment-files/config-json.md#triggers)（来自OIS）。
- `requester-address`: 请求者合约的公共地址。
- `expiration-timestamp`: Unix格式化的时间戳.
- `airnode-address`: Airnode的公共地址。
- `requester-authorizer-with-airnode (optional)`: 授权者合约地址。
- `derivation-path (optional)`：从助记符中选择一个备用账户来使用，而不是默认账户。
- `indefinite-whitelist-status`: Airnode-端点配对是否应该被无限期地列入白名单。
- `gas-limit` (可选): 交易中要使用的gas限额。
- `gas-price` (optional): 交易中使用的gas价格（单位：gwei）（仅适用于传统交易）。
- `max-fee` (可选): 交易中使用的gas的最高费用（单位：gwei）（仅适用于EIP-1559交易）。
- `max-priority-fee` (可选): 用于交易的gas的最高优先级费用（单位：gwei）（仅适用于EIP-1559交易）。
- `nonce` (可选): 交易要使用的nonce。

:::: tabs

::: tab Linux/Mac/WSL2

```sh
npx @api3/airnode-admin set-indefinite-whitelist-status \
  --mnemonic "nature about salad..." \
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --endpoint-id 0xda088e2d94... \
  --requester-address 0x2c2e12... \
  --whitelist-status-past-expiration true \
  --airnode-address 0xe1e0dd...
```

:::

::: tab Windows

```sh
npx @api3/airnode-admin set-indefinite-whitelist-status ^
  --mnemonic "nature about salad..." ^
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> ^
  --endpoint-id 0xda088e2d94... ^
  --requester-address 0x2c2e12... ^
  --whitelist-status-past-expiration true ^
  --airnode-address 0xe1e0dd...
```

::::

### `get-whitelist-status`

调用该功能是为了获得Airnode-端点配对的请求者的详细白名单状态

- `provider-url`: 有效的区块链供应商URL。
- `endpoint-id`: 授予权限的 [`endpointId`](../deployment-files/config-json.md#triggers)（来自OIS）。
- `requester-address`：请求者合约的公共地址。
- `airnode-address`: Airnode的公共地址。
- `requester-authorizer-with-airnode (optional)`: 授权者合约地址。

:::: tabs

::: tab Linux/Mac/WSL2

```sh
npx @api3/airnode-admin get-whitelist-status \
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --endpoint-id 0xda088e2d94... \
  --requester-address 0x2c2e12... \
  --airnode-address 0xe1e0dd...
```

:::

::: tab Windows

```sh
npx @api3/airnode-admin get-whitelist-status ^
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> ^
  --endpoint-id 0xda088e2d94... ^
  --requester-address 0x2c2e12... ^
  --airnode-address 0xe1e0dd...
```

:::

::::

### `is-requester-whitelisted`

调用以检查请求者是否被列入白名单以使用Airnode-端点配对。

- `provider-url`: 有效的区块链供应商URL。
- `requester-authorizer-with-airnode (optional)`: 授权者合约地址。
- `endpoint-id`: 授予权限的 [`endpointId`](../deployment-files/config-json.md#triggers)（来自OIS）。
- `requester-address`: 请求者合约的公共地址。
- `airnode-address`: Airnode的公共地址。

:::: tabs

::: tab Windows

```sh
npx @api3/airnode-admin is-requester-whitelisted \
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --requester-authorizer-with-airnode 0xDc64a1... \
  --endpoint-id 0xda088e2d94... \
  --requester-address 0x2c2e12... \
  --airnode-address 0xe1e0dd...
```

:::

::: tab Windows

```sh
npx @api3/airnode-admin is-requester-whitelisted ^
  --provider-url https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> ^
  --requester-authorizer-with-airnode 0xDc64a1... ^
  --endpoint-id 0xda088e2d94... ^
  --requester-address 0x2c2e12... ^
  --airnode-address 0xe1e0dd...
```

:::

::::

## 更多案例

您可以在 _@api3-dao/airnode/package/admin_ [测试文件](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-admin/test) 中找到更多示例。
