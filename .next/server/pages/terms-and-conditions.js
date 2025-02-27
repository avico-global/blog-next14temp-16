"use strict";(()=>{var e={};e.id=978,e.ids=[978],e.modules={7989:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.r(t),a.d(t,{config:()=>x,default:()=>d,getServerSideProps:()=>h,getStaticPaths:()=>m,getStaticProps:()=>u,reportWebVitals:()=>g,routeModule:()=>w,unstable_getServerProps:()=>y,unstable_getServerSideProps:()=>j,unstable_getStaticParams:()=>v,unstable_getStaticPaths:()=>f,unstable_getStaticProps:()=>b});var l=a(7093),s=a(5244),i=a(1323),n=a(5949),o=a(3414),p=a(2403),c=e([p]);p=(c.then?(await c)():c)[0];let d=(0,i.l)(p,"default"),u=(0,i.l)(p,"getStaticProps"),m=(0,i.l)(p,"getStaticPaths"),h=(0,i.l)(p,"getServerSideProps"),x=(0,i.l)(p,"config"),g=(0,i.l)(p,"reportWebVitals"),b=(0,i.l)(p,"unstable_getStaticProps"),f=(0,i.l)(p,"unstable_getStaticPaths"),v=(0,i.l)(p,"unstable_getStaticParams"),y=(0,i.l)(p,"unstable_getServerProps"),j=(0,i.l)(p,"unstable_getServerSideProps"),w=new l.PagesRouteModule({definition:{kind:s.x.PAGES,page:"/terms-and-conditions",pathname:"/terms-and-conditions",bundlePath:"",filename:""},components:{App:o.default,Document:n.default},userland:p});r()}catch(e){r(e)}})},8472:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.d(t,{Z:()=>c});var l=a(997),s=a(4819),i=a(4611),n=a(1664),o=a.n(n);a(6689);var p=e([s]);function c({breadcrumbs:e,className:t}){return l.jsx("div",{className:(0,s.cn)("w-full flex items-center py-2 font-semibold text-gray-500",t),children:e.map((t,a)=>(0,l.jsxs)("span",{className:"flex items-center gap-2",children:[a>0&&l.jsx(i.Z,{className:"w-4"}),a===e.length-1?l.jsx("span",{className:"text-black",children:t.label?.replaceAll("%20"," ")?.replaceAll("%E2%80%99","'")}):l.jsx(o(),{title:t.label?.replaceAll(" ","-")?.replaceAll("%20","-")?.replaceAll("%E2%80%99","'"),href:t.url,className:"hover:underline transition-all",children:t.label?.replaceAll("%20"," ")?.replaceAll("%E2%80%99","'")})]},a))})}s=(p.then?(await p)():p)[0],r()}catch(e){r(e)}})},9172:(e,t,a)=>{a.d(t,{Z:()=>s});var r=a(1163),l=a(6689);let s=()=>{let e=(0,r.useRouter)(),t=(0,l.useMemo)(()=>e.asPath.split("?")[0].split("/").filter(e=>e),[e.asPath]);return[{label:"Home",url:"/"},...(0,l.useMemo)(()=>t.map((e,a)=>{let r=`/${t.slice(0,a+1).join("/")}`,l=e.replace(/[-_]/g," ");return{label:l.charAt(0).toUpperCase()+l.slice(1),url:r}}),[t])]}},4611:(e,t,a)=>{a.d(t,{Z:()=>r});/**
 * @license lucide-react v0.368.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,a(9648).Z)("ChevronsRight",[["path",{d:"m6 17 5-5-5-5",key:"xnjwq"}],["path",{d:"m13 17 5-5-5-5",key:"17xmmf"}]])},2403:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.r(t),a.d(t,{default:()=>v,getServerSideProps:()=>y});var l=a(997);a(6689);var s=a(3475),i=a(9911),n=a(135),o=a(4496),p=a(1481),c=a(577),d=a(9172),u=a(8472),m=a(8515),h=a(968),x=a.n(h),g=a(1550),b=a(1163),f=e([s,i,n,o,c,u]);function v({contact_details:e,footer_type:t,imagePath:a,nav_type:r,favicon:m,domain:h,terms:f,logo:v,meta:y,page:j,categories:w,blog_list:_,about_me:S,logo_white:P}){let Z=new c.default,M=Z?.render(f||""),q=(0,d.Z)();return(0,b.useRouter)().pathname,j?.enable&&(0,l.jsxs)("div",{children:[(0,l.jsxs)(x(),{children:[l.jsx("meta",{charSet:"UTF-8"}),l.jsx("title",{children:y?.title}),l.jsx("meta",{name:"description",content:y?.description}),l.jsx("link",{rel:"author",href:`https://www.${h}`}),l.jsx("link",{rel:"publisher",href:`https://www.${h}`}),l.jsx("link",{rel:"canonical",href:`https://www.${h}/terms-and-conditions`}),l.jsx("meta",{name:"theme-color",content:"#008DE5"}),l.jsx("link",{rel:"manifest",href:"/manifest.json"}),l.jsx("meta",{httpEquiv:"X-UA-Compatible",content:"IE=edge"}),l.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),l.jsx(p.Z,{}),l.jsx("meta",{name:"google-site-verification",content:"zbriSQArMtpCR3s5simGqO5aZTDqEZZi9qwinSrsRPk"}),l.jsx("link",{rel:"apple-touch-icon",sizes:"180x180",href:`https://api.sitebuilderz.com/images/${a}/${m}`}),l.jsx("link",{rel:"icon",type:"image/png",sizes:"32x32",href:`https://api.sitebuilderz.com/images/${a}/${m}`}),l.jsx("link",{rel:"icon",type:"image/png",sizes:"16x16",href:`https://api.sitebuilderz.com/images/${a}/${m}`})]}),l.jsx(n.Z,{logo:v,nav_type:r,imagePath:a,blog_list:_,categories:w,contact_details:e}),l.jsx(i.Z,{children:l.jsx(s.Z,{children:l.jsx(u.Z,{breadcrumbs:q,className:"py-7"})})}),l.jsx(i.Z,{children:l.jsx(s.Z,{children:l.jsx("div",{className:"prose max-w-full w-full mb-5",dangerouslySetInnerHTML:{__html:M}})})}),l.jsx(i.Z,{children:l.jsx(o.Z,{logo:P,about_me:S?.value?{...S,value:S.value.split(" ").slice(0,55).join(" ")+"..."}:S,imagePath:a,blog_list:_,categories:w,footer_type:t})}),l.jsx(g.Z,{data:{"@context":"https://schema.org","@graph":[{"@type":"WebPage","@id":`https://${h}/terms-and-conditions`,url:`https://${h}/terms-and-conditions`,name:y?.title,description:y?.description,inLanguage:"en-US",publisher:{"@type":"Organization","@id":`https://${h}`}},{"@type":"BreadcrumbList",itemListElement:q.map((e,t)=>({"@type":"ListItem",position:t+1,name:e.label,item:`https://${h}${e.url}`}))}]}})]})}async function y({req:e}){let t=(0,m.ge)(e?.headers?.host),a=await (0,m.MV)({domain:t,type:"layout"}),r=await (0,m.MV)({domain:t,type:"meta_terms"}),l=await (0,m.MV)({domain:t,type:"logo"}),s=await (0,m.MV)({domain:t,type:"logo_white"}),i=await (0,m.MV)({domain:t,type:"favicon"}),n=await (0,m.MV)({domain:t,type:"blog_list"}),o=await (0,m.MV)({domain:t,type:"categories"}),p=await (0,m.MV)({domain:t,type:"about_me"}),c=await (0,m.MV)({domain:t,type:"contact_details"}),d=await (0,m.MV)({domain:t,type:"terms"}),u=await (0,m.MV)({domain:t,type:"nav_type"}),h=await (0,m.MV)({domain:t,type:"footer_type"}),x=null;if(Array.isArray(a?.data)&&a.data.length>0){let e=a.data[0].value;x=e?.find(e=>"terms"===e.page)}if(!x?.enable)return{notFound:!0};let g=l?.data[0]?.project_id||null,b=null;return b=await (0,m.al)(g,t),{props:{page:x,domain:t,imagePath:b,logo:l?.data[0]||null,logo_white:s?.data[0]||null,about_me:p?.data[0]||null,favicon:i?.data[0]?.file_name||null,blog_list:n?.data[0]?.value||[],categories:o?.data[0]?.value||null,meta:r?.data[0]?.value||null,contact_details:c?.data[0]?.value||null,terms:d?.data[0]?.value||"",nav_type:u?.data[0]?.value||{},footer_type:h?.data[0]?.value||{}}}}[s,i,n,o,c,u]=f.then?(await f)():f,r()}catch(e){r(e)}})},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},968:e=>{e.exports=require("next/head")},6689:e=>{e.exports=require("react")},6405:e=>{e.exports=require("react-dom")},997:e=>{e.exports=require("react/jsx-runtime")},9816:e=>{e.exports=require("styled-jsx/style")},6593:e=>{e.exports=import("clsx")},577:e=>{e.exports=import("markdown-it")},2017:e=>{e.exports=import("react-share")},8097:e=>{e.exports=import("tailwind-merge")},7147:e=>{e.exports=require("fs")},1017:e=>{e.exports=require("path")},2781:e=>{e.exports=require("stream")},9796:e=>{e.exports=require("zlib")}};var t=require("../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),r=t.X(0,[859,474,677,129],()=>a(7989));module.exports=r})();