---
title: Validator
docSetName: Airnode v0.3
folder: Reference > Packages
basePath: /airnode/v0.3
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

The
[airnode-validator](https://github.com/api3dao/airnode/tree/v0.3/packages/airnode-validator)
package, known as the validator, is used by the
[Docker Images](../../grp-providers/docker/) to validate the
[configuration files](../../grp-providers/guides/build-an-airnode/configuring-airnode.md)
you provide when deploying an Airnode. You can also use the validator to check
the configuration files for correct formatting and other issues while creating
them.

<!-- TODO: Mention the convertor early around here. -->

## Usage

The validator's commands can be run using
[npx](https://nodejs.dev/learn/the-npx-nodejs-package-runner), installing a
global npm package, the validator SDK or by manually building the validator
package. Using npx is the simplest method to interact with the validator.

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
npx @api3/airnode-validator api3-validator --template="config" --specs="config.json"
```

### Global Package

The validator package can be installed globally with yarn or npm. If installed
using yarn make sure yarn bin is added to `PATH`.

```sh
yarn global add @api3/airnode-validator
# OR
npm install @api3/airnode-validator -g

# Executing the validator.
api3-validator --template="config" --specs="config.json"
```

### Use the SDK

The validator package exports useful functions for validation. In the output
`valid` is set to `true` when there are no errors, however there could be
warnings in the `messages`.

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
yarn run cli:validator --template="config" --specs="exampleSpecs/config.json"

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
                                airnode specification format           [string] [required]
  -s, --specification, --specs  Path to specification file that will be
                                validated                              [string] [required]
  -i, --secrets                 Path to .env file that will be interpolated with
                                specification                          [string]
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
# Validates a completed config.json file.
npx @api3/airnode-validator --template="config" --specs="myProject/config/config.json"

# Here (optionally) the OIS object from config.json is in a separate file.
npx @api3/airnode-validator --template="OIS" --specs="myProject/config/OIS-spec.json"
```

You will most likely keep secrets in a file separate from the `config.json`
file. Using interpolation with an env file is supported using the `--secrets`
argument.

```sh
npx @api3/airnode-validator --template="config" --secrets="secrets.env" --specs="myProject/config/config.json"
```

### OIS

The following code example validates an `ois` field that has been placed in a
file separate from its config.json file. The
[ois field](../specifications/ois.md) contains the mapping between an API and
Airnode endpoints. _(interpolation with an env file is supported)_

```sh
npx @api3/airnode-validator --template="OIS" --specs="myProject/config/ois.json"
```

### apiSpecifications

The following code example validates an `ois.apiSpecifications` field that has
been placed in a file separate from its config.json file. The
[ois.apiSpecifications field](../specifications/ois.md#_4-apispecifications)
defines/specifies the API Airnode will call. _(interpolation with an env file is
supported)_

```sh
npx @api3/airnode-validator --template="endpoints" --specs="myProject/config/apiSpecifications.json"
```

### endpoints

The following code example validates an `ois.endpoints` field that has been
placed in a file separate from its config.json file. The
[ois.endpoints field](../specifications/ois.md#_5-endpoints) are Airnode
endpoints that map to the `ois.apiSpecifications` field in config.json.
_(interpolation with an env file is supported)_

```sh
npx @api3/airnode-validator --template="apiSpecifications" --specs="myProject/config/endpoints.json"
```

<!-- PLEASE NOTE:
THE CONVERTOR HAS BEEN COMMENTED OUT AS OF Jan 5th, 2021.

## Convertor

The convertor is useful to create an initial `config.json` file for an Airnode.
Once you create an [OIS object](../specifications/ois.md), the convertor can
create a config object along with the other fields that can be pasted into a
`config.json` file. The file will have areas of content that are "filled-in" for
completeness.

Convertor CLI commands work the same way as the validator and can be invoked
with the `api3-convertor` command. The version of the format (e.g., `@0.3`) can
be provided otherwise the latest version is used.

- --from: Type of object to convert (OAS or OIS).
- --to: Type of object to convert into (OIS or config).
- --spec: Source of the file containing the object to be converted.

The currently available conversions are from `OAS` to `OIS` and from `OIS` to
`config`. Specification formats are case-insensitive.

```sh
# Creates an OIS object from an OAS specification file.
npx @api3/airnode-validator api3-convertor --from="OAS" --to="OIS" --specs="exampleSpecs/OAS.specs.json"

# Creates a config object with an OIS object embedded specifically using version 0.3.
npx @api3/airnode-validator api3-convertor --from="OIS@0.3" --to="config@0.3" --specs="exampleSpecs/ois.specs.json"
```

### Usage

The following steps represent a simple workflow to create a `config.json` file
ready for final editing.

#### Step 1: (optional)

If you have created an [OIS object](../specifications/ois.md) manually skip this
step. This step creates an OIS object from an OAS specification file. The
convertor outputs an OIS object. Paste the OIS object into a spec file (e.g.,
`OIS.spec.json`).

```sh
 # Creates the OIS object from an OAS spec file.
 npx @api3/airnode-validator api3-convertor --from="OAS" --to="OIS" --specs="my-config/OAS.spec.json"
```

#### Step 2:

This step creates a config object from an OIS spec file created either manually
or by using the OAS to OIS conversion of step #1. Copy and paste the convertor
output into a file named `config.json`.

```sh
  # Create a config object with the ois object.
  npx @api3/airnode-validator api3-convertor --from="OIS@0.3" --to="config@0.3" --specs="my-config/ois.json"
```

#### Step 3:

The newly created `config.json` file now contains five root level fields of
which the OIS object is one. Continue to edit this file to customize how your
Airnode will behave.

- [chains](../deployment-files/config-json.md#chains)
- [nodeSettings](../deployment-files/config-json.md#nodesettings)
- [triggers](../deployment-files/config-json.md#triggers)
- [ois](../deployment-files/config-json.md#ois)
- [apiCredentials](../deployment-files/config-json.md#apicredentials)

-->

## Output

<!--The validator and its convertor implementation provide the following output. The
`output` object contains the converted specification only when using the
convertor. Alternatively the convertor commands can be executed the with
argument `--specs-only`, which will return only the converted specification.
-->

The validator provides the following output.

```json
// Default output
{
  "valid": boolean,
  "messages": [
    {
      "level": "error" | "warning",
      "message": string
    }
  ],
  "output": object
}
```

<!-- // For convertor using --specs-only returns converted specification, (e.g., OIS object).
{
  "oisFormat": "1.0.0",
  "title": "myOisTitle",
  "version": "1.2.3",
  "apiSpecifications": {
    ...
  },
  "endpoints": [
    ...
  ]
}
-->
