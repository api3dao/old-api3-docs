(window.webpackJsonp=window.webpackJsonp||[]).push([[307],{936:function(t,s,a){"use strict";a.r(s);var e=a(9),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("TitleSpan",[t._v(t._s(t.$frontmatter.folder))]),t._v(" "),a("h1",{attrs:{id:"frontmatter-title"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#frontmatter-title"}},[t._v("#")]),t._v(" "+t._s(t.$frontmatter.title))]),t._v(" "),a("VersionWarning"),t._v(" "),a("TocHeader"),t._v(" "),a("TOC",{staticClass:"table-of-contents",attrs:{"include-level":[2,4]}}),t._v(" "),a("p",[t._v("The\n"),a("a",{attrs:{href:"https://github.com/api3dao/airnode/tree/v0.10/packages/airnode-adapter",target:"_blank",rel:"noopener noreferrer"}},[t._v("airnode-adapter"),a("OutboundLink")],1),t._v("\npackage has multiple responsibilities. It is used for building requests from an\n"),a("RouterLink",{attrs:{to:"/ois/v1.4/"}},[t._v("Oracle Integration Specification (OIS)")]),t._v(", executing them, parsing\nthe responses, but also converting and encoding them for on chain use.")],1),t._v(" "),a("p",[t._v("It is an internal dependency of Airnode, but can also be used standalone as an\nAPI.")]),t._v(" "),a("h2",{attrs:{id:"installation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#installation"}},[t._v("#")]),t._v(" Installation")]),t._v(" "),a("p",[t._v("You can install "),a("code",[t._v("@api3/airnode-adapter")]),t._v(" by adding it to the "),a("code",[t._v("package.json")]),t._v(" file\nin your project.")]),t._v(" "),a("div",{staticClass:"language-sh line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" --save @api3/airnode-adapter\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# or by")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("yarn")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" @api3/airnode-adapter\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])]),a("p",[t._v("You shouldn't need to use the adapter package directly. However, you might want\nto use its API to double check the conversion or encoding behavior for which you\ncan install this package and verify your assumptions.")]),t._v(" "),a("h2",{attrs:{id:"conversion"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#conversion"}},[t._v("#")]),t._v(" Conversion")]),t._v(" "),a("p",[t._v("While the adapter package has many responsibilities, many of those can be\ntreated as implementation details. On the other hand, there are a few important\nbehaviors to be noted when converting the response values based on the target\ntype and making the response transaction on chain.")]),t._v(" "),a("p",[t._v("Altogether, the response cycle consists of multiple steps")]),t._v(" "),a("ol",[a("li",[t._v("A successful API call is made and Airnode receives a response value.")]),t._v(" "),a("li",[t._v("The value to be converted is extracted from the response using the\n"),a("RouterLink",{attrs:{to:"/ois/v1.4/reserved-parameters.html#path"}},[t._v("_path")]),t._v(" from the OIS object.")],1),t._v(" "),a("li",[t._v("This extracted value is converted to the target type. Conversions are\nperformed internally by the "),a("code",[t._v("castValue(value, type)")]),t._v(" function.")]),t._v(" "),a("li",[t._v("The converted value is encoded to the native solidity type based on the\n"),a("RouterLink",{attrs:{to:"/ois/v1.4/reserved-parameters.html#type"}},[t._v("_type")]),t._v(" from the OIS object. Encoding\nis performed internally by the "),a("code",[t._v("encodeValue(value, type)")]),t._v(" function.")],1)]),t._v(" "),a("p",[t._v("If any of the steps above fail, an error is thrown. This will fail the given API\nrequest and the error reason can be found in the logs.")]),t._v(" "),a("p",[t._v("The rest of this section covers the conversion logic for all of the supported\ntypes.")]),t._v(" "),a("h3",{attrs:{id:"int256-or-uint256"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#int256-or-uint256"}},[t._v("#")]),t._v(" "),a("code",[t._v("int256")]),t._v(" or "),a("code",[t._v("uint256")])]),t._v(" "),a("p",[t._v("Converting any of the values in the following example will result in an error:")]),t._v(" "),a("div",{staticClass:"language-ts line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("ERROR_VALUES")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("Infinity")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("NaN")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("''")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// empty string")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'randomstring'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// arrays of any kind")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// objects of any kind")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br")])]),a("p",[t._v("There are a few special strings and boolean values that are convertible to\n"),a("code",[t._v("int256")]),t._v(" or "),a("code",[t._v("uint256")]),t._v(":")]),t._v(" "),a("div",{staticClass:"language-ts line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("SPECIAL_INT_VALUES")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'false'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'true'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" values "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("SPECIAL_INT_VALUES")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("map")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("v"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" adapter"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("castValue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("v"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'int256'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("console")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("values"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// [0, 0, 1, 1];")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br")])]),a("p",[t._v("Number strings and numbers will attempt to be converted to\n"),a("a",{attrs:{href:"https://mikemcl.github.io/bignumber.js/",target:"_blank",rel:"noopener noreferrer"}},[t._v("BigNumbers"),a("OutboundLink")],1),t._v(". The value will also be\nmultiplied by the value of the "),a("RouterLink",{attrs:{to:"/ois/v1.4/reserved-parameters.html#times"}},[t._v("_times")]),t._v("\nparameter if it is present.")],1),t._v(" "),a("div",{staticClass:"language-ts line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("VALID_INT_VALUES")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'123.456'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("7777")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" values "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("VALID_INT_VALUES")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("map")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("v"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" adapter"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("castValue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("v"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'uint256'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("console")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("values"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// [new BigNumber(123.456), new BigNumber(7777)];")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br")])]),a("p",[t._v("Conversion for "),a("code",[t._v("int256")]),t._v(" and "),a("code",[t._v("uint256")]),t._v(" is the same - this means that "),a("code",[t._v("-123")]),t._v(" can\nbe converted to "),a("code",[t._v("uint256")]),t._v(". However, an error will be thrown while encoding.")]),t._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("Flooring")]),t._v(" "),a("p",[t._v("Beware that any floating point number will be "),a("strong",[t._v("floored")]),t._v(". This is necessary,\nbecause floating point numbers are not valid in solidity. To mitigate precision\nloss, you can use the "),a("RouterLink",{attrs:{to:"/ois/v1.4/reserved-parameters.html#times"}},[a("code",[t._v("_times")])]),t._v("\nparameter that is sufficiently large.")],1),t._v(" "),a("p",[t._v("For example, if the API response is a USD currency, you might want to use\n"),a("code",[t._v('_times: "100"')]),t._v(" to convert the value to cents.")])]),t._v(" "),a("h3",{attrs:{id:"bool"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bool"}},[t._v("#")]),t._v(" "),a("code",[t._v("bool")])]),t._v(" "),a("p",[t._v("Converting values in the example are all considered "),a("code",[t._v("false")]),t._v(".")]),t._v(" "),a("div",{staticClass:"language-ts line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-ts"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("FALSE_BOOLEAN_VALUES")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'0'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'false'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" values "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("FALSE_BOOLEAN_VALUES")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("map")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("v"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" adapter"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("castValue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("v"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'bool'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token builtin"}},[t._v("console")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("values"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// [false, false, false, false, false, false];")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br")])]),a("p",[t._v("All other values are converted to "),a("code",[t._v("true")]),t._v(".")]),t._v(" "),a("h3",{attrs:{id:"bytes32"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bytes32"}},[t._v("#")]),t._v(" "),a("code",[t._v("bytes32")])]),t._v(" "),a("p",[t._v("There is no conversion for "),a("code",[t._v("bytes32")]),t._v(" - the value is expected to be a valid hex\nstring representing the encoded 32 bytes value. This means that the encoding\n"),a("strong",[t._v("must")]),t._v(" be implemented on the API side. If you want to delegate the encoding to\nAirnode, see the documentation for\n"),a("RouterLink",{attrs:{to:"/airnode/v0.10/reference/packages/adapter.html#string32-encoded-to-bytes32-on-chain"}},[a("code",[t._v("string32")])]),t._v(".")],1),t._v(" "),a("p",[t._v("For example, let's say the API wants to encode the following string\n"),a("code",[t._v("simple string")]),t._v(" with length 13. Its encoding is\n"),a("code",{staticStyle:{"overflow-wrap":"break-word"}},[t._v("0x73696d706c6520737472696e6700000000000000000000000000000000000000")]),t._v(".\nThis is the value that should be sent as a response to Airnode request, together\nwith the "),a("code",[t._v("0x")]),t._v(" prefix.")]),t._v(" "),a("p",[t._v("You can use "),a("a",{attrs:{href:"https://docs.ethers.io/v5/",target:"_blank",rel:"noopener noreferrer"}},[t._v("ethers"),a("OutboundLink")],1),t._v(" to encode these on the API side")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" value "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'simple string'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" encoded "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ethers"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("utils"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("formatBytes32String")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("encoded"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 0x73696d706c6520737472696e6700000000000000000000000000000000000000")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])]),a("h3",{attrs:{id:"address"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#address"}},[t._v("#")]),t._v(" "),a("code",[t._v("address")])]),t._v(" "),a("p",[t._v("There is no conversion for "),a("code",[t._v("address")]),t._v(" - the value is expected to be a string\nrepresenting a valid address. Valid examples are:")]),t._v(" "),a("ul",[a("li",[a("code",{staticStyle:{"overflow-wrap":"break-word"}},[t._v("0x0765baA22F6D4A53847D63B056DC79400b9A592a")]),t._v(" -\n"),a("a",{attrs:{href:"https://github.com/ethereum/EIPs/blob/master/EIPS/eip-55.md",target:"_blank",rel:"noopener noreferrer"}},[t._v("EIP-55 mixed case checksum"),a("OutboundLink")],1),t._v("\nof an address.")]),t._v(" "),a("li",[a("code",{staticStyle:{"overflow-wrap":"break-word"}},[t._v("0x0765baa22f6d4a53847d63b056dc79400b9a592a")]),t._v(" -\nall lowercase address.")])]),t._v(" "),a("h3",{attrs:{id:"bytes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bytes"}},[t._v("#")]),t._v(" "),a("code",[t._v("bytes")])]),t._v(" "),a("p",[t._v("There is no conversion for "),a("code",[t._v("bytes")]),t._v(" - the value is expected to be a valid hex\nstring representing the encoded value. This means that the encoding to bytes\n"),a("strong",[t._v("must")]),t._v(" be implemented on the API side. If you want to send a string, see the\ndocumentation for "),a("RouterLink",{attrs:{to:"/airnode/v0.10/reference/packages/adapter.html#string"}},[a("code",[t._v("string")])]),t._v(".")],1),t._v(" "),a("p",[t._v("For example, let's say the API wants to encode the following string\n"),a("code",[t._v("this is an example string that is a bit longer")]),t._v(". Its encoding is\n"),a("code",{staticStyle:{"overflow-wrap":"break-word"}},[t._v("0x7468697320697320616e206578616d706c6520737472696e672074686174206973206120626974206c6f6e676572")]),t._v(".\nThis is the value that should be sent as a response to Airnode request, together\nwith the "),a("code",[t._v("0x")]),t._v(" prefix.")]),t._v(" "),a("p",[t._v("You can use "),a("a",{attrs:{href:"https://docs.ethers.io/v5/",target:"_blank",rel:"noopener noreferrer"}},[t._v("ethers"),a("OutboundLink")],1),t._v(" to encode these on the API side")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" value "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'this is an example string that is a bit longer'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" encodedValue "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ethers"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("utils"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("hexlify")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("ethers"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("utils"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("toUtf8Bytes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("value"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("encodedValue"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 0x7468697320697320616e206578616d706c6520737472696e672074686174206973206120626974206c6f6e676572")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])]),a("h3",{attrs:{id:"string"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#string"}},[t._v("#")]),t._v(" "),a("code",[t._v("string")])]),t._v(" "),a("p",[t._v("You can pass any value to convert it to string - with the exception of arrays\nand objects, which will throw an error. All other values will be converted to\n"),a("code",[t._v("string")]),t._v(" and before encoded on chain using the "),a("code",[t._v("string")]),t._v(" type.")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" values "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("777.89")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'simple string'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'this is an example string that is a bit longer'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// ["-1", "0", "777.89", "null", "simple string", "this is an example string that is a bit longer"]')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" mappedValues "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" values"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("map")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("v")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" adapter"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("castValue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("v"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'string'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br")])]),a("h3",{attrs:{id:"string32"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#string32"}},[t._v("#")]),t._v(" "),a("code",[t._v("string32")])]),t._v(" "),a("p",[t._v("You can pass any value to convert it to string - with the exception of arrays\nand objects, which will throw an error.")]),t._v(" "),a("p",[t._v("However, there is one exception, if the stringified value contains more than 31\ncharacters it will be "),a("strong",[t._v("trimmed down")]),t._v(" to only the first 31 characters during\nconversion.")]),t._v(" "),a("p",[t._v("For example, if the API response is the following string\n"),a("code",[t._v("this is an example string that is a bit longer")]),t._v(" with length 46. It will be\nfirst trimmed to 31 characters, string "),a("code",[t._v("this is an example string that")]),t._v(" and\nafterwards converted to\n"),a("code",{staticStyle:{"overflow-wrap":"break-word"}},[t._v("0x7468697320697320616e206578616d706c6520737472696e6720746861742000")]),t._v(".")]),t._v(" "),a("p",[t._v("You can use "),a("a",{attrs:{href:"https://docs.ethers.io/v5/",target:"_blank",rel:"noopener noreferrer"}},[t._v("ethers"),a("OutboundLink")],1),t._v(" to decode the values off chain\nusing the following snippet")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" encoded "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'0x7468697320697320616e206578616d706c6520737472696e6720746861742000'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" decoded "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ethers"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("utils"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("parseBytes32String")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("encoded"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("decoded"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "this is an example string that "')]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br")])]),a("h3",{attrs:{id:"arrays"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#arrays"}},[t._v("#")]),t._v(" Arrays")]),t._v(" "),a("p",[t._v("Conversion of arrays depends on the primitive type. All values of the array (or\nnested array) will be converted according to the rules of the primitive type.")]),t._v(" "),a("p",[t._v("For example:")]),t._v(" "),a("ul",[a("li",[a("code",[t._v("int256[]")]),t._v(" - has primitive type "),a("code",[t._v("int256")]),t._v(". All elements of this array follow\nthe "),a("RouterLink",{attrs:{to:"/airnode/v0.10/reference/packages/adapter.html#int256-or-uint256"}},[a("code",[t._v("int256")])]),t._v(" rules.")],1),t._v(" "),a("li",[a("code",[t._v("string32[7][][5]")]),t._v(" - is a multidimensional array, where some dimensions are\nfixed and some not. This is irrelevant though, and all the elements are\nconverted based on\n"),a("RouterLink",{attrs:{to:"/airnode/v0.10/reference/packages/adapter.html#string32-encoded-to-bytes32-on-chain"}},[a("code",[t._v("string32")])]),t._v(" rules.")],1)])],1)}),[],!1,null,null,null);s.default=n.exports}}]);