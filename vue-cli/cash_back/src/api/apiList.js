
// import api from './index'
import baseUrl from './baseUrl'
import { get, post } from './axios'
const header = {}
const header2 = {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
const header3 = {
    'Content-Type': 'application/octet-stream; charset=UTF-8',
    // "Authorization": "APPCODE 85ecb0b380984d15a9058e22d501229c"
}
export default {
  wxConfig(params) {    // 微信配置参数
    return get(baseUrl + 'v3/wechat/wechat/get-wechat', params, header)
  },
  getMemberInfo(params) {   // 获取用户信息
      return get(baseUrl + 'v3/member/passport/get-info', params, header)
  },
  bindPhone(params) {
    return post(baseUrl + 'v3/member/passport/bind-phone', params, header2)
  },
  getCashInfo(params) {   // 获取返现信息
    return get(baseUrl + 'v3/punch/cash-back/info', params, header)  
  },
  cashApply(params) {
    return post(baseUrl + 'v3/punch/cash-back/apply', params, header2)
  },
  getCashList(params) {   // 获取返现信息
    return get(baseUrl + 'v3/punch/cash-back/list', params, header)  
  },
  checkCard(params){
    return post('https://dm-51.data.aliyun.com/rest/160601/ocr/ocr_idcard.json',params,header3)  
  }
}
