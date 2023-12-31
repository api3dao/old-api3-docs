(window.webpackJsonp=window.webpackJsonp||[]).push([[435],{1108:function(e,t,a){"use strict";a.r(t);var s=a(9),n=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("TitleSpan",[e._v(e._s(e.$frontmatter.folder))]),e._v(" "),a("h1",{attrs:{id:"frontmatter-title"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#frontmatter-title"}},[e._v("#")]),e._v(" "+e._s(e.$frontmatter.title))]),e._v(" "),a("VersionWarning"),e._v(" "),a("TocHeader"),e._v(" "),a("TOC",{staticClass:"table-of-contents",attrs:{"include-level":[2,4]}}),e._v(" "),a("p",[e._v("This demo is a simple Airnode deployment, using a hands-on approach, to better\nunderstand the overall deployment process of the Airnode\n"),a("RouterLink",{attrs:{to:"/airnode/v0.4/grp-providers/docker/deployer-image.html"}},[e._v("deployer image")]),e._v(" which deploys\nthe off-chain component of Airnode (a.k.a., the node) to GCP. It uses an API\nendpoint ("),a("code",[e._v("GET /simple/price")]),e._v(") from\n"),a("a",{attrs:{href:"https://www.coingecko.com/en/api/documentation",target:"_blank",rel:"noopener noreferrer"}},[e._v("CoinGecko"),a("OutboundLink")],1),e._v(" which returns the\ncurrent value of a coin. This demo does not detail the overall configuration of\nan Airnode, it is just a quick start.")],1),e._v(" "),a("p",[e._v("An Airnode cloud provider deployment uses a Docker image (called\n"),a("RouterLink",{attrs:{to:"/airnode/v0.4/grp-providers/docker/deployer-image.html"}},[e._v("deployer image")]),e._v(") which in turn\nrequires three files as input.")],1),e._v(" "),a("ul",[a("li",[a("RouterLink",{attrs:{to:"/airnode/v0.4/grp-providers/tutorial/quick-deploy-gcp/config-json.html"}},[e._v("config.json")])],1),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/airnode/v0.4/grp-providers/tutorial/quick-deploy-gcp/secrets-env.html"}},[e._v("secrets.env")])],1),e._v(" "),a("li",[e._v("gcp.json")])]),e._v(" "),a("p",[e._v("For the purpose of this demo these files have been created and only require a\nfew minor changes on your part to make the deployment of the demo Airnode\nsuccessful. These changes are needed to supply a GCP project ID, chain provider\nurl, and a mnemonic.")]),e._v(" "),a("h2",{attrs:{id:"launch-docker-desktop"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#launch-docker-desktop"}},[e._v("#")]),e._v(" Launch Docker Desktop")]),e._v(" "),a("p",[e._v("Launch the Docker Desktop app. You can install it from the\n"),a("a",{attrs:{href:"https://docs.docker.com/get-docker/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Docker docs"),a("OutboundLink")],1),e._v(" website.")]),e._v(" "),a("h2",{attrs:{id:"project-folder"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#project-folder"}},[e._v("#")]),e._v(" Project Folder")]),e._v(" "),a("p",[e._v("A project folder is needed for this demo. You can create it manually or download\na zip file ready to go.")]),e._v(" "),a("Tabs",{attrs:{type:"border-card"}},[a("Tab",{attrs:{label:"Create Manually"}},[a("p",[e._v("Create a folder called "),a("code",[e._v("/quick-deploy-gcp")]),e._v(" with two more internal folders named\n"),a("code",[e._v("/config")]),e._v(" and "),a("code",[e._v("/output")]),e._v(". Place the contents of the files provided\n("),a("RouterLink",{attrs:{to:"/airnode/v0.4/grp-providers/tutorial/quick-deploy-gcp/config-json.html"}},[e._v("config.json")]),e._v(" and "),a("RouterLink",{attrs:{to:"/airnode/v0.4/grp-providers/tutorial/quick-deploy-gcp/secrets-env.html"}},[e._v("secrets.env")]),e._v(") into the\nlocations show below.")],1),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("quick-deploy-gcp\n├── config\n│   ├── config.json\n│   └── secrets.env\n└── output\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br")])])]),e._v(" "),a("Tab",{attrs:{label:"Download"}},[a("p",[e._v("Download the "),a("a",{attrs:{href:"/zip-files/quick-deploy-gcp-v0.4.zip",download:""}},[e._v("\nquick-deploy-gcp")]),e._v(" project folder.")])])],1),e._v(" "),a("h2",{attrs:{id:"configuration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configuration"}},[e._v("#")]),e._v(" Configuration")]),e._v(" "),a("p",[e._v("Prepare the configuration files, setup a GCP project and obtain credentials. By\ndefault, the Airnode deployer image looks for "),a("code",[e._v("config.json")]),e._v(" and "),a("code",[e._v("secrets.env")]),e._v(" in\n"),a("code",[e._v("/config")]),e._v(" and writes "),a("code",[e._v("receipt.json")]),e._v(" to the "),a("code",[e._v("/output")]),e._v(" folder.")]),e._v(" "),a("h3",{attrs:{id:"config-json"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#config-json"}},[e._v("#")]),e._v(" config.json")]),e._v(" "),a("p",[e._v("This file requires no changes on your part. It has been created with just one\nAPI endpoint. It will instruct the Airnode to attach to the Rinkeby test\nnetwork. There are three variables this file will extract (interpolation) from\n"),a("code",[e._v("secrets.env")]),e._v(".")]),e._v(" "),a("h3",{attrs:{id:"secrets-env"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#secrets-env"}},[e._v("#")]),e._v(" secrets.env")]),e._v(" "),a("p",[e._v("Add values for each of the these fields.")]),e._v(" "),a("ul",[a("li",[a("p",[a("code",[e._v("CHAIN_PROVIDER_URL")]),e._v(": A chain provider url from a provider such as\n"),a("a",{attrs:{href:"https://infura.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Infura"),a("OutboundLink")],1),e._v(". Make sure the provider url you use is for the\nRinkeby test network. Using another chain provider other than Infura is\nacceptable.")]),e._v(" "),a("ul",[a("li",[e._v("Sign-up or login to Infura.")]),e._v(" "),a("li",[e._v("Create a new project, select the "),a("strong",[e._v("Settings")]),e._v(" tab in the project.")]),e._v(" "),a("li",[e._v("Copy the URL (https) for Rinkeby under the Endpoints pick list.")])])]),e._v(" "),a("li",[a("p",[a("code",[e._v("AIRNODE_WALLET_MNEMONIC")]),e._v(": Provide the seed phrase (mnemonic) to a digital\nwallet. For the purpose of this demo it does not need eth in it for the\nRinkeby test network. If you don't have one use the Admin CLI command\n"),a("RouterLink",{attrs:{to:"/airnode/v0.4/reference/packages/admin-cli.html#generate-mnemonic"}},[e._v("generate-mnemonic")]),e._v("\nto create one or another method you prefer.")],1)]),e._v(" "),a("li",[a("p",[a("code",[e._v("PROJECT_ID")]),e._v(": Project ID of your GCP project.\n"),a("a",{attrs:{href:"https://cloud.google.com/resource-manager/docs/creating-managing-projects",target:"_blank",rel:"noopener noreferrer"}},[e._v("Create a GCP project"),a("OutboundLink")],1),e._v("\nunder which will the Airnode be deployed and copy the project ID.")])])]),e._v(" "),a("h3",{attrs:{id:"gcp-project-setup-credentials"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gcp-project-setup-credentials"}},[e._v("#")]),e._v(" GCP Project Setup & Credentials")]),e._v(" "),a("p",[e._v("First, you need to\n"),a("a",{attrs:{href:"https://cloud.google.com/resource-manager/docs/creating-managing-projects",target:"_blank",rel:"noopener noreferrer"}},[e._v("create a GCP project"),a("OutboundLink")],1),e._v("\nunder which will the Airnode be deployed. Once the project is created, insert\nits project ID into your\n"),a("RouterLink",{attrs:{to:"/airnode/v0.4/grp-providers/guides/build-an-airnode/configuring-airnode.html#cloudprovider"}},[e._v("config.json")]),e._v(".")],1),e._v(" "),a("p",[e._v("In order for Airnode to deploy successfully, you need to enable\n"),a("a",{attrs:{href:"https://console.cloud.google.com/apis/library/appengine.googleapis.com",target:"_blank",rel:"noopener noreferrer"}},[e._v("App Engine Admin API"),a("OutboundLink")],1),e._v("\nfor your GCP project. After enabling it, wait a few minutes before the\ndeployment itself so the change will take place.")]),e._v(" "),a("p",[e._v("Create a new service account from the\n"),a("a",{attrs:{href:"https://console.cloud.google.com/iam-admin/serviceaccounts",target:"_blank",rel:"noopener noreferrer"}},[e._v("Service accounts"),a("OutboundLink")],1),e._v("\nmenu. Grant this account access to the project by adding the role "),a("code",[e._v("Owner")]),e._v(" during\ncreation.")]),e._v(" "),a("p",[e._v("Once the account is created, select the KEYS tab and add a new access key of\ntype JSON for this account. Download the key file and place in the root of the\n"),a("code",[e._v("/quick-deploy-gcp")]),e._v(" directory. Rename it "),a("code",[e._v("gcp.json")]),e._v(".")]),e._v(" "),a("h2",{attrs:{id:"deploy"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deploy"}},[e._v("#")]),e._v(" Deploy")]),e._v(" "),a("p",[e._v("Make sure Docker is running and then execute the deployer image from the root of\nthe "),a("code",[e._v("quick-deploy-gcp")]),e._v(" folder. A "),a("code",[e._v("receipt.json")]),e._v(" file will be created upon\ncompletion. It contains some deployment information and is used to remove the\nAirnode.")]),e._v(" "),a("airnode-WarningSimultaneousDeployments",{attrs:{removeLink:"../../docker/deployer-image.html#manual-removal"}}),e._v(" "),a("p",[e._v("Run the following command to deploy the demo Airnode. Note that the version of\n"),a("code",[e._v("api3/airnode-deployer")]),e._v(" matches the "),a("code",[e._v("nodeVersion")]),e._v(" in the config.json file.\n"),a("airnode-DeployerPermissionsWarning")],1),e._v(" "),a("Tabs",{attrs:{type:"border-card"}},[a("Tab",{attrs:{label:"Linux/Mac/WSL2"}},[a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("docker run -it --rm "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  -e "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("USER_ID")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("id")]),e._v(" -u"),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v(" -e "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("GROUP_ID")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("id")]),e._v(" -g"),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  -v "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("pwd")]),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v('/gcp.json:/app/gcp.json"')]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  -v "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("pwd")]),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v('/config:/app/config"')]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  -v "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("pwd")]),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v('/output:/app/output"')]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  api3/airnode-deployer:0.4.1 deploy\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br")])])]),e._v(" "),a("Tab",{attrs:{label:"Windows"}},[a("p",[e._v("For Windows, use CMD (and not PowerShell).")]),e._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("docker run -it --rm ^\n  -v "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"%cd%/gcp.json:/app/gcp.json"')]),e._v(" ^\n  -v "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"%cd%/config:/app/config"')]),e._v(" ^\n  -v "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"%cd%/output:/app/output"')]),e._v(" ^\n  api3/airnode-deployer:0.4.1 deploy\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br")])])])],1),e._v(" "),a("h2",{attrs:{id:"test-the-airnode"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#test-the-airnode"}},[e._v("#")]),e._v(" Test the Airnode")]),e._v(" "),a("p",[e._v("After a successful deployment the Airnode can be tested directly using the\n"),a("RouterLink",{attrs:{to:"/airnode/v0.4/grp-providers/guides/build-an-airnode/http-gateway.html"}},[e._v("HTTP Gateway")]),e._v(" without accessing\nthe blockchain. You provide endpoint parameters to get a response from an\nintegrated API.")],1),e._v(" "),a("h3",{attrs:{id:"http-gateway"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#http-gateway"}},[e._v("#")]),e._v(" HTTP Gateway")]),e._v(" "),a("p",[e._v("Looking at the "),a("RouterLink",{attrs:{to:"/airnode/v0.4/grp-providers/tutorial/quick-deploy-gcp/config-json.html"}},[e._v("config.json")]),e._v(" code snippet below shows the HTTP\ngateway was activated for the Airnode. Furthermore the endpoint for\n"),a("code",[e._v("/simple/price")]),e._v(" (with an "),a("code",[e._v("endpointId")]),e._v(" of "),a("code",[e._v("0xf...53c")]),e._v(") has been added to\n"),a("code",[e._v("triggers.http[n]")]),e._v(". Only those endpoints added to the "),a("code",[e._v("http")]),e._v(" array can be\ntested.")],1),e._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"nodeSettings"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  ...\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"httpGateway"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"enabled"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[e._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// The gateway is activated for this Airnode")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"apiKey"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"${HTTP_GATEWAY_API_KEY}"')]),e._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// Gateway apiKey")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n  ...\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"triggers"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"rrp"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"endpointId"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"0x6db9e3e3d073ad12b66d28dd85bcf49f58577270b1cc2d48a43c7025f5c27af6"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"oisTitle"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"CoinGecko Basic Request"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"endpointName"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"coinMarketData"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"http"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"endpointId"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"0x6db9e3e3d073ad12b66d28dd85bcf49f58577270b1cc2d48a43c7025f5c27af6"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"oisTitle"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"CoinGecko Basic Request"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"endpointName"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"coinMarketData"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br"),a("span",{staticClass:"line-number"},[e._v("12")]),a("br"),a("span",{staticClass:"line-number"},[e._v("13")]),a("br"),a("span",{staticClass:"line-number"},[e._v("14")]),a("br"),a("span",{staticClass:"line-number"},[e._v("15")]),a("br"),a("span",{staticClass:"line-number"},[e._v("16")]),a("br"),a("span",{staticClass:"line-number"},[e._v("17")]),a("br"),a("span",{staticClass:"line-number"},[e._v("18")]),a("br"),a("span",{staticClass:"line-number"},[e._v("19")]),a("br"),a("span",{staticClass:"line-number"},[e._v("20")]),a("br"),a("span",{staticClass:"line-number"},[e._v("21")]),a("br"),a("span",{staticClass:"line-number"},[e._v("22")]),a("br"),a("span",{staticClass:"line-number"},[e._v("23")]),a("br"),a("span",{staticClass:"line-number"},[e._v("24")]),a("br")])]),a("h3",{attrs:{id:"execute-endpoint"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#execute-endpoint"}},[e._v("#")]),e._v(" Execute Endpoint")]),e._v(" "),a("p",[e._v("Use CURL to execute the Airnode and get the results from the CoinGecko endpoint\n"),a("code",[e._v("/simple/price")]),e._v(" bypassing the Rinkeby test network that Airnode was deployed\nfor. As an alternative to CURL try an app such as\n"),a("a",{attrs:{href:"https://insomnia.rest/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Insomnia"),a("OutboundLink")],1),e._v(" or\n"),a("a",{attrs:{href:"https://www.postman.com/product/rest-client/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Postman"),a("OutboundLink")],1),e._v(". Windows users can also\nuse\n"),a("a",{attrs:{href:"https://docs.microsoft.com/en-us/windows/wsl/install",target:"_blank",rel:"noopener noreferrer"}},[e._v("Windows Subsystem for Linux"),a("OutboundLink")],1),e._v("\n(WSL2) to run CURL for Linux.")]),e._v(" "),a("p",[e._v("In order to test an endpoint make a HTTP POST request with the "),a("code",[e._v("endpointId")]),e._v(" as a\npath parameter, the "),a("code",[e._v("Content-Type")]),e._v(" header set to "),a("code",[e._v("application/json")]),e._v(", the\n"),a("code",[e._v("x-api-key")]),e._v(" header set to the key and place the endpoint parameter in the\nrequest body as a key/value pair.")]),e._v(" "),a("ul",[a("li",[a("code",[e._v("-X")]),e._v(": POST")]),e._v(" "),a("li",[a("code",[e._v("-H")]),e._v(": The "),a("code",[e._v("Content-Type")]),e._v(" using the value of "),a("code",[e._v("application/json")]),e._v(".")]),e._v(" "),a("li",[a("code",[e._v("-H")]),e._v(": The "),a("code",[e._v("x-api-key")]),e._v(" using the value of "),a("code",[e._v("HTTP_GATEWAY_API_KEY")]),e._v(" from\n"),a("code",[e._v("secrets.env")]),e._v(" file.")]),e._v(" "),a("li",[a("code",[e._v("-d")]),e._v(": Use request body data to pass the endpoint parameter key/value pair.")])]),e._v(" "),a("p",[e._v("URL:")]),e._v(" "),a("p",[a("code",{staticStyle:{"overflow-wrap":"break-word"}},[e._v("<httpGatewayUrl>/0xf466b8feec41e9e50815e0c9dca4db1ff959637e564bb13fefa99e9f9f90453c")])]),e._v(" "),a("ul",[a("li",[a("code",[e._v("<httpGatewayUrl>")]),e._v(": The base URL to the gateway, found in the "),a("code",[e._v("receipts.json")]),e._v("\nfile. Update the placeholder in the CURL example below with its value.")]),e._v(" "),a("li",[a("code",{staticStyle:{"overflow-wrap":"break-word"}},[e._v("0xf466b8feec41e9e50815e0c9dca4db1ff959637e564bb13fefa99e9f9f90453c")]),e._v(":\nPassed as a path parameter, the endpointId to call, see\n"),a("code",[e._v("triggers.rrp[0].endpointId")]),e._v(" in the "),a("code",[e._v("config.json")]),e._v(" file.")])]),e._v(" "),a("h4",{attrs:{id:"request"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#request"}},[e._v("#")]),e._v(" Request")]),e._v(" "),a("Tabs",{attrs:{type:"border-card"}},[a("Tab",{attrs:{label:"Linux/Mac/WSL2"}},[a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("curl")]),e._v(" -v "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n-X POST "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n-H "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'Content-Type: application/json'")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n-H "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'x-api-key: 123-my-key-must-be-30-characters-min'")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n-d "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('\'{"parameters": {"coinIds": "api3", "coinVs_currencies": "usd"}}\'')]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'<httpGatewayUrl>/0xf466b8feec41e9e50815e0c9dca4db1ff959637e564bb13fefa99e9f9f90453c'")]),e._v("\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br")])])]),e._v(" "),a("Tab",{attrs:{label:"Windows"}},[a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[e._v("curl")]),e._v(" -v ^\n-X POST ^\n-H "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'Content-Type: application/json'")]),e._v(" ^\n-H "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"x-api-key: 123-my-key-must-be-30-characters-min"')]),e._v(" ^\n-d "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('\'{"parameters": {"coinIds": "api3", "coinVs_currencies": "usd"}}\'')]),e._v(" ^\n"),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"<httpGatewayUrl>/0xf466b8feec41e9e50815e0c9dca4db1ff959637e564bb13fefa99e9f9f90453c"')]),e._v("\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br")])])])],1),e._v(" "),a("h4",{attrs:{id:"response"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#response"}},[e._v("#")]),e._v(" Response")]),e._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"encodedValue"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"0x0000000000000000000000000000000000000000000000000000000000362b30"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"rawValue"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"api3"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"usd"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("3.55")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"values"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"3550000"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br")])]),a("airnode-tutorials-TutorialResponse"),e._v(" "),a("h2",{attrs:{id:"remove-the-airnode"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#remove-the-airnode"}},[e._v("#")]),e._v(" Remove the Airnode")]),e._v(" "),a("p",[e._v("When you are done with this demo you can remove it. When the Airnode was\ndeployed a "),a("code",[e._v("receipt.json")]),e._v(" file was created in the "),a("code",[e._v("/output")]),e._v(" folder. This file is\nneeded to remove an Airnode.")]),e._v(" "),a("Tabs",{attrs:{type:"border-card"}},[a("Tab",{attrs:{label:"Linux/Mac/WSL2"}},[a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("docker run -it --rm "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  -v "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("pwd")]),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v('/gcp.json:/app/gcp.json"')]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  -v "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("pwd")]),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v('/output:/app/output"')]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  api3/airnode-deployer:0.4.1 remove -r output/receipt.json\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br")])])]),e._v(" "),a("Tab",{attrs:{label:"Windows"}},[a("p",[e._v("For Windows, use CMD (and not PowerShell).")]),e._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("docker run -it --rm ^\n  -v "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"%cd%/gcp.json:/app/gcp.json"')]),e._v(" ^\n  -v "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"%cd%/output:/app/output"')]),e._v(" ^\n  api3/airnode-deployer:0.4.1 remove -r output/receipt.json\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br")])])])],1),e._v(" "),a("div",{staticClass:"custom-block danger"},[a("p",{staticClass:"custom-block-title"},[e._v("Post Removal")]),e._v(" "),a("p",[e._v("After removing an Airnode it may be necessary to wait several minutes before\ndeploying / redeploying Airnode again to the same project. GCP takes several\nminutes to complete its behind the scenes clean-up of deleted cloud functions.")])]),e._v(" "),a("h2",{attrs:{id:"summary"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#summary"}},[e._v("#")]),e._v(" Summary")]),e._v(" "),a("p",[e._v("You have deployed an Airnode on GCP. The Airnode, upon deployment, started\ncontacting the AirnodeRrp contract on the Rinkeby testnet to gather any requests\nmade by requesters to this Airnode. This tutorial did not address making a\nrequest as its purpose was simply to quickly deploy a functional Airnode.")])],1)}),[],!1,null,null,null);t.default=n.exports}}]);