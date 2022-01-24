---
title: Why use Airnode?
---

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

API3 embraces the ideology of a decentralized web and the power of open source.
Furthermore it believes that the
[oracle problem is ill-posed](https://medium.com/api3/the-api-connectivity-problem-bd7fa0420636)
and instead, the problem to be solved is how to connect APIs to the blockchain.
Airnode is a first-party oracle solution that addresses this problem. Like all
design decisions, however, the advantages presented below have tradeoffs that
should be understood.

## Advantages

- First-party - First-party oracles overcome the significant disadvantages of
  third-party oracle node solutions that use middlemen to deliver APIs to the
  blockchain. You can read about these in
  [this blog post](https://medium.com/api3/first-party-vs-third-party-oracles-90356e3cffe5).
- Simple - Airnode's simple "set and forget" design avoids the time, complexity,
  and cost of other third-party oracle node solutions.
- Stateless - Airnode is stateless and treats the blockchain as the single
  source of truth. This alone solves the majority of operational problems of
  traditional third-party oracle nodes while providing an overall higher level
  of simplicity.
- Transformative - By not requiring Airnode operators to own any cryptocurrency,
  API3 provides countless traditional API providers access to the rapidly
  growing blockchain market and to innovative use cases for their data. To
  enable this, Airnode protocols are designed in way that requesters (contracts
  making the requests) specify a sponsor (account that sponsors the transaction)
  to pay for the response transaction.
- Open source - Airnode and other API3 projects are developed on
  [github](https://github.com/api3dao).
- Secure - Airnode is inherently more secure than other solutions due to its
  stateless nature. Nonetheless, API3 remains highly focused on security and has
  a track record of favorable
  [external security audits](https://github.com/api3dao/api3-dao/tree/main/reports).
- Free - API3 does not charge for deploying and using Airnode. Under the AWS
  lambda free tier, operating an Airnode can even be free.

## Tradeoffs

- Requires knowledge - Some knowledge about how Airnode works is inherently
  necessary. The API provider needs to understand how to
  [configure the Airnode](../grp-providers/guides/build-an-airnode/#configuration)
  for successful deployment, while [requesters](../concepts/requester.md) need
  to understand how to make the requests. API3 aims to make this as convenient
  as possible for both parties.
- Airnode becomes a vendor - When an API provider begins using Airnode, they
  become a "vendor" and therefore forfeit some control over technical aspects of
  API delivery.
- Higher response time for requests - Airnode is designed to periodically wake
up, check for any new requests, and process them. This means that there is a
window in which Airnode "sleeps". This is generally not problematic since the
specific time a response transaction is recorded on-chain is never guaranteed
and this "sleep time" is configurable.
<!-- TODO: provide benchmarks -->

## Conclusion

The advantages that Airnode provides should greatly outweigh the tradeoffs for
the large majority of use cases.
