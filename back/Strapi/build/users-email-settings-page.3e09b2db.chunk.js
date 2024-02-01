"use strict";(self.webpackChunkmy_project=self.webpackChunkmy_project||[]).push([[8418],{38977:(O,f,a)=>{a.r(f),a.d(f,{default:()=>le});var t=a(74081),d=a(27279),i=a(51926),o=a(73354),c=a(27875),e=a(74758),s=a(87006),p=a(61020),h=a(40464),v=a(84419),l=a(99688),r=a(5938),y=a(6918),C=a(15244),m=a(23298),n=a(74577),S=a(39708),Z=a(35250),I=a(48102),X=a(12692),D=a(64360),J=a(71563),Y=a(70627),g=a.n(Y),b=a(47853);const k=b.Ry().shape({options:b.Ry().shape({from:b.Ry().shape({name:b.Z_().required(s.I0.required),email:b.Z_().email(s.I0.email).required(s.I0.required)}).required(),response_email:b.Z_().email(s.I0.email),object:b.Z_().required(s.I0.required),message:b.Z_().required(s.I0.required)}).required(s.I0.required)}),F=({template:u,onToggle:E,onSubmit:$})=>{const{formatMessage:j}=(0,p.Z)();return(0,t.jsxs)(r.P,{onClose:E,labelledBy:`${j({id:(0,l.OB)("PopUpForm.header.edit.email-templates"),defaultMessage:"Edit email template"})}, ${j({id:(0,l.OB)(u.display),defaultMessage:u.display})}`,children:[(0,t.jsx)(y.x,{children:(0,t.jsxs)(X.O,{label:`${j({id:(0,l.OB)("PopUpForm.header.edit.email-templates"),defaultMessage:"Edit email template"})}, ${j({id:(0,l.OB)(u.display),defaultMessage:u.display})}`,children:[(0,t.jsx)(D.$,{children:j({id:(0,l.OB)("PopUpForm.header.edit.email-templates"),defaultMessage:"Edit email template"})}),(0,t.jsx)(D.$,{isCurrent:!0,children:j({id:(0,l.OB)(u.display),defaultMessage:u.display})})]})}),(0,t.jsx)(J.J9,{onSubmit:$,initialValues:u,validateOnChange:!1,validationSchema:k,enableReinitialize:!0,children:({errors:M,values:P,handleChange:B,isSubmitting:R})=>(0,t.jsxs)(s.l0,{children:[(0,t.jsx)(C.f,{children:(0,t.jsxs)(m.r,{gap:5,children:[(0,t.jsx)(n.P,{col:6,s:12,children:(0,t.jsx)(s.jm,{intlLabel:{id:(0,l.OB)("PopUpForm.Email.options.from.name.label"),defaultMessage:"Shipper name"},name:"options.from.name",onChange:B,value:P.options.from.name,error:M?.options?.from?.name,type:"text"})}),(0,t.jsx)(n.P,{col:6,s:12,children:(0,t.jsx)(s.jm,{intlLabel:{id:(0,l.OB)("PopUpForm.Email.options.from.email.label"),defaultMessage:"Shipper email"},name:"options.from.email",onChange:B,value:P.options.from.email,error:M?.options?.from?.email,type:"text"})}),(0,t.jsx)(n.P,{col:6,s:12,children:(0,t.jsx)(s.jm,{intlLabel:{id:(0,l.OB)("PopUpForm.Email.options.response_email.label"),defaultMessage:"Response email"},name:"options.response_email",onChange:B,value:P.options.response_email,error:M?.options?.response_email,type:"text"})}),(0,t.jsx)(n.P,{col:6,s:12,children:(0,t.jsx)(s.jm,{intlLabel:{id:(0,l.OB)("PopUpForm.Email.options.object.label"),defaultMessage:"Subject"},name:"options.object",onChange:B,value:P.options.object,error:M?.options?.object,type:"text"})}),(0,t.jsx)(n.P,{col:12,s:12,children:(0,t.jsx)(S.g,{label:j({id:(0,l.OB)("PopUpForm.Email.options.message.label"),defaultMessage:"Message"}),id:"options.message",onChange:B,value:P.options.message,error:M?.options?.message&&j({id:M.options.message,defaultMessage:M.options.message})})})]})}),(0,t.jsx)(Z.m,{startActions:(0,t.jsx)(I.z,{onClick:E,variant:"tertiary",children:"Cancel"}),endActions:(0,t.jsx)(I.z,{loading:R,type:"submit",children:"Finish"})})]})})]})};F.propTypes={template:g().shape({display:g().string,icon:g().string,options:g().shape({from:g().shape({name:g().string,email:g().string}),message:g().string,object:g().string,response_email:g().string})}).isRequired,onSubmit:g().func.isRequired,onToggle:g().func.isRequired};const q=F;var _=a(70774),ee=a(38101),A=a(93153),T=a(50086),U=a(10989),L=a(32370),se=a(86967),H=a(50703),W=a(4987),te=a(84352),N=a(26784),ae=a(59082);const w=({canUpdate:u,onEditClick:E})=>{const{formatMessage:$}=(0,p.Z)();return(0,t.jsxs)(_.i,{colCount:3,rowCount:3,children:[(0,t.jsx)(ee.h,{children:(0,t.jsxs)(A.Tr,{children:[(0,t.jsx)(T.Th,{width:"1%",children:(0,t.jsx)(U.T,{children:$({id:(0,l.OB)("Email.template.table.icon.label"),defaultMessage:"icon"})})}),(0,t.jsx)(T.Th,{children:(0,t.jsx)(L.Z,{variant:"sigma",textColor:"neutral600",children:$({id:(0,l.OB)("Email.template.table.name.label"),defaultMessage:"name"})})}),(0,t.jsx)(T.Th,{width:"1%",children:(0,t.jsx)(U.T,{children:$({id:(0,l.OB)("Email.template.table.action.label"),defaultMessage:"action"})})})]})}),(0,t.jsxs)(se.p,{children:[(0,t.jsxs)(A.Tr,{...(0,s.X7)({fn:()=>E("reset_password")}),children:[(0,t.jsx)(T.Td,{children:(0,t.jsx)(H.J,{children:(0,t.jsx)(te.Z,{"aria-label":$({id:"global.reset-password",defaultMessage:"Reset password"})})})}),(0,t.jsx)(T.Td,{children:(0,t.jsx)(L.Z,{children:$({id:"global.reset-password",defaultMessage:"Reset password"})})}),(0,t.jsx)(T.Td,{...s.UW,children:(0,t.jsx)(W.h,{onClick:()=>E("reset_password"),label:$({id:(0,l.OB)("Email.template.form.edit.label"),defaultMessage:"Edit a template"}),noBorder:!0,icon:u&&(0,t.jsx)(N.Z,{})})})]}),(0,t.jsxs)(A.Tr,{...(0,s.X7)({fn:()=>E("email_confirmation")}),children:[(0,t.jsx)(T.Td,{children:(0,t.jsx)(H.J,{children:(0,t.jsx)(ae.Z,{"aria-label":$({id:(0,l.OB)("Email.template.email_confirmation"),defaultMessage:"Email address confirmation"})})})}),(0,t.jsx)(T.Td,{children:(0,t.jsx)(L.Z,{children:$({id:(0,l.OB)("Email.template.email_confirmation"),defaultMessage:"Email address confirmation"})})}),(0,t.jsx)(T.Td,{...s.UW,children:(0,t.jsx)(W.h,{onClick:()=>E("email_confirmation"),label:$({id:(0,l.OB)("Email.template.form.edit.label"),defaultMessage:"Edit a template"}),noBorder:!0,icon:u&&(0,t.jsx)(N.Z,{})})})]})]})]})};w.propTypes={canUpdate:g().bool.isRequired,onEditClick:g().func.isRequired};const ie=w,ne=()=>(0,t.jsx)(s.O4,{permissions:v._.readEmailTemplates,children:(0,t.jsx)(oe,{})}),oe=()=>{const{formatMessage:u}=(0,p.Z)(),{trackUsage:E}=(0,s.rS)(),{notifyStatus:$}=(0,i.G)(),j=(0,s.lm)(),{lockApp:M,unlockApp:P}=(0,s.o1)(),B=(0,h.useQueryClient)(),{get:R,put:re}=(0,s.kY)(),{formatAPIError:K}=(0,s.So)();(0,s.go)();const[de,me]=d.useState(!1),[Q,ce]=d.useState(null),{isLoading:pe,allowedActions:{canUpdate:he}}=(0,s.ss)({update:v._.updateEmailTemplates}),{isLoading:fe,data:V}=(0,h.useQuery)(["users-permissions","email-templates"],async()=>{const{data:x}=await R("/users-permissions/email-templates");return x},{onSuccess(){$(u({id:(0,l.OB)("Email.template.data.loaded"),defaultMessage:"Email templates has been loaded"}))},onError(x){j({type:"warning",message:K(x)})}}),ue=pe||fe,z=()=>{me(x=>!x)},ge=x=>{ce(x),z()},G=(0,h.useMutation)(x=>re("/users-permissions/email-templates",{"email-templates":x}),{async onSuccess(){await B.invalidateQueries(["users-permissions","email-templates"]),j({type:"success",message:{id:"notification.success.saved",defaultMessage:"Saved"}}),E("didEditEmailTemplates"),P(),z()},onError(x){j({type:"warning",message:K(x)}),P()},refetchActive:!0}),$e=x=>{M(),E("willEditEmailTemplates");const xe={...V,[Q]:x};G.mutate(xe)};return ue?(0,t.jsxs)(o.o,{"aria-busy":"true",children:[(0,t.jsx)(s.SL,{name:u({id:(0,l.OB)("HeaderNav.link.emailTemplates"),defaultMessage:"Email templates"})}),(0,t.jsx)(c.T,{title:u({id:(0,l.OB)("HeaderNav.link.emailTemplates"),defaultMessage:"Email templates"})}),(0,t.jsx)(e.D,{children:(0,t.jsx)(s.dO,{})})]}):(0,t.jsxs)(o.o,{"aria-busy":G.isLoading,children:[(0,t.jsx)(s.SL,{name:u({id:(0,l.OB)("HeaderNav.link.emailTemplates"),defaultMessage:"Email templates"})}),(0,t.jsx)(c.T,{title:u({id:(0,l.OB)("HeaderNav.link.emailTemplates"),defaultMessage:"Email templates"})}),(0,t.jsxs)(e.D,{children:[(0,t.jsx)(ie,{onEditClick:ge,canUpdate:he}),de&&(0,t.jsx)(q,{template:V[Q],onToggle:z,onSubmit:$e})]})]})},le=ne},99688:(O,f,a)=>{a.d(f,{YX:()=>o,OB:()=>c.Z});var t=a(10124),d=a.n(t);const o=e=>Object.keys(e).reduce((s,p)=>{const h=e[p].controllers,v=Object.keys(h).reduce((l,r)=>(d()(h[r])||(l[r]=h[r]),l),{});return d()(v)||(s[p]={controllers:v}),s},{});var c=a(58655)},77919:(O,f,a)=>{a.d(f,{x:()=>c});var t=a(72450),d=a(55409),i=a(812);const o={color:!0,cursor:!0,height:!0,width:!0},c=t.ZP.div.withConfig({shouldForwardProp:(e,s)=>!o[e]&&s(e)})`
  // Font
  font-size: ${({fontSize:e,theme:s})=>(0,i.$)(s.fontSizes,e,e)};

  // Colors
  background: ${({theme:e,background:s})=>(0,i.$)(e.colors,s,s)};
  color: ${({theme:e,color:s})=>(0,i.$)(e.colors,s,void 0)};

  // Spaces
  ${({theme:e,padding:s})=>(0,d.Z)("padding",s,e)}
  ${({theme:e,paddingTop:s})=>(0,d.Z)("padding-top",s,e)}
  ${({theme:e,paddingRight:s})=>(0,d.Z)("padding-right",s,e)}
  ${({theme:e,paddingBottom:s})=>(0,d.Z)("padding-bottom",s,e)}
  ${({theme:e,paddingLeft:s})=>(0,d.Z)("padding-left",s,e)}
  ${({theme:e,marginLeft:s})=>(0,d.Z)("margin-left",s,e)}
  ${({theme:e,marginRight:s})=>(0,d.Z)("margin-right",s,e)}
  ${({theme:e,marginTop:s})=>(0,d.Z)("margin-top",s,e)}
  ${({theme:e,marginBottom:s})=>(0,d.Z)("margin-bottom",s,e)}

  // Responsive hiding
  ${({theme:e,hiddenS:s})=>s?`${e.mediaQueries.tablet} { display: none; }`:void 0}
  ${({theme:e,hiddenXS:s})=>s?`${e.mediaQueries.mobile} { display: none; }`:void 0}
  

  // Borders
  border-radius: ${({theme:e,hasRadius:s,borderRadius:p})=>s?e.borderRadius:p};
  border-style: ${({borderStyle:e})=>e};
  border-width: ${({borderWidth:e})=>e};
  border-color: ${({borderColor:e,theme:s})=>(0,i.$)(s.colors,e,void 0)};
  border: ${({theme:e,borderColor:s,borderStyle:p,borderWidth:h})=>{if(s&&!p&&typeof h>"u")return`1px solid ${e.colors[s]}`}};

  // Shadows
  box-shadow: ${({theme:e,shadow:s})=>(0,i.$)(e.shadows,s,void 0)};

  // Handlers
  pointer-events: ${({pointerEvents:e})=>e};
  &:hover {
    ${({_hover:e,theme:s})=>e?e(s):void 0}
  }

  // Display
  display: ${({display:e})=>e};

  // Position
  position: ${({position:e})=>e};
  left: ${({left:e,theme:s})=>(0,i.$)(s.spaces,e,e)};
  right: ${({right:e,theme:s})=>(0,i.$)(s.spaces,e,e)};
  top: ${({top:e,theme:s})=>(0,i.$)(s.spaces,e,e)};
  bottom: ${({bottom:e,theme:s})=>(0,i.$)(s.spaces,e,e)};
  z-index: ${({zIndex:e})=>e};
  overflow: ${({overflow:e})=>e};

  // Size
  width: ${({width:e,theme:s})=>(0,i.$)(s.spaces,e,e)};
  max-width: ${({maxWidth:e,theme:s})=>(0,i.$)(s.spaces,e,e)};
  min-width: ${({minWidth:e,theme:s})=>(0,i.$)(s.spaces,e,e)};
  height: ${({height:e,theme:s})=>(0,i.$)(s.spaces,e,e)};
  max-height: ${({maxHeight:e,theme:s})=>(0,i.$)(s.spaces,e,e)};
  min-height: ${({minHeight:e,theme:s})=>(0,i.$)(s.spaces,e,e)};

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
  line-height: ${({theme:e,lineHeight:s})=>(0,i.$)(e.lineHeights,s,s)};

  // Cursor
  cursor: ${({cursor:e})=>e};
`},41101:(O,f,a)=>{a.d(f,{Z:()=>C});var t=a(72450);const d="alpha",i="beta",o="delta",c="epsilon",e="omega",s="pi",p="sigma",h=[d,i,o,c,e,s,p],v=({ellipsis:m=!1})=>m&&`
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `,l=({variant:m=e,theme:n})=>{switch(m){case d:return`
        font-weight: ${n.fontWeights.bold};
        font-size: ${n.fontSizes[5]};
        line-height: ${n.lineHeights[2]};
      `;case i:return`
        font-weight: ${n.fontWeights.bold};
        font-size: ${n.fontSizes[4]};
        line-height: ${n.lineHeights[1]};
      `;case o:return`
        font-weight: ${n.fontWeights.semiBold};
        font-size: ${n.fontSizes[3]};
        line-height: ${n.lineHeights[2]};
      `;case c:return`
        font-size: ${n.fontSizes[3]};
        line-height: ${n.lineHeights[6]};
      `;case e:return`
        font-size: ${n.fontSizes[2]};
        line-height: ${n.lineHeights[4]};
      `;case s:return`
        font-size: ${n.fontSizes[1]};
        line-height: ${n.lineHeights[3]};
      `;case p:return`
        font-weight: ${n.fontWeights.bold};
        font-size: ${n.fontSizes[0]};
        line-height: ${n.lineHeights[5]};
        text-transform: uppercase;
      `;default:return`
        font-size: ${n.fontSizes[2]};
      `}};var r=a(812);const y={fontSize:!0,fontWeight:!0},C=t.ZP.span.withConfig({shouldForwardProp:(m,n)=>!y[m]&&n(m)})`
  ${l}
  ${v}

  // These properties need to come after {variantStyle}, because they might
  // overwrite a variant attribute
  font-weight: ${({theme:m,fontWeight:n})=>(0,r.$)(m.fontWeights,n,void 0)};
  font-size: ${({theme:m,fontSize:n})=>(0,r.$)(m.fontSizes,n,void 0)};
  line-height: ${({theme:m,lineHeight:n})=>(0,r.$)(m.lineHeights,n,n)};
  color: ${({theme:m,textColor:n})=>m.colors[n||"neutral800"]};
  text-align: ${({textAlign:m})=>m};
  text-decoration: ${({textDecoration:m})=>m};
  text-transform: ${({textTransform:m})=>m};
`},55409:(O,f,a)=>{a.d(f,{Z:()=>t});const t=(d,i,o)=>{if(!i)return;if(typeof i=="object")return(Array.isArray(i)?i:[i?.desktop,i?.tablet,i?.mobile]).reduce((p,h,v)=>{if(h)switch(v){case 0:return`${p}${d}: ${o.spaces[h]};`;case 1:return`${p}${o.mediaQueries.tablet}{${d}: ${o.spaces[h]};}`;case 2:return`${p}${o.mediaQueries.mobile}{${d}: ${o.spaces[h]};}`;default:return p}return p},"");const c=o.spaces[i]??i;return`${d}: ${c};`}},812:(O,f,a)=>{a.d(f,{$:()=>i});function t(o,c){return typeof o=="string"?!1:c in o}function d(o){return o&&typeof o=="object"&&!Array.isArray(o)}function i(o,c,e){return c&&t(o,c)?o[c]:e}},12692:(O,f,a)=>{a.d(f,{O:()=>l});var t=a(74081),d=a(27279),i=a(72450),o=a(77919),c=a(41101);const e=()=>(0,t.jsx)(o.x,{"aria-hidden":!0,paddingLeft:1,paddingRight:1,children:(0,t.jsx)(c.Z,{variant:"pi",textColor:"neutral500",children:"/"})});e.displayName="Divider";var s=a(55409);const p={direction:!0},h=(0,i.ZP)(o.x).withConfig({shouldForwardProp:(r,y)=>!p[r]&&y(r)})`
  align-items: ${({alignItems:r="center"})=>r};
  display: ${({display:r="flex",inline:y})=>y?"inline-flex":r};
  flex-direction: ${({direction:r="row"})=>r};
  flex-shrink: ${({shrink:r})=>r};
  flex-wrap: ${({wrap:r})=>r};
  ${({gap:r,theme:y})=>(0,s.Z)("gap",r,y)};
  justify-content: ${({justifyContent:r})=>r};
`,v=(0,i.ZP)(h)`
  // CrumbLinks do have padding-x, because they need to have a
  // interaction effect, which mis-aligns the breadcrumbs on the left.
  // This normalizes the behavior by moving the first item to left by
  // the same amount it has inner padding
  :first-child {
    margin-left: ${({theme:r})=>`calc(-1*${r.spaces[2]})`};
  }
`,l=({label:r,children:y,...C})=>{const m=d.Children.toArray(y);return(0,t.jsx)(o.x,{"aria-label":r,...C,children:(0,t.jsx)(v,{as:"ol",children:d.Children.map(m,(n,S)=>{const Z=m.length>1&&S+1<m.length;return(0,t.jsxs)(h,{inline:!0,as:"li",children:[n,Z&&(0,t.jsx)(e,{})]})})})})};l.displayName="Breadcrumbs"},64360:(O,f,a)=>{a.d(f,{$:()=>o});var t=a(74081),d=a(77919),i=a(41101);const o=({children:c,isCurrent:e=!1,...s})=>(0,t.jsx)(d.x,{paddingLeft:2,paddingRight:2,paddingTop:1,paddingBottom:1,children:(0,t.jsx)(i.Z,{variant:"pi",textColor:"neutral800",fontWeight:e?"bold":"normal","aria-current":e,...s,children:c})});o.displayName="Crumb"}}]);
