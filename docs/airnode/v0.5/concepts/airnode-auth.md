---
title: Airnode Authentication
---

<TitleSpan>Concepts and Definitions</TitleSpan>

# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

API providers can instruct Airnode to authenticate requests to their endpoints.
This is done by setting up a security scheme in the config.json file for their
Airnode. Airnode supports three methods of authentication from the OpenAPI
specification.

> ![airnode-auth](../assets/images/concepts-airnode-auth.png)

[OAS OpenAPI Specification](https://swagger.io/docs/specification/authentication/)
uses the term **security scheme** for authentication and authorization schemes.
Airnode only uses standard OAS defined authentication schemes to identify itself
to API endpoints. Airnode supports two types of authentication, `http` and
`apiKey`.

- HTTP authentication schemes (using the `Authorization` header) supported by
  Airnode:
  - [Basic](https://swagger.io/docs/specification/authentication/basic-authentication/)
  - [Bearer](https://swagger.io/docs/specification/authentication/bearer-authentication/)
- [API key](https://swagger.io/docs/specification/authentication/api-keys/) in
  the request header, cookie in header or query string

How Airnode sends the authentication data is explained in the sections **Basic,
Bearer and API Key** below.

## Basic

Basic authentication is a simple authentication scheme built into the HTTP
protocol. The Authorization request header contains the Base64-encoded username
and password, separated by a colon. When handling the request, the server
decodes the login details and checks if the user can access the requested
content.

The header field is in the form of `Authorization: Basic <credentials>` where
`credentials` is the Base64 encoding of a username and password joined by a
single colon (`airnode:airnode-password`).

`Authorization: Basic <credentials>`

```sh
curl -H "Authorization: Basic YW5kZXJzb25AZ21haWwuY29tOjEyM215cGFzc3dvcmQ=" \
 -X GET https://mydao.com?token=API3
```

## Bearer

Bearer authentication (also called token authentication) is an HTTP
authentication scheme that involves security tokens called bearer tokens. The
API provider supplies a token used by Airnode to authenticate itself to API
endpoints.

The header field is in the form of `Authorization: Bearer <token>`.

```sh
curl -H "Authorization: Bearer RZ8Y65TG" \
  -X GET https://mydao.com?token=API3
```

## API Key

Some APIs use an `apiKey` for authentication. The API provider supplies an
`apiKey` used by Airnode to authenticate itself to API endpoints. Airnode can
send the `apiKey` three ways.

```sh
# In the query string.
curl -X GET https://mydao.com?api_key=abcdef12345&token=API3

# In the request header.
curl -H "X-API-KEY: abcdef12345" \
  -X GET https://mydao.com?token=API3

# As a cookie in the request header.
curl -H "Cookie: X-API-KEY:abcdef12345" \
  -X GET https://mydao.com?token=API3
```
