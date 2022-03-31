---
title: Validator
---

# {{$frontmatter.title}}

<VersionWarning/>
<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

# `@airnode/validator`

Specification files used by Airnode can be checked with [validator package](https://www.npmjs.com/package/@api3/airnode-validator) to ensure the specification is in correct format.

## CLI commands

After installation validator can be run with following command:

```sh
api3-validator --template="[template]" --specs="[specsFile]"
```

Templates are case-insensitive, valid templates are: `config`, `OIS`, `apiSpecifications`/`apiSpecs` and `endpoints`:

```sh
api3-validator --template="config" --specs="exampleSpecs/config.specs.json"
```

Validator will automatically validate the latest available version of provided template, in case a specific version should be used in validation, it can be appended to template argument:

```sh
api3-validator --template="config@1.0.0" --specs="exampleSpecs/config.specs.json"
```

## SDK

Validator package also exports helpful functions for validation.

```js
const validator = require('@api3/airnode-validator');
console.log(
  validator.validateWithTemplate('exampleSpecs/config.specs.json', 'config')
);
```

## Output

Above mentioned commands will return json in following format:

```
{
  valid: boolean,
  messages: { level: "error" | "warning", message: string }[]
}
```

`valid` is set to `true` in case there are no errors, however there can be still warnings in the `messages`.

# `@airnode/convertor`

Built-in validator extension capable of conversions between various specifications.

## Usage

Convertor CLI commands and SDK work the same way as validator and can be invoked with the `api3-convertor` command:

```sh
api3-convertor --from="OAS" --to="OIS" --specs="exampleSpecs/OAS.specs.json"
```

Specification formats are case-insensitive, currently available conversions are from `OAS` to `OIS` or from `OIS` to `config`. Version of the format can be provided as in `api3-validator` command:

```sh
api3-convertor --from="OIS@pre-alpha" --to="config@pre-alpha" --specs="exampleSpecs/ois.specs.json"
```

## Output

On top of validator output, convertor provides an `output` object, which contains the converted specification:

```
{
  valid: boolean,
  messages: { level: "error" | "warning", message: string }[],
  output: object
}
```

Alternatively command can be ran with argument `--specs-only`, which will return only the converted specification.
