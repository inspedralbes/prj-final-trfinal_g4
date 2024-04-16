"use strict";(self.webpackChunkstrapi=self.webpackChunkstrapi||[]).push([[3938],{73938:(U,n,_)=>{_.r(n),_.d(n,{LoginEE:()=>I});var E=_(74081),D=_(84366),a=_(93415),P=_(10701),o=_(32370),l=_(61020),i=_(72450),O=_(6606),M=_(46118),L=_(87006),B=_(15816),d=_(97442),r=_(13576),s=_(87830),h=_(47184),C=_(364),t=_(27279),K=_(59461),m=_(71563),g=_(49204),x=_(47853),j=_(74919),f=_(29206),y=_(40464),c=_(98934),S=_(43433),$=_(75719),Z=_(8175),N=_(6078),F=_(51943),z=_(55783),G=_(92249),J=_(41942),Y=_(22919),H=_(53915),Q=_(75041),V=_(30200),X=_(91379),u=_(33299),p=_(33409),e=_(63645),k=_(7988),w=_(7055),b=_(26757),q=_(58311),__=_(24840),E_=_(29510),s_=_(16946),t_=_(10124),a_=_(69530),P_=_(86961),O_=_(51527),n_=_(19764),D_=_(42982),M_=_(26126);const v=(0,i.ZP)(D.i)`
  flex: 1;
`,I=R=>{const{formatMessage:T}=(0,l.Z)(),{isLoading:W,data:A=[]}=(0,O.g)(void 0,{skip:!window.strapi.features.isEnabled(window.strapi.features.SSO)});return!window.strapi.features.isEnabled(window.strapi.features.SSO)||!W&&A.length===0?(0,E.jsx)(O.L,{...R}):(0,E.jsx)(O.L,{...R,children:(0,E.jsx)(a.x,{paddingTop:7,children:(0,E.jsxs)(P.k,{direction:"column",alignItems:"stretch",gap:7,children:[(0,E.jsxs)(P.k,{children:[(0,E.jsx)(v,{}),(0,E.jsx)(a.x,{paddingLeft:3,paddingRight:3,children:(0,E.jsx)(o.Z,{variant:"sigma",textColor:"neutral600",children:T({id:"Auth.login.sso.divider"})})}),(0,E.jsx)(v,{})]}),(0,E.jsx)(M.S,{providers:A,displayAllProviders:!1})]})})})}},46118:(U,n,_)=>{_.d(n,{S:()=>L});var E=_(74081),D=_(23298),a=_(74577),P=_(2981),o=_(10701),l=_(32370),i=_(61020),O=_(47533),M=_(72450);const L=({providers:s,displayAllProviders:h})=>{const{formatMessage:C}=(0,i.Z)();return h?(0,E.jsx)(D.r,{gap:4,children:s.map(t=>(0,E.jsx)(a.P,{col:4,children:(0,E.jsx)(d,{provider:t})},t.uid))}):s.length>2&&!h?(0,E.jsxs)(D.r,{gap:4,children:[s.slice(0,2).map(t=>(0,E.jsx)(a.P,{col:4,children:(0,E.jsx)(d,{provider:t})},t.uid)),(0,E.jsx)(a.P,{col:4,children:(0,E.jsx)(P.u,{label:C({id:"global.see-more"}),children:(0,E.jsx)(r,{as:O.rU,to:"/auth/providers",children:(0,E.jsx)("span",{"aria-hidden":!0,children:"\u2022\u2022\u2022"})})})})]}):(0,E.jsx)(B,{justifyContent:"center",children:s.map(t=>(0,E.jsx)(d,{provider:t},t.uid))})},B=(0,M.ZP)(o.k)`
  & a:not(:first-child):not(:last-child) {
    margin: 0 ${({theme:s})=>s.spaces[2]};
  }
  & a:first-child {
    margin-right: ${({theme:s})=>s.spaces[2]};
  }
  & a:last-child {
    margin-left: ${({theme:s})=>s.spaces[2]};
  }
`,d=({provider:s})=>(0,E.jsx)(P.u,{label:s.displayName,children:(0,E.jsx)(r,{href:`${window.strapi.backendURL}/admin/connect/${s.uid}`,children:s.icon?(0,E.jsx)("img",{src:s.icon,"aria-hidden":!0,alt:"",height:"32px"}):(0,E.jsx)(l.Z,{children:s.displayName})})}),r=M.ZP.a`
  width: ${136/16}rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${48/16}rem;
  border: 1px solid ${({theme:s})=>s.colors.neutral150};
  border-radius: ${({theme:s})=>s.borderRadius};
  text-decoration: inherit;
  &:link {
    text-decoration: none;
  }
  color: ${({theme:s})=>s.colors.neutral600};
`}}]);
