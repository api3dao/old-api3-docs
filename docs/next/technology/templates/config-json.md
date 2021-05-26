---
title: config.json
---

# {{$frontmatter.title}}

Below is a template for an Airnode's configuration file (config.json). There are some fields that contain {FILL_*}. This means that the value added is independent from other fields. On the other hand, if two fields contain the same expression (e.g., {FILL_OPERATION_PARAMETER_1_NAME}), you must use the same value in them, because they are referencing each other. There are comments in the template JSON below that denote relationships between certain field names or values. Consider the following examples.

> - `ois[0].title` is related to `triggers.request[0].oisTitle` when they share the same field name. 
> - `ois[0].title` could also show up in `environment.securitySchemes` if the `ois` record does in fact use a security scheme.

See [config.json](../deployment-files/config-json.md) under Technology > Deployment Files as a reference while building a config.json file.

<<< @/docs/next/technology/code/template-config.json
