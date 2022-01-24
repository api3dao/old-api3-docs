---
title: Admin CLI
---

<TitleSpan>Reference</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Use the
[airnode-admin](https://github.com/api3dao/airnode/tree/v0.3/packages/airnode-admin)
Admin CLI tool to interact with Airnode across blockchains. There are commands
for both developers (dApp) and API providers. Developers can sponsor
[requester](../../concepts/requester.md) contracts and derive
[sponsorWallets](../../concepts/sponsor.md#sponsorwallet) for Airnodes. API
providers can build [Airnodes](../../concepts/airnode.md) that serve their API
data to requester contracts.

::: warning Transaction Gas Costs

Some commands will incur transaction fees. These are per call transaction gas
costs and are relatively small. See the
[<span style="color:green;">Developer Fees</span>](../../grp-developers/fees.md)
doc.

:::

Almost all commands require you to provide a blockchain `providerUrl`. Following
are just two examples of many possibilities. See the
[Chain Providers](../../concepts/chain-providers.md) doc for more information.

- `https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID>`
- `https://ropsten.infura.io/v3/<KEY>`

The CLI connects to the
[AirnodeRrp.sol](https://github.com/api3dao/airnode/blob/v0.3/packages/airnode-protocol/contracts/rrp/AirnodeRrp.sol)
or the
[RequesterAuthorizerWithAirnode.sol](https://github.com/api3dao/airnode/blob/v0.3/packages/airnode-protocol/contracts/authorizers/RequesterAuthorizerWithAirnode.sol)
contract, which addresses are derived from the current chain. You can optionally
specify the contract addresses yourself by providing optional
`airnode-rrp-address` or `requester-authorizer-with-airnode` command argument
with the address of the deployed contract on your targeted chain.

Commands that require `mnemonic` will make an on-chain transaction. The
application will derive the account from the mnemonic with default ethereum
derivation path `m/44'/60'/0'/0/0`. You can override this by using the optional
parameter `derivation-path` (`m/44'/60'/0'/0/...`). Make sure that the wallet
that is associated with the mnemonic is funded on the target chain. The
application will not exit until the transaction is confirmed.

## Using npx

View all commands:

```sh
npx @api3/airnode-admin --help
```

View the parameters of a command:

```sh
npx @api3/airnode-admin $COMMAND --help
```

<divider/>

## Using Docker

Use the Admin CLI docker image as an alternative to `npx`:

```sh
docker run api3/airnode-admin:0.4.0 --help
```

View the parameters of a command:

```sh
docker run api3/airnode-admin:0.4.0 $COMMAND --help
```

<divider/>

## SDK

You can also use the package programmatically. The SDK exports respective
functions for all CLI commands as well as helper functions for obtaining the
contract instance on the targeted chain.

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

If you plan to use multiple commands it might be tedious to pass the contract
instance to every function call. For this reason there is also class based
`AdminSdk` which you initialize with `AirnodeRrp` contract only once.

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

The SDK will also provide TS typings out of the box. Please, refer to the
implementation for more details.

<divider/>

## Sponsors

Commands related to a [sponsor's](../../concepts/sponsor.md) relationships
between [requesters](../../concepts/requester.md) and
[sponsorWallets](../../concepts/sponsor.md#sponsorwallet) as well as
[templates](../../concepts/template.md) used by a sponsor's requesters. Some of
these commands connect to the
[AirnodeRrp.sol](https://github.com/api3dao/airnode/blob/v0.3/packages/airnode-protocol/contracts/rrp/AirnodeRrp.sol)
protocol contract where the signer is sponsor account.

- [sponsor-requester](admin-cli.md#sponsor-requester)
- [unsponsor-requester](admin-cli.md#unsponsor-requester)
- [get-sponsor-status](admin-cli.md#get-sponsor-status)
- [derive-sponsor-wallet-address](admin-cli.md#derive-sponsor-wallet-address)
- [create-template](admin-cli.md#create-template)
- [get-template](admin-cli.md#get-template)
- [request-withdrawal](admin-cli.md#request-withdrawal)
- [check-withdrawal-request](admin-cli.md#check-withdrawal-request)
- [verify-airnode-xpub](admin-cli.md#verify-airnode-xpub)

<divider/>

### `sponsor-requester`

[Sponsors](../../concepts/sponsor.md) a [requester](../../concepts/requester.md)
contract so that its requests can be fulfilled by the
[sponsorWallet](../../concepts/sponsor.md#sponsorwallet) of an Airnode. The
account derived from the `mnemonic` you provide must belong to the sponsor.

Sponsoring a requester and using the returned `sponsorAddress` to derive a
`sponsorWallet` for an Airnode creates a
[relationship](../../concepts/sponsor.md) between the requester and the Airnode,
see the
[`derive-sponsor-wallet-address`](admin-cli.md#derive-sponsor-wallet-address)
command.

- `provider-url`: A valid blockchain provider URL.
- `sponsor-mnemonic`: A wallet owned by the sponsor. Used to derive a
  `sponsorAddress` as the default account of the mnemonic unless a
  `derivation-path` is specified. It's also used to pay gas costs from the
  mnemonic's default account unless a `derivation-path` is specified.
- `requester-address`: The contract address of the requester to sponsor.
- `airnode-rrp-address (optional)`: The public address of the AirnodeRrp.sol
  protocol contract.
- `derivation-path (optional)`: Selects an alternate account to use from the
  mnemonic rather than the default.

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

<divider/>

### `unsponsor-requester`

Removes the sponsorship of a [requester](../../concepts/requester.md) contract
so that its requests can no longer be fulfilled by the
[sponsorWallet](../../concepts/sponsor.md#sponsorwallet). The account derived
from the `mnemonic` you provide here has to belong to the sponsor.

- `provider-url`: A valid blockchain provider URL.
- `sponsor-mnemonic`: A wallet owned by the sponsor. Must be the mnemonic used
  to sponsor the requester. Used to pay gas costs from the mnemonic's default
  account unless a `derivation-path` is specified.
- `requester-address`: The contract address of the requester to unsponsor.
- `airnode-rrp-address (optional)`: The public address of the AirnodeRrp.sol
  protocol contract.
- `derivation-path (optional)`: Selects an alternate account to use from the
  mnemonic rather than the default.

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

<divider/>

### `get-sponsor-status`

Returns the sponsor status for a given [sponsor](../../concepts/sponsor.md) and
[requester](../../concepts/requester.md) (`true` if sponsored, `false`
otherwise).

- `provider-url`: A valid blockchain provider URL.
- `sponsor-address`: The `sponsorAddress` returned when the requester was
  sponsored.
- `requester-address`: The requester contract address.
- `airnode-rrp-address (optional)`: The public address of the AirnodeRrp.sol
  protocol contract.

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

<divider/>

### `derive-sponsor-wallet-address`

Derives the address of the wallet designated by an Airnode for a
[sponsor](../../concepts/sponsor.md), which is called the
[sponsorWallet](../../concepts/sponsor.md#sponsorwallet). This command will
error if `airnode-xpub` does not belong to the HDNode with the path
`m/44'/60'/0'` of the Airnode wallet. See the
[`derive-airnode-xpub`](admin-cli.md#derive-airnode-xpub) command.

- `airnode-xpub`: The extended public address of the Airnode for path
  `m/44'/60'/0'`.
- `airnode-address`: The public address of the Airnode.
- `sponsor-address`: The address of the sponsor account.

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

<divider/>

### `create-template`

Reads a file, uses its contents to create a
[template](../../concepts/template.md) and returns a `template-id`. Also see
[Using Templates](../../grp-developers/using-templates.md) for an example
template file.

- `provider-url`: A valid blockchain provider URL.
- `mnemonic`: Used to pay gas costs from the mnemonic's default account unless a
  `derivation-path` is specified.
- `template-file-path`: Path to the template file to create on-chain.
- `airnode-rrp-address (optional)`: The public address of the AirnodeRrp.sol
  protocol contract.
- `derivation-path (optional)`: Selects an alternate account to use from the
  mnemonic rather than the default.

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

<divider/>

### `get-template`

Returns the [template](../../concepts/template.md) for the given `template-id`.

- `provider-url`: A valid blockchain provider URL.
- `template-id`: The id of a template to return.
- `airnode-rrp-address (optional)`: The public address of the AirnodeRrp.sol
  protocol contract.

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

<divider/>

### `request-withdrawal`

Requests a [withdrawal](../../concepts/sponsor.md#withdrawals) from a
[sponsorWallet](../../concepts/sponsor.md#sponsorwallet) managed by an Airnode.

The funds will be returned to the account derived from the `sponsor-mnemonic`.
This account must belong to a [sponsor](../../concepts/sponsor.html) for the
specified [sponsor wallet address](../../concepts/sponsor.html#sponsorwallet) in
the command.

After the request is made, it needs to be fulfilled by Airnode, so the return
value of this command is only a `withdrawal-request-id` which you can use to
call [check-withdrawal-request](admin-cli.md#check-withdrawal-request) to see
whether the request was processed or not.

- `provider-url`: A valid blockchain provider URL.
- `sponsor-mnemonic`: A wallet owned by the sponsor. Used to pay gas costs from
  the mnemonic's default account unless a `derivation-path` is specified.
  Withdrawn funds will be added to this mnemonic's default address unless a
  `derivation-path` is specified.
- `airnode-address`: The public address of the Airnode.
- `sponsor-wallet-address`: The pubic address of the sponsorWallet to withdraw
  from. This address was returned by the `derive-sponsor-wallet-address`
  command.
- `airnode-rrp-address (optional)`: The public address of the AirnodeRrp.sol
  protocol contract.
- `derivation-path (optional)` : The destination address of the `mnemonic`
  parameter to add the withdrawn funds to if the default address is not desired.

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

<divider/>

### `check-withdrawal-request`

Checks the status of the [withdrawal](../../concepts/sponsor.md#withdrawals)
request with the given `withdrawal-request-id` from the
[request withdrawal command](admin-cli.md#request-withdrawal) above.

- `provider-url`: A valid blockchain provider URL.
- `withdrawal-request-id`: This id was returned by the `request-withdrawal`
  command.
- `airnode-rrp-address (optional)`: The public address of the AirnodeRrp.sol
  protocol contract.

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

<divider/>

### `verify-airnode-xpub`

Verifies that the `airnode-xpub` belongs to the HDNode with the path
`m/44'/60'/0'` of the Airnode wallet. This command checks that the Airnode
address can be derived with provided Airnode
[xpub](../../concepts/airnode.md#xpub) with default derivation path
`m/44'/60'/0'/0/0` and compares it with the `airnode-address`. This command will
most likely be used by a [sponsor](../../concepts/sponsor.md) to verify that the
xpub belongs to the Airnode before calling the
[derive-sponsor-wallet-address](admin-cli.md#derive-sponsor-wallet-address)
command.

:::: tabs

::: tab Linux/Mac/WSL2

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

<divider/>

## Airnodes

Helper commands for a previously deployed Airnode. Some of these commands
connect to the AirnodeRrp.sol protocol contract where the signer must be the
Airnode wallet.

- [derive-airnode-xpub](admin-cli.md#derive-airnode-xpub)
- [derive-endpoint-id](admin-cli.md#derive-endpoint-id)
- [generate-mnemonic](admin-cli.md#generate-mnemonic)
- [derive-airnode-address](admin-cli.md#derive-airnode-address)

<divider/>

### `derive-airnode-xpub`

Derives the Airnode extended public key
([xpub](../../concepts/airnode.md#xpub)). This xpub must be announced via
off-chain channels because it will be needed to derive a
[sponsorWallet](../../concepts/sponsor.md#sponsorwallet) address. See the
[derive-sponsor-wallet-address](admin-cli.md#derive-sponsor-wallet-address)
command.

- `airnode-mnemonic`: The Airnode mnemonic for which the xpub is to be derived.

:::: tabs

::: tab Linux/Mac/WSL2

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

<divider/>

### `derive-endpoint-id`

Derives an [endpointId](../deployment-files/config-json.md#triggers) from the
OIS title and the endpoint's name. This command uses the convention described in
the
[triggers](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#triggers)
section of the configuring airnode documentation. Add the `endpointId` to the
config.json file (`triggers.rrp[n].endpointId`).

- `ois-title`: The title of the OIS from config.json (`ois.title`).
- `endpoint-name`: The name of the endpoint from config.json
  (`triggers.rrp[n].endpointName`).

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

<divider/>

### `generate-mnemonic`

Generates a unique mnemonic which can be used to create the
[airnode wallet](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#airnodewalletmnemonic).

```sh
npx @api3/airnode-admin generate-mnemonic
```

<divider/>

### `derive-airnode-address`

Derives the [airnode address](../../concepts/airnode.html#airnodeaddress) which
is the identifier of the particular Airnode on chain. You need this identifier
for many other admin CLI commands, such as
[derive-sponsor-wallet-address](admin-cli.md#derive-sponsor-wallet-address).

```sh
npx @api3/airnode-admin derive-airnode-address
```

<divider/>

## RequesterAuthorizerWithAirnode

RequesterAuthorizerWithAirnode contract was written by API3 as an
[authorizer](../../concepts/authorization.md) contract that can be used by any
Airnode. Airnode owners can use this contract in addition to authorizer
contracts they have written themselves.

This authorizer contract can whitelist [requesters](../../concepts/requester.md)
where each Airnode is adminned by themselves.

These commands connect to the
[RequesterAuthorizerWithAirnode.sol](https://github.com/api3dao/airnode/blob/v0.3/packages/airnode-protocol/contracts/authorizers/RequesterAuthorizerWithAirnode.sol)
contract.

- [set-whitelist-expiration](admin-cli.md#set-whitelist-expiration)
- [extend-whitelist-expiration](admin-cli.md#extend-whitelist-expiration)
- [set-indefinite-whitelist-status](admin-cli.md#set-indefinite-whitelist-status)
- [get-whitelist-status](admin-cli.md#get-whitelist-status)
- [is-requester-whitelisted](admin-cli.md#is-requester-whitelisted)

<divider/>

### `set-whitelist-expiration`

Called by the Airnode wallet or a whitelist expiration setter to set the
whitelisting expiration of a requester for the Airnode–endpoint pair. This can
hasten expiration in the case the new expiration timestamp is prior to a
previously set timestamp.

- `mnemonic`: Used to pay gas costs from the mnemonic's default account unless a
  `derivation-path` is specified. The mnemonic must be at least an Admin or
  Airnode wallet.
- `provider-url`: A valid blockchain provider URL.
- `endpoint-id`: The [`endpointId`](../deployment-files/config-json.md#triggers)
  for which permission is granted (from OIS).
- `requester-address`: The public address of the requester contract.
- `expiration-timestamp`: A unix formatted timestamp.
- `airnode-address`: The public address of the Airnode.
- `requester-authorizer-with-airnode (optional)`: The authorizer contract
  address.
- `derivation-path (optional)`: Selects an alternate account to use from the
  mnemonic rather than the default.

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

<divider/>

### `extend-whitelist-expiration`

Called by the Airnode wallet or a whitelist expiration extender to extend the
whitelist expiration of a requester for the Airnode–endpoint pair. This command
expects that the new expiration timestamp is later then the previously set
timestamp.

- `mnemonic`: Used to pay on-chain gas cost for this command's transaction. The
  mnemonic must be at least an Admin or Airnode wallet.
- `provider-url`: A valid blockchain provider URL.
- `endpoint-id`: The [`endpointId`](../deployment-files/config-json.md#triggers)
  for which permission is granted (from OIS).
- `requester-address`: The public address of the requester contract.
- `expiration-timestamp`: A unix formatted timestamp.
- `airnode-address`: The public address of the Airnode.
- `requester-authorizer-with-airnode (optional)`: The authorizer contract
  address.
- `derivation-path (optional)`: Selects an alternate account to use from the
  mnemonic rather than the default.

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

<divider/>

### `set-indefinite-whitelist-status`

Called by the Airnode wallet or an indefinite whitelister to whitelist a
requester indefinitely for the Airnode–endpoint pair. This command can be used
to make whitelisting permanent in cases where it is needed to allow requests
even beyond the expiration period.

- `mnemonic`: Used to pay on-chain gas cost for this command's transaction. The
  mnemonic must be at least an Admin or Airnode wallet. The default address of
  the mnemonic will be used unless a derivation-path is provided.
- `provider-url`: A valid blockchain provider URL.
- `endpoint-id`: The [`endpointId`](../deployment-files/config-json.md#triggers)
  for which permission is granted (from OIS).
- `requester-address`: The public address of the requester contract.
- `expiration-timestamp`: A unix formatted timestamp.
- `airnode-address`: The public address of the Airnode.
- `requester-authorizer-with-airnode (optional)`: The authorizer contract
  address.
- `derivation-path (optional)`: Selects an alternate account to use from the
  mnemonic rather than the default.
- `indefinite-whitelist-status`: Whether the Airnode-endpoint pair should be
  whitelisted indefinitely or not.

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

<divider/>

### `get-whitelist-status`

Called to get the detailed whitelist status of a requester for the
Airnode–endpoint pair.

- `provider-url`: A valid blockchain provider URL.
- `endpoint-id`: The [`endpointId`](../deployment-files/config-json.md#triggers)
  for which permission is granted (from OIS).
- `requester-address`: The public address of the requester contract.
- `airnode-address`: The public address of the Airnode.
- `requester-authorizer-with-airnode (optional)`: The authorizer contract
  address.

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

<divider/>

### `is-requester-whitelisted`

Called to check if a requester is whitelisted to use the Airnode–endpoint pair.

- `provider-url`: A valid blockchain provider URL.
- `requester-authorizer-with-airnode`: The authorizer contract address.
- `endpoint-id`: The [`endpointId`](../deployment-files/config-json.md#triggers)
  for which permission is granted (from OIS).
- `requester-address`: The public address of the requester contract.
- `airnode-address`: The public address of the Airnode.

:::: tabs

::: tab Linux/Mac/WSL2

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

<divider/>

## More Examples

You can find more examples in the _@api3-dao/airnode/package/admin_
[test files](https://github.com/api3dao/airnode/tree/v0.3/packages/airnode-admin/test).
