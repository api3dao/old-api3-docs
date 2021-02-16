---
title: Airnode Starter
---

# {{$frontmatter.title}}

[[toc]]

A starter project for deploying and making requests to an Airnode. This project is composed of two steps.

1. Deploy an Airnode on Ropsten.
1. Making a request to the deployed Airnode in a contract.

You can skip the first step and use a pre-deployed Airnode. It is recommended that you read the contents of the scripts as you run them, fought in the scripts directory of the airnode-starter project. Also read this entire tutorial before starting.

::: tip
 Check out the source code in the [airnode-starter](https://github.com/api3dao/airnode-starter) project.
:::

## Setup

You only need cloud credentials if you will not be skipping Step 1. Before beginning some project setup work is needed.

- Build the airnode-starter project.
- Prepare a wallet, add ETH for the Ropsten network.
- Get a Ropsten provider URL.
- Install [Docker](https://docs.docker.com/get-docker/).

### Build airnode-starter Project

Clone and build the [airnode-starter](https://github.com/api3dao/airnode-starter) project.

```bash
# Clone project
git clone https://github.com/api3dao/airnode-starter.git

# Install dependencies
cd airnode-starter
npm install

# Build project
npm run build
  ```

### Prepare Master Wallet

Run the following to generate a **Master Wallet**, whose mnemonic phrase will be displayed on the terminal and recorded in a `.env` file at the project root.

```bash
cd airnode-starter
npm run generate-wallet
```

1. Install [Metamask](https://metamask.io/) to your web browser.
1. Import the mnemonic phrase (returned by generate-wallet) to Metamask.
1. Use the [faucet](https://faucet.metamask.io/) to get some Ropsten ETH.

### Ropsten Provider URL

A Ropsten provider URL is needed. This will be used both by the deployed Airnode and by you while interacting with contracts.

1. Go to [Infura](https://infura.io/), create an account and get a Ropsten provider URL which will contain a key.
1. Replace **https://ropsten.infura.io/v3/{YOUR_KEY}** in your **.env** file with the URL from Infura.

Note that you can use any other provider or your own Ropsten node. However, if you will be deploying your own Airnode, the provider endpoint must be publicly accessible \(i.e., `127.0.0.1:8545` will not work\).

_(You only need cloud credentials if you will not be skipping Step 1.)_

### AWS Cloud Credentials

Airnode will deploy serverless functions to AWS Lambda. Cloud Credentials are the key pair (*Access key id and Secret access key*) of an IAM user. Use the [AWS Cloud Credentials](../tutorials/aws-credentials.html) tutorial to learn how to create AWS Cloud Credentials.

<!-- Follow the section **AWS Cloud Credentials** in the [Guides > Provider > Deploying Airnode](../guides/provider/deploying-airnode.html#creating-cloud-credentials) to create your cloud credentials.--> 

Create and place the cloud credentials into **/config/.env** and not into the **.env** in the project root. 

```bash
# Use the sample file /config/example.env as a template.
AWS_ACCESS_KEY_ID=AKIAWYO7QOP5Y5OUUGM5
AWS_SECRET_KEY=S95moqkWXb5hIJyPrryChL8O1pZ6p//g07CR/ul3
```

### Docker
Docker is required to deploy the Airnode. The upside of containerizing the deployer is that you only need to install Docker. Go to the [Docker website](https://docs.docker.com/get-docker/) to install if needed.


<!------------>
<!-- Step 1 -->
<!------------>

## Step 1: Deploy an Airnode on Ropsten

Normally, you would need to do two things before you deploy an Airnode. The airnode-starter project has already prepared these for you.

1. [Specify the API Integration](../guides/provider/api-integration.md)
1. [Configure the Airnode](../guides/provider/configuring-airnode.md)

The airnode-starter project specifies a minimal integration to the popular and free [CoinGecko API](https://www.coingecko.com/en/api). The configuration files to serve it over the Ropsten testnet are part of the project. 

The project implements a single API operation, `GET` for `/coins/{id}`illustrated below. The `localization`, `tickers`, `community_data`, `developer_data` and `sparkline` parameters are [fixed](https://github.com/api3dao/api3-docs/blob/master/provider-guides/api-integration.md#fixedoperationparameters) as `"false"`, while `market_data` is fixed as `"true"`. The `id` parameter will be provided by the requester \(e.g., `"ethereum"`\) under the name `coinId`. 

Make test calls over the [CoinGecko APIs page](https://www.coingecko.com/en/api) to see the response format.

![](https://user-images.githubusercontent.com/19530665/103151070-be14ea00-478b-11eb-9608-a967c4282d9f.png)

See [`config.example.json`](/config/config.example.json) for how this integration is achieved. We fixed the [reserved parameters](https://github.com/api3dao/api3-docs/blob/master/provider-guides/api-integration.md#reservedparameters) to read the value from `market_data.current_price.usd`, cast it as an `int256` and multiply it by `1,000,000` before returning. No security scheme \(i.e., API key\) is defined in `config.json` or [`security.json`](/config/security.json) because the CoinGecko API is publicly accessible.

### Customize `config.json`

Run the following to insert the contents of `.env` to `config/config.example.json` and save it as `config/config.json`

```bash
npm run customize-config
```

### Deploy

The **/config** directory now has the required files for deployment.  

- [config.json](../airnode/config-json.html)
- [security.json](../specifications/security-json.html)
- [.env](../guides/provider/deploying-airnode.html#creating-cloud-credentials)

Run the following to deploy the node. This will output a receipt file with the extension **.receipt.json** in the /config directory.

```bash
# Only run the deployer from the /config directory
cd config

docker run -it --rm \
  --env-file .env \
  --env COMMAND=deploy-first-time \
  -v $(pwd):/airnode/out \
  api3/airnode:latest
```

### Fund Master Wallet

Run the following to send your **Master Wallet** 0.1 ETH to [create a provider record](../protocols/request-response/provider.html#creating-a-provider-record) on-chain. The deployed Airnode will use these funds for the transaction that will create the provider record on Ropsten. Leftover ETH will be returned to your address automatically.

```bash
npm run fund-master-wallet
```

### Make Endpoint Publicly Accessible

**config.json** defines an [endpoint](../protocols/request-response/endpoint.html) named `coinMarketData`, whose [endpointId](../protocols/request-response/endpoint.html#endpointid) is `0xf466b8feec41e9e50815e0c9dca4db1ff959637e564bb13fefa99e9f9f90453c`. 

Endpoints are not publicly accessible by default. Run the command **update-authorizers** to set your endpoint's [authorizers](../protocols/request-response/authorizer.html) to `[0x0000000000000000000000000000000000000000]`, which makes it [publicly accessible](../guides/provider/setting-authorizers.html#allow-all):

```bash
npm run update-authorizers
```

<!------------>
<!-- Step 2 -->
<!------------>

## Step 2: Make a request

The scripts in this section will use the Airnode created in *Step 1*. Otherwise, it will a default (pre-deployed) Airnode. It uses the **providerId** in [parameters.js](https://github.com/api3dao/airnode-starter/blob/main/src/parameters.js). Note that the endpointId will be the same either way because it is derived from the [OIS and endpoint name](../protocols/request-response/endpoint.md#endpointid).

### Create Requester

Run the following to create an on-chain [requester](https://github.com/api3dao/api3-docs/blob/master/request-response-protocol/requester.md) record. Use the requester, denoted with an index, in other projects as well. Note that **requesterIndex** is chain-specific, create another requester record for other chains.

```bash
npm run create-requester
```

### Deploy Client Contract

Run the following to deploy the contract **/contracts/ExampleClient.sol** from the airnode-starter project.

```bash
npm run deploy-client
```

### Endorse Client

Run the following command to [endorse](../protocols/request-response/endorsement.md) your deployed [client](../protocols/request-response/client.md) contract using the requester created above.

```bash
npm run endorse-client
```

### Derive/Fund Designated Wallet

First run the following to derive a [designated wallet](../protocols/request-response/designated-wallet.md) for the provider–requester pair:

```bash
npm run derive-designated-wallet-address
```

Next fund the designated wallet with 0.1 ETH. The requests that the client contract will make will be funded by this 0.1 ETH. It may be necessary to run **fund-designated-wallet** again if you make too many requests and use up this 0.1 ETH (unlikely on Ropsten because the gas price is low).

```bash
npm run fund-designated-wallet
```

### Make Request

Run the following command to make a request which will be fulfilled by the Airnode and printed out on the terminal. Note the price is now on-chain, you can use it in your contract to implement any arbitrary logic.

```text
npm run make-request
```

Try replacing the **coinId** value in [make-request.js](https://github.com/api3dao/airnode-starter/blob/main/scripts/make-request.js) from **ethereum** to **bitcoin** and make another request. You can see the API docs to see which coin IDs are supported.

## Remove the Airnode

Because the Airnode is *set-and-forget*, it is easy to forget that it is still functioning. To remove it, go to `config/` directory and use the command below where `$RECEIPT_FILENAME` is replaced with the name of your receipt file ending with `.receipt.json` (you can refer to the [Docker instructions](https://github.com/api3dao/airnode/blob/master/Docker.md) for more information).

```sh
# Interact with the deployer from the /config directory
cd /config

docker run -it --rm \
  --env-file .env \
  --env COMMAND=remove-with-receipt \
  --env RECEIPT_FILENAME=$RECEIPT_FILENAME \
  -v $(pwd):/airnode/out \
  api3/airnode:latest
```

## Conclusion

You deployed an Airnode, made a request to it and received the response at the contract. If you want to learn more, see the following resources:

* [API3 whitepaper](https://github.com/api3dao/api3-whitepaper) will give you a broad overview of the project
* [Medium posts](https://github.com/api3dao/api3-docs/blob/master/medium.md) are a more digestible version of the whitepaper
* [airnode-admin](https://github.com/api3dao/airnode-admin) lets you interact with the Airnode contract \(to create a request, endorse a client, etc.\) using a CLI tool
* [Airnode client examples](https://github.com/api3dao/airnode-client-examples) demonstrate different request patterns that the Airnode protocol supports (for example, we used a full request in this starter project).
