import {baseUrl} from "../../config/environment";
import axios from 'axios';
// // 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     return config;
// }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
// });
//
// // 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//     // 对响应数据做点什么
//     return response;
// }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
// });

if(process.env.NODE_ENV !== 'production'){
    document.cookie='auth=0e976591067bbb0df21202874c5bc7556daed39a74581bd32daedc274424a1656fc3647686aaf9ac5fdd8265491a0b70edfd8ce03bb93e76d73e931f057185f602f04f58404d72882fc5fa13dc3ef4e26161ba4206e57915'
}
const axiosPost =(url,data)=>{
  return new Promise((resolve,reject)=>{
      axios({
          url:url,
          method: 'post',
          baseURL:baseUrl,
          data: data,
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
      }).then(res=>resolve(res));
  })
}

const axiosGet=(url,data)=>{
    return new Promise((resolve,reject)=>{
        axios({
            url:baseUrl+url,
            method: 'get',
            params:data,
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
        }).then(res=>resolve(res));
    })
}

export{
 axiosPost,
 axiosGet
}
