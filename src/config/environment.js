// 配置项目请求路径
let baseUrl='';
const hostName=window.location.hostname
if(hostName==='localhost'){
    baseUrl='';
}else if(hostName==='test.wxyx.youban.com'){
    baseUrl='//test.wxyx.youban.com'
}else if(hostName==='wxyx.youban.com'){
    baseUrl='//wxyx.youban.com';
}else{
    baseUrl='';
}

export {
    baseUrl
}
