---
title: API Authentication
---
<TitleSpan>Concepts and Definitions</TitleSpan>
# {{$frontmatter.title}}

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

<!-- https://dev.to/lucasg/how-to-use-basic-authentication-with-curl-1j6j -->

[OpenAPI](https://swagger.io/docs/specification/authentication/) uses the term security scheme for authentication and authorization schemes. 

Airnode, through its OIS object,  lets you describe APIs protected using the following security schemes:

- HTTP authentication schemes (using the Authorization header):
  - Basic
  - Bearer other HTTP schemes as defined by RFC 7235 and HTTP Authentication Scheme Registry
- API keys in headers and query string

## HTTP Basic

Option 1: Pass credentials to curl
Passing Basic credentials to curl command is easy as this:
curl -u username:password https://example.com
If your username or password contains a special character, such as white-space, then you might want to surround credentials with single quotes:
curl -u 'username:password' https://example.com

### Using the Authorization Header

If you want to have a full control over your HTTP request, you might want to Base64 encode your username:password and place it into Authorization header.

```bash
curl -H 'Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=' \
https://example.com
```

## HTTP Bearer

```bash
curl -H "Authorization: Bearer <token>"
```