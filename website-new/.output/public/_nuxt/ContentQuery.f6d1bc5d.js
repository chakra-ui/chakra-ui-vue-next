import{a as q,M as b,a6 as g,bT as S,b3 as k,a$ as C,bU as c,ak as $}from"./entry.ade65d11.js";import{u as N}from"./asyncData.69798ef4.js";const Q=q({name:"ContentQuery",props:{path:{type:String,required:!1,default:void 0},only:{type:Array,required:!1,default:void 0},without:{type:Array,required:!1,default:void 0},where:{type:Object,required:!1,default:void 0},sort:{type:Object,required:!1,default:void 0},limit:{type:Number,required:!1,default:void 0},skip:{type:Number,required:!1,default:void 0},locale:{type:String,required:!1,default:void 0},find:{type:String,required:!1,default:void 0}},async setup(a){const{path:t,only:r,without:n,where:i,sort:l,limit:o,skip:f,locale:s,find:d}=b(a),h=g(()=>{var e;return(e=t.value)==null?void 0:e.includes("/_")}),{data:y,refresh:p}=await N(`content-query-${S(a)}`,()=>{let e;return t.value?e=c(t.value):e=c(),r.value&&(e=e.only(r.value)),n.value&&(e=e.without(n.value)),i.value&&(e=e.where(i.value)),l.value&&(e=e.sort(l.value)),o.value&&(e=e.limit(o.value)),f.value&&(e=e.skip(f.value)),s.value&&(e=e.where({_locale:s.value})),d.value==="one"?e.findOne():d.value==="surround"?t.value?e.findSurround(t):(console.warn("[Content] Surround queries requires `path` prop to be set."),console.warn("[Content] Query without `path` will return regular `find()` results."),e.find()):e.find()});return k(()=>a,()=>p(),{deep:!0}),{isPartial:h,data:y,refresh:p}},render(a){var v;const t=C(),{data:r,refresh:n,isPartial:i,path:l,only:o,without:f,where:s,sort:d,limit:h,skip:y,locale:p,find:e}=a,u={path:l,only:o,without:f,where:s,sort:d,limit:h,skip:y,locale:p,find:e};if(u.find==="one"){if(!r&&(t==null?void 0:t["not-found"]))return t["not-found"]({props:u,...this.$attrs});if((t==null?void 0:t.empty)&&(r==null?void 0:r._type)==="markdown"&&!((v=r==null?void 0:r.body)!=null&&v.children.length))return t.empty({props:u,...this.$attrs})}else if((!r||!r.length)&&t!=null&&t["not-found"])return t["not-found"]({props:u,...this.$attrs});return t!=null&&t.default?t.default({data:r,refresh:n,isPartial:i,props:u,...this.$attrs}):((m,w)=>$("pre",null,JSON.stringify({message:"You should use slots with <ContentQuery>!",slot:m,data:w},null,2)))("default",{data:r,props:u,isPartial:i})}});export{Q as default};
