<template>
  <div class="address">
    <img src="../assets/images/address_hd.png" class="address_hd">
    <div class="address_panel">
      <p class="title">请填写正确的信息，<br/>
        以保证您可顺利收到奖品哦</p>
      <ul>
        <li>
          <span class="txt">收货人：</span>
          <div class="input_group">
            <input type="text" maxlength="6" placeholder="输入收货人姓名..." v-model="userInfo.name">
          </div>
        </li>
        <li>
          <p class="txt">联系电话：</p>
          <div class="input_group">
            <input type="tel" maxlength="11" placeholder="输入手机号..." v-model="userInfo.phone">
          </div>
        </li>
        <li>
          <span class="txt">地区：</span>
          <div class="input_group" @click="isShowProvince=!isShowProvince">
            {{userInfo.province_name}} {{userInfo.city_name}} {{userInfo.area_name}}
          </div>
        </li>
        <li>
          <span class="txt">详细地址：</span>
          <div class="input_group input_group_address">
            <textarea rows="5" v-model="userInfo.address"></textarea>
          </div>
        </li>
      </ul>
      <div class="divwrap" v-show="isShowProvince" >
        <v-distpicker type="mobile" @selected="onSelected"></v-distpicker>
      </div>
    </div>
    <div class="submit_btn" @click="submitAddress()">提 交</div>
    <eject :message="ejectText" :showState="ejectStatus"></eject>
  </div>
</template>
<script>
import Eject from './Eject'
import VDistpicker from 'v-distpicker'

export default {
  name: 'Submit',
  components: {
    VDistpicker,
    eject: Eject,
  },
  data(){
    return{
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
      ejectText:'',
      ejectStatus: false,
    }
  },
  created(){
  },
  mounted(){
    // this.getIndexInfo()
  },
  methods:{
    showEject: function (text) {
      this.ejectText = text
      this.ejectStatus = true
    },
    initEject: function () {
      this.ejectStatus = false
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
    submitAddress(){
      if(!this.userInfo.name){
        this.showEject('收货人姓名不能为空');
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
      if(!this.userInfo.address){
        this.showEject('请输入详细地址');
        return
      }

        let fdObj = this.userInfo;
        let member_id = localStorage.getItem('voteMemberid'),openid = localStorage.getItem('voteOpenid');
        fdObj.member_id = member_id;
        fdObj.openid = openid;
        let _this = this;
        let fd = this.$common.getParam('get',fdObj);
        let orderUrl = this.$common.config.gzhUrl + 'v3/vote/vote/prize-address'
        let conf = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
        this.$axios.post(orderUrl,fd,conf).then((res) => {
          if(res.data.code == 200){

          }else{
            _this.showEject(res.data.msg)
          }
        })
    },
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
  .address{
    position: relative;
    background: #392E70;
    padding-bottom: .3rem;
    .address_hd{
      width: 100%;
      height: auto;
      z-index: 1;
      position: relative;
    }
    .address_panel{
      width: 7.1rem;
      height: 10.67rem;
      background: url('../assets/images/address_con_bg.png');
      background-size: cover;
      margin: auto;
      .title{
        padding-top: 1.35rem;
        font-family: FZY4JW--GB1-0;
        font-size: .3rem;
        color: #7A5756;
        letter-spacing: .01rem;
        text-align: center;
        line-height: .4rem;
      }
      ul{
        padding: .6rem 0 0 .56rem;
        li{
          width: 6rem;
          height: .7rem;
          padding-bottom: .6rem;
          text-align: right;
          position: relative;
          font-family: FZY4JW--GB1-0;
          font-size: .26rem;
          font-weight: bold;
          color: #7A5757;
          letter-spacing: .007rem;
          .txt{
            position: absolute;
            left: 0;
            top: 0;
            text-align: left;
            line-height: .7rem;
            /*font-family: FZY4JW--GB1-0;*/
            /*font-size: .26rem;*/
            /*font-weight: bold;*/
            /*color: #7A5757;*/
            /*letter-spacing: .007rem;*/
          }
          .input_group{
            height: .7rem;
            line-height: .7rem;
            background-color: #DCB932;
            border-radius: .12rem;
            display: inline-block;
            vertical-align: top;
            text-align: left;
            position: relative;
            font-family: FZY4JW--GB1-0;
            font-size: .26rem;
            font-weight: bold;
            color: #7A5757;
            letter-spacing: .007rem;
            padding-left: .2rem;
            width: 4.26rem;
            &.input_group_address{
              line-height: 1.5;
              height: auto;
            }
            input{
              background: #DCB932;
              font-family: FZY4JW--GB1-0;
              font-size: .26rem;
              font-weight: bold;
              color: #7A5757;
              letter-spacing: .007rem;
              &::placeholder{
                font-weight: normal;
              }
            }
            textarea{
              width: 3.6rem;
              background: #DCB932;
              font-family: FZY4JW--GB1-0;
              font-size: .26rem;
              font-weight: bold;
              color: #7A5757;
              letter-spacing: .007rem;
              padding: .2rem .2rem .2rem 0;
              &::placeholder{
                font-weight: normal;
              }
            }
          }
          &.li_h{
            height: 1.2rem;
            .txt{
              position: relative;
              text-align: left;
              line-height: .6rem;
              font-family: FZY4JW--GB1-0;
              font-size: .26rem;
              font-weight: bold;
              color: #7A5757;
              letter-spacing: .007rem;
            }
            .input_group{
              width: 6rem;
              &.input_group_phone{
                width: 5.8rem;
              }
            }

          }
        }
      }
    }
    .submit_btn{
      width: 6.3rem;
      height: 1.2rem;
      line-height: 1.2rem;
      margin: -1.2rem auto 0;
      background-image: linear-gradient(180deg, #FFA9A9 0%, #FF2844 100%);
      box-shadow: 0 .06rem .18rem 0 #FF1E00;
      border-radius: .67rem;
      font-family: FZY4JW--GB1-0;
      font-size: .48rem;
      font-weight: bold;
      color: #FFF;
      letter-spacing: .1rem;
      text-align: center;
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
