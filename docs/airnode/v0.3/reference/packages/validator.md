---
title: Validator
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

The
[airnode-validator](https://github.com/api3dao/airnode/tree/v.03/packages/airnode-validator)
package, know as the validator, is used by the Docker
[Airnode Deployer Image](../../grp-providers/docker/deployer-image.md) to
validate the
[configuration files](../../grp-providers/guides/build-an-airnode/configuring-airnode.md)
you provide when deploying an Airnode. You can also use the validator to check
the configuration files for correct formatting and other issues while creating
them.

<!-- TODO: Mention the convertor early around here. -->

## Usage

The validator's commands can be run using
[npx](https://nodejs.dev/learn/the-npx-nodejs-package-runner), the validator SDK
or by manually building the validator package. Using npx is the simplest method
to interact with the validator.

- [Using npx](./validator.md#using-npx)
- [Use the SDK](./validator.md#use-the-sdk)
- [Build Manually](./validator.md#build-manually)

<!-- TODO: Before going through code examples first describe the 3 execution methods. -->

### Using npx

The validator package can be run as an npm package using npx. This allows you to
run validator commands without installing the validator npm package or having to
manually build the validator package yourself.

```sh
npx @api3/airnode-validator --template="config" --specs="config.json"
```

### Use the SDK

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

### Build Manually

You can clone and build the Airnode monorepo then run the validator as a yarn
script from inside the `packages/airnode-validator` directory.

```sh
# download and build the airnode monorepo
git clone git@github.com:api3dao/airnode.git
cd airnode
yarn run bootstrap
yarn run build
cd packages/airnode-validator

# execute the validator
yarn run cli:validator --template="config" --specs="exampleSpecs/config.specs.json"

# validator output
{
  "valid": true,
  "messages": []
}
```

## Examples

The validator is based on two primary arguments to function. The `--template`
argument describes the file type to validate. Secondly the `--specs` argument
which requires a file containing the source to validate.

```
npx @api3/airnode-validator --help

Options:
      --help                    Show help                              [boolean]
      --version                 Show version number                    [boolean]
  -t, --template                Path to validator template file or name of
                                airnode specification format [string] [required]
  -s, --specification, --specs  Path to specification file that will be
                                validated                    [string] [required]
```

For the `--template` argument use one of the following values which are
case-insensitive.

- [config](./validator.md#config)
- [OIS](./validator.md#ois)
- [apiSpecifications](./validator.md#apispecifications) _or_ apiSpecs
- [endpoints](./validator.md#endpoints)

The validator will automatically validate the latest available version of a
template when the template does not contain a specific version (i.e.,
`--template="config"`). If a specific version is needed it can be appended to
template argument (i.e., `--template="config@0.3"`).

### config

The following code example validates a config.json file. This is the most common
validation use case. The other templates (`apiSpecifications, endpoints, OIS`)
support fields within the config.json and must be in separate files to be
validated.

```sh
npx @api3/airnode-validator --template="config" --specs="myProject/config/config.json"
```

### OIS

The following code example validates an `ois` field that has been placed in a
file separate from its config.json file. The
[ois field](../specifications/ois.html) contains the mapping between an API and
Airnode endpoints.

```sh
npx @api3/airnode-validator --template="OIS" --specs="myProject/config/ois.json"
```

### apiSpecifications

The following code example validates an `ois.apiSpecifications` field that has
been placed in a file separate from its config.json file. The
[ois.apiSpecifications field](../specifications/ois.html#_4-apispecifications)
defines/specifies the API Airnode will call.

```sh
npx @api3/airnode-validator --template="apiSpecifications" --specs="myProject/config/apiSpecifications.json"
```

### endpoints

The following code example validates an `ois.endpoints` field that has been
placed in a file separate from its config.json file. The
[ois.endpoints field](../specifications/ois.html#_5-endpoints) are Airnode
endpoints that map to the `ois.apiSpecifications` field in config.json.

```sh
npx @api3/airnode-validator --template="apiSpecifications" --specs="myProject/config/apiSpecifications.json"
```

<!-- Convertor -->

## Convertor (@airnode/convertor)

::: danger TODO:

The convertor needs to be updated.

- Use cli:convertor and not api-convertor.
- Is there npm (npx) usage?

:::

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
