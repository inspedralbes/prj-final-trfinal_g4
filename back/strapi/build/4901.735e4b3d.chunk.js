"use strict";(self.webpackChunkstrapi=self.webpackChunkstrapi||[]).push([[4901],{46118:(T,P,_)=>{_.d(P,{S:()=>B});var s=_(74081),M=_(23298),n=_(74577),a=_(2981),d=_(10701),h=_(32370),C=_(61020),v=_(47533),D=_(72450);const B=({providers:E,displayAllProviders:r})=>{const{formatMessage:L}=(0,C.Z)();return r?(0,s.jsx)(M.r,{gap:4,children:E.map(t=>(0,s.jsx)(n.P,{col:4,children:(0,s.jsx)(O,{provider:t})},t.uid))}):E.length>2&&!r?(0,s.jsxs)(M.r,{gap:4,children:[E.slice(0,2).map(t=>(0,s.jsx)(n.P,{col:4,children:(0,s.jsx)(O,{provider:t})},t.uid)),(0,s.jsx)(n.P,{col:4,children:(0,s.jsx)(a.u,{label:L({id:"global.see-more"}),children:(0,s.jsx)(i,{as:v.rU,to:"/auth/providers",children:(0,s.jsx)("span",{"aria-hidden":!0,children:"\u2022\u2022\u2022"})})})})]}):(0,s.jsx)(l,{justifyContent:"center",children:E.map(t=>(0,s.jsx)(O,{provider:t},t.uid))})},l=(0,D.ZP)(d.k)`
  & a:not(:first-child):not(:last-child) {
    margin: 0 ${({theme:E})=>E.spaces[2]};
  }
  & a:first-child {
    margin-right: ${({theme:E})=>E.spaces[2]};
  }
  & a:last-child {
    margin-left: ${({theme:E})=>E.spaces[2]};
  }
`,O=({provider:E})=>(0,s.jsx)(a.u,{label:E.displayName,children:(0,s.jsx)(i,{href:`${window.strapi.backendURL}/admin/connect/${E.uid}`,children:E.icon?(0,s.jsx)("img",{src:E.icon,"aria-hidden":!0,alt:"",height:"32px"}):(0,s.jsx)(h.Z,{children:E.displayName})})}),i=D.ZP.a`
  width: ${136/16}rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${48/16}rem;
  border: 1px solid ${({theme:E})=>E.colors.neutral150};
  border-radius: ${({theme:E})=>E.borderRadius};
  text-decoration: inherit;
  &:link {
    text-decoration: none;
  }
  color: ${({theme:E})=>E.colors.neutral600};
`},24901:(T,P,_)=>{_.r(P),_.d(P,{FORMS:()=>m});var s=_(74081),M=_(73354),n=_(93415),a=_(32370),d=_(10701),h=_(77970),C=_(48102),v=_(84366),D=_(79213),B=_(61020),l=_(51447),O=_(47533),i=_(72450),E=_(6606),r=_(46118),L=_(87006),t=_(15816),g=_(97442),x=_(13576),j=_(87830),c=_(47184),f=_(364),y=_(27279),S=_(59461),Z=_(71563),$=_(49204),u=_(47853),F=_(74919),N=_(29206),z=_(40464),e=_(98934),G=_(43433),J=_(75719),Y=_(8175),H=_(6078),Q=_(51943),V=_(55783),X=_(92249),p=_(41942),k=_(22919),w=_(53915),b=_(75041),q=_(30200),__=_(91379),s_=_(33299),E_=_(33409),t_=_(63645),n_=_(7988),a_=_(7055),d_=_(26757),o_=_(58311),O_=_(24840),P_=_(29510),M_=_(16946),D_=_(10124),l_=_(69530),i_=_(86961),r_=_(51527),h_=_(19764),C_=_(42982),v_=_(26126);const W=()=>{const{push:I}=(0,l.k6)(),{formatMessage:o}=(0,B.Z)(),{isLoading:R,data:U=[]}=(0,E.g)(void 0,{skip:!window.strapi.features.isEnabled(window.strapi.features.SSO)}),K=()=>{I("/auth/login")};return!window.strapi.features.isEnabled(window.strapi.features.SSO)||!R&&U.length===0?(0,s.jsx)(l.l_,{to:"/auth/login"}):(0,s.jsx)(E.U,{children:(0,s.jsxs)(M.o,{children:[(0,s.jsxs)(E.h,{children:[(0,s.jsxs)(E.C,{children:[(0,s.jsx)(E.i,{}),(0,s.jsx)(n.x,{paddingTop:6,paddingBottom:1,children:(0,s.jsx)(a.Z,{as:"h1",variant:"alpha",children:o({id:"Auth.form.welcome.title"})})}),(0,s.jsx)(n.x,{paddingBottom:7,children:(0,s.jsx)(a.Z,{variant:"epsilon",textColor:"neutral600",children:o({id:"Auth.login.sso.subtitle"})})})]}),(0,s.jsxs)(d.k,{direction:"column",alignItems:"stretch",gap:7,children:[R?(0,s.jsx)(d.k,{justifyContent:"center",children:(0,s.jsx)(h.a,{children:o({id:"Auth.login.sso.loading"})})}):(0,s.jsx)(r.S,{providers:U}),(0,s.jsxs)(d.k,{children:[(0,s.jsx)(A,{}),(0,s.jsx)(n.x,{paddingLeft:3,paddingRight:3,children:(0,s.jsx)(a.Z,{variant:"sigma",textColor:"neutral600",children:o({id:"or"})})}),(0,s.jsx)(A,{})]}),(0,s.jsx)(C.z,{fullWidth:!0,size:"L",onClick:K,children:o({id:"Auth.form.button.login.strapi"})})]})]}),(0,s.jsx)(d.k,{justifyContent:"center",children:(0,s.jsx)(n.x,{paddingTop:4,children:(0,s.jsx)(D.r,{as:O.OL,to:"/auth/forgot-password",children:(0,s.jsx)(a.Z,{variant:"pi",children:o({id:"Auth.link.forgot-password"})})})})})]})})},A=(0,i.ZP)(v.i)`
  flex: 1;
`,m={providers:W}}}]);
