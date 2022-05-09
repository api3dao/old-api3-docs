---
title: 验证程序
---

<TitleSpan>软件包</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

[airnode-validator](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-validator)软件包被称为验证器，它被[Docker 镜像](../../grp-providers/docker/) 用来验证你在部署Airnode时提供的[配置文件](../../grp-providers/guides/build-an-airnode/configuring-airnode.md)。 你也可以使用验证器在创建配置文件时，检查其格式是否正确和其他问题。

## 用法

验证器的命令可以使用[npx](https://nodejs.dev/learn/the-npx-nodejs-package-runner)、安装全局npm包、验证器SDK或通过手动构建验证器包来运行。 使用npx是与验证器交互的最简单方法。

- [使用 npx](./validator.md#using-npx)
- [全局套件](./validator.md#global-package)
- [使用 SDK](./validator.md#use-the-sdk)
- [手动创建](./validator.md#build-manually)

<!-- TODO: Before going through code examples first describe the 3 execution methods. -->

### 使用 npx

验证程序包可以使用 npx 作为一个npm 软件包运行。 这允许您运行验证器命令，而不需要安装验证器npm 软件包或自己手动构建验证器软件包。

```sh
npx @api3/airnode-validator api3-validator --template="config" --specs="config.json"
```

### 全局套件

验证程序包可以用 yarn 或 npm 全局安装。 如果使用 yarn 安装，请确保yarn bin 被添加到 `PATH` 中。

```sh
yarn global add @api3/airnode-validator
# OR
npm install @api3/airnode-validator -g

# Executing the validator.
api3-validator --template="config" --specs="config.json"
```

### 使用 SDK

验证程序包导出用于验证的有用函数。 在输出中，当没有错误时，`valid`被设置为`true`，然而在`messages`中可能有警告。 验证器使用了最新的模板，除非应用了特定的模板版本。

```js
const validator = require('@api3/airnode-validator');
// Using the latest template.
console.log(
  validator.validateWithTemplate('exampleSpecs/config.specs.json', 'config')
);
// Using a versioned template.
console.log(
  validator.validateWithTemplate('exampleSpecs/config.specs.json', 'config@0.6')
);

# Outputs json
{
  valid: boolean,
  messages: { level: "error" | "warning", message: string }[]
}
```

### 手动创建

你可以克隆并构建Airnode monorepo，然后在 `packages/airnode-validator` 目录下，以yarn脚本的方式运行验证器。 参见monorepo验证器包的[README](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-validator)中的说明。

## 示例

验证器是基于两个主要参数来运作的。 `--template`参数描述了要验证的内容类型。 第二， `--specs` 参数需要包含内容的文件才能验证。

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

对于`--template`参数，请使用以下不区分大小写的数值之一。

- [config](./validator.md#config)
- [OIS](./validator.md#ois)
- [apiSpecifications](./validator.md#apispecifications) _or_ apiSpecs
- [endpoints](./validator.md#endpoints)

当模板不包含特定的版本时，验证器会自动验证模板的最新可用版本（即， `--template="config"`）。 如果需要特定版本，可以将其附加到模板参数中(如 `--template="config@0.3"`)。 你可以在Airnode monorepo的验证器包中看到不同的[模板版本](https://github.com/api3dao/airnode/tree/v0.5/packages/airnode-validator/templates)。

### config

以下代码示例验证一个 `config.json` 文件。 这是最常见的验证用例。 其他模板（`apiSpecifications, endpoints, OIS`）支持config.json中的对象，必须在单独的文件中才能被验证。

```sh
# Validates a completed config.json file using the latest template version.
npx @api3/airnode-validator --template="config" --specs="myProject/config/config.json"

# Uses the 0.6 template version.
npx @api3/airnode-validator --template="config@0.6" --specs="myProject/config/config.json"
```

你很可能将秘密保存在一个与`config.json`文件分开的文件中。 使用`--secrets`参数，支持用env文件进行插值。

```sh
npx @api3/airnode-validator --template="config" --secrets="secrets.env" --specs="myProject/config/config.json"
```

### OIS

下面的代码例子验证了一个[OIS](/ois/v1.0.0/ois.md) 对象，它被放置在一个独立于`config.json`文件的文件中。 OIS对象包含一个 API 和 Airnode 端点之间的映射。 _支持使用env文件进行插值。_

```sh
# Validates an OIS object from an ois-spec.json file.
npx @api3/airnode-validator --template="OIS" --specs="myProject/config/ois-spec.json"
```

### apiSpecifications

下面的代码示例验证一个`ois.apiSpecifications`对象，该对象被放置在一个独立于 `config.json` file and its parent object文件及其父对象 `ois`的文件中。 [ois.apiSpecifications](/ois/v1.0.0/ois.md#_4-apispecifications)对象定义/指定了Airnode将调用的API。 _支持使用env文件进行插值。_

```sh
npx @api3/airnode-validator --template="apiSpecifications" --specs="myProject/config/apiSpecifications.json"
```

### endpoints

下面的代码示例验证一个`ois.endpoints` 对象，该对象被放置在一个独立于 `config.json`文件及其父对象 `ois`的文件中。 [ois.endpoint](/ois/v1.0.0/ois.md#_5-endpoints) 对象包含 Airnode 端点，映射到 `ois.apiProcesses` 对象。 _支持使用 env 文件进行插值。_

```sh
npx @api3/airnode-validator --template="endpoints" --specs="myProject/config/endpoints.json"
```<!-- PLEASE NOTE:
THE CONVERTOR HAS BEEN COMMENTED OUT AS OF Jan 5th, 2021.


## Convertor

The convertor is useful to create an initial `config.json` file for an Airnode.
Once you create an [OIS object](/ois/v1.0.0/ois.md), the convertor can
create a config object along with the other fields that can be pasted into a
`config.json` file. The file will have areas of content that are "filled-in" for
completeness.

The currently available conversions are from (`OAS` to `OIS`) and from (`OIS` to
`config`). Specification formats are case-insensitive.

Convertor CLI commands work the same way as the validator and can be invoked
with the `api3-convertor` command. The version of the format (e.g., `@5`) can
be provided otherwise the latest version is used.

- --from: Type of object to convert (OAS or OIS).
- --to: Type of object to convert into (OIS or config).
- --spec: Source of the file containing the object to be converted.

```sh
# Creates an OIS object from an OAS specification file.
npx @api3/airnode-validator api3-convertor --from="OAS" --to="OIS" --specs="exampleSpecs/OAS.specs.json"

# Creates a config file with an OIS object embedded specifically using version 0.3.
npx @api3/airnode-validator api3-convertor --from="ois@1.0" --to="config@0.3" --specs="exampleSpecs/ois.specs.json"
```

### Usage

The following steps represent a simple workflow to create a `config.json` file
ready for final editing.

#### Step 1: (optional)

If you have manually created an [OIS object](/ois/v1.0.0/ois.md) skip this
step. In this step the convertor creates an OIS object from an OAS specification
file. The convertor outputs an OIS object. Paste the OIS object into a spec file
(e.g., `OIS.spec.json`).

```sh
 # Creates the OIS object from an OAS spec file.
 npx @api3/airnode-validator api3-convertor --from="OAS" --to="OIS" --specs="my-config/OAS.spec.json"
```

#### Step 2:

This step creates a config object from an OIS object. The OIS object could have
been created manually or by using the OAS to OIS conversion of step #1. Copy and
paste the convertor output into a file named `config.json`.

```sh
  # Create a config object with the ois object.
  npx @api3/airnode-validator api3-convertor --from="ois@1.0" --to="config@0.3" --specs="my-config/ois.json"
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

-->## 输出:

<!--The validator and its convertor implementation provide the following output. The
`output` object contains the converted specification only when using the
convertor. Alternatively the convertor commands can be executed the with
argument `--specs-only`, which will return only the converted specification.
-->

验证器提供以下输出：

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

<!--

// For convertor using --specs-only returns converted specification, (e.g., OIS object).
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
