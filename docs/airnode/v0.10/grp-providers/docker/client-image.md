---
title: Airnode Client Image
docSetName: Airnode v0.10
folder: API Providers > Docker Images
basePath: /airnode/v0.10
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Usually the Airnode is deployed on a serverless platform using the
[deployer](./deployer-image.md). However, there is another option which is to
run the Airnode in a docker container on your machine locally, on premise or
cloud hosted.

A docker client image has been published on
[Docker Hub](https://hub.docker.com/r/api3/airnode-client). If you want to build
the container from the source yourself, you can find the image and built
instructions in the
[Airnode repository](https://github.com/api3dao/airnode/tree/v0.10/packages/airnode-node/docker).

## Configuration

The Airnode needs two configuration files for its run: `config.json` and
`secrets.env`. These files need to be passed to the Docker container via
volumes.

The Docker container looks for configuration files mounted internally in the
`/app/config` directory.

Your current working directory should contain the configuration files above and
you bind it to the `/app/config` directory for the docker using the `--volume`
parameter.

:::: tabs

::: tab Linux/Mac/WSL2

```sh
$ tree
.
├── config.json
└── secrets.env
$ docker run --volume $(pwd):/app/config ...
```

:::

::: tab Windows PowerShell

```powershell
$ tree
.
├── config.json
└── secrets.env
$ docker run --volume $(pwd):/app/config ...
```

:::

::: tab Windows CMD

```batch
$ tree
.
├── config.json
└── secrets.env
$ docker run --volume %cd%:/config:/app/config ...
```

:::

::::

## Usage

Example directory structure and commands for running the Airnode Docker
container. The below commands are run from the depicted directory.

### Running Airnode

Use the following command to run Airnode:

:::: tabs

::: tab Linux/Mac/WSL2

```sh
docker run \
  --volume $(pwd):/app/config \
  --name airnode \
  api3/airnode-client:0.10.1
```

:::

::: tab Windows PowerShell

```powershell
docker run \
  --volume $(pwd):/app/config \
  --name airnode \
  api3/airnode-client:0.10.1
```

:::

::: tab Windows

```batch
docker run ^
  --volume %cd%:/app/config ^
  --name airnode ^
  api3/airnode-client:0.10.1
```

:::

::::

> If you want to connect Airnode to a blockchain running on localhost, you need
> to make the blockchain accessible from within the docker itself. If you use
> docker for linux you can use `--network="host"` parameter. If you are using
> Docker Desktop (on any platform), connect to
> `http://host.docker.internal:8545` instead of `http://127.0.0.1:8545`. See
> [https://stackoverflow.com/a/24326540](https://stackoverflow.com/a/24326540).

### Checking Airnode logs

Logs will be output to the console after running the above command. If you
decide to run Airnode in detached mode with `--detach`, you need to use the
`logs` command, optionally with `--follow`, to access the logs.

```bash
docker logs --follow airnode
```

## Stopping Airnode

```bash
docker stop airnode
```
