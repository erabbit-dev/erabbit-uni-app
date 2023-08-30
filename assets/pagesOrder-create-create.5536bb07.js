import{d as s,g as e,k as a,q as l,l as t,o as u,h as r,a as d,w as o,u as c,c as n,b as i,t as p,F as f,r as m,s as v,n as _,B as y,a2 as g,f as b,e as x,j as k,V as I,I as h,S as j,i as w}from"./index-5ec5936b.js";import{g as F,a as P,b as T,p as V}from"./order.12210c51.js";import{u as A}from"./address.51506994.js";import{_ as C}from"./_plugin-vue_export-helper.1b428a4d.js";import"./http.232d223e.js";const M=C(s({__name:"create",props:{skuId:null,count:null,orderId:null},setup(s){const C=s,{safeAreaInsets:M}=e(),B=a(""),$=a([{type:1,text:"时间不限 (周一至周日)"},{type:2,text:"工作日送 (周一至周五)"},{type:3,text:"周末配送 (周六至周日)"}]),q=a(0),D=l((()=>$.value[q.value])),L=s=>{q.value=s.detail.value},O=a();t((()=>{(async()=>{if(C.count&&C.skuId){const s=await F({count:C.count,skuId:C.skuId});O.value=s.result}else if(C.orderId){const s=await P(C.orderId);O.value=s.result}else{const s=await T();O.value=s.result}})()}));const S=A(),U=l((()=>{var s;return S.selectedAddress||(null==(s=O.value)?void 0:s.userAddresses.find((s=>s.isDefault)))})),z=async()=>{var s,e;if(!(null==(s=U.value)?void 0:s.id))return y({icon:"none",title:"请选择收货地址"});const a=await V({addressId:null==(e=U.value)?void 0:e.id,buyerMessage:B.value,deliveryTimeType:D.value.type,goods:O.value.goods.map((s=>({count:s.count,skuId:s.skuId}))),payChannel:2,payType:1});g({url:`/pagesOrder/detail/detail?id=${a.result.id}`})};return(s,e)=>{var a;const l=b,t=x,y=k,g=w,F=I,P=h,T=j;return u(),r(f,null,[d(T,{"enable-back-to-top":"","scroll-y":"",class:"viewport"},{default:o((()=>[c(U)?(u(),n(y,{key:0,class:"shipment","hover-class":"none",url:"/pagesMember/address/address?from=order"},{default:o((()=>[d(l,{class:"user"},{default:o((()=>[i(p(c(U).receiver)+" "+p(c(U).contact),1)])),_:1}),d(l,{class:"address"},{default:o((()=>[i(p(c(U).fullLocation)+" "+p(c(U).address),1)])),_:1}),d(t,{class:"icon icon-right"})])),_:1})):(u(),n(y,{key:1,class:"shipment","hover-class":"none",url:"/pagesMember/address/address?from=order"},{default:o((()=>[d(l,{class:"address"},{default:o((()=>[i(" 请选择收货地址 ")])),_:1}),d(t,{class:"icon icon-right"})])),_:1})),d(l,{class:"goods"},{default:o((()=>{var s;return[(u(!0),r(f,null,m(null==(s=O.value)?void 0:s.goods,(s=>(u(),n(y,{key:s.skuId,url:`/pages/goods/goods?id=${s.id}`,class:"item","hover-class":"none"},{default:o((()=>[d(g,{class:"picture",src:s.picture},null,8,["src"]),d(l,{class:"meta"},{default:o((()=>[d(l,{class:"name ellipsis"},{default:o((()=>[i(p(s.name),1)])),_:2},1024),d(l,{class:"attrs"},{default:o((()=>[i(p(s.attrsText),1)])),_:2},1024),d(l,{class:"prices"},{default:o((()=>[d(l,{class:"pay-price symbol"},{default:o((()=>[i(p(s.payPrice),1)])),_:2},1024),d(l,{class:"price symbol"},{default:o((()=>[i(p(s.price),1)])),_:2},1024)])),_:2},1024),d(l,{class:"count"},{default:o((()=>[i("x"+p(s.count),1)])),_:2},1024)])),_:2},1024)])),_:2},1032,["url"])))),128))]})),_:1}),d(l,{class:"related"},{default:o((()=>[d(l,{class:"item"},{default:o((()=>[d(t,{class:"text"},{default:o((()=>[i("配送时间")])),_:1}),d(F,{range:$.value,"range-key":"text",onChange:L},{default:o((()=>[d(l,{class:"icon-fonts picker"},{default:o((()=>[i(p(c(D).text),1)])),_:1})])),_:1},8,["range"])])),_:1}),d(l,{class:"item"},{default:o((()=>[d(t,{class:"text"},{default:o((()=>[i("订单备注")])),_:1}),d(P,{class:"input","cursor-spacing":30,placeholder:"选题，建议留言前先与商家沟通确认",modelValue:B.value,"onUpdate:modelValue":e[0]||(e[0]=s=>B.value=s)},null,8,["modelValue"])])),_:1})])),_:1}),d(l,{class:"settlement"},{default:o((()=>[d(l,{class:"item"},{default:o((()=>[d(t,{class:"text"},{default:o((()=>[i("商品总价: ")])),_:1}),d(t,{class:"number symbol"},{default:o((()=>{var s;return[i(p(null==(s=O.value)?void 0:s.summary.totalPrice.toFixed(2)),1)]})),_:1})])),_:1}),d(l,{class:"item"},{default:o((()=>[d(t,{class:"text"},{default:o((()=>[i("运费: ")])),_:1}),d(t,{class:"number symbol"},{default:o((()=>{var s;return[i(p(null==(s=O.value)?void 0:s.summary.postFee.toFixed(2)),1)]})),_:1})])),_:1})])),_:1})])),_:1}),d(l,{class:"toolbar",style:_({paddingBottom:(null==(a=c(M))?void 0:a.bottom)+"px"})},{default:o((()=>{var s;return[d(l,{class:"total-pay symbol"},{default:o((()=>[d(t,{class:"number"},{default:o((()=>{var s;return[i(p(null==(s=O.value)?void 0:s.summary.totalPayPrice.toFixed(2)),1)]})),_:1})])),_:1}),d(l,{class:v(["button",{disabled:!(null==(s=c(U))?void 0:s.id)}]),onClick:z},{default:o((()=>[i(" 提交订单 ")])),_:1},8,["class"])]})),_:1},8,["style"])],64)}}}),[["__scopeId","data-v-4a9d219c"]]);export{M as default};
