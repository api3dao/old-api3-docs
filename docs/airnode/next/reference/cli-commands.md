---
title: Admin CLI Commands
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

<Fix>These commands when they are final.</Fix>

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

## Sponsor Commands

### ~~`create-reqeuster`~~

~~Creates a [requester](https://github.com/api3dao/api3-docs/blob/master/request-response-protocol/requester.md) and returns a requester index.
Note down your requester index because you will be using it in future interactions.~~

```sh
npx @api3/airnode-admin derive-sponsor-wallet \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --mnemonic "nature about salad..." \
  --sponsor 0x9Ec6C4...
```

### ~~`set-requester-admin`~~

~~Sets the [requester admin](https://github.com/api3dao/api3-docs/blob/master/request-response-protocol/requester.md#requesteradmin).
The account derived from the `mnemonic` you provide here has to belong to the previous requester admin.~~

```sh
npx @api3/airnode-admin set-requester-admin \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --mnemonic "nature about salad..." \
  --requesterIndex 6 \
  --requesterAdmin 0xe97301...
```

### `derive-sponsor-wallet`

Derives the address of the [sponsor wallet](https://github.com/api3dao/api3-docs/blob/master/request-response-protocol/sponsor-wallet.md) by an Airnode for a sponsor.

```sh
npx @api3/airnode-admin derive-sponsor-wallet \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --airnode 0xe1e0dd... \
  --requesterIndex 6
```

### `sponsor-requester`

[Sponsors](https://github.com/api3dao/api3-docs/blob/master/request-response-protocol/sponsorship.md) a requester contract so that its requests can be fulfilled by the sponsor's sponsor wallet. The account derived from the `mnemonic` you provide here has to belong to the sponsor.

```sh
npx @api3/airnode-admin sponsor-requester \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --mnemonic "nature about salad..." \
  --requesterAddress 0x2c2e12...
```

### `unsponsor-requester`

Removes the sponsorship of a requester contract so that its requests can no longer be fulfilled by the requester's sponsor wallet. The account derived from the `mnemonic` you provide here has to belong to the sponsor.

```sh
npx @api3/airnode-admin unsponsor-client \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --mnemonic "nature about salad..." \
  --requesterAddress 0x2c2e12...
```

### `get-sponsor-status`

Returns the sponsor status for the given sponsor and requester (`true` if sponsored, `false` otherwise).

```sh
npx @api3/airnode-admin get-sponsor-status \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --sponsor 0x3v5m34... \
  --requesterAddress 0x2c2e12...
```

### `create-template`

Reads a file, uses its contents to create a [template](https://github.com/api3dao/api3-docs/blob/master/request-response-protocol/template.md) and returns the template ID.
See the `/example` directory for an example template file.

```sh
npx @api3/airnode-admin create-template \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --mnemonic "nature about salad..." \
  --templateFilePath ./template.json
```

### `get-template`

Returns the template for the given `templateId`.

```sh
npx @api3/airnode-admin get-template \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --templateId 0x8d3b9...
```

### `request-withdrawal`

Requests a [withdrawal](./concepts/sponsor-wallet.html#withdrawals) from a sponsor-wallet managed by an Airnode, and returns the request ID. The account derived from the `mnemonic` will be used to return the funds. The `mnemonic` could be the one the sponsor used to create the sponsor-wallet or another `mnemonic owned by the sponsor.

```sh
npx @api3/airnode-admin request-withdrawal \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --mnemonic "nature about salad..." \
  --airnode 0xe1e0dd... \
```

### `check-withdrawal-request`

Checks the status of the withdrawal request with the given ID.

```sh
npx @api3/airnode-admin check-withdrawal-request \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --withdrawalRequestId 0x011d1b...
```

## Airnode Commands

### `set-airnode-parameters`

Sets the parameters of an [Airnode](https://github.com/api3dao/api3-docs/blob/master/request-response-protocol/provider.md) and returns the Airnode ID.
See the `/example` directory for an example authorizers file.

**You probably should not be using this.**
Airnode will set its own parameters during [deployment](https://github.com/api3dao/api3-docs/blob/master/provider-guides/deploying-airnode.md) if necessary.

```sh
npx @api3/airnode-admin set-airnode-parameters \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --mnemonic "nature about salad..." \
  --authorizersFilePath ./authorizers.json
```

### `get-airnode-parameters`

Returns the Airnode parameters and block number for the given `airnode` (Airnode's `address`).

```sh
npx @api3/airnode-admin get-airnode-parameters \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --airnode 0xe1e0dd...
```

### `derive-endpoint-id`

Derives the endpoint ID using the OIS title and the endpoint name using the convention described [here](https://github.com/api3dao/api3-docs/blob/master/provider-guides/configuring-airnode.md#triggers).

```sh
npx @api3/airnode-admin derive-endpoint-id \
  --oisTitle "My OIS title..." \
  --endpointName "My endpoint name..."
```

## AirnodeRequesterRrpAuthorizer commands

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
