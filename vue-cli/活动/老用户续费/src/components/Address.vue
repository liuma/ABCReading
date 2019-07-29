<template>
  <div class="address">
    <div class="address_container">
      <div class="bady_tag"></div>
      <div class="ft_tag"></div>
      <div class="ft_bg"></div>
      <div v-if="hasSubmit" class="suc_content">
          <div class="suc_hd">
                <p class="user_info">{{userInfo.name}}<span>{{userInfo.phone}}</span></p>
                <div class="address_info">
                  {{userInfo.province}}{{userInfo.city}}{{userInfo.area}}{{userInfo.address}}
                  <!-- 北京市海淀区知春路2号知春嘉园3层学而思网络科技ABC Reading项目组 -->
                </div>
          </div>
          <div class="suc_box">
              <p class="title">收货地址提交成功！我们会尽快寄出礼品哦～</p>
              <img :src="sucObj.giftImg" class="suc_img">
              <p class="lesson_txt">{{sucObj.lessonTxt}}已放入您的账户～</p>
              <p class="guide_txt">可在"ABCReading美国小学图书馆"<br/>
                    公众号-课程中心观看</p>
              <img :src="sucObj.lessonImg" class="lesson_img">

              <div class="btn_add" @click="toDownload()">开始学习之旅</div>
          </div>
      </div>
      <div v-else class="address_content">
          <div class="list_box">
                <ul>
                    <li>
                        <span class="li_title">收货人姓名</span>
                        <div class="li_content">
                            <input v-model="userInfo.name" type="text" maxlength="8" placeholder="请输入收货人姓名">
                        </div>
                    </li>
                    <li>
                        <span class="li_title">手机号码</span>
                        <div class="li_content">
                            <input v-model="userInfo.phone" type="tel" maxlength="11" placeholder="请输入手机号">
                        </div>
                    </li>
                    <li>
                        <span class="li_title">所在地区</span>
                        <div class="li_content area" @click="isShowProvince=!isShowProvince">
                            <div class="input_group province_txt">
                                {{userInfo.province_name}} {{userInfo.city_name}} {{userInfo.area_name}}
                            </div>
                            <span v-if="!userInfo.province_name" class="place_txt">请选择地区</span>
                        </div>
                    </li>
                    <li>
                        <span class="li_title">详细地址</span>
                        <div class="li_content">
                            <textarea v-model="userInfo.address" name="" id="" rows="2" placeholder="请输入街道地址"></textarea>
                        </div>
                    </li>
                </ul>  
                <div class="distinguish_box">
                    <textarea id="" rows="5" v-model="distinguishText" placeholder="请输入或粘贴地址文本，自动识别姓名、电话和地址，如：张三，18012345678，浙江省杭州市余杭区五常街道乐嘉国际3号"></textarea>
                    <div class="btn_group">
                        <img class="delete" src="../assets/images/address_delete_tag.png" @click="distinguishText=''">
                        <img class="distinguish" src="../assets/images/address_distinguish_tag.png" @click="distinguish()">
                    </div>
                </div>
                <div class="divwrap" v-show="isShowProvince" >
                    <v-distpicker type="mobile" @selected="onSelected" :province="userInfo.province_name" :city="userInfo.city_name" :area="userInfo.area_name"></v-distpicker>
                </div>
                <div class="btn_submit" @click="submitAddress()">提交</div>
          </div>
      </div>
      
    </div>
    <eject :message="ejectText" :showState="ejectStatus"></eject>
  </div>
</template>

<script>
import Eject from './Eject'
import VDistpicker from 'v-distpicker'
import distinguish from '../utils/distinguishx'


export default {
  name: 'Login',
  components: {
    VDistpicker,
    eject: Eject
  },
  data () {
    // 手机号 验证码 发送验证码按钮标识

    return {
        hasSubmit: false,
        ejectText:'',
        ejectStatus: false,
        sucObj: {
            lessonTxt: 'RAZ字母课',
            giftImg: 'http://file.abctime.com/activity/renewal/gift_img_res.png',
            lessonImg: 'http://file.abctime.com/activity/renewal/lesson_img_letter.png',
        },
        hasLogin: true,
        canAdd: false,
        userInfo:{
            province_name:'',
            province_id:'',
            city_name:'',
            city_id:'',
            area_name:'',
            area_id:'',
            phone:'',
            address:'',
            name:''
        },
        isShowProvince:false, 
        distinguishText:'',
    }
  },
  created(){
    // this.shareConfig()

  },
  mounted(){
      this.getAddress();
      if(!this.hasLogin){
          this.$router.push({'name':'Login',params:{pre:'address'}})
      }
  },
  methods: {
    distinguish(){
        let resObj = distinguish.parseAddr(this.distinguishText);
        console.log('resObj:',resObj);
        this.userInfo.province_name = resObj.province
        this.userInfo.city_name = resObj.city
        this.userInfo.area_name = resObj.area
        this.userInfo.name = resObj.name
        this.userInfo.phone = resObj.mobile
        this.userInfo.address = resObj.addr
    },
    toDownload(){
        window.location.href = 'http://www.abctime.com/download.html?source_id=renewal'
        // console.log('toDownload');
    },
    toAddress(){
        console.log('toAddress');
    },
    onSelected(data) {
      this.userInfo.province_name = data.province.value
      this.userInfo.province_id = data.province.code
      this.userInfo.city_name = data.city.value
      this.userInfo.city_id = data.city.code
      this.userInfo.area_name = data.area.value
      this.userInfo.area_id = data.area.code
      this.isShowProvince = false
    },
    getAddress(){
        let openid = window.localStorage.getItem('extendAbcOpenid')
        let memberId = window.localStorage.getItem('extendAbcMemberid')
        let addressUrl = this.$common.config.gzhUrl + 'v3/member/gift-bag/my-address'
        let fd = this.$common.getParam('get',{openid:openid,member_id:memberId});
        this.$axios.get(addressUrl+'?'+fd).then((res) => {
            if(res.data.code == 200 && res.data.data.phone){
                this.hasSubmit = true; 
                this.userInfo = res.data.data;
                console.log(this.userInfo)               
                // this.userInfo.province_name = res.data.data.province;               
                // this.userInfo.city_name = res.data.data.city;               
                // this.userInfo = res.data.data.area;               
            }
        })
    },
    submitAddress(){
        if(!this.userInfo.name){
            this.showEject('请输入收货人姓名');
            return
        }
        if(!this.$common.VL.phNum(this.userInfo.phone)){
            this.showEject('请输入正确的手机号');
            return
        }
        if(!this.userInfo.province_name){
            this.showEject('请选择地区');
            return
        }
        if(this.userInfo.province_id == 100001){
            this.userInfo.province_id = 100000
        }
        if(!this.userInfo.address){
            this.showEject('请输入详细地址');
            return
        }

        let fdObj = this.userInfo;
        let member_id = localStorage.getItem('extendAbcMemberid'),openid = localStorage.getItem('extendAbcOpenid');
        fdObj.member_id = member_id;
        fdObj.openid = openid;
        if(fdObj.province){delete fdObj.province;}
        if(fdObj.city){delete fdObj.city;}
        if(fdObj.area){delete fdObj.area;}
        let _this = this;
        let fd = this.$common.getParam('get',fdObj);
        let orderUrl = this.$common.config.gzhUrl + 'v3/member/gift-bag/edit-address'
        let conf = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
        this.$axios.post(orderUrl,fd,conf).then((res) => {
            if(res.data.code == 200){
                this.getAddress();
                // this.hasSubmit = true;
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
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .address_container {
    width: 100%;
    height: calc(~'100vh - .3rem');
    padding-top: .3rem;
    background: url('../assets/images/order_bg.png') repeat-y;
    background-size: 100% auto;
    /*min-height: 100vh;*/
    position: relative;
    z-index: 10;
    .ft_bg{
        width: 100vw;
        height: 1.89rem;   
        background: url('../assets/images/order_bg_ft.png') no-repeat;
        background-size: cover;
        position: absolute;
        left: 0;
        bottom: 0;
    }
    .bady_tag{
        width: 100vw;
        height: 7rem;
        // height: 100vh;   
        background: url('../assets/images/order_bg_tag.png') bottom no-repeat;
        background-size: 100% auto;
        position: absolute;
        top: .94rem;
        left: 0;
    }
    .ft_tag{
        width: 100vw;
        height: 1.9rem;
        // height: 100vh;   
        background: url('../assets/images/order_ft.png') no-repeat;
        background-size: 100% auto;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 2;
    }
    .address_content{
        position: relative;
        .list_box{
            width: 6.7rem;
            margin: auto;
            background: #301DA0;
            border: .12rem solid #503DE2;
            border-radius: .3rem; 
            text-align: left; 
            ul{
                text-align: left;
                li{
                    position: relative;
                    width: 6.3rem;
                    height: 1.16rem;
                    line-height: 1.16rem;
                    margin: auto;
                    border-bottom: .02rem solid #240F66;
                    .li_title{
                        font-family: FZY4JW--GB1-0;
                        font-size: .3rem;
                        color: #B6B0FF;
                        letter-spacing: .035rem;
                        padding-left: .1rem;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }  
                    .li_content{
                        padding-left: 2.17rem;
                        input,select,textarea{
                            line-height: 1;
                            width: 4rem;
                            background: #301DA0;
                            font-family: FZY4JW--GB1-0;
                            font-size: .3rem;
                            color: #FFF;
                            letter-spacing: .045rem;
                            &::placeholder{
                                // font-family: FZY4JW--GB1-0;
                                // font-size: 30px;
                                color: #594ABD;
                                // letter-spacing: 3.46px;
                            }
                        }
                        .province_txt{
                            width: 3.5rem;
                            background: #301DA0;
                            font-family: FZY4JW--GB1-0;
                            font-size: .3rem;
                            color: #FFF;
                            letter-spacing: .045rem;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                        textarea{
                            margin: .4rem 0 0;
                            height: .6rem;
                            &::-webkit-scrollbar{display: none;}
                        }
                        .place_txt{
                            font-family: FZY4JW--GB1-0;
                            font-size: .3rem;
                            color: #594ABD;
                            letter-spacing: .035rem;
                        }
                        &.area{
                            position: relative;
                            &::after{
                                content: '';
                                width: .24rem;
                                height: .38rem;
                                background: url('../assets/images/address_arrow_tag.png');
                                background-size: cover;
                                position: absolute;
                                right: .3rem;
                                top: .38rem;
                            }
                        }
                    }   
                }
            }
            .distinguish_box{
                width: 6.16rem;
                height: 3.1rem;
                margin: .2rem auto 0;
                background: rgba(82,66,228,.7);
                border-radius: .16rem;
                text-align: center;
                position: relative;
                textarea{
                    width: 5.62rem;
                    margin: .25rem auto 0;
                    background: none;
                    font-family: FZY4JW--GB1-0;
                    font-size: .24rem;
                    color: #FFF;
                    letter-spacing: .024rem;
                    line-height: .36rem;
                    &::placeholder{
                        color: #6B5BE9;
                    }
                }
                .btn_group{
                    width: 2.4rem;
                    height: .7rem;
                    background-image: linear-gradient(90deg, #6E57FF 2%, #9970FE 100%);
                    box-shadow: 0 .05rem .08rem 0 #4B37A1;
                    border-radius: .35rem;
                    position: absolute;
                    right: .2rem;
                    bottom: .18rem;
                    text-align: center;
                    img{
                        display: inline-block;
                        vertical-align: top;
                        margin: auto;
                        &.delete{
                            width: .36rem;
                            height: auto;
                            margin: .14rem .4rem 0 0;
                        }
                        &.distinguish{
                            width: .38rem;
                            height: auto;
                            margin: .15rem 0 0 .36rem;
                        }
                    }
                    &::after{
                        content: '';
                        width: .02rem;
                        height: .58rem;
                        background: rgba(89,74,189,.3);
                        position: absolute;
                        top: .06rem;
                        left: 1.19rem;
                    }
                }
            }
            .btn_submit{
                width: 4.64rem;
                height: 1.14rem;
                line-height: 1rem;
                margin: .4rem auto .6rem;
                background: url('../assets/images/index_btn_active.png');
                background-size: cover;
                font-family: FZY4JW--GB1-0;
                font-size: .4rem;
                font-weight: bold;
                color: #B12C13;
                letter-spacing: .036rem;
                text-align: center;
                position: relative;
                z-index: 10;
            } 
        }
    }
    .suc_content{
        position: relative;
        .suc_hd{
            width: 7.13rem;
            height: 1.63rem;
            background: url('../assets/images/result_hd.png');
            background-size: cover;
            margin-left: .37rem;
            position: relative;
            text-align: left;
            .user_info{
                font-family: FZY4JW--GB1-0;
                font-size: .3rem;
                color: #563ACC;
                letter-spacing: .017rem;
                padding: .24rem 0 0 1.54rem;
                span{
                    font-size: .24rem;
                    color: rgba(86,58,204,.6);
                    letter-spacing: .014rem;
                    padding-left: .18rem;
                }
            }
            .address_info{
                width: 4.3rem;
                height: .6rem;
                padding: .08rem 0 0 1.54rem;
                line-height: 1.2;
                font-family: FZY4JW--GB1-0;
                font-size: .24rem;
                color: #563ACC;
                letter-spacing: .014rem;
                overflow: scroll;
                &::-webkit-scrollbar{display:none;}
            }
            &::before{
                content: '';
                width: .36rem;
                height: .46rem;
                background: url('../assets/images/result_address_tag.png');
                background-size: cover;
                position: absolute;
                left: 1rem;
                top: .38rem;
            }
        }
        .suc_box{
            width: 6.7rem;
            padding-bottom: .4rem;
            margin: -.06rem auto 0;
            background: #301DA0;
            border: .12rem solid #503DE2;
            border-radius: .3rem; 
            text-align: center; 
            .title{
                font-family: FZY4JW--GB1-0;
                font-size: .26rem;
                color: #FFF;
                letter-spacing: .03rem;
                padding: .36rem 0 .2rem;
            }
            .suc_img,.lesson_img{
                width: 6.47rem;
                height: auto;
            }
            .lesson_txt{
                font-family: FZY4JW--GB1-0;
                font-size: .26rem;
                color: #FFF;
                letter-spacing: .03rem;
                text-align: center;
                line-height: .34rem;
                padding: .2rem 0 .03rem;
            }
            .guide_txt{
                font-family: FZY4JW--GB1-0;
                font-size: .22rem;
                color: rgba(182,176,255,.7);
                letter-spacing: .025rem;
                text-align: center;
                line-height: .28rem;
                padding-bottom: .2rem;
            }
            .btn_add{
                width: 4.64rem;
                height: 1.14rem;
                line-height: 1rem;
                margin: .57rem auto 0;
                background: url('../assets/images/index_btn_active.png');
                background-size: cover;
                font-family: FZY4JW--GB1-0;
                font-size: .4rem;
                font-weight: bold;
                color: #B12C13;
                letter-spacing: .036rem;
                text-align: center;
                position: relative;
                z-index: 10;
            }
        }
    }
    .divwrap{
      max-height: 40vh;
      overflow-y: auto;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      z-index: 100;
      .distpicker-address-wrapper{
        color: #999;
        font-size: .32rem;
      }
      .address-header{
        position: fixed;
        bottom: 400px;
        width: 100%;
        background: #000;
        color:#fff;
      }
      .address-header ul li{
        flex-grow: 1;
        text-align: center;
      }
      .address-header .active{
        color: #fff;
        border-bottom:#666 solid 8px
      }
      .address-container .active{
        color: #000;
      }
    }
  }
</style>
