---
title: Integrations
folder: How to Guides
docSetName: ChainAPI
basePath: /chainapi
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Setting up an integration is the first step that is required to deploy an
Airnode. Here you will capture the required details for your existing API, which
will be used to populate the files for deploying an Airnode. See
[Deployment Files](../../airnode/v0.7/reference/deployment-files/) in the
Airnode document set for more information.

Select the **Integrate** menu in the navigation bar on the left side of the
page. Then select the **Integrate API** button. ChainAPI will step-you-through
the integration creation. <br/><br/>
<img src="../assets/images/integrate-api.png"
width="22%"/>

## New API

This section captures high-level details around your API. These details should
be helpful to anyone viewing your API and will play a role in the future
discovery of your API on ChainAPI. After completing this section click on the
**Next** button.

### Name

This field can’t be changed after completing the integration. The reason for
this is around backwards compatibility; if you were to update your integration
and redeploy your Airnode we don’t want any smart contracts to break.

### Category

This is to help developers find your API in future features.

### Description

What does your API do?

### API Documentation URL

If you have an existing and public documentation, you can enter that link here
and this’ll be helpful to developers when they try to connect to your API.

## Enter your API Specifications

The base URL to your API operations and the necessary security that Airnode must
use when calling the any API operations.

### Base URL

This is the first part of the URL to which all requests are made. The full
request URL is made up of two parts: the Base URL and the path. The paths are
captured by various (?) endpoints which we’ll get to in a second.

### Security Schemes

Typically, APIs are secured in one way or another. They can be secured by API
Keys, cookies, and OAuth. After choosing the type of security scheme, you can
specify where it will be set, we’ll say in the header, and will give the key a
name.

We will never ask for your apiKey due to security and because ChainAPI never
wants to handle your sensitive data. You will be asked to enter your apiKey when
you deploy your Airnode, but that's just between you and your cloud provider.
ChainAPI will never see that key.

## New Endpoint

### Path/Method

Endpoints are classified by path and method. Currently we support `GET` and
`POST`, but as Airnode supports the different http methods we’ll add them here.

### Endpoint Documentation

We can capture some documentation - summary, description, and an existing
external URL.

## Parameters

Airnode works by using a scheme that allows access to your parameters. When a
developer tries to access your API, they can only submit parameters that have
been allowed by you. So, we need to set those parameters here. You are free to
capture as many parameters as the endpoint requires.

### Name

The name of the parameter as it is accepted by the API operation request.

### In

Choose where that parameter will be set in the request.

- header
- path
- query

### Value Source

This can be either <b>User Defined</b>, which means that the caller can specify
whatever value they would like, or it can be <b>Fixed</b>. For <b>Fixed</b>
parameters, we hardcode a value that can't be overwritten by the user.

### Parameter Documentation

Similar to the high level details, we can also capture documentation around the
parameter. For example, is it required, the description, and the example value.

## Reserved Parameters

These are used by Airnode before submitting values back to the blockchain. There
are several restrictions around what you can and cannot handle on the
blockchain, and these are handled by the reserved parameters. Read more about
reserved parameters
[here](https://docs.api3.org/ois/v1.2/reserved-parameters.html).

::: tip Value Source

In most cases, you'll want to leave the reserved parameter's value source as
<b>User Defined</b> to allow the callers of your Airnode to decide how to store
the data on chain.

Only use the <b>Fixed</b> value source if you need to control the data that is
returned.

:::

The `_type` defines which Solidity data type the value in the response should
map to.

The `_path` defines how the values to be sent back to the blockchain should be
selected.

The `_times` parameter is useful when you’re dealing with numbers. Many
blockchains don’t support decimal values, so using this parameter multiplies the
api value by the value specified.

### Multiple Reserved Parameters

When using a <b>Fixed</b> value source, you can capture multiple reserved
parameters by using comma notation.

For example, you can capture multiple `_type` parameters as `int256,bytes32`.

You need to provide the same number of values for all reserved parameters that
use a <b>Fixed</b> value source.

Read more about multiple reserved parameters
[here](https://docs.api3.org/ois/v1.2/reserved-parameters.html#encoding-multiple-values).

---

Complete the integration by selecting the **Finish** button.
