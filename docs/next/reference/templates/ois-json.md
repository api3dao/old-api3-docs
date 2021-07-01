---
title: ois.json
---

# {{$frontmatter.title}}

An OIS (Oracle Integration Specifications) json object is a field in an Airnode's config.json file.

In the OIS template, there are some fields that contain {FILL_*}. This means that the value you will be replacing this with is independent from the other fields. On the other hand, if two fields contain the same expression (e.g., {FILL_OPERATION_PARAMETER_1_NAME}), you must use the same value in them, because they are referencing each other.

<<< @/docs/next/reference/code/template-ois.json
