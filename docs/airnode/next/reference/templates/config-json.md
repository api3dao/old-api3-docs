---
title: config.json
---
<TitleSpan>Templates</TitleSpan>
# {{$frontmatter.title}}

Below is a template for an Airnode's configuration file. There are some fields that contain <FILL_*>. This means that
the value added is independent from other fields. On the other hand, if two fields contain the same expression (e.g.,
<FILL_OPERATION_PARAMETER_1_NAME>), you must use the same value in them, because they are referencing each other. There
are comments in the template JSON below that denote relationships between certain field names or values. Consider the
following examples.

> - `ois[0].title` is related to `triggers.rrp[0].oisTitle` when they share the same field name. 
> - `ois[0].apiSpecifications.paths[path][method].parameters[0].in` shows up in
>   `ois[0].endpoints[0].fixedOperationParameters[0].operationParameter.in`

See [config.json](../deployment-files/config-json.md) as a reference while building a config.json file.

<<< @/docs/airnode/next/reference/code/template-config.json
