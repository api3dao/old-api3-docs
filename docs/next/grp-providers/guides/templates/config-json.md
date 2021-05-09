---
title: config.json
---

# {{$frontmatter.title}}

Below is a template for an Airnode's configuration file (config.json). There are comments in the JSON that denote relationships between certain field names or values. Consider the following examples.

> - `ois[0].title` is related to `triggers.request[0].oisTitle` when they share the same field name. 
> - `ois[0].title` could also show up in `environment.securitySchemes` if the `ois` record does in fact use a security scheme.

There are two types of _FILL_ values to complete while creating a config.json file.

- **{FILL_*}** - An arbitrary value that is not related to any other field. 
- **{FILL_SOME_TEXT}** - Related to at least one other field.

See [config.json](../../../technology/deployment-files/config-json.md) under Technology > Deployment Files as a reference while building a config.json file.

<<< @/docs/next/grp-providers/code/template-config.json


