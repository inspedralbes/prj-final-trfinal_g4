"use strict";(self.webpackChunkstrapi=self.webpackChunkstrapi||[]).push([[4534],{34534:(H,T,t)=>{t.d(T,{ProtectedListPage:()=>ct});var s=t(74081),c=t(27279),u=t(51926),M=t(27997),C=t(73354),b=t(27875),W=t(37472),g=t(32370),i=t(48102),o=t(74758),h=t(93415),d=t(70774),f=t(38566),O=t(38101),P=t(93153),l=t(50086),D=t(73411),_=t(10989),tt=t(86967),A=t(10701),G=t(72450);const k=G.ZP.div`
  background: ${({theme:n})=>n.colors.danger500};
  border: none;
  border-radius: 16px;
  position: relative;
  height: ${24/16}rem;
  width: ${40/16}rem;

  & span {
    font-size: ${({visibleLabels:n})=>n?"1rem":0};
  }

  &:before {
    content: '';
    background: ${({theme:n})=>n.colors.neutral0};
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    position: absolute;
    transition: all 0.5s;
    left: ${({theme:n})=>n.spaces[1]};
    top: ${({theme:n})=>n.spaces[1]};
  }

  @media (prefers-reduced-motion: reduce) {
    &:before {
      transition: none;
    }
  }
`,st=G.ZP.button`
  background: transparent;
  padding: 0;
  border: none;

  &[aria-checked='true'] ${k} {
    background: ${({theme:n})=>n.colors.success500};
  }

  &[aria-checked='true'] ${k}:before {
    transform: translateX(1rem);
  }
`,ot=c.forwardRef(({label:n,onChange:x,onLabel:p="On",offLabel:S="Off",selected:j,visibleLabels:m=!1,...I},a)=>(0,s.jsx)(st,{ref:a,role:"switch","aria-checked":j,"aria-label":n,onClick:x,visibleLabels:m,type:"button",...I,children:(0,s.jsxs)(A.k,{children:[(0,s.jsxs)(k,{children:[(0,s.jsx)("span",{children:p}),(0,s.jsx)("span",{children:S})]}),m&&(0,s.jsx)(h.x,{as:"span","aria-hidden":!0,paddingLeft:2,color:j?"success600":"danger600",children:j?p:S})]})}));var V=t(4987),et=t(6191),at=t(37370),v=t(87006),Z=t(36938),Q=t(78665),nt=t(26784),rt=t(52448),dt=t(61020),J=t(51447),it=t(47533),X=t(6606),lt=t(92047),Ct=t(15816),bt=t(97442),Wt=t(13576),St=t(87830),Et=t(47184),Lt=t(364),Pt=t(59461),Dt=t(71563),pt=t(49204),Bt=t(47853),$t=t(74919),Ot=t(29206),At=t(40464),kt=t(98934),Zt=t(43433),It=t(75719),Rt=t(8175),Ut=t(6078),Ft=t(51943),Kt=t(55783),Nt=t(92249),zt=t(41942),Ht=t(22919),Gt=t(53915),Vt=t(75041),Qt=t(30200),Jt=t(91379),Xt=t(33299),Yt=t(33409),wt=t(63645),qt=t(7988),_t=t(7055),ts=t(26757),ss=t(58311),os=t(24840),es=t(29510),as=t(16946),ns=t(10124),rs=t(69530),ds=t(86961),is=t(51527),ls=t(19764),hs=t(42982),cs=t(26126);const ht=()=>{const[n,x]=c.useState(!1),[p,S]=c.useState(!1),[j,m]=c.useState([]),I=(0,X.j)(e=>e.admin_app.permissions.settings?.webhooks),{formatMessage:a}=(0,dt.Z)(),{_unstableFormatAPIError:B}=(0,v.So)(),y=(0,v.lm)();(0,v.go)();const{push:gt}=(0,J.k6)(),{pathname:Y}=(0,J.TH)(),{isLoading:mt,allowedActions:{canCreate:R,canUpdate:U,canDelete:w}}=(0,v.ss)(I),{notifyStatus:q}=(0,u.G)(),{isLoading:vt,webhooks:E,error:F,updateWebhook:xt,deleteManyWebhooks:ut}=(0,lt.u)();c.useEffect(()=>{if(F){y({type:"warning",message:B(F)});return}E&&q(a({id:"Settings.webhooks.list.loading.success",defaultMessage:"Webhooks have been loaded"}))},[E,F,y,a,q,B]);const ft=async e=>{try{const r=await xt(e);"error"in r&&y({type:"warning",message:B(r.error)})}catch{y({type:"warning",message:{id:"notification.error",defaultMessage:"An error occurred"}})}},jt=async()=>{try{S(!0);const e=await ut({ids:j});if("error"in e){y({type:"warning",message:B(e.error)});return}m([])}catch{y({type:"warning",message:{id:"notification.error",defaultMessage:"An error occurred"}})}finally{S(!1),x(!1)}},yt=e=>m(e?E?.map(r=>r.id)??[]:[]),Tt=(e,r)=>m(e?z=>[...z,r]:z=>z.filter(Mt=>Mt!==r)),K=e=>()=>gt(`${Y}/${e}`),N=mt||vt,$=E?.length??0,L=j.length;return(0,s.jsxs)(M.A,{children:[(0,s.jsx)(v.SL,{name:"Webhooks"}),(0,s.jsxs)(C.o,{"aria-busy":N,children:[(0,s.jsx)(b.T,{title:a({id:"Settings.webhooks.title",defaultMessage:"Webhooks"}),subtitle:a({id:"Settings.webhooks.list.description",defaultMessage:"Get POST changes notifications"}),primaryAction:R&&!N&&(0,s.jsx)(at.Q,{as:it.OL,startIcon:(0,s.jsx)(Z.Z,{}),variant:"default",to:`${Y}/create`,size:"S",children:a({id:"Settings.webhooks.list.button.add",defaultMessage:"Create new webhook"})})}),L>0&&w&&(0,s.jsx)(W.Z,{startActions:(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(g.Z,{variant:"epsilon",textColor:"neutral600",children:a({id:"Settings.webhooks.to.delete",defaultMessage:"{webhooksToDeleteLength, plural, one {# webhook} other {# webhooks}} selected"},{webhooksToDeleteLength:L})}),(0,s.jsx)(i.z,{onClick:()=>x(!0),startIcon:(0,s.jsx)(Q.Z,{}),size:"L",variant:"danger-light",children:a({id:"global.delete",defaultMessage:"Delete"})})]})}),(0,s.jsx)(o.D,{children:N?(0,s.jsx)(h.x,{background:"neutral0",padding:6,shadow:"filterShadow",hasRadius:!0,children:(0,s.jsx)(v.dO,{})}):$>0?(0,s.jsxs)(d.i,{colCount:5,rowCount:$+1,footer:(0,s.jsx)(f.c,{onClick:R?K("create"):void 0,icon:(0,s.jsx)(Z.Z,{}),children:a({id:"Settings.webhooks.list.button.add",defaultMessage:"Create new webhook"})}),children:[(0,s.jsx)(O.h,{children:(0,s.jsxs)(P.Tr,{children:[(0,s.jsx)(l.Th,{children:(0,s.jsx)(D.C,{"aria-label":a({id:"global.select-all-entries",defaultMessage:"Select all entries"}),indeterminate:L>0&&L<$,value:L===$,onValueChange:yt})}),(0,s.jsx)(l.Th,{width:"20%",children:(0,s.jsx)(g.Z,{variant:"sigma",textColor:"neutral600",children:a({id:"global.name",defaultMessage:"Name"})})}),(0,s.jsx)(l.Th,{width:"60%",children:(0,s.jsx)(g.Z,{variant:"sigma",textColor:"neutral600",children:a({id:"Settings.webhooks.form.url",defaultMessage:"URL"})})}),(0,s.jsx)(l.Th,{width:"20%",children:(0,s.jsx)(g.Z,{variant:"sigma",textColor:"neutral600",children:a({id:"Settings.webhooks.list.th.status",defaultMessage:"Status"})})}),(0,s.jsx)(l.Th,{children:(0,s.jsx)(_.T,{children:a({id:"Settings.webhooks.list.th.actions",defaultMessage:"Actions"})})})]})}),(0,s.jsx)(tt.p,{children:E?.map(e=>(0,s.jsxs)(P.Tr,{onClick:U?K(e.id):void 0,style:{cursor:U?"pointer":"default"},children:[(0,s.jsx)(l.Td,{onClick:r=>r.stopPropagation(),children:(0,s.jsx)(D.C,{"aria-label":`${a({id:"global.select",defaultMessage:"Select"})} ${e.name}`,value:j?.includes(e.id),onValueChange:r=>Tt(r,e.id),name:"select"})}),(0,s.jsx)(l.Td,{children:(0,s.jsx)(g.Z,{fontWeight:"semiBold",textColor:"neutral800",children:e.name})}),(0,s.jsx)(l.Td,{children:(0,s.jsx)(g.Z,{textColor:"neutral800",children:e.url})}),(0,s.jsx)(l.Td,{children:(0,s.jsx)(A.k,{children:(0,s.jsx)(ot,{onLabel:a({id:"global.enabled",defaultMessage:"Enabled"}),offLabel:a({id:"global.disabled",defaultMessage:"Disabled"}),label:`${e.name} ${a({id:"Settings.webhooks.list.th.status",defaultMessage:"Status"})}`,selected:e.isEnabled,onChange:r=>{r.stopPropagation(),ft({...e,isEnabled:!e.isEnabled})},visibleLabels:!0})})}),(0,s.jsx)(l.Td,{children:(0,s.jsxs)(A.k,{gap:1,children:[U&&(0,s.jsx)(V.h,{label:a({id:"Settings.webhooks.events.update",defaultMessage:"Update"}),icon:(0,s.jsx)(nt.Z,{}),noBorder:!0}),w&&(0,s.jsx)(V.h,{onClick:r=>{r.stopPropagation(),m([e.id]),x(!0)},label:a({id:"Settings.webhooks.events.delete",defaultMessage:"Delete webhook"}),icon:(0,s.jsx)(Q.Z,{}),noBorder:!0})]})})]},e.id))})]}):(0,s.jsx)(et.x,{icon:(0,s.jsx)(rt.Z,{width:"160px"}),content:a({id:"Settings.webhooks.list.empty.description",defaultMessage:"No webhooks found"}),action:(0,s.jsx)(i.z,{variant:"secondary",startIcon:(0,s.jsx)(Z.Z,{}),onClick:()=>R?K("create"):{},children:a({id:"Settings.webhooks.list.button.add",defaultMessage:"Create new webhook"})})})})]}),(0,s.jsx)(v.QH,{isOpen:n,onToggleDialog:()=>x(e=>!e),onConfirm:jt,isConfirmButtonLoading:p})]})},ct=()=>{const n=(0,X.j)(x=>x.admin_app.permissions.settings?.webhooks.main);return(0,s.jsx)(v.O4,{permissions:n,children:(0,s.jsx)(ht,{})})}},92047:(H,T,t)=>{t.d(T,{u:()=>g});var s=t(6606);const c=s.m.injectEndpoints({endpoints:i=>({getWebhooks:i.query({query:o=>({url:`/admin/webhooks/${o?.id??""}`,method:"GET"}),transformResponse:o=>Array.isArray(o.data)?o.data:[o.data],providesTags:(o,h,d)=>typeof d=="object"&&"id"in d?[{type:"Webhook",id:d.id}]:[...o?.map(({id:f})=>({type:"Webhook",id:f}))??[],{type:"Webhook",id:"LIST"}]}),createWebhook:i.mutation({query:o=>({url:"/admin/webhooks",method:"POST",data:o}),transformResponse:o=>o.data,invalidatesTags:[{type:"Webhook",id:"LIST"}]}),updateWebhook:i.mutation({query:({id:o,...h})=>({url:`/admin/webhooks/${o}`,method:"PUT",data:h}),transformResponse:o=>o.data,invalidatesTags:(o,h,{id:d})=>[{type:"Webhook",id:d}]}),triggerWebhook:i.mutation({query:o=>({url:`/admin/webhooks/${o}/trigger`,method:"POST"}),transformResponse:o=>o.data}),deleteManyWebhooks:i.mutation({query:o=>({url:"/admin/webhooks/batch-delete",method:"POST",data:o}),transformResponse:o=>o.data,invalidatesTags:(o,h,{ids:d})=>d.map(f=>({type:"Webhook",id:f}))})}),overrideExisting:!1}),{useGetWebhooksQuery:u,useCreateWebhookMutation:M,useUpdateWebhookMutation:C,useTriggerWebhookMutation:b,useDeleteManyWebhooksMutation:W}=c,g=(i=void 0,o)=>{const{data:h,isLoading:d,error:f}=u(i,o),[O]=M(),[P]=C(),[l]=b(),[D]=W();return{webhooks:h,isLoading:d,error:f,createWebhook:O,updateWebhook:P,triggerWebhook:l,deleteManyWebhooks:D}}},38566:(H,T,t)=>{t.d(T,{c:()=>i});var s=t(74081),c=t(72450),u=t(93415),M=t(84366),C=t(10701),b=t(32370);const W=(0,c.ZP)(u.x)`
  height: ${24/16}rem;
  width: ${24/16}rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    height: ${10/16}rem;
    width: ${10/16}rem;
  }

  svg path {
    fill: ${({theme:o})=>o.colors.primary600};
  }
`,g=(0,c.ZP)(u.x)`
  border-radius: 0 0 ${({theme:o})=>o.borderRadius} ${({theme:o})=>o.borderRadius};
  display: block;
  width: 100%;
  border: none;
`,i=({children:o,icon:h,...d})=>(0,s.jsxs)("div",{children:[(0,s.jsx)(M.i,{}),(0,s.jsx)(g,{as:"button",background:"primary100",padding:5,...d,children:(0,s.jsxs)(C.k,{children:[(0,s.jsx)(W,{"aria-hidden":!0,background:"primary200",children:h}),(0,s.jsx)(u.x,{paddingLeft:3,children:(0,s.jsx)(b.Z,{variant:"pi",fontWeight:"bold",textColor:"primary600",children:o})})]})})]})}}]);
