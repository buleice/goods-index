import {axiosGet} from "../common/js/axiosData";
export function _GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg); //search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]);
    return '';
}
export function requestPageData(){
    return new Promise((resolve, reject) => {
        axiosGet(`/purchase/index.json`,{id:_GetQueryString("id")}).then(res=>resolve(res)).catch(error=>reject(error))
    })
}

export function getMoreGroup(id,page) {
    return new Promise((resolve, reject) => {
        axiosGet(`/purchase/index.json`,{id:id,page:page}).then(res=>resolve(res)).catch(error=>reject(error))
    })
}

//进度页接口

export function GET_GROUP_PROGRESS(parmas){
    return new Promise((resolve,reject)=>{
        axiosGet(`/purchase/detail.json`,parmas).then(res=>resolve(res))
    })
}

export function GET_SUCCESS_BUY(parmas){
    return new Promise((resolve,reject)=>{
        axiosGet(`/groupbuying/success.json`,parmas).then(res=>resolve(res))
    })
}

export function GET_INVITE_JSON(parmas){
    return new Promise((resolve,reject)=>{
        axiosGet(`/purchase/detail.json`,parmas).then(res=>resolve(res))
    })
}
