(window.webpackJsonp=window.webpackJsonp||[]).push([[217],{817:function(e,t,i){"use strict";i.r(t);var n={name:"Video",props:{src:String},data:function(){return{width:560,height:315}},methods:{setPlayerSize:function(){window.innerWidth<930?(this.width=null,this.height=null):(this.width=560,this.height=315)}},mounted:function(){var e=this;this.setPlayerSize(),window.addEventListener("resize",(function(){e.setPlayerSize()}))}},r=i(9),s=Object(r.a)(n,(function(){var e=this.$createElement,t=this._self._c||e;return t("span",[t("iframe",{attrs:{width:this.width,height:this.height,src:this.src,title:"YouTube video player",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""}})])}),[],!1,null,null,null);t.default=s.exports}}]);