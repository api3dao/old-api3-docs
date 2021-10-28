---
title: DAO (Api3Template.sol)
---

# {{$frontmatter.title}}

The API3 DAO contract is the core DAO contract, and it serves a coordinating and
setup role. It holds the admin role in API3's contracts including the DAO pool,
and it delegates some of this responsibility to the DAO's other contracts (its
voting apps and [Aragon Agents](https://aragon.org/agent)).

The base Aragon DAO template contract used by API3 DAO can be found
[here](https://github.com/aragon/dao-templates/blob/master/shared/contracts/BaseTemplate.sol).

See the
[Api3Template.sol](https://github.com/api3dao/api3-dao/tree/main/packages/dao/contracts)
contract code and the list of contracts it inherits from.

- BaseTemplate
