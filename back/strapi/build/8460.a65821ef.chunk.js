(self.webpackChunkstrapi=self.webpackChunkstrapi||[]).push([[8460],{77228:(C,f,n)=>{var l,D;/*!
* JavaScript Cookie v2.2.1
* https://github.com/js-cookie/js-cookie
*
* Copyright 2006, 2015 Klaus Hartl & Fagner Brack
* Released under the MIT license
*/(function(i){var d;if(l=i,D=typeof l=="function"?l.call(f,n,f,C):l,D!==void 0&&(C.exports=D),d=!0,C.exports=i(),d=!0,!d){var O=window.Cookies,t=window.Cookies=i();t.noConflict=function(){return window.Cookies=O,t}}})(function(){function i(){for(var t=0,E={};t<arguments.length;t++){var M=arguments[t];for(var P in M)E[P]=M[P]}return E}function d(t){return t.replace(/(%[0-9A-Z]{2})+/g,decodeURIComponent)}function O(t){function E(){}function M(_,s,o){if(!(typeof document>"u")){o=i({path:"/"},E.defaults,o),typeof o.expires=="number"&&(o.expires=new Date(new Date*1+o.expires*864e5)),o.expires=o.expires?o.expires.toUTCString():"";try{var v=JSON.stringify(s);/^[\{\[]/.test(v)&&(s=v)}catch{}s=t.write?t.write(s,_):encodeURIComponent(String(s)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),_=encodeURIComponent(String(_)).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[\(\)]/g,escape);var e="";for(var r in o)o[r]&&(e+="; "+r,o[r]!==!0&&(e+="="+o[r].split(";")[0]));return document.cookie=_+"="+s+e}}function P(_,s){if(!(typeof document>"u")){for(var o={},v=document.cookie?document.cookie.split("; "):[],e=0;e<v.length;e++){var r=v[e].split("="),a=r.slice(1).join("=");!s&&a.charAt(0)==='"'&&(a=a.slice(1,-1));try{var I=d(r[0]);if(a=(t.read||t)(a,I)||d(a),s)try{a=JSON.parse(a)}catch{}if(o[I]=a,_===I)break}catch{}}return _?o[_]:o}}return E.set=M,E.get=function(_){return P(_,!1)},E.getJSON=function(_){return P(_,!0)},E.remove=function(_,s){M(_,"",i(s,{expires:-1}))},E.defaults={},E.withConverter=O,E}return O(function(){})})},58460:(C,f,n)=>{"use strict";n.r(f),n.d(f,{ADMIN_PERMISSIONS_EE:()=>W,ROUTES_EE:()=>h,SETTINGS_LINKS_EE:()=>m});var l=n(74081),D=n(27279),i=n(87006),d=n(77228),O=n(61020),t=n(51447),E=n(6606),M=n(15816),P=n(97442),_=n(13576),s=n(87830),o=n(47184),v=n(364),e=n(59461),r=n(71563),a=n(49204),I=n(47853),u=n(74919),K=n(29206),c=n(40464),S=n(98934),p=n(43433),j=n(75719),w=n(8175),x=n(6078),N=n(51943),y=n(55783),F=n(92249),J=n(41942),G=n(22919),Z=n(53915),z=n(75041),Y=n(30200),$=n(91379),V=n(33299),H=n(33409),Q=n(63645),X=n(7988),k=n(7055),b=n(26757),q=n(58311),nn=n(24840),on=n(29510),tn=n(16946),_n=n(10124),En=n(69530),sn=n(86961),an=n(51527),dn=n(19764),en=n(42982),rn=n(26126);const B=()=>{const T=(0,t.$B)("/auth/login/:authResponse"),{formatMessage:g}=(0,O.Z)(),{push:R}=(0,t.k6)(),L=D.useCallback(()=>{R(`/auth/oops?info=${encodeURIComponent(g({id:"Auth.form.button.login.providers.error",defaultMessage:"We cannot connect you through the selected provider."}))}`)},[R,g]),U=(0,E.a)("AuthResponse",A=>A.setToken);return D.useEffect(()=>{if(T?.params.authResponse==="error"&&L(),T?.params.authResponse==="success"){const A=d.get("jwtToken");A?(U(A),d.remove("jwtToken"),R("/auth/login")):L()}},[T,L,U,R]),(0,l.jsx)(i.dO,{})},W={settings:{auditLogs:{main:[{action:"admin::audit-logs.read",subject:null}],read:[{action:"admin::audit-logs.read",subject:null}],update:[{action:"admin::audit-logs.update",subject:null}]},"review-workflows":{main:[{action:"admin::review-workflows.read",subject:null}],read:[{action:"admin::review-workflows.read",subject:null}],create:[{action:"admin::review-workflows.create",subject:null}],delete:[{action:"admin::review-workflows.delete",subject:null}],update:[{action:"admin::review-workflows.update",subject:null}]},sso:{main:[{action:"admin::provider-login.read",subject:null}],read:[{action:"admin::provider-login.read",subject:null}],update:[{action:"admin::provider-login.update",subject:null}]}}},h=[{Component:()=>({default:B}),to:"/auth/login/:authResponse",exact:!0}],m=()=>({global:[...window.strapi.features.isEnabled(window.strapi.features.SSO)?[{intlLabel:{id:"Settings.sso.title",defaultMessage:"Single Sign-On"},to:"/settings/single-sign-on",id:"sso"}]:[],...window.strapi.features.isEnabled(window.strapi.features.REVIEW_WORKFLOWS)?[{intlLabel:{id:"Settings.review-workflows.page.title",defaultMessage:"Review Workflows"},to:"/settings/review-workflows",id:"review-workflows"}]:[]],admin:[...window.strapi.features.isEnabled(window.strapi.features.AUDIT_LOGS)?[{intlLabel:{id:"global.auditLogs",defaultMessage:"Audit Logs"},to:"/settings/audit-logs?pageSize=50&page=1&sort=date:DESC",id:"auditLogs"}]:[]]})}}]);
