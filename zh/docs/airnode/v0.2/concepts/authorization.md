---
title: Authorization
---

<TitleSpan>Concepts and Definitions</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>
<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3,4,5]" />

An Airnode can authorize requester contract access to its underlying API using two methods.

- Authorizers: Using authorizer contracts.
- Relay Metadata: Using Airnode relay metadata (`_relay_metadata`).

<divider/>

## Authorizers

When an Airnode receives a request, it can use on-chain authorizer contracts to verify if a response is warranted. Authorizers allow Airnodes to implement a wide variety of policies. Below are some examples:

- Respond to requests from sponsors that have paid their monthly subscription fee in DAI.
- Respond to individual requests for which a per-call fee has been paid in API3 tokens.
- Respond to requests made by requesters that were whitelisted by the API3 DAO.
- Respond to requests made by sponsors who have been whitelisted by the Airnode owner's backend (for example, based on PayPal payments).

A common use case for an authorizer is the [RequesterAuthorizerWithAirnode](#requesterauthorizerwithairnode) authorizer contract developed for Airnode operators to use right out-of-the-box. It allows the whitelisting of requester contracts (with or without expiration timestamps) on a per endpoint basis. This is the most common use case and may in fact satisfy the needs of many Airnodes.

The diagram below illustrates how Airnode utilizes authorizers.

> ![concept-authorizer](../assets/images/concepts-authorizers.png)
> 
> 1. <p class="diagram-line">When Airnode starts it reads its list of authorizer contracts declared in config.json.</p>
> 2. <p class="diagram-line">Airnode gathers requests from the event logs, during its run cycle.</p>
> 3. <p class="diagram-line">Airnode sends each request, along with the list of authorizer contracts, to <code>checkAuthorizationStatus()</code>.</p>
> 4. <p class="diagram-line"><code>checkAuthorizationStatus()</code> executes the <code>isAuthorized()</code> function in each authorizer contract. If any one authorizer contract returns true, then true is returned to the Airnode which in turn proceeds to fulfill the request.</p>

### Airnode Authorization Policies

Airnode provides two authorizer contracts, one of which (RequesterAuthorizerWithAirnode) can be used by any API provider. The other (RequesterAuthorizerWithManager) is meant to be used by the API3 DAO. They are detailed within this doc in sections below.

- [`RequesterAuthorizerWithAirnode`](#requesterauthorizerwithairnode)
- [`RequesterAuthorizerWithManager`](#requesterauthorizerwithmanager)

Both these authorizer contracts inherit and extend the `RequesterAuthorizer` abstract contract which also extends the `Whitelist` contract. This means that both authorizer contracts will need to whitelist requester contracts prior to make them available to an Airnode (For `RequesterAuthorizerWithAirnode` this can be done using the [admin-cli](../reference/packages/admin-cli-commands.md#requesterauthorizerwithairnode)).

The main difference between them is that `RequesterAuthorizerWithAirnode` allows the Airnode address to grant whitelisting roles for that specific Airnode. On the other hand, `RequesterAuthorizerWithManager` allows the manager address (read: the API3 DAO) to grant whitelisting roles for all Airnodes that use it.

Some common functions available are:

- `requesterIsWhitelisted`: Called to check if a requester is whitelisted to use the Airnode–endpoint pair
- `airnodeToEndpointIdToRequesterToWhitelistStatus`: Called to get the detailed whitelist status of a requester for the Airnode–endpoint pair

### Custom Authorizers

Custom authorizer contracts can implement any arbitrary authorization logic. An example might be where Airnode only responds to requests if the requester has made less than a specific number of requests to the Airnode in the last month, effectively implementing an on-chain call quota.

### Authorizer List

Airnode authorizers are listed in the config.json file at [`chains[n].authorizers`](../grp-providers/guides/build-an-airnode/configuring-airnode.md#chains). An authorizer typically checks for a single condition (has the requester made their monthly payment, is the `requester` whitelisted, etc.). Authorizers can be combined to enforce more complex policies. If any of the authorizers in the list gives access, the request will considered to be authorized. From a logical standpoint, the authorization outcomes get `OR`ed.

### Authorizer Interface

Authorizer contracts that inherit from `IAuthorizer` can be used to implement an arbitrary authorization policy based on its input parameters.

- `requestId`: bytes32
- `airnode`: address
- `endpointId`: bytes32
- `sponsor`: address
- `requester`: address

Note that the authorizer does not have to use all of the arguments, and can even decide on arbitrary on-chain criteria such as `block.number` (e.g., do not respond to anyone after block number N). An authorizer is a contract with the following interface:

```solidity
interface IAuthorizer {
    function isAuthorized(
        bytes32 requestId,
        address airnode,
        bytes32 endpointId,
        address sponsor,
        address requester
    ) external view returns (bool);
}
```

Below is an example of how to create the simplest form of an authorizer. This authorizer allows any requester contract to call the endpointId (0xf2ee...).

```solidity
contract myAuthorizer is IAuthorizer
{
  function isAuthorized(
      bytes32 requestId,
      address airnode,
      bytes32 endpointId,
      address sponsor,
      address requester
  ) external view override returns (bool) {
      bytes32 expected = 0xf2ee...;
      return endpointId == expected;
  }
}
```

### Why is an authorization scheme needed?

Airnodes need the ability to fulfill requests selectively. This is required for two main reasons:

1. The Airnode only fulfills requests made by requesters who have made payment to the Airnode owner, which allows them to monetize their services.
2. The services of the Airnode are sensitive and can only be accessed by certain requesters, e.g., who have gone through KYC.

A protocol that does not have the authorizer scheme or equivalent functionality cannot be considered as permissionless, and will not be able to achieve wide-spread adoption.

### Are authorizers required?

Authorizers are not required. An Airnode operator could use [\_relay_metadata](./authorization.md#relay-metadata) to authorize API access. And it is possible to use both authorizers and `_relay_metadata` together.

### How are authorizers implemented?

There are two main points to consider about how authorization policies are implemented:

1. If the policies are kept off-chain, the requester cannot see them or check if they satisfy them. Furthermore, the Airnode owner updating the policies (e.g., increasing the service fees) requires off-chain coordination with the requester.
2. Embedding the policies in the request–response loop results in a gas cost overhead.

Based on these considerations, Airnode uses a hybrid method. An Airnode announces its authorization policy through off-chain channels as the addresses of a list of authorizer contracts. Whenever the Airnode receives a request, it checks if it should fulfill this request by making a static call that queries this on-chain policy. Similarly, the requester can use this on-chain policy by making a static call to check if they are authorized. This scheme both allows the Airnode to set transparent and flexible policies, and this to be done with no gas overhead.

### Access (deny, allow, filter)

How authorizers impact access is based on the `chains` field of `config.json` for a given Airnode.

#### Deny All

If the Airnode wants to deny all access for a particular chain, it should not operate on it (i.e., it should not exist in the `chains` list). The below example would "deny all" to chains 1 and 3–n since they do not have entries in the `chains` field.

```json
 chains:[
   {
    id:2,
    authorizers:[],
    ...
   }
 ]
```

#### Allow All

A `chains.authorizers` list of [] means "let everyone through". In the example below chain 2 would allow access to any requester.

```json
  chains:[
    {
      id:2,
      authorizers:[]
      ...
    },
    ...
 ]
```

#### Filter All

If the Airnode wants to give access selectively, it should use one or more authorizers that implement filtering logic. In the example below the Airnode will accept requests on chain _"2"_ and the requester would be filtered by two authorizers.

```json
 chains:[
   id:2,
   authorizers:['0xcd...cd8d','0xff...d19c]
   ...
 ]
```

### RequesterAuthorizerWithAirnode

This contract implements a requester-based RRP authorizer with three types of roles

1. Whitelist expiration extender: Is allowed to extend temporary whitelisting expiration
2. Whitelist expiration setter: Is allowed to set the temporary whitelisting expiration (i.e., they can also reduce the expiration time)
3. Indefinite whitelister: Is allowed to whitelist/unwhitelist indefinitely Each Airnode's address is treated as if they have all these three roles for the respective Airnode, and they can also grant these roles to other accounts, which includes contracts that implement arbitrary business logic.

#### extendWhitelistExpiration

The `extendWhitelistExpiration()` function can be called by a whitelist expiration extender or the Airnode address to extend the whitelist expiration of a requester for the Airnode–endpoint pair.

This function emits a `ExtendedWhitelistExpiration` event with the following signature:

```
    event ExtendedWhitelistExpiration(
        address indexed airnode,
        bytes32 endpointId,
        address indexed requester,
        address indexed sender,
        uint256 expiration
    );
```

#### setWhitelistExpiration

The `setWhitelistExpiration()` function can be called by a whitelist expiration setter or the Airnode address to set the whitelisting expiration of a requester for the Airnode–endpoint pair. This can hasten expiration.

This function emits a `SetWhitelistExpiration` event with the following signature:

```
    event SetWhitelistExpiration(
        address indexed airnode,
        bytes32 endpointId,
        address indexed requester,
        address indexed sender,
        uint256 expiration
    );
```

#### setWhitelistStatusPastExpiration

The `setWhitelistStatusPastExpiration()` function can be called by an indefinite whitelister or the Airnode address to set the whitelist status of a requester past expiration for the Airnode–endpoint pair. This is useful to allow access to an API even if the expiration date has passed. For example, keep authorizing requests while a sum of API3 tokens is locked.

This function emits a `ExtendedWhitelistExpiration` event with the following signature:

```
    event SetWhitelistStatusPastExpiration(
        address indexed airnode,
        bytes32 endpointId,
        address indexed requester,
        address indexed sender,
        bool status
    );
```

#### isAuthorized

The `isAuthorized()` function will be called by AirnodeRrp to verify the authorization status of a request. This function will return true for all whitelisted requester contracts, admins and Airnode operator address.

### RequesterAuthorizerWithManager

This contract implements a requester-based RRP authorizer and assigns the API3 DAO as the manager or in other words, the highest ranking admin across all Airnodes.

The manager and the accounts that it has granted the whitelist expiration extender, whitelist expiration setter and the indefinite whitelister roles will use `RequesterAuthorizerWithManager` to whitelist requesters across all Airnodes.

#### extendWhitelistExpiration

The `extendWhitelistExpiration()` function can be called by a whitelist expiration extender or the manager to extend the whitelist expiration of a requester for the Airnode–endpoint pair.

This function emits a `ExtendedWhitelistExpiration` event with the following signature:

```
    event ExtendedWhitelistExpiration(
        address indexed airnode,
        bytes32 endpointId,
        address indexed requester,
        address indexed sender,
        uint256 expiration
    );
```

#### setWhitelistExpiration

The `setWhitelistExpiration()` function can be called by a whitelist expiration setter or the manager to set the whitelisting expiration of a requester for the Airnode–endpoint pair. This can hasten expiration.

This function emits a `SetWhitelistExpiration` event with the following signature:

```
    event SetWhitelistExpiration(
        address indexed airnode,
        bytes32 endpointId,
        address indexed requester,
        address indexed sender,
        uint256 expiration
    );
```

#### setWhitelistStatusPastExpiration

The `setWhitelistStatusPastExpiration()` function can be called by an indefinite whitelister or the manager to set the whitelist status of a requester past expiration for the Airnode–endpoint pair. This is useful to allow access to an API even if the expiration date has passed. For example, keep authorizing requests while a sum of API3 tokens is locked.

This function emits a `ExtendedWhitelistExpiration` event with the following signature:

```
    event SetWhitelistStatusPastExpiration(
        address indexed airnode,
        bytes32 endpointId,
        address indexed requester,
        address indexed sender,
        bool status
    );
```

#### isAuthorized

The `isAuthorized()` function will be called by AirnodeRrp to verify the authorization status of a request. This function will return true for all whitelisted requester contracts, admins and the meta-admin address.

<divider/>

## Relay Metadata

Airnode operators can use the [\_relay_metadata](../reference/specifications/reserved-parameters.md#relay-metadata) named reserved parameter to instruct Airnode to send metadata to an endpoint. The endpoint can then use the metadata to process and respond (or not) accordingly to the requester.

> ![concept-authorizer](../assets/images/concepts-relay-metadata.png)
> 
> 1. <span style="color:black;">When Airnode starts it reads its list of >    endpoints declared in config.json.</span>
> 2. <span style="color:black;">Airnode gathers requests from the event logs, >    during its run cycle.</span>
> 3. <span style="color:black;">Airnode includes metadata in requests to >    endpoints that have an entry of <code>\_relay_metadata</code> (set to "v1") >    in <code>endpoints[n].reservedParameters[n]</code>.</span>

This option has been implemented because sometimes the Airnode operator does not want to use on-chain authorizers.

- The parameter that authorization depends on (e.g., if the requester has paid) should not be made public.
- The Airnode operator does not want to interact with the chain to alter authorization statuses (e.g., does not want to make a transaction to whitelist a new requester, which will cost them gas fees).

Activate the sending of the metadata by adding a reserved parameter with a name of `_relay_metadata` that defaults to `v1`. Note that the use of `v1` is specific to Airnode version `v1.x.x`. The Airnode will attach the metadata in the query string for `GET` and request body for `POST`, before performing the endpoint call.

```json
// Go to: ois.endpoints[n]reservedParameters[n].name in config.json
"reservedParameters": [
  ...
  {
    "name": "_relay_metadata",
    "default": "v1"
  }
],
```

Below is a list of metadata values send to an endpoint when `_relay_metadata` is activated.

```sh
_airnode_airnode_id: '0x19255a4ec31e89cea54d1f125db7536e874ab4a96b4d4f6438668b6bb10a6adb',
_airnode_requester_address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
_airnode_sponsor_wallet: '0x1c5b7e13fe3977a384397b17b060Ec96Ea322dEc',
_airnode_endpoint_id: '0xeddc421714e1b46ef350e8ecf380bd0b38a40ce1a534e7ecdf4db7dbc9319353',
_airnode_request_id: '0xd1984b7f40c4b5484b756360f56a41cb7ee164d8acd0e0f18f7a0bbf5a353e65',
_airnode_chain_id: '31337',
_airnode_chain_type: 'evm',
_airnode_airnode_rrp: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
```
