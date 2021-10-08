---
title: ois.json
---
<TitleSpan>Templates</TitleSpan>
# {{$frontmatter.title}}

An [OIS (Oracle Integration
Specifications)](../../grp-providers/guides/build-an-airnode/api-integration.html#ois-template) json object is part of
an Airnode's [config.json](../deployment-files/config-json.md) file.

In the OIS template, there are some fields that contain <FILL_*>. This means that the value you will be replacing this with is independent from the other fields. On the other hand, if two fields contain the same expression (e.g., <FILL_OPERATION_PARAMETER_1_NAME>), you must use the same value in them, because they are referencing each other.

The file below is a basic template for OIS. Note, that it might look differently for your particular use case. You can
also check out the OISes created for our [examples in Airnode
repository](https://github.com/api3dao/airnode/tree/master/packages/examples/integrations).

<<< @/docs/airnode/next/reference/code/template-ois.json

