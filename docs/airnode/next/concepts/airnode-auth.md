---
title: Airnode Authentication
---
<TitleSpan>Concepts and Definitions</TitleSpan>
# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

[OpenAPI](https://swagger.io/docs/specification/authentication/) uses the term security scheme for authentication and authorization schemes. Airnode only uses standard OAS defined authentication schemes to identify itself to API endpoints. Currently three schemes are supported.

- HTTP authentication schemes (using the `Authorization` header):
  - [Basic](https://swagger.io/docs/specification/authentication/basic-authentication/)
  - [Bearer](https://swagger.io/docs/specification/authentication/bearer-authentication/)
- [API key](https://swagger.io/docs/specification/authentication/api-keys/) in the request header or query string

<Fix>What about apiKeys in cookies?</Fix>

## Basic


## Bearer


## API Key

