---
title: Deployer Image
---

<TitleSpan>Docker Images</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Use the deployer image to deploy or remove an Airnode with a cloud provider such as AWS. The simplest way is to use the pre-built packages. If you would rather build the images yourself see [docker README](https://github.com/api3dao/airnode/tree/master/packages/deployer/docker) in the deploy package.

The deployer image has two commands.

- `deploy`: Deploys or updates an Airnode.
- `remove`: Removes

::: tip Quick Deploy Demo
See the [Quick Deploy](../tutorial/) demo to quickly `deploy` and `remove` a pre-configured Airnode using the deployer image.
:::

## Permissions

By default, the Deployer is run by the user root. This may lead to some permission issues since the deployer image provides an output in a form of a receipt.json file. Optionally, and to avoid any permission problems, you can specify the [UID (user identifier)](https://en.wikipedia.org/wiki/User_identifier) and [GID (group identifier)](https://en.wikipedia.org/wiki/Group_identifier) that the deployer image should use. You can do that by setting the environment variables USER_ID and GROUP_ID, otherwise omit line three below (`-e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \`).

## `deploy`

The `deploy` command will create the Airnode with a cloud provider or update it if it already exists. Three files are needed to run the deploy command.

- config.json
- secrets.env
- aws.env

A `receipt.json` will be created upon completion. It contains some deployment information and is used to remove the Airnode.

:::: tabs
::: tab Linux/Mac
  ```sh
  docker run -it --rm \
  --env-file aws.env \
    -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
    -v "$(pwd)/config:/app/config" \
    -v "$(pwd)/output:/app/output" \
    @api3/deployer:latest deploy
  ```
:::
::: tab Windows
If you are using Windows, use CMD (and not PowerShell).
  ```sh
  docker run -it --rm ^
    --env-file aws.env ^
    -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) ^
    -v "%cd%/config:/app/config" ^
    -v "%cd%/output:/app/output" ^
    @api3/deployer:latest deploy
  ```
:::
::::

## `remove`

When an Airnode was deployed using the `deploy` command a `receipt.json` file was created. Use this file to remove an Airnode.

:::: tabs
::: tab Linux/Mac
  ```sh
  docker run -it --rm \
    --env-file aws.env \
    -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
    -v "$(pwd)/output:/app/output" \
    api3/deployer:latest remove -r output/receipt.json
  ```
:::
::: tab Windows
If you are using Windows, use CMD (and not PowerShell).
  ```sh
  docker run -it --rm ^
    --env-file aws.env ^
    -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) ^
    -v "%cd%/output:/app/output" ^
    api3/deployer:latest remove -r output/receipt.json
  ```
:::
