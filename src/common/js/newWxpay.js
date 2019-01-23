import {axiosPost} from "./axiosData";

const newWxpay = {
    async join(url, data) {
        let params = await
            getPayParams(url, Object.assign({}, data, {isFounder: 0, urltag: 'wxyx_groupbuying'}))
        return Pay(params.data,{needAddress: params.needAddress,bid:params.bid});
    },
    async found(url, data) {
        let params = await
            getPayParams(url, Object.assign({}, data, {isFounder: 1, urltag: 'wxyx_groupbuying_1'}));
        return Pay(params.data,{needAddress: params.needAddress,bid:params.bid});
    },
    async justPay(url, data) {
        let params = await
            getPayParams(url, Object.assign({}, data, {issingle: 1, urltag: 'wxyx_groupbuying_single'}))
        return Pay(params.data,{needAddress: params.needAddress,bid:params.bid});
    }
}
const xblPay = {
    freeJoin(url, data) {
        return new Promise((resolve, reject) => {
            axiosPost(url, Object.assign({}, data, {isFounder: 0})).then(response => {
                if (response.status === 200) {
                    resolve(response.data);
                }
            }).catch(function (errors) {
                reject(errors)
            });
        })
    },
    freeFound(url, data) {
        return new Promise((resolve, reject) => {
            axiosPost(url, Object.assign({}, data, {isFounder: 1})).then(response => {
                if (response.status === 200) {
                    resolve(response.data);
                }
            }).catch(function (errors) {
                reject(errors)
            });
        })
    },
    bonusPay(url, data) {
        return new Promise((resolve, reject) => {
            axiosPost(url, data).then(response => {
                if (response.status === 200) {
                    resolve(response.data);
                }
            }).catch(function (errors) {
                reject(errors)
            });
        })
    }
};
const getPayParams = function (url, data) {
    return new Promise((resolve, reject) => {
        axiosPost(url, data).then(response => {
            if (response.data.rc == 0) {
                resolve(response.data);
            }
        }).catch(function (errors) {
            window.alert("支付失败")
            reject(errors);
        });
    });
};
const Pay = (payJson,other) => {
    return new Promise((resolve, reject) => {
        window.wx.chooseWXPay({
            timestamp: payJson.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
            nonceStr: payJson.nonceStr, // 支付签名随机串，不长于 32 位
            package: payJson.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
            signType: payJson.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
            paySign: payJson.paySign, // 支付签名
            success: function () {
                resolve(other);
            },
            cancle: function () {
                resolve('cancle');
            },
            fail: function () {
                reject('fail');
            }
        });
    });
}

export {
    newWxpay,
    xblPay
}
