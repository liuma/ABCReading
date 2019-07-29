"use strict";

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

webpackJsonp([1], { "/Nbn": function Nbn(t, e) {}, "/xJ6": function xJ6(t, e) {}, "4/nv": function nv(t, e, i) {
    t.exports = i.p + "static/img/index_con3_1.d1f29ef.png";
  }, "6p7K": function p7K(t, e) {}, "8pIE": function pIE(t, e, i) {
    t.exports = i.p + "static/img/index_qa2.e0dbd99.png";
  }, ABZv: function ABZv(t, e) {}, "F6w+": function F6w(t, e) {}, FyGf: function FyGf(t, e, i) {
    t.exports = i.p + "static/img/index_con2.a8d3f7b.png";
  }, GNMY: function GNMY(t, e) {}, JlDL: function JlDL(t, e) {}, MKAf: function MKAf(t, e) {}, NHnr: function NHnr(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var s = i("7+uW"),
        a = i("mtWM"),
        n = i.n(a),
        o = { name: "App", data: function data() {
        return { isRouterAlive: !0 };
      }, created: function created() {
        this.wxConfig();
      }, methods: { wxConfig: function wxConfig() {
          var t = encodeURIComponent(window.location.href),
              e = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat",
              i = localStorage.getItem("monthCardCollageMemberid"),
              s = this.$common.getParam("get", { url: t, member_id: i });this.$axios.post(e + "?" + s).then(function (t) {
            if (200 == t.data.code) {
              var e = t.data.data;wx.config({ debug: !1, appId: e.appId, timestamp: e.timestamp, nonceStr: e.nonceStr, signature: e.signature, jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "chooseWXPay", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd"] }), wx.ready(function () {
                wx.checkJsApi({ jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "chooseWXPay", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd"], success: function success(t) {} });
              });
            }
          });
        } } },
        r = { render: function render() {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { attrs: { id: "app" } }, [e("router-view")], 1);
      }, staticRenderFns: [] };var c = i("VU/8")(o, r, !1, function (t) {
      i("rKkn");
    }, null, null).exports,
        d = i("/ocq"),
        l = { name: "eject", data: function data() {
        return { showStatus: this.showState };
      }, props: ["message", "showState"], methods: { hideEject: function hideEject() {
          this.showStatus = !1, this.$parent.initEject();
        } }, watch: { showState: function showState(t, e) {
          t && (this.showStatus = !0, setTimeout(this.hideEject, 2e3));
        } } },
        u = { render: function render() {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { directives: [{ name: "show", rawName: "v-show", value: this.showStatus, expression: "showStatus" }], staticClass: "toast_wrap" }, [e("p", [this._v(this._s(this.message))])]);
      }, staticRenderFns: [] };var m = i("VU/8")(l, u, !1, function (t) {
      i("nFDG");
    }, "data-v-38d205e8", null).exports,
        h = { name: "eject", data: function data() {
        return { showStatus: this.showState };
      }, props: ["message", "showState"], methods: { hideEject: function hideEject() {
          this.showStatus = !1, this.$parent.initEject();
        } }, watch: { showState: function showState(t, e) {
          t && (this.showStatus = !0, setTimeout(this.hideEject, 2e3));
        } } },
        p = { render: function render() {
        this.$createElement;this._self._c;return this._m(0);
      }, staticRenderFns: [function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { staticClass: "hv_tip" }, [e("div", { staticClass: "icon" }), this._v(" "), e("p", [this._v("请旋转至竖屏，体验更佳")])]);
      }] };var g = i("VU/8")(h, p, !1, function (t) {
      i("hyyX");
    }, "data-v-99c8c6d2", null).exports,
        v = { name: "Index", components: { eject: m, hv: g }, data: function data() {
        return { suc_num: 0, nav_index: 1, canTap: !1, goodsObj: {}, ejectText: "", ejectStatus: !1, direct_buy: !1, is_full: !1, groupIng: !1 };
      }, created: function created() {}, mounted: function mounted() {
        this.getCollageInfo(), this.getMemberInfo(), this.getOriginalInfo(), this.shareConfig(), this.$nextTick(function () {
          var t = document.getElementById("nav_wrap");this.$common.fixTop(t);
        });
      }, methods: { toStudy: function toStudy() {
          this.$router.replace({ name: "Cata" });
        }, toPay: function toPay() {
          this.$router.replace({ name: "Pay" });
        }, join: function join() {
          this.canTap && (window.localStorage.getItem("extendAbcPhone") ? this.$router.push({ name: "Pay", query: { type: 1 } }) : this.$router.push({ name: "Login", query: { buy: 2 } }));
        }, buy: function buy() {
          this.canTap && (window.localStorage.getItem("extendAbcPhone") ? this.goodsObj.price > 0 && this.originalPay() : this.$router.push({ name: "Login", query: { buy: 1 } }));
        }, getOriginalInfo: function getOriginalInfo() {
          var t = localStorage.getItem("extendAbcMemberid"),
              e = this.$common.config.gzhUrl + "v3/group/month-card/buy",
              i = { type: 1, act_id: 5, member_id: t },
              s = this.$common.getParam("get", i),
              a = this;this.$axios.get(e + "?" + s).then(function (t) {
            200 == t.data.code ? a.goodsObj = t.data.data : a.showEject(t.data.msg);
          });
        }, originalPay: function originalPay() {
          var t = { member_id: localStorage.getItem("extendAbcMemberid"), openid: localStorage.getItem("extendAbcOpenid"), phone: localStorage.getItem("extendAbcPhone"), goods_num: 1, total_price: this.goodsObj.original_price, discount_money: this.goodsObj.discount_money, money_paid: this.goodsObj.price, goods_name: this.goodsObj.product_name, payment_type: 3, pay_type: 3, trade_type: "JSAPI", source_id: 109, act_id: 5, is_group: 0 };t.product_id = this.goodsObj.product_id, t.parent_order_no = 0;var e = this,
              i = this.$common.getParam("get", t),
              s = this.$common.config.gzhUrl + "v3/pay/order/gzh-add";this.$axios.post(s, i, { headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" } }).then(function (t) {
            if (200 == t.data.code) {
              var i = t.data.data;wx.chooseWXPay({ timestamp: i.pay.timeStamp, nonceStr: i.pay.nonceStr, package: i.pay.package, signType: i.pay.signType, paySign: i.pay.paySign, success: function success(t) {
                  e.openLesson(), e.showEject("购买成功"), location.reload();
                } });
            } else e.showEject(t.data.msg);
          });
        }, openLesson: function openLesson() {
          var t = localStorage.getItem("extendAbcMemberid"),
              e = (this.$route.query.id, this.$common.config.gzhUrl + "v3/marketingcourse/course/unlock-lesson"),
              i = this.$common.getParam("get", { member_id: t, lesson_id: 1, course_id: 2 });this.$axios.get(e + "?" + i).then(function (t) {
            t.data.code;
          });
        }, getMemberInfo: function getMemberInfo() {
          var t = window.localStorage.getItem("extendAbcOpenid"),
              e = this.$common.config.gzhUrl + "v3/member/passport/get-info",
              i = this.$common.getParam("get", { openid: t }),
              s = this;this.$axios.get(e + "?" + i).then(function (t) {
            200 == t.data.code && (window.localStorage.setItem("extendAbcPhone", t.data.data.phone), window.localStorage.setItem("extendAbcNickname", t.data.data.nickname), window.localStorage.setItem("extendAbcHeadimg", t.data.data.headimg_url), s.canTap = !0);
          });
        }, showTime: function showTime() {
          var t = new Date().getTime(),
              e = 1e3 * this.endTime - t;if (e > 0) {
            var i = Math.floor(e / 864e5);e -= 864e5 * i;var s = Math.floor(e / 36e5);e -= 36e5 * s;var a = Math.floor(e / 6e4);e -= 6e4 * a;var n = Math.floor(e / 1e3);i < 10 && (i = "0" + i), s < 10 && (s = "0" + s), a < 10 && (a = "0" + a), n < 10 && (n = "0" + n), this.hour = s, this.minute = a, this.sister = n, setTimeout(this.showTime, 1e3);
          }
        }, getCollageInfo: function getCollageInfo() {
          var t = window.localStorage.getItem("extendAbcMemberid"),
              e = this.$common.VL.getRequest().view_member_id || 0;this.view_member_id = this.$common.VL.getRequest().view_member_id || 0;var i = this.$common.config.gzhUrl + "v3/group/month-card/group",
              s = this.$common.getParam("get", { member_id: t, view_member_id: e, act_id: 5 }),
              a = this;this.$axios.get(i + "?" + s).then(function (t) {
            if (200 == t.data.code) {
              var e = t.data.data,
                  i = e.my_group,
                  s = e.conf;a.direct_buy = e.has_direct_buy, a.suc_num = s.member_join_num, i.has_group && (a.groupIng = !0, i.is_full && (a.is_full = !0));
            }
          });
        }, showEject: function showEject(t) {
          this.ejectText = t, this.ejectStatus = !0;
        }, initEject: function initEject() {
          this.ejectStatus = !1;
        }, shareConfig: function shareConfig() {
          var t = localStorage.getItem("extendAbcMemberid"),
              e = encodeURIComponent(window.location.href),
              i = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat",
              s = this.$common.getParam("get", { url: e, member_id: t }),
              a = window.location.origin + "/extend/letter/index.html?view_member_id=" + t,
              n = "零基础宝宝也能学会的字母课，26节课让孩子轻松爱上英语！",
              o = "AI动画互动课，孩子轻松掌握26个字母，养成良好阅读习惯，英文水平超车同龄宝宝~",
              r = "https://qnfile.abctime.com/extend/letter/letter_share.png";this.$axios.post(i + "?" + s).then(function (t) {
            if (200 == t.data.code) {
              var e = t.data.data;wx.config({ debug: !1, appId: e.appId, timestamp: e.timestamp, nonceStr: e.nonceStr, signature: e.signature, jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "chooseWXPay", "showMenuItems"] }), wx.ready(function () {
                wx.checkJsApi({ jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "chooseWXPay", "showMenuItems"], success: function success(t) {} }), wx.showMenuItems({ menuList: ["menuItem:share:appMessage", "menuItem:share:timeline"] }), wx.onMenuShareTimeline({ title: n, link: a, imgUrl: r, success: function success() {} }), wx.onMenuShareAppMessage({ title: n, desc: o, link: a, imgUrl: r, type: "link", dataUrl: "", success: function success() {} });
              });
            }
          });
        }, toDown: function toDown() {
          window.location.href = "http://www.abctime.com/download.html", TDAPP.onEvent("按钮点击_立即使用");
        } } },
        f = { render: function render() {
        var t = this,
            e = t.$createElement,
            s = t._self._c || e;return s("div", { attrs: { content: "index" } }, [s("div", { staticClass: "container" }, [t._m(0), t._v(" "), s("nav", { attrs: { id: "nav_wrap" } }, [s("div", { class: 1 == t.nav_index ? "nav_li active" : "nav_li", on: { click: function click(e) {
              t.nav_index = 1;
            } } }, [t._v("课程介绍")]), t._v(" "), s("div", { class: 2 == t.nav_index ? "nav_li active" : "nav_li", on: { click: function click(e) {
              t.nav_index = 2;
            } } }, [t._v("上课须知")])]), t._v(" "), s("div", { staticClass: "content" }, [1 == t.nav_index ? s("div", { staticClass: "con_left" }, [s("div", { staticClass: "title title1" }), t._v(" "), t._m(1), t._v(" "), s("div", { staticClass: "title title2" }), t._v(" "), s("img", { staticClass: "content2", attrs: { src: i("FyGf") } }), t._v(" "), s("div", { staticClass: "title title3" }), t._v(" "), t._m(2), t._v(" "), t._m(3), t._v(" "), s("div", { staticClass: "title title4" }), t._v(" "), s("img", { staticClass: "content4", attrs: { src: i("yg4f") } })]) : s("div", { staticClass: "con_right" }, [t._m(4)]), t._v(" "), s("div", { staticClass: "tag" }, [t._v("本课程由ABC Reading&励步英语联合出品")])]), t._v(" "), s("footer", { directives: [{ name: "show", rawName: "v-show", value: !t.direct_buy && !t.is_full, expression: "!direct_buy && !is_full" }] }, [s("div", { staticClass: "original", on: { click: function click(e) {
              return t.buy();
            } } }, [t._v("￥199.00"), s("br"), s("span", [t._v("原价购买")])]), t._v(" "), s("div", { staticClass: "discount", on: { click: function click(e) {
              return t.join();
            } } }, [s("span", { staticClass: "price" }, [t._v("¥9.90")]), t._v(" "), t._m(5)])]), t._v(" "), s("div", { directives: [{ name: "show", rawName: "v-show", value: t.direct_buy || t.is_full && t.groupIng, expression: "direct_buy || (is_full&&groupIng)" }], staticClass: "ft2", on: { click: function click(e) {
              return t.toStudy();
            } } }, [t._v("已购买 立即开始学习")]), t._v(" "), s("div", { directives: [{ name: "show", rawName: "v-show", value: !t.is_full && t.groupIng, expression: "!is_full&&groupIng" }], staticClass: "ft2", on: { click: function click(e) {
              return t.toPay();
            } } }, [t._v("拼团中...")])]), t._v(" "), s("eject", { attrs: { message: t.ejectText, showState: t.ejectStatus } }), t._v(" "), s("hv")], 1);
      }, staticRenderFns: [function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { staticClass: "head" }, [e("div", { staticClass: "upper" })]);
      }, function () {
        var t = this,
            e = t.$createElement,
            s = t._self._c || e;return s("ul", { staticClass: "content1" }, [s("li", [s("p", { staticClass: "txt1" }, [t._v("外教TPR教学 "), s("span", [t._v(" - 轻松认识小乐器")])]), t._v(" "), s("div", { staticClass: "sort sort" }, [t._v("01")]), t._v(" "), s("img", { attrs: { src: i("ia2c") } })]), t._v(" "), s("li", [s("p", { staticClass: "txt2" }, [t._v("单词互动小游戏"), s("span", [t._v(" - 玩转词汇全掌握")])]), t._v(" "), s("div", { staticClass: "sort sort2" }, [t._v("02")]), t._v(" "), s("img", { attrs: { src: i("cA0y") } })]), t._v(" "), s("li", [s("p", { staticClass: "txt3" }, [t._v("绘本跟读有奖励"), s("span", [t._v(" - 发音纯正口语好")])]), t._v(" "), s("div", { staticClass: "sort sort3" }, [t._v("03")]), t._v(" "), s("img", { attrs: { src: i("bz75") } })]), t._v(" "), s("li", [s("p", { staticClass: "txt4" }, [t._v("跟唱跟跳不枯燥"), s("span", [t._v(" - 英文儿歌记得牢")])]), t._v(" "), s("div", { staticClass: "sort sort4" }, [t._v("04")]), t._v(" "), s("img", { attrs: { src: i("qRts") } })])]);
      }, function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("ul", { staticClass: "content3" }, [e("li", [e("img", { attrs: { src: i("4/nv") } })])]);
      }, function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("ul", { staticClass: "content_text3" }, [e("li", [e("span", { staticClass: "star" }), this._v("好未来集团独家版权引进")]), this._v(" "), e("li", [e("span", { staticClass: "star" }), this._v("美国、加拿大公立学校推荐读物")]), this._v(" "), e("li", [e("span", { staticClass: "star" }), this._v("国际权威认证分级阅读")]), this._v(" "), e("li", [e("span", { staticClass: "star" }), this._v("轻松开启宝宝的英文阅读")])]);
      }, function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("ul", { staticClass: "qa_box" }, [e("li", [e("img", { attrs: { src: i("Zzzc") } })]), this._v(" "), e("li", [e("img", { attrs: { src: i("8pIE") } })]), this._v(" "), e("li", [e("img", { attrs: { src: i("urT/") } })]), this._v(" "), e("li", [e("img", { attrs: { src: i("OXY6") } })])]);
      }, function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", [this._v("3人拼团"), e("br"), e("span", [this._v("￥199.00")])]);
      }] };var _ = i("VU/8")(v, f, !1, function (t) {
      i("d5EC");
    }, "data-v-5cfee2ad", null).exports,
        w = { name: "Login", components: { eject: m }, data: function data() {
        return { nickname: "", head_img: "", tel: "", code: "", sendCode: !0, canSend: !1, sendStatus: !1, loginStatus: !1, ejectText: "", ejectStatus: !1, sendText: "获取验证码", time: 0, telDis: !1, blurFlag: !0 };
      }, created: function created() {}, mounted: function mounted() {
        this.shareConfig(), this.nickname = window.localStorage.getItem("extendAbcNickname"), this.head_img = window.localStorage.getItem("extendAbcHeadimg");
      }, methods: { getUserInfo: function getUserInfo() {}, bindPhone: function bindPhone() {
          if (this.loginStatus) {
            var t = this.tel,
                e = this.code,
                i = window.localStorage.getItem("extendAbcMemberid"),
                s = window.localStorage.getItem("extendAbcOpenid"),
                a = this.$common.getParam("get", { phone: t, code: e, member_id: i, open_id: s, product_id: 110, source_id: 109, act_id: 5 }),
                n = this.$common.config.gzhUrl + "v3/member/passport/bind-phone",
                o = this;this.$axios.post(n, a, { headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" } }).then(function (t) {
              200 == t.data.code ? (window.localStorage.setItem("extendAbcPhone", t.data.data.phone), 2 == o.$route.query.buy ? o.$router.push({ name: "Pay", query: { type: 1 } }) : 1 == o.$route.query.buy && o.originalPay()) : o.showEject(t.data.msg);
            });
          }
        }, originalPay: function originalPay() {
          var t = { member_id: localStorage.getItem("extendAbcMemberid"), openid: localStorage.getItem("extendAbcOpenid"), phone: localStorage.getItem("extendAbcPhone"), goods_num: 1, total_price: this.goodsObj.original_price, discount_money: this.goodsObj.discount_money, money_paid: this.goodsObj.price, goods_name: this.goodsObj.product_name, payment_type: 3, pay_type: 3, trade_type: "JSAPI", source_id: 109, act_id: 5, is_group: 0 };t.product_id = this.goodsObj.product_id, t.parent_order_no = 0;var e = this,
              i = this.$common.getParam("get", t),
              s = this.$common.config.gzhUrl + "v3/pay/order/gzh-add";this.$axios.post(s, i, { headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" } }).then(function (t) {
            if (200 == t.data.code) {
              var i = t.data.data;wx.chooseWXPay({ timestamp: i.pay.timeStamp, nonceStr: i.pay.nonceStr, package: i.pay.package, signType: i.pay.signType, paySign: i.pay.paySign, success: function success(t) {
                  e.openLesson(), e.showEject("购买成功"), e.$router.push({ name: "Index" });
                } });
            } else e.showEject(t.data.msg);
          });
        }, openLesson: function openLesson() {
          var t = localStorage.getItem("extendAbcMemberid"),
              e = (this.$route.query.id, this.$common.config.gzhUrl + "v3/marketingcourse/course/unlock-lesson"),
              i = this.$common.getParam("get", { member_id: t, lesson_id: 1, course_id: 2 });this.$axios.get(e + "?" + i).then(function (t) {
            t.data.code;
          });
        }, blur: function blur() {
          this.blurFlag = !0;
        }, focus: function focus() {
          this.blurFlag = !1;
        }, checkPh: function checkPh() {
          this.$common.VL.phNum(this.tel) ? ("获取验证码" != this.sendText && "重新发送" != this.sendText || (this.canSend = !0, this.sendStatus = !0), 6 == this.code.length ? this.loginStatus = !0 : this.loginStatus = !1) : (this.canSend = !1, this.sendStatus = !1, this.loginStatus = !1);
        }, getCode: function getCode() {
          if (this.sendStatus) {
            this.sendStatus = !1, this.canSend = !1;var t = this.$common.config.gzhUrl + "v2/api/api/send",
                e = this.$common.getParam("get", { phone: this.tel }),
                i = this;this.time = 60, this.timer();this.$axios.post(t, e, { headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" } }).then(function (t) {
              200 == t.data.code ? i.showEject("发送成功") : i.showEject(t.data.msg);
            });
          } else this.showEject("请输入正确的手机号");
        }, showEject: function showEject(t) {
          this.ejectText = t, this.ejectStatus = !0;
        }, initEject: function initEject() {
          this.ejectStatus = !1;
        }, timer: function timer() {
          this.time > 0 ? (this.time--, this.canSend = !1, this.sendText = this.time + "s后重发", setTimeout(this.timer, 1e3)) : (this.time = 0, this.sendText = "重新发送", this.canSend = !0, this.sendStatus = !0);
        }, shareConfig: function shareConfig() {
          var t = localStorage.getItem("monthCardCollageMemberid"),
              e = encodeURIComponent(window.location.href),
              i = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat",
              s = this.$common.getParam("get", { url: e, member_id: t });this.$axios.post(i + "?" + s).then(function (t) {
            if (200 == t.data.code) {
              var e = t.data.data;wx.config({ debug: !1, appId: e.appId, timestamp: e.timestamp, nonceStr: e.nonceStr, signature: e.signature, jsApiList: ["hideMenuItems"] }), wx.ready(function () {
                wx.checkJsApi({ jsApiList: ["hideMenuItems"], success: function success(t) {} }), wx.hideMenuItems({ menuList: ["menuItem:share:timeline", "menuItem:share:appMessage"] });
              });
            }
          });
        } } },
        x = { render: function render() {
        var t = this,
            e = t.$createElement,
            i = t._self._c || e;return i("div", { staticClass: "login" }, [i("div", { staticClass: "login_container" }, [i("div", { staticClass: "hd_box" }, [i("div", { staticClass: "user_box" }, [i("img", { attrs: { src: t.head_img } }), t._v(" "), i("span", { staticClass: "nickname" }, [t._v(t._s(t.nickname))])])]), t._v(" "), i("div", { staticClass: "form_box" }, [i("div", { staticClass: "group phone" }, [i("span", { staticClass: "icon" }), t._v(" "), i("input", { directives: [{ name: "model", rawName: "v-model", value: t.tel, expression: "tel" }], attrs: { id: "phone", type: "tel", maxlength: "11", placeholder: "请输入手机号" }, domProps: { value: t.tel }, on: { focus: t.focus, blur: t.blur, input: [function (e) {
              e.target.composing || (t.tel = e.target.value);
            }, t.checkPh] } })]), t._v(" "), i("div", { staticClass: "group code" }, [i("span", { staticClass: "icon" }), t._v(" "), i("input", { directives: [{ name: "model", rawName: "v-model", value: t.code, expression: "code" }], attrs: { id: "code", type: "tel", maxlength: "6", placeholder: "请输入验证码" }, domProps: { value: t.code }, on: { input: [function (e) {
              e.target.composing || (t.code = e.target.value);
            }, t.checkPh], focus: t.focus, blur: t.blur } }), t._v(" "), i("div", { class: { send: !0, active: t.canSend }, on: { click: t.getCode } }, [t._v(t._s(t.sendText))])]), t._v(" "), i("div", { class: t.loginStatus ? "btn active" : "btn", on: { click: t.bindPhone } }, [i("span", { staticClass: "icon" }), i("span", [t._v("登录")])])]), t._v(" "), i("div", { directives: [{ name: "show", rawName: "v-show", value: t.blurFlag, expression: "blurFlag" }], staticClass: "ft_box" })]), t._v(" "), i("eject", { attrs: { message: t.ejectText, showState: t.ejectStatus } })], 1);
      }, staticRenderFns: [] };var b = i("VU/8")(w, x, !1, function (t) {
      i("/Nbn");
    }, "data-v-9898c590", null).exports,
        y = i("MJLE"),
        S = i.n(y),
        C = i("2Pnh"),
        I = i.n(C),
        $ = { name: "Pay", components: { eject: m }, data: function data() {
        return { posterImg: "", wrapShow: !1, loadStatus: !0 };
      }, created: function created() {}, mounted: function mounted() {
        this.createQrcode("333");
      }, methods: { showWrap: function showWrap() {
          this.wrapShow = !0;
        }, createQrcode: function createQrcode(t) {
          var e = document.getElementById("qrcodeImg"),
              i = 352 * document.documentElement.clientWidth / 750;e.innerHTML = "", new S.a(e, { width: i, height: i, colorDark: "#000000", colorLight: "#ffffff", correctLevel: S.a.CorrectLevel.H }).makeCode(t);
        }, createPoster: function createPoster(t) {
          this.createQrcode(t);var e = document.getElementById("posterHtml"),
              i = e.offsetWidth,
              s = e.offsetHeight,
              a = document.createElement("canvas"),
              n = window.devicePixelRatio;a.width = i * n, a.height = s * n, a.style.width = i + "px", a.style.height = s + "px", a.getContext("2d").scale(n, n);var o = this;console.log(e.offsetWidth), I()(e, { canvas: a, useCORS: !0, allowTaint: !0, logging: !1, letterRendering: !0, scale: n, onclone: function onclone(t) {
              t.querySelector("#posterHtml").style.display = "block";
            } }).then(function (t) {
            o.loadStatus = !1, o.posterImg = t.toDataURL("image/png");
          });
        } } },
        A = { render: function render() {
        var t = this,
            e = t.$createElement,
            i = t._self._c || e;return i("div", { directives: [{ name: "show", rawName: "v-show", value: t.wrapShow, expression: "wrapShow" }], staticClass: "wrap" }, [t._m(0), t._v(" "), i("img", { directives: [{ name: "show", rawName: "v-show", value: !t.loadStatus, expression: "!loadStatus" }], staticClass: "posterImg", attrs: { src: t.posterImg, alt: "" } }), t._v(" "), i("p", { directives: [{ name: "show", rawName: "v-show", value: !t.loadStatus, expression: "!loadStatus" }], staticClass: "save_txt" }, [t._v("长按上面图片保存")]), t._v(" "), i("div", { directives: [{ name: "show", rawName: "v-show", value: !t.loadStatus, expression: "!loadStatus" }], staticClass: "close", on: { click: function click(e) {
              t.wrapShow = !1;
            } } }), t._v(" "), i("div", { directives: [{ name: "show", rawName: "v-show", value: t.loadStatus, expression: "loadStatus" }], staticClass: "loading" }, [t._m(1), t._v(" "), i("p", [t._v("海报生成中...")])])]);
      }, staticRenderFns: [function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { staticClass: "poster", attrs: { id: "posterHtml" } }, [e("div", { attrs: { id: "qrcodeImg" } })]);
      }, function () {
        var t = this,
            e = t.$createElement,
            i = t._self._c || e;return i("div", { staticClass: "spinner" }, [i("div", { staticClass: "spinner-container container1" }, [i("div", { staticClass: "circle1" }), t._v(" "), i("div", { staticClass: "circle2" }), t._v(" "), i("div", { staticClass: "circle3" }), t._v(" "), i("div", { staticClass: "circle4" })]), t._v(" "), i("div", { staticClass: "spinner-container container2" }, [i("div", { staticClass: "circle1" }), t._v(" "), i("div", { staticClass: "circle2" }), t._v(" "), i("div", { staticClass: "circle3" }), t._v(" "), i("div", { staticClass: "circle4" })]), t._v(" "), i("div", { staticClass: "spinner-container container3" }, [i("div", { staticClass: "circle1" }), t._v(" "), i("div", { staticClass: "circle2" }), t._v(" "), i("div", { staticClass: "circle3" }), t._v(" "), i("div", { staticClass: "circle4" })])]);
      }] };var j = { name: "Pay", components: { eject: m, poster: i("VU/8")($, A, !1, function (t) {
          i("F6w+");
        }, "data-v-fa4664fc", null).exports, hv: g }, data: function data() {
        return { nickname: "", head_img: "", num: 2, hour: "00", minute: "00", sister: "00", endTime: 0, haveGroup: !1, canTap: !1, canJoin: !1, sucStatus: !1, memberArr: [], haveCollage: !1, defaultStatus: !0, selfIng: !1, selfSuc: !1, shareStatus: !1, posterStatus: !1, direct_buy: !1, xNum: 2, selfHaveGroup: !1, goodsObj: {}, goodsType: 1, canGroup: !0, ejectText: "", ejectStatus: !1 };
      }, created: function created() {}, mounted: function mounted() {
        this.getInfo(), this.getMemberInfo(), this.getCollageInfo(), this.nickname = window.localStorage.getItem("extendAbcNickname"), this.head_img = window.localStorage.getItem("extendAbcHeadimg");
      }, methods: { backCollage: function backCollage() {
          window.location.href = "index.html#/pay";
        }, toStudy: function toStudy() {
          this.$router.replace({ name: "Cata" });
        }, invite: function invite() {
          this.shareStatus = !0;
        }, getPoster: function getPoster() {
          var t = "",
              e = localStorage.getItem("extendAbcMemberid"),
              i = this.$common.VL.getRequest().view_member_id;t = i > 0 && this.haveGroup ? this.isSelf ? window.location.origin + "/extend/letter/index.html?view_member_id=" + e : window.location.origin + "/extend/letter/index.html?view_member_id=" + i : window.location.origin + "/extend/letter/index.html?view_member_id=" + e, this.$refs.poster.showWrap(), this.$refs.poster.createPoster(t);
        }, getCollageInfo: function getCollageInfo() {
          var t = this,
              e = window.localStorage.getItem("extendAbcMemberid"),
              i = this.$common.VL.getRequest().view_member_id || 0;this.view_member_id = this.$common.VL.getRequest().view_member_id || 0;var s = this.$common.config.gzhUrl + "v3/group/month-card/group",
              a = this.$common.getParam("get", { member_id: e, view_member_id: i, act_id: 5 }),
              n = this;this.$axios.get(s + "?" + a).then(function (e) {
            if (200 == e.data.code) {
              var i = e.data.data,
                  s = i.conf;n.groupPrice = s.group_buy.price, n.groupType = s.group_buy.type, n.directPrice = s.direct_buy.price, n.directType = s.direct_buy.type, n.suc_num = s.member_join_num, n.direct_buy = s.has_direct_buy;var a = i.my_group,
                  o = {};if (i.view_self ? (n.isSelf = !0, a.has_group ? (n.selfHaveGroup = !0, n.haveGroup = !0, (o = i.my_group).is_full ? (n.sucStatus = !0, n.selfSuc = !0, n.defaultStatus = !1) : (n.sucStatus = !1, n.endTime = o.end_time, n.hideTimeout = !1, n.showTime(), n.selfShare = !0, n.defaultStatus = !1)) : n.haveGroup = !1) : (o = i.view_group).has_group ? (n.haveGroup = !0, a.has_group ? (n.selfHaveGroup = !0, n.defaultStatus = !1, a.is_full ? n.selfSuc = !0 : n.selfIng = !0) : o.is_full ? (n.sucStatus = !0, n.defaultStatus = !1, n.selfNew = !0) : (n.sucStatus = !1, n.haveCollage = !1, n.endTime = o.end_time, n.hideTimeout = !1, n.showTime())) : n.haveGroup = !1, o.is_full && (n.sucStatus = !0), o.members) {
                var r = 0;for (var c in o.members) {
                  n.memberArr[c] = o.members[c], o.members[c].head_img && "" != o.members[c].head_img && r++;
                }r <= 3 ? n.xNum = 3 - r : n.sucStatus = !0;
              }n.endStatus = !1, n.shareConfig(), t.canJoin = !0;
            } else 11001 == e.data.code && (n.endStatus = !0);
          });
        }, showTime: function showTime() {
          var t = new Date().getTime(),
              e = 1e3 * this.endTime - t;if (e > 0) {
            var i = Math.floor(e / 864e5);e -= 864e5 * i;var s = Math.floor(e / 36e5);e -= 36e5 * s;var a = Math.floor(e / 6e4);e -= 6e4 * a;var n = Math.floor(e / 1e3);i < 10 && (i = "0" + i), s < 10 && (s = "0" + s), a < 10 && (a = "0" + a), n < 10 && (n = "0" + n), this.hour = s, this.minute = a, this.sister = n, setTimeout(this.showTime, 1e3);
          }
        }, joinGroup: function joinGroup() {
          this.canTap && (window.localStorage.getItem("extendAbcPhone") ? this.pay() : this.$router.push({ name: "Login", query: { type: 2 } }));
        }, getMemberInfo: function getMemberInfo() {
          var t = window.localStorage.getItem("extendAbcOpenid"),
              e = this.$common.config.gzhUrl + "v3/member/passport/get-info",
              i = this.$common.getParam("get", { openid: t }),
              s = this;this.$axios.get(e + "?" + i).then(function (t) {
            200 == t.data.code && (window.localStorage.setItem("extendAbcPhone", t.data.data.phone), window.localStorage.setItem("extendAbcNickname", t.data.data.nickname), window.localStorage.setItem("extendAbcHeadimg", t.data.data.headimg_url), s.canTap = !0);
          });
        }, getInfo: function getInfo() {
          var t = localStorage.getItem("extendAbcMemberid"),
              e = this.$common.config.gzhUrl + "v3/group/month-card/buy",
              i = { type: 2, act_id: 5, member_id: t };this.$common.VL.getRequest().view_member_id > 0 ? i.view_member_id = this.$common.VL.getRequest().view_member_id : delete i.view_member_id;var s = this.$common.getParam("get", i),
              a = this;this.$axios.get(e + "?" + s).then(function (t) {
            200 == t.data.code && (a.goodsObj = t.data.data);
          });
        }, pay: function pay() {
          var t = this.$common.VL.getRequest(),
              e = { member_id: localStorage.getItem("extendAbcMemberid"), openid: localStorage.getItem("extendAbcOpenid"), phone: localStorage.getItem("extendAbcPhone"), goods_num: 1, total_price: this.goodsObj.original_price, discount_money: this.goodsObj.discount_money, money_paid: this.goodsObj.price, goods_name: this.goodsObj.product_name, payment_type: 3, pay_type: 3, trade_type: "JSAPI", source_id: 109, act_id: 5 };e.product_id = this.goodsObj.product_id, e.parent_order_no = 0, console.log(this.sucStatus), t.view_member_id && this.canGroup && !this.sucStatus ? e.parent_order_no = this.goodsObj.order_sn || 0 : delete e.parent_order_no, e.is_group = 1;var i = this,
              s = this.$common.getParam("get", e),
              a = this.$common.config.gzhUrl + "v3/pay/order/gzh-add";this.$axios.post(a, s, { headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" } }).then(function (t) {
            if (200 == t.data.code) {
              var e = t.data.data;wx.chooseWXPay({ timestamp: e.pay.timeStamp, nonceStr: e.pay.nonceStr, package: e.pay.package, signType: e.pay.signType, paySign: e.pay.paySign, success: function success(t) {
                  i.openLesson(), location.reload();
                } });
            } else i.showEject(t.data.msg);
          });
        }, openLesson: function openLesson() {
          var t = localStorage.getItem("extendAbcMemberid"),
              e = (this.$route.query.id, this.$common.config.gzhUrl + "v3/marketingcourse/course/unlock-lesson"),
              i = this.$common.getParam("get", { member_id: t, lesson_id: 1, course_id: 2 });this.$axios.get(e + "?" + i).then(function (t) {
            t.data.code;
          });
        }, showEject: function showEject(t) {
          this.ejectText = t, this.ejectStatus = !0;
        }, initEject: function initEject() {
          this.ejectStatus = !1;
        }, shareConfig: function shareConfig() {
          var t = localStorage.getItem("extendAbcMemberid"),
              e = encodeURIComponent(window.location.href),
              i = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat",
              s = this.$common.getParam("get", { url: e, member_id: t }),
              a = "",
              n = this,
              o = { title: "零基础宝宝也能学会的字母课，26节课让孩子轻松爱上英语！", desc: "AI动画互动课，孩子轻松掌握26个字母，养成良好阅读习惯，英文水平超车同龄宝宝~", imgUrl: "https://qnfile.abctime.com/extend/letter/letter_share.png" },
              r = this.$common.VL.getRequest().view_member_id;a = r > 0 && this.haveGroup ? this.isSelf ? window.location.origin + "/extend/letter/index.html?view_member_id=" + t : window.location.origin + "/extend/letter/index.html?view_member_id=" + r : window.location.origin + "/extend/letter/index.html?view_member_id=" + t, console.log(this.haveGroup), this.haveGroup && this.xNum > 0 && (o.title = "仅差" + this.xNum + "人拼团成功！RAZ字母精灵，宝宝迈进英语大门的基础课！", o.desc = "AI动画互动课，孩子轻松掌握26个字母，养成良好阅读习惯，英文水平超车同龄宝宝~"), this.$axios.post(i + "?" + s).then(function (t) {
            if (200 == t.data.code) {
              var e = t.data.data;wx.config({ debug: !1, appId: e.appId, timestamp: e.timestamp, nonceStr: e.nonceStr, signature: e.signature, jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "chooseWXPay", "showMenuItems"] }), wx.ready(function () {
                wx.checkJsApi({ jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "chooseWXPay", "showMenuItems"], success: function success(t) {} }), wx.showMenuItems({ menuList: ["menuItem:share:appMessage", "menuItem:share:timeline"] }), wx.onMenuShareTimeline({ title: o.title, link: a, imgUrl: o.imgUrl, success: function success() {
                    n.shareStatus = !1;
                  } }), wx.onMenuShareAppMessage({ title: o.title, desc: o.desc, link: a, imgUrl: o.imgUrl, type: "link", dataUrl: "", success: function success() {
                    n.shareStatus = !1;
                  } });
              });
            }
          });
        } } },
        T = { render: function render() {
        var t = this,
            e = t.$createElement,
            i = t._self._c || e;return i("div", { staticClass: "pay" }, [i("div", { staticClass: "pay_container" }, [i("div", { directives: [{ name: "show", rawName: "v-show", value: !t.haveGroup, expression: "!haveGroup" }], staticClass: "hd_box" }), t._v(" "), i("div", { directives: [{ name: "show", rawName: "v-show", value: t.haveGroup, expression: "haveGroup" }], staticClass: "suc_txt_wrap" }, [i("div", { staticClass: "suc_txt" })]), t._v(" "), i("div", { staticClass: "main" }, [t._m(0), t._v(" "), i("div", { staticClass: "collage_box" }, [i("div", { directives: [{ name: "show", rawName: "v-show", value: !t.haveGroup, expression: "!haveGroup" }], staticClass: "default_box" }, [i("p", { staticClass: "txt" }, [t._v("立即支付，即可开团成功")]), t._v(" "), i("ul", [i("li", { staticClass: "default" }, [i("img", { attrs: { src: t.head_img } })]), t._v(" "), i("li"), t._v(" "), i("li")])]), t._v(" "), i("div", { directives: [{ name: "show", rawName: "v-show", value: t.haveGroup && !t.sucStatus, expression: "haveGroup && !sucStatus" }], staticClass: "ing_box" }, [i("p", { staticClass: "txt" }, [t._v("仅需 "), i("span", [t._v(t._s(t.xNum))]), t._v(" 人即可拼团成功，剩余 "), i("span", [t._v(t._s(t.hour) + ":" + t._s(t.minute) + ":" + t._s(t.sister))])]), t._v(" "), i("ul", t._l(t.memberArr, function (t) {
          return i("li", { staticClass: "ing" }, [t.head_img ? i("img", { staticClass: "h_img", attrs: { src: t.head_img } }) : i("div", { staticClass: "h_img" })]);
        }), 0), t._v(" "), i("div", { staticClass: "suc_tips" }), t._v(" "), t._m(1)]), t._v(" "), i("div", { directives: [{ name: "show", rawName: "v-show", value: t.haveGroup && t.sucStatus, expression: "haveGroup && sucStatus" }], staticClass: "suc_box" }, [i("div", { staticClass: "suc_img" }), t._v(" "), i("ul", t._l(t.memberArr, function (t) {
          return i("li", { staticClass: "suc" }, [t.head_img ? i("img", { staticClass: "h_img", attrs: { src: t.head_img } }) : i("div", { staticClass: "h_img" })]);
        }), 0), t._v(" "), i("div", { staticClass: "suc_tips" }), t._v(" "), t._m(2)])]), t._v(" "), i("div", { directives: [{ name: "show", rawName: "v-show", value: !t.direct_buy && !t.selfHaveGroup, expression: "!direct_buy && !selfHaveGroup" }], staticClass: "btn", on: { click: function click(e) {
              return t.joinGroup();
            } } }, [t._v("立即支付(¥9"), i("span", [t._v(".90)")])]), t._v(" "), i("div", { directives: [{ name: "show", rawName: "v-show", value: !t.direct_buy && t.selfIng && !t.defaultStatus, expression: "!direct_buy && selfIng && !defaultStatus" }], staticClass: "btn", on: { click: t.backCollage } }, [t._v("拼团中...")]), t._v(" "), i("div", { directives: [{ name: "show", rawName: "v-show", value: !t.direct_buy && !t.defaultStatus && t.haveGroup && !t.sucStatus, expression: "!direct_buy && !defaultStatus && haveGroup && !sucStatus" }], staticClass: "btn", on: { click: function click(e) {
              return t.invite();
            } } }, [t._v("邀请好友拼团")]), t._v(" "), i("div", { directives: [{ name: "show", rawName: "v-show", value: !t.direct_buy && t.haveGroup && !t.sucStatus, expression: "!direct_buy && haveGroup && !sucStatus" }], staticClass: "poster_btn", on: { click: t.getPoster } }, [t._v("生成拼团海报")]), t._v(" "), i("div", { directives: [{ name: "show", rawName: "v-show", value: !t.direct_buy && t.selfSuc && t.haveGroup && t.sucStatus, expression: "!direct_buy && selfSuc && haveGroup && sucStatus" }], staticClass: "btn", on: { click: function click(e) {
              return t.toStudy();
            } } }, [t._v("立即开始学习")]), t._v(" "), i("div", { directives: [{ name: "show", rawName: "v-show", value: t.direct_buy, expression: "direct_buy" }], staticClass: "btn", on: { click: function click(e) {
              return t.toStudy();
            } } }, [t._v("立即开始学习")]), t._v(" "), i("p", { directives: [{ name: "show", rawName: "v-show", value: !t.haveGroup, expression: "!haveGroup" }], staticClass: "tips" }, [t._v("备注：拼团成功后"), i("br"), t._v("仅拼团付款人微信账号可学习课程")])])]), t._v(" "), t.shareStatus ? i("div", { staticClass: "share_wrap", on: { click: function click(e) {
              t.shareStatus = !1;
            } } }, [i("div", { staticClass: "hd" }), t._v(" "), i("div", { staticClass: "bd" })]) : t._e(), t._v(" "), i("eject", { attrs: { message: t.ejectText, showState: t.ejectStatus } }), t._v(" "), i("poster", { ref: "poster" }), t._v(" "), i("hv")], 1);
      }, staticRenderFns: [function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { staticClass: "info_box" }, [e("img", { attrs: { src: i("Thu1") } }), this._v(" "), e("p", { staticClass: "title" }, [this._v("26节舞动韵律的字母课，让0基础宝宝爱上英语")]), this._v(" "), e("p", { staticClass: "price" }, [e("span", { staticClass: "discount" }, [this._v("¥"), e("span", [this._v("1")]), this._v(".00")]), e("span", { staticClass: "original" }, [this._v("￥199.00")])])]);
      }, function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("p", { staticClass: "suc_tips_txt_ing" }, [this._v("拼团成功后"), e("br"), this._v("\n            仅拼团付款人微信账号可学习课程")]);
      }, function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("p", { staticClass: "suc_tips_txt_ed" }, [this._v("拼团成功后"), e("br"), this._v("\n            仅拼团付款人微信账号可学习课程")]);
      }] };var k = i("VU/8")(j, T, !1, function (t) {
      i("MKAf");
    }, "data-v-12ad2414", null).exports,
        P = { name: "Pay", components: { eject: m }, data: function data() {
        return { num: 2, canGroup: !0, ejectText: "", ejectStatus: !1 };
      }, created: function created() {}, mounted: function mounted() {
        this.shareConfig(), this.nickname = window.localStorage.getItem("extendAbcNickname"), this.head_img = window.localStorage.getItem("extendAbcHeadimg");
      }, methods: { enter: function enter() {
          this.$router.replace("Cata");
        }, getInfo: function getInfo() {
          var t = this.$route.query.type;this.goodsType = t;var e = localStorage.getItem("monthCardCollageMemberid"),
              i = this.$common.config.gzhUrl + "v3/group/month-card/buy",
              s = { type: t, act_id: this.$route.query.aid || 5, member_id: e };this.$route.query.vid > 0 ? s.view_member_id = this.$route.query.vid : delete s.view_member_id;var a = this.$common.getParam("get", s),
              n = this;this.$axios.get(i + "?" + a).then(function (t) {
            200 == t.data.code ? n.goodsObj = t.data.data : 11005 == t.data.code ? (n.canGroup = !1, n.showEject(t.data.msg)) : n.showEject(t.data.msg);
          });
        }, pay: function pay() {
          confirm("确定支付么？") && this.$router.push({ name: "Suc" });
        }, showEject: function showEject(t) {
          this.ejectText = t, this.ejectStatus = !0;
        }, initEject: function initEject() {
          this.ejectStatus = !1;
        }, shareConfig: function shareConfig() {
          var t = localStorage.getItem("monthCardCollageMemberid"),
              e = encodeURIComponent(window.location.href),
              i = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat",
              s = this.$common.getParam("get", { url: e, member_id: t });this.$axios.post(i + "?" + s).then(function (t) {
            if (200 == t.data.code) {
              var e = t.data.data;wx.config({ debug: !1, appId: e.appId, timestamp: e.timestamp, nonceStr: e.nonceStr, signature: e.signature, jsApiList: ["hideMenuItems"] }), wx.ready(function () {
                wx.checkJsApi({ jsApiList: ["hideMenuItems"], success: function success(t) {} }), wx.hideMenuItems({ menuList: ["menuItem:share:timeline", "menuItem:share:appMessage"] });
              });
            }
          });
        } } },
        M = { render: function render() {
        var t = this,
            e = t.$createElement,
            s = t._self._c || e;return s("div", { staticClass: "pay" }, [s("div", { staticClass: "pay_container" }, [t._m(0), t._v(" "), s("img", { staticClass: "banner", attrs: { src: i("mOeM") } }), t._v(" "), s("div", { staticClass: "invite_box" }, [s("p", { staticClass: "tag_txt" }, [t._v("仅需要"), s("span", [t._v(t._s(t.num))]), t._v("人，即可拼团成功")]), t._v(" "), s("div", { staticClass: "btn" }, [t._v("邀请好友拼团")]), t._v(" "), s("div", { staticClass: "btn" }, [t._v("生成拼团海报")]), t._v(" "), s("p", [t._v("帮好友立省98元")])]), t._v(" "), s("div", { staticClass: "suc_box" }, [s("p", [t._v("拼团成功！")]), t._v(" "), s("ul"), t._v(" "), s("div", { staticClass: "btn", on: { click: function click(e) {
              return t.enter();
            } } }, [t._v("进入课程学习")])])]), t._v(" "), s("eject", { attrs: { message: t.ejectText, showState: t.ejectStatus } })], 1);
      }, staticRenderFns: [function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { staticClass: "pay_info" }, [e("p", [this._v("支付成功")])]);
      }] };var E = i("VU/8")(P, M, !1, function (t) {
      i("rqmu");
    }, "data-v-5b002e62", null).exports,
        L = { name: "Pay", components: { eject: m }, data: function data() {
        return { cataArr: [], courseArr: [], nickname: "", head_img: "", num: 2, canGroup: !0, ejectText: "", ejectStatus: !1, count: 0, scoLeft: 0 };
      }, created: function created() {}, mounted: function mounted() {
        var t = this;this.getCourseList(), this.shareConfig(), this.nickname = window.localStorage.getItem("extendAbcNickname"), this.head_img = window.localStorage.getItem("extendAbcHeadimg"), this.box = this.$refs.viewBox, this.box.addEventListener("scroll", function () {
          t.scoLeft = t.$refs.viewBox.scrollLeft;
        }, !1);
      }, methods: { toPart: function toPart(t, e) {
          localStorage.setItem("musicalPartCover", e), this.$router.replace({ name: "Part", query: { id: t } });
        }, showEject: function showEject(t) {
          this.ejectText = t, this.ejectStatus = !0;
        }, initEject: function initEject() {
          this.ejectStatus = !1;
        }, getCourseList: function getCourseList() {
          var t = this,
              e = localStorage.getItem("extendAbcMemberid"),
              i = this.$common.config.gzhUrl + "v3/marketingcourse/course/list",
              s = this.$common.getParam("get", { course_id: 2, member_id: e });this.$axios.get(i + "?" + s).then(function (e) {
            console.log(e.data), 200 == e.data.code && (t.courseArr = e.data.data.list, t.count = e.data.data.unlock_count, localStorage.setItem("extendAbcLength", t.courseArr.length));
          });
        }, shareConfig: function shareConfig() {
          var t = localStorage.getItem("extendAbcMemberid"),
              e = encodeURIComponent(window.location.href),
              i = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat",
              s = this.$common.getParam("get", { url: e, member_id: t });this.$axios.post(i + "?" + s).then(function (t) {
            if (200 == t.data.code) {
              var e = t.data.data;wx.config({ debug: !1, appId: e.appId, timestamp: e.timestamp, nonceStr: e.nonceStr, signature: e.signature, jsApiList: ["hideMenuItems"] }), wx.ready(function () {
                wx.checkJsApi({ jsApiList: ["hideMenuItems"], success: function success(t) {} }), wx.hideMenuItems({ menuList: ["menuItem:share:timeline", "menuItem:share:appMessage"] });
              });
            }
          });
        } } },
        R = { render: function render() {
        var t = this,
            e = t.$createElement,
            i = t._self._c || e;return i("div", { staticClass: "catalog" }, [i("div", { ref: "viewBox", staticClass: "cata_container" }, [i("ul", { staticClass: "cata_box" }, t._l(t.courseArr, function (e) {
          return i("li", { on: { click: function click(i) {
                return t.toPart(e.id, e.cover);
              } } }, [i("img", { staticClass: "cata_pic", attrs: { src: e.cover } }), t._v(" "), i("div", { directives: [{ name: "show", rawName: "v-show", value: e.is_finish, expression: "item.is_finish" }], staticClass: "tag_finish" }, [t._v("已完成")]), t._v(" "), i("p", { staticClass: "cata_txt" }, [t._v(t._s(e.name))])]);
        }), 0), t._v(" "), i("div", { staticClass: "cata_ft" })]), t._v(" "), i("eject", { attrs: { message: t.ejectText, showState: t.ejectStatus } }), t._v(" "), t._m(0)], 1);
      }, staticRenderFns: [function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { staticClass: "hv_tip" }, [e("div", { staticClass: "icon" }), this._v(" "), e("p", [this._v("请旋转至横屏，体验更佳")])]);
      }] };var q = i("VU/8")(L, R, !1, function (t) {
      i("bP4k");
    }, "data-v-5efd1ead", null).exports,
        U = { name: "Part", components: { eject: m }, data: function data() {
        return { ind: 0, id: 0, num: 2, ejectText: "", ejectStatus: !1, textArr: ["视频欣赏", "绘本阅读", "互动游戏", "动画歌谣"], audio_url: "" };
      }, created: function created() {}, mounted: function mounted() {
        this.ind = this.$route.query.part - 1 || 0, this.id = this.$route.query.id, this.audio_url = "https://qnfile.abctime.com/extend/musical/trans_audio" + this.$route.query.part + ".mp3", wx.ready(function () {
          document.querySelector("#audio").play();
        });
      }, methods: { back: function back() {
          this.$router.replace({ name: "Cata" });
        }, onEnd: function onEnd() {
          3 == this.ind || this.toStudy(this.ind + 1);
        }, toStudy: function toStudy(t) {
          var e = "";switch (t) {case 1:
              e = "PartOne", "video";break;case 2:
              e = "PartTwo", "book";break;case 3:
              e = "PartThree", "letter";break;case 4:
              e = "PartFour", "song";break;case 5:
              e = "PartFive", "song";}this.$router.replace({ name: e, query: { id: this.id, part: t } });
        }, showEject: function showEject(t) {
          this.ejectText = t, this.ejectStatus = !0;
        }, initEject: function initEject() {
          this.ejectStatus = !1;
        } } },
        N = { render: function render() {
        var t = this,
            e = t.$createElement,
            i = t._self._c || e;return i("div", { staticClass: "trans" }, [i("div", { staticClass: "trans_container" }, [i("p", { staticClass: "txt" }, [t._v(t._s(t.textArr[t.ind]))]), t._v(" "), i("div", { staticClass: "tag" }, [i("div", { directives: [{ name: "show", rawName: "v-show", value: 3 == t.ind, expression: "ind==3" }], staticClass: "btn_left", on: { click: function click(e) {
              return t.toStudy(5);
            } } }), t._v(" "), i("div", { directives: [{ name: "show", rawName: "v-show", value: 3 == t.ind, expression: "ind==3" }], staticClass: "btn_right", on: { click: function click(e) {
              return t.toStudy(4);
            } } })])]), t._v(" "), i("audio", { staticClass: "Hidden", attrs: { id: "audio", autoplay: "", preload: "", src: t.audio_url, controls: "" }, on: { ended: function ended(e) {
              return t.onEnd();
            } } }), t._v(" "), t._m(0)]);
      }, staticRenderFns: [function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { staticClass: "hv_tip" }, [e("div", { staticClass: "icon" }), this._v(" "), e("p", [this._v("请旋转至横屏，体验更佳")])]);
      }] };var O = i("VU/8")(U, N, !1, function (t) {
      i("/xJ6");
    }, "data-v-2e16df1a", null).exports,
        V = i("mvHQ"),
        F = i.n(V),
        G = { name: "Part", components: { eject: m }, data: function data() {
        return { ind: 0, content: {}, partArr: [{ id: 1, cls: "icon icon1", tagCls: "tag tag1", txt: "视频欣赏", completed: !1 }, { id: 2, cls: "icon icon2", tagCls: "tag tag2", txt: "绘本阅读", completed: !1 }, { id: 3, cls: "icon icon3", tagCls: "tag tag3", txt: "互动游戏", completed: !1 }, { id: 4, cls: "icon icon4", tagCls: "tag tag4", txt: "动画歌谣", completed: !1 }], locationArr: [0, 0, 0, 0], currentLocation: 0, nickname: "", head_img: "", num: 2, canGroup: !0, ejectText: "", ejectStatus: !1, cover: "" };
      }, created: function created() {}, mounted: function mounted() {
        this.getCourseInfo(), this.ind = this.$route.query.id - 1 || 0, this.cover = localStorage.getItem("musicalPartCover");
      }, methods: { back: function back() {
          this.$router.replace({ name: "Cata" });
        }, getCourseInfo: function getCourseInfo() {
          var t = this,
              e = localStorage.getItem("extendAbcMemberid"),
              i = this.$route.query.id,
              s = this.$common.config.gzhUrl + "v3/marketingcourse/course/info",
              a = this.$common.getParam("get", { course_id: 2, member_id: e, lesson_id: i });this.$axios.get(s + "?" + a).then(function (e) {
            if (200 == e.data.code) {
              var i = e.data.data;for (var s in t.content = i.content, t.locationArr = i.location, t.locationArr) {
                t.locationArr[s] > 0 && (t.currentLocation++, t.partArr[s].completed = !0);
              }localStorage.setItem("musicalContent", F()(i.content));
            }
          });
        }, toStudy: function toStudy(t) {
          switch (t) {case 1:
              "PartOne", "video";break;case 2:
              "PartTwo", "book";break;case 3:
              "PartThree", "letter";break;case 4:
              "PartFour", "song";}t <= this.currentLocation + 1 ? this.$router.replace({ name: "Transition", query: { id: this.ind + 1, part: t } }) : (console.log("fff"), this.showEject("完成上一个环节才能解锁哦～"));
        }, showEject: function showEject(t) {
          this.ejectText = t, this.ejectStatus = !0;
        }, initEject: function initEject() {
          this.ejectStatus = !1;
        } } },
        z = { render: function render() {
        var t = this,
            e = t.$createElement,
            i = t._self._c || e;return i("div", { staticClass: "part" }, [i("div", { staticClass: "part_container" }, [i("div", { staticClass: "table" }, [i("div", { staticClass: "img_box" }, [i("img", { attrs: { src: t.cover } })]), t._v(" "), i("div", { staticClass: "role_a" })]), t._v(" "), i("div", { staticClass: "leaf" }), t._v(" "), i("ul", t._l(t.partArr, function (e, s) {
          return i("li", { class: s == t.currentLocation ? "current" : "", on: { click: function click(e) {
                return t.toStudy(s + 1);
              } } }, [i("div", { class: e.completed ? "txt_bg active" : "txt_bg" }, [i("span", { class: e.cls }), t._v(t._s(e.txt) + "\n          "), i("span", { class: e.tagCls })])]);
        }), 0)]), t._v(" "), i("eject", { attrs: { message: t.ejectText, showState: t.ejectStatus } }), t._v(" "), t._m(0), t._v(" "), i("div", { staticClass: "back", on: { click: t.back } })], 1);
      }, staticRenderFns: [function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { staticClass: "hv_tip" }, [e("div", { staticClass: "icon" }), this._v(" "), e("p", [this._v("请旋转至横屏，体验更佳")])]);
      }] };var D = i("VU/8")(G, z, !1, function (t) {
      i("ioFd");
    }, "data-v-629d3764", null).exports,
        X = { name: "Part1", components: { eject: m }, data: function data() {
        return { url: "", ejectText: "", ejectStatus: !1, showFinish: !1, next_id: 1 };
      }, created: function created() {
        this.shareConfig();
      }, mounted: function mounted() {
        this.shareConfig(), this.setSrc();
      }, methods: { next: function next(t) {
          t && t.preventDefault(), this.$router.replace({ name: "Part", query: { id: this.next_id } });
        }, back: function back() {
          var t = this.$route.query.id;this.$router.replace({ name: "Part", query: { id: t } });
        }, setSrc: function setSrc() {
          var t = JSON.parse(window.localStorage.getItem("musicalContent"));this.url = t.video.url;
        }, toPart: function toPart() {
          this.$router.push({ name: "Part" });
        }, activeVideo: function activeVideo() {
          var t = this,
              e = localStorage.getItem("extendAbcMemberid"),
              i = this.$route.query.id,
              s = this.$common.config.gzhUrl + "v3/marketingcourse/course/lesson-location",
              a = this.$common.getParam("get", { course_id: 2, member_id: e, lesson_id: i, location: 1 }),
              n = this;this.$axios.get(s + "?" + a).then(function (e) {
            if (200 == e.data.code) {
              if (e.data.data.is_finish) {
                var s = parseInt(localStorage.getItem("extendAbcLength"));if (i == s) t.$router.push({ name: "End" });else {
                  var a = "extendAbcFinish" + i;localStorage.getItem(a) || (t.showFinish = !0, t.next_id = parseInt(i) + 1, localStorage.setItem(a, !0));
                }
              }n.$router.replace({ name: "Transition", query: { id: n.$route.query.id, part: 2 } });
            }
          });
        }, showEject: function showEject(t) {
          this.ejectText = t, this.ejectStatus = !0;
        }, initEject: function initEject() {
          this.ejectStatus = !1;
        }, shareConfig: function shareConfig() {
          var t = localStorage.getItem("extendAbcMemberid"),
              e = encodeURIComponent(window.location.href),
              i = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat",
              s = this.$common.getParam("get", { url: e, member_id: t }),
              a = window.location.origin + "/extend/letter/index.html",
              n = "零基础宝宝也能学会的字母课，26节课让孩子轻松爱上英语！",
              o = "AI动画互动课，孩子轻松掌握26个字母，养成良好阅读习惯，英文水平超车同龄宝宝~",
              r = "https://qnfile.abctime.com/extend/letter/letter_share.png";this.$axios.post(i + "?" + s).then(function (t) {
            if (200 == t.data.code) {
              var e = t.data.data;wx.config({ debug: !1, appId: e.appId, timestamp: e.timestamp, nonceStr: e.nonceStr, signature: e.signature, jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "chooseWXPay", "showMenuItems"] }), wx.ready(function () {
                wx.checkJsApi({ jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "chooseWXPay", "showMenuItems"], success: function success(t) {} }), wx.showMenuItems({ menuList: ["menuItem:share:appMessage", "menuItem:share:timeline"] }), wx.onMenuShareTimeline({ title: n, link: a, imgUrl: r, success: function success() {} }), wx.onMenuShareAppMessage({ title: n, desc: o, link: a, imgUrl: r, type: "link", dataUrl: "", success: function success() {} });
              });
            }
          });
        } } },
        H = { render: function render() {
        var t = this,
            e = t.$createElement,
            i = t._self._c || e;return i("div", { staticClass: "part1" }, [i("video", { ref: "video1", attrs: { controls: "", "x5-video-player-type": "h5", "x5-video-orientation": "landscape", src: t.url }, on: { ended: t.activeVideo } }), t._v(" "), t.showFinish ? i("div", { staticClass: "finish", on: { click: function click(e) {
              t.showFinish = !1;
            } } }, [i("div", { staticClass: "bg" }, [i("p", { staticClass: "txt1" }, [t._v("Good job!")]), t._v(" "), i("p", { staticClass: "txt2" }, [t._v("表现太棒了！")]), t._v(" "), i("div", { staticClass: "next", on: { click: function click(e) {
              return t.next(e);
            } } })])]) : t._e(), t._v(" "), t._m(0), t._v(" "), i("div", { staticClass: "back", on: { click: function click(e) {
              return t.back();
            } } })]);
      }, staticRenderFns: [function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { staticClass: "hv_tip" }, [e("div", { staticClass: "icon" }), this._v(" "), e("p", [this._v("请旋转至横屏，体验更佳")])]);
      }] };var W = i("VU/8")(X, H, !1, function (t) {
      i("JlDL");
    }, "data-v-17ce1f1b", null).exports,
        B = i("bOdI"),
        J = i.n(B),
        Y = i("DNVT"),
        Q = { name: "perfect", data: function data() {
        return { perfectStatus: this.showState };
      }, props: ["showState"], methods: { hidePerfect: function hidePerfect() {
          this.perfectStatus = !1, this.$parent.initPerfect();
        } }, watch: { showState: function showState(t, e) {
          t && (this.perfectStatus = !0, setTimeout(this.hidePerfect, 2400));
        } } },
        K = { render: function render() {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { directives: [{ name: "show", rawName: "v-show", value: this.perfectStatus, expression: "perfectStatus" }], staticClass: "toast_wrap" }, [e("div", { staticClass: "perfect" })]);
      }, staticRenderFns: [] };var Z,
        tt = i("VU/8")(Q, K, !1, function (t) {
      i("QSjF");
    }, "data-v-e2aa6ef0", null).exports,
        et = { name: "part2", components: { perject: tt }, data: function data() {
        return { swiperSlides: [], localIdArr: [], recordFlag: !1, localId: "", completeId: -1, perStatus: !1, isRecord: !1, canShowPerfect: !0, currentId: 0, part2_guide: !1, showFinish: !1 };
      }, mounted: function mounted() {
        var t = localStorage.getItem("extendAbcPart2Guide");this.part2_guide = !t;var e = this;this.setData(), this.localIdArr = [], new Y.a(".swiper-container", { loop: !1, observer: !0, on: { slideChange: function slideChange() {
              e.currentId = this.activeIndex, e.playAudio(this.activeIndex);
            } } }), this.shareConfig(), this.isRecord = !1, this.$nextTick(function () {
          document.addEventListener("visibilitychange", function () {
            e.isRecord = !1;
          });
        });
      }, watch: { swiperSlides: function swiperSlides(t) {} }, methods: (Z = { next: function next(t) {
          t && t.preventDefault(), this.$router.replace({ name: "Part", query: { id: this.next_id } });
        }, hideGuide: function hideGuide() {
          this.part2_guide = !1, localStorage.setItem("extendAbcPart2Guide", !0);
        }, back: function back() {
          var t = this.$route.query.id;this.$router.replace({ name: "Part", query: { id: t } });
        }, showPerject: function showPerject() {
          this.perStatus = !0, this.$refs.perfectAudio.play();
        }, initPerfect: function initPerfect() {
          this.perStatus = !1;
        }, onEnd: function onEnd() {
          this.swiperSlides[this.currentId].completed = !0, this.$set(this.swiperSlides, this.currentId, this.swiperSlides[this.currentId]);var t = !1,
              e = !0;this.swiperSlides.forEach(function (i) {
            if (e) {
              if (!i.completed) return t = !1, e = !1, !1;t = !0;
            }
          }), t && this.activeBook();
        }, activeBook: function activeBook() {
          var t = this,
              e = localStorage.getItem("extendAbcMemberid"),
              i = this.$route.query.id,
              s = this.$common.config.gzhUrl + "v3/marketingcourse/course/lesson-location",
              a = this.$common.getParam("get", { course_id: 2, member_id: e, lesson_id: i, location: 2 }),
              n = this;this.$axios.get(s + "?" + a).then(function (e) {
            if (200 == e.data.code) {
              if (e.data.data.is_finish) {
                var s = parseInt(localStorage.getItem("extendAbcLength"));if (i == s) t.$router.push({ name: "End" });else {
                  var a = "extendAbcFinish" + i;localStorage.getItem(a) || (t.showFinish = !0, t.next_id = parseInt(i) + 1, localStorage.setItem(a, !0));
                }
              }n.$router.replace({ name: "Transition", query: { id: n.$route.query.id, part: 3 } });
            }
          });
        }, playAudio: function playAudio(t) {
          this.stopVo(), this.completeId = this.currentId;var e = document.querySelector("#audio");e.src = this.swiperSlides[this.currentId].audio_url, e.play();
        }, setData: function setData() {
          var t = JSON.parse(window.localStorage.getItem("musicalContent"));for (var e in this.swiperSlides = t.book.book_pages, console.log(this.swiperSlides), this.swiperSlides) {
            this.swiperSlides[e].completed = !1;
          }
        }, startRecord: function startRecord() {
          this.stopVo(), this.recordFlag = !this.recordFlag, wx.ready(function () {
            wx.startRecord();
          });
        } }, J()(Z, "startRecord", function () {
        var t = document.querySelector("#audio"),
            e = this;wx.ready(function () {
          t.pause(), e.isRecord = !0, wx.startRecord();
        });
      }), J()(Z, "stopRecord", function () {
        var t = this;wx.ready(function () {
          wx.stopRecord({ success: function success(e) {
              t.showPerject(), t.isRecord = !1, t.localId = e.localId;
            } });
        });
      }), J()(Z, "playVo", function () {
        var t = this,
            e = document.querySelector("#audio");wx.ready(function () {
          e.pause(), wx.playVoice({ localId: t.localId });
        });
      }), J()(Z, "stopVo", function () {
        this.localId && wx.stopVoice({ localId: this.localId });
      }), J()(Z, "shareConfig", function () {
        var t = localStorage.getItem("extendAbcMemberid"),
            e = encodeURIComponent(window.location.href),
            i = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat",
            s = this.$common.getParam("get", { url: e, member_id: t }),
            a = window.location.origin + "/extend/letter/index.html",
            n = "零基础宝宝也能学会的字母课，26节课让孩子轻松爱上英语！",
            o = "AI动画互动课，孩子轻松掌握26个字母，养成良好阅读习惯，英文水平超车同龄宝宝~",
            r = "https://qnfile.abctime.com/extend/letter/letter_share.png";this.$axios.post(i + "?" + s).then(function (t) {
          if (200 == t.data.code) {
            var e = t.data.data;wx.config({ debug: !1, appId: e.appId, timestamp: e.timestamp, nonceStr: e.nonceStr, signature: e.signature, jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "startRecord", "stopRecord", "playVoice", "pauseVoice", "onVoiceRecordEnd", "onVoicePlayEnd"] }), wx.ready(function () {
              wx.checkJsApi({ jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "startRecord", "stopRecord", "playVoice", "pauseVoice", "onVoiceRecordEnd", "onVoicePlayEnd"], success: function success(t) {} }), wx.showMenuItems({ menuList: ["menuItem:share:appMessage", "menuItem:share:timeline"] }), wx.onMenuShareTimeline({ title: n, link: a, imgUrl: r, success: function success() {} }), wx.onMenuShareAppMessage({ title: n, desc: o, link: a, imgUrl: r, type: "link", dataUrl: "", success: function success() {} });
            });
          }
        });
      }), Z) },
        it = { render: function render() {
        var t = this,
            e = t.$createElement,
            i = t._self._c || e;return i("div", { staticClass: "part2" }, [i("div", { staticClass: "swiper-container_box" }, [i("div", { staticClass: "swiper-container" }, [i("div", { staticClass: "swiper-wrapper" }, t._l(t.swiperSlides, function (e, s) {
          return i("swiper-slide", { key: s, staticClass: "myslide" }, [i("img", { attrs: { src: e.pic_url } }), t._v(" "), i("div", { staticClass: "txt" }, [i("p", { domProps: { innerHTML: t._s(e.content) } })]), t._v(" "), i("audio", { staticClass: "Hidden", attrs: { id: "audio", src: e.audio_url, controls: "" }, on: { ended: function ended(e) {
                return t.onEnd(s);
              } } }), t._v(" "), i("div", { staticClass: "completed_icon", class: e.completed ? "" : "Hidden" })]);
        }), 1)])]), t._v(" "), i("div", { staticClass: "play_btn", on: { click: t.playAudio } }), t._v(" "), i("div", { staticClass: "back", on: { click: function click(e) {
              return t.back();
            } } }), t._v(" "), i("span", { staticClass: "page" }, [i("span", [t._v(t._s(t.currentId + 1))]), t._v("/" + t._s(t.swiperSlides.length))]), t._v(" "), i("audio", { ref: "perfectAudio", staticClass: "Hidden", attrs: { id: "perfectAudio", src: "https://qnfile.abctime.com/extend/audio/perfect_1.mp3", preload: "auto", controls: "" } }), t._v(" "), i("div", { staticClass: "audio_box" }, [i("div", { staticClass: "btn_record", on: { click: function click(e) {
              t.isRecord ? t.stopRecord() : t.startRecord();
            } } }), t._v(" "), i("div", { staticClass: "btn_repeat", on: { click: function click(e) {
              return t.playVo();
            } } })]), t._v(" "), i("perject", { attrs: { showState: t.perStatus } }), t._v(" "), t.part2_guide ? i("div", { staticClass: "part2_guide" }, [i("div", { on: { click: t.hideGuide } }, [t._v("知道了")])]) : t._e(), t._v(" "), t.showFinish ? i("div", { staticClass: "finish", on: { click: function click(e) {
              t.showFinish = !1;
            } } }, [i("div", { staticClass: "bg" }, [i("p", { staticClass: "txt1" }, [t._v("Good job!")]), t._v(" "), i("p", { staticClass: "txt2" }, [t._v("表现太棒了！")]), t._v(" "), i("div", { staticClass: "next", on: { click: function click(e) {
              return t.next(e);
            } } })])]) : t._e(), t._v(" "), t._m(0)], 1);
      }, staticRenderFns: [function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { staticClass: "hv_tip" }, [e("div", { staticClass: "icon" }), this._v(" "), e("p", [this._v("请旋转至横屏，体验更佳")])]);
      }] };var st = i("VU/8")(et, it, !1, function (t) {
      i("6p7K");
    }, "data-v-494e9c33", null).exports,
        at = { name: "Part3", data: function data() {
        return { imgTop1: 0, imgLeft1: 0, imgTop2: 0, imgLeft2: 0, senTop1: 0, senLeft1: 0, senTop2: 0, senLeft2: 0, posX: 0, posY: 0, quizArr: [{ title: "" }], gameArr: [], page: 0, titleSrc: "" };
      }, mounted: function mounted() {
        this.setData();
      }, methods: { back: function back() {
          var t = this.$route.query.id;this.$router.replace({ name: "Part", query: { id: t } });
        }, setData: function setData() {
          var t = JSON.parse(window.localStorage.getItem("musicalContent"));this.gameArr = t.game, this.playTitleAudio(this.gameArr[0].title);
        }, playTitleAudio: function playTitleAudio(t) {
          var e = document.querySelector("audio");this.titleSrc = t, this.$common.VL.isIpad() || this.$common.VL.isIphone() ? wx.ready(function () {
            e.play();
          }) : e.play();
        }, startDrag: function startDrag(t) {
          var e = t.target.className;console.log(e), e.indexOf("drag1") >= 0 ? (this.posX = this.imgLeft1, this.posY = this.imgTop1) : e.indexOf("drag2") >= 0 ? (this.posX = this.imgLeft2, this.posY = this.imgTop2) : e.indexOf("drag3") >= 0 ? (this.posX = this.senLeft1, this.posY = this.senTop1) : e.indexOf("drag4") >= 0 && (this.posX = this.senLeft2, this.posY = this.senTop2);
        }, ingDrag: function ingDrag(t) {
          var e = t.target.className;e.indexOf("drag1") >= 0 ? (this.imgLeft1 = this.posX + t.deltaX, this.imgTop1 = this.posY + t.deltaY) : e.indexOf("drag2") >= 0 ? (this.imgLeft2 = this.posX + t.deltaX, this.imgTop2 = this.posY + t.deltaY) : e.indexOf("drag3") >= 0 ? (this.senLeft1 = this.posX + t.deltaX, this.senTop1 = this.posY + t.deltaY) : e.indexOf("drag4") >= 0 && (this.senLeft2 = this.posX + t.deltaX, this.senTop2 = this.posY + t.deltaY);
        }, endDrag: function endDrag(t) {
          var e = parseInt(t.target.attributes.flag.value),
              i = t.target.className,
              s = this.page,
              a = t.target.offsetLeft,
              n = t.target.offsetTop,
              o = document.getElementsByClassName("default_1")[s].offsetLeft - document.getElementById("game").scrollLeft,
              r = document.getElementsByClassName("default_1")[s].offsetWidth,
              c = document.getElementsByClassName("default_1")[s].offsetTop,
              d = document.getElementsByClassName("default_1")[s].offsetHeight;if (a > o - a && a < o + r && n > c && n < c + d && e > 0) {
            if (this.playAudio("https://qnfile.abctime.com/right.mp3"), i.indexOf("drag1") >= 0) {
              this.imgLeft1 = this.posX + t.deltaX - (a - o), this.imgTop1 = this.posY + t.deltaY - (n - c);var l = this;setTimeout(function () {
                document.getElementsByClassName("default_1")[s].className = "default_1 active", l.imgLeft1 = 0, l.imgTop1 = 0, l.page++, l.playTitleAudio(l.gameArr[l.page].title), document.getElementById("game").scrollLeft += 500;
              }, 2e3);
            } else if (i.indexOf("drag2") >= 0) {
              this.imgLeft2 = this.posX + t.deltaX - (a - o), this.imgTop2 = this.posY + t.deltaY - (n - c);var u = this;setTimeout(function () {
                document.getElementsByClassName("default_1")[s].className = "default_1 active", u.imgLeft2 = 0, u.imgTop2 = 0, u.page++, u.playTitleAudio(u.gameArr[u.page].title), document.getElementById("game").scrollLeft += 500;
              }, 2e3);
            }
          } else this.playAudio("https://qnfile.abctime.com/wrong.mp3"), this.imgLeft1 = 0, this.imgTop1 = 0, this.imgLeft2 = 0, this.imgTop2 = 0;
        }, endDragSen: function endDragSen(t) {
          var e = parseInt(t.target.attributes.flag.value),
              i = t.target.className,
              s = this.page - 3,
              a = t.target.offsetLeft,
              n = t.target.offsetTop,
              o = document.getElementsByClassName("default_2")[s].offsetLeft - document.getElementById("game").scrollLeft,
              r = document.getElementsByClassName("default_2")[s].offsetWidth,
              c = document.getElementsByClassName("default_2")[s].offsetTop,
              d = document.getElementsByClassName("default_2")[s].offsetHeight;if (a > o - a && a < o + r && n > c && n < c + d && e > 0) {
            if (this.playAudio("https://qnfile.abctime.com/right.mp3"), i.indexOf("drag3") >= 0) {
              this.senLeft1 = this.posX + t.deltaX - (a - o), this.senTop1 = this.posY + t.deltaY - (n - c);var l = this;setTimeout(function () {
                document.getElementsByClassName("default_2")[s].className = "default_2 active", l.senLeft1 = 0, l.senTop1 = 0, l.page++, 5 == l.page && l.activeGame();
              }, 2e3);
            } else if (i.indexOf("drag4") >= 0) {
              this.playAudio("https://qnfile.abctime.com/right.mp3"), this.senLeft2 = this.posX + t.deltaX - (a - o), this.senTop2 = this.posY + t.deltaY - (n - c);var u = this;setTimeout(function () {
                document.getElementsByClassName("default_2")[s].className = "default_2 active", u.senLeft2 = 0, u.senTop2 = 0, u.page++, 5 == u.page && u.activeGame();
              }, 2e3);
            }
          } else this.playAudio("https://qnfile.abctime.com/wrong.mp3"), this.senLeft1 = 0, this.senTop1 = 0, this.senLeft2 = 0, this.senTop2 = 0;
        }, playAudio: function playAudio(t) {
          var e = document.querySelector("#audio");e.src = t, e.play();
        }, activeGame: function activeGame() {
          var t = this,
              e = localStorage.getItem("extendAbcMemberid"),
              i = this.$route.query.id,
              s = this.$common.config.gzhUrl + "v3/marketingcourse/course/lesson-location",
              a = this.$common.getParam("get", { course_id: 2, member_id: e, lesson_id: i, location: 3 }),
              n = this;this.$axios.get(s + "?" + a).then(function (e) {
            if (200 == e.data.code) {
              if (e.data.data.is_finish) {
                var s = parseInt(localStorage.getItem("extendAbcLength"));if (i == s) t.$router.push({ name: "End" });else {
                  var a = "extendAbcFinish" + i;localStorage.getItem(a) || (t.showFinish = !0, t.next_id = parseInt(i) + 1, localStorage.setItem(a, !0));
                }
              }n.$router.replace({ name: "Transition", query: { id: n.$route.query.id, part: 4 } });
            }
          });
        } } },
        nt = { render: function render() {
        var t = this,
            e = t.$createElement,
            i = t._self._c || e;return i("div", { staticClass: "game", attrs: { id: "game" } }, [i("div", { staticClass: "game_back", on: { click: function click(e) {
              return t.back();
            } } }), t._v(" "), i("div", { directives: [{ name: "show", rawName: "v-show", value: t.page < 3, expression: "page<3" }], staticClass: "game_play_btn", on: { click: function click(e) {
              return t.playAudio(t.gameArr[t.page].title);
            } } }), t._v(" "), i("audio", { staticClass: "Hidden", attrs: { id: "audio", src: t.titleSrc, controls: "" } }), t._v(" "), i("div", { staticClass: "game_que_box", attrs: { id: "game_que_box" } }, [i("ul", t._l(t.gameArr, function (e, s) {
          return i("li", { directives: [{ name: "show", rawName: "v-show", value: s <= t.page, expression: "$index <= page" }], class: s < 3 ? "default_1" : "default_2" }, [i("div", { directives: [{ name: "show", rawName: "v-show", value: s == t.page - 1, expression: "$index==page-1" }], staticClass: "game_icon_a" }), t._v(" "), s >= 3 && s == t.page ? i("div", { staticClass: "img_wrap" }, [i("img", { attrs: { src: e.title } })]) : t._e()]);
        }), 0)]), t._v(" "), t._l(t.gameArr, function (e, s) {
          return i("div", { directives: [{ name: "show", rawName: "v-show", value: s == t.page, expression: "$index == page" }], staticClass: "game_ans_box" }, [i("div", s < 3 ? [i("v-touch", { staticClass: "drag_img drag_img1 drag1", style: { top: t.imgTop1 + "px", left: t.imgLeft1 + "px" }, attrs: { flag: e.answer[0].is_answer }, on: { panstart: t.startDrag, panend: t.endDrag, panmove: t.ingDrag } }, [i("img", { attrs: { src: e.answer[0].content.path } })]), t._v(" "), i("v-touch", { staticClass: "drag_img drag_img2 drag2", style: { top: t.imgTop2 + "px", left: t.imgLeft2 + "px" }, attrs: { flag: e.answer[1].is_answer }, on: { panstart: t.startDrag, panend: t.endDrag, panmove: t.ingDrag } }, [i("img", { attrs: { src: e.answer[1].content.path } })])] : [i("v-touch", { staticClass: "drag_sen drag_sen1 drag3", style: { top: t.senTop1 + "px", left: t.senLeft1 + "px" }, attrs: { flag: e.answer[0].is_answer }, on: { panstart: t.startDrag, panend: t.endDragSen, panmove: t.ingDrag } }, [i("span", { staticClass: "icon", on: { click: function click(i) {
                return t.playAudio(e.answer[0].content.path);
              } } }), t._v(t._s(e.answer[0].content.subtitles) + "\n      ")]), t._v(" "), i("div", { staticClass: "touch_wrap twp1" }), t._v(" "), i("v-touch", { staticClass: "drag_sen drag_sen2 drag4", style: { top: t.senTop2 + "px", left: t.senLeft2 + "px" }, attrs: { flag: e.answer[1].is_answer }, on: { panstart: t.startDrag, panend: t.endDragSen, panmove: t.ingDrag } }, [i("span", { staticClass: "icon", on: { click: function click(i) {
                return t.playAudio(e.answer[1].content.path);
              } } }), t._v(t._s(e.answer[1].content.subtitles) + "\n      ")]), t._v(" "), i("div", { staticClass: "touch_wrap twp2" })], 1)]);
        }), t._v(" "), t._l(t.gameArr, function (e) {
          return i("div", { directives: [{ name: "show", rawName: "v-show", value: t.page > 4, expression: "page>4" }], staticClass: "game_ans_box" }, [i("div", { directives: [{ name: "show", rawName: "v-show", value: !t.gameArr[4].answer[0].is_answer, expression: "!gameArr[4].answer[0].is_answer" }], staticClass: "drag_sen drag_sen1 drag3", style: { top: t.senTop1 + "px", left: t.senLeft1 + "px" } }, [i("span", { staticClass: "icon" }), t._v(t._s(t.gameArr[4].answer[0].content.subtitles) + "\n    ")]), t._v(" "), i("div", { staticClass: "touch_wrap twp1" }), t._v(" "), i("div", { directives: [{ name: "show", rawName: "v-show", value: !t.gameArr[4].answer[1].is_answer, expression: "!gameArr[4].answer[1].is_answer" }], staticClass: "drag_sen drag_sen2 drag4", style: { top: t.senTop2 + "px", left: t.senLeft2 + "px" } }, [i("span", { staticClass: "icon" }), t._v(t._s(t.gameArr[4].answer[1].content.subtitles) + "\n    ")]), t._v(" "), i("div", { staticClass: "touch_wrap twp2" })]);
        })], 2);
      }, staticRenderFns: [] };var ot = i("VU/8")(at, nt, !1, function (t) {
      i("GNMY");
    }, "data-v-fadd1fb8", null).exports,
        rt = { name: "part4", components: { perject: tt }, data: function data() {
        return { songArr: [], tagArr: [!1, !1, !1, !1, !1, !1, !1, !1], localIdArr: [], recordFlag: !1, url: "", song_txt: "", currentId: -1, proLeft: 0, localId: "", perStatus: !1, isRecord: !1, saveInd: 0, part4_guide: !1, showFinish: !1, allTime: 0 };
      }, mounted: function mounted() {
        var t = localStorage.getItem("extendAbcPart4Guide");this.part4_guide = !t, this.setSrc(), this.localIdArr = [], this.shareConfig(), this.isRecord = !1;var e = this;this.$nextTick(function () {
          document.addEventListener("visibilitychange", function () {
            e.isRecord = !1;
          });
        });
      }, methods: { canPlay: function canPlay() {
          this.allTime = parseInt(this.$refs.video1.duration);
        }, next: function next(t) {
          t && t.preventDefault(), this.$router.replace({ name: "Part", query: { id: this.next_id } });
        }, back: function back() {
          var t = this.$route.query.id;this.$router.replace({ name: "Part", query: { id: t } });
        }, showPerfect: function showPerfect() {
          this.perStatus = !0, this.$refs.perfectAudio.play();
        }, initPerfect: function initPerfect() {
          this.perStatus = !1;
        }, setSrc: function setSrc() {
          var t = JSON.parse(window.localStorage.getItem("musicalContent"));this.url = t.song.ok_url;
        }, setData: function setData() {
          var t = JSON.parse(window.localStorage.getItem("musicalContent"));for (var e in this.songArr = t.song.resource, this.songArr) {
            this.songArr[e].completed = !1;
          }
        }, onPlay: function onPlay() {
          var t = this;wx.ready(function () {
            wx.stopRecord({ success: function success(e) {
                t.isRecord = !1;
              } });
          }), this.$refs.video1.currentTime = 0, this.$refs.video1.play(), this.startRecord();
        }, startRecord: function startRecord() {
          var t = this;wx.ready(function () {
            t.isRecord = !0, wx.startRecord();
          });
        }, onEnded: function onEnded() {
          this.stopRecord();
        }, stopRecord: function stopRecord() {
          this.$refs.video1.pause();var t = this;wx.ready(function () {
            wx.stopRecord({ success: function success(e) {
                t.showPerfect(), t.isRecord = !1, t.localId = e.localId;
              } });
          });
        }, playVo: function playVo() {
          var t = this;wx.ready(function () {
            wx.playVoice({ localId: t.localId });
          });
        }, shareConfig: function shareConfig() {
          var t = localStorage.getItem("extendAbcMemberid"),
              e = encodeURIComponent(window.location.href),
              i = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat",
              s = this.$common.getParam("get", { url: e, member_id: t }),
              a = window.location.origin + "/extend/letter/index.html",
              n = "零基础宝宝也能学会的字母课，26节课让孩子轻松爱上英语！",
              o = "AI动画互动课，孩子轻松掌握26个字母，养成良好阅读习惯，英文水平超车同龄宝宝~",
              r = "https://qnfile.abctime.com/extend/letter/letter_share.png";this.$axios.post(i + "?" + s).then(function (t) {
            if (200 == t.data.code) {
              var e = t.data.data;wx.config({ debug: !1, appId: e.appId, timestamp: e.timestamp, nonceStr: e.nonceStr, signature: e.signature, jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "startRecord", "stopRecord", "playVoice", "pauseVoice", "onVoiceRecordEnd", "onVoicePlayEnd"] }), wx.ready(function () {
                wx.checkJsApi({ jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "startRecord", "stopRecord", "playVoice", "pauseVoice", "onVoiceRecordEnd", "onVoicePlayEnd"], success: function success(t) {} }), wx.showMenuItems({ menuList: ["menuItem:share:appMessage", "menuItem:share:timeline"] }), wx.onMenuShareTimeline({ title: n, link: a, imgUrl: r, success: function success() {} }), wx.onMenuShareAppMessage({ title: n, desc: o, link: a, imgUrl: r, type: "link", dataUrl: "", success: function success() {} });
              });
            }
          });
        } } },
        ct = { render: function render() {
        var _attrs;

        var t = this,
            e = t.$createElement,
            i = t._self._c || e;return i("div", { staticClass: "part4" }, [i("div", { staticClass: "back", on: { click: function click(e) {
              return t.back();
            } } }), t._v(" "), i("div", { staticClass: "video_wrap" }, [i("video", { ref: "video1", attrs: (_attrs = { preload: !0, "x5-playsinline": "", playsinline: "", "webkit-playsinline": "", poster: "" }, (0, _defineProperty3.default)(_attrs, "preload", "auto"), (0, _defineProperty3.default)(_attrs, "src", t.url), _attrs), on: { ended: t.onEnded, canplay: t.canPlay } })]), t._v(" "), i("div", { staticClass: "record_box" }, [i("div", { staticClass: "btn_record" }), t._v(" "), i("div", { staticClass: "start_record", on: { click: t.onPlay } }), t._v(" "), i("div", { staticClass: "btn_repeat", on: { click: function click(e) {
              return t.playVo();
            } } })]), t._v(" "), i("audio", { ref: "perfectAudio", staticClass: "Hidden", attrs: { id: "perfectAudio", src: "https://qnfile.abctime.com/extend/audio/perfect_1.mp3", preload: "auto", controls: "" } }), t._v(" "), i("perject", { attrs: { showState: t.perStatus } }), t._v(" "), t.showFinish ? i("div", { staticClass: "finish", on: { click: function click(e) {
              t.showFinish = !1;
            } } }, [i("div", { staticClass: "bg" }, [i("p", { staticClass: "txt1" }, [t._v("Good job!")]), t._v(" "), i("p", { staticClass: "txt2" }, [t._v("表现太棒了！")]), t._v(" "), i("div", { staticClass: "next", on: { click: function click(e) {
              return t.next(e);
            } } })])]) : t._e(), t._v(" "), t._m(0)], 1);
      }, staticRenderFns: [function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { staticClass: "hv_tip" }, [e("div", { staticClass: "icon" }), this._v(" "), e("p", [this._v("请旋转至横屏，体验更佳")])]);
      }] };var dt = i("VU/8")(rt, ct, !1, function (t) {
      i("zAD8");
    }, "data-v-1035690d", null).exports,
        lt = { name: "part4", components: { perject: tt }, data: function data() {
        return { songArr: [], tagArr: [!1, !1, !1, !1, !1, !1, !1, !1], localIdArr: [], recordFlag: !1, url: "", song_txt: "", currentId: -1, proLeft: 0, localId: "", perStatus: !1, isRecord: !1, saveInd: 0, part4_guide: !1, showFinish: !1 };
      }, mounted: function mounted() {
        var t = localStorage.getItem("extendAbcPart4Guide");this.part4_guide = !t, this.setSrc(), this.localIdArr = [], this.shareConfig(), this.isRecord = !1;var e = this;this.$nextTick(function () {
          document.addEventListener("visibilitychange", function () {
            e.isRecord = !1;
          });
        });
      }, watch: { songUrl: function songUrl(t) {
          var e = this;t && e.$nextTick(function () {
            e.$refs.audio.play();
          });
        } }, methods: { next: function next(t) {
          t && t.preventDefault(), this.$router.replace({ name: "Part", query: { id: this.next_id } });
        }, hideGuide: function hideGuide() {
          this.part4_guide = !1, localStorage.setItem("extendAbcPart4Guide", !0);
        }, back: function back() {
          var t = this.$route.query.id;this.$router.replace({ name: "Part", query: { id: t } });
        }, showPerfect: function showPerfect() {
          this.perStatus = !0, this.$refs.perfectAudio.play();
        }, initPerfect: function initPerfect() {
          this.perStatus = !1;
        }, setSrc: function setSrc() {
          var t = JSON.parse(window.localStorage.getItem("musicalContent"));this.url = t.song.url;
        }, activeSong: function activeSong() {
          var t = this,
              e = localStorage.getItem("extendAbcMemberid"),
              i = this.$route.query.id,
              s = this.$common.config.gzhUrl + "v3/marketingcourse/course/lesson-location",
              a = this.$common.getParam("get", { course_id: 2, member_id: e, lesson_id: i, location: 4 });this.$axios.get(s + "?" + a).then(function (e) {
            if (200 == e.data.code && e.data.data.is_finish) {
              var s = parseInt(localStorage.getItem("extendAbcLength"));if (console.log("len", s), i == s) t.$router.push({ name: "End" });else {
                var a = "extendAbcFinish" + i;localStorage.getItem(a) || (t.showFinish = !0, t.next_id = parseInt(i) + 1, localStorage.setItem(a, !0));
              }
            }
          });
        }, setData: function setData() {
          var t = JSON.parse(window.localStorage.getItem("musicalContent"));for (var e in this.songArr = t.song.resource, this.songArr) {
            this.songArr[e].completed = !1;
          }
        }, startRecord: function startRecord() {
          var t = this;wx.ready(function () {
            t.pauseAudio(), t.isRecord = !0, wx.startRecord();
          });
        }, stopRecord: function stopRecord() {
          var t = this;wx.ready(function () {
            wx.stopRecord({ success: function success(e) {
                t.showPerfect(), t.isRecord = !1, t.localId = e.localId;
              } });
          });
        }, playVo: function playVo() {
          var t = this;wx.ready(function () {
            t.pauseAudio(), wx.playVoice({ localId: t.localId });
          });
        }, shareConfig: function shareConfig() {
          var t = localStorage.getItem("extendAbcMemberid"),
              e = encodeURIComponent(window.location.href),
              i = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat",
              s = this.$common.getParam("get", { url: e, member_id: t }),
              a = window.location.origin + "/extend/letter/index.html",
              n = "零基础宝宝也能学会的字母课，26节课让孩子轻松爱上英语！",
              o = "AI动画互动课，孩子轻松掌握26个字母，养成良好阅读习惯，英文水平超车同龄宝宝~",
              r = "https://qnfile.abctime.com/extend/letter/letter_share.png";this.$axios.post(i + "?" + s).then(function (t) {
            if (200 == t.data.code) {
              var e = t.data.data;wx.config({ debug: !1, appId: e.appId, timestamp: e.timestamp, nonceStr: e.nonceStr, signature: e.signature, jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "startRecord", "stopRecord", "playVoice", "pauseVoice", "onVoiceRecordEnd", "onVoicePlayEnd"] }), wx.ready(function () {
                wx.checkJsApi({ jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "startRecord", "stopRecord", "playVoice", "pauseVoice", "onVoiceRecordEnd", "onVoicePlayEnd"], success: function success(t) {} }), wx.showMenuItems({ menuList: ["menuItem:share:appMessage", "menuItem:share:timeline"] }), wx.onMenuShareTimeline({ title: n, link: a, imgUrl: r, success: function success() {} }), wx.onMenuShareAppMessage({ title: n, desc: o, link: a, imgUrl: r, type: "link", dataUrl: "", success: function success() {} });
              });
            }
          });
        } } },
        ut = { render: function render() {
        var t = this,
            e = t.$createElement,
            i = t._self._c || e;return i("div", { staticClass: "part4" }, [i("div", { staticClass: "back", on: { click: function click(e) {
              return t.back();
            } } }), t._v(" "), i("div", { staticClass: "video_wrap" }, [i("video", { ref: "video1", attrs: { preload: !0, autoplay: "", controls: "", "x5-video-player-type": "h5", "x5-video-orientation": "landscape", src: t.url }, on: { ended: t.activeSong } })]), t._v(" "), i("audio", { ref: "perfectAudio", staticClass: "Hidden", attrs: { id: "perfectAudio", src: "https://qnfile.abctime.com/extend/audio/perfect_1.mp3", preload: "auto", controls: "" } }), t._v(" "), i("perject", { attrs: { showState: t.perStatus } }), t._v(" "), t.showFinish ? i("div", { staticClass: "finish", on: { click: function click(e) {
              t.showFinish = !1;
            } } }, [i("div", { staticClass: "bg" }, [i("p", { staticClass: "txt1" }, [t._v("Good job!")]), t._v(" "), i("p", { staticClass: "txt2" }, [t._v("表现太棒了！")]), t._v(" "), i("div", { staticClass: "next", on: { click: function click(e) {
              return t.next(e);
            } } })])]) : t._e(), t._v(" "), t._m(0)], 1);
      }, staticRenderFns: [function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { staticClass: "hv_tip" }, [e("div", { staticClass: "icon" }), this._v(" "), e("p", [this._v("请旋转至横屏，体验更佳")])]);
      }] };var mt = i("VU/8")(lt, ut, !1, function (t) {
      i("vrUX");
    }, "data-v-11a4e6fe", null).exports,
        ht = { name: "Part", data: function data() {
        return { titleTxt: "" };
      }, created: function created() {}, mounted: function mounted() {}, methods: { next: function next() {
          var t = parseInt(this.$route.query.id) + 1;this.$router.replace({ name: "Part", query: { id: t } });
        } } },
        pt = { render: function render() {
        var t = this,
            e = t.$createElement,
            i = t._self._c || e;return i("div", { staticClass: "finish" }, [i("div", { staticClass: "bg" }, [i("p", { staticClass: "txt1" }, [t._v("Good job!")]), t._v(" "), i("p", { staticClass: "txt2" }, [t._v("表现太棒了！")]), t._v(" "), i("div", { staticClass: "next", on: { click: function click(e) {
              return t.next();
            } } })])]);
      }, staticRenderFns: [] };var gt = i("VU/8")(ht, pt, !1, function (t) {
      i("ABZv");
    }, null, null).exports,
        vt = { name: "End", components: { hv: g }, data: function data() {
        return { posterImg: "", wrapShow: !1, loadStatus: !0, lesson_name: "The Clever Xylophone" };
      }, created: function created() {}, mounted: function mounted() {
        this.createQrcode(location.origin + "/extend/letter/index.html");
      }, methods: { getPoster: function getPoster() {
          this.showWrap(), this.createPoster("2222");
        }, showWrap: function showWrap() {
          this.wrapShow = !0;
        }, createQrcode: function createQrcode(t) {
          console.log(t);var e = document.getElementById("qrcodeImg"),
              i = 54 * document.documentElement.clientWidth / 1334;e.innerHTML = "", new S.a(e, { width: i, height: i, colorDark: "#000000", colorLight: "#ffffff", correctLevel: S.a.CorrectLevel.H }).makeCode(t), this.getPoster();
        }, createPoster: function createPoster(t) {
          var e = document.getElementById("posterHtml"),
              i = e.offsetWidth,
              s = e.offsetHeight,
              a = document.createElement("canvas"),
              n = window.devicePixelRatio;a.width = i * n, a.height = s * n, a.style.width = i + "px", a.style.height = s + "px", a.getContext("2d").scale(n, n);var o = this;console.log(e.offsetWidth), I()(e, { canvas: a, useCORS: !0, allowTaint: !0, logging: !1, letterRendering: !0, scale: n, onclone: function onclone(t) {
              t.querySelector("#posterHtml").style.display = "block";
            } }).then(function (t) {
            o.loadStatus = !1, o.posterImg = t.toDataURL("image/png");
          });
        } } },
        ft = { render: function render() {
        var t = this,
            e = t.$createElement,
            i = t._self._c || e;return i("div", { staticClass: "end" }, [i("div", { staticClass: "poster_wrap" }, [i("div", { staticClass: "poster", attrs: { id: "posterHtml" } }, [t._m(0), t._v(" "), t._m(1), t._v(" "), i("p", { staticClass: "txt_p" }, [t._v("恭喜你！完成《" + t._s(t.lesson_name) + "》全部单元课程！")]), t._v(" "), i("div", { attrs: { id: "qrcodeImg" } })])]), t._v(" "), i("div", { directives: [{ name: "show", rawName: "v-show", value: t.wrapShow, expression: "wrapShow" }], staticClass: "wrap" }, [i("img", { directives: [{ name: "show", rawName: "v-show", value: !t.loadStatus, expression: "!loadStatus" }], staticClass: "posterImg", attrs: { src: t.posterImg, alt: "" } }), t._v(" "), i("p", { directives: [{ name: "show", rawName: "v-show", value: !t.loadStatus, expression: "!loadStatus" }], staticClass: "save_txt" }, [t._v("长按图片保存奖状")]), t._v(" "), i("div", { directives: [{ name: "show", rawName: "v-show", value: t.loadStatus, expression: "loadStatus" }], staticClass: "loading" }, [t._m(2), t._v(" "), i("p", [t._v("海报生成中...")])])])]);
      }, staticRenderFns: [function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { staticClass: "pic_wrap" }, [e("img", { staticClass: "pic", attrs: { src: "https://qnfile.abctime.com/extend/letter/A.png" } })]);
      }, function () {
        var t = this,
            e = t.$createElement,
            i = t._self._c || e;return i("ul", { staticClass: "txt_box" }, [i("li", [i("p", [t._v("核心单词"), i("br"), i("span", [t._v("18")])])]), t._v(" "), i("li", [i("p", [t._v("常用句型"), i("br"), i("span", [t._v("11")])])]), t._v(" "), i("li", [i("p", [t._v("掌握乐器"), i("br"), i("span", [t._v("5")])])])]);
      }, function () {
        var t = this,
            e = t.$createElement,
            i = t._self._c || e;return i("div", { staticClass: "spinner" }, [i("div", { staticClass: "spinner-container container1" }, [i("div", { staticClass: "circle1" }), t._v(" "), i("div", { staticClass: "circle2" }), t._v(" "), i("div", { staticClass: "circle3" }), t._v(" "), i("div", { staticClass: "circle4" })]), t._v(" "), i("div", { staticClass: "spinner-container container2" }, [i("div", { staticClass: "circle1" }), t._v(" "), i("div", { staticClass: "circle2" }), t._v(" "), i("div", { staticClass: "circle3" }), t._v(" "), i("div", { staticClass: "circle4" })]), t._v(" "), i("div", { staticClass: "spinner-container container3" }, [i("div", { staticClass: "circle1" }), t._v(" "), i("div", { staticClass: "circle2" }), t._v(" "), i("div", { staticClass: "circle3" }), t._v(" "), i("div", { staticClass: "circle4" })])]);
      }] };var _t = i("VU/8")(vt, ft, !1, function (t) {
      i("yyjV");
    }, "data-v-1023c712", null).exports,
        wt = { name: "Order", components: { eject: m }, data: function data() {
        return { goodsObj: { product_name: "ABC Reading月卡会员", discount_money: 40, price: 38, original_price: 78, goods_type: 3, product_id: 102, order_sn: 0 }, goodsType: 1, canGroup: !0, ejectText: "", ejectStatus: !1 };
      }, created: function created() {}, mounted: function mounted() {
        this.getInfo(), this.shareConfig();
      }, methods: { getInfo: function getInfo() {
          var t = this.$route.query.type;this.goodsType = t;var e = localStorage.getItem("monthCardCollageMemberid"),
              i = this.$common.config.gzhUrl + "v3/group/month-card/buy",
              s = { type: t, act_id: this.$route.query.aid || 5, member_id: e };this.$route.query.vid > 0 ? s.view_member_id = this.$route.query.vid : delete s.view_member_id;var a = this.$common.getParam("get", s),
              n = this;this.$axios.get(i + "?" + a).then(function (t) {
            200 == t.data.code ? n.goodsObj = t.data.data : 11005 == t.data.code ? (n.canGroup = !1, n.showEject(t.data.msg)) : n.showEject(t.data.msg);
          });
        }, pay: function pay() {
          var t = this.$route.query.type,
              e = localStorage.getItem("monthCardCollageMemberid"),
              i = localStorage.getItem("monthCardCollageOpenid"),
              s = localStorage.getItem("monthCardCollagePhone"),
              a = this.$route.query.sid || 109,
              n = this.$route.query.aid || 5,
              o = { member_id: e, openid: i, phone: s, goods_num: 1, total_price: this.goodsObj.original_price, discount_money: this.goodsObj.discount_money, money_paid: this.goodsObj.price, goods_name: this.goodsObj.product_name, payment_type: 3, pay_type: 3, trade_type: "JSAPI", source_id: a, act_id: n };1 == t ? o.product_id = 104 : 2 == t && (o.product_id = 105), o.parent_order_no = 0, this.$route.query.vid && this.canGroup ? o.parent_order_no = this.goodsObj.order_sn || 0 : delete o.parent_order_no, 2 == t && this.canGroup ? o.is_group = 1 : o.is_group = 0;var r = this,
              c = this.$common.getParam("get", o),
              d = this.$common.config.gzhUrl + "v3/pay/order/gzh-add";this.$axios.post(d, c, { headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" } }).then(function (e) {
            if (200 == e.data.code) {
              var i = e.data.data;wx.chooseWXPay({ timestamp: i.pay.timeStamp, nonceStr: i.pay.nonceStr, package: i.pay.package, signType: i.pay.signType, paySign: i.pay.paySign, success: function success(e) {
                  window.localStorage.setItem("sucTag", 1), 2 == t && r.canGroup ? window.localStorage.setItem("type", t) : window.localStorage.setItem("type", 1), r.$router.push({ name: "Collage" });
                } });
            } else r.showEject(e.data.msg);
          });
        }, showEject: function showEject(t) {
          this.ejectText = t, this.ejectStatus = !0;
        }, initEject: function initEject() {
          this.ejectStatus = !1;
        }, shareConfig: function shareConfig() {
          var t = localStorage.getItem("monthCardCollageMemberid"),
              e = encodeURIComponent(window.location.href),
              i = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat",
              s = this.$common.getParam("get", { url: e, member_id: t });this.$axios.post(i + "?" + s).then(function (t) {
            if (200 == t.data.code) {
              var e = t.data.data;wx.config({ debug: !1, appId: e.appId, timestamp: e.timestamp, nonceStr: e.nonceStr, signature: e.signature, jsApiList: ["hideMenuItems"] }), wx.ready(function () {
                wx.checkJsApi({ jsApiList: ["hideMenuItems"], success: function success(t) {} }), wx.hideMenuItems({ menuList: ["menuItem:share:timeline", "menuItem:share:appMessage"] });
              });
            }
          });
        } } },
        xt = { render: function render() {
        var t = this,
            e = t.$createElement,
            i = t._self._c || e;return i("div", { staticClass: "order" }, [i("div", { staticClass: "order_container" }, [i("div", { staticClass: "bg" }), t._v(" "), i("div", { staticClass: "form_box" }, [i("ul", { staticClass: "list" }, [i("li", { staticClass: "goods" }, [i("div", [t._v("购买商品")]), t._v(" "), i("span", [t._v(t._s(t.goodsObj.product_name) + " >")])]), t._v(" "), i("li", { staticClass: "price" }, [i("div", [t._v("原价")]), t._v(" "), i("span", [t._v("¥" + t._s(t.goodsObj.original_price))])]), t._v(" "), i("li", { staticClass: "discount" }, [i("div", [t._v("优惠")]), t._v(" "), i("span", [t._v("-¥" + t._s(t.goodsObj.discount_money))])]), t._v(" "), i("li", { staticClass: "money_paid" }, [i("div", [t._v("实付金额")]), t._v(" "), i("span", [t._v("¥" + t._s(t.goodsObj.price))])])]), t._v(" "), i("p", { directives: [{ name: "show", rawName: "v-show", value: 2 == t.goodsType && t.canGroup, expression: "goodsType == 2 && canGroup" }], staticClass: "collage_tag" }, [i("span", { staticClass: "icon" }), t._v("若超时未拼团成功，付款金额自动原路退回！")]), t._v(" "), i("p", { directives: [{ name: "show", rawName: "v-show", value: 2 == t.goodsType && !t.canGroup, expression: "goodsType == 2 && !canGroup" }], staticClass: "collage_tag" }, [i("span", { staticClass: "icon" }), t._v("已拼团，原价购买商品！")]), t._v(" "), i("div", { staticClass: "btn", on: { click: t.pay } }, [i("span", { staticClass: "icon" }), i("span", [t._v("确认支付")])])]), t._v(" "), t._m(0), t._v(" "), i("div", { staticClass: "ft_box" })]), t._v(" "), i("eject", { attrs: { message: t.ejectText, showState: t.ejectStatus } })], 1);
      }, staticRenderFns: [function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { staticClass: "txt_box" }, [e("p", [this._v("购买成功后，下载“ABC Reading美国小学图书馆”APP")]), this._v(" "), e("p", [this._v("输入购买时使用的手机号，即可享受月卡会员权益")])]);
      }] };i("VU/8")(wt, xt, !1, function (t) {
      i("fORW");
    }, "data-v-34efb9a8", null).exports;s.a.use(d.a);var bt = new d.a({ routes: [{ path: "/", name: "Index", component: _ }, { path: "/index", name: "Index", component: _ }, { path: "/pay", name: "Pay", component: k }, { path: "/partOne", name: "PartOne", component: W }, { path: "/partTwo", name: "PartTwo", component: st }, { path: "/partThree", name: "PartThree", component: ot }, { path: "/partFour", name: "PartFour", component: dt }, { path: "/partFive", name: "PartFive", component: mt }, { path: "/suc", name: "Suc", component: E }, { path: "/cata", name: "Cata", component: q }, { path: "/trans", name: "Transition", component: O }, { path: "/part", name: "Part", component: D }, { path: "/finish", name: "Finish", component: gt }, { path: "/end", name: "End", component: _t }, { path: "/login", name: "Login", component: b }] }),
        yt = i("pFYg"),
        St = i.n(yt),
        Ct = { baseUrl: "http://dev.api.abctime.com/", gzhUrl: "http://dev.gzh.abctime.com/", sign_key: "GriE93gIGp$5bDjQ4rc20FzxWGghTIau", postConfig: { headers: { "Content-Type": "multipart/form-data" } } },
        It = navigator.userAgent.toLowerCase();function $t(t) {
      var e = 8,
          i = 0;function s(t, e) {
        var i = (65535 & t) + (65535 & e);return (t >> 16) + (e >> 16) + (i >> 16) << 16 | 65535 & i;
      }function a(t, e) {
        return t >>> e | t << 32 - e;
      }function n(t, e) {
        return t >>> e;
      }function o(t, e, i) {
        return t & e ^ ~t & i;
      }function r(t, e, i) {
        return t & e ^ t & i ^ e & i;
      }function c(t) {
        return a(t, 2) ^ a(t, 13) ^ a(t, 22);
      }function d(t) {
        return a(t, 6) ^ a(t, 11) ^ a(t, 25);
      }function l(t) {
        return a(t, 7) ^ a(t, 18) ^ n(t, 3);
      }return function (t) {
        for (var e = i ? "0123456789ABCDEF" : "0123456789abcdef", s = "", a = 0; a < 4 * t.length; a++) {
          s += e.charAt(t[a >> 2] >> 8 * (3 - a % 4) + 4 & 15) + e.charAt(t[a >> 2] >> 8 * (3 - a % 4) & 15);
        }return s;
      }(function (t, e) {
        var i,
            u,
            m,
            h,
            p,
            g,
            v,
            f,
            _,
            w,
            x,
            b = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298),
            y = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225),
            S = new Array(64);t[e >> 5] |= 128 << 24 - e % 32, t[15 + (e + 64 >> 9 << 4)] = e;for (var C = 0; C < t.length; C += 16) {
          i = y[0], u = y[1], m = y[2], h = y[3], p = y[4], g = y[5], v = y[6], f = y[7];for (var I = 0; I < 64; I++) {
            S[I] = I < 16 ? t[I + C] : s(s(s(a(x = S[I - 2], 17) ^ a(x, 19) ^ n(x, 10), S[I - 7]), l(S[I - 15])), S[I - 16]), _ = s(s(s(s(f, d(p)), o(p, g, v)), b[I]), S[I]), w = s(c(i), r(i, u, m)), f = v, v = g, g = p, p = s(h, _), h = m, m = u, u = i, i = s(_, w);
          }y[0] = s(i, y[0]), y[1] = s(u, y[1]), y[2] = s(m, y[2]), y[3] = s(h, y[3]), y[4] = s(p, y[4]), y[5] = s(g, y[5]), y[6] = s(v, y[6]), y[7] = s(f, y[7]);
        }return y;
      }(function (t) {
        for (var i = Array(), s = (1 << e) - 1, a = 0; a < t.length * e; a += e) {
          i[a >> 5] |= (t.charCodeAt(a / e) & s) << 24 - a % 32;
        }return i;
      }(t = function (t) {
        t = t.replace(/\r\n/g, "\n");for (var e = "", i = 0; i < t.length; i++) {
          var s = t.charCodeAt(i);s < 128 ? e += String.fromCharCode(s) : s > 127 && s < 2048 ? (e += String.fromCharCode(s >> 6 | 192), e += String.fromCharCode(63 & s | 128)) : (e += String.fromCharCode(s >> 12 | 224), e += String.fromCharCode(s >> 6 & 63 | 128), e += String.fromCharCode(63 & s | 128));
        }return e;
      }(t)), t.length * e));
    }var At = { config: Ct, VL: { isWechat: function isWechat() {
          return "micromessenger" == It.match(/MicroMessenger/i);
        }, isIphone: function isIphone() {
          return It.indexOf("iphone") >= 0;
        }, isIpad: function isIpad() {
          return It.indexOf("ipad") >= 0;
        }, phNum: function phNum(t) {
          return !!/^1[3456789]\d{9}$/.test(t);
        }, getRequest: function getRequest() {
          var t = decodeURIComponent(location.search),
              e = new Object();if (-1 != t.indexOf("?")) for (var i = t.substr(1).split("&"), s = 0; s < i.length; s++) {
            e[i[s].split("=")[0]] = unescape(i[s].split("=")[1]);
          }return e;
        } }, getParam: function getParam(t, e, i) {
        i = Ct.sign_key;var s = [],
            a = [],
            n = [],
            o = [];if (e.version || (e.version = 2), e.act_id = 5, e.source_id = 109, "post" == t) {
          for (var r in e) {
            s.push(r), a.push(e[r]), "object" != St()(e[r]) && n.push(r + e[r]);
          }var c = n.sort().join("~").replace(/~/g, "") + i;return e.sign = $t(c), e;
        }if ("get" == t) {
          for (var r in delete e.sign, e) {
            n.push(r + e[r]), o.push(r + "=" + e[r] + "&");
          }var d = $t(c = n.sort().join("~").replace(/~/g, "") + i);return o.sort().join("~").replace(/~/g, "") + "sign=" + d;
        }
      }, GetRequest: function GetRequest() {
        var t = decodeURIComponent(location.search),
            e = new Object();if (-1 != t.indexOf("?")) {
          var i = t.substr(1);strs = i.split("&");for (var s = 0; s < strs.length; s++) {
            e[strs[s].split("=")[0]] = unescape(strs[s].split("=")[1]);
          }
        }return e;
      }, timestampToTime: function timestampToTime(t) {
        var e = new Date(1e3 * t),
            i = e.getFullYear() + ".",
            s = (e.getMonth() + 1 < 10 ? "0" + (e.getMonth() + 1) : e.getMonth() + 1) + ".",
            a = e.getDate() + " ";e.getHours(), e.getMinutes(), e.getSeconds();return i + s + a;
      }, fixTop: function fixTop(t) {
        var e = t.offsetTop;document.onscroll = function () {
          var i = document.body.scrollTop || document.documentElement.scrollTop;t.setAttribute("data-fixed", i >= e ? "fixed" : "");
        };
      }, share: function share(t, e, i) {
        var s = [];s = 1 == i ? ["hideMenuItems"] : ["onMenuShareTimeline", "onMenuShareAppMessage", "chooseWXPay", "hideMenuItems"], requestGet(t, { url: encodeURIComponent(window.location.href) }, function (t) {
          if (200 == t.code) {
            var a = t.data.appId,
                n = t.data.nonceStr,
                o = t.data.timestamp,
                r = t.data.signature;wx.config({ debug: !1, appId: a, timestamp: o, nonceStr: n, signature: r, jsApiList: s }), wx.ready(function () {
              wx.checkJsApi({ jsApiList: s, success: function success(t) {} }), 1 == i ? wx.hideMenuItems({ menuList: ["menuItem:share:timeline", "menuItem:copyUrl", "menuItem:share:appMessage", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:editTag", "menuItem:delete", "menuItem:copyUrl", "menuItem:originPage", "menuItem:readMode", "menuItem:openWithQQBrowser", "menuItem:openWithSafari", "menuItem:share:email", "menuItem:share:brand"] }) : (wx.onMenuShareTimeline({ title: e.title, link: e.link, imgUrl: e.imgUrl, success: function success() {} }), wx.onMenuShareAppMessage({ title: e.title, desc: e.desc, link: e.link, imgUrl: e.imgUrl, type: "link", dataUrl: "", success: function success() {} })), wx.error(function (t) {
                console.log("err", t);
              });
            });
          }
        }, function (t) {
          console.log(t);
        });
      } },
        jt = i("7QTg"),
        Tt = i.n(jt),
        kt = i("I0MY"),
        Pt = i.n(kt);s.a.use(Tt.a), s.a.use(Pt.a, { name: "v-touch" }), s.a.config.productionTip = !1, s.a.prototype.$axios = n.a, s.a.prototype.$common = At, bt.beforeEach(function (t, e, i) {
      var s = ["Part", "PartOne", "PartTwo", "PartFour", "PartFive", "Finish", "PartThree", "Cata", "Transition", "End"];if (s.indexOf(t.name) < 0 && [].indexOf(t.name) < 0) {
        var a = function a() {
          (n = document.documentElement.clientWidth) > 768 && (n = 768), n < 320 && (n = 320), o = (625 * n / r).toFixed(2), console.log(o), document.documentElement.style.fontSize = o + "%";
        },
            n = void 0,
            o = void 0,
            r = void 0;r = 750, a(), window.addEventListener("resize", a, !1);
      } else if (s.indexOf(t.name) >= 0) {
        var c = function c() {
          (d = document.documentElement.clientWidth) > 1024 && (d = 1024), d < 568 && (d = 568), l = (625 * d / u).toFixed(2), document.documentElement.style.fontSize = l + "%";
        },
            d = void 0,
            l = void 0,
            u = void 0;u = 1334, c(), window.addEventListener("resize", c, !1);
      } else {
        var m = function m() {
          (h = document.documentElement.clientHeight) > 768 && (h = 768), h < 320 && (h = 320), p = (625 * h / g).toFixed(2), console.log(p), document.documentElement.style.fontSize = p + "%";
        },
            h = void 0,
            p = void 0,
            g = void 0;g = 750, m(), window.addEventListener("resize", m, !1);
      }var v = At.VL.getRequest().openid || window.localStorage.getItem("extendAbcOpenid") || "",
          f = At.VL.getRequest().member_id || window.localStorage.getItem("extendAbcMemberid") || "";if (v && f) return window.localStorage.setItem("extendAbcOpenid", v), window.localStorage.setItem("extendAbcMemberid", f), i(), !1;window.location.href = At.config.gzhUrl + "v3/wechat/wechat/grant?state=H5&url=" + encodeURIComponent(window.location.origin + "/extend/music/index.html" + window.location.search);
    }), new s.a({ el: "#app", router: bt, components: { App: c }, template: "<App/>" });
  }, OXY6: function OXY6(t, e, i) {
    t.exports = i.p + "static/img/index_qa4.cf6d2a9.png";
  }, QSjF: function QSjF(t, e) {}, Thu1: function Thu1(t, e, i) {
    t.exports = i.p + "static/img/info_small.6adc3c0.png";
  }, Zzzc: function Zzzc(t, e, i) {
    t.exports = i.p + "static/img/index_qa1.8f2fbf3.png";
  }, bP4k: function bP4k(t, e) {}, bz75: function bz75(t, e, i) {
    t.exports = i.p + "static/img/index_con1_3.e39f85d.png";
  }, cA0y: function cA0y(t, e, i) {
    t.exports = i.p + "static/img/index_con1_2.fd0ebaf.png";
  }, d5EC: function d5EC(t, e) {}, fORW: function fORW(t, e) {}, hyyX: function hyyX(t, e) {}, ia2c: function ia2c(t, e, i) {
    t.exports = i.p + "static/img/index_con1_1.30af89a.png";
  }, ioFd: function ioFd(t, e) {}, mOeM: function mOeM(t, e, i) {
    t.exports = i.p + "static/img/collage_banner.1e8b8e9.png";
  }, nFDG: function nFDG(t, e) {}, qRts: function qRts(t, e, i) {
    t.exports = i.p + "static/img/index_con1_4.7172e12.png";
  }, rKkn: function rKkn(t, e) {}, rqmu: function rqmu(t, e) {}, "urT/": function urT(t, e, i) {
    t.exports = i.p + "static/img/index_qa3.0286ada.png";
  }, vrUX: function vrUX(t, e) {}, yg4f: function yg4f(t, e, i) {
    t.exports = i.p + "static/img/index_con4.db53a59.png";
  }, yyjV: function yyjV(t, e) {}, zAD8: function zAD8(t, e) {} }, ["NHnr"]);
//# sourceMappingURL=app.93a62de2708ba1ddc63f.js.map
//# sourceMappingURL=app.93a62de2708ba1ddc63f.js.map