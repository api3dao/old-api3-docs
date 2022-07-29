---
title: Structure
folder: Operations
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<!--TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" /-->

[Operations](https://github.com/api3dao/operations) uses the
[Zod validation system](https://github.com/colinhacks/zod) for both validation
of the repository schema, but also as a type system. This ensures strong
consistency, which prevents consuming applications from malfunctioning due to
schema changes.

The validation rules are centralised in
[`/src/utils/validation.ts`](https://github.com/api3dao/operations/blob/main/src/utils/validation.ts).
The Operations repository is our single source of truth, and therefore the code
always takes precedence over this documentation.

- Operations
-
