---
title: Validator
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

The airnode-validator package, know as the validator, is used by the Docker
[Airnode Deployer Image](../../grp-providers/docker/deployer-image.md) to
validate the
[configuration files](../../grp-providers/guides/build-an-airnode/configuring-airnode.md)
you provide when deploying an Airnode. You can also use the validator to check
the configuration files for correct formatting and other issues while creating
them.

<!-- TODO: Mention the convertor early around here. -->

The validator's commands can be run using
[npx](https://nodejs.dev/learn/the-npx-nodejs-package-runner), the SDK or by
manually building the validator package. Using npx is the simplest method to
interact with the validator.

- [Use the SDK](./airnode-validator.md#use-the-sdk)
- [Build and Use the Package](./airnode-validator.md#build-and-use-the-package)
- [Using npx](./airnode-validator.md#using-npx)

<!-- TODO: Before going through code examples first describe the 3 execution methods. -->

## Use the SDK

The validator package exports useful functions for validation.

```js
const validator = require('@api3/airnode-validator');
console.log(
  validator.validateWithTemplate('exampleSpecs/config.specs.json', 'config')
);

# Outputs json
{
  valid: boolean,
  messages: { level: "error" | "warning", message: string }[]
}
```

In the output `valid` is set to `true` when there are no errors, however there
could be warnings in the `messages`.

## Build and Use the Package

TODO: Desribe how here. Show one execution examples

## Using npx

The validator package can be run as an npm package using npx. This allows you to
run validator commands without installing the validator npm package or having to
manually build the validator package yourself.

```sh
npx api3-validator --template="[template]" --specs="[specsFile]"
```

## Commands

The validator is based on two primary arguments to function. The `--template`
argument describes the file type to validate. Secondly the `--specs` argument
requires a file containing the source to validate. For the `--template` argument
use one of the following values which are case-insensitive.

- apiSpecifications _or_ apiSpecs
- config
- endpoints
- OIS

The following code example is a simple validation of a config.json file.

```sh
npx api3/airnode-validator --template="config" --specs="myProject/config/config.json"
```

Templates are case-insensitive, valid templates are: `config`, `OIS`,
`apiSpecifications`/`apiSpecs` and `endpoints`:

<!-- ```sh
api3-validator --template="config" --specs="exampleSpecs/config.specs.json"
```-->

The validator will automatically validate the latest available version of
provided template, in case a specific version should be used in validation, it
can be appended to template argument:

```sh
api3-validator --template="config@0.2.2" --specs="myProject/config/config.json"
```

## Convertor (@airnode/convertor)

Built-in validator extension capable of conversions between various
specifications.

### Usage

Convertor CLI commands and SDK work the same way as validator and can be invoked
with the `api3-convertor` command:

```sh
api3-convertor --from="OAS" --to="OIS" --specs="exampleSpecs/OAS.specs.json"
```

Specification formats are case-insensitive, currently available conversions are
from `OAS` to `OIS` or from `OIS` to `config`. Version of the format can be
provided as in `api3-validator` command:

```sh
api3-convertor --from="OIS@pre-alpha" --to="config@pre-alpha" --specs="exampleSpecs/ois.specs.json"
```

### Output

On top of validator output, convertor provides an `output` object, which
contains the converted specification:

```
{
  valid: boolean,
  messages: { level: "error" | "warning", message: string }[],
  output: object
}
```

Alternatively command can be ran with argument `--specs-only`, which will return
only the converted specification.
