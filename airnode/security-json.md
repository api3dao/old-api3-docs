# `security.json`

`security.json` is one of the configuration files used while deploying Airnode.
Unlike `config.json`, its contents are not imported to the node, but stored in AWS SSM.
These security credentials are tagged with `id`.
This `id` matches `id` from `config.json` and identifies a particular deployment.

Has three fields:
- `apiCredentials`: Keeps the values of the security scheme parameters and the necessary fields to identify them
- `masterKeyMnemonic`: Allows the node operator to import their own private key.
This field is optional.
- `id`: A UUID defined by the platform for this specific deployment (matches the corresponding `id` from `config.json`)

## `apiCredentials`

An example:
```
{
  "myOisTitle": [
    "securitySchemeName": "mySecurityScheme",
    "value": "ytbddA5wZR94KCd9"
  ]
}
```

## `masterKeyMnemonic`

A string of 12 words.

# The user flow

Here is an example `security.json` file that the platform generates (note that it does not have `masterKeyMnemonic` because we do not recommend the user to import their own private keys):
```
{
  "apiCredentials": {
    "myOisTitle": [
      "securitySchemeName": "mySecurityScheme",
      "value": <TO_BE_FILLED>
    ]
  }
  "id": "9a52131e-babd-11ea-b3de-0242ac130004"
}
```

The first option here is for the user to open `security.json` and replace `<TO_BE_FILLED>` with their API key.
Alternatively, the user may directly attempt to deploy with `security.json` and the corresponding `config.json` (which has the same `id`), where the deployment script parses `security.json` and asks for the user to provide the values of each of the security credentials.
