---
title: System Variables
---

# {{$frontmatter.title}}

<dev-ThemeConfigJson/>

Use the browser console to view the following system variables.

- $site
- $themeConfig

`$site and $themeConfig` values can be used in markdown content, inside Vue
elements such as `router-link` (expressed as `:to="$themeConfig.var`"), and
inside HTML elements such as img. They will not work inside markdown elements
such as links and images.

This will **not** work:

```md
[Link]({{$themeConfig.latestVersions.airnode}})
![Image]({{$themeConfig.imagePath}})
```

This will work:

(Airnode latest version: <router-link :to="$themeConfig.latestVersions.airnode">
{{$themeConfig.latestVersions.airnode}} </router-link>)

<!-- prettier-ignore-->
```html
<router-link :to="$themeConfig.latestVersions.airnode">
    {{$themeConfig.latestVersions.airnode}}
</router-link>
```

HTML image

```html
<img :src="$themeConfig.imagePath" />
```
