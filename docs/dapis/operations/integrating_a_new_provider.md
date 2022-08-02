---
title: Integrating a New Provider
folder: Operations
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<!--TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" /-->

When adding data feeds for a new provider, one will generally want to also add
those feeds to the API3 Market.

To add the feeds to the Market, you’ll need to add metadata for those feeds.
These files contain said metadata:

### `/data/explorer/beaconMetadata`

An example from beaconMetadata.json:

```json
{
  "0x0457494ad4d266a6fbdb7906793e311a0d0f0c991a30389ca35ccb0d2b062988": {
    "category": "Stock",
    "pricingCoverage": {
      "polygon": "polygon",
      "polygon-testnet": "test-pricing-set-free",
      "rsk": "rsk",
      "avalanche": "avalanche",
      "avalanche-testnet": "test-pricing-set-free",
      "bsc": "bsc"
    },
    "logos": ["STOCK-GENERIC", "USD"],
    "decimalPlaces": 2,
    "prefix": "$"
  }
}
```

### `/data/explorer/commonLogos.json`

Many data feeds will reference two or more logos. These logos usually overlap
between feeds, hence commonLogos.json:

```json
{
  "AAVE": "https://api3-market.pages.dev/images/asset-logos/AAVE.webp",
  "ADA": "https://api3-market.pages.dev/images/asset-logos/ADA.webp",
  "ALPACA": "https://api3-market.pages.dev/images/asset-logos/ALPACA.webp",
  "ATOM": "https://api3-market.pages.dev/images/asset-logos/ATOM.webp"
}
```

The logo names are referenced in beaconMetadata, as per the example above.

The actual logos are stored in the API3 Market repository; logos are small and
Cloudflare does a good job of distributing them. You can find the source logos
here:

### `/data/explorer/dapiMetadata.json`

dAPIs in the Market carry potentially different pricing compared to the data
feeds they point to, and so this is defined in the above file. An example:

```json
{
  "JOE/USD": {
    "pricingCoverage": {
      "polygon": "polygon",
      "polygon-testnet": "test-pricing-set-free",
      "rsk": "rsk",
      "avalanche": "avalanche",
      "avalanche-testnet": "test-pricing-set-free",
      "bsc": "bsc"
    }
  }
}
```

`/data/dapis/*.json`

dapis are explicitly defined in operations and the Market uses these mappings.
An example:

```json
{
  "ADA/USD": "0x8dd297503e6e8b95c979677e9e6aecfee08ee5426bea72adff2d7a797f7bd69d",
  "AXS/USD": "0x2b6c4fdf87eb7e4321115c5e04dc6dd2ae3a4e83f443c1c9f493eaa98b192a59",
  "DOT/USD": "0xc8d57dc4972714cc8754fda28fdd824faf63607b26fa7bc895006400c7298093"
}
```
