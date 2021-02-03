---
title: Configuring Airnode
---

# {{ $frontmatter.title }}

Users configure their Airnodes by providing a config.json and a security.json file during deployment/redeployment. config.json specifies the API–oracle integration specifications in the form of OISes, but also user-specific configuration details. security.json includes security credentials such as API keys. Both config.json and security.json formats are documented, which you can follow to create these files. This guide aims to follow a more instructive approach and give some tips along the way.

We assume that you have already followed the API integration guide and created your OIS. Similar to the OIS template we have provided in the previous guide, we have a config.json template and a security.json template for this guide. Download these files and see the template notation information.

Creating config.json

As you can see in the template, config.json has 4 fields:

ois
triggers
nodeSettings
id
ois

ois is a list OIS objects that Airnode will be serving. This means that a single instance of an Airnode can serve multiple APIs. You can simply copy paste OISes that you will be serving into the ois list.

triggers

triggers allow you to expose the endpoints in your OIS selectively. For example, your OIS may include 10 endpoints, but you may only want to serve 2. Instead of modifying the OIS, you would simply create triggers for the 2. Similarly, you may want to serve an endpoint through the request–response protocol, but not the pub–sub protocol. In that case, you would only create the trigger for the request–response protocol.

Note that at this stage, only the request–response protocol is implemented. You can list the endpoints that you want to serve under triggers.request. In most cases, you would create a trigger for each endpoint in your OIS.

Each trigger has an oisTitle and endpointName that allow you to refer to one of the endpoints in one of the OISes. Fill these in accordingly. endpointId is the ID that the requester will use in their on-chain requests to refer to this specific trigger. As a convention, we recommend this to be chosen as the Keccak256 hash of {oisTitle}/{endpointName}. In JS (using ethers.js):

endpointId = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(['string'], [`${oisTitle}/${endpointName}`]));
You can also use @api3/airnode-admin to derive endpoint IDs according to this convention. However, you can set endpointId to an arbitrary bytes32 value (e.g., 0x0000000000000000000000000000000000000000000000000000000000000123), and as long as the requester uses the same endpointId while making requests to this endpoint, it will work fine. If you are not using the recommended convention, make sure that your endpoints have different IDs.

nodeSettings

nodeSettings are node-specific configuration parameters. The first of these is providerIdShort, which is used as a label by the deployer to detect previous deployments. Therefore, you must not have the providerIdShort field in your config.json during the first deployment. On the other hand, you must have it for the following redeployments. You can find your providerIdShort in the receipt file outputted after deployment. This guide assumes that you have not deployed Airnode yet, so we did not include the providerIdShort field in the config.json template.

nodeVersion indicates which node version this config.json is prepared for. Since the config.json format can be expected to change with node versions, using a config.json prepared for one Airnode version with another may result in unexpected issues. The current node version is 0.1.0, so you can leave it as such.

cloudProvider indicates to the deployer which cloud provider Airnode should be deployed at. The deployer currently supports AWS, so you can leave this value as aws. We are planning to extend the deployer to support a wide variety of cloud providers. If you would like to contribute, please join the conversation in this issue.

region can be seen as an extension of cloudProvider, it refers to which region of the cloud provider Airnode will be deployed at. An example value would be us-east-1. Note that transferring a deployment from one region to the other is not trivial at this moment (i.e., it does not take one command like deployment, but rather three). Therefore, try to pick a region and stick to it for this specific deployment. If you would like to contribute to related tooling, please join the conversation in this issue.

stage allows you to deploy multiple Airnodes with the same provider ID. For example, the provider may deploy one Airnode with the stage api3 to serve API3 dAPIs, and one with the stage public that serves the public. A regular user will have a single deployment, so feel free to set any descriptive name as your stage. And finally, you probably want your logFormat to be set to json for your Airnode to log in JSON.

nodeSettings.chains

An Airnode can serve multiple chains simultaneously. You can specify each of these chains under nodeSettings.chains as an object.

You should set the ID of the chain in id (e.g., 3 for Ropsten testnet). type is the type of the chain, and only evm is supported at the moment.

Airnode can use multiple Ethereum providers per chain. These can both be your private Ethereum node, or an Ethereum service provider such as Infura. Accordingly, the providers field is list. Enter the name (to be used in logs) and the url of the Ethereum provider as an object.

contracts contains the addresses of the contracts that implement the Airnode protocols. Although you can deploy these contracts yourself, you are recommended to use the ones that were deployed by API3. You can find them here.

providerAdminForRecordCreation is the address that your Airnode will set as the provider admin while creating the provider record on the respective chain. You should set this field to an address that only you control.

id

config.json has an id field, which identifies the specific configuration. Furthermore, security.json has the same field with the identical value, allowing the deployer to verify that the two files match. For this to work, you are recommended to choose a unique value for this field for each config.json/security.json you create (e.g., use a UUID).

Creating security.json

security.json is where we will store our API keys. Make sure to download the security.json template and refer to the docs as needed.

For each security scheme you have defined in your config.json, you need to create an entry in security.json that includes its value. Feel free to duplicate the OIS entries under apiCredentials or security scheme entries under these OIS entries as needed. Finally, make sure that you use the same id that you have used in config.json.

Conclusion

In this guide, we created the config.json and security.json files required to deploy our Airnode. Note that config.json is user-specific, so your config.json file is probably of not much use to others. Furthermore, it contains your Ethereum provider URLs, which tend to include security credentials/keys. Your security.json contains your API keys, so it should definitely be kept secret. Therefore, even though you can safely share your OIS, you should avoid publishing your configuration files/pushing them to repos.

Now that we have our Airnode configuration files, the next step is deployment.
