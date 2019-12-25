<template>
  <div content="index" id="index_wrap">
    <div class="container">
        <div class="info_user">
            <p class="phone">当前账号:{{phone}}</p>
            <div class="logout" @click="logout()">退出当前账号</div>
        </div>
        <div class="info_content" id="info_content">
            <nav id="nav_wrap">
                <div :class="nav_index==1?'nav_li active':'nav_li'" @click="switchNav(1)">已发货</div>
                <div :class="nav_index==2?'nav_li active':'nav_li'" @click="switchNav(2)">审核进度</div>
            </nav>
            <section class="info_shipped" v-show="nav_index==1">
                <ul v-if="shipped_list.length>0">
                    <li v-for="item,$index in shipped_list" :key="'shipped'+$index">
                        <div class="li_box">
                            <div class="info_box">
                                <span>商品名称:</span>{{item.name}}
                            </div>
                            <div class="info_box">
                                <span>发货时间:</span>{{item.courier_time}}
                            </div>
                            <div class="info_box">
                                <span>快递类型:</span>{{item.courier}}
                            </div>
                            <div class="info_box">
                                <span>快递单号:</span>{{item.courier_no}}
                                <div class="copy_btn"
                                    v-clipboard:error="onCopyError"
                                    v-clipboard:copy="item.courier_no"  
                                    v-clipboard:success="onCopySuc"
                                >复制</div>
                            </div>
                            <div class="info_box">
                                <span>收货人:</span>{{item.consignee_name}}
                            </div>
                            <div class="info_box">
                                <span>收货电话:</span>{{item.mobile?item.mobile:'--'}}
                            </div>
                            <div class="info_box">
                                <span>收货地址:</span>{{item.province+item.city+item.area+item.address}}
                            </div>
                        </div>
                    </li>
                </ul>
                <div v-else>
                    <img src="../assets/imgs/img_a.png" class="img_a">
                    <p class="img_a_text">您暂时没有发货信息</p>
                </div>
            </section>
            <section class="info_audit" v-show="nav_index==2">
                <ul v-if="audit_list.length>0">
                    <li v-for="item,$index in audit_list" :key="'audit'+$index" :class="item.status==1?'li_refuse':''">
                        <div class="li_box">
                            <div :class="'title_box '+statusCss[item.status]">
                                <span>申请状态</span>{{statusArr[item.status]}}
                            </div>
                            <div class="fg" :class="item.status==1?'fg_refuse':''"></div>
                            <div class="info_box">
                                <span>商品名称:</span>{{item.name}}
                            </div>
                            <div class="info_box">
                                <span>申请时间:</span>{{item.create_time?item.create_time:'--'}}
                            </div>
                            <div class="info_box">
                                <span>收货人:</span>{{item.consignee_name?item.consignee_name:'--'}}
                            </div>
                            <div class="info_box">
                                <span>收货电话:</span>{{item.mobile?item.mobile:'--'}}
                            </div>
                            <div class="info_box">
                                <span>收货地址:</span>{{item.province?(item.province+item.city+item.area+item.address):'--'}}
                            </div>
                        </div>
                    </li>
                </ul>
                <div v-else>
                    <img src="../assets/imgs/img_a.png" class="img_a">
                    <p class="img_a_text">您暂时没有审核信息</p>
                </div>
            </section>
        </div>
    </div>
    <eject :message="ejectText" :showState="ejectStatus"></eject>
    <div class="confirm_wrap" v-show="confirmFlag">
        <div class="box">
            <p>您确定要退出当前账号吗？</p>
            <div class="btn_confirm btn_left" @click="confirmFlag = false">取消</div>
            <div class="btn_confirm btn_right" @click="logConfirm()">退出</div>
        </div>
    </div>
  </div>
</template>
<script>
  import Eject from './Eject'
  export default {
    name: 'Index',
    components: {
      eject: Eject,
    },
    data(){
      return{
        phone: '',
        nav_index:1,
        canTap:false,
        ejectText:'',
        ejectStatus: false,
        shipped_list:[],
        audit_list: [],
        statusArr: ['审核中','未通过','待发货'],
        statusCss: ['s_ing','s_refuse','s_suc'],
        courierArr: ['宅急送','顺丰速运','百世汇通','中通快递','申通快递','圆通快递','韵达快递'],
        confirmFlag: false
      }
    },
    created(){
    },
    mounted(){
    //   this.getCollageInfo();
      let ph = window.localStorage.getItem('queryCourierPhone');
      if(!ph){
          this.$router.replace({name:'Login'})
      }else{
          this.phone = ph;
          this.getCourierInfo();
      }  
    //   this.getOriginalInfo();
    },
    methods:{
      logout(){
        this.confirmFlag = true;
      },
      logConfirm(){
        window.localStorage.removeItem('queryCourierPhone');
        this.$router.replace({name:'Login'})
      },
      switchNav(ind){
        this.nav_index = ind;
        // let wrap = document.getElementById("info_content"),_this=this;
        // let content = document.getElementById("con"+ind);
        // let nav = document.getElementById("nav_wrap");
        // document.body.scrollTop = wrap.offsetTop+content.offsetTop-nav.offsetHeight
        // document.documentElement.scrollTop = wrap.offsetTop+content.offsetTop-nav.offsetHeight
      },
      getCourierInfo(){
        // let userUrl = 'https://www.fastmock.site/mock/12461594de55f4c638ed94fcdcc1ecd9/abcmock/express/info/1';
        let userUrl = this.$common.config.gzhUrl + 'v3/member/query-courier/list';
        let fd = this.$common.getParam('get',{phone:this.phone});
        let _this = this;
        this.$axios.get(userUrl+'?'+fd).then((res) => {
          if(res.data.code == 200){
              _this.shipped_list = res.data.data.shipped_list;
              _this.audit_list = res.data.data.audit_list;
              if(_this.shipped_list.length>0){
                  for(let i in _this.shipped_list){
                    if(_this.shipped_list[i].courier_time>0){
                        _this.shipped_list[i].courier_time = this.$common.timestampToTime(_this.shipped_list[i].courier_time)
                    }
                  }
              }
              if(_this.audit_list.length>0){
                  for(let i in _this.audit_list){
                    if(_this.audit_list[i].status == '待审核'){
                        _this.audit_list[i].status = 0
                    }else if(_this.audit_list[i].status == '审核未通过'){
                        _this.audit_list[i].status = 1
                    }else if(_this.audit_list[i].status == '审核通过'){
                        _this.audit_list[i].status = 2
                    }  
                    if(_this.audit_list[i].create_time>0){
                        _this.audit_list[i].create_time = this.$common.timestampToTime(_this.audit_list[i].create_time)
                    }
                  }
              }
          }else{
              _this.showEject(res.data.msg)
          }  
        })
      },
      showEject: function (text) {
        this.ejectText = text
        this.ejectStatus = true
      },
      initEject: function () {
        this.ejectStatus = false
      },
      onCopySuc: function(){
          this.showEject('复制成功')
      },
      onCopyError: function(){
          this.showEject('复制失败，请长按复制')
      }
    },
  }
</script>
<style scoped lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
  img{
    display: block;
    margin: auto;
  }
  .container{
    // min-height: 100vh;
    position: relative;
      .nav_wrap_fixed{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: .96rem;
        line-height: .96rem;
        background: #fff;
        z-index: 1001;
        nav{
          width: 6.6rem;
          height: .96rem;
          line-height: .96rem;
          margin: auto;
          /*background: url('../assets/imgs/index_con_bg.png');*/
          /*background-size: cover;*/
          display: flex;
          .nav_li{
            flex: 1;
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: .32rem;
            color: #999;
            letter-spacing: 0;  
            text-align: center;
            position: relative;
            &.active{
                 color: #333;
            }
          }
          &[data-fixed="fixed"]{
            position: fixed;
            top:0;
            left: 0;
            margin: 0;
            z-index: 100;
            border-radius: 0;
          }
        }
      }
      .info_user{
          .phone{
            padding: .52rem 0 .55rem .32rem;
            font-family: PingFangSC-Regular;
            font-size: .28rem;
            color: #FFF;
            text-align: left;
            letter-spacing: 0;
          }
          .logout{
              width: 2.32rem;
              height: .64rem;
              line-height: .64rem;
              background: #FFF;
              border-radius: .36rem;
              position: absolute;
              right: .32rem;
              top: .4rem;
          }
      }
      .info_content{
        width: 6.86rem;
        min-height: 6.52rem;
        background: #FFFFFF;
        box-shadow: 0 .06rem .18rem 0 rgba(111,18,20,.4);
        border-radius: .36rem;
        margin: auto;
        position: relative;
        nav{
          width: 6.86rem;
          height: .96rem;
          border-radius: .36rem .36rem 0 0;          
          line-height: .96rem;
          margin: auto;
          overflow: hidden;
          display: flex;
          .nav_li{
            flex: 1;
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: .32rem;
            color: #FFF;
            letter-spacing: 0;  
            text-align: center;
            position: relative;
            background: #FFD395;
            &.active{
                 color: #D7490A;
                 background: #FFF;
            }
          }
          &[data-fixed="fixed"]{
            position: fixed;
            top:0;
            left: 0;
            margin: 0;
            z-index: 100;
            border-radius: 0;
          }
        }
        .info_shipped{
            padding: .08rem;
            li{
                width: 5.9rem;
                margin: .4rem auto;
                border-radius: .2rem;
                padding: .16rem .16rem;
                background:repeating-linear-gradient(135deg,#71B6FF,#71B6FF .16rem,#FFEBCE 0,#FFEBCE .32rem,#FF6610 0,#FF6610 .48rem,#FFEBCE 0,#FFEBCE .64rem);
                .li_box{
                    width: 100%;
                    height: 100%;
                    background: #FFF;
                    padding: .2rem 0;
                    .info_box{
                        width: 4.2rem;
                        padding: 0 .3rem 0 1.4rem;
                        text-align: left;
                        position: relative;
                        font-family: PingFangSC-Regular;
                        font-size: .24rem;
                        color: #393533;
                        letter-spacing: 0;
                        line-height: 1.8;
                        span{
                            display: inline-block;
                            width: 1.3rem;
                            position: absolute;
                            left: 0;
                            text-align: right;
                            color: #999492;
                        }
                        .copy_btn{
                            display: inline-block;
                            margin-left: .24rem;
                            text-align: center;
                            width: .88rem;
                            height: .33rem;
                            line-height: .33rem;
                            background: #EC9722;
                            border-radius: .165rem;
                            font-family: PingFangSC-Regular;
                            font-size: .2rem;
                            color: #FFF;
                            letter-spacing: 0;
                        }
                    }
                }
            }
        }
        .info_audit{
            padding: .08rem;
            li{
                width: 6.04rem;
                margin: .4rem auto;
                border-radius: .2rem;
                background: #FFFBF6;
                border: .08rem solid #FFEBCE;
                border-radius: .12rem;
                &.li_refuse{
                    background: #FBFBFB;
                    border: .08rem solid #E7E7E7;
                    border-radius: .12rem;
                }
                .li_box{
                    width: 100%;
                    height: 100%;
                    background: #FFF;
                    padding: .2rem 0;
                    .fg{
                        width: 5.5rem;
                        height: 1px;
                        background: #FFEBCE;
                        margin: 0 auto .24rem;
                        &.fg_refuse{
                            background: #E7E7E7;
                        }
                    }
                    .title_box{
                        width: 5.7rem;
                        height: .8rem;
                        // padding: 0 .3rem 0 1.4rem;
                        text-align: right;
                        position: relative;
                        font-family: PingFangSC-Regular;
                        font-size: .32rem;
                        color: #FF9500;
                        letter-spacing: 0;
                        line-height: .8rem;
                        &.s_ing{
                            color: #FF9500;
                        }
                        &.s_refuse{
                            color: #393533;
                        }
                        &.s_suc{
                            color: #40A814;
                        }
                        span{
                            display: inline-block;
                            width: 1.3rem;
                            position: absolute;
                            left: 0;
                            text-align: right;
                            font-size: .24rem;
                            color: #393533;
                        }
                    }
                    .info_box{
                        width: 4.2rem;
                        padding: 0 .3rem 0 1.4rem;
                        text-align: left;
                        position: relative;
                        font-family: PingFangSC-Regular;
                        font-size: .24rem;
                        color: #393533;
                        letter-spacing: 0;
                        line-height: 1.8;
                        span{
                            display: inline-block;
                            width: 1.3rem;
                            position: absolute;
                            left: 0;
                            text-align: right;
                            color: #999492;
                        }
                    }
                }
            }
        }
        .img_a{
            width: 1.8rem;
            margin: 1.25rem auto 0;
        }
        .img_a_text{
            padding-top: .16rem;
            font-family: PingFangSC-Regular;
            font-size: .24rem;
            color: #393533;
            letter-spacing: 0;
        }
      }
    
    &.blur{
      -webkit-filter: blur(2px);
      filter: blur(2px);
    }
    .content{
      background: #fff;
    //   box-shadow: 0 .04rem 0 0 rgba(0,0,0,.3);
      border-radius: 0 0 .4rem .4rem;
      img{
          width: 100%;
          height: auto;
      }
    }
  }
  .confirm_wrap{
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,.7);
      position: fixed;
      left: 0;
      top: 0;
      .box{
          width: 91.5vw;
          height: 2.8rem;
          padding-top: .48rem;
          margin: 35vh auto 0;
          background: #FFF;
          box-shadow: 0 .06rem .18rem 0 rgba(111,18,20,0.40);
          border-radius: .36rem;
          p{
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: .4rem;
            color: #B1532A;
            letter-spacing: 0;
          }
          .btn_confirm{
            display: inline-block;
            margin: .6rem .2rem 0;
            width: 2.3rem;
            height: .88rem;
            line-height: .88rem;
            font-family: PingFangSC-Semibold;
            font-weight: bold;
            font-size: .36rem;
            color: #FFF;
            letter-spacing: 0;
            text-align: center;
            border-radius: .36rem;
          }
          .btn_left{
            background-image: linear-gradient(135deg, #DDD5C7 0%, #B6A4A9 100%);
            box-shadow: 0 .04rem .08rem 0 rgba(103,66,56,.3);
          }
          .btn_right{
            background-image: linear-gradient(135deg, #FEBA40 0%, #FF6090 100%);
            box-shadow: 0 .04rem .08rem 0 rgba(124,44,22,.3);
          }
      }
  }

</style>
