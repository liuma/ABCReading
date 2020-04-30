import axios from 'axios'
// import QS from 'querystring'

// 创建 axios 实例
let service = axios.create({
  headers: {'Content-Type': 'application/json'},
  timeout: 60000
})

// 设置 post、put 默认 Content-Type
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
service.defaults.headers.put['Content-Type'] = 'application/json'

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    if (config.method === 'post' && config.url === 'https://dm-51.data.aliyun.com/rest/160601/ocr/ocr_idcard.json') {
        config.headers.Authorization = 'APPCODE 85ecb0b380984d15a9058e22d501229c'
        console.log(config)
    }
    if (config.method === 'put') {
      // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
      config.data = JSON.stringify(config.data)
    }
    // 请求发送前进行处理
    return config
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    let { data } = response
    return data
  },
  (error) => {
    let info = {},
      { status, statusText, data } = error.response

    if (!error.response) {
      info = {
        code: 5000,
        msg: 'Network Error'
      }
    } else {
      // 此处整理错误信息格式
      info = {
        code: status,
        data: data,
        msg: statusText
      }
    }
    console.log(info)
  }
)

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
// export default function() {
//   return service
// }
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params, headers) {
    console.log('postHeaders',headers)
    return new Promise((resolve, reject) => {
        service.post(url, params,{headers: headers})
        .then(res => {
            resolve(res);
        })
        .catch(err =>{
            reject(err.data)
        })
    });
}
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        service.get(url, {            
            params: params        
        }).then(res => {
            resolve(res);
        }).catch(err =>{
            reject(err.data)        
    })    
});}
