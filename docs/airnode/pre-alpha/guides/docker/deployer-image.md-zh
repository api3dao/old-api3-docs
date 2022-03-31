---
title: Deployer image instructions
---

# {{$frontmatter.title}}
<VersionWarning/>
<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

1. Build the Docker image
    ```sh
    docker build . -t api3/airnode-deployer:pre-alpha
    ```

2. Ensure that your `.env` file looks like [.env.example](https://github.com/api3dao/airnode/blob/pre-alpha/packages/deployer/.env.example) and is the current working directory.

3. If you will be running [deploy-first-time](deployer-image.md#deploy-first-time) or [redeploy](deployer-image.md#redeploy), your `config.json` and `security.json` must be in the current working directory. (They are also needed for other commands temporarily.)

4. Run the image with one of the following commands:

## `deploy-first-time`

:::: tabs ::: tab Linux/Mac
  ```sh
  docker run -it --rm \
    --env-file .env \
    --env COMMAND=deploy-first-time \
    -v "$(pwd):/airnode/out" \
    api3/airnode-deployer:pre-alpha
  ```
::: ::: tab Windows
  ```sh
  docker run -it --rm ^
    --env-file .env ^
    --env COMMAND=deploy-first-time ^
    -v "%cd%:/airnode/out" ^
    api3/airnode-deployer:pre-alpha
  ```
::: ::::

## `redeploy`

:::: tabs ::: tab Linux/Mac
  ```sh
  docker run -it --rm \
    --env-file .env \
    --env COMMAND=redeploy \
    -v "$(pwd):/airnode/out" \
    api3/airnode-deployer:pre-alpha
  ```
::: ::: tab Windows
  ```sh
  docker run -it --rm ^
    --env-file .env ^
    --env COMMAND=redeploy ^
    -v "%cd%:/airnode/out" ^
    api3/airnode-deployer:pre-alpha
  ```
::: ::::

## `deploy-mnemonic`

Note that you must replace `$MNEMONIC` and `$REGION` with your values Enclose your mnemonic in quotation marks because it includes white spaces.

:::: tabs ::: tab Linux/Mac
  ```sh
  docker run -it --rm \
    --env-file .env \
    --env COMMAND=deploy-mnemonic \
    --env MNEMONIC=$MNEMONIC \
    --env REGION=$REGION \
    -v "$(pwd):/airnode/out" \
    api3/airnode-deployer:pre-alpha
  ```
::: ::: tab Windows
  ```sh
  docker run -it --rm ^
    --env-file .env ^
    --env COMMAND=deploy-mnemonic ^
    --env MNEMONIC=$MNEMONIC ^
    --env REGION=$REGION ^
    -v "%cd%:/airnode/out" ^
    api3/airnode-deployer:pre-alpha
  ```
::: ::::

## `remove-with-receipt`

Note that you must replace `$RECEIPT_FILENAME` with your value and `$RECEIPT_FILENAME` must be in the current working directory.

:::: tabs ::: tab Linux/Mac
  ```sh
  docker run -it --rm \
    --env-file .env \
    --env COMMAND=remove-with-receipt \
    --env RECEIPT_FILENAME=$RECEIPT_FILENAME \
    -v "$(pwd):/airnode/out" \
    api3/airnode-deployer:pre-alpha
  ```
::: ::: tab Windows
  ```sh
  docker run -it --rm ^
    --env-file .env ^
    --env COMMAND=remove-with-receipt ^
    --env RECEIPT_FILENAME=$RECEIPT_FILENAME ^
    -v "%cd%:/airnode/out" ^
    api3/airnode-deployer:pre-alpha
  ```
::: ::::

## `remove-mnemonic`

Note that you must replace `$PROVIDER_ID_SHORT` and `$REGION` with your values.

:::: tabs ::: tab Linux/Mac
  ```sh
  docker run -it --rm \
    --env-file .env \
    --env COMMAND=remove-mnemonic \
    --env PROVIDER_ID_SHORT=$PROVIDER_ID_SHORT \
    --env REGION=$REGION \
    -v "$(pwd):/airnode/out" \
    api3/airnode-deployer:pre-alpha
  ```
::: ::: tab Windows
  ```sh
  docker run -it --rm ^
    --env-file .env ^
    --env COMMAND=remove-mnemonic ^
    --env PROVIDER_ID_SHORT=$PROVIDER_ID_SHORT ^
    --env REGION=$REGION ^
    -v "%cd%:/airnode/out" ^
    api3/airnode-deployer:pre-alpha
  ```
::: ::::

## `remove-airnode`

Note that you must replace `$PROVIDER_ID_SHORT`, `$REGION` and `$STAGE` with your values.

:::: tabs ::: tab Linux/Mac
  ```sh
  docker run -it --rm \
    --env-file .env \
    --env COMMAND=remove-airnode \
    --env PROVIDER_ID_SHORT=$PROVIDER_ID_SHORT \
    --env REGION=$REGION \
    --env STAGE=$STAGE \
    -v "$(pwd):/airnode/out" \
    api3/airnode-deployer:pre-alpha
  ```
::: ::: tab Windows
  ```sh
  docker run -it --rm ^
    --env-file .env ^
    --env COMMAND=remove-airnode ^
    --env PROVIDER_ID_SHORT=$PROVIDER_ID_SHORT ^
    --env REGION=$REGION ^
    --env STAGE=$STAGE ^
    -v "%cd%:/airnode/out" ^
    api3/airnode-deployer:pre-alpha
  ```
::: ::::
