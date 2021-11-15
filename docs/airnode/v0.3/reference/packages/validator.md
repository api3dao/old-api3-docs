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
- [Global Package](./validator.md#global-package)
- [Use the SDK](./validator.md#use-the-sdk)
- [Build Manually](./validator.md#build-manually)

<!-- TODO: Before going through code examples first describe the 3 execution methods. -->

### Using npx

The validator package can be run as an npm package using npx. This allows you to
run validator commands without installing the validator npm package or having to
manually build the validator package yourself.

```sh
npx -p @api3/airnode-validator api3-validator --template="config" --specs="config.json"
```

### Global Package

The validator package can be installed globally with yarn or npm. If installed
using yarn make sure yarn bin is added to `PATH`.

```sh
yarn global add @api3/airnode-validator
# OR
npm install @api3/airnode-validator -g

# execute the validator
api3-validator --template="config" --specs="config.json"
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
argument describes the content type to validate. Secondly the `--specs` argument
which requires a file containing the content to validate.

```
npx @api3/airnode-validator --help

Options:
      --help                    Show help                              [boolean]
      --version                 Show version number                    [boolean]
  -t, --template                Path to validator template file or name of
                                airnode specification format [string] [required]
  -s, --specification, --specs  Path to specification file that will be
                                validated                    [string] [required]
  -i, --interpolate             Path to .env file that will be interpolated with
                                specification                           [string]
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

You will most likely keep secrets in a file separate from the `config.json`
file. Using interpolation with an env file is supported using the
`--interpolate` argument.

```sh
npx @api3/airnode-validator --template="config" --interpolate="secrets.env" --specs="myProject/config/config.json"
```

### OIS

The following code example validates an `ois` field that has been placed in a
file separate from its config.json file. The
[ois field](../specifications/ois.html) contains the mapping between an API and
Airnode endpoints. _(interpolation with an env file is supported)_

```sh
npx @api3/airnode-validator --template="OIS" --specs="myProject/config/ois.json"
```

### apiSpecifications

The following code example validates an `ois.apiSpecifications` field that has
been placed in a file separate from its config.json file. The
[ois.apiSpecifications field](../specifications/ois.html#_4-apispecifications)
defines/specifies the API Airnode will call. _(interpolation with an env file is
supported)_

```sh
npx @api3/airnode-validator --template="apiSpecifications" --specs="myProject/config/apiSpecifications.json"
```

### endpoints

The following code example validates an `ois.endpoints` field that has been
placed in a file separate from its config.json file. The
[ois.endpoints field](../specifications/ois.html#_5-endpoints) are Airnode
endpoints that map to the `ois.apiSpecifications` field in config.json.
_(interpolation with an env file is supported)_

```sh
npx @api3/airnode-validator --template="apiSpecifications" --specs="myProject/config/apiSpecifications.json"
```

## Convertor

The convertor is useful when creating a `config.json` file. Convertor CLI
commands work the same way as the validator and can be invoked with the
`api3-convertor` command. The currently available conversions are from `OAS` to
`OIS` or from `OIS` to `config`. Specification formats are case-insensitive.

```sh
npx @api3/airnode-validator api3-convertor --from="OAS" --to="OIS" --specs="exampleSpecs/OAS.specs.json"
```

The version of the format can be provided as in `api3-validator` command.

```sh
npx @api3/airnode-validator api3-convertor --from="OIS@0.3" --to="config@0.3" --specs="exampleSpecs/ois.specs.json"
```

### Examples

There are basically four approaches you can use to create and Airnode
`config.json` file. Two are completely manual and two involve the use of the
convertor.

1. Simply creates a `config.json` file manually without the benefits of the
   validator. This file would be a single file complete with the
   [ois](../specifications/ois.md) object in it.

2. Create two files to start with: `ois.json` and `config.json`. Because the
   `ois` object is lengthy it could be advantageous to place it in a separate
   file `json` while working on it, then copy and paste its contents into
   `config.json` when ready.

3. Use the approach mentioned in option #2 above to create an `ois` object
   inside a separate `json` file. Here rather than copy/paste the `ois` object
   into `config.json` let the convertor command create a config object for you.
   Simply paste the convertor's output of the `config` object into an empty
   `config.json` file. The advantage here is that the convertor will stub out a
   new `config` object with other fields needed for the Airnode.

   ```sh
   npx @api3/airnode-validator api3-convertor --from="OIS@0.3" --to="config@0.3" --specs="my-config/ois.json"
   ```

4. Lastly the convertor can create an `ois` object from an OAS specification
   file if you have one. The OAS file must be in json format and not yaml. The
   newly created `ois` object will be outputted by the convertor for you to
   paste into a new `ois.json` file. Then, using the convertor, the `ois.json`
   file can be merged into a new `config` obj (outputted by the convertor) ready
   to paste into a new `config.json` file.

   ```sh
   # Creates the OIS object from an OAS file.
   npx @api3/airnode-validator api3-convertor --from="OAS" --to="OIS" --specs="my-config/OAS.json"

   # Create a config.json by merging an ois object.
   npx @api3/airnode-validator api3-convertor --from="OIS@0.3" --to="config@0.3"
   --specs="my-config/ois.json"
   ```

### Output

On top of validator output, the convertor provides an `output` object, which
contains the converted specification.

```json
{
  valid: boolean,
  messages: { level: "error" | "warning", message: string }[],
  output: object
}
```

Alternatively the convertor commands can be executed the with argument
`--specs-only`, which will return only the converted specification.
