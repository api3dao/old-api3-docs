---
title: Zip Tutorial Files
---

# {{$frontmatter.title}}

The directory structure for the tutorial `/src` folders have been changed to
mimic the actual project the reader will download. Therefore it is easier to
compress the project folders (e.g., `/quick-deploy-aws`) in place, rename the
zip files and move them to `/docs/.vuepress/public/assets/zip-files/...`. Using
this method also allows for an individual zip file to be updated.

```
public
└── zip-files
    └── quick-deploy-aws
        ├── quick-deploy-aws-v0.3.zip
        ├── quick-deploy-aws-v0.4.zip
        ├── quick-deploy-container-v0.3.zip
        ├── quick-deploy-container-v0.4.zip
        ├── quick-deploy-gcp-v0.3.zip
        └── quick-deploy-gcp-v0.4.zip
```
