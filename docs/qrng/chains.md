---
title: Chains
---

# {{$frontmatter.title}}

Requests will be responded to after `minConfirmations` blocks (see
[this](https://blog.ethereum.org/2015/09/14/on-slow-and-fast-block-times/) for
context). Expect this to correspond to 1–3 minutes based on chain conditions
such as congestion and block times. These numbers are subject to change.

You can import `AirnodeRrpV0` addresses from the `@api3/airnode-protocol`
package, see the
[QRNG example project](https://github.com/api3dao/qrng-example). The
[@api3/airnode-protocol](https://www.npmjs.com/package/@api3/airnode-protocol)
package is distributed via npm.

<!-- "white-space: nowrap;" on the first row will cause the remaining rows
to not break as well.
-->
<!-- prettier-ignore -->
| Network   | Chain ID | `AirnodeRrpV0` Address                     | `minConfirmations` |
| --------- | -------- | ------------------------------------------ | ------------------ |
| ropsten   | 3        | <span style="white-space: nowrap;">0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd <CopyIcon text="0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"/></span> | 1                  |
| rinkeby   | 4        | 0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd <CopyIcon text="0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"/> | 1                  |
| goerli    | 5        | 0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd <CopyIcon text="0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"/> | 1                  |
| kovan     | 42       | 0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd <CopyIcon text="0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"/> | 1                  |
| mainnet   | 1        | 0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd <CopyIcon text="0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"/> | 6                  |
| arbitrum  | 42161    | 0xb015ACeEdD478fc497A798Ab45fcED8BdEd08924 <CopyIcon text="0xb015ACeEdD478fc497A798Ab45fcED8BdEd08924"/> | 25                 |
| avalanche | 43114    | 0xC02Ea0f403d5f3D45a4F1d0d817e7A2601346c9E <CopyIcon text="0xC02Ea0f403d5f3D45a4F1d0d817e7A2601346c9E"/> | 25                 |
| bsc       | 56       | 0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd <CopyIcon text="0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"/> | 25                 |
| fantom    | 250      | 0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd <CopyIcon text="0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"/> | 80                 |
| gnosis    | 100      | 0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd <CopyIcon text="0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"/> | 15                 |
| metis     | 1088     | 0xC02Ea0f403d5f3D45a4F1d0d817e7A2601346c9E <CopyIcon text="0xC02Ea0f403d5f3D45a4F1d0d817e7A2601346c9E"/> | 12                 |
| milkomeda | 2001     | 0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd <CopyIcon text="0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"/> | 20                 |
| moonbeam  | 1284     | 0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd <CopyIcon text="0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"/> | 6                  |
| moonriver | 1285     | 0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd <CopyIcon text="0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"/> | 3                  |
| optimism  | 10       | 0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd <CopyIcon text="0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"/> | 25                 |
| polygon   | 137      | 0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd <CopyIcon text="0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"/> | 20                 |
| rsk       | 30       | 0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd <CopyIcon text="0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"/> | 3                  |
