---
title: Development Usage
docSetName: Operations
folder: Operations Repository
basePath: /operations
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<!--TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" /-->

This document details usage of operations in downstream projects.

Common use cases include:

- reading operations as a JSON payload and displaying the data in a UI (the API3
  Market)
- reading operations as configuration file format for collecting telemetry and
  monitoring data around beacons

Below are examples of generally reading and extracting data from operations:

### The following commands assume an empty directory and the creation of a yarn project

```shell
# Initialise the new project
yarn init
# You'll be prompted to enter various info about your project

# Install the published operations package
yarn add @api3/operations

# You may also want Typescript
yarn add typescript ts-node @types/node -D
```

Create a demo application file to execute:

```shell
mkdir scripts
touch scripts/export.ts
```

Edit scripts/export.ts

Import the dependency into your application:

```typescript
import { readOperationsRepository } from '@api3/operations/dist/utils/read-operations';

// We'll also add these dependencies for this demo to be able to write out file
import * as fs from 'fs';
import * as path from 'path';
```

Read the operations repository into a compound object:

```typescript
const operations = readOperationsRepository();
```

Write out the object to a JSON payload: (this file will contain the entirety of
operations metadata as a single JSON file)

```typescript
fs.writeFileSync(
  path.join(__dirname, '../opsexport.json'),
  JSON.stringify(operations, null, 2)
);
```

To list provider names:

```typescript
console.log(Object.keys(operations.apis));
```

To list beacons ids on a provider:

```typescript
console.log(
  Object.values(operations.apis['amberdata'].beacons).map(
    (beacon) => beacon.beaconId
  )
);
```

To find a beacon by its ID across all providers:

```typescript
const beaconIdToFind =
  '0xc7d143e56da695e6d63f9c408932378e9130486fbb1c2bb8a8a9f74c9bbdf2d2';

const beaconFull = Object.values(operations.apis)
  .flatMap((api) => Object.values(api.beacons))
  .find((beacon) => beacon.beaconId === beaconIdToFind);

console.log(beaconFull);
```

To get the deviation percentage for Airkeeper for a beaconId for chain RSK:

```typescript
console.log(beaconFull.chains['rsk'].updateConditionPercentage);
```

To get the template for that beacon:

```typescript
const templateIdToFind = beaconFull.templateId;
const templateFull = Object.values(operations.apis)
  .flatMap((api) => Object.values(api.templates))
  .find((template) => template.templateId === templateIdToFind);

console.log(templateFull);
```

<!-- markdown-link-check-disable -->

EVM chains do not have floating point variable types and therefore all decimal
values are stored as whole numbers. Airnode multiplies a decimal value from an
API endpoint with a `_times` factor. `_times` is an Airnode Reserved Parameter.
For more information, refer to the
[API3 Docs](https://docs.api3.org/ois/latest/reserved-parameters.html)

<!-- markdown-link-check-enable -->

API3 defaults to using a multiplication factor of 10^18 for most beacons, but
there may be a scenario in future where this number may not be appropriate.
Therefore, to find the multiplication factor in the associated template:

```typescript
console.log(
  templateFull.decodedParameters.find((param) => param.name === '_times').value
);
```

To get the logo of an API provider:

```typescript
console.log(operations.apis['amberdata'].apiMetadata.logoPath);
```

To get the pretty name of a beacon:

```typescript
console.log(beaconFull.name);
```

and the pretty description:

```typescript
console.log(beaconFull.description);
```

To print a list of chains and their logos:

```typescript
console.log(
  Object.values(operations.chains).map((chain) => ({
    name: chain.name,
    logo: chain.logoPath,
    dapiServer: chain.contracts.DapiServer,
  }))
);
```

Print a list of dAPIs (name->beaconId mappings) on Polygon:

```typescript
console.log(Object.entries(operations.dapis));
```

### Retrieving the Latest Data

The Operations package ships with data which will have varying degrees of
freshness. You can use `isomorphic-git` to retrieve the latest data from
operations, like this:

Add `isomorphic-git`:

```shell
yarn add isomorphic-git
```

```typescript
import * as fs from 'fs';
import * as readData from '@api3/operations/dist/utils/read-operations';
import { clone } from 'isomorphic-git';
import http from 'isomorphic-git/http/node';

const targetPath =
  process.env.OPERATIONS_CLONE_TARGET_PATH ?? '/tmp/cachedOperations';
const opsRepoReadPath = process.env.LIVE_OPS_DATA
  ? `${targetPath}/data`
  : 'node_modules/@api3/operations/data';

/**
 * Clone the main branch from the operations repository
 */
const cloneOperationsRepository = async (): Promise<void> => {
  console.log('Pulling/Cloning from Operations Repository...');

  fs.rmdirSync(targetPath, { recursive: true });
  const gitConfig = {
    fs,
    http,
    ref: process.env.OPERATIONS_GIT_BRANCH ?? 'main',
    dir: targetPath,
    url:
      process.env.OPERATIONS_GIT_URL ??
      `https://github.com/api3dao/operations.git`,
    singleBranch: true,
  };

  await clone(gitConfig);
  console.log('Done cloning from Operations Repository.');
};

const main = async () => {
  if (process.env.LIVE_OPS_DATA) {
    await cloneOperationsRepository();
  }

  const opsRepo = await readData.readAndValidateOperationsRepository(
    opsRepoReadPath
  );
  console.log(opsRepo);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```
