import axios from 'axios';
if(process.env.NODE_ENV !== 'production'){
    document.cookie='auth=0e976591067bbb0df21202874c5bc7556daed39a74581bd32daedc274424a1656fc3647686aaf9ac5fdd8265491a0b70edfd8ce03bb93e76d73e931f057185f602f04f58404d72882fc5fa13dc3ef4e26161ba4206e57915'
}
const axiosPost =(url,data)=>{
  return new Promise((resolve,reject)=>{

      axios({
          url: url,
          method: 'post',
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

export{
 axiosPost
}
