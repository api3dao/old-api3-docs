(window.webpackJsonp=window.webpackJsonp||[]).push([[575],{1297:function(e,t,o){"use strict";o.r(t);var n=o(9),r=Object(n.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("TitleSpan",[e._v(e._s(e.$frontmatter.folder))]),e._v(" "),o("h1",{attrs:{id:"frontmatter-title"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#frontmatter-title"}},[e._v("#")]),e._v(" "+e._s(e.$frontmatter.title))]),e._v(" "),o("VersionWarning"),e._v(" "),o("TocHeader"),e._v(" "),o("TOC",{staticClass:"table-of-contents",attrs:{"include-level":[2,3]}}),e._v(" "),o("p",[e._v("The Build an Airnode guide will discuss, in detail, how an Airnode is\nconstructed. But first, see the "),o("RouterLink",{attrs:{to:"/airnode/v0.7/grp-providers/tutorial/"}},[e._v("Quick Deploy")]),e._v(" demos\nto get a simple understanding of an Airnode deployment. The demos\n"),o("RouterLink",{attrs:{to:"/airnode/v0.7/grp-providers/tutorial/quick-deploy-aws/"}},[e._v("Quick Deploy AWS")]),e._v(" and\n"),o("RouterLink",{attrs:{to:"/airnode/v0.7/grp-providers/tutorial/quick-deploy-gcp/"}},[e._v("Quick Deploy GCP")]),e._v(" each have preconfigured\ndownloadable project folders with files for a typical deployment. This guide\nprimarily focuses on a deployment to AWS but describes changes that are needed\nfor GCP deployments when encountered.")],1),e._v(" "),o("h2",{attrs:{id:"project-folder"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#project-folder"}},[e._v("#")]),e._v(" Project Folder")]),e._v(" "),o("p",[e._v("Create a folder called "),o("code",[e._v("/my-airnode")]),e._v(" with two more internal folders named\n"),o("code",[e._v("/config")]),e._v(" and "),o("code",[e._v("/output")]),e._v(". Add the files "),o("code",[e._v("config.json")]),e._v(", "),o("code",[e._v("secrets.env")]),e._v(", and\n"),o("code",[e._v("aws.env")]),e._v(" as shown below. Optionally add "),o("code",[e._v("gcp.json")]),e._v(" if you intend to deploy to\nGCP as well.")]),e._v(" "),o("div",{staticClass:"language- line-numbers-mode"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[e._v("my-airnode\n├── aws.env     <- For AWS deployment\n├── gcp.json    <- Optional for GCP deployment\n├── config\n│   ├── config.json\n│   └── secrets.env\n└── output\n")])]),e._v(" "),o("div",{staticClass:"line-numbers-wrapper"},[o("span",{staticClass:"line-number"},[e._v("1")]),o("br"),o("span",{staticClass:"line-number"},[e._v("2")]),o("br"),o("span",{staticClass:"line-number"},[e._v("3")]),o("br"),o("span",{staticClass:"line-number"},[e._v("4")]),o("br"),o("span",{staticClass:"line-number"},[e._v("5")]),o("br"),o("span",{staticClass:"line-number"},[e._v("6")]),o("br"),o("span",{staticClass:"line-number"},[e._v("7")]),o("br")])]),o("p",[e._v("This guide will explain the content of the configuration files and run the\ndeployment within this project folder. Use the files in the\n"),o("RouterLink",{attrs:{to:"/airnode/v0.7/reference/templates/config-json.html"}},[e._v("Templates")]),e._v(" section of the docs to\nget a jump start if you are new to Airnode. Also consider the\n"),o("RouterLink",{attrs:{to:"/airnode/v0.7/grp-providers/tutorial/"}},[e._v("Quick Deploy Demos")]),e._v(" if you are new to Airnode before using\nthis guide.")],1),e._v(" "),o("h2",{attrs:{id:"configuration"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#configuration"}},[e._v("#")]),e._v(" Configuration")]),e._v(" "),o("p",[e._v("The main focus while creating an Airnode is the preparation of three files (two\nfor GCP) that both define and support its creation.")]),e._v(" "),o("ul",[o("li",[o("code",[e._v("config.json")]),e._v(": Defines the Airnode and its behavior.")]),e._v(" "),o("li",[o("code",[e._v("secrets.env")]),e._v(": Hold secrets referenced by "),o("code",[e._v("config.json")]),e._v(" using interpolation.")]),e._v(" "),o("li",[o("code",[e._v("aws.env")]),e._v(": Holds the AWS credentials used by the Docker deployer image to\ndeploy the Airnode to AWS.")]),e._v(" "),o("li",[o("code",[e._v("gcp.json")]),e._v(": (GCP) only) Holds the GCP project ID and associated information\nused by the Docker deployer image to deploy the Airnode to GCP.")])]),e._v(" "),o("h2",{attrs:{id:"deployment"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#deployment"}},[e._v("#")]),e._v(" Deployment")]),e._v(" "),o("p",[e._v("Last is the deployment. There are two ways to run the Airnode. The most popular\nis with a cloud provider like AWS or GCP. You would use the Docker\n"),o("RouterLink",{attrs:{to:"/airnode/v0.7/grp-providers/docker/deployer-image.html"}},[e._v("Airnode Deployer Image")]),e._v(" for this type\nof deployment. This guide will use the deployer image.")],1),e._v(" "),o("p",[e._v("The second method is to run a containerized Airnode hosted internally or with a\ncloud provider service (e.g. AWS EC2 or Lightsail). Use the Docker\n"),o("RouterLink",{attrs:{to:"/airnode/v0.7/grp-providers/docker/client-image.html"}},[e._v("Airnode Client Image")]),e._v(" for this type of\ndeployment.")],1),e._v(" "),o("p",[e._v("Complete the following sections for an in-depth understanding of Airnode.")]),e._v(" "),o("ul",[o("li",[o("RouterLink",{attrs:{to:"/airnode/v0.7/grp-providers/guides/build-an-airnode/api-integration.html"}},[e._v("API Integration")])],1),e._v(" "),o("li",[o("RouterLink",{attrs:{to:"/airnode/v0.7/grp-providers/guides/build-an-airnode/api-security.html"}},[e._v("API Security")])],1),e._v(" "),o("li",[o("RouterLink",{attrs:{to:"/airnode/v0.7/grp-providers/guides/build-an-airnode/configuring-airnode.html"}},[e._v("Configuring Airnode")])],1),e._v(" "),o("li",[o("RouterLink",{attrs:{to:"/airnode/v0.7/grp-providers/guides/build-an-airnode/apply-auth.html"}},[e._v("Using Authorizers")]),e._v(" optional")],1),e._v(" "),o("li",[o("RouterLink",{attrs:{to:"/airnode/v0.7/grp-providers/guides/build-an-airnode/heartbeat.html"}},[e._v("Heartbeat")]),e._v(" optional")],1),e._v(" "),o("li",[o("RouterLink",{attrs:{to:"/airnode/v0.7/grp-providers/guides/build-an-airnode/http-gateways.html"}},[e._v("HTTP Gateways")]),e._v(" optional")],1),e._v(" "),o("li",[o("RouterLink",{attrs:{to:"/airnode/v0.7/grp-providers/guides/build-an-airnode/deploying-airnode.html"}},[e._v("Deploying Airnode")])],1)])],1)}),[],!1,null,null,null);t.default=r.exports}}]);