"use strict";(self.webpackChunkmy_project=self.webpackChunkmy_project||[]).push([[2282],{1431:(C,v,t)=>{t.r(v),t.d(v,{ProvidersPage:()=>oe,default:()=>Ze});var i=t(74081),l=t(27279),a=t(27997),d=t(73354),p=t(27875),e=t(74758),s=t(70774),f=t(38101),g=t(93153),b=t(50086),y=t(32370),u=t(10989),j=t(86967),I=t(4987),n=t(87006),r=t(26784),W=t(51943),N=t.n(W),H=t(61020),K=t(40464),he=t(5938),pe=t(6918),fe=t(15244),ge=t(10701),me=t(23298),ve=t(74577),$e=t(35250),ee=t(48102),be=t(12692),xe=t(64360),ye=t(71563),Pe=t(70627),o=t.n(Pe),je=t(2548),Me=t(12881);const V=({description:$,disabled:E,intlLabel:R,error:L,name:T,onChange:z,placeholder:m,providerToEditName:B,type:O,value:M})=>{const{formatMessage:P}=(0,H.Z)(),S=T==="noName"?`${window.strapi.backendURL}/api/connect/${B}/callback`:M,A=P({id:R.id,defaultMessage:R.defaultMessage},{provider:B,...R.values}),Z=$?P({id:$.id,defaultMessage:$.defaultMessage},{provider:B,...$.values}):"";if(O==="bool")return(0,i.jsx)(je.s,{"aria-label":T,checked:M,disabled:E,hint:Z,label:A,name:T,offLabel:P({id:"app.components.ToggleCheckbox.off-label",defaultMessage:"Off"}),onLabel:P({id:"app.components.ToggleCheckbox.on-label",defaultMessage:"On"}),onChange:U=>{z({target:{name:T,value:U.target.checked}})}});const Y=m?P({id:m.id,defaultMessage:m.defaultMessage},{...m.values}):"",k=L?P({id:L,defaultMessage:L}):"";return(0,i.jsx)(Me.o,{"aria-label":T,disabled:E,error:k,label:A,name:T,onChange:z,placeholder:Y,type:O,value:S})};V.defaultProps={description:null,disabled:!1,error:"",placeholder:null,value:""},V.propTypes={description:o().shape({id:o().string.isRequired,defaultMessage:o().string.isRequired,values:o().object}),disabled:o().bool,error:o().string,intlLabel:o().shape({id:o().string.isRequired,defaultMessage:o().string.isRequired,values:o().object}).isRequired,name:o().string.isRequired,onChange:o().func.isRequired,placeholder:o().shape({id:o().string.isRequired,defaultMessage:o().string.isRequired,values:o().object}),providerToEditName:o().string.isRequired,type:o().string.isRequired,value:o().oneOfType([o().bool,o().string])};const Te=V,X=({headerBreadcrumbs:$,initialData:E,isSubmiting:R,layout:L,isOpen:T,onSubmit:z,onToggle:m,providerToEditName:B})=>{const{formatMessage:O}=(0,H.Z)();return T?(0,i.jsxs)(he.P,{onClose:m,labelledBy:"title",children:[(0,i.jsx)(pe.x,{children:(0,i.jsx)(be.O,{label:$.join(", "),children:$.map((M,P,S)=>(0,i.jsx)(xe.$,{isCurrent:P===S.length-1,children:M},M))})}),(0,i.jsx)(ye.J9,{onSubmit:M=>z(M),initialValues:E,validationSchema:L.schema,validateOnChange:!1,children:({errors:M,handleChange:P,values:S})=>(0,i.jsxs)(n.l0,{children:[(0,i.jsx)(fe.f,{children:(0,i.jsx)(ge.k,{direction:"column",alignItems:"stretch",gap:1,children:(0,i.jsx)(me.r,{gap:5,children:L.form.map(A=>A.map(Z=>(0,i.jsx)(ve.P,{col:Z.size,xs:12,children:(0,i.jsx)(Te,{...Z,error:M[Z.name],onChange:P,value:S[Z.name],providerToEditName:B})},Z.name)))})})}),(0,i.jsx)($e.m,{startActions:(0,i.jsx)(ee.z,{variant:"tertiary",onClick:m,type:"button",children:O({id:"app.components.Button.cancel",defaultMessage:"Cancel"})}),endActions:(0,i.jsx)(ee.z,{type:"submit",loading:R,children:O({id:"global.save",defaultMessage:"Save"})})})]})})]}):null};X.defaultProps={initialData:null,providerToEditName:null},X.propTypes={headerBreadcrumbs:o().arrayOf(o().string).isRequired,initialData:o().object,layout:o().shape({form:o().arrayOf(o().array),schema:o().object}).isRequired,isOpen:o().bool.isRequired,isSubmiting:o().bool.isRequired,onSubmit:o().func.isRequired,onToggle:o().func.isRequired,providerToEditName:o().string};const Le=X;var se=t(84419),x=t(99688),c=t(47853);const te={id:(0,x.OB)("PopUpForm.Providers.redirectURL.front-end.label"),defaultMessage:"The redirect URL to your front-end app"},ie={id:"http://www.client-app.com",defaultMessage:"http://www.client-app.com"},Q={id:(0,x.OB)("PopUpForm.Providers.enabled.description"),defaultMessage:"If disabled, users won't be able to use this provider."},G={id:(0,x.OB)("PopUpForm.Providers.enabled.label"),defaultMessage:"Enable"},ne={id:(0,x.OB)("PopUpForm.Providers.key.label"),defaultMessage:"Client ID"},ae={id:(0,x.OB)("PopUpForm.Providers.redirectURL.label"),defaultMessage:"The redirect URL to add in your {provider} application configurations"},D={id:(0,x.OB)("PopUpForm.Providers.key.placeholder"),defaultMessage:"TEXT"},re={id:(0,x.OB)("PopUpForm.Providers.secret.label"),defaultMessage:"Client Secret"},J={email:{form:[[{intlLabel:G,name:"enabled",type:"bool",description:Q,size:6}]],schema:c.Ry().shape({enabled:c.Xg().required(n.I0.required)})},providers:{form:[[{intlLabel:G,name:"enabled",type:"bool",description:Q,size:6,validations:{required:!0}}],[{intlLabel:ne,name:"key",type:"text",placeholder:D,size:12,validations:{required:!0}}],[{intlLabel:re,name:"secret",type:"text",placeholder:D,size:12,validations:{required:!0}}],[{intlLabel:te,placeholder:ie,name:"callback",type:"text",size:12,validations:{required:!0}}],[{intlLabel:ae,name:"noName",type:"text",validations:{},size:12,disabled:!0}]],schema:c.Ry().shape({enabled:c.Xg().required(n.I0.required),key:c.Z_().when("enabled",{is:!0,then:c.Z_().required(n.I0.required),otherwise:c.Z_()}),secret:c.Z_().when("enabled",{is:!0,then:c.Z_().required(n.I0.required),otherwise:c.Z_()}),callback:c.Z_().when("enabled",{is:!0,then:c.Z_().required(n.I0.required),otherwise:c.Z_()})})},providersWithSubdomain:{form:[[{intlLabel:G,name:"enabled",type:"bool",description:Q,size:6,validations:{required:!0}}],[{intlLabel:ne,name:"key",type:"text",placeholder:D,size:12,validations:{required:!0}}],[{intlLabel:re,name:"secret",type:"text",placeholder:D,size:12,validations:{required:!0}}],[{intlLabel:{id:(0,x.OB)({id:"PopUpForm.Providers.jwksurl.label"}),defaultMessage:"JWKS URL"},name:"jwksurl",type:"text",placeholder:D,size:12,validations:{required:!1}}],[{intlLabel:{id:(0,x.OB)("PopUpForm.Providers.subdomain.label"),defaultMessage:"Host URI (Subdomain)"},name:"subdomain",type:"text",placeholder:{id:(0,x.OB)("PopUpForm.Providers.subdomain.placeholder"),defaultMessage:"my.subdomain.com"},size:12,validations:{required:!0}}],[{intlLabel:te,placeholder:ie,name:"callback",type:"text",size:12,validations:{required:!0}}],[{intlLabel:ae,name:"noName",type:"text",validations:{},size:12,disabled:!0}]],schema:c.Ry().shape({enabled:c.Xg().required(n.I0.required),key:c.Z_().when("enabled",{is:!0,then:c.Z_().required(n.I0.required),otherwise:c.Z_()}),secret:c.Z_().when("enabled",{is:!0,then:c.Z_().required(n.I0.required),otherwise:c.Z_()}),subdomain:c.Z_().when("enabled",{is:!0,then:c.Z_().required(n.I0.required),otherwise:c.Z_()}),callback:c.Z_().when("enabled",{is:!0,then:c.Z_().required(n.I0.required),otherwise:c.Z_()})})}},oe=()=>{const{formatMessage:$,locale:E}=(0,H.Z)(),R=(0,K.useQueryClient)(),{trackUsage:L}=(0,n.rS)(),[T,z]=l.useState(!1),[m,B]=l.useState(null),O=(0,n.lm)(),{lockApp:M,unlockApp:P}=(0,n.o1)(),{get:S,put:A}=(0,n.kY)(),{formatAPIError:Z}=(0,n.So)(),Y=(0,n.Xe)(E,{sensitivity:"base"});(0,n.go)();const{isLoading:k,allowedActions:{canUpdate:U}}=(0,n.ss)({update:se._.updateProviders}),{isLoading:Oe,data:q}=(0,K.useQuery)(["users-permissions","get-providers"],async()=>{const{data:h}=await S("/users-permissions/providers");return h},{initialData:{}}),de=(0,K.useMutation)(h=>A("/users-permissions/providers",h),{async onSuccess(){await R.invalidateQueries(["users-permissions","providers"]),O({type:"success",message:{id:(0,x.OB)("notification.success.submit")}}),L("didEditAuthenticationProvider"),_(),P()},onError(h){O({type:"warning",message:Z(h)}),P()},refetchActive:!1}),w=Object.entries(q).reduce((h,[F,Se])=>{const{icon:ce,enabled:Ee,subdomain:ze}=Se;return h.push({name:F,icon:ce==="envelope"?["fas","envelope"]:["fab",ce],enabled:Ee,subdomain:ze}),h},[]).sort((h,F)=>Y.compare(h.name,F.name)),Ce=Oe||k,le=l.useMemo(()=>m?!!w.find(F=>F.name===m)?.subdomain:!1,[w,m]),Re=l.useMemo(()=>m==="email"?J.email:le?J.providersWithSubdomain:J.providers,[m,le]),_=()=>{z(h=>!h)},ue=h=>{U&&(B(h.name),_())},Be=async h=>{M(),L("willEditAuthenticationProvider"),de.mutate({providers:{...q,[m]:h}})};return(0,i.jsxs)(a.A,{children:[(0,i.jsx)(n.SL,{name:$({id:(0,x.OB)("HeaderNav.link.providers"),defaultMessage:"Providers"})}),(0,i.jsxs)(d.o,{children:[(0,i.jsx)(p.T,{title:$({id:(0,x.OB)("HeaderNav.link.providers"),defaultMessage:"Providers"})}),Ce?(0,i.jsx)(n.dO,{}):(0,i.jsx)(e.D,{children:(0,i.jsxs)(s.i,{colCount:3,rowCount:w.length+1,children:[(0,i.jsx)(f.h,{children:(0,i.jsxs)(g.Tr,{children:[(0,i.jsx)(b.Th,{children:(0,i.jsx)(y.Z,{variant:"sigma",textColor:"neutral600",children:$({id:"global.name",defaultMessage:"Name"})})}),(0,i.jsx)(b.Th,{children:(0,i.jsx)(y.Z,{variant:"sigma",textColor:"neutral600",children:$({id:(0,x.OB)("Providers.status"),defaultMessage:"Status"})})}),(0,i.jsx)(b.Th,{children:(0,i.jsx)(y.Z,{variant:"sigma",children:(0,i.jsx)(u.T,{children:$({id:"global.settings",defaultMessage:"Settings"})})})})]})}),(0,i.jsx)(j.p,{children:w.map(h=>(0,i.jsxs)(g.Tr,{...(0,n.X7)({fn:()=>ue(h),condition:U}),children:[(0,i.jsx)(b.Td,{width:"45%",children:(0,i.jsx)(y.Z,{fontWeight:"semiBold",textColor:"neutral800",children:h.name})}),(0,i.jsx)(b.Td,{width:"65%",children:(0,i.jsx)(y.Z,{textColor:h.enabled?"success600":"danger600","data-testid":`enable-${h.name}`,children:h.enabled?$({id:"global.enabled",defaultMessage:"Enabled"}):$({id:"global.disabled",defaultMessage:"Disabled"})})}),(0,i.jsx)(b.Td,{...n.UW,children:U&&(0,i.jsx)(I.h,{onClick:()=>ue(h),noBorder:!0,icon:(0,i.jsx)(r.Z,{}),label:"Edit"})})]},h.name))})]})})]}),(0,i.jsx)(Le,{initialData:q[m],isOpen:T,isSubmiting:de.isLoading,layout:Re,headerBreadcrumbs:[$({id:(0,x.OB)("PopUpForm.header.edit.providers"),defaultMessage:"Edit Provider"}),N()(m)],onToggle:_,onSubmit:Be,providerToEditName:m})]})},Ze=()=>(0,i.jsx)(n.O4,{permissions:se._.readProviders,children:(0,i.jsx)(oe,{})})},99688:(C,v,t)=>{t.d(v,{YX:()=>d,OB:()=>p.Z});var i=t(10124),l=t.n(i);const d=e=>Object.keys(e).reduce((s,f)=>{const g=e[f].controllers,b=Object.keys(g).reduce((y,u)=>(l()(g[u])||(y[u]=g[u]),y),{});return l()(b)||(s[f]={controllers:b}),s},{});var p=t(58655)},77919:(C,v,t)=>{t.d(v,{x:()=>p});var i=t(72450),l=t(55409),a=t(812);const d={color:!0,cursor:!0,height:!0,width:!0},p=i.ZP.div.withConfig({shouldForwardProp:(e,s)=>!d[e]&&s(e)})`
  // Font
  font-size: ${({fontSize:e,theme:s})=>(0,a.$)(s.fontSizes,e,e)};

  // Colors
  background: ${({theme:e,background:s})=>(0,a.$)(e.colors,s,s)};
  color: ${({theme:e,color:s})=>(0,a.$)(e.colors,s,void 0)};

  // Spaces
  ${({theme:e,padding:s})=>(0,l.Z)("padding",s,e)}
  ${({theme:e,paddingTop:s})=>(0,l.Z)("padding-top",s,e)}
  ${({theme:e,paddingRight:s})=>(0,l.Z)("padding-right",s,e)}
  ${({theme:e,paddingBottom:s})=>(0,l.Z)("padding-bottom",s,e)}
  ${({theme:e,paddingLeft:s})=>(0,l.Z)("padding-left",s,e)}
  ${({theme:e,marginLeft:s})=>(0,l.Z)("margin-left",s,e)}
  ${({theme:e,marginRight:s})=>(0,l.Z)("margin-right",s,e)}
  ${({theme:e,marginTop:s})=>(0,l.Z)("margin-top",s,e)}
  ${({theme:e,marginBottom:s})=>(0,l.Z)("margin-bottom",s,e)}

  // Responsive hiding
  ${({theme:e,hiddenS:s})=>s?`${e.mediaQueries.tablet} { display: none; }`:void 0}
  ${({theme:e,hiddenXS:s})=>s?`${e.mediaQueries.mobile} { display: none; }`:void 0}
  

  // Borders
  border-radius: ${({theme:e,hasRadius:s,borderRadius:f})=>s?e.borderRadius:f};
  border-style: ${({borderStyle:e})=>e};
  border-width: ${({borderWidth:e})=>e};
  border-color: ${({borderColor:e,theme:s})=>(0,a.$)(s.colors,e,void 0)};
  border: ${({theme:e,borderColor:s,borderStyle:f,borderWidth:g})=>{if(s&&!f&&typeof g>"u")return`1px solid ${e.colors[s]}`}};

  // Shadows
  box-shadow: ${({theme:e,shadow:s})=>(0,a.$)(e.shadows,s,void 0)};

  // Handlers
  pointer-events: ${({pointerEvents:e})=>e};
  &:hover {
    ${({_hover:e,theme:s})=>e?e(s):void 0}
  }

  // Display
  display: ${({display:e})=>e};

  // Position
  position: ${({position:e})=>e};
  left: ${({left:e,theme:s})=>(0,a.$)(s.spaces,e,e)};
  right: ${({right:e,theme:s})=>(0,a.$)(s.spaces,e,e)};
  top: ${({top:e,theme:s})=>(0,a.$)(s.spaces,e,e)};
  bottom: ${({bottom:e,theme:s})=>(0,a.$)(s.spaces,e,e)};
  z-index: ${({zIndex:e})=>e};
  overflow: ${({overflow:e})=>e};

  // Size
  width: ${({width:e,theme:s})=>(0,a.$)(s.spaces,e,e)};
  max-width: ${({maxWidth:e,theme:s})=>(0,a.$)(s.spaces,e,e)};
  min-width: ${({minWidth:e,theme:s})=>(0,a.$)(s.spaces,e,e)};
  height: ${({height:e,theme:s})=>(0,a.$)(s.spaces,e,e)};
  max-height: ${({maxHeight:e,theme:s})=>(0,a.$)(s.spaces,e,e)};
  min-height: ${({minHeight:e,theme:s})=>(0,a.$)(s.spaces,e,e)};

  // Animation
  transition: ${({transition:e})=>e};
  transform: ${({transform:e})=>e};
  animation: ${({animation:e})=>e};

  //Flexbox children props
  flex-shrink: ${({shrink:e})=>e};
  flex-grow: ${({grow:e})=>e};
  flex-basis: ${({basis:e})=>e};
  flex: ${({flex:e})=>e};

  // Text
  text-align: ${({textAlign:e})=>e};
  text-transform: ${({textTransform:e})=>e};
  line-height: ${({theme:e,lineHeight:s})=>(0,a.$)(e.lineHeights,s,s)};

  // Cursor
  cursor: ${({cursor:e})=>e};
`},41101:(C,v,t)=>{t.d(v,{Z:()=>I});var i=t(72450);const l="alpha",a="beta",d="delta",p="epsilon",e="omega",s="pi",f="sigma",g=[l,a,d,p,e,s,f],b=({ellipsis:n=!1})=>n&&`
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,y=({variant:n=e,theme:r})=>{switch(n){case l:return`
        font-weight: ${r.fontWeights.bold};
        font-size: ${r.fontSizes[5]};
        line-height: ${r.lineHeights[2]};
      `;case a:return`
        font-weight: ${r.fontWeights.bold};
        font-size: ${r.fontSizes[4]};
        line-height: ${r.lineHeights[1]};
      `;case d:return`
        font-weight: ${r.fontWeights.semiBold};
        font-size: ${r.fontSizes[3]};
        line-height: ${r.lineHeights[2]};
      `;case p:return`
        font-size: ${r.fontSizes[3]};
        line-height: ${r.lineHeights[6]};
      `;case e:return`
        font-size: ${r.fontSizes[2]};
        line-height: ${r.lineHeights[4]};
      `;case s:return`
        font-size: ${r.fontSizes[1]};
        line-height: ${r.lineHeights[3]};
      `;case f:return`
        font-weight: ${r.fontWeights.bold};
        font-size: ${r.fontSizes[0]};
        line-height: ${r.lineHeights[5]};
        text-transform: uppercase;
      `;default:return`
        font-size: ${r.fontSizes[2]};
      `}};var u=t(812);const j={fontSize:!0,fontWeight:!0},I=i.ZP.span.withConfig({shouldForwardProp:(n,r)=>!j[n]&&r(n)})`
  ${y}
  ${b}

  // These properties need to come after {variantStyle}, because they might
  // overwrite a variant attribute
  font-weight: ${({theme:n,fontWeight:r})=>(0,u.$)(n.fontWeights,r,void 0)};
  font-size: ${({theme:n,fontSize:r})=>(0,u.$)(n.fontSizes,r,void 0)};
  line-height: ${({theme:n,lineHeight:r})=>(0,u.$)(n.lineHeights,r,r)};
  color: ${({theme:n,textColor:r})=>n.colors[r||"neutral800"]};
  text-align: ${({textAlign:n})=>n};
  text-decoration: ${({textDecoration:n})=>n};
  text-transform: ${({textTransform:n})=>n};
`},55409:(C,v,t)=>{t.d(v,{Z:()=>i});const i=(l,a,d)=>{if(!a)return;if(typeof a=="object")return(Array.isArray(a)?a:[a?.desktop,a?.tablet,a?.mobile]).reduce((f,g,b)=>{if(g)switch(b){case 0:return`${f}${l}: ${d.spaces[g]};`;case 1:return`${f}${d.mediaQueries.tablet}{${l}: ${d.spaces[g]};}`;case 2:return`${f}${d.mediaQueries.mobile}{${l}: ${d.spaces[g]};}`;default:return f}return f},"");const p=d.spaces[a]??a;return`${l}: ${p};`}},812:(C,v,t)=>{t.d(v,{$:()=>a});function i(d,p){return typeof d=="string"?!1:p in d}function l(d){return d&&typeof d=="object"&&!Array.isArray(d)}function a(d,p,e){return p&&i(d,p)?d[p]:e}},12692:(C,v,t)=>{t.d(v,{O:()=>y});var i=t(74081),l=t(27279),a=t(72450),d=t(77919),p=t(41101);const e=()=>(0,i.jsx)(d.x,{"aria-hidden":!0,paddingLeft:1,paddingRight:1,children:(0,i.jsx)(p.Z,{variant:"pi",textColor:"neutral500",children:"/"})});e.displayName="Divider";var s=t(55409);const f={direction:!0},g=(0,a.ZP)(d.x).withConfig({shouldForwardProp:(u,j)=>!f[u]&&j(u)})`
  align-items: ${({alignItems:u="center"})=>u};
  display: ${({display:u="flex",inline:j})=>j?"inline-flex":u};
  flex-direction: ${({direction:u="row"})=>u};
  flex-shrink: ${({shrink:u})=>u};
  flex-wrap: ${({wrap:u})=>u};
  ${({gap:u,theme:j})=>(0,s.Z)("gap",u,j)};
  justify-content: ${({justifyContent:u})=>u};
`,b=(0,a.ZP)(g)`
  // CrumbLinks do have padding-x, because they need to have a
  // interaction effect, which mis-aligns the breadcrumbs on the left.
  // This normalizes the behavior by moving the first item to left by
  // the same amount it has inner padding
  :first-child {
    margin-left: ${({theme:u})=>`calc(-1*${u.spaces[2]})`};
  }
`,y=({label:u,children:j,...I})=>{const n=l.Children.toArray(j);return(0,i.jsx)(d.x,{"aria-label":u,...I,children:(0,i.jsx)(b,{as:"ol",children:l.Children.map(n,(r,W)=>{const N=n.length>1&&W+1<n.length;return(0,i.jsxs)(g,{inline:!0,as:"li",children:[r,N&&(0,i.jsx)(e,{})]})})})})};y.displayName="Breadcrumbs"},64360:(C,v,t)=>{t.d(v,{$:()=>d});var i=t(74081),l=t(77919),a=t(41101);const d=({children:p,isCurrent:e=!1,...s})=>(0,i.jsx)(l.x,{paddingLeft:2,paddingRight:2,paddingTop:1,paddingBottom:1,children:(0,i.jsx)(a.Z,{variant:"pi",textColor:"neutral800",fontWeight:e?"bold":"normal","aria-current":e,...s,children:p})});d.displayName="Crumb"}}]);
