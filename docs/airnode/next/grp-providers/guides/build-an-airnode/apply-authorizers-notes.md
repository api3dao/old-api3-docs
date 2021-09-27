```
[
  {
    "id": "1",
    "authorizers": [
       "0xeabb...C123",
       "0xCE5e...1abc"
     ],
     ...
  },
  {
     "id": "3"
     "authorizers": [
       "0xeabb...XC88",
       "0xCE5e...4jdh"
     ],
     ...
  }
]
```

So from the code above:

- If the authorizer key does not exist, then it means deny all. Which makes no sense, why have the chain in the array at all.
- If the authorizers key exists and is an empty array, this is allow all.
- If there is more than one authorizer the requester needs to only satisfy at least one of them.
  
So my questions to start with are simple.

- I assume an API Provider can write their own Authorizers? If so is there any examples?
- Does API3 provide Authorizers that are pre-written and available to all API Providers to use, such as a whitelist feature? I suspect SelfRequesterRrpAuthorizer?

---
---
> If the authorizer key does not exist, then it means deny all. Which makes no sense, why have the chain in the array at all.
> 
> 
I made the same assumption and I was wrong. In the comments of the jira ticket associated to authorizers arrays Burak said that authorizers array is still required. Therefore denyAll is implicit and the airnode operator can achieve that by (like you said) just removing the chain object.

>I assume an API Provider can write their own Authorizers? If so is there any examples?

Yes and there are 2 examples as of today:
https://github.com/api3dao/airnode/blob/beta-protocol-revision/packages/protocol/contracts/rrp/authorizers/AirnodeRequesterRrpAuthorizer.sol
https://github.com/api3dao/airnode/blob/beta-protocol-revision/packages/protocol/contracts/rrp/authorizers/DaoRequesterRrpAuthorizer.sol

Does API3 provide Authorizers that are pre-written and available to all API Providers to use, such as a whitelist feature? I suspect SelfRequesterRrpAuthorizer?
>That is also correct and the answer are the same 2 examples from above

---
---
- So AirnodeRequesterRrpAuthorizer is a usable Authorizer (can be added to chains[n].authorizers)?
- What does AirnodeRequesterRrpAuthorizer whitelist? A requesterAddress perhaps? I ask because I see a parameter of user in the code.
- Will there be an Admin CLI command to add to the whitelist of AirnodeRequesterRrpAuthorizer?

>So AirnodeRequesterRrpAuthorizer is a usable Authorizer (can be added to chains[n].authorizers)?

Yes

>What does AirnodeRequesterRrpAuthorizer whitelist? A requesterAddress perhaps? I ask because I see a parameter of user in the code.

Yes, this contract is for airnode operators to whitelist requester addresses

> Will there be an Admin CLI command to add to the whitelist of AirnodeRequesterRrpAuthorizer?
> 
I'm working on exactly this as we speak

---
---

>Makes sense. So if a API provider wants to write their own Authorizer contract it must inherit RequesterRrpAuthorizer? Obviously the answer is Yes but I could be wrong.

Right. So the flow is:
- Airnode calls checkAuthorizationStatus (or checkAuthorizationStatuses) function in ArinodeRrp. It also passes all authorizer contract addresses as params.
- AirnodeRrp loops thru the authorizer addresses array and creates a pointer to the authorizer contract using the address from the array and this interface IRrpAuthorizer ( base interface for RequesterRrpAuthorizer)
- AirnodeRrp calls isAuthorized() function on the target contract which is expected to have at least implemented the IRrpAuthorizer 
(edited)

>So Airnode just spins through chains[n].authorizers and looks for one that will approve the requester, and it only takes one approval from any one authorizer.

Airnode will send all addresses to AirnodeRrp and AirnodeRrp will be the one returning true if any of the authorizer contracts returns true. (edited) 

---
---
