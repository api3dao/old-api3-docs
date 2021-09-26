---
title: Admin CLI Commands
---
<TitleSpan>Reference</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Use the CLI tool to interact with Airnode across blockchains. There are commands for both developers (dApp) and API providers. Developers can sponsor [requester contracts](concepts/requester.md) and fund Airnodes. API providers can build [Airnodes](concepts/airnode.md) that serve their API data to requester contracts.

Almost all commands require you to provide a blockchain `providerUrl` such as `https://ropsten.infura.io/v3/<KEY>`. The CLI connects to the [AirnodeRrp.sol](https://github.com/api3dao/airnode/blob/master/packages/protocol/contracts/AirnodeRrp.sol) or the [AirnodeRequesterRrpAuthorizer.sol](https://github.com/api3dao/airnode/blob/master/packages/protocol/contracts/rrp/authorizers/AirnodeRequesterRrpAuthorizer.sol) contract, which addresses are derived from the current chain. You can optionally specify the contract addresses yourself by providing optional `airnodeRrp` or `airnodeRequesterRrpAuthorizer` command argument with the address of the deployed contract on your targeted chain.

Commands that require `mnemonic` will make an on-chain transaction.
The application will derive the account from the mnemonic with default ethereum derivation path `m/44'/60'/0'/0/0`, but you can override this by `derivationPath` flag.
Make sure that the wallet that is associated with the mnemonic is funded on the target chain.
The application will not exit until the transaction is confirmed.

**View all commands:**

```sh
npx @api3/airnode-admin --help
```

**View the parameters of a command:**

```sh
npx @api3/airnode-admin $COMMAND --help
```

## SDK

You can also use the package programmatically. The SDK exports respective functions for all CLI commands as
well as helper functions for obtaining the contract instance on the targeted chain.

```js
import { sponsorRequester, getAirnodeRrpWithSigner } from "@api3/admin";

// First obtain the contract instance on target chain
const airnodeRrp = await getAirnodeRrpWithSigner(
  mnemonic,
  derivationPath,
  providerUrl,
  airnodeRrpAddress
);
// Pass the contract instance as the first argument to the SDK function
const requester = await sponsorRequester(airnodeRrp, requester);
```

If you plan to use multiple commands it might be tedious to pass the contract instance to every function call. For this reason there is also class based `AdminSdk` which you initialize with `AirnodeRrp` contract only once.

```js
import { AdminSdk } from "@api3/admin";

// First initialize the SDK with AirnodeRrp contract instance.
// You can use static AdminSdk functions or provide your own instance.
const airnodeRrp = await AdminSdk.getAirnodeRrpWithSigner(
  mnemonic,
  derivationPath,
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

The SDK will also provide TS typings out of the box.
Please, refer to the implementation for more details.

## Sponsor

Commands related to a sponsor's [relationships](../concepts/sponsor.md) between requesters and sponsorWallets.

### `sponsor-requester`

[Sponsors](..concepts/sponsorship.md) a requester contract so that its requests can be fulfilled by the sponsorWallet of an Airnode. The account derived from the `mnemonic` you provide must to belong to the sponsor. 

Sponsoring a requester and using the returned `sponsorAddress` to derive a `sponsorWallet` for an Airnode creates a [relationship](../concepts/sponsor.md) between the requester and the Airnode, see the [`derive-sponsor-wallet`](cli-commands.md#derive-sponsor-wallet) command.

- `providerUrl`: A valid cloud provider URL.
- `mnemonic`: A wallet owned by the sponsor. Used to derive a `sponsorAddress`. Used to pay on-chain gas cost for this command's transaction.
- `requesterAddress`: The contract address of the requester to sponsor.

```sh
npx @api3/airnode-admin sponsor-requester \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --mnemonic "nature about salad..." \
  --requesterAddress 0x2c2e12...
```

### `unsponsor-requester`

Removes the sponsorship of a requester contract so that its requests can no longer be fulfilled by the requester's sponsor wallet. The account derived from the `mnemonic` you provide here has to belong to the sponsor.

- `providerUrl`: A valid cloud provider URL.
- `mnemonic`: A wallet owned by the sponsor. Must be the mnemonic used to sponsor the requester. Used to pay on-chain gas cost for this command's transaction.
- `requesterAddress`: The contract address of the requester to sponsor.

```sh
npx @api3/airnode-admin unsponsor-requester \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --mnemonic "nature about salad..." \
  --requesterAddress 0x2c2e12...
```

### `get-sponsor-status`

Returns the sponsor status for a given sponsor and requester (`true` if sponsored, `false` otherwise).

- `providerUrl`: A valid cloud provider URL.
- `sponsorAddress`: The sponsorAddress returned when the requester was sponsored.
- `requesterAddress`: The contract address of the requester to sponsor.

```sh
npx @api3/airnode-admin get-sponsor-status \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --sponsorAddress 0x9Ec6C4... \
  --requesterAddress 0x2c2e12...
```

### `derive-sponsor-wallet`

Derives a [sponsorWallet](../concepts/sponsor.md#sponsorwallet) designated by an Airnode for a sponsor and returns the address of the wallet. 

- `providerUrl`: A valid cloud provider URL.
- `xpub`: The extended public address of the Airnode. If the xpub is not provided then this command will try to fetch it from the AirnodeRrp.sol contract. 
- `airnodeAddress`: The public address of the Airnode
- `sponsorAddress`: Use the `sponsorAddress`, returned by the  [`sponsor-requester`](cli-commands.md#sponsor-requester) command, to create a [relationship](../concepts/sponsor.md) between the requester and this `sponsorWallet`. More than one requester can use the same sponsor's `sponsorWallet` of an Airnode.

```sh
npx @api3/airnode-admin derive-sponsor-wallet-address \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --xpub xpub6CUGRUo... \
  --airnodeAddress 0xe1e0dd... \
  --sponsorAddress 0x9Ec6C4...
```

### `create-template`

Reads a file, uses its contents to create a [template](../concepts/template.md) and returns a `template Id`. Also see [Using Templates](../grp-developers/using-templates.md) for an example template file.

- `providerUrl`: A valid cloud provider URL.
- `mnemonic`: A wallet owned by the sponsor. Used to pay on-chain gas cost for this command's transaction.
- `templateFilePath`: Path to the template file to create on-chain. 

```sh
npx @api3/airnode-admin create-template \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --mnemonic "nature about salad..." \
  --templateFilePath ./template.json
```

### `get-template`

Returns the template for the given `templateId`.

- `providerUrl`: A valid cloud provider URL.
- `templateId`: The id of a template to return.

```sh
npx @api3/airnode-admin get-template \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --templateId 0x8d3b9...
```

### `request-withdrawal`
<Fix>Is the mnemonic used to pay gas costs AND to deposit the returned fund into </Fix>
Requests a [withdrawal](./concepts/sponsor-wallet.html#withdrawals) from a `sponsorWallet` managed by an Airnode and returns the `requestId`. The default account derived from the `mnemonic` will be used to return the funds. The `mnemonic` could be the one the sponsor used to create the sponsor-wallet or another `mnemonic` owned by the sponsor. This command returns a `withdrawalRequestId` for tracking purposes.

- `providerUrl`: A valid cloud provider URL.
- `mnemonic`: A wallet owned by the sponsor. Used to pay on-chain gas cost for this command's transaction.
- `airnodeAddress`:
- `sponsorWalletAddress`: The pubic address of the `sponsorWallet` to withdraw from. This address was returned by the `derive-sponsor-wallet` command.
- 
```sh
npx @api3/airnode-admin request-withdrawal \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --mnemonic "nature about salad..." \
  --airnodeAddress 0xe1e0dd... \
  --sponsorWalletAddress 0x9Ec6C4... \
```

### `check-withdrawal-request`

Checks the status of the withdrawal request with the given ID (`withdrawalRequestId`).

- `providerUrl`: A valid cloud provider URL.
- `withdrawalRequestId`: This id was returned by the `request-withdrawal` command.

```sh
npx @api3/airnode-admin check-withdrawal-request \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --withdrawalRequestId 0x011d1b...
```

## Airnode

### `set-airnode-xpub`

Sets the xpub of an Airnode.<FixInline>A link here to more details about xpub.</FixInline>

::: warning Optional
This extended public key does not need to be announced on-chain for the protocol to be used, it is mainly for convenience.
:::

<Fix>Is the command missing a parameter, `airnodeAddress`?</Fix>
<Fix>Is the mnemonic use to pay gas costs, `airnodeAddress`?</Fix>

- `providerUrl`: A valid cloud provider URL.
- `mnemonic`: The account derived from the `mnemonic` you provide here has to belong to the Airnode.  Used to derive a `sponsorAddress`. Used to pay on-chain gas cost for this command's transaction.

```sh
npx @api3/airnode-admin set-airnode-xpub \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --mnemonic "nature about salad..." \
```

### `get-airnode-xpub`

Returns the Airnode xpub for the given `airnode`.

- `providerUrl`: A valid cloud provider URL.
- `airnodeAddress`: The public address of the Airnode.

```sh
npx @api3/airnode-admin get-airnode-xpub \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --airnodeAddress 0xe1e0dd...
```

### `derive-endpoint-id`

Derives an `endpointId` from the OIS title and the endpoint's name. This process uses the convention described the [triggers](../grp-providers/guides/build-an-airnode/configuring-airnode.md#triggers) section of the configuring airnode doc. The value is applies to the config.json file (`triggers.rrp[n].endpointId`).

- `oisTitle`: The title of the OIS from config.json (`ois.title`).
- `endpointName`: The name of the endpoint from config.json (`triggers.rrp[n].endpointName`).

```sh
npx @api3/airnode-admin derive-endpoint-id \
  --oisTitle "My OIS title..." \
  --endpointName "My endpoint name..."
```

## AirnodeRequesterRrpAuthorizer

This is an [authorizer](./../concepts/authorizer.md#AirnodeRequesterRrpAuthorizer) contract that whitelists requesters where each Airnode is adminned by themselves. The Airnode address and the admins are also authorized even if they are not whitelisted explicitly.

### `set-whitelist-expiration`

Called by a super admin to set the whitelisting expiration of a user for the Airnode–endpoint pair. This can hasten expiration in the case the new expiration timestamp is prior to a previously set timestamp

```sh
npx @api3/airnode-admin set-whitelist-expiration \
  --mnemonic "nature about salad..." \
  --derivationPath "m/44'/60'/0'/0/..." \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --airnodeRequesterRrpAuthorizer 0xDc64a1... \
  --endpointId 0xda088e2d94... \
  --userAddress 0x2c2e12... \
  --expirationTimestamp 1947451793 \
  --airnodeAddress 0xe1e0dd... \
```

### `extend-whitelist-expiration`

Called by an admin to extend the whitelist expiration of a user for the Airnode–endpoint pair. This command expects that the new expiration timestamp is later then the previously set timestamp

```sh
npx @api3/airnode-admin extend-whitelist-expiration \
  --mnemonic "nature about salad..." \
  --derivationPath "m/44'/60'/0'/0/..." \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --airnodeRequesterRrpAuthorizer 0xDc64a1... \
  --endpointId 0xda088e2d94... \
  --userAddress 0x2c2e12... \
  --expirationTimestamp 1947451793 \
  --airnodeAddress 0xe1e0dd... \
```

### `set-whitelist-status-past-expiration`

Called by a super admin to set the whitelist status of a user past expiration for the Airnode–endpoint pair. This command can be used to make whitelisting permanent in cases where it is needed to allow requests even after expiration elapses.

```sh
npx @api3/airnode-admin set-whitelist-status-past-expiration \
  --mnemonic "nature about salad..." \
  --derivationPath "m/44'/60'/0'/0/..." \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --airnodeRequesterRrpAuthorizer 0xDc64a1... \
  --endpointId 0xda088e2d94... \
  --userAddress 0x2c2e12... \
  --whitelistStatusPastExpiration true \
  --airnodeAddress 0xe1e0dd... \
```

### `get-whitelist-status`

Called to get the detailed whitelist status of a user for the Airnode–endpoint pair

```sh
npx @api3/airnode-admin get-whitelist-status \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --airnodeRequesterRrpAuthorizer 0xDc64a1... \
  --endpointId 0xda088e2d94... \
  --userAddress 0x2c2e12... \
  --airnodeAddress 0xe1e0dd... \
```

### `user-is-whitelisted`

Called to check if a user is whitelisted to use the Airnode–endpoint pair

```sh
npx @api3/airnode-admin user-is-whitelisted \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --airnodeRequesterRrpAuthorizer 0xDc64a1... \
  --endpointId 0xda088e2d94... \
  --userAddress 0x2c2e12... \
  --airnodeAddress 0xe1e0dd... \
```

## More Examples

You can find more examples in the _@api3-dao/airnode/package/admin_ [test files](https://github.com/api3dao/airnode/tree/master/packages/admin/test).
