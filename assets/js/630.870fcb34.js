(window.webpackJsonp=window.webpackJsonp||[]).push([[630],{1373:function(e,t,a){"use strict";a.r(t);var s=a(9),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("TitleSpan",[e._v(e._s(e.$frontmatter.folder))]),e._v(" "),a("h1",{attrs:{id:"frontmatter-title"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#frontmatter-title"}},[e._v("#")]),e._v(" "+e._s(e.$frontmatter.title))]),e._v(" "),a("VersionWarning"),e._v(" "),a("TocHeader"),e._v(" "),a("TOC",{staticClass:"table-of-contents",attrs:{"include-level":[2,3]}}),e._v(" "),a("p",[e._v("After integrating your API ("),a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/guides/build-an-airnode/api-integration.html"}},[e._v("API Integration")]),e._v(") and creating\nthe configuration files ("),a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/guides/build-an-airnode/configuring-airnode.html"}},[e._v("Configuring Airnode")]),e._v("), the\nnext step is to deploy the Airnode.")],1),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("Complete the following before deploying your Airnode.")]),e._v(" "),a("ul",[a("li",[a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/guides/build-an-airnode/api-integration.html"}},[e._v("API Integration")])],1),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/guides/build-an-airnode/api-security.html"}},[e._v("API Security")])],1),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/guides/build-an-airnode/configuring-airnode.html"}},[e._v("Configuring Airnode")])],1),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/guides/build-an-airnode/apply-auth.html"}},[e._v("Using Authorizers")]),e._v(" optional")],1),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/guides/build-an-airnode/heartbeat.html"}},[e._v("Heartbeat")]),e._v(" optional")],1),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/guides/build-an-airnode/http-gateways.html"}},[e._v("HTTP Gateways")]),e._v(" optional")],1)])]),e._v(" "),a("h2",{attrs:{id:"deploy-with-docker"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deploy-with-docker"}},[e._v("#")]),e._v(" Deploy with Docker")]),e._v(" "),a("p",[e._v("The recommended way to deploy Airnode is by using the Docker\n"),a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/docker/deployer-image.html"}},[e._v("deployer image")]),e._v(". This image is simply a wrapper\naround the\n"),a("a",{attrs:{href:"https://github.com/api3dao/airnode/tree/v0.8/packages/airnode-deployer",target:"_blank",rel:"noopener noreferrer"}},[e._v("deployer CLI"),a("OutboundLink")],1),e._v(".\nTry out the "),a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/tutorial/"}},[e._v("Quick Deploy")]),e._v(" tutorial if you wish to become\nfamiliar with the deployer image first.")],1),e._v(" "),a("p",[e._v("The deployer interacts with a cloud provider to deploy Airnode programmatically,\nwithout requiring you to click through a lot of ever-changing graphical\ninterfaces. For it to do so, a cloud project setup and credentials are required\nand was discussed in\n"),a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/guides/build-an-airnode/configuring-airnode.html#aws-setup-aws-deployment-only"}},[e._v("Configuring an Airnode")]),e._v(".")],1),e._v(" "),a("h2",{attrs:{id:"install-docker"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#install-docker"}},[e._v("#")]),e._v(" Install Docker")]),e._v(" "),a("p",[e._v("The "),a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/docker/deployer-image.html"}},[e._v("deployer image")]),e._v(" is containerized as a\nDocker image. This will deploy the Airnode to the cloud provider without the\nworry of installing dependencies and is the recommended way to do a deployment.\nIf you do not already have docker installed go to the\n"),a("a",{attrs:{href:"https://docs.docker.com/get-docker/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Docker website"),a("OutboundLink")],1),e._v(" and install it.")],1),e._v(" "),a("h2",{attrs:{id:"deployment"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#deployment"}},[e._v("#")]),e._v(" Deployment")]),e._v(" "),a("p",[e._v("At this point your project should resemble the following. The "),a("code",[e._v("config.json")]),e._v(",\n"),a("code",[e._v("secrets.env")]),e._v(", "),a("code",[e._v("aws.env")]),e._v(" (if deploying to AWS) and "),a("code",[e._v("gcp.json")]),e._v(" (if deploying to\nGCP) files should be ready to go. Other files you may have added are expected\nbut not used by the deployer image.")]),e._v(" "),a("Tabs",{attrs:{type:"border-card"}},[a("Tab",{attrs:{label:"AWS"}},[a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("my-airnode\n├── aws.env\n├── config.json\n└── secrets.env\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br")])])]),e._v(" "),a("Tab",{attrs:{label:"GCP"}},[a("div",{staticClass:"language- line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("my-airnode\n├── gcp.json\n├── config.json\n└── secrets.env\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br")])])])],1),e._v(" "),a("airnode-WarningSimultaneousDeployments",{attrs:{removeLink:"../../docker/deployer-image.html#manual-removal"}}),e._v(" "),a("p",[e._v("From the root of the project directory run the Docker image command\n"),a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/docker/deployer-image.html#deploy"}},[e._v("deploy")]),e._v(" as shown below to deploy the\nAirnode. When the deployment has completed a "),a("code",[e._v("receipt.json")]),e._v(" file will be written\nto your current working directory, which is mounted to the "),a("code",[e._v("/app/config")]),e._v("\ndirectory within the container. This file contains important configuration\ninformation about the Airnode and is needed to remove the Airnode should the\nneed arise.")],1),e._v(" "),a("p",[a("airnode-DeployerPermissionsWarning")],1),e._v(" "),a("Tabs",{attrs:{type:"border-card"}},[a("Tab",{attrs:{label:"Linux/Mac/WSL2"}},[a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[e._v("docker run -it --rm "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  -e "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("USER_ID")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("id")]),e._v(" -u"),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v(" -e "),a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("GROUP_ID")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("id")]),e._v(" -g"),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  -v "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"'),a("span",{pre:!0,attrs:{class:"token variable"}},[a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("pwd")]),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v(':/app/config"')]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  api3/airnode-deployer:0.8.1 deploy\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br")])])]),e._v(" "),a("Tab",{attrs:{label:"Windows"}},[a("div",{staticClass:"language-batch line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-batch"}},[a("code",[e._v("# For Windows, use CMD "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token command"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("not")]),e._v(" PowerShell")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v(".\n"),a("span",{pre:!0,attrs:{class:"token command"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("docker")]),e._v(" run -it "),a("span",{pre:!0,attrs:{class:"token parameter attr-name"}},[e._v("--rm")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("^")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token parameter attr-name"}},[e._v("-v")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"%cd%:/app/config"')]),e._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("^")]),e._v("\n  api3/airnode-deployer:"),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("0")]),e._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("8")]),e._v("."),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("1")]),e._v(" deploy")]),e._v("\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br")])])])],1),e._v(" "),a("h3",{attrs:{id:"receipt-json"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#receipt-json"}},[e._v("#")]),e._v(" receipt.json")]),e._v(" "),a("p",[e._v("The "),a("code",[e._v("receipt.json")]),e._v(" file is a product of a deployment attempt. It contains\nAirnode configuration and deployment information and is used to remove the\nAirnode. The field "),a("code",[e._v("success")]),e._v(" is important in that it specifies whether the\ndeployment was successful or not.")]),e._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"airnodeWallet"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"airnodeAddress"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"0xaBd9daAdf32fCd96eE4607bf3d5B31e19a244Cac"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"airnodeAddressShort"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"abd9daa"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"xpub"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"xpub661MyMwAqRbcGHp9uC7...vbeziJwFHuNs"')]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"deployment"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"airnodeAddressShort"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"abd9daa"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"cloudProvider"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"type"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"aws"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n      "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"region"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"us-east-1"')]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"stage"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"dev"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"nodeVersion"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"0.8.1"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"timestamp"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"2022-03-26T02:37:55.506Z"')]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[e._v('"success"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[e._v("true")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br"),a("span",{staticClass:"line-number"},[e._v("12")]),a("br"),a("span",{staticClass:"line-number"},[e._v("13")]),a("br"),a("span",{staticClass:"line-number"},[e._v("14")]),a("br"),a("span",{staticClass:"line-number"},[e._v("15")]),a("br"),a("span",{staticClass:"line-number"},[e._v("16")]),a("br"),a("span",{staticClass:"line-number"},[e._v("17")]),a("br"),a("span",{staticClass:"line-number"},[e._v("18")]),a("br")])]),a("h2",{attrs:{id:"testing-with-http-gateway"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#testing-with-http-gateway"}},[e._v("#")]),e._v(" Testing with HTTP Gateway")]),e._v(" "),a("p",[e._v("If you opted to enable the HTTP Gateway it can be used to test the Airnode while\nbypassing the chain it was deployed to. There are three examples in other docs\nthat detail how to do this.")]),e._v(" "),a("ul",[a("li",[a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/guides/build-an-airnode/http-gateways.html#using-curl"}},[e._v("HTTP Gateways")])],1),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/tutorial/quick-deploy-aws/#test-the-airnode"}},[e._v("Quick Deploy AWS")])],1),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/tutorial/quick-deploy-gcp/#test-the-airnode"}},[e._v("Quick Deploy GCP")])],1),e._v(" "),a("li",[a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/tutorial/quick-deploy-container/#test-the-airnode"}},[e._v("Quick Deploy Container")])],1)]),e._v(" "),a("h2",{attrs:{id:"calling-the-airnode"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#calling-the-airnode"}},[e._v("#")]),e._v(" Calling the Airnode")]),e._v(" "),a("p",[e._v("Once the Airnode is deployed, see\n"),a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-developers/call-an-airnode.html"}},[e._v("Calling an Airnode")]),e._v(" to learn how\nrequests are made to it.")],1),e._v(" "),a("h2",{attrs:{id:"removing-the-airnode"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#removing-the-airnode"}},[e._v("#")]),e._v(" Removing the Airnode")]),e._v(" "),a("p",[e._v("If you would like to remove a deployed Airnode, see the Docker image commands\nfor "),a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/docker/deployer-image.html#remove-with-receipt"}},[e._v("remove-with-receipt")]),e._v(" or\n"),a("RouterLink",{attrs:{to:"/airnode/v0.8/grp-providers/docker/deployer-image.html#remove-with-deployment-details"}},[e._v("remove-with-deployment-details")]),e._v("\ninstructions.")],1)],1)}),[],!1,null,null,null);t.default=r.exports}}]);