(window.webpackJsonp=window.webpackJsonp||[]).push([[210],{802:function(t,n,i){"use strict";i.r(n);i(47),i(39),i(24),i(29),i(231),i(68);var r={name:"common-link",props:{path:String},data:function(){return{url:""}},mounted:function(){this.$nextTick((function(){var t=this;this.path.indexOf(".md")&&(this.url=this.path.replace(".md",".html"));var n=this.path.split("/"),i=this.$route.path.split("/");n.forEach((function(n,r){"<version>"===n&&(t.url=t.url.replace("<version>",i[r]))}))}))}},s=i(9),e=Object(s.a)(r,(function(){var t=this.$createElement,n=this._self._c||t;return n("span",[n("router-link",{staticClass:"route-link",attrs:{to:this.url}},[this._t("default")],2)],1)}),[],!1,null,"398b3636",null);n.default=e.exports}}]);