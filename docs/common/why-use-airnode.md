---
title: Why use Airnode?
---

# {{$frontmatter.title}}

<TOC class="table-of-contents" :include-level="[2,3]" />

API3 embraces the ideology of decentralized web. Our repositories are open sourced for anyone to see. We truly believe
the [oracle problem is ill posed](https://medium.com/api3/the-api-connectivity-problem-bd7fa0420636) and the problem to
be solved is how to connect APIs to the blockchain and Airnode is the solution. That being said, we understand that with
all the advantages Airnode gives you, there are some disadvantages.

## Pros

- Encourage first party oracles - There are a lot of problems when the API provider chooses a third party (middleman) to
  operate the oracle node for them. You can read about these in
  [this blog post](https://medium.com/api3/first-party-vs-third-party-oracles-90356e3cffe5)
- Simple alternative for running own blockchain oracle node - Running own oracle node requires non trivial know how and
  maintenance which is costly and does not scale. Airnode on the other hand is a simple "set and forget" with minimal
  maintenance.
- Resilient - Airnode is designed to be stateless. This alone solves the majority of the problems compared to a
  traditional oracle node. Airnode treats the blockchain as the source of truth and it can not ever go out of sync.
- Airnode operator does not need to own any crypto funds - The Airnode protocols are designed in way that requesters
  (contracts making the requests) specify a sponsor (account that sponsors the transaction) to pay for the response
  transaction. This means that your service does not need to hold and deal with the cryptocurrency.
- Open sourced implementation - Airnode and other API3 projects are open sourced on [github](https://github.com/api3dao)
  for anyone to see.
- Secure - Airnode architecture is designed to be secure. Large part of security is achieved by Airnode being stateless,
  but we also take special care to make our smart contracts secure.
- Simple architecture - With Airnode being stateless, we avoid a lot of complexity that would need to be handled to
  ensure it never gets out of sync with blockchain. In its core, Airnode is a bunch of serverless functions which poll
  the blockchain for requests, making calls to the APIs and submittting response transactions back on chain.
- Free - API3 does not charge anything for using and deploying Airnode. The hosting costs depend on the platform where
  the Airnode is deployed, however deploying Airnode on AWS is free (under the limits of AWS lambda free tier).

## Cons

- Requires knowledge - Some knowledge about how Airnode works is inherently necessary. The API provider needs to
  understand how to
  [configure the Airnode](https://docs.api3.org/airnode/v1.0/grp-providers/guides/build-an-airnode/#configuration) to
  accommodate his needs. On the other hand, [requesters](https://docs.api3.org/airnode/v1.0/concepts/requester.html)
  need to understand how to make the requests for Airnode. We try to make this as convenient as possible for both
  parties.
- Airnode becomes a vendor - When the API provider starts using Airnode, it becomes a "vendor" which may be problematic
  in case the API provider realizes some limitations (imagine features) which are not aligned with our vision.
- Higher response time for requests - Airnode is designed to periodically wake up, check for any new requests and
process them. This means that there is a window in which Airnode "sleeps". Most of the times, this is not as serious
since you can not guarantee when a response transaction will be recorded on chain. However, this "sleep time" can be
significantly reduced when running your own oracle node.
<!-- TODO: provide benchmarks -->

## Conclusion

For majority of use cases, the advantages that Airnode providers outshine the mentioned disadvantages.
