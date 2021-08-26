---
title: Deployer image instructions
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

1. Build the Docker image
```sh
docker build . -t api3/airnode-deployer:latest
```

2. Ensure that your `.env` file looks like [.env.example](https://github.com/api3dao/airnode/blob/pre-alpha/packages/deployer/.env.example) and is the current working directory.

3. When running [deploy](deployer-image.md#deploy) your `config.json` and `security.json` must be in the current working directory.
(They are also needed for other commands temporarily.)

4. Run the image with one of the following commands:

## `deploy`

:::: tabs
::: tab Linux/Mac
  ```sh
  docker run -it --rm \
    --env-file aws.env \
    -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
    -v $(pwd)/output:/app/output \
    api3/deployer:latest deploy
  ```
:::
::: tab Windows
  ```sh
  docker run -it --rm ^
    --env-file .env ^
    --env COMMAND=deploy-first-time ^
    -v "%cd%"/output:/app/output ^
    api3/deployer:latest deploy
  ```
:::
::::

## `remove`

:::: tabs
::: tab Linux/Mac
  ```sh
  docker run -it --rm \
    --env-file aws.env \
    -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) \
    -v $(pwd)/output:/app/output \
    api3/deployer:latest remove -r output/receipt.json
  ```
:::
::: tab Windows
  ```sh
  docker run -it --rm ^
    --env-file aws.env ^
    -e USER_ID=$(id -u) -e GROUP_ID=$(id -g) ^
    -v "%cd%"/output:/app/output ^
    api3/deployer:latest remove -r output/receipt.json
  ```
:::
