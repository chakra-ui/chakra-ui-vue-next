import{u as a,b3 as d,bR as g,at as w,a as b,a$ as v,bS as C,ak as s}from"./entry.ade65d11.js";import{u as D}from"./composables.d6c80fe2.js";import S from"./ContentRenderer.c1d44847.js";import _ from"./ContentQuery.f6d1bc5d.js";import"./ContentRendererMarkdown.a42af187.js";import"./index.68c44503.js";import"./asyncData.69798ef4.js";const h=(u,e=g())=>{const c=a(u);d(()=>a(u),(o=c)=>{if(!e.path||!o)return;const t=Object.assign({},(o==null?void 0:o.head)||{}),p=t.title||(o==null?void 0:o.title);p&&(t.title=p),t.meta=[...t.meta||[]];const f=(t==null?void 0:t.description)||(o==null?void 0:o.description);f&&t.meta.filter(n=>n.name==="description").length===0&&t.meta.push({name:"description",content:f});const r=(t==null?void 0:t.image)||(o==null?void 0:o.image);if(r&&t.meta.filter(n=>n.property==="og:image").length===0&&(typeof r=="string"&&t.meta.push({property:"og:image",content:r}),typeof r=="object")){const n=["src","secure_url","type","width","height","alt"];for(const i of n)i==="src"&&r.src?t.meta.push({property:"og:image",content:r[i]}):r[i]&&t.meta.push({property:`og:image:${i}`,content:r[i]})}w(()=>D(t))},{immediate:!0})},B=b({name:"ContentDoc",props:{tag:{type:String,required:!1,default:"div"},excerpt:{type:Boolean,default:!1},path:{type:String,required:!1,default:void 0},query:{type:Object,required:!1,default:void 0},head:{type:Boolean,required:!1,default:!0}},render(u){const e=v(),{tag:c,excerpt:m,path:o,query:t,head:p}=u,f={...t||{},path:o||(t==null?void 0:t.path)||C(g().path),find:"one"},r=(n,i)=>s("pre",null,JSON.stringify({message:"You should use slots with <ContentDoc>",slot:n,data:i},null,2));return s(_,f,{default:e!=null&&e.default?({data:n,refresh:i,isPartial:y})=>{var l;return p&&h(n),(l=e.default)==null?void 0:l.call(e,{doc:n,refresh:i,isPartial:y,excerpt:m,...this.$attrs})}:({data:n})=>(p&&h(n),s(S,{value:n,excerpt:m,tag:c,...this.$attrs},{empty:i=>e!=null&&e.empty?e.empty(i):r("default",n)})),empty:n=>{var i;return((i=e==null?void 0:e.empty)==null?void 0:i.call(e,n))||s("p",null,"Document is empty, overwrite this content with #empty slot in <ContentDoc>.")},"not-found":n=>{var i;return((i=e==null?void 0:e["not-found"])==null?void 0:i.call(e,n))||s("p",null,"Document not found, overwrite this content with #not-found slot in <ContentDoc>.")}})}});export{B as default};
