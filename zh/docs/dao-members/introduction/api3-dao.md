---
title: API3 DAO
---

# {{$frontmatter.title}}

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

API3 is governed by a Decentralized Autonomous Organization (DAO). The DAO is a collaborative effort to build, manage and monetize dAPIs at scale. To achieve this in a fully decentralized way, the incentives of the participants are reconciled through the governance, security, and [value capture utilities](dao-pool.md#token-utilities) of the API3 token.

The API3 project has a completely open, decentralized and direct governance model. Any API3 token holder can stake the DAO pool and obtain direct voting privileges in the DAO and thus participate in the governance of the project directly. In addition, stakers receive [Inflationary Rewards](dao-pool.md#inflationary-rewards) and any additional benefits that the DAO may decide on in the future. The staked API3 tokens will back an on-chain [Coverage Service](dao-pool.md#coverage-service) as collateral to provide dAPI users with quantifiable and trustless security guarantees.

The DAO votes on high-level matters such as staking incentives and collateralization, as well as grant proposals that provide DAO treasury funds to teams working in support of the DAO.

> ![dao](../assets/images/dao.png)

## DAO Structure

The DAO organizational structure is comprised of hierarchical teams and subDAOs both of which manage, streamline, and secure the success of the DAO.

### Hierarchical Teams

More granular tasks are conducted through hierarchical team structures for scalable governance.

The expected workflow is to form off-chain teams and apply for grants to execute one-time projects or continuous operations that will benefit the DAO. The team makes the grant application with a multisig that has the team members assigned as users, and the DAO grants the funds to the multisig if the grant proposal is accepted.

This team-based governance scheme is scalable in terms of gas costs, as it requires fewer proposals to be voted on at the DAO level. It is also more scalable in practical terms, as it does not require the constant attention of all governing parties to a wide variety of minute details. Furthermore, it allows critical operations such as dAPI management to be executed swiftly and based on expert opinion. As API3 operations expand, this governance hierarchy may demand additional layers in the form of subDAOs.

To learn more about hierarchical team structures
<a href="/api3-whitepaper-v1.0.2.pdf#API3%20DAO" target="_api3-whitepaper"> see
Section 5.3 of the API3 Whitepaper</a>.

### subDAO

The DAO governs by selectively allocating funds and delegating authority. When a task reaches a scale that can no longer be fulfilled by a team, it is assigned to a subDAO.

> ![dao-subdao-teams](../assets/images/dao-subdao-teams.png)

## Principles

The DAO focuses on two principles for effective governance:

- Least Privilege
- Transparency

### Least Privilege

To limit the amount of damage a malicious or incompetent team may cause, each team's authority must be constrained to a bare minimum, which is also known as the “principle of least privilege”. For example, a dAPI management team should never be able to completely recompose a dAPI that is under use, but should only be able to switch individual oracles in and out with a long enough cool-down period to discourage abuse of authority. Similarly, milestones and deliverables should be utilized to grant teams only the funds needed to carry out their specific responsibilities.

### Transparency

Each team is expected to produce sufficiently detailed progress reports that enable the DAO to evaluate team performance with respect to proposed goals. These public reports have the additional benefit of increased accountability as dAPI users and the general public can audit API3 operations.
