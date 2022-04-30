---
title: Validator
---

<TitleSpan>Packages</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

The
[airnode-validator](https://github.com/api3dao/airnode/tree/v0.6/packages/airnode-validator)
is used internally by the [Docker Images](../../grp-providers/docker/) to
validate the
[configuration files](../../grp-providers/guides/build-an-airnode/configuring-airnode.md)
you provide when deploying an Airnode.

However, validator can also be used as a standalone package to verify the
correctness of the configuration files without deploying the Airnode. The
recommended way is to use the [validator CLI](./validator.md#cli-usage), but for
advanced use cases you can use the [validator SDK](./validator.md#sdk-usage).

## CLI Usage

The simplest way to run the CLI is using
[npx](https://nodejs.dev/learn/the-npx-nodejs-package-runner). Alternatively,
you can install the validator package as a dependency in your project.

```sh
npx @api3/airnode-validator --config "pathTo/config.json" --secrets "pathTo/secrets.env"
```

alternatively

```sh
# First install the package
npm install @api3/airnode-validator
# Or
yarn add @api3/airnode-validator

# Run the validator CLI
npx airnode-validator --config "pathTo/config.json" --secrets "pathTo/secrets.env"
```

### Examples

Assuming the configurations files inside the `config` directory are valid,
executing:

```sh
npx @api3/airnode-validator --config "config/valid-config.json" --secrets "config/valid-secrets.env"
```

yields:

```plain
✔ The configuration is valid
```

When there is an error during validation, the command prints out the error and
fails with a non zero status code.

```sh
npx @api3/airnode-validator --config "config/valid-config.json" --secrets "config/non-existent-secrets.env"
```

yields:

```plain
✖ Unable to read secrets file at "config/non-existent-secrets.env". Reason: Error: ENOENT: no such file or directory, open (...omitted for brevity)
```

## SDK Usage

The validator package contains an API that can be used to validate Airnode
configuration files programatically.

<!-- TODO: https://api3dao.atlassian.net/browse/AN-609 -->

### Examples

<!-- TODO: https://api3dao.atlassian.net/browse/AN-609 -->

## Build Manually

<!-- TODO: https://api3dao.atlassian.net/browse/AN-609 -->
