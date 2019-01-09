import {axiosPost} from "./axiosData";
let needAddress=0;
const wxPays= {
    join(url, data) {
        wxPay(url, Object.assign({}, data, {isFounder: 0,urltag:'wxyx_groupbuying'}));
    },
    found(url, data){
        wxPay(url, Object.assign({}, data, {isFounder: 1}))
    },
    freeJoin(url, data){
        axiosPost(url, Object.assign({}, data, {isFounder: 0})).then(response => {
            if (response.status === 200) {
                setTimeout(function() {
                    window.location.reload()
                    // window.location.href = "/purchase/detail?buyingid=" + buyingid + "&groupid=" + data.groupid
                }, 300);
            }
        }).catch(function (errors) {
            console.log('errors', errors);
        });
    },
    freeFound(url,data){
        axiosPost(url, Object.assign({}, data, {isFounder: 1})).then(response => {
            if (response.status === 200) {
                setTimeout(function() {
                    // window.location.href = "/purchase/detail?buyingid=" + buyingid + "&groupid=" + groupid;
                    window.location.reload()
                }, 300);
            }
        }).catch(function (errors) {
            console.log('errors', errors);
        });
    },
    justPay(url,data){
        wxPay(url, Object.assign({}, data, {issingle: 1,urltag:'wxyx_groupbuying_single'}));
    },
    bonusPay(url,data){
        axiosPost(url, data).then(response => {
            if (response.status === 200) {
                setTimeout(function() {
                    window.location.reload()
                }, 300);
            }
        }).catch(function (errors) {
            console.log('errors', errors);
        });
    }
}

const wxPay=function (url,data) {
    axiosPost(url,data).then(response=>{
        if(response.status===200){
            needAddress=response.needAddress;
            Pay(response.data.data);
        }
    }).catch(function (errors) {
        console.log('errors', errors);
    });

}

const Pay = function(params) {
    if (typeof window.WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', function () { onBridgeReady(params) }, false)
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', function () { onBridgeReady(params) })
            document.attachEvent('onWeixinJSBridgeReady', function () { onBridgeReady(params) })
        }
    } else {
        onBridgeReady(params)
    }
}

const onBridgeReady=function (params) {
    window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest', params,
        function(res) {
            if (res.err_msg === "get_brand_wcpay_request:ok") {
                if(needAddress===0){
                    window.location.reload()
                }else{
                    setTimeout(()=>{window.location.href=`/address/index?#/orderpage?id=${_GetQueryString('id')}`},300)
                }
            } else {
                alert("支付失败");
            }
        }
    );
}
const _GetQueryString=(name)=> {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]);
    return '';
}

export {
    wxPays
}
