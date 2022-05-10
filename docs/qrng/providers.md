---
title: API Providers
---

<TitleSpan>QRNG</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

API3 QRNG is built on [Airnode RRP](/airnode/v0.6/concepts/), and as a result is
provider-agnostic. See below for the providers that are currently available.

## ANU Quantum Random Numbers

Website:
[https://quantumnumbers.anu.edu.au/](https://quantumnumbers.anu.edu.au/)

Airnode address / `airnode` - `0x9d3C147cA16DB954873A498e0af5852AB39139f2`

Extended public key / `xpub` -
`xpub6DXSDTZBd4aPVXnv6Q3SmnGUweFv6j24SK77W4qrSFuhGgi666awUiXakjXruUSCDQhhctVG7AQt67gMdaRAsDnDXv23bBRKsMWvRzo6kbf`

### Endpoint IDs

- `0xfb6d017bb87991b7495f563db3c8cf59ff87b09781947bb1e417006ad7f55a78`

Does not take any parameters. Returns one random number of type `uint256`.

- `0x27cc2713e7f968e4e86ed274a051a5c8aaee9cca66946f23af6f29ecea9704c3`

Takes one parameter named `size` of type `uint256` (maximum value: `1024`).
Returns `size`-many random numbers of type `uint256[]`.
