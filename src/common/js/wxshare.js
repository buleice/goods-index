
const axios =require('axios');
axios.defaults.withCredentials=true;
const wxShare = function (shareData) {
    let WXSHDATA = {
        title: shareData.FshareTitle,
        link:`${window.location.href.split("?")[0]}?id=${shareData.buyingId}&shareKey=${shareData.myShareKey}`,
        imgUrl: shareData.FshareIcon,
        type: "link",
        dataUrl: "",
        desc: shareData.FshareContent,
        success: function() {
            console.log('分享成功')
        },
        cancel: function() {
            console.log('取消分享')
        }
    };
    // let u = window.navigator.userAgent;
    // let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    // let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    // //安卓需要使用当前URL进行微信API注册（即当场调用location.href.split('#')[0]）
    // //iOS需要使用进入页面的初始URL进行注册，（即在任何pushstate发生前，调用location.href.split('#')[0]）
    // let url = '';
    // if (isiOS) {
    //     url = encodeURIComponent(`http://www.qq.com/home/index?op=${window.sessionStorage.getItem('option')}`);//获取初始化的url相关参数
    // } else {
    //     url = encodeURIComponent(window.location.href.split('#')[0]);
    // }
    //
    // let time = Math.round(new Date().getTime() / 1000); //获取10位时间戳
    // // alert(window.location.href.split('#')[0]);

    axios({
        url: `/weixin/config`,
        method: 'post',
        data: {
            url:window.location.href
        },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (response) {
        if (response.status === 200) {
            let data=response.data;
            window.wx.config({
                debug: false,
                appId: data.appId,
                timestamp: data.timestamp,
                nonceStr: data.nonceStr,
                signature: data.signature,
                jsApiList:[
                    'onMenuShareTimeline',
                    'onMenuShareQQ',
                    'onMenuShareAppMessage'
                ]
            });
            window.wx.error(function(res) {
                console.log('微信：', JSON.stringify(res));
            });
            window.wx.ready(function() {
                window.wx.onMenuShareAppMessage(WXSHDATA);
                window.wx.onMenuShareTimeline(WXSHDATA); //朋友圈
            });
        }
    }).catch(function (errors) {
        console.log('errors', errors);
    });
};
