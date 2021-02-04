---
title: Deploying Airnode
---

# {{ $frontmatter.title }}


After [integrating your API](/provider-guides/api-integration.md) and [creating the configuration files](/provider-guides/configuring-airnode.md), the next step is to deploy your Airnode.
Airnode comes with a [deployer](https://github.com/api3dao/airnode/tree/master/packages/deployer), which uses [Terraform](https://www.terraform.io/) and [Serverless Framework](https://www.serverless.com/) to automate the entire deployment process.
This deployer is also containerized as a [Docker](https://www.docker.com/) image, which allows you to deploy your Airnode on any platform without worrying about installing dependencies.
So let's begin!

## Installing Docker

The upside of containerizing the deployer is that you only need to install Docker.
The downside is that you need to install Docker.
Go to the [Docker website](https://docs.docker.com/get-docker/) and install it first.

## Creating cloud credentials

The deployer interacts with your cloud provider to deploy Airnode programmatically, without requiring you to click through a lot of ever-changing graphical interfaces.
For it to be able to do that, you need to give it permission.

To be able to do this, you need to create a new user in your AWS account, give it programmatic access, retrieve its access key ID and secret access keys, and feed these to the deployer.
Fortunately, this is not nearly as complicated as it sounds.
Follow [this video](https://www.youtube.com/watch?v=KngM5bfpttA), get your keys, and put them in a file named `.env` as below (values are made up, you need to replace these with your own):
```
AWS_ACCESS_KEY_ID=JSDYNDRUA1XAF2W3UGPA
AWS_SECRET_KEY=q4JiOfPP4wQOuRj01/6/7RAodTAg6lFb99IoB4XH
```
Here is an [example file](https://github.com/api3dao/airnode/blob/master/packages/deployer/.env.example) that is left blank.
Make sure that you do not push your credentials to a repository or leave them around!
These credentials can be used to gain access to your Airnode's private key.

## Deployment

Get the `config.json` and `security.json` files you have created while [configuring your Airnode](/provider-guides/configuring-airnode.md), your `.env` file with your [cloud provider credentials](#creating-cloud-credentials), and place these three files in the same directory.
Then, in this same directory, run the following command (if you are on Windows, use CMD, replace `\` with `^`, `$(pwd)` with `%cd%`):

```sh
docker run -it --rm \
  --env-file .env \
  --env COMMAND=deploy-first-time \
  -v $(pwd):/airnode/out \
  api3/airnode:latest
```

This will first download the deployer image, which may take a few minutes depending on the speed of your Internet connection.
Then, it will read your configuration files and start deployment.
This process will be entirely automatic, with the exception that at one stage, the deployer will display the mnemonic of your Airnode's private key.
Please note this down with pen and paper (do not copy paste to a text file on your computer) and keep it in a secure place.

Another point to mention is that the deployer will display your master wallet address, and ask you to deposit some ETH in it for it to create your provider record.
Follow the instructions for your Airnode to create your provider record using your master wallet, and it will send any unused ETH to the `providerAdminForRecordCreation` you have set in your `config.json`.
You can see the [docs](/request-response-protocol/provider.md#creating-a-provider-record) for more information about this process.

A couple minutes after noting down your mnemonic and hitting `ENTER`, you should be done!
The deployer will output a receipt file ending with `.receipt.json`.
This file does not include any sensitive information, so feel free to share it as needed.
The receipt contains your [`providerId`](/request-response-protocol/provider.md#provideid), `providerIdShort` and `masterWalletAddress` that you will need to fund for it to create your provider record (if you have not already).
You will need to add your `providerIdShort` to your `config.json` to be able to redeploy your node with updated configurations.

To find out how to redeploy your node or remove it from your cloud provider account, see the [deployer image docs](https://github.com/api3dao/airnode/blob/master/Docker.md).
Now, the next step is to configure the authorization policies for the endpoints you will be serving.

