---
title: Structure
docSetName: Operations
folder: Operations Repository
basePath: /operations
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<!--TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" /-->

[Operations](https://github.com/api3dao/operations) uses the
[Zod validation system](https://github.com/colinhacks/zod) for both validation
of the repository schema and as a type system. This ensures strong consistency,
which prevents consuming applications from malfunctioning due to schema changes.

The validation rules are centralised in
[`/src/utils/validation.ts`](https://github.com/api3dao/operations/blob/main/src/validation/validation.ts).
The Operations repository is our single source of truth, and therefore the code
always takes precedence over this documentation.

The `main` branch of operations is considered to be our production state.
Consumers should expect `main` to be free from errors and usable.

Operations implements some concepts from relational database design, especially
one-to-many relationships. Examples of some of these relationships:

- `logos` in `beaconMetadata` reference `commonLogos` in `explorer`
- `beacons` in each api provider references `templates` in the same api provider
- `dapi-metadata` in `explorer` references all `beacons`
- and so on.

These relationships are codified and enforced in the Zod validation schema.

The data structure of Operations is as follows:

- /data
  - apis
    - (provider name, e.g. Amberdata)
      - beacons (information about live beacons)
        - (the name of a beacon)
      - deployments
        - YYMMDD-HHMM (UTC)
          - airnode/airkeeper
            - aws/gcp
              - (config files)
      - ois
        - amberdata-1.0.0.json
      - templates
        - (templates that back beacons)
      - apiMetadata.json
        - (metadata, such as name, description, homepage, etc.)
  - chains (information about chains we serve)
    - (the name of the chain)
      - (details such as name, id, native token, etc.)
  - dapis (metadata around dAPIs on chain)
    - (chain name)
      - (mappings between dAPI names and target beacons)
  - explorer (metadata used for the UI rendering of beacons)
    - beaconMetadata.json
      - stores metadata around beacons for display, largely targeting the API3
        Market
      - this metadata can include pre and postfix symbols, logos and number of
        decimal places
    - beaconSets.json
      - describes the mappings of beaconSet IDs and their constituent beacons
    - commonLogos.json
      - lists mappings between logo names and URLs from which they can be loaded
    - dapiMetadata.json
      - metadata around dAPIs, like their pricing and coverage options
    - pricingCoverage.json
      - describes pricing and coverage options
  - policies
    - (chain name)
      - dapis
        - files describing active dapi subscriptions
      - dataFeeds
        - files describing active dapi subscriptions
- /src
  - tools for parsing, validating, writing, testing and generating config from
    Operations
