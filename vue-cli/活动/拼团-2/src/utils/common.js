// const config= {
//   "baseUrl": "https://api.abctime.com/",
//   "gzhUrl": "http://gzh.abctime.com/",
//   "sign_key":"hkf%t5SMv1HtrVS!Y%B!NPNS!!0cWgy",
//   "postConfig":{headers: {'Content-Type': 'multipart/form-data'}}
// };
const gzh_url = process.env.NODE_ENV == 'development'?'/apis/':"http://dev.gzh.abctime.com/"
const config= {
  "baseUrl": "https://dev.api.abctime.com/",
  "gzhUrl": gzh_url,
  "wechatUrl": 'http://dev.gzh.abctime.com/',
  "sign_key":"GriE93gIGp$5bDjQ4rc20FzxWGghTIau",
  "postConfig":{headers: {'Content-Type': 'multipart/form-data'}}
};
// const config= {
//   "baseUrl": "https://api.abctime.com/",
//   "gzhUrl": gzh_url,
//   "wechatUrl": "https://gzh.abctime.com/",
//   "sign_key":"hkf%t5SMv1HtrVS!Y%B!NPNS!!0cWgy",
//   "postConfig":{headers: {'Content-Type': 'multipart/form-data'}}
// };
const ua = navigator.userAgent.toLowerCase();
const VL = {
  isWechat: function () {
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
      return true;
    } else {
      return false;
    }
  },
  isIphone: function () {
    if(ua.indexOf('iphone')>=0){
      return true;
    } else {
      return false;
    }
  },
  isIpad: function () {
    if(ua.indexOf('ipad')>=0){
      return true;
    } else {
      return false;
    }
  },
  phNum: function (ph) {
    if (!(/^1[3456789]\d{9}$/.test(ph))) {
      return false
    } else {
      return true
    }
  },
  getRequest:function () {
    var url = decodeURIComponent(location.search);
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  }
}

// 判断是否在微信浏览器里
// let ua = navigator.userAgent.toLowerCase();
// function isWechat(){
//   if(ua.match(/MicroMessenger/i)=="micromessenger") {
//     return true;
//   } else {
//     return false;
//   }
// }
// function isIphone() {
//   if(ua.indexOf('iphone')>=0){
//     return true;
//   } else {
//     return false;
//   }
// }
// function isIpad() {
//   if(ua.indexOf('ipad')>=0){
//     return true;
//   } else {
//     return false;
//   }
// }

// 时间戳转日期
const timestampToTime = function (timestamp) {
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '.';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  // return Y+M+D+h+m+s;
  return Y + M + D;
}
// 获取URL参数
const GetRequest = function () {
  var url = decodeURIComponent(location.search); //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for(var i = 0; i < strs.length; i ++) {
      theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
//type: post||get
//parmas: Object
//sign_key: dev(test)||master
//post返回参数对象    get返回参数字符串
const getParam = function (type,params,sign_key) {
  sign_key = config.sign_key;
  params.act_id = 14;
  params.version = 2;
  if(GetRequest().source_id && GetRequest().source_id>0){
    params.source_id = GetRequest().source_id;
  }
  var name_arr = [],value_arr=[],p_arr=[],get_arr=[];
  if(type=='post'){
    for(var i in params) {
      name_arr.push(i);
      value_arr.push(params[i]);
      if(typeof params[i] != 'object'){
        p_arr.push(i+params[i]);
      }
    };
    var signStr = p_arr.sort().join('~').replace(/~/g,'')+sign_key;
    params.sign = SHA256(signStr);
    return params;
  }else if(type=='get')
  {
    delete params.sign;
    for(var i in params) {
      p_arr.push(i+params[i]);
      get_arr.push(i+'='+params[i]+'&');
    };
    var signStr = p_arr.sort().join('~').replace(/~/g,'')+sign_key;
    var sign = SHA256(signStr);
    var param = get_arr.sort().join('~').replace(/~/g,'')+'sign='+sign;
    return param;
  }
}
//SHA256加密
function SHA256 (s){
  var chrsz = 8;
  var hexcase = 0;
  function safe_add (x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }
  function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
  function R (X, n) { return ( X >>> n ); }
  function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
  function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
  function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
  function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
  function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
  function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
  function core_sha256 (m, l) {
    var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786, 0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA, 0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070, 0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
    var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
    var W = new Array(64);
    var a, b, c, d, e, f, g, h, i, j;
    var T1, T2;
    m[l >> 5] |= 0x80 << (24 - l % 32);
    m[((l + 64 >> 9) << 4) + 15] = l;
    for ( var i = 0; i<m.length; i+=16 ) {
      a = HASH[0];
      b = HASH[1];
      c = HASH[2];
      d = HASH[3];
      e = HASH[4];
      f = HASH[5];
      g = HASH[6];
      h = HASH[7];
      for ( var j = 0; j<64; j++) {
        if (j < 16) W[j] = m[j + i];
        else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
        T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
        T2 = safe_add(Sigma0256(a), Maj(a, b, c));
        h = g;
        g = f;
        f = e;
        e = safe_add(d, T1);
        d = c;
        c = b;
        b = a;
        a = safe_add(T1, T2);
      }
      HASH[0] = safe_add(a, HASH[0]);
      HASH[1] = safe_add(b, HASH[1]);
      HASH[2] = safe_add(c, HASH[2]);
      HASH[3] = safe_add(d, HASH[3]);
      HASH[4] = safe_add(e, HASH[4]);
      HASH[5] = safe_add(f, HASH[5]);
      HASH[6] = safe_add(g, HASH[6]);
      HASH[7] = safe_add(h, HASH[7]);
    }
    return HASH;
  }
  function str2binb (str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for(var i = 0; i < str.length * chrsz; i += chrsz) {
      bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
    }
    return bin;
  }
  function Utf8Encode(string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  }
  function binb2hex (binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for(var i = 0; i < binarray.length * 4; i++) {
      str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
        hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8 )) & 0xF);
    }
    return str;
  }
  s = Utf8Encode(s);
  return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
}
//微信分享
// 获取参数url  分享配置  是否禁止分享
const share = function (shareUrl,configObj,isHide) {
  var apiList = [];
  if(isHide == 1) {
    apiList = ['hideMenuItems']
  }else {
    apiList = ['onMenuShareTimeline','onMenuShareAppMessage','chooseWXPay','hideMenuItems'];
  }
  requestGet(shareUrl,{url:encodeURIComponent(window.location.href)},
    function(data) {
      if (data.code == 200) {
        var appid = data.data.appId;
        var noncestr = data.data.nonceStr;
        var timestamp = data.data.timestamp;
        var signature = data.data.signature;
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: appid, // 必填，公众号的唯一标识
          timestamp: timestamp, // 必填，生成签名的时间戳
          nonceStr: noncestr, // 必填，生成签名的随机串
          signature: signature,// 必填，签名
          jsApiList: apiList // 必填，需要使用的JS接口列表
        });
        wx.ready(function(){
          wx.checkJsApi({
            jsApiList: apiList,
            success: function(res) {
            }
          });
          if(isHide == 1){
            wx.hideMenuItems({
              menuList: ["menuItem:share:timeline", "menuItem:copyUrl", "menuItem:share:appMessage", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:editTag", "menuItem:delete", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:brand"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
            });
          }else{
            wx.onMenuShareTimeline({
              title: configObj.title,
              link: configObj.link,
              imgUrl: configObj.imgUrl,
              success: function () {
              }
            });
            wx.onMenuShareAppMessage({
              title: configObj.title,
              desc: configObj.desc,
              link: configObj.link,
              imgUrl: configObj.imgUrl,
              type: 'link',
              dataUrl: '',
              success: function () {
              }
            });
          }
          wx.error(function (re) {
            console.log('err',re)
          });
        });
      }
    },
    function(err) {
      console.log(err)
    }
  );
}
// 用户中心
// 发送验证码
const ucSend = function(ph,$this) {
    var sendParams = {
        data: {
            verify_type: 1,
            phone_code: '86',
            phone: ph
        },
        success: function (res) {
            if (res.errcode == 11021) {
                // 需要展示滑块
                // 滑块验证的逻辑是滑动验证通过后，SDK再次调用之前的方法，与后端交互，通过success回调返回这次操作的结果，故需要将方法名和之前的入参数据作为showSlide的参数。
                var slideParam = {
                    slideCallback: 'sendSMSCodeLogin', // 滑动验证通过时执行方法名，（即触发滑块的原方法，例如：登录（loginSms），获取验证码（sendSmsCodeLogin），校验旧手机（checkPhone））
                    slideParams: sendParams, // 前端滑动验证通过时执行方法名的参数（例如手机号，验证码,success和fail等等）
                    failCallback: function (error) {
                        console.log(error.errmsg)
                    } // 方法名出错
                }
                // 展示滑块
                TAL_UC.showSlide(slideParam)
                return
            }else if(res.errcode == 0){
                $this.showEject('发送成功');
                document.getElementById('captcha').style.display = 'none';
            }else {
                $this.showEject(res.errmsg);
                document.getElementById('captcha').style.display = 'none';
            }
        },
        fail: function (error) {
            console.log(error)
        }
    }
    TAL_UC.sendSMSCodeLogin(sendParams)
};
// 用户中心登录
// 登录
const ucLogin = function(ph,code,$this) {
    var loginParams = {
        data: {
            phone: ph,    // 地区不同手机号码规则不同
            phone_code: 86,    // 手机地区码
            sms_code: code    // 短信验证码
        },
        success: function (res) {
            if (res.errcode == 11021) {
                // 需要展示滑块
                // 滑块验证的逻辑是滑动验证通过后，SDK再次调用之前的方法，与后端交互，通过success回调返回这次操作的结果，故需要将方法名和之前的入参数据作为showSlide的参数。
                var slideParam = {
                    slideCallback: 'loginSms', // 滑动验证通过时执行方法名，（即触发滑块的原方法，例如：登录（loginSms），获取验证码（sendSmsCodeLogin），校验旧手机（checkPhone））
                    slideParams: loginParams, // 前端滑动验证通过时执行方法名的参数（例如手机号，验证码,success和fail等等）
                    failCallback: function (error) {
                        toastHtml(error.errmsg)
                    } // 方法名出错
                }
                // 展示滑块
                TAL_UC.showSlide(slideParam)
                return
            }else if(res.errcode == 0){
                $this.bindPhone(res.data.code);
                document.getElementById('captcha').style.display = 'none';
            }else {
                $this.showEject(res.errmsg);
                document.getElementById('captcha').style.display = 'none';
            }
        },
        fail: function (error) {
            console.log(error)
        }
    };
    TAL_UC.loginSms(loginParams)
}
export default{config:config,VL:VL,getParam:getParam,GetRequest:GetRequest,timestampToTime:timestampToTime,ucLogin:ucLogin,ucSend:ucSend}

