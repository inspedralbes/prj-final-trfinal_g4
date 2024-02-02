"use strict";(self.webpackChunkstrapi=self.webpackChunkstrapi||[]).push([[9334],{83758:(h,M,s)=>{s.d(M,{B:()=>U,D:()=>I,H:()=>K,R:()=>A});var t=s(74081),l=s(10701),d=s(32370),P=s(27997),O=s(73354),g=s(74758),m=s(27875),a=s(87006),e=s(10411),o=s(76827),E=s(61020),c=s(6606),T=s(47289),r=s(72450);const D=(0,r.ZP)(l.k)`
  svg path {
    fill: ${({theme:i})=>i.colors.neutral600};
  }
`,R=({name:i})=>(0,t.jsxs)(l.k,{background:"primary100",borderStyle:"dashed",borderColor:"primary600",borderWidth:"1px",gap:3,hasRadius:!0,padding:3,shadow:"tableShadow",width:(0,a.Q1)(300),children:[(0,t.jsx)(D,{alignItems:"center",background:"neutral200",borderRadius:"50%",height:6,justifyContent:"center",width:6,children:(0,t.jsx)(e.Z,{width:`${8/16}rem`})}),(0,t.jsx)(d.Z,{fontWeight:"bold",children:i})]}),I=()=>(0,t.jsx)(c.P,{renderItem:i=>{if(i.type===T.D.STAGE)return(0,t.jsx)(R,{name:typeof i.item=="string"?i.item:null})}}),A=({children:i})=>(0,t.jsx)(P.A,{children:(0,t.jsx)(O.o,{tabIndex:-1,children:(0,t.jsx)(g.D,{children:i})})}),U=({href:i})=>{const{formatMessage:C}=(0,E.Z)();return(0,t.jsx)(a.rU,{startIcon:(0,t.jsx)(o.Z,{}),to:i,children:C({id:"global.back",defaultMessage:"Back"})})},K=({title:i,subtitle:C,navigationAction:y,primaryAction:L})=>(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(a.SL,{name:i}),(0,t.jsx)(m.T,{navigationAction:y,primaryAction:L,title:i,subtitle:C})]})},69334:(h,M,s)=>{s.d(M,{ProtectedReviewWorkflowsPage:()=>J});var t=s(74081),l=s(27279),d=s(10701),P=s(77970),O=s(70774),g=s(38566),m=s(38101),a=s(93153),e=s(50086),o=s(32370),E=s(10989),c=s(86967),T=s(4987),r=s(87006),D=s(36938),R=s(26784),I=s(78665),A=s(61020),U=s(51447),K=s(72450),i=s(6606),C=s(25788),y=s(48501),L=s(83758),j=s(41186),z=s(47289),H=s(38684),Es=s(15816),ds=s(97442),Ds=s(13576),Ms=s(87830),Ps=s(47184),Os=s(364),gs=s(59461),ms=s(71563),cs=s(49204),vs=s(47853),fs=s(74919),Ts=s(29206),Cs=s(40464),hs=s(98934),Ls=s(43433),Ws=s(75719),Bs=s(8175),Rs=s(6078),Is=s(51943),As=s(55783),Us=s(92249),Ks=s(41942),ys=s(22919),js=s(53915),xs=s(75041),us=s(30200),ps=s(91379),ws=s(33299),Ss=s(33409),Zs=s(63645),$s=s(7988),Qs=s(7055),Fs=s(26757),Ns=s(58311),Gs=s(24840),zs=s(29510),Hs=s(16946),Ys=s(10124),ks=s(69530),Js=s(86961),Xs=s(51527),Vs=s(19764),bs=s(42982),qs=s(26126),st=s(28390);const Y=(0,K.ZP)(r.rU)`
  align-items: center;
  height: ${(0,r.Q1)(32)};
  display: flex;
  justify-content: center;
  padding: ${({theme:n})=>`${n.spaces[2]}}`};
  width: ${(0,r.Q1)(32)};

  svg {
    height: ${(0,r.Q1)(12)};
    width: ${(0,r.Q1)(12)};

    path {
      fill: ${({theme:n})=>n.colors.neutral500};
    }
  }

  &:hover,
  &:focus {
    svg {
      path {
        fill: ${({theme:n})=>n.colors.neutral800};
      }
    }
  }
`,k=()=>{const{formatMessage:n}=(0,A.Z)(),{push:W}=(0,U.k6)(),{trackUsage:S}=(0,r.rS)(),[x,u]=l.useState(null),[X,B]=l.useState(!1),{collectionTypes:V,singleTypes:b,isLoading:q}=(0,C.u)(),{meta:v,workflows:Z,isLoading:p,deleteWorkflow:ss}=(0,H.u)(),[ts,$]=l.useState(!1),{_unstableFormatAPIError:os}=(0,r.So)(),w=(0,r.lm)(),{getFeature:es,isLoading:Q}=(0,y.u)(),ns=(0,i.j)(_=>_.admin_app.permissions.settings?.["review-workflows"]),{allowedActions:{canCreate:F,canDelete:_s}}=(0,r.ss)(ns),f=es("review-workflows")?.[z.C],as=_=>[...V,...b].find(G=>G.uid===_)?.info.displayName,rs=_=>{u(_)},is=()=>{u(null)},ls=async()=>{if(x)try{$(!0);const _=await ss({id:x});if("error"in _){w({type:"warning",message:os(_.error)});return}u(null),w({type:"success",message:{id:"notification.success.deleted",defaultMessage:"Deleted"}})}catch{w({type:"warning",message:{id:"notification.error.unexpected",defaultMessage:"An error occurred"}})}finally{$(!1)}};return l.useEffect(()=>{!p&&!Q&&f&&v&&v?.workflowCount>parseInt(f,10)&&B(!0)},[Q,p,v,v?.workflowCount,f]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(L.H,{primaryAction:F&&(0,t.jsx)(r.Qj,{startIcon:(0,t.jsx)(D.Z,{}),size:"S",to:"/settings/review-workflows/create",onClick:_=>{f&&v&&v?.workflowCount>=parseInt(f,10)?(_.preventDefault(),B(!0)):S("willCreateWorkflow")},children:n({id:"Settings.review-workflows.list.page.create",defaultMessage:"Create new workflow"})}),subtitle:n({id:"Settings.review-workflows.list.page.subtitle",defaultMessage:"Manage your content review process"}),title:n({id:"Settings.review-workflows.list.page.title",defaultMessage:"Review Workflows"})}),(0,t.jsxs)(L.R,{children:[p||q?(0,t.jsx)(d.k,{justifyContent:"center",children:(0,t.jsx)(P.a,{children:n({id:"Settings.review-workflows.page.list.isLoading",defaultMessage:"Workflows are loading"})})}):(0,t.jsxs)(O.i,{colCount:3,footer:F&&(0,t.jsx)(g.c,{icon:(0,t.jsx)(D.Z,{}),onClick:()=>{f&&v&&v?.workflowCount>=parseInt(f,10)?B(!0):(W("/settings/review-workflows/create"),S("willCreateWorkflow"))},children:n({id:"Settings.review-workflows.list.page.create",defaultMessage:"Create new workflow"})}),rowCount:1,children:[(0,t.jsx)(m.h,{children:(0,t.jsxs)(a.Tr,{children:[(0,t.jsx)(e.Th,{children:(0,t.jsx)(o.Z,{variant:"sigma",children:n({id:"Settings.review-workflows.list.page.list.column.name.title",defaultMessage:"Name"})})}),(0,t.jsx)(e.Th,{children:(0,t.jsx)(o.Z,{variant:"sigma",children:n({id:"Settings.review-workflows.list.page.list.column.stages.title",defaultMessage:"Stages"})})}),(0,t.jsx)(e.Th,{children:(0,t.jsx)(o.Z,{variant:"sigma",children:n({id:"Settings.review-workflows.list.page.list.column.contentTypes.title",defaultMessage:"Content Types"})})}),(0,t.jsx)(e.Th,{children:(0,t.jsx)(E.T,{children:n({id:"Settings.review-workflows.list.page.list.column.actions.title",defaultMessage:"Actions"})})})]})}),(0,t.jsx)(c.p,{children:Z?.map(_=>(0,l.createElement)(a.Tr,{...(0,r.X7)({fn(N){N.target.nodeName!=="BUTTON"&&W(`/settings/review-workflows/${_.id}`)}}),key:`workflow-${_.id}`},(0,t.jsx)(e.Td,{width:(0,r.Q1)(250),children:(0,t.jsx)(o.Z,{textColor:"neutral800",fontWeight:"bold",ellipsis:!0,children:_.name})}),(0,t.jsx)(e.Td,{children:(0,t.jsx)(o.Z,{textColor:"neutral800",children:_.stages.length})}),(0,t.jsx)(e.Td,{children:(0,t.jsx)(o.Z,{textColor:"neutral800",children:(_?.contentTypes??[]).map(as).join(", ")})}),(0,t.jsx)(e.Td,{children:(0,t.jsxs)(d.k,{alignItems:"center",justifyContent:"end",children:[(0,t.jsx)(Y,{to:`/settings/review-workflows/${_.id}`,"aria-label":n({id:"Settings.review-workflows.list.page.list.column.actions.edit.label",defaultMessage:"Edit {name}"},{name:_.name}),children:(0,t.jsx)(R.Z,{})}),Z.length>1&&_s&&(0,t.jsx)(T.h,{"aria-label":n({id:"Settings.review-workflows.list.page.list.column.actions.delete.label",defaultMessage:"Delete {name}"},{name:"Default workflow"}),icon:(0,t.jsx)(I.Z,{}),noBorder:!0,onClick:()=>{rs(String(_.id))}})]})})))})]}),(0,t.jsx)(r.QH,{bodyText:{id:"Settings.review-workflows.list.page.delete.confirm.body",defaultMessage:"If you remove this worfklow, all stage-related information will be removed for this content-type. Are you sure you want to remove it?"},isConfirmButtonLoading:ts,isOpen:!!x,onToggleDialog:is,onConfirm:ls}),(0,t.jsxs)(j.L.Root,{isOpen:X,onClose:()=>B(!1),children:[(0,t.jsx)(j.L.Title,{children:n({id:"Settings.review-workflows.list.page.workflows.limit.title",defaultMessage:"You\u2019ve reached the limit of workflows in your plan"})}),(0,t.jsx)(j.L.Body,{children:n({id:"Settings.review-workflows.list.page.workflows.limit.body",defaultMessage:"Delete a workflow or contact Sales to enable more workflows."})})]})]})]})},J=()=>{const n=(0,i.j)(W=>W.admin_app.permissions.settings?.["review-workflows"]?.main);return(0,t.jsx)(r.O4,{permissions:n,children:(0,t.jsx)(k,{})})}},25788:(h,M,s)=>{s.d(M,{u:()=>m});var t=s(27279),l=s(87006),d=s(6606);const P=d.m.injectEndpoints({endpoints:a=>({getComponents:a.query({query:()=>({url:"/content-manager/components",method:"GET"}),transformResponse:e=>e.data}),getContentTypes:a.query({query:()=>({url:"/content-manager/content-types",method:"GET"}),transformResponse:e=>e.data})}),overrideExisting:!1}),{useGetComponentsQuery:O,useGetContentTypesQuery:g}=P;function m(){const{_unstableFormatAPIError:a}=(0,l.So)(),e=(0,l.lm)(),o=O(),E=g();t.useEffect(()=>{E.error&&e({type:"warning",message:a(E.error)})},[E.error,a,e]),t.useEffect(()=>{o.error&&e({type:"warning",message:a(o.error)})},[o.error,a,e]);const c=o.isLoading||E.isLoading,T=t.useMemo(()=>(E?.data??[]).filter(D=>D.kind==="collectionType"&&D.isDisplayed),[E?.data]),r=t.useMemo(()=>(E?.data??[]).filter(D=>D.kind!=="collectionType"&&D.isDisplayed),[E?.data]);return{isLoading:c,components:t.useMemo(()=>o?.data??[],[o?.data]),collectionTypes:T,singleTypes:r}}},38684:(h,M,s)=>{s.d(M,{u:()=>l});var t=s(28390);function l(d={}){const{id:P="",...O}=d,{data:g,isLoading:m}=(0,t.c)({id:P,populate:"stages",...O}),[a]=(0,t.d)(),[e]=(0,t.e)(),[o]=(0,t.f)(),{workflows:E,meta:c}=g??{};return{meta:c,workflows:E,isLoading:m,createWorkflow:a,updateWorkflow:e,deleteWorkflow:o}}},38566:(h,M,s)=>{s.d(M,{c:()=>e});var t=s(74081),l=s(72450),d=s(93415),P=s(84366),O=s(10701),g=s(32370);const m=(0,l.ZP)(d.x)`
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
`,a=(0,l.ZP)(d.x)`
  border-radius: 0 0 ${({theme:o})=>o.borderRadius} ${({theme:o})=>o.borderRadius};
  display: block;
  width: 100%;
  border: none;
`,e=({children:o,icon:E,...c})=>(0,t.jsxs)("div",{children:[(0,t.jsx)(P.i,{}),(0,t.jsx)(a,{as:"button",background:"primary100",padding:5,...c,children:(0,t.jsxs)(O.k,{children:[(0,t.jsx)(m,{"aria-hidden":!0,background:"primary200",children:E}),(0,t.jsx)(d.x,{paddingLeft:3,children:(0,t.jsx)(g.Z,{variant:"pi",fontWeight:"bold",textColor:"primary600",children:o})})]})})]})}}]);
