(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{430:function(e,n,t){e.exports=function(){var e="undefined"!=typeof window,n="undefined"!=typeof navigator,t=e&&("ontouchstart"in window||n&&navigator.msMaxTouchPoints>0)?["touchstart"]:["click"];function i(e){var n=e.event,t=e.handler;(0,e.middleware)(n)&&t(n)}function r(e,n){var r=function(e){var n="function"==typeof e;if(!n&&"object"!=typeof e)throw new Error("v-click-outside: Binding value must be a function or an object");return{handler:n?e:e.handler,middleware:e.middleware||function(e){return e},events:e.events||t,isActive:!(!1===e.isActive),detectIframe:!(!1===e.detectIframe)}}(n.value),o=r.handler,a=r.middleware,c=r.detectIframe;if(r.isActive){if(e["__v-click-outside"]=r.events.map((function(n){return{event:n,srcTarget:document.documentElement,handler:function(n){return function(e){var n=e.el,t=e.event,r=e.handler,o=e.middleware,a=t.path||t.composedPath&&t.composedPath();(a?a.indexOf(n)<0:!n.contains(t.target))&&i({event:t,handler:r,middleware:o})}({el:e,event:n,handler:o,middleware:a})}}})),c){var d={event:"blur",srcTarget:window,handler:function(n){return function(e){var n=e.el,t=e.event,r=e.handler,o=e.middleware;setTimeout((function(){var e=document.activeElement;e&&"IFRAME"===e.tagName&&!n.contains(e)&&i({event:t,handler:r,middleware:o})}),0)}({el:e,event:n,handler:o,middleware:a})}};e["__v-click-outside"]=[].concat(e["__v-click-outside"],[d])}e["__v-click-outside"].forEach((function(n){var t=n.event,i=n.srcTarget,r=n.handler;return setTimeout((function(){e["__v-click-outside"]&&i.addEventListener(t,r,!1)}),0)}))}}function o(e){(e["__v-click-outside"]||[]).forEach((function(e){return e.srcTarget.removeEventListener(e.event,e.handler,!1)})),delete e["__v-click-outside"]}var a=e?{bind:r,update:function(e,n){var t=n.value,i=n.oldValue;JSON.stringify(t)!==JSON.stringify(i)&&(o(e),r(e,{value:t}))},unbind:o}:{};return{install:function(e){e.directive("click-outside",a)},directive:a}}()},434:function(e,n,t){},451:function(e,n,t){"use strict";t(434)},511:function(e,n,t){"use strict";t.r(n);var i=t(0),r=t(430),o=t.n(r);i.a.use(o.a);var a={name:"versions-modal",props:{env:String,showModal:Boolean,versions:Array},methods:{onClickOutside:function(e,n){this.$emit("clicked")}}},c=(t(451),t(9)),d=Object(c.a)(a,(function(){var e=this,n=e.$createElement,t=e._self._c||n;return e.showModal?t("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.onClickOutside,expression:"onClickOutside"}],staticClass:"modal"},[e.showModal?t("div",[t("div",[t("div",{staticStyle:{"border-bottom":"1px solid lightgrey"}},[e._v("Versions")]),e._v(" "),e._l(e.versions,(function(n,i){return t("div",{key:i,on:{click:function(t){return e.onClickOutside(n.url,t)}}},[t("router-link",{attrs:{to:n.url}},[t("span",{staticClass:"label"},[e._v(e._s(n.name))])])],1)}))],2)]):e._e()]):e._e()}),[],!1,null,null,null);n.default=d.exports}}]);