---
title: Create a Deployment
---

<TitleSpan>How to Guides</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3,4]" />

There are a few things needed before creating a deployment:

- Acquire cloud provider account such as AWS or GCP.
- Acquire a blockchain provider account for the networks required.
- Install Docker.

Select the **Deploy** menu in the navigation bar on the left side of the page.
Then select the **New Deployment** button. ChainAPI will step-you-through the
deployment process. <br/> <img src="../assets/images/new-deployment.png"
  width="17%"/>

## New Deployment

The deployment will use an [integration](./integrations.md) you have already
created to define and deploy an Airnode to a cloud provider of your choice.

<div style="margin-left:30px;">

### Name

Name the deployment. You won’t able to change this after saving the deployment.

### Cloud Provider Settings

Select the desired cloud provider and the region the Airnode should be deployed
to. Additionally, decide which Airnode version to use.

</div>

## Add APIs and Networks

Here you will define the integration to use and which networks (chains) the
Airnode will respond to.

<div style="margin-left:30px;">

### APIs

Select the desire integration.

### Networks

Select the desired network (chain) that the Airnode will respond to.

### No. of provider

How many blockchain providers does the integration use.

</div>

## Review Configuration

Review the deployment configuration before continuing. Go back to make changes.

## Download and Deploy

Here you will download the required deployment files to perform final editing of
the required secrets.

<div style="margin-left:30px;">

### Download files

These files are needed to deploy your Airnode. Inside the zip file, you will
find a README, a file based on your cloud provider selection, config folder, and
output folder.

### Edit files

Use the instruction in the README and comments in the other files to add secrets
that the `config.json` file will read.

### Use Docker container to deploy your Airnode

Copy and paste the commands below to your terminal at the directory with your
config.json and secrets.env files.

:::warning Please note

Complete one deployment at a time. Starting multiple, simultaneous deployments
will fail and need to be removed manually through your cloud provider’s web
interface.

:::

:::: tabs

::: tab Linux/Mac/WSL2

```
docker run -it --rm \
      --env-file aws.env \
      -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
      -v "$(pwd)/config:/app/config" \
      -v "$(pwd)/output:/app/output" \
      api3/airnode-deployer:0.6.4 deploy
```

:::

::: tab Windows

```
docker run -it --rm ^
      --env-file aws.env ^
      -v "%cd%/config:/app/config" ^
      -v "%cd%/output:/app/output" ^
      api3/airnode-deployer:0.6.4 deploy
```

:::

::::

### Check deployment status

Once your deployment is completed, its status will change to either Active or
Timed Out. If your deployment is Active, that means that we have received the
Airnode heartbeat and your Airnode is active. If it’s Timed Out, something went
wrong and you should start by checking the Deployment Checklist below, and check
docker for any errors during deployment.

<span style="margin-left:40px;border:solid 1px gray;"><img src="../assets/images/deployment-status.png" width="47%" /></span>

<!--If successfully completed, your deployment’s status will become Active within 1
minute. If your deployment is not active after clicking "Finish deployment",
check your cloud provider logs and configuration details before redeploying.-->

</div>

## Finish Deployment

Click on the **Finish Deployment** button after you have completed the
deployment. This will take you to your list of deployments and display their
statuses.

<!-- Still need: Downloading and editing files (folder structure) The readme (display
the actual readme in the documents page Add explanation for what a blockchain
provider does Recommend multiple blockchain providers and explain what happens
when one goes down (the why)

Managing an existing deployment How adding / removing / changing APIs version
will impact your Airnode How will adding or changing your network impact your
Airnode How to delete a deployment (use docker) Deployment ReadMe (generalized
readme)-->
