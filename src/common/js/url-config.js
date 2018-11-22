let ROOT,debug;
//由于封装的axios请求中，会将ROOT打包进去，为了方便之后不再更改，判断了当前环境，而生成的不同的ROOT
if (process.env.NODE_ENV === 'development') {
    //开发环境下的代理地址，解决本地跨域跨域，配置在config目录下的index.js dev.proxyTable中
    document.cookie="auth=2e1dcd57067bbb0df21202874c5bc7556daed39a74581bd32daedc274424a1656fc364768e235c188666301247c200ce5aa9c38b0f8db84f1e622ba63705ef5a9ac86751404d72882fc5fa13dc3ef4e26161ba42af9c5f3d"
    ROOT = ""
} else {
    //生产环境下的地址
    ROOT = '';
    debug=''
}
exports.ROOT = ROOT;
