(window.webpackJsonp=window.webpackJsonp||[]).push([[524],{1227:function(e,a,s){"use strict";s.r(a);var t=s(9),n=Object(t.a)({},(function(){var e=this,a=e.$createElement,s=e._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("TitleSpan",[e._v(e._s(e.$frontmatter.folder))]),e._v(" "),s("h1",{attrs:{id:"frontmatter-title"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#frontmatter-title"}},[e._v("#")]),e._v(" "+e._s(e.$frontmatter.title))]),e._v(" "),s("VersionWarning"),e._v(" "),s("TocHeader"),e._v(" "),s("TOC",{staticClass:"table-of-contents",attrs:{"include-level":[2,3]}}),e._v(" "),s("p",[e._v("Use the deployer image to deploy or remove an Airnode with a cloud provider such\nas AWS. The simplest way is to use the pre-built packages. If you would rather\nbuild the images yourself see the\n"),s("a",{attrs:{href:"https://github.com/api3dao/airnode/tree/v0.6/packages/airnode-deployer/docker",target:"_blank",rel:"noopener noreferrer"}},[e._v("README"),s("OutboundLink")],1),e._v("\nin the deployer package.")]),e._v(" "),s("p",[e._v("The deployer image has two commands.")]),e._v(" "),s("ul",[s("li",[s("code",[e._v("deploy")]),e._v(": Deploys or updates an Airnode using configuration files.")]),e._v(" "),s("li",[s("code",[e._v("remove")]),e._v(": Removes an Airnode using its "),s("code",[e._v("receipt.json")]),e._v(" file.")])]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("Quick Deploy Demos")]),e._v(" "),s("p",[e._v("See the "),s("RouterLink",{attrs:{to:"/airnode/v0.6/grp-providers/tutorial/"}},[e._v("Quick Deploy Demos")]),e._v(" to quickly "),s("code",[e._v("deploy")]),e._v(" and "),s("code",[e._v("remove")]),e._v(" a\npreconfigured Airnode using the deployer image.")],1)]),e._v(" "),s("h2",{attrs:{id:"configuration-files"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#configuration-files"}},[e._v("#")]),e._v(" Configuration Files")]),e._v(" "),s("p",[e._v("The files "),s("code",[e._v("config.json")]),e._v(" and "),s("code",[e._v("secrets.env")]),e._v(" are used to configure the Airnode. The\n"),s("code",[e._v("aws.env")]),e._v(" and "),s("code",[e._v("gcp.json")]),e._v(" files are used to define environment information the\ndeployer uses to connect to these cloud providers.")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v("my-airnode\n├── aws.env     <- Used for AWS deployment\n├── gcp.json    <- Used for GCP deployment\n├── config\n│   ├── config.json\n│   └── secrets.env\n└── output\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br"),s("span",{staticClass:"line-number"},[e._v("7")]),s("br")])]),s("h2",{attrs:{id:"cloud-provider-credentials"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cloud-provider-credentials"}},[e._v("#")]),e._v(" Cloud Provider Credentials")]),e._v(" "),s("p",[e._v("In order to deploy Airnode to a serverless cloud provider, you need to provide\ncould provider credentials to the Airnode deployer image. The deployer image\ncurrently supports deploying to AWS and GCP.")]),e._v(" "),s("h3",{attrs:{id:"aws"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#aws"}},[e._v("#")]),e._v(" AWS")]),e._v(" "),s("p",[e._v("If you are new to AWS watch this\n"),s("a",{attrs:{href:"https://www.youtube.com/watch?v=KngM5bfpttA",target:"_blank",rel:"noopener noreferrer"}},[e._v("video"),s("OutboundLink")],1),e._v(" to set up an AWS account\nand create cloud provider credentials.")]),e._v(" "),s("h3",{attrs:{id:"gcp"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#gcp"}},[e._v("#")]),e._v(" GCP")]),e._v(" "),s("ul",[s("li",[e._v("Create a\n"),s("a",{attrs:{href:"https://cloud.google.com/resource-manager/docs/creating-managing-projects",target:"_blank",rel:"noopener noreferrer"}},[e._v("Google Cloud project"),s("OutboundLink")],1)]),e._v(" "),s("li",[e._v("Enable\n"),s("a",{attrs:{href:"https://console.cloud.google.com/apis/library/appengine.googleapis.com",target:"_blank",rel:"noopener noreferrer"}},[e._v("App Engine Admin API"),s("OutboundLink")],1),e._v("\nfor your project")]),e._v(" "),s("li",[e._v("Create a new\n"),s("a",{attrs:{href:"https://console.cloud.google.com/iam-admin/serviceaccounts",target:"_blank",rel:"noopener noreferrer"}},[e._v("service account"),s("OutboundLink")],1),e._v("\nwith the "),s("code",[e._v("Owner")]),e._v(" role")]),e._v(" "),s("li",[e._v("Add a new access key of type JSON for the service account and download it as\n"),s("code",[e._v("gcp.json")])])]),e._v(" "),s("h2",{attrs:{id:"deploy"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#deploy"}},[e._v("#")]),e._v(" deploy")]),e._v(" "),s("p",[e._v("The "),s("code",[e._v("deploy")]),e._v(" command will create the Airnode with a cloud provider or update it\nif it already exists. Three files are needed to run the deploy command.")]),e._v(" "),s("ul",[s("li",[e._v("config.json")]),e._v(" "),s("li",[e._v("secrets.env")]),e._v(" "),s("li",[e._v("aws.env (AWS only)")]),e._v(" "),s("li",[e._v("gcp.json (GCP only)")])]),e._v(" "),s("p",[e._v("A "),s("code",[e._v("receipt.json")]),e._v(" file will be created upon completion. It contains some\ndeployment information and is used to remove the Airnode.")]),e._v(" "),s("airnode-WarningSimultaneousDeployments",{attrs:{removeLink:"./deployer-image.html#manual-removal"}}),e._v(" "),s("p",[s("airnode-DeployerPermissionsWarning")],1),e._v(" "),s("h3",{attrs:{id:"aws-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#aws-2"}},[e._v("#")]),e._v(" AWS")]),e._v(" "),s("Tabs",{attrs:{type:"border-card"}},[s("Tab",{attrs:{label:"Linux/Mac/WSL2"}},[s("div",{staticClass:"language-sh line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[e._v("docker run -it --rm "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --env-file aws.env "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  -e "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("USER_ID")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("id")]),e._v(" -u"),s("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v(" -e "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("GROUP_ID")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("id")]),e._v(" -g"),s("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  -v "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"'),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("pwd")]),s("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v('/config:/app/config"')]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  -v "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"'),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("pwd")]),s("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v('/output:/app/output"')]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  api3/airnode-deployer:0.6.7 deploy\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br")])])]),e._v(" "),s("Tab",{attrs:{label:"Windows"}},[s("p",[e._v("For Windows, use CMD (and not PowerShell).")]),e._v(" "),s("div",{staticClass:"language-sh line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[e._v("docker run -it --rm ^\n  --env-file aws.env ^\n  -v "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"%cd%/config:/app/config"')]),e._v(" ^\n  -v "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"%cd%/output:/app/output"')]),e._v(" ^\n  api3/airnode-deployer:0.6.7 deploy\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br")])])])],1),e._v(" "),s("h3",{attrs:{id:"gcp-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#gcp-2"}},[e._v("#")]),e._v(" GCP")]),e._v(" "),s("Tabs",{attrs:{type:"border-card"}},[s("Tab",{attrs:{label:"Linux/Mac/WSL2"}},[s("div",{staticClass:"language-sh line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[e._v("docker run -it --rm "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  -e "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("USER_ID")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("id")]),e._v(" -u"),s("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v(" -e "),s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("GROUP_ID")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("id")]),e._v(" -g"),s("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  -v "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"'),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("pwd")]),s("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v('/gcp.json:/app/gcp.json"')]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  -v "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"'),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("pwd")]),s("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v('/config:/app/config"')]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  -v "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"'),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("pwd")]),s("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v('/output:/app/output"')]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  api3/airnode-deployer:0.6.7 deploy\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br")])])]),e._v(" "),s("Tab",{attrs:{label:"Windows"}},[s("div",{staticClass:"language-sh line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[e._v("docker run -it --rm ^\n  -v "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"%cd%/gcp.json:/app/gcp.json"')]),e._v(" ^\n  -v "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"%cd%/config:/app/config"')]),e._v(" ^\n  -v "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"%cd%/output:/app/output"')]),e._v(" ^\n  api3/airnode-deployer:0.6.7 deploy\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br")])])])],1),e._v(" "),s("h2",{attrs:{id:"remove"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#remove"}},[e._v("#")]),e._v(" remove")]),e._v(" "),s("p",[e._v("When an Airnode was deployed using the "),s("code",[e._v("deploy")]),e._v(" command a "),s("code",[e._v("receipt.json")]),e._v(" file\nwas created. Use this file to remove an Airnode.")]),e._v(" "),s("h3",{attrs:{id:"aws-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#aws-3"}},[e._v("#")]),e._v(" AWS")]),e._v(" "),s("Tabs",{attrs:{type:"border-card"}},[s("Tab",{attrs:{label:"Linux/Mac/WSL2"}},[s("div",{staticClass:"language-sh line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[e._v("docker run -it --rm "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --env-file aws.env "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  -v "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"'),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("pwd")]),s("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v('/output:/app/output"')]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  api3/airnode-deployer:0.6.7 remove -r output/receipt.json\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br")])])]),e._v(" "),s("Tab",{attrs:{label:"Windows"}},[s("p",[e._v("For Windows, use CMD (and not PowerShell).")]),e._v(" "),s("div",{staticClass:"language-sh line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[e._v("docker run -it --rm ^\n  --env-file aws.env ^\n  -v "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"%cd%/output:/app/output"')]),e._v(" ^\n  api3/airnode-deployer:7 remove -r output/receipt.json\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br")])])])],1),e._v(" "),s("h3",{attrs:{id:"gcp-3"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#gcp-3"}},[e._v("#")]),e._v(" GCP")]),e._v(" "),s("Tabs",{attrs:{type:"border-card"}},[s("Tab",{attrs:{label:"Linux/Mac/WSL2"}},[s("div",{staticClass:"language-sh line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[e._v("docker run -it --rm "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  -v "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"'),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("pwd")]),s("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v('/gcp.json:/app/gcp.json"')]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  -v "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"'),s("span",{pre:!0,attrs:{class:"token variable"}},[s("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$(")]),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("pwd")]),s("span",{pre:!0,attrs:{class:"token variable"}},[e._v(")")])]),e._v('/output:/app/output"')]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  api3/airnode-deployer:0.6.7 remove -r output/receipt.json\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br")])])]),e._v(" "),s("Tab",{attrs:{label:"Windows"}},[s("p",[e._v("For Windows, use CMD (and not PowerShell).")]),e._v(" "),s("div",{staticClass:"language-sh line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[e._v("docker run -it --rm ^\n  -v "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"%cd%/gcp.json:/app/gcp.json"')]),e._v(" ^\n  -v "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v('"%cd%/output:/app/output"')]),e._v(" ^\n  api3/airnode-deployer:0.6.7 remove -r output/receipt.json\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br")])])])],1),e._v(" "),s("h2",{attrs:{id:"manual-removal"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#manual-removal"}},[e._v("#")]),e._v(" Manual Removal")]),e._v(" "),s("p",[e._v("Optionally you can remove an Airnode manually though it is highly recommended\nthat you do so using the deployer image's "),s("code",[e._v("remove")]),e._v(" command. Airnode has a\npresence in several areas of both AWS and GCP. An Airnode has a\n"),s("code",[e._v("airnodeAddressShort")]),e._v(" (e.g., "),s("code",[e._v("0ab830c")]),e._v(") that is included in the element name of\nAWS and GCP deployed features.")]),e._v(" "),s("div",{staticClass:"custom-block danger"},[s("p",{staticClass:"custom-block-title"},[e._v("Remember")]),e._v(" "),s("p",[e._v("Only delete elements of a feature with the "),s("code",[e._v("airnodeAddressShort")]),e._v(" address in the\nname you are targeting. There can be more than one Airnode.")])]),e._v(" "),s("Tabs",{attrs:{type:"border-card"}},[s("Tab",{attrs:{label:"AWS"}},[s("airnode-DeleteAirnodeAws")],1),e._v(" "),s("Tab",{attrs:{label:"GCP"}},[s("airnode-DeleteAirnodeGcp")],1)],1),e._v(" "),s("p",[e._v("Learn more about AWS or GCP resources that Airnode uses in the\n"),s("RouterLink",{attrs:{to:"/airnode/v0.6/reference/cloud-resources.html"}},[e._v("Cloud Resources")]),e._v(" doc.")],1)],1)}),[],!1,null,null,null);a.default=n.exports}}]);