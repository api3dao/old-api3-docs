(window.webpackJsonp=window.webpackJsonp||[]).push([[637],{1383:function(e,t,a){"use strict";a.r(t);var n=a(9),s=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("TitleSpan",[e._v(e._s(e.$frontmatter.folder))]),e._v(" "),a("h1",{attrs:{id:"frontmatter-title"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#frontmatter-title"}},[e._v("#")]),e._v(" "+e._s(e.$frontmatter.title))]),e._v(" "),a("VersionWarning"),e._v(" "),a("TocHeader"),e._v(" "),a("TOC",{staticClass:"table-of-contents",attrs:{"include-level":[2,3]}}),e._v(" "),a("p",[e._v("This demo is a simple Airnode deployment, using a hands-on approach, to better\nunderstand the overall deployment process of the Airnode\n"),a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/docker/client-image.html"}},[e._v("client image")]),e._v(" which deploys the\noff-chain component of Airnode ("),a("RouterLink",{attrs:{to:"/airnode/v0.8/"}},[e._v("a.k.a., the node")]),e._v(") to a Docker\ncontainer, in this case a locally run Docker container. It uses an API endpoint\n("),a("code",[e._v("GET /simple/price")]),e._v(") from\n"),a("a",{attrs:{href:"https://www.coingecko.com/en/api/documentation",target:"_blank",rel:"noopener noreferrer"}},[e._v("CoinGecko"),a("OutboundLink")],1),e._v(" which returns the\ncurrent value of a coin. This demo does not detail the overall configuration of\nan Airnode, it is just a quick start.")],1),e._v(" "),a("p",[e._v("An Airnode Docker container deployment uses a Docker image (called\n"),a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/docker/client-image.html"}},[e._v("client image")]),e._v(") which in turn\nrequires two files as input.")],1),e._v(" "),a("ul",[a("li",[a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/tutorial/quick-deploy-container/config-json.html"}},[e._v("config.json")])],1),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/tutorial/quick-deploy-container/secrets-env.html"}},[e._v("secrets.env")])],1)]),e._v(" "),a("p",[e._v("For the purpose of this demo these files have been created and only require a\nfew minor changes on your part to make the deployment of the demo Airnode\nsuccessful. These changes are needed to supply a chain provider url and a\nmnemonic.")]),e._v(" "),a("h2",{attrs:{id:"install-prerequisites"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#install-prerequisites"}},[e._v("#")]),e._v(" Install Prerequisites")]),e._v(" "),a("p",[e._v("Install the "),a("a",{attrs:{href:"https://docs.docker.com/get-docker/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Docker Desktop"),a("OutboundLink")],1),e._v(" and launch it.")]),e._v(" "),a("h2",{attrs:{id:"project-folder"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#project-folder"}},[e._v("#")]),e._v(" Project Folder")]),e._v(" "),a("p",[e._v("A project folder is needed for this demo. You can create it manually or download\na zip file ready to go.")]),e._v(" "),a("Tabs",{attrs:{type:"border-card"}},[a("Tab",{attrs:{label:"Create Manually"}},[a("p",[e._v("Create a folder called "),a("code",[e._v("quick-deploy-container")]),e._v(". Place the contents of the files\nprovided ("),a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/tutorial/quick-deploy-container/config-json.html"}},[e._v("config.json")]),e._v(" and "),a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/tutorial/quick-deploy-container/secrets-env.html"}},[e._v("secrets.env")]),e._v(")\ninto the folder as shown below.")],1),e._v(" "),a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("quick-deploy-container\n├── config.json\n└── secrets.env\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br")])])]),e._v(" "),a("Tab",{attrs:{label:"Download"}},[a("p",[e._v("Download the "),a("a",{attrs:{href:"/zip-files/quick-deploy-container-v0.8.zip",download:""}},[e._v("\nquick-deploy-container")]),e._v(" project folder.")])])],1),e._v(" "),a("h2",{attrs:{id:"configuration"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#configuration"}},[e._v("#")]),e._v(" Configuration")]),e._v(" "),a("p",[e._v("Prepare the two configuration files, "),a("code",[e._v("config.json")]),e._v(" and "),a("code",[e._v("secrets.env")]),e._v(". By\ndefault, the Airnode client image looks for them in the project root directory.")]),e._v(" "),a("h3",{attrs:{id:"config-json"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#config-json"}},[e._v("#")]),e._v(" config.json")]),e._v(" "),a("p",[e._v("This file requires no changes on your part. It has been created with just one\nAPI endpoint. It will instruct the Airnode to attach to the Rinkeby test\nnetwork. There are a few variables this file will extract (interpolate) from\n"),a("code",[e._v("secrets.env")]),e._v(".")]),e._v(" "),a("h3",{attrs:{id:"secrets-env"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#secrets-env"}},[e._v("#")]),e._v(" secrets.env")]),e._v(" "),a("p",[e._v("Add values for each of the these fields.")]),e._v(" "),a("ul",[a("li",[a("p",[a("code",[e._v("CHAIN_PROVIDER_URL")]),e._v(": A chain provider url from a provider such as\n"),a("a",{attrs:{href:"https://infura.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Infura"),a("OutboundLink")],1),e._v(". Make sure the provider url you use is for the\nRinkeby test network. Using another chain provider other than Infura is\nacceptable.")]),e._v(" "),a("ul",[a("li",[e._v("Sign-up or login to Infura.")]),e._v(" "),a("li",[e._v("Create a new project, select the "),a("strong",[e._v("Settings")]),e._v(" tab in the project.")]),e._v(" "),a("li",[e._v("Copy the URL (https) for Rinkeby under the Endpoints pick list.")])])]),e._v(" "),a("li",[a("p",[a("code",[e._v("AIRNODE_WALLET_MNEMONIC")]),e._v(": Provide the seed phrase (mnemonic) to a digital\nwallet. For the purpose of this demo it does not need eth in it for the\nRinkeby test network. If you don't have one use the Admin CLI command\n"),a("RouterLink",{attrs:{to:"/airnode/v0.8/reference/packages/admin-cli.html#generate-airnode-mnemonic"}},[e._v("generate-airnode-mnemonic")]),e._v("\nto create one or another method you prefer.")],1)]),e._v(" "),a("li",[a("p",[a("code",[e._v("HTTP_GATEWAY_API_KEY")]),e._v(": The authentication API key that needs to be sent with\nevery HTTP gateway request.")])])]),e._v(" "),a("h2",{attrs:{id:"deploy"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deploy"}},[e._v("#")]),e._v(" Deploy")]),e._v(" "),a("p",[e._v("Make sure Docker is running and then run the Airnode client container from the\nroot of the "),a("code",[e._v("quick-deploy-container")]),e._v(" folder.")]),e._v(" "),a("p",[e._v("Run the following command to deploy the Airnode locally. Note that the version\nof "),a("code",[e._v("api3/airnode-client")]),e._v(" matches the "),a("code",[e._v("nodeVersion")]),e._v(" in the config.json file.")]),e._v(" "),a("Tabs",{attrs:{type:"border-card"}},[a("Tab",{attrs:{label:"Linux"}},[a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("docker run --detach "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --volume "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("pwd")]),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v(':/app/config"')]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --name quick-deploy-container-airnode "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --network "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("host")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  api3/airnode-client:0.8.1\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br")])])]),e._v(" "),a("Tab",{attrs:{label:"Mac/WSL2/PowerShell"}},[a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("docker run --detach "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --volume "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("pwd")]),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v(':/app/config"')]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --name quick-deploy-container-airnode "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --publish "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("3000")]),e._v(":3000 "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  api3/airnode-client:0.8.1\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br")])])]),e._v(" "),a("Tab",{attrs:{label:"Windows CMD"}},[a("p",[e._v("For Windows CMD:")]),e._v(" "),a("div",{staticClass:"language-batch line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-batch"}},[a("code",[a("span",{pre:!0,attrs:{class:"token command"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("docker")]),e._v(" run "),a("span",{pre:!0,attrs:{class:"token parameter attr-name"}},[e._v("--detach")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("^")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter attr-name"}},[e._v("--volume")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"%cd%:/app/config"')]),e._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("^")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter attr-name"}},[e._v("--name")]),e._v(" quick-deploy-container-airnode "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("^")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter attr-name"}},[e._v("--publish")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("3000")]),e._v(":"),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("3000")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("^")]),e._v("\n  api3/airnode-client:"),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("0")]),e._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("8")]),e._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("1")])]),e._v("\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br")])])])],1),e._v(" "),a("p",[e._v("Note that "),a("code",[e._v("--publish HOST_PORT:CONTAINER_PORT")]),e._v(" parameter can have different\nvalues for the "),a("code",[e._v("HOST_PORT")]),e._v(" and "),a("code",[e._v("CONTAINER_PORT")]),e._v(". E.g. parameter\n"),a("code",[e._v("--publish 8000:3000")]),e._v(" would expose the web server on port 8000 on the host\nmachine. If run using "),a("a",{attrs:{href:"https://docs.docker.com/network/host/",target:"_blank",rel:"noopener noreferrer"}},[e._v("host networking"),a("OutboundLink")],1),e._v("\nyou need to change the port via\n"),a("RouterLink",{attrs:{to:"/airnode/v0.8/reference/deployment-files/config-json.html#cloudprovider-gatewayserverport"}},[e._v("gatewayServerPort")]),e._v("\nproperty inside config.json.")],1),e._v(" "),a("p",[e._v("For Linux, it's recommended to use\n"),a("a",{attrs:{href:"https://docs.docker.com/network/host/",target:"_blank",rel:"noopener noreferrer"}},[e._v("host networking"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("h2",{attrs:{id:"test-the-airnode"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#test-the-airnode"}},[e._v("#")]),e._v(" Test the Airnode")]),e._v(" "),a("h3",{attrs:{id:"request"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#request"}},[e._v("#")]),e._v(" Request")]),e._v(" "),a("p",[e._v("Make a CURL request using the example below. Be sure to replace\n"),a("code",[e._v("HTTP_GATEWAY_API_KEY")]),e._v(" with your key from "),a("code",[e._v("secrets.env")]),e._v(".")]),e._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# For Windows CMD replace line termination marker \\ with ^")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("curl")]),e._v(" -X POST "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  -d "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('\'{"parameters":{"coinIds":"api3","coinVs_currencies":"usd"}}\'')]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  -H "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'Content-Type: application/json'")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  -H "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'x-api-key: <HTTP_GATEWAY_API_KEY>'")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v("'http://localhost:3000/http-data/0x6db9e3e3d073ad12b66d28dd85bcf49f58577270b1cc2d48a43c7025f5c27af6'")]),e._v("\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br")])]),a("h3",{attrs:{id:"response"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#response"}},[e._v("#")]),e._v(" Response")]),e._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"encodedValue"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"0x0000000000000000000000000000000000000000000000000000000000362b30"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"rawValue"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"api3"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"usd"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("3.55")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"values"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"3550000"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br")])]),a("airnode-tutorials-TutorialResponse"),e._v(" "),a("h2",{attrs:{id:"start-and-stop"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#start-and-stop"}},[e._v("#")]),e._v(" Start and Stop")]),e._v(" "),a("p",[e._v("You can start and stop the Airnode with the Docker desktop application or via\nterminal commands.")]),e._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("docker stop quick-deploy-container-airnode\n\ndocker start quick-deploy-container-airnode\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br")])]),a("h2",{attrs:{id:"logs"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#logs"}},[e._v("#")]),e._v(" Logs")]),e._v(" "),a("p",[e._v("You can view the Airnode's logs with the Docker desktop application or via\nterminal commands.")]),e._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("docker logs quick-deploy-container-airnode\n\ndocker logs --follow quick-deploy-container-airnode\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br")])]),a("h2",{attrs:{id:"remove-the-airnode"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#remove-the-airnode"}},[e._v("#")]),e._v(" Remove the Airnode")]),e._v(" "),a("p",[e._v("When you are done with this demo you can remove it. Do so using the Docker\ndesktop application or by using the following terminal command. When using the\nterminal command be sure to stop the container first if running.")]),e._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("# Stop the container if it is running.")]),e._v("\ndocker stop quick-deploy-container-airnode\n\ndocker "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("rm")]),e._v(" quick-deploy-container-airnode\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br")])]),a("h2",{attrs:{id:"summary"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#summary"}},[e._v("#")]),e._v(" Summary")]),e._v(" "),a("p",[e._v("You have deployed an Airnode into a Docker container. This Airnode attaches\nitself to the Rinkeby testnet as stated in the "),a("code",[e._v("config.json")]),e._v(" file. The Airnode,\nupon deployment, started contacting the AirnodeRrpV0 contract on the Rinkeby\ntestnet to gather any requests made by requesters to this Airnode.")]),e._v(" "),a("p",[e._v("This tutorial did not address making a request on-chain as its purpose was\nsimply to quickly deploy a functional Airnode.")]),e._v(" "),a("p",[e._v("Finally the API integration was tested using the\n"),a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/guides/build-an-airnode/http-gateways.html#http-gateway"}},[e._v("HTTP gateway")]),e._v(". You\nmade a CURL request (using HTTP) to the HTTP gateway and Airnode queried the API\nprovider and sent back a response. All of this was performed without accessing\nthe blockchain.")],1)],1)}),[],!1,null,null,null);t.default=s.exports}}]);