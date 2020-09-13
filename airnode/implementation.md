# Airnode implementation

See the [Airnode repository](https://github.com/api3dao/airnode/) for the source code and technical documentation.
Here, we will go over high-level guidelines that were followed in implementing the initial version.

## Statelessness

Oracle nodes typically keep persistent track of the blockchain and the state of the requests they receive (i.e., at what stage of fulfillment they are at), either in-memory or in a database.
In systems terminology, they are not memoryless.
Doing so comes with many disadvantages:

1. The database becomes a single point of failure.
Making it redundant is costly and not trivial.
2. Any anomalies that happen on the blockchain (block reorgs, ommer blocks, etc.) result in the oracle node state to fall out of sync with the chain, which is not trivial to correct.
3. A highly stateful application has many edge cases.
These are difficult to cover completely and result in bugs that put the node out of operation.

These disadvantages result in an unstable oracle node, which is the essential reason why traditional oracle nodes require *professional node operators* that need to be ready to respond to incidents 24/7.
Since this is not a realistic requirement for first-party oracles, an oracle node that is designed for first-party oracles has to be stateless.

Another way to look at keeping oracle node state is this:
The blockchain (e.g., Ethereum) node that the oracle node uses already keeps the state on behalf of the oracle node.
The duplication of this responsibility also duplicates the points of failure.
Then, the oracle node should depend on the blockchain node to keep its state, which requires the protocol to be designed to fit this scheme.

### Non-idempotent operations

An API operation is idempotent if calling it multiple times has the same effect as calling it once.
For example, using a GET operation of an exchange API to get the ETH/USD price data is typically an idempotent operation.
Calling it once or more will not make any difference at the API server-side.
In contrast, using a POST operation of a remittance service provider API to send $100 to another party would be a non-idempotent operation.
Each call would send an additional $100, and thus using the operation multiple times would have a different effect than using it once.

The oracle node being stateless means that it would not be able to "remember" if it has made an API call associated with a request, and may repeat it under some conditions.
This is not an issue at the moment, because presently, oracles are only used for idempotent operations.
However, we aim for Airnode to be able to support non-idempotent operations as well, so we are researching alternative methods to achieve this while protecting the resiliency that statelessness provides.

## Fully-serverless stack

Although serverless functions are better known for scaling automatically even with extreme concurrent usage (which may also come in handy in a bright future), we use it for different reasons:

* Serverless functions are stateless.
This means that whatever problem occurs in an invocation, the next invocation will start with a clean slate.
This provides great resiliency against internal (from Airnode itself) or external (from the API, Ethereum node) bugs.
In other words, the oracle node *turns itself off and on again* very frequently, which automatically fixes the majority of the potential problems.
* Serverless functions are fully managed.
They provide the closest experience to *set-and-forget* possible.
* Serverless functions are priced on-demand.
Especially considering that Airnode will not require major concurrent usage, this will result in great cost-efficiency (and even let the user stay below [Free Tier](https://aws.amazon.com/free) limits).
* Bare serverless functions are easy to port across cloud providers using [Serverless Framework](https://www.serverless.com/), especially when their cloud provider-specific dependencies are limited.

## Approach to security

For an optimally hands-off user experience, Airnode should utilize fully-managed services whenever possible.
To allow this to be done securely, the node is designed in a defensive way.

There are two external parties that Airnode interacts with:
* **APIs:** Although Airnode is designed for first-party oracles, we also consider serving data from third-party APIs as a valid usage scenario.
In this case, calls made to all APIs are contained in separate serverless function invocations so that they cannot induce node-level failure.
* **Blockchain nodes:** Similarly, using blockchain (e.g., Ethereum) nodes run by third party service providers is considered as a valid usage scenario.
Airnode uses all providers simultaneously (i.e., not through a Quorum-based consensus or behind a load balancer) for maximum availability, which is made possible by its unique stateless design.
The interactions made with each provider is contained in a separate serverless function invocation so that a malicious provider cannot induce node-level failure.

We also recommend cloud hosting over hosting on-premises due to the superior availability of serverless functions, and also for their set-and-forget qualities.
As a precaution, redundancy on multiple cloud providers can be provisioned easily and virtually at no cost thanks to the fully-serverless design of Airnode.

[Home](/README#contents)
