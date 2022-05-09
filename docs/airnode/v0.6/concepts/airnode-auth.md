---
title: Airnode 身份验证
---

<TitleSpan>概念和定义</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader /> <TOC class="table-of-contents" :include-level="[2,3]" />

API供应商可以指示Airnode对其端点的请求进行认证。 这是通过在Airnode的config.json文件中设置一个安全方案来实现的。 Airnode支持来自OpenAPI规范的三种认证方法。

> ![airnode-认证](../assets/images/concepts-airnode-auth.png)

[OAS OpenAPI规范](https://swagger.io/docs/specification/authentication/)对认证和授权方案使用了**安全方案**这一术语。 Airnode只使用标准的OAS定义的认证方案来识别自己的API端点。 Airnode支持两种类型的认证， `http` 和 `apiKey`。

- Airnode支持的HTTP认证方案（使用`Authorization` header）：
  - [基本型](https://swagger.io/docs/specification/authentication/basic-authentication/)
  - [携带者](https://swagger.io/docs/specification/authentication/bearer-authentication/)
- [API key](https://swagger.io/docs/specification/authentication/api-keys/) 请求头中的cookie或查询字符串。

Airnode发送认证数据的方式，将在下面的**基本型、不记名型和API Key**部分进行阐述。

## 基本型

基本身份验证是一个简单的身份验证方案，嵌入到HTTP协议中。 授权请求头包含Base64编码的用户名和密码，用冒号隔开。 在处理请求时，服务器会对登录细节进行解码，并检查用户是否可以访问请求的内容。

头部字段的格式是：`Authorization: Basic <credentials>`，其中`credentials`是用户名和密码的Base64编码，由一个冒号连接（`airnode:airnode-password`）。

`Authorization: Basic <credentials>`

```sh
curl -H "Authorization: Basic YW5kZXJzb25AZ21haWwuY29tOjEyM215cGFzc3dvcmQ=" \
 -X GET https://mydao.com?token=API3
```

## 不记名型

不记名认证（也称为令牌认证）是一种涉及安全令牌的HTTP认证方案，称为不记名令牌。 API提供者提供一个令牌，由Airnode用来向API端点认证自己。

头部字段的格式是`Authorization: Bearer <token>`.。

```sh
curl -H "Authorization: Bearer RZ8Y65TG" \
  -X GET https://mydao.com?token=API3
```

## API Key

一些API使用`apiKey`进行身份认证。 API提供商提供一个`apiKey` ，由Airnode用来验证自己的API端点。 Airnode可以通过三种方式发送`apiKey` 。

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
