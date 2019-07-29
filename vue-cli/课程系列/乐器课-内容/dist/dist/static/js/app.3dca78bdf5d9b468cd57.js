"use strict";

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

webpackJsonp([1], { "+Fy0": function Fy0(t, e) {}, "8ZZI": function ZZI(t, e) {}, B9x8: function B9x8(t, e) {}, ECxy: function ECxy(t, e) {}, MBBj: function MBBj(t, e) {}, NHnr: function NHnr(t, e, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", { value: !0 });var s = i("7+uW"),
        a = i("mtWM"),
        n = i.n(a),
        o = { name: "App", provide: function provide() {
        return { reload: this.reload };
      }, data: function data() {
        return { isRouterAlive: !0 };
      }, created: function created() {
        this.wxConfig();
      }, methods: { reload: function reload() {
          this.isRouterAlive = !1, this.$nextTick(function () {
            this.isRouterAlive = !0;
          });
        }, wxConfig: function wxConfig() {
          var t = encodeURIComponent(window.location.href),
              e = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat",
              i = localStorage.getItem("monthCardCollageMemberid"),
              s = this.$common.getParam("get", { url: t, member_id: i });this.$axios.post(e + "?" + s).then(function (t) {
            if (200 == t.data.code) {
              var e = t.data.data;wx.config({ debug: !1, appId: e.appId, timestamp: e.timestamp, nonceStr: e.nonceStr, signature: e.signature, jsApiList: ["hideMenuItems", "chooseWXPay", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd"] }), wx.ready(function () {
                wx.checkJsApi({ jsApiList: ["hideMenuItems", "chooseWXPay", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd"], success: function success(t) {
                    wx.hideMenuItems({ menuList: ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:share:QZone", "menuItem:copyUrl", "menuItem:originPage", "menuItem:openWithQQBrowser", "menuItem:openWithSafari"] });
                  } });
              });
            }
          });
        } } },
        r = { render: function render() {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { attrs: { id: "app" } }, [e("router-view")], 1);
      }, staticRenderFns: [] };var c = i("VU/8")(o, r, !1, function (t) {
      i("MBBj");
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
      }, staticRenderFns: [] };var h = i("VU/8")(l, u, !1, function (t) {
      i("nFDG");
    }, "data-v-38d205e8", null).exports,
        m = { name: "Pay", components: { eject: h }, data: function data() {
        return { cataArr: [], courseArr: [], nickname: "", head_img: "", num: 2, canGroup: !0, ejectText: "", ejectStatus: !1, count: 0, scoLeft: 0 };
      }, created: function created() {}, mounted: function mounted() {
        var t = this;this.getCourseList(), this.nickname = window.localStorage.getItem("extendAbcNickname"), this.head_img = window.localStorage.getItem("extendAbcHeadimg"), this.box = this.$refs.viewBox, this.box.addEventListener("scroll", function () {
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
          var t = encodeURIComponent(window.location.href),
              e = this.$common.config.gzhUrl + "v3/wechat/wechat/get-wechat",
              i = localStorage.getItem("monthCardCollageMemberid"),
              s = this.$common.getParam("get", { url: t, member_id: i });this.$axios.post(e + "?" + s).then(function (t) {
            if (200 == t.data.code) {
              var e = t.data.data;wx.config({ debug: !1, appId: e.appId, timestamp: e.timestamp, nonceStr: e.nonceStr, signature: e.signature, jsApiList: ["hideMenuItems", "chooseWXPay", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd"] }), wx.ready(function () {
                wx.checkJsApi({ jsApiList: ["hideMenuItems", "chooseWXPay", "startRecord", "stopRecord", "onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice", "onVoicePlayEnd"], success: function success(t) {
                    wx.hideMenuItems({ menuList: ["menuItem:share:appMessage", "menuItem:share:timeline", "menuItem:share:qq", "menuItem:share:weiboApp", "menuItem:share:QZone", "menuItem:copyUrl", "menuItem:originPage", "menuItem:openWithQQBrowser", "menuItem:openWithSafari"] });
                  } });
              });
            }
          });
        } } },
        p = { render: function render() {
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
      }] };var f = i("VU/8")(m, p, !1, function (t) {
      i("ECxy");
    }, "data-v-adc60c40", null).exports,
        v = { inject: ["reload"], name: "Part", components: { eject: h }, data: function data() {
        return { ind: 0, id: 0, num: 2, ejectText: "", ejectStatus: !1, textArr: ["视频欣赏", "绘本阅读", "互动游戏", "动画歌谣"], audio_url: "", showOkbtn: !0 };
      }, created: function created() {}, mounted: function mounted() {
        var t = this;this.ind = this.$route.query.part - 1 || 0, this.id = this.$route.query.id, JSON.parse(window.localStorage.getItem("musicalContent")).song.ok_url || (this.showOkbtn = !1), document.getElementById("audio").src = "https://qnfile.abctime.com/extend/musical/trans_audio" + this.$route.query.part + ".mp3", window.WeixinJSBridge ? window.WeixinJSBridge.invoke("getNetworkType", {}, function (e) {
          t.$refs.audio.load(), setTimeout(function () {
            t.$refs.audio.play();
          }, 300);
        }) : document.addEventListener("WeixinJSBridgeReady", function () {
          window.WeixinJSBridge.invoke("getNetworkType", {}, function (e) {
            t.$refs.audio.load(), setTimeout(function () {
              t.$refs.audio.play();
            }, 300);
          });
        }, !1);
      }, methods: { back: function back() {
          var t = this.$route.query.id;this.$router.replace({ name: "Part", query: { id: t } });
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
        g = { render: function render() {
        var t = this,
            e = t.$createElement,
            i = t._self._c || e;return i("div", { staticClass: "trans" }, [i("div", { staticClass: "trans_container" }, [i("p", { staticClass: "txt" }, [t._v(t._s(t.textArr[t.ind]))]), t._v(" "), i("div", { staticClass: "tag" }, [i("div", { directives: [{ name: "show", rawName: "v-show", value: 3 == t.ind && t.showOkbtn, expression: "ind==3 && showOkbtn" }], staticClass: "btn_right", on: { click: function click(e) {
              return t.toStudy(4);
            } } }), t._v(" "), i("div", { directives: [{ name: "show", rawName: "v-show", value: 3 == t.ind, expression: "ind==3" }], staticClass: "btn_left", on: { click: function click(e) {
              return t.toStudy(5);
            } } })])]), t._v(" "), i("div", { staticClass: "back", on: { click: function click(e) {
              return t.back();
            } } }), t._v(" "), i("audio", { ref: "audio", staticClass: "Hidden", attrs: { id: "audio", autoplay: "", preload: "", src: t.audio_url, controls: "" }, on: { ended: function ended(e) {
              return t.onEnd();
            } } }), t._v(" "), t._m(0)]);
      }, staticRenderFns: [function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { staticClass: "hv_tip" }, [e("div", { staticClass: "icon" }), this._v(" "), e("p", [this._v("请旋转至横屏，体验更佳")])]);
      }] };var _ = i("VU/8")(v, g, !1, function (t) {
      i("cCDG");
    }, "data-v-412a7bb8", null).exports,
        w = i("mvHQ"),
        x = i.n(w),
        C = { name: "Part", components: { eject: h }, data: function data() {
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
              }localStorage.setItem("musicalContent", x()(i.content));
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
        y = { render: function render() {
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
      }] };var S = i("VU/8")(C, y, !1, function (t) {
      i("WKTL");
    }, "data-v-743ab966", null).exports,
        I = { name: "Part1", components: { eject: h }, data: function data() {
        return { url: "", ejectText: "", ejectStatus: !1, showFinish: !1, next_id: 1 };
      }, created: function created() {}, mounted: function mounted() {
        this.setSrc();
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
        } } },
        b = { render: function render() {
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
      }] };var A = i("VU/8")(I, b, !1, function (t) {
      i("8ZZI");
    }, "data-v-114cbfe3", null).exports,
        $ = i("bOdI"),
        k = i.n($),
        T = i("DNVT"),
        E = { name: "perfect", data: function data() {
        return { perfectStatus: this.showState };
      }, props: ["showState"], methods: { hidePerfect: function hidePerfect() {
          this.perfectStatus = !1, this.$parent.initPerfect();
        } }, watch: { showState: function showState(t, e) {
          t && (this.perfectStatus = !0, setTimeout(this.hidePerfect, 2400));
        } } },
        P = { render: function render() {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { directives: [{ name: "show", rawName: "v-show", value: this.perfectStatus, expression: "perfectStatus" }], staticClass: "toast_wrap" }, [e("div", { staticClass: "perfect" })]);
      }, staticRenderFns: [] };var L,
        j = i("VU/8")(E, P, !1, function (t) {
      i("QSjF");
    }, "data-v-e2aa6ef0", null).exports,
        R = { name: "part2", components: { perject: j }, data: function data() {
        return { swiperSlides: [], localIdArr: [], recordFlag: !1, localId: "", completeId: -1, perStatus: !1, isRecord: !1, canShowPerfect: !0, currentId: 0, part2_guide: !1, showFinish: !1 };
      }, mounted: function mounted() {
        var t = localStorage.getItem("extendAbcPart2Guide");this.part2_guide = !t;var e = this;this.setData(), this.localIdArr = [], new T.a(".swiper-container", { loop: !1, observer: !0, on: { slideChange: function slideChange() {
              e.currentId = this.activeIndex, e.playAudio(this.activeIndex);
            } } }), this.isRecord = !1, this.$nextTick(function () {
          document.addEventListener("visibilitychange", function () {
            e.isRecord = !1;
          });
        });
      }, watch: { swiperSlides: function swiperSlides(t) {} }, methods: (L = { next: function next(t) {
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
        } }, k()(L, "startRecord", function () {
        var t = document.querySelector("#audio"),
            e = this;wx.ready(function () {
          t.pause(), e.isRecord = !0, wx.startRecord();
        });
      }), k()(L, "stopRecord", function () {
        var t = this;wx.ready(function () {
          wx.stopRecord({ success: function success(e) {
              t.showPerject(), t.isRecord = !1, t.localId = e.localId;
            } });
        });
      }), k()(L, "playVo", function () {
        var t = this,
            e = document.querySelector("#audio");wx.ready(function () {
          e.pause(), wx.playVoice({ localId: t.localId });
        });
      }), k()(L, "stopVo", function () {
        this.localId && wx.stopVoice({ localId: this.localId });
      }), L) },
        q = { render: function render() {
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
      }] };var F = i("VU/8")(R, q, !1, function (t) {
      i("g4Xu");
    }, "data-v-03a777be", null).exports,
        V = { name: "Part3", data: function data() {
        return { imgTop1: 0, imgLeft1: 0, imgTop2: 0, imgLeft2: 0, senTop1: 0, senLeft1: 0, senTop2: 0, senLeft2: 0, posX: 0, posY: 0, quizArr: [{ title: "" }], gameArr: [], page: 0, titleSrc: "" };
      }, mounted: function mounted() {
        this.setData();
      }, methods: { back: function back() {
          var t = this.$route.query.id;this.$router.replace({ name: "Part", query: { id: t } });
        }, setData: function setData() {
          var t = JSON.parse(window.localStorage.getItem("musicalContent"));this.gameArr = t.game, this.autoPlayTitleAudio(this.gameArr[0].title);
        }, playTitleAudio: function playTitleAudio(t) {
          var e = document.querySelector("audio");this.titleSrc = t, this.$common.VL.isIpad() || this.$common.VL.isIphone() ? wx.ready(function () {
            e.play();
          }) : e.play();
        }, autoPlayTitleAudio: function autoPlayTitleAudio(t) {
          document.getElementById("audio").src = t;var e = this;window.WeixinJSBridge ? window.WeixinJSBridge.invoke("getNetworkType", {}, function (t) {
            setTimeout(function () {
              e.$refs.audio.play();
            }, 300);
          }) : document.addEventListener("WeixinJSBridgeReady", function () {
            window.WeixinJSBridge.invoke("getNetworkType", {}, function (t) {
              setTimeout(function () {
                e.$refs.audio.play();
              }, 300);
            });
          }, !1);
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
              d = document.getElementsByClassName("default_1")[s].offsetHeight;if (a > o - a && a < o + r && n > c - .5 * d && n < c + 1.5 * d && e > 0) {
            if (this.playAudio("https://qnfile.abctime.com/right.mp3"), i.indexOf("drag1") >= 0) {
              this.imgLeft1 = this.posX + t.deltaX - (a - o), this.imgTop1 = this.posY + t.deltaY - (n - c);var l = this;setTimeout(function () {
                document.getElementsByClassName("default_1")[s].className = "default_1 active", l.imgLeft1 = 0, l.imgTop1 = 0, l.page++, l.autoPlayTitleAudio(l.gameArr[l.page].title), document.getElementById("game").scrollLeft += 500;
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
              d = document.getElementsByClassName("default_2")[s].offsetHeight;if (a > o - a && a < o + r && n > c - .5 * d && n < c + 1.5 * d && e > 0) {
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
        N = { render: function render() {
        var t = this,
            e = t.$createElement,
            i = t._self._c || e;return i("div", { staticClass: "game", attrs: { id: "game" } }, [i("div", { staticClass: "game_back", on: { click: function click(e) {
              return t.back();
            } } }), t._v(" "), i("div", { directives: [{ name: "show", rawName: "v-show", value: t.page < 3, expression: "page<3" }], staticClass: "game_play_btn", on: { click: function click(e) {
              return t.playAudio(t.gameArr[t.page].title);
            } } }), t._v(" "), i("audio", { ref: "audio", staticClass: "Hidden", attrs: { id: "audio", preload: "", src: t.titleSrc, autoplay: "", controls: "" } }), t._v(" "), i("div", { staticClass: "game_que_box", attrs: { id: "game_que_box" } }, [i("ul", t._l(t.gameArr, function (e, s) {
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
      }, staticRenderFns: [] };var B = i("VU/8")(V, N, !1, function (t) {
      i("+Fy0");
    }, "data-v-4c9647b0", null).exports,
        M = { name: "part4", components: { perject: j }, data: function data() {
        return { songArr: [], tagArr: [!1, !1, !1, !1, !1, !1, !1, !1], localIdArr: [], recordFlag: !1, url: "", song_txt: "", currentId: -1, proLeft: 0, localId: "", perStatus: !1, isRecord: !1, saveInd: 0, part4_guide: !1, showFinish: !1, allTime: 0 };
      }, mounted: function mounted() {
        var t = localStorage.getItem("extendAbcPart4Guide");this.part4_guide = !t, this.setSrc(), this.localIdArr = [], this.isRecord = !1;var e = this;this.$nextTick(function () {
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
        } } },
        O = { render: function render() {
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
      }] };var U = i("VU/8")(M, O, !1, function (t) {
      i("B9x8");
    }, "data-v-517de4df", null).exports,
        D = { name: "part4", components: { perject: j }, data: function data() {
        return { songArr: [], tagArr: [!1, !1, !1, !1, !1, !1, !1, !1], localIdArr: [], recordFlag: !1, url: "", song_txt: "", currentId: -1, proLeft: 0, localId: "", perStatus: !1, isRecord: !1, saveInd: 0, part4_guide: !1, showFinish: !1 };
      }, mounted: function mounted() {
        var t = localStorage.getItem("extendAbcPart4Guide");this.part4_guide = !t, this.setSrc(), this.localIdArr = [], this.isRecord = !1;var e = this;this.$nextTick(function () {
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
        } } },
        W = { render: function render() {
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
      }] };var X = i("VU/8")(D, W, !1, function (t) {
      i("mXAn");
    }, "data-v-a23f5e36", null).exports,
        G = { name: "Part", data: function data() {
        return { titleTxt: "" };
      }, created: function created() {}, mounted: function mounted() {}, methods: { next: function next() {
          var t = parseInt(this.$route.query.id) + 1;this.$router.replace({ name: "Part", query: { id: t } });
        } } },
        Y = { render: function render() {
        var t = this,
            e = t.$createElement,
            i = t._self._c || e;return i("div", { staticClass: "finish" }, [i("div", { staticClass: "bg" }, [i("p", { staticClass: "txt1" }, [t._v("Good job!")]), t._v(" "), i("p", { staticClass: "txt2" }, [t._v("表现太棒了！")]), t._v(" "), i("div", { staticClass: "next", on: { click: function click(e) {
              return t.next();
            } } })])]);
      }, staticRenderFns: [] };var H = i("VU/8")(G, Y, !1, function (t) {
      i("ix0t");
    }, null, null).exports,
        J = i("MJLE"),
        z = i.n(J),
        Q = i("2Pnh"),
        Z = i.n(Q),
        K = { name: "eject", data: function data() {
        return { showStatus: this.showState };
      }, props: ["message", "showState"], methods: { hideEject: function hideEject() {
          this.showStatus = !1, this.$parent.initEject();
        } }, watch: { showState: function showState(t, e) {
          t && (this.showStatus = !0, setTimeout(this.hideEject, 2e3));
        } } },
        tt = { render: function render() {
        this.$createElement;this._self._c;return this._m(0);
      }, staticRenderFns: [function () {
        var t = this.$createElement,
            e = this._self._c || t;return e("div", { staticClass: "hv_tip" }, [e("div", { staticClass: "icon" }), this._v(" "), e("p", [this._v("请旋转至竖屏，体验更佳")])]);
      }] };var et = { name: "End", components: { hv: i("VU/8")(K, tt, !1, function (t) {
          i("hyyX");
        }, "data-v-99c8c6d2", null).exports }, data: function data() {
        return { posterImg: "", wrapShow: !1, loadStatus: !0, lesson_name: "The Clever Xylophone" };
      }, created: function created() {}, mounted: function mounted() {
        this.createQrcode(location.origin + "/extend/letter/index.html");
      }, methods: { getPoster: function getPoster() {
          this.showWrap(), this.createPoster("2222");
        }, showWrap: function showWrap() {
          this.wrapShow = !0;
        }, createQrcode: function createQrcode(t) {
          console.log(t);var e = document.getElementById("qrcodeImg"),
              i = 54 * document.documentElement.clientWidth / 1334;e.innerHTML = "", new z.a(e, { width: i, height: i, colorDark: "#000000", colorLight: "#ffffff", correctLevel: z.a.CorrectLevel.H }).makeCode(t), this.getPoster();
        }, createPoster: function createPoster(t) {
          var e = document.getElementById("posterHtml"),
              i = e.offsetWidth,
              s = e.offsetHeight,
              a = document.createElement("canvas"),
              n = window.devicePixelRatio;a.width = i * n, a.height = s * n, a.style.width = i + "px", a.style.height = s + "px", a.getContext("2d").scale(n, n);var o = this;console.log(e.offsetWidth), Z()(e, { canvas: a, useCORS: !0, allowTaint: !0, logging: !1, letterRendering: !0, scale: n, onclone: function onclone(t) {
              t.querySelector("#posterHtml").style.display = "block";
            } }).then(function (t) {
            o.loadStatus = !1, o.posterImg = t.toDataURL("image/png");
          });
        } } },
        it = { render: function render() {
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
      }] };var st = i("VU/8")(et, it, !1, function (t) {
      i("yyjV");
    }, "data-v-1023c712", null).exports;s.a.use(d.a);var at = new d.a({ routes: [{ path: "/", name: "Cata", component: f }, { path: "/partOne", name: "PartOne", component: A }, { path: "/partTwo", name: "PartTwo", component: F }, { path: "/partThree", name: "PartThree", component: B }, { path: "/partFour", name: "PartFour", component: U }, { path: "/partFive", name: "PartFive", component: X }, { path: "/cata", name: "Cata", component: f }, { path: "/trans", name: "Transition", component: _ }, { path: "/part", name: "Part", component: S }, { path: "/finish", name: "Finish", component: H }, { path: "/end", name: "End", component: st }] }),
        nt = i("pFYg"),
        ot = i.n(nt),
        rt = { baseUrl: "http://dev.api.abctime.com/", gzhUrl: "http://dev.gzh.abctime.com/", sign_key: "GriE93gIGp$5bDjQ4rc20FzxWGghTIau", postConfig: { headers: { "Content-Type": "multipart/form-data" } } },
        ct = navigator.userAgent.toLowerCase();function dt(t) {
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
            h,
            m,
            p,
            f,
            v,
            g,
            _,
            w,
            x,
            C = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298),
            y = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225),
            S = new Array(64);t[e >> 5] |= 128 << 24 - e % 32, t[15 + (e + 64 >> 9 << 4)] = e;for (var I = 0; I < t.length; I += 16) {
          i = y[0], u = y[1], h = y[2], m = y[3], p = y[4], f = y[5], v = y[6], g = y[7];for (var b = 0; b < 64; b++) {
            S[b] = b < 16 ? t[b + I] : s(s(s(a(x = S[b - 2], 17) ^ a(x, 19) ^ n(x, 10), S[b - 7]), l(S[b - 15])), S[b - 16]), _ = s(s(s(s(g, d(p)), o(p, f, v)), C[b]), S[b]), w = s(c(i), r(i, u, h)), g = v, v = f, f = p, p = s(m, _), m = h, h = u, u = i, i = s(_, w);
          }y[0] = s(i, y[0]), y[1] = s(u, y[1]), y[2] = s(h, y[2]), y[3] = s(m, y[3]), y[4] = s(p, y[4]), y[5] = s(f, y[5]), y[6] = s(v, y[6]), y[7] = s(g, y[7]);
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
    }var lt = { config: rt, VL: { isWechat: function isWechat() {
          return "micromessenger" == ct.match(/MicroMessenger/i);
        }, isIphone: function isIphone() {
          return ct.indexOf("iphone") >= 0;
        }, isIpad: function isIpad() {
          return ct.indexOf("ipad") >= 0;
        }, phNum: function phNum(t) {
          return !!/^1[3456789]\d{9}$/.test(t);
        }, getRequest: function getRequest() {
          var t = decodeURIComponent(location.search),
              e = new Object();if (-1 != t.indexOf("?")) for (var i = t.substr(1).split("&"), s = 0; s < i.length; s++) {
            e[i[s].split("=")[0]] = unescape(i[s].split("=")[1]);
          }return e;
        } }, getParam: function getParam(t, e, i) {
        i = rt.sign_key;var s = [],
            a = [],
            n = [],
            o = [];if (e.version || (e.version = 2), e.act_id = 5, e.source_id = 109, "post" == t) {
          for (var r in e) {
            s.push(r), a.push(e[r]), "object" != ot()(e[r]) && n.push(r + e[r]);
          }var c = n.sort().join("~").replace(/~/g, "") + i;return e.sign = dt(c), e;
        }if ("get" == t) {
          for (var r in delete e.sign, e) {
            n.push(r + e[r]), o.push(r + "=" + e[r] + "&");
          }var d = dt(c = n.sort().join("~").replace(/~/g, "") + i);return o.sort().join("~").replace(/~/g, "") + "sign=" + d;
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
        ut = i("7QTg"),
        ht = i.n(ut),
        mt = i("I0MY"),
        pt = i.n(mt);s.a.use(ht.a), s.a.use(pt.a, { name: "v-touch" }), s.a.config.productionTip = !1, s.a.prototype.$axios = n.a, s.a.prototype.$common = lt, at.beforeEach(function (t, e, i) {
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
        var h = function h() {
          (m = document.documentElement.clientHeight) > 768 && (m = 768), m < 320 && (m = 320), p = (625 * m / f).toFixed(2), console.log(p), document.documentElement.style.fontSize = p + "%";
        },
            m = void 0,
            p = void 0,
            f = void 0;f = 750, h(), window.addEventListener("resize", h, !1);
      }var v = lt.VL.getRequest().openid || window.localStorage.getItem("extendAbcOpenid") || "",
          g = lt.VL.getRequest().member_id || window.localStorage.getItem("extendAbcMemberid") || "";if (v && g) return window.localStorage.setItem("extendAbcOpenid", v), window.localStorage.setItem("extendAbcMemberid", g), i(), !1;window.location.href = lt.config.gzhUrl + "v3/wechat/wechat/grant?state=H5&url=" + encodeURIComponent(window.location.origin + "/extend/mus/index.html" + window.location.search);
    }), new s.a({ el: "#app", router: at, components: { App: c }, template: "<App/>" });
  }, QSjF: function QSjF(t, e) {}, WKTL: function WKTL(t, e) {}, cCDG: function cCDG(t, e) {}, g4Xu: function g4Xu(t, e) {}, hyyX: function hyyX(t, e) {}, ix0t: function ix0t(t, e) {}, mXAn: function mXAn(t, e) {}, nFDG: function nFDG(t, e) {}, yyjV: function yyjV(t, e) {} }, ["NHnr"]);
//# sourceMappingURL=app.3dca78bdf5d9b468cd57.js.map
//# sourceMappingURL=app.3dca78bdf5d9b468cd57.js.map