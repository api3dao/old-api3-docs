---
title: CLI Commands
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

A package/CLI tool to interact with Airnode across blockchains. There are commands for both requesters and API providers. Requesters can endorse [client contracts](protocols/request-response/client.md) and fund Airnodes. API providers can build [Airnodes](protocols/request-response/airnode.md) that serve their API data to requester client contracts.

Almost all commands require you to provide a `providerUrl` such as `https://ropsten.infura.io/v3/<KEY>`, `https://xdai.poanetwork.dev`, etc.
The CLI connects to [AirnodeRrp.sol](https://github.com/api3dao/airnode/blob/master/packages/protocol/contracts/AirnodeRrp.sol) contract, which address is derived from the current chain.
You can optionally specify the contract address yourself by providing optional `airnodeRrp` command argument with address of the deployed contract on your targeted chain.

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
import { createRequester, getAirnodeRrpWithSigner } from '@api3/airnode-admin';

// First obtain the contract instance on target chain
const airnodeRrp = await getAirnodeRrpWithSigner(mnemonic, derivationPath, providerUrl, airnodeRrpAddress);
// Pass the contract instance as the first argument to the SDK function
const requesterIndex = await createRequester(airnodeRrp, requesterAdmin);
```

If you plan to use multiple commands it might be tedious to pass the contract instance to every function call. For this reason there is also class based `AdminSdk` which you initialize with `AirnodeRrp` contract only once.

```js
import { AdminSdk } from '@api3/airnode-admin';

// First initialize the SDK with AirnodeRrp contract instance.
// You can use static AdminSdk functions or provide your own instance.
const airnodeRrp = await AdminSdk.getAirnodeRrpWithSigner(mnemonic, derivationPath, providerUrl, airnodeRrpAddress);
// Create sdk instance
const adminSdk = new AdminSdk(airnodeRrp);
// Call the method you need
const requesterIndex = await adminSdk.createRequester(requesterAdmin);

// You can switch the contract instance anytime. E.g. if you are using ethers
adminSdk.airnodeRrp = airnodeRrp.connect(someOtherWallet);
```

The SDK will also provide TS typings out of the box.
Please, refer to the implementation for more details.

## Requester commands

### `create-requester`

Creates a [requester](https://github.com/api3dao/api3-docs/blob/master/request-response-protocol/requester.md) and returns a requester index.
Note down your requester index because you will be using it in future interactions.

```sh
npx @api3/airnode-admin create-requester \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --mnemonic "nature about salad..." \
  --requesterAdmin 0x5c17cb...
```

### `set-requester-admin`

Sets the [requester admin](https://github.com/api3dao/api3-docs/blob/master/request-response-protocol/requester.md#requesteradmin).
The account derived from the `mnemonic` you provide here has to belong to the previous requester admin.

```sh
npx @api3/airnode-admin set-requester-admin \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --mnemonic "nature about salad..." \
  --requesterIndex 6 \
  --requesterAdmin 0xe97301...
```

### `derive-designated-wallet`

Derives the address of the [wallet designated by an Airnode for a requester](https://github.com/api3dao/api3-docs/blob/master/request-response-protocol/designated-wallet.md).

```sh
npx @api3/airnode-admin derive-designated-wallet \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --airnodeId 0xe1e0dd... \
  --requesterIndex 6
```

### `endorse-client`

[Endorses](https://github.com/api3dao/api3-docs/blob/master/request-response-protocol/endorsement.md) a client contract so that its requests can be fulfilled by the requester's designated wallet.
The account derived from the `mnemonic` you provide here has to belong to the requester admin.

```sh
npx @api3/airnode-admin endorse-client \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --mnemonic "nature about salad..." \
  --requesterIndex 6 \
  --clientAddress 0x2c2e12...
```

### `unendorse-client`

Unendorses a client contract so that its requests can no longer be fulfilled by the requester's designated wallet.
The account derived from the `mnemonic` you provide here has to belong to the requester admin.

```sh
npx @api3/airnode-admin unendorse-client \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --mnemonic "nature about salad..." \
  --requesterIndex 6 \
  --clientAddress 0x2c2e12...
```

### `get-endorsement-status`

Returns the endorsement status for the given requester index and client (`true` if endorsed, `false` otherwise).

```sh
npx @api3/airnode-admin get-endorsement-status \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --requesterIndex 6 \
  --clientAddress 0x2c2e12...
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

Requests a [withdrawal](https://github.com/api3dao/api3-docs/blob/master/request-response-protocol/designated-wallet.md#withdrawals) from the wallet designated by an Airnode for a requester, and returns the request ID.
The account derived from the `mnemonic` you provide here has to belong to the requester admin.

```sh
npx @api3/airnode-admin request-withdrawal \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --mnemonic "nature about salad..." \
  --airnodeId 0xe1e0dd... \
  --requesterIndex 6 \
  --destination 0x98aaba...
```

### `check-withdrawal-request`

Checks the status of the withdrawal request with the given ID.

```sh
npx @api3/airnode-admin check-withdrawal-request \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --withdrawalRequestId 0x011d1b...
```

## Airnode commands

### `set-airnode-parameters`

Sets the parameters of an [Airnode](https://github.com/api3dao/api3-docs/blob/master/request-response-protocol/provider.md) and returns the Airnode ID.
See the `/example` directory for an example authorizers file.

**You probably should not be using this.**
Airnode will set its own parameters during [deployment](https://github.com/api3dao/api3-docs/blob/master/provider-guides/deploying-airnode.md) if necessary.

```sh
npx @api3/airnode-admin set-airnode-parameters \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --mnemonic "nature about salad..." \
  --airnodeAdmin 0xc2193d... \
  --authorizersFilePath ./authorizers.json
```

### `get-airnode-parameters`

Returns the Airnode parameters and block number for the given `airnodeId`.

```sh
npx @api3/airnode-admin get-airnode-parameters \
  --providerUrl https://ropsten.infura.io/v3/<KEY> \
  --airnodeId 0xe1e0dd...
```

### `derive-endpoint-id`

Derives the endpoint ID using the OIS title and the endpoint name using the convention described [here](https://github.com/api3dao/api3-docs/blob/master/provider-guides/configuring-airnode.md#triggers).

```sh
npx @api3/airnode-admin derive-endpoint-id \
  --oisTitle "My OIS title..." \
  --endpointName "My endpoint name..."
```

## More examples

You can find more examples in the _@api3-dao/airnode/package/admin_ [test files](https://github.com/api3dao/airnode/tree/master/packages/admin/test).
