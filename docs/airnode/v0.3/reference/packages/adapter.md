---
title: Airnode Adapter
---

<TitleSpan>Packages</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,4]" />

TODO: intro

## Installation

TODO: install docs

## Conversions

### `int256` or `uint256`

TODO: intro

:::warning Flooring

Beware that any floating point number will be **floored**. This is necessary,
because floating point numbers are not valid in solidity. To mitigate precision
loss, you can use the [`_times`](../reserved-parameters.md#times) parameter that
is sufficiently large.

For example, if the API response is a USD currency, you might want to use
`_times: "100"` to convert the value to cents.

:::

TODO: other conversions
