import{d as a,k as s,o as e,c as t,w as l,a as o,b as u,y as n,B as c,G as i,i as d,f as p,I as r,D as m,e as _}from"./index-5ec5936b.js";import{h as f}from"./http.232d223e.js";import{_ as h}from"./_plugin-vue_export-helper.1b428a4d.js";const v=h(a({__name:"login",setup(a){const h=async()=>{const a=await(s="13123456789",f({method:"POST",url:"/login/wxMin/simple",data:{phoneNumber:s}}));var s;v(a.result)},v=a=>{n().setProfile(a),c({icon:"success",title:"登录成功"}),setTimeout((()=>{i()}),500)},g=s({account:"13123456789",password:""}),w=async()=>{const a=await(s=g.value,f({method:"POST",url:"/login",data:s}));var s;v(a.result)};return(a,s)=>{const n=d,c=p,i=r,f=m,v=_;return e(),t(c,{class:"viewport"},{default:l((()=>[o(c,{class:"logo"},{default:l((()=>[o(n,{src:"https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/logo_icon.png"})])),_:1}),o(c,{class:"login"},{default:l((()=>[o(i,{modelValue:g.value.account,"onUpdate:modelValue":s[0]||(s[0]=a=>g.value.account=a),class:"input",type:"text",placeholder:"请输入用户名/手机号码"},null,8,["modelValue"]),o(i,{modelValue:g.value.password,"onUpdate:modelValue":s[1]||(s[1]=a=>g.value.password=a),class:"input",type:"text",password:"",placeholder:"请输入密码"},null,8,["modelValue"]),o(f,{onClick:w,class:"button phone"},{default:l((()=>[u("登录")])),_:1}),o(c,{class:"extra"},{default:l((()=>[o(c,{class:"caption"},{default:l((()=>[o(v,null,{default:l((()=>[u("其他登录方式")])),_:1})])),_:1}),o(c,{class:"options"},{default:l((()=>[o(f,{onClick:h},{default:l((()=>[o(v,{class:"icon icon-phone"},{default:l((()=>[u("模拟快捷登录")])),_:1})])),_:1})])),_:1})])),_:1}),o(c,{class:"tips"},{default:l((()=>[u("登录/注册即视为你同意《服务条款》和《小兔鲜儿隐私协议》")])),_:1})])),_:1})])),_:1})}}}),[["__scopeId","data-v-8d641295"]]);export{v as default};
