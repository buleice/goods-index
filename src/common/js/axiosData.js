import axios from 'axios';

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
