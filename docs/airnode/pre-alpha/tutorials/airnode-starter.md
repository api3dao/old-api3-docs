---
title: Airnode starter
---

# {{$frontmatter.title}}
<VersionWarning/>
<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

Using the [airnode-starter](https://github.com/api3dao/airnode-starter/tree/pre-alpha) project you will deploy an Airnode and make requests to it. This project is composed of setup and three steps.

- Prepare tutorial requirements.
- Deploy an Airnode on a supported chain.
- Make a request to the deployed Airnode in a contract.
- Remove the Airnode.

You can skip [Step #1: Deploy an Airnode](airnode-starter.md#step-1-deploy-an-airnode) and use the Airnode that we have deployed on **Ropsten** if preferred. You are recommended to read the contents of the [scripts](https://github.com/api3dao/airnode-starter/tree/pre-alpha/scripts) as you run them, and read the entire readme before starting.

## Setup

In preparation to deploy an Airnode a few items need to be prepared.
- Build the`airnode-starter`repo.
- Create a wallet and fund it.
- Install/setup Metamask.
- Get a blockchain provider account/URL.
- Get AWS (cloud provider) credentials.

### airnode-starter repo

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

## Step 1: Deploy an Airnode

_Following these instructions to deploy an Airnode on AWS is [free](https://aws.amazon.com/free/) as of May 22nd, 2021._


Normally, you would need to do two things before you deploy an Airnode:
1. [Specify the API integration](../guides/provider/api-integration.md)
1. [Configure your Airnode](../guides/provider/configuring-airnode.md)

<!-- markdown-link-check-disable -->
<!-- The CoinGecko API docs have been returning a 503 but they are there. -->
For this project, we specified a minimal integration to the popular and free [CoinGecko API](https://www.coingecko.com/en/api/documentation), and prepared the configuration files. We only integrated a single API operation, `GET` for `/coins/{id}`, which you can see below. The `localization`, `tickers`, `community_data`, `developer_data` and `sparkline` parameters are [fixed](../guides/provider/api-integration.md#fixedoperationparameters) as `"false"`, while `market_data` is fixed as `"true"`. The `id` parameter will be provided by the requester (e.g., `"ethereum"`) under the name `coinId`. You can make test calls over the [CoinGecko API docs](https://www.coingecko.com/en/api/documentation) to see the response format.
<!-- markdown-link-check-enable -->

<p align="center">
  <img src="https://user-images.githubusercontent.com/19530665/103151070-be14ea00-478b-11eb-9608-a967c4282d9f.png" width="1024" />
</p>

See [config.example.json](config-examples/config-example-json.md) for how this integration is achieved. We fixed the [reserved parameters](../guides/provider/api-integration.md#reservedparameters) to read the value from `market_data.current_price.usd`, cast it as an `int256` and multiply it by `1,000,000` before returning. No security scheme (i.e., API key) is defined in `config.json` or [security.json](config-examples/security-json.md) because the CoinGecko API is publicly accessible.

### Customize your `config.json`

Run the following to insert the contents of `.env` to `config/config.example.json` and save it as `config/config.json`
```sh
npm run customize-config
```

### Deploy

Now your`/config`directory should have the required [config.json](../airnode/specifications/config-json.md), [security.json](../airnode/specifications/security-json.md) and [.env](../guides/provider/deploying-airnode.md#creating-cloud-credentials) files. Run the following to deploy your node.

:::: tabs ::: tab Linux/Mac
```sh
cd config
# The deployer has to be run in the directory where the configuration files are
docker run -it --rm \
  --env-file .env \
  --env COMMAND=deploy-first-time \
  -v $(pwd):/airnode/out \
  api3/airnode-deployer:pre-alpha
```
::: ::: tab Windows
```sh
cd config
# The deployer has to be run in the directory where the configuration files are
docker run -it --rm ^
  --env-file .env ^
  --env COMMAND=deploy-first-time ^
  -v "%cd%":/airnode/out ^
  api3/airnode-deployer:pre-alpha
```
::: ::::

This will output a receipt file with the extension`.receipt.json`.

### Fund your master wallet

Run the following to send your master wallet 0.1 ETH for it to [create a provider record](../protocols/request-response/provider.md#creating-a-provider-record) for you on-chain.
```sh
npm run fund-master-wallet
```

Your deployed Airnode will use these funds to make the transaction that will create the provider record on the chain you are operating on, and send the leftover ETH back to your address automatically. **You will have to wait ~1 minute for this to happen, otherwise the next step will fail.**

### Make your endpoint publicly accessible

`config.json`defines an [endpoint](../protocols/request-response/endpoint.md) named`coinMarketData`, whose [endpoint ID](../protocols/request-response/endpoint.md#endpointid) is `0xf466b8feec41e9e50815e0c9dca4db1ff959637e564bb13fefa99e9f9f90453c`. Endpoints are not publicly accessible by default, so you will have to make a transaction for this. Run the following to set your endpoint's [authorizers](../protocols/request-response/authorizer.md) to `[0x0000000000000000000000000000000000000000]`, which makes it [publicly accessible](../guides/provider/setting-authorizers.md#allow-all):
```sh
npm run update-authorizers
```

## Step 2: Make a request

The scripts in this step will use the Airnode you have deployed if you have completed Step 1. Otherwise, it will use the `providerId` of the Airnode that we have deployed given in `src/parameters.js`. Note that the `endpointId` will be the same either way because it is [derived from the OIS and endpoint name](../protocols/request-response/endpoint.md#endpointid).

### Create a requester

Run the following to create an on-chain [requester](../protocols/request-response/requester.md) record.
```sh
npm run create-requester
```

You can use this requester denoted with an index in other projects as well. Note that `requesterIndex` is chain-specific, so you will have to create another requester record on other chains.

### Deploy the client contract

Run the following to deploy`ExampleClient.sol`.
```sh
npm run deploy-client
```

### Endorse the client

Run the following to [endorse](../protocols/request-response/endorsement.md) your deployed [client](../protocols/request-response/client.md) contract using the requester you have created.
```sh
npm run endorse-client
```

### Derive and fund the designated wallet

First run the following to derive the [designated wallet](../protocols/request-response/designated-wallet.md) for the provider–requester pair.
```sh
npm run derive-designated-wallet-address
```
Then fund this designated wallet with 0.1 ETH.
```sh
npm run fund-designated-wallet
```

The requests that the client contract will make will be funded by this 0.1 ETH. Note that you may have to run `fund-designated-wallet` again if you make too many requests and use up this 0.1 ETH (very unlikely).

### Make a request

Run the following to make a request. The request will be fulfilled by the Airnode and printed out on the terminal. Now that the price is on-chain, you can use it in your contract to implement any arbitrary logic.
```
npm run make-request
```

Try replacing the `coinId` value in `/scripts/make-request` from `"ethereum"` to `"bitcoin"` and make another request.

## Step 3: Remove Airnode

Don't forget to take down your Airnode as it is designed to be *set-and-forget*. When you are done with this project, go to`config/`as your working directory and use the command below where`$RECEIPT_FILENAME`is replaced with the name of your receipt file ending with`.receipt.json`. You can refer to our [Docker instructions](../guides/docker/deployer-image.md) for more information.


:::: tabs ::: tab Linux/Mac
```sh
docker run -it --rm \
  --env-file .env \
  --env COMMAND=remove-with-receipt \
  --env RECEIPT_FILENAME=$RECEIPT_FILENAME \
  -v $(pwd):/airnode/out \
  api3/airnode-deployer:pre-alpha
```
::: ::: tab Windows
```sh
docker run -it --rm ^
  --env-file .env ^
  --env COMMAND=remove-with-receipt ^
  --env RECEIPT_FILENAME=$RECEIPT_FILENAME ^
  -v "%cd%":/airnode/out ^
  api3/airnode-deployer:pre-alpha
```
::: ::::

## Conclusion

You deployed an Airnode, made a request to it and received the response at the contract. If you want to learn more, see the following resources:

- [API3 whitepaper](https://github.com/api3dao/api3-whitepaper) will give you a broad overview of the project.
- [Medium posts](https://medium.com/api3) explain API3 in smaller, more digestible articles.
- [@api3/airnode-admin](https://github.com/api3dao/airnode/tree/pre-alpha/packages/admin) lets you interact with the Airnode contract (to create a request, endorse a client, etc.) using a CLI tool.

