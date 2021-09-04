---
title: Airnode starter
---

<!-- markdownlint-disable -->
# {{$frontmatter.title}}
<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />
<!-- markdownlint-enable -->

> A starter project for deploying an Airnode and making requests to it

<Fix>
<p>This doc is not usable at this time. Waiting on the updated dev README.md. This doc is out of sync with the flow of pre-alpha which probably has a better flow.
</p>
</Fix>

See the code [here](https://github.com/api3dao/airnode-starter/tree/pre-alpha)

Using the [airnode-starter](https://github.com/api3dao/airnode-starter/tree/pre-alpha) project you will deploy an Airnode and make requests to it. This project is composed of setup and three steps.

- Prepare tutorial requirements.
- Deploy an Airnode on a supported testnet chain.
  - Ropsten
  - Rinkeby
  - Goerli
  - xDai
  - Fantom
- Make a request to the deployed Airnode in a contract.
- Undeploy the Airnode.

You can skip [Step #1: Deploy an Airnode](airnode-starter.md#step-1-deploy-an-airnode) and use the Airnode that we have deployed on **Ropsten** if preferred. You are recommended to read the contents of the [scripts](https://github.com/api3dao/airnode-starter/tree/pre-alpha/scripts) as you run them, and read the entire readme before starting.

## Setup

In preparation to deploy an Airnode a few items need to be prepared.
- Build the`airnode-starter`repo.
- Create a wallet and fund it.
- Install/setup Metamask.
- Get a blockchain provider account/URL.
- Get AWS (cloud provider) credentials.

1. Clone the [airnode-starter](https://github.com/api3dao/airnode-starter/tree/pre-alpha) repo.
    ```bash
    # Using SSH
    git clone git@github.com:api3dao/airnode-starter.git

    # Using https
    git clone https://github.com/api3dao/airnode-starter.git  
    ```
2. Be sure to use the pre-alpha branch. 
    ```bash
    cd airnode-starter
    git switch pre-alpha
    ```
3. Run the following to install the dependencies from the repo root.
    ```bash
    npm install
    ```
4. Run the following to build the contracts.
    ```bash
    npm run build
    ```
### Create Wallet

You will need a wallet to hold funds for a testnet such as Ropsten. These funds will be used to pay fees to setup an Airnode. Funds on a testnet are free. 

Run the following to generate a new wallet, whose mnemonic phrase will be displayed on the terminal and recorded in a `.env` file at the project root. If you already have a wallet for your desired testnet you can use it by entering its MNEMONIC manually into `.env` at the project root.
```sh
npm run generate-wallet
```

### Metamask

1. Install [Metamask](https://metamask.io/) to your web browser.
2. Import the mnemonic phrase to Metamask.
3. Use the [faucet](https://faucet.metamask.io/) to get some Ropsten ETH, or use any other appropriate source for the chain you will be working on.

### Ropsten

You need to get a provider URL. This will be used both by the deployed Airnode and by you while interacting with contracts. If you will be working on Ropsten follow these two steps.

1. Go to [Infura](https://infura.io/), create an account and get a Ropsten provider URL
2. Replace `https://ropsten.infura.io/v3/{YOUR_KEY}` in your `.env` file with the URL you got from Infura

Adapt the steps above if you will be using another chain. Note that you can use any other provider or your own node. However, if you will be deploying your own Airnode, the provider endpoint must be publicly accessible (i.e., `127.0.0.1:8545` will not work).

This tutorial can be run on these supported chains.
- Ropsten
- Rinkeby
- Goerli
- xDai
- Fantom

### AWS Cloud Credentials

*If you wish to skip Step: #1 then you do not need AWS cloud credentials.*

Read [Creating cloud credentials](../guides/provider/deploying-airnode.md#creating-cloud-credentials) to create your cloud credentials. Place them at `/config/.env`, similar to [/config/example.env](config-examples/example-env.md). Do not confuse this `.env` file with the one in the project root that keeps your mnemonic phrase and provider URL.


**Following these instructions to deploy an Airnode on AWS is [free](https://aws.amazon.com/free/) at the time this is being written.**

## Step 1: Deploy an Airnode

Normally, you would need to do two things before you deploy an Airnode:
1. [Specify the API integration](https://api3dao.github.io/api3-docs/pre-alpha/guides/provider/api-integration.html)
1. [Configure your Airnode](https://api3dao.github.io/api3-docs/pre-alpha/guides/provider/configuring-airnode.html)


<!-- markdown-link-check-disable -->
<!-- The CoinGecko API docs have been returning a 503 but they are there. -->
For this project, we specified a minimal integration to the popular and free [CoinGecko API](https://www.coingecko.com/en/api/documentation), and prepared the configuration files. We only integrated a single API operation, `GET` for `/coins/{id}`, which you can see below. The `localization`, `tickers`, `community_data`, `developer_data` and `sparkline` parameters are [fixed](https://api3dao.github.io/api3-docs/pre-alpha/guides/provider/api-integration.html#fixedoperationparameters) as `"false"`, while `market_data` is fixed as `"true"`. The `id` parameter will be provided by the requester (e.g., `"ethereum"`) under the name `coinId`. You can make test calls over the [CoinGecko API docs](https://www.coingecko.com/en/api/documentation) to see the response format.
<!-- markdown-link-check-enable -->

<p align="center">
  <img src="https://user-images.githubusercontent.com/19530665/103151070-be14ea00-478b-11eb-9608-a967c4282d9f.png" width="1024" />
</p>

See [config.example.json](config-json.md) for how this integration is achieved.
We fixed the [reserved parameters](https://api3dao.github.io/api3-docs/pre-alpha/guides/provider/api-integration.html#reservedparameters) to read the value from `market_data.current_price.usd`, cast it as an `int256` and multiply it by `1,000,000` before returning.
No security scheme (i.e., API key) is defined in `config.json` or [security.json](secrets-env.md) because the CoinGecko API is publicly accessible.

### Customize your `config.json`

Run the following to insert the contents of `.env` to `config/config.example.json` and save it as `config/config.json`
```sh
npm run customize-config
```

### Deploy

Now your `/config` directory should have the required [config.json](https://api3dao.github.io/api3-docs/pre-alpha/airnode/specifications/config-json.html), [security.json](https://api3dao.github.io/api3-docs/pre-alpha/airnode/specifications/security-json.html) and [.env](https://api3dao.github.io/api3-docs/pre-alpha/guides/provider/deploying-airnode.html#creating-cloud-credentials) files.
Run the following to deploy your node:

```sh
cd config
# The deployer has to be run in the directory where the configuration files are
docker run -it --rm \
  --env-file .env \
  --env COMMAND=deploy-first-time \
  -v $(pwd):/airnode/out \
  api3/airnode-deployer:pre-alpha
```

This will output a receipt file with the extension `.receipt.json`.

### Fund your master wallet

Run the following to send your master wallet 0.1 ETH for it to [create a provider record](https://api3dao.github.io/api3-docs/pre-alpha/protocols/request-response/provider.html#creating-a-provider-record) for you on-chain.
```sh
npm run fund-master-wallet
```

Your deployed Airnode will use these funds to make the transaction that will create the provider record on the chain you are operating on, and send the leftover ETH back to your address automatically.
**You will have to wait ~1 minute for this to happen, otherwise the next step will fail.**

### Make your endpoint publicly accessible

`config.json` defines an [endpoint](https://api3dao.github.io/api3-docs/pre-alpha/protocols/request-response/endpoint.html) named `coinMarketData`, whose [endpoint ID](https://api3dao.github.io/api3-docs/pre-alpha/protocols/request-response/endpoint.html#endpointid) is `0xf466b8feec41e9e50815e0c9dca4db1ff959637e564bb13fefa99e9f9f90453c`.
Endpoints are not publicly accessible by default, so you will have to make a transaction for this.
Run the following to set your endpoint's [authorizers](https://api3dao.github.io/api3-docs/pre-alpha/protocols/request-response/authorizer.html) to `[0x0000000000000000000000000000000000000000]`, which makes it [publicly accessible](https://api3dao.github.io/api3-docs/pre-alpha/guides/provider/setting-authorizers.html#allow-all):
```sh
npm run update-authorizers
```

## Step 2: Make a request

The scripts in this step will use the Airnode you have deployed if you have completed Step 1.
Otherwise, it will use the `airnodeId` of the Airnode that we have deployed given in `src/parameters.js`.
Note that the `endpointId` will be the same either way because it is [derived from the OIS and endpoint name](https://api3dao.github.io/api3-docs/pre-alpha/protocols/request-response/endpoint.html#endpointid).

### Create a requester
<Fix>This goes away.</Fix>
~~Run the following to create an on-chain [requester](https://api3dao.github.io/api3-docs/pre-alpha/protocols/request-response/requester.html) record:~~
```sh
npm run create-requester
```

~~You can use this requester denoted with an index in other projects as well.
Note that `requesterIndex` is chain-specific, so you will have to create another requester record on other chains.~~

### Deploy the requester contract

Run the following to deploy `ExampleRequester.sol`:
```sh
npm run deploy-requester
```

### Sponsor the requester

Run the following to [sponsor](../../grp-developers/requesters-sponsors.md) your deployed [requester](../../grp-developers/requesters-sponsors.md) contract using the requester you have created:
```sh
npm run sponsor-requester
```

### Derive and fund the sponsor wallet

First run the following to derive the [sponsor wallet](../../reference/protocols/request-response/sponsor-wallet.md) for the provider–requester pair:
```sh
npm run derive-sponsor-wallet-address
```
and then fund this sponsor wallet with 0.1 ETH:
```sh
npm run fund-sponsor-wallet
```

The requests that the requester contract will make will be funded by this 0.1 ETH. Note that you may have to run `fund-sponsor-wallet` again if you make too many requests and use up this 0.1 ETH (very unlikely).

### Make a request

Run the following to make a request:
```
npm run make-request
```
which should be fulfilled by the Airnode and printed out on the terminal.
Note that now that the price is on-chain, you can use it in your contract to implement any arbitrary logic.

Try replacing the `coinId` value in `/scripts/make-request` from `"ethereum"` to `"bitcoin"` and make another request.
You can see the API docs to find out which coin IDs are supported.

## Conclusion

You deployed an Airnode, made a request to it and received the response at the requester contract. If you want to learn more, see the following resources:

- [API3 whitepaper](https://github.com/api3dao/api3-whitepaper) will give you a broad overview of the project
- [Blog (Medium) posts](../../blog-posts.md) are a more digestible version of the whitepaper
- [@api3/airnode-admin](https://github.com/api3dao/airnode/tree/pre-alpha/packages/admin) lets you interact with the Airnode contract (to create a request, sponsor a requester, etc.) using a CLI tool
<Fix>Need new URL to requester examples.</Fix>
- [Airnode requester examples](https://github.com/api3dao/airnode-client-examples/tree/pre-alpha) demonstrate different request patterns that the Airnode protocol supports (for example, we used a full request in this starter project)

## Remove the Airnode

When you are done with the airnode starter project, set `config/` as the working directory and use the command below where `$RECEIPT_FILENAME` is replaced with the name of your receipt file ending with `.receipt.json`. See [Using Docker](../using-docker.md) for more information) or [Deployer CLI Commands](../../reference/deployer-commands.md) for more information on hte deployer.

```sh
docker run -it --rm \
  --env-file .env \
  --env COMMAND=remove-with-receipt \
  --env RECEIPT_FILENAME=$RECEIPT_FILENAME \
  -v $(pwd):/airnode/out \
  api3/airnode-deployer:pre-alpha
```
