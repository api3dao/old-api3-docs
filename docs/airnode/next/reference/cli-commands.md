---
title: Admin CLI Commands
---
<TitleSpan>Reference</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Use the Admin CLI tool to interact with Airnode across blockchains. There are commands for both developers (dApp) and API providers. Developers can sponsor [requester](../concepts/requester.md) contracts and derive [sponsorWallets](../concepts/sponsor.md#sponsorwallet) for Airnodes. API providers can build [Airnodes](../concepts/airnode.md) that serve their API data to requester contracts.

Almost all commands require you to provide a blockchain `providerUrl`. Following are just two examples of many possibilities.

- `https://eth-rinkeby.gateway.pokt.network/v1/lb/&#60;APP_ID>`
- `https://ropsten.infura.io/v3/&#60;KEY>`

The CLI connects to the [AirnodeRrp.sol](https://github.com/api3dao/airnode/blob/master/packages/protocol/contracts/AirnodeRrp.sol) or the [AirnodeRequesterRrpAuthorizer.sol](https://github.com/api3dao/airnode/blob/master/packages/protocol/contracts/rrp/authorizers/AirnodeRequesterRrpAuthorizer.sol) contract, which addresses are derived from the current chain. You can optionally specify the contract addresses yourself by providing optional `airnodeRrp` or `airnodeRequesterRrpAuthorizer` command argument with the address of the deployed contract on your targeted chain.

Commands that require `mnemonic` will make an on-chain transaction. The application will derive the account from the mnemonic with default ethereum derivation path `m/44'/60'/0'/0/0`. You can override this by using the optional parameter `derivationPath` (`m/44'/60'/0'/0/...`). Make sure that the wallet that is associated with the mnemonic is funded on the target chain. The application will not exit until the transaction is confirmed.

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

<divider/>

## Sponsors

Commands related to a sponsor's [relationships](../concepts/sponsor.md) between requesters and sponsorWallets as well as templates used by a sponsor's requesters. These commands connect to the AirnodeRrp.sol protocol contract.

- [sponsor-requester](cli-commands.md#sponsor-requester)
- [unsponsor-requester](cli-commands.md#unsponsor-requester)
- [get-sponsor-status](cli-commands.md#get-sponsor-status)
- [derive-sponsor-wallet](cli-commands.md#derive-sponsor-wallet)
- [create-template](cli-commands.md#create-template)
- [get-template](cli-commands.md#get-template)
- [request-withdrawal](cli-commands.md#request-withdrawal)
- [check-withdrawal-request](cli-commands.md#check-withdrawal-request)

<divider/>

### `sponsor-requester`

[Sponsors](..concepts/sponsorship.md) a requester contract so that its requests can be fulfilled by the sponsorWallet of an Airnode. The account derived from the `mnemonic` you provide must to belong to the sponsor. 

Sponsoring a requester and using the returned `sponsorAddress` to derive a `sponsorWallet` for an Airnode creates a [relationship](../concepts/sponsor.md) between the requester and the Airnode, see the [`derive-sponsor-wallet`](cli-commands.md#derive-sponsor-wallet) command.

- `providerUrl`: A valid cloud provider URL.
- `mnemonic`: A wallet owned by the sponsor. Used to derive a `sponsorAddress` as the default account of the mnemonic unless a `derviationPath` is specified. Used to pay gas costs from the mnemonic's default account unless a `derviationPath` is specified.
- `requesterAddress`: The contract address of the requester to sponsor.
- `airnodeRrp (optional)`: The public address of the AirnodeRrp.sol protocol contract.
- `derivationPath (optional)`: Selects an alternate account to use from the mnemonic rather than the default.

```sh
npx @api3/airnode-admin sponsor-requester \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --mnemonic "nature about salad..." \
  --requesterAddress 0x2c2e12...
```

<divider/>

### `unsponsor-requester`

Removes the sponsorship of a requester contract so that its requests can no longer be fulfilled by the requester's sponsor wallet. The account derived from the `mnemonic` you provide here has to belong to the sponsor.

- `providerUrl`: A valid cloud provider URL.
- `mnemonic`: A wallet owned by the sponsor. Must be the mnemonic used to sponsor the requester. Used to pay gas costs from the mnemonic's default account unless a `derviationPath` is specified.
- `requesterAddress`: The contract address of the requester to sponsor.
- `airnodeRrp (optional)`: The public address of the AirnodeRrp.sol protocol contract.
- `derivationPath (optional)`: Selects an alternate account to use from the mnemonic rather than the default.

```sh
npx @api3/airnode-admin unsponsor-requester \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --mnemonic "nature about salad..." \
  --requesterAddress 0x2c2e12...
```

<divider/>

### `get-sponsor-status`

Returns the sponsor status for a given sponsor and requester (`true` if sponsored, `false` otherwise).

- `providerUrl`: A valid cloud provider URL.
- `sponsorAddress`: The sponsorAddress returned when the requester was sponsored.
- `requesterAddress`: The contract address of the requester to sponsor.
- `airnodeRrp (optional)`: The public address of the AirnodeRrp.sol protocol contract.

```sh
npx @api3/airnode-admin get-sponsor-status \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --sponsorAddress 0x9Ec6C4... \
  --requesterAddress 0x2c2e12...
```

<divider/>

### `derive-sponsor-wallet`

<Fix>Isn't xpub optional here? Statement from the project README: "You need to specify the xpub but if it is not provided then this command will try to fetch it from the AirnodeRrp contract."</Fix>

Derives a [sponsorWallet](../concepts/sponsor.md#sponsorwallet) designated by an Airnode for a sponsor and returns the address of the wallet. 

- `providerUrl`: A valid cloud provider URL.
- `xpub`: The extended public address of the Airnode. If the xpub is not provided then this command will try to fetch it from the AirnodeRrp.sol contract. 
- `airnodeAddress`: The public address of the Airnode.
- `sponsorAddress`: Use the `sponsorAddress`, returned by the  [`sponsor-requester`](cli-commands.md#sponsor-requester) command, to create a [relationship](../concepts/sponsor.md) between the requester and this `sponsorWallet`. More than one requester can use the same sponsor's `sponsorWallet` of an Airnode.
- `airnodeRrp (optional)`: The public address of the AirnodeRrp.sol protocol contract.

```sh
npx @api3/airnode-admin derive-sponsor-wallet-address \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --xpub xpub6CUGRUo... \
  --airnodeAddress 0xe1e0dd... \
  --sponsorAddress 0x9Ec6C4...
```

<divider/>

### `create-template`

Reads a file, uses its contents to create a [template](../concepts/template.md) and returns a `template Id`. Also see [Using Templates](../grp-developers/using-templates.md) for an example template file.

- `providerUrl`: A valid cloud provider URL.
- `mnemonic`: A wallet owned by the sponsor. Used to pay gas costs from the mnemonic's default account unless a `derviationPath` is specified.
- `templateFilePath`: Path to the template file to create on-chain. 
- `airnodeRrp (optional)`: The public address of the AirnodeRrp.sol protocol contract.
- `derivationPath (optional)`: Selects an alternate account to use from the mnemonic rather than the default.

```sh
npx @api3/airnode-admin create-template \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --mnemonic "nature about salad..." \
  --templateFilePath ./template.json
```

<divider/>

### `get-template`

Returns the template for the given `templateId`.

- `providerUrl`: A valid cloud provider URL.
- `templateId`: The id of a template to return.
- `airnodeRrp (optional)`: The public address of the AirnodeRrp.sol protocol contract.

```sh
npx @api3/airnode-admin get-template \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --templateId 0x8d3b9...
```

<divider/>

### `request-withdrawal`

Requests a [withdrawal](./concepts/sponsor-wallet.html#withdrawals) from a `sponsorWallet` managed by an Airnode and returns a `withdrawalRequestId` for tracking purposes. The default account derived from the `mnemonic` will be used to return the funds.

- `providerUrl`: A valid cloud provider URL.
- `mnemonic`: A wallet owned by the sponsor. Used to pay gas costs from the mnemonic's default account unless a `derviationPath` is specified. Withdrawn funds will be added to this mnemonic's default address unless a `derviationPath` is specified.
- `airnodeAddress`: The public address of the Airnode.
- `sponsorWalletAddress`: The pubic address of the `sponsorWallet` to withdraw from. This address was returned by the `derive-sponsor-wallet` command.
- `airnodeRrp (optional)`: The public address of the AirnodeRrp.sol protocol contract.
- `derviationPath` (optional): The destination address of the `mnemonic` parameter to add the withdrawn funds to if the default address is not desired. 

```sh
npx @api3/airnode-admin request-withdrawal \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --mnemonic "nature about salad..." \
  --airnodeAddress 0xe1e0dd... \
  --sponsorWalletAddress 0x9Ec6C4...
```

<divider/>

### `check-withdrawal-request`

Checks the status of the withdrawal request with the given ID (`withdrawalRequestId`).

- `providerUrl`: A valid cloud provider URL.
- `withdrawalRequestId`: This id was returned by the `request-withdrawal` command.
- `airnodeRrp (optional)`: The public address of the AirnodeRrp.sol protocol contract.

```sh
npx @api3/airnode-admin check-withdrawal-request \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --withdrawalRequestId 0x011d1b...
```

<divider/>

## Airnodes

Helper commands for a previously deployed Airnode. These commands connect to the AirnodeRrp.sol protocol contract.

- set-airnode-xpub
- get-airnode-xpub
- derive-endpoint-id

<divider/>

### `set-airnode-xpub`

Sets the [xpub](../concepts/airnode.html#xpub) of an Airnode (optional). The xpub (extended public key) does not need to be announced on-chain for the protocol to be used, it is mainly for convenience. 

- `providerUrl`: A valid cloud provider URL.
- `mnemonic`: The Airnode's mnemonic which was declared when the Airnode was created, see [`nodeSettings.airnodeWalletMnemonic`](./deployment-files/config-json.md#nodesettings). The xpub will be derived from this mnemonic. Also used to pay gas cost for this command's transaction.
- `airnodeRrp (optional)`: The public address of the AirnodeRrp.sol protocol contract.

```sh
npx @api3/airnode-admin set-airnode-xpub \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --mnemonic "nature about salad..."
```

<divider/>

### `get-airnode-xpub`

Returns the Airnode xpub for the given `airnode`.

- `providerUrl`: A valid cloud provider URL.
- `airnodeAddress`: The public address of the Airnode.
- `airnodeRrp (optional)`: The public address of the AirnodeRrp.sol protocol contract

```sh
npx @api3/airnode-admin get-airnode-xpub \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --airnodeAddress 0xe1e0dd...
```

<divider/>

### `derive-endpoint-id`

Derives an `endpointId` from the OIS title and the endpoint's name. This command uses the convention described in the [triggers](../grp-providers/guides/build-an-airnode/configuring-airnode.md#triggers) section of the configuring airnode doc. Add the endpointId to the config.json file (`triggers.rrp[n].endpointId`).

- `oisTitle`: The title of the OIS from config.json (`ois.title`).
- `endpointName`: The name of the endpoint from config.json (`triggers.rrp[n].endpointName`).

```sh
npx @api3/airnode-admin derive-endpoint-id \
  --oisTitle "My OIS title..." \
  --endpointName "My endpoint name..."
```

<divider/>

## AirnodeRequesterRrpAuthorizer

AirnodeRequesterRrpAuthorizer was written by API3 as an [authorizer](../concepts/authorizer.md) contract that can be used by any Airnode. Airnode owners can use this contract in addition to authorizer contracts they have written themselves.

This authorizer contract can whitelist requesters where each Airnode is adminned by themselves. The Airnode address and the admins are also authorized even if they are not whitelisted explicitly.

These commands connect to the AirnodeRequesterRrpAuthorizer.sol contract.

- [set-whitelist-expiration](cli-commands.md#set-whitelist-expiration)
- [extend-whitelist-expiration](cli-commands.md#extend-whitelist-expiration)
- [set-whitelist-status-past-expiration](cli-commands.md#set-whitelist-status-past-expiration)
- [get-whitelist-status](cli-commands.md#get-whitelist-status)
- [user-is-whitelisted](cli-commands.md#user-is-whitelisted)

<divider/>

### `set-whitelist-expiration`

Called by a super admin to set the whitelisting expiration of a user for the Airnode–endpoint pair. This can hasten expiration in the case the new expiration timestamp is prior to a previously set timestamp.

- `mnemonic`: Used to pay gas costs from the mnemonic's default account unless a `derviationPath` is specified. The mnemonic must be at least an Admin or Airnode wallet.
- `providerUrl`: A valid cloud provider URL.
- `endpointId`: The [`endpointId`](./reference/deployment-files/config-json.md#triggers) for which permission is granted (from OIS).
- `userAddress`: The public address of the requester contract.
- `expirationTimestamp`: A unix formatted timestamp.
- `airnodeAddress`: The public address of the Airnode.
- `airnodeRequesterRrpAuthorizer (optional)`: The authorizer contract address. 
- `derivationPath (optional)`: Selects an alternate account to use from the mnemonic rather than the default.



```sh
npx @api3/airnode-admin set-whitelist-expiration \
  --mnemonic "nature about salad..." \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --endpointId 0xda088e2d94... \
  --userAddress 0x2c2e12... \
  --expirationTimestamp 1947451793 \
  --airnodeAddress 0xe1e0dd...
```

<divider/>

### `extend-whitelist-expiration`

Called by an admin to extend the whitelist expiration of a user for the Airnode–endpoint pair. This command expects that the new expiration timestamp is later then the previously set timestamp.

- `mnemonic`: Used to pay on-chain gas cost for this command's transaction. The mnemonic must be at least an Admin or Airnode wallet.
- `providerUrl`: A valid cloud provider URL.
- `endpointId`: The [`endpointId`](./reference/deployment-files/config-json.md#triggers) for which permission is granted (from OIS).
- `userAddress`: The public address of the requester contract.
- `expirationTimestamp`: A unix formatted timestamp.
- `airnodeAddress`: The public address of the Airnode.
- `airnodeRequesterRrpAuthorizer (optional)`: The authorizer contract address. 
- `derivationPath (optional)`: Selects an alternate account to use from the mnemonic rather than the default.

```sh
npx @api3/airnode-admin extend-whitelist-expiration \
  --mnemonic "nature about salad..." \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --endpointId 0xda088e2d94... \
  --userAddress 0x2c2e12... \
  --expirationTimestamp 1947451793 \
  --airnodeAddress 0xe1e0dd...
```

<divider/>

### `set-whitelist-status-past-expiration`

Called by a super admin to set the whitelist status of a user past expiration for the Airnode–endpoint pair. This command can be used to make whitelisting permanent in cases where it is needed to allow requests even after expiration elapses.

- `mnemonic`: Used to pay on-chain gas cost for this command's transaction. The mnemonic must be at least an Admin or Airnode wallet. The default address of the mnemonic will be used unless a derivationPath is provided. 
- `providerUrl`: A valid cloud provider URL. 
- `endpointId`: The [`endpointId`](./reference/deployment-files/config-json.md#triggers) for which permission is granted (from OIS).
- `userAddress`: The public address of the requester contract.
- `expirationTimestamp`: A unix formatted timestamp.
- `airnodeAddress`: The public address of the Airnode.
- `airnodeRequesterRrpAuthorizer (optional)`: The authorizer contract address. 
- `derivationPath (optional)`: Selects an alternate account to use from the mnemonic rather than the default.


```sh
npx @api3/airnode-admin set-whitelist-status-past-expiration \
  --mnemonic "nature about salad..." \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --endpointId 0xda088e2d94... \
  --userAddress 0x2c2e12... \
  --whitelistStatusPastExpiration true \
  --airnodeAddress 0xe1e0dd... \
```

<divider/>

### `get-whitelist-status`

Called to get the detailed whitelist status of a user for the Airnode–endpoint pair.

- `providerUrl`: A valid cloud provider URL.
- `endpointId`: The endpointId for which permission is granted (from OIS).
- `userAddress`: The public address of the requester contract.
- `airnodeAddress`: The public address of the Airnode.
- `airnodeRequesterRrpAuthorizer (optional)`: The authorizer contract address. 

```sh
npx @api3/airnode-admin get-whitelist-status \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --endpointId 0xda088e2d94... \
  --userAddress 0x2c2e12... \
  --airnodeAddress 0xe1e0dd... \
```
<divider/>

### `user-is-whitelisted`

Called to check if a requester is whitelisted to use the Airnode–endpoint pair.

- `providerUrl`: A valid cloud provider URL.
- `airnodeRequesterRrpAuthorizer`: The authorizer contract address. 
- `endpointId`: The [`endpointId`](./reference/deployment-files/config-json.md#triggers) for which permission is granted (from OIS).
- `userAddress`: The public address of the requester contract.
- `airnodeAddress`: The public address of the Airnode.

```sh
npx @api3/airnode-admin user-is-whitelisted \
  --providerUrl https://eth-rinkeby.gateway.pokt.network/v1/lb/<APP_ID> \
  --airnodeRequesterRrpAuthorizer 0xDc64a1... \
  --endpointId 0xda088e2d94... \
  --userAddress 0x2c2e12... \
  --airnodeAddress 0xe1e0dd... \
```
<divider/>

## More Examples

You can find more examples in the _@api3-dao/airnode/package/admin_ [test files](https://github.com/api3dao/airnode/tree/master/packages/admin/test).
