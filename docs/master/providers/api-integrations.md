---
title: API Integration
---

# {{ $frontmatter.title }}

To integrate a System X to a System Y, we need to do three things:

Specify the interface of System X
Specify the interface of System Y
Specify how the interface of System X maps to the interface of System Y
Oracle Integration Specifications (OIS) are designed to follow these exact steps:

API operations are specified
Oracle endpoints are specified
Oracle endpoints are mapped to API operations
Therefore, the only thing you need to do to integrate an API to Airnode is to create an OIS. You can do this simply by reading the OIS docs and creating the OIS for your specific API and use-case. This guide aims to follow a more instructive approach and give some tips along the way. Make sure to refer to the OIS docs when you need further details, and you can also refer to the OAS 3.0.3 docs about fields related to API specifications.

OIS Template

We will be working on the OIS template, so first download that and let us go over the notation. An OIS is a JSON file. This guide will assume that you are already familiar with the JSON format, but you can probably work off of the OIS template even if this is the first time you are using it.

In the OIS template, there are some fields that contain {FILL_*}. This means that the value you will be replacing this with is independent from the other fields. On the other hand, if two fields contain the same expression (e.g., {FILL_OPERATION_PARAMETER_1_NAME}), you must use the same value in them, because they are referencing each other.

Step 1: Specifying the API

OIS uses a simplified version of the OpenAPI Specification. This means that if you have the OpenAPI/Swagger specifications of the API that you are going to integrate, you are about 80% done, because you can copy paste entire sections (but make sure that you make the necessary modifications to conform to the OIS format). At the moment, we do not have a tool that converts OpenAPI specifications to OIS automatically. If you would like to help build this, please join the conversation in this issue.

Let us quickly specify the OIS first:

oisFormat: Leave this as 1.0.0, which is the current OIS format version.
title: This is the title of your OIS. Note that an Airnode can only serve one OIS of the same title. Therefore, make sure that you pick a name unique to the integration you are doing. For the purposes of this guide, you can simply use the name of your API.
version: This is the version of this specific OIS, and is for you to be able to version-control your integrations. You are recommended to use semver for this, so your initial version could be 0.1.0.
Now we can move on to specifying the API under apiSpecifications. This guide will continue assuming you do not have the OpenAPI specifications of the API that you will be integrating.

Base URL

The first step of specifying your API is to enter its base URL under apiSpecifications.servers.0.url, but let us talk about base URLs and paths before that. Say this is the full URL you want the API calls to be made to:

https://www.myapi.com/v1/getdata
There are two ways to segment this:

Base URL: https://www.myapi.com
path:     /v1/getdata
or

Base URL: https://www.myapi.com/v1
path:     /getdata
because the call will be made to base URL+path, and thus both will result in the same full URL.

Set your base URL as the section of the full URL that you expect to be shared by all operations. In the example above, we would recommend using https://www.myapi.com, in case additional paths starting with /v2 get added to the API in the future. As you can tell, API integration requires many subjective choices, and is more art than science.

Paths

An API operation is specified by a path and a method. For example:

path:     /v1/getdata
method:   GET
Here, GET refers to an HTTP request method. This implies that we could have had another API operation that can be specified as:

path:     /v1/getdata
method:   POST
Then, a path is not enough to specify an operation by itself, we must also provide its method.

In the OIS template, we have a paths object with a single element. This means that the OIS template specifies only one API operation, but you can have more simply by adding more elements to that object. The name of the element (denoted as {FILL_PATH}) should be replaced with the path (e.g., /v1/getdata). Similarly, {FILL_METHOD} should be replaced with the method of the operation you want to integrate (e.g., GET).

Path parameters

Some API operations have path parameters such as the following

/price/{coinId}
This means that calling the /price/ethereum path will return the Ethereum price, calling the /price/bitcoin path will return the Bitcoin price, etc.

These path parameters are given in curly braces in the path, and must also be defined as operation parameters with the same name, and their in field defined as path. A request that maps to this operation and does not define this path parameter will be errored.

Operation parameters

After specifying the path and method of an operation, the final step is to specify its parameters. Each parameter is an object in apiSpecifications.path.{PATH}.{METHOD}.parameters, with the fields in and name. in tells where the parameter goes in the HTTP request to the API, and name tells the name that the parameter value will be sent under.

Note that you do not have to specify all operation parameters, but only the ones that you want the on-chain requester to be able to provide (see endpoint parameters), and the ones that you want to hardcode a value to (see fixed operation parameters).

Security schemes

As a final step, we need to specify the security schemes of the API. Usually, this means telling Airnode where the API key goes, and under what name. Note that we will not be entering the API key itself in the OIS, because the OIS is not meant to include any user-specific information. Security credentials such as API keys go in security.json.

First, name the security scheme by replacing {FILL_SECURITY_SCHEME_NAME} under apiSpecifications.components.securitySchemes. Note that you will also need to use the same name under apiSpecifications.security. Make sure to choose a descriptive name, such as myapi_apikey. This name will also be referred to in security.json.

Next, fill in type, name and in by referring to the components section of OIS. OAS 3.0.3 docs is also a good source for further details.

As noted above, make sure to insert the name of your security scheme under apiSpecifications.security. Furthermore, similar to API operations, you can use multiple security schemes simply by duplicating the one provided in the OIS template (e.g., an API key goes in the header, and an additional user ID goes in the query). Similarly, if the API you are integrating is publicly accessible, you can remove all security schemes.

Congratulations, you have just specified your API operations! Now let us move on to the part that will be exposed to the chain.

Step 2: Specifying the endpoints

An endpoint is a service that Airnode exposes to on-chain clients. It maps to an API operation, but the nature of this mapping is customizable. Then, it is the integrator's job to define what this service is.

For example, if your API operation returns an asset price given its ticker (e.g., BTC), you can specify the endpoint such that the requester provides the ticker as a parameter. The resulting endpoint would be a general one that returns prices for any kind of asset. On the other hand, you can hardcode BTC as the asset whose price will be returned (using fixed operation parameters), which would make your endpoint a specific one that only returns the BTC price.

The recommended endpoint definition pattern is to create an endpoint for each API operation, and allow the requesters to provide all operation parameters themselves. This results in optimal flexibility, and essentially allows the requesters to use the entire API functionality on-chain. Normally, oracle integrations strive to hardcode as many API parameters as possible because passing these parameters on-chain results in a gas cost overhead. However, the Airnode protocol uses templates (not to be confused with the OIS template we are using for this guide), which allow requesters to specify a large number of endpoint parameters at no additional gas cost.

Note that there are some cases where you may not want to map endpoints to API operations one-to-one. For example, the API operation may have a parameter, responseFormat, that can take the values JSON/XML and determines in which format the API will respond to the call. Airnode expects responses to be in JSON format, and thus hardcoding this parameter as JSON would be more suitable than letting the requester decide, as there is only one valid choice. Again, the integrator's job is to be aware of these subtleties and use judgement.

After this brief detour, let us get back to filling in our OIS template.

endpoints is a list, with each endpoint represented as an object under it. In the OIS template, there is only one endpoint defined but you can add more, just like the API operations. The first field you need to fill in is name. Make sure that it is descriptive, and that multiple endpoints do not have the same name. If you are integrating API operations to endpoints one-to-one, using the API operation path as the endpoint name is a decent choice (i.e., the endpoint name would be /v1/getdata). Note that you would also add the method to this name if there were multiple operations with different methods for a single path.

The next step is to fill in endpoints.*.operation. Here, you need to enter the path and method of an API operation you have defined in apiSpecifications.paths, which means that requests to this endpoint will have the Airnode call the respective API operation.

fixedOperationParameters

It is common to need to hardcode API parameters (recall the JSON/XML example above). We call such hardcoded parameters "fixed operation parameters".

In the OIS template, we have one fixed operation parameter under endpoints.*.fixedOperationParameters, and it refers to the first operation parameter. This means that whenever the Airnode receives a request for this endpoint, the respective API call will be made with that operation parameter set to endpoints.*.fixedOperationParameters.*.value.

An endpoint can have multiple fixed operation parameters. An operation parameter cannot be both in fixedOperationParameters and parameters.

reservedParameters

The requester can provide some parameters that are not mapped to API operation parameters. These parameters are called "reserved parameters", and their names start with an underscore. See the related OIS docs for more information.

The current list of reserved parameters are _type, _path and _times. See the reserved parameters guide to see what each of these parameters are for. In most cases, all three should be defined as reserved parameters with no fixed/default values, as doing so provides the requester with the most flexibility.

parameters

Endpoint parameters map to API operation parameters that the requester is allowed to provide values for. It refers to an API operation (similar to a fixed operation parameter) through its field operationParameter. You can also provide default values for endpoint parameters, though this is not recommended in most cases.

Endpoint parameters have a name field, which does not have to be the same as the API operation parameter that they map to. As a separate note, an endpoint can have multiple parameters.

Conclusion

This was all! We specified the API operations and endpoints. Each endpoint maps to an API operation, and each endpoint parameter maps to an API operation parameter. The resulting OIS includes no user-specific information, which means that you can share it for others to easily provide the same services (for example, to set up a third-party oracle network).

Note that there was some subjectivity while defining the endpoints. This means that two different OISes can exist for the same exact API, differing based on how the integrators designed the interface that the requester will use. However, in most cases, one would simply map API operations to endpoints directly, and let the requester provide all API operation parameters through the endpoint parameters. At the moment, we do not have a tool that generates an endpoints list that maps to apiSpecifications.paths one-to-one. If you would like to help build this, please join the conversation in this issue.