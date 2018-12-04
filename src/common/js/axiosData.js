import axios from 'axios';
if(process.env.NODE_ENV !== 'production'){
    document.cookie='auth=f22df804067bbb0df21202874c5bc7556daed39a74581bd32daedc274424a1656fc364763ccbce6f4bc6813ce3b9c1d99039fe5e678206d892e697ba4eac6cb90437f71c404d72882fc5fa13dc3ef4e26161ba424a81345a'
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
