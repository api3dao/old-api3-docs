---
title: API Providers
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

API3 QRNG is built on [Airnode RRP](/airnode/v0.7/concepts/), and as a result is
provider-agnostic. See below for the providers that are currently available.

## ANU Quantum Random Numbers

Website:
[https://quantumnumbers.anu.edu.au/](https://quantumnumbers.anu.edu.au/)

<!-- Need css for mobile -->
<div style="word-wrap:break-word;">
<b>Airnode address</b> / airnode

<div style="margin-top:15px;margin-left:15px">
    <code>0x9d3C147cA16DB954873A498e0af5852AB39139f2</code>
    <CopyIcon text="0x9d3C147cA16DB954873A498e0af5852AB39139f2"/>
</div>
<br/><br/>(note that this is not AirnodeRrpV0 contract address, but the address that belongs to this individual Airnode)
</div>

<!-- Need css for mobile -->
<div style="word-wrap:break-word;margin-top:25px;">
    <b>Airnode extended public key</b> / xpub
    <div style="margin-top:15px;margin-left:15px">
        <code>xpub6DXSDTZBd4aPVXnv6Q3SmnGUweFv6j24SK77W4qrSFuhGgi666awUiXakjXruUSCDQhhctVG7AQt67gMdaRAsDnDXv23bBRKsMWvRzo6kbf</code> 
        <CopyIcon text="xpub6DXSDTZBd4aPVXnv6Q3SmnGUweFv6j24SK77W4qrSFuhGgi666awUiXakjXruUSCDQhhctVG7AQt67gMdaRAsDnDXv23bBRKsMWvRzo6kbf"/>
    </div>
</div>

### Endpoint IDs

<!-- Need css for mobile -->
<div style="word-wrap:break-word;margin-top:15px;">
    Does not take any parameters. Returns one random number of type <code>uint256</code>.
    <div style="margin-top:15px;margin-left:15px">
        <code>0xfb6d017bb87991b7495f563db3c8cf59ff87b09781947bb1e417006ad7f55a78</code>
        <CopyIcon text="0xfb6d017bb87991b7495f563db3c8cf59ff87b09781947bb1e417006ad7f55a78"/>
    </div>
</div>

<!-- Need css for mobile -->
<div style="word-wrap:break-word;margin-top:25px;">
    Takes one parameter named <code>size</code> of type <code>uint256</code> (maximum value: <code>1024</code>).
    Returns <code>size</code>- many random numbers of type <code>uint256[]</code>.
    <div style="margin-top:15px;margin-left:15px;">
        <code>0x27cc2713e7f968e4e86ed274a051a5c8aaee9cca66946f23af6f29ecea9704c3</code>
        <CopyIcon text="0x27cc2713e7f968e4e86ed274a051a5c8aaee9cca66946f23af6f29ecea9704c3"/>
    </div>
</div>
