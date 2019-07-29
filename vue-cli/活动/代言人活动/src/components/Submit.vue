<template>
  <div class="submit">
    <img src="../assets/images/submit_hd.png" class="submit_hd">
    <div class="submit_video_wrap">
      <label for="vidInput" class="btn_add"></label>
      <p class="add_txt">上传你的代言视频吧!</p>
      <p class="add_tips">请保持在1分钟以内</p>
    </div>
    <input ref="vidInput" id="vidInput" class="Hidden" type="file" capture="camcorder" accept="video/*" @change="uploadVideo()">
    <!-- <input id="vidInput" class="Hidden" type="file" accept="video/*"> -->
    <div class="submit_panel">
      <ul>
        <li>
          <span class="txt">宝宝昵称：</span>
          <div class="input_group input_group_name">
            <input type="text" maxlength="6" placeholder="输入昵称..." v-model="userInfo.nick_name">
          </div>
        </li>
        <li>
          <span class="txt">地区：</span>
          <div class="input_group input_group_province" @click="isShowProvince=!isShowProvince">
            {{userInfo.province_name}}
            <div class="icon"></div>
          </div>
          <div class="input_group input_group_city" @click="isShowProvince=!isShowProvince">
            {{userInfo.city_name}}
            <div class="icon"></div>
          </div>
        </li>
        <li>
          <span class="txt">年龄：</span>
          <select class="input_group input_group_age" v-model="userInfo.age">
            <option v-for="opt in ageOptions" :value="opt.val">
              {{opt.name}}
            </option>
          </select>
          <!--<div class="input_group input_group_age">-->
            <!--<div class="icon"></div>-->

          <!--</div>-->
        </li>
        <li>
          <span class="txt">使用ABC Reading时长：</span>
          <select class="input_group input_group_time" v-model="userInfo.use_time">
            <option v-for="opt in timeOptions" :value="opt.val">
              {{opt.name}}
            </option>
          </select>
        </li>
        <li>
          <span class="txt">在读绘本级别：</span>
          <select class="input_group input_group_level" v-model="userInfo.reading_book_level">
            <option v-for="opt in levelOptions" :value="opt.val">
              {{opt.name}}
            </option>
          </select>
        </li>
        <li class="li_h">
          <p class="txt">使用ABC Reading前的英语水平：</p>
          <select class="input_group" v-model="userInfo.before_level">
            <option v-for="opt in beforeOptions" :value="opt.val">
              {{opt.name}}
            </option>
          </select>
        </li>
        <li class="li_h">
          <p class="txt">使用ABC Reading后的英语水平：</p>
          <select class="input_group" v-model="userInfo.after_level">
            <option v-for="opt in afterOptions" :value="opt.val">
              {{opt.name}}
            </option>
          </select>
        </li>
        <li class="li_h">
          <p class="txt">手机号（获奖时会联系您哦）：</p>
          <div class="input_group input_group_phone">
            <input type="tel" maxlength="11" placeholder="输入手机号..." v-model="userInfo.phone">
          </div>
        </li>
      </ul>
      <div class="divwrap" v-show="isShowProvince" >
        <v-distpicker type="mobile" hide-area @selected="onSelected"></v-distpicker>
      </div>
    </div>
    <div class="submit_btn" @click="toResult()">提 交</div>
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
      levelOptions: [],
      ageOptions: [],
      timeOptions: [],
      beforeOptions: [],
      afterOptions: [],
      userInfo:{
        nick_name: '',
        phone: '',
        reading_book_level: 1,
        age: 1,
        use_time: 1,
        before_level: 1,
        after_level: 1,
        province_name: '',
        province_id: '',
        city_name: '',
        city_id: '',
        video: 'http://qnfile.abctime.com/abctime_adv90.mp4',
        code: 562655,
        video: ''
      },
      isShowProvince:false,
      ejectText: '',
      ejectStatus: false,
    }
  },
  created(){
  },
  mounted(){
    // this.getIndexInfo()

    this.levelOptions = this.$parent.$data.levelList;
    this.ageOptions = this.$parent.$data.ageList;
    this.timeOptions = this.$parent.$data.timeList;
    this.beforeOptions = this.$parent.$data.beforeList;
    this.afterOptions = this.$parent.$data.afterList;
  },
  methods:{
    getIndexInfo(){
      let openid = window.localStorage.getItem('voteOpenid')
      let memberId = window.localStorage.getItem('voteMemberid')
      let indexUrl = this.$common.config.gzhUrl + 'v3/vote/vote/home'
      let fd = this.$common.getParam('get',{openid:openid,member_id:memberId});

    },
    onSelected(data) {
      this.userInfo.province_name = data.province.value
      this.userInfo.province_id = data.province.code
      this.userInfo.city_name = data.city.value
      this.userInfo.city_id = data.city.code
      this.isShowProvince = false
    },
    toResult(){
      let openid = window.localStorage.getItem('voteOpenid')
      let memberId = window.localStorage.getItem('voteMemberid')
      this.userInfo.openid = openid;
      this.userInfo.member_id = memberId;
    //   if(!this.userInfo.nick_name){
    //     this.showEject('宝宝昵称不能为空哦～')
    //     return;           
    //   }
    //   if(!this.userInfo.province_name){
    //     this.showEject('请选择地区')
    //     return;           
    //   }
    //   if(!this.$common.VL.phNum(this.userInfo.phone)){
    //     this.showEject('请输入正确的手机号～')
    //     return;
    //   }
    //   if(!this.userInfo.video){
    //     this.showEject('视频不能为空')
    //     return;           
    //   }
      
      let userObj = JSON.parse(JSON.stringify(this.userInfo));
      delete userObj.province_name;
      delete userObj.city_name;
      if(this.userInfo.province_id == 100001){
          userObj.province_id = 100000
      };
      let fd = this.$common.getParam('get',userObj);
       let conf = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
      let subUrl = this.$common.config.gzhUrl + 'v3/vote/vote/submit'
      this.$axios.post(subUrl,fd,conf).then((res) => {
        if(res.data.code == 200){
            this.$route.push({name:'Result'})
        }
      })
    //   this.$router.push({name:'Result'})
    },
    showEject: function (text) {
      this.ejectText = text
      this.ejectStatus = true
    },
    initEject: function () {
      this.ejectStatus = false
    },
    uploadVideo(){
        let _this = this;
        let OSS = require('ali-oss/dist/aliyun-oss-sdk');
        // let client = new OSS({
        //     region: 'oss-cn-beijing',
        //     //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用STS方式来进行API访问
        //     accessKeyId: '<Your accessKeyId(STS)>',
        //     accessKeySecret: '<Your accessKeySecret(STS)>',
        //     stsToken: '<Your securityToken(STS)>',
        //     bucket: 'abcreading-file'
        // });
        let memberId = window.localStorage.getItem('voteMemberid')
        let file = this.$refs.vidInput.files[0];
        let storeAs = 'vote_video_'+memberId+'.mp4';
        let indexUrl = this.$common.config.gzhUrl + 'v3/api/api/ali-sts'
        let fd = this.$common.getParam('get',{member_id:memberId,version:1});
        this.$axios.get(indexUrl+'?'+fd).then((res) => {
            if(res.data.code == 200){
                console.log(res.data);
                let client = new OSS({
                    region: 'oss-cn-beijing',
                    //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，创建并使用STS方式来进行API访问
                    accessKeyId: res.data.data.AccessKeyId,
                    accessKeySecret: res.data.data.AccessKeySecret,
                    stsToken: res.data.data.SecurityToken,
                    bucket: 'abcreading-video',
                    // endpoint: 'http://file.abctime.com',
                    // cname: true
                });
                // client.multipartUpload(storeAs, file).then(function (result) {
                client.put(storeAs, file).then(function (result) {
                    console.log(result)
                    // _this.userInfo.video = encodeURIComponent(result.res.requestUrls[0]);
                    _this.userInfo.video = 'https://abcreading-video.oss-cn-beijing.aliyuncs.com/'+storeAs;
                }).catch(function (err) {
                    console.log(err);
                });
            }
        })


        



	  // OSS.urlib是sdk内部封装的发送请求的逻辑，开发者可以使用任何发送请求的库向`sts-server`发送请求
	//   OSS.urllib.request(_this.$common.config.gzhUrl+'v3/api/api/ali-sts', {method: 'GET'}, (err, response) => {
    //       console.log(err)
    //       console.log(response)
	// 	  if (err) {
	// 		return alert(err);
	// 	  }
	// 	  try {
    //         result = JSON.parse(response);
    //         console.log(result);
	// 	  } catch (e) {
	// 		return alert('parse sts response info error: ' + e.message);
	// 	  }
	// 	  let client = new OSS({
	// 		accessKeyId: result.AccessKeyId,
	// 		accessKeySecret: result.AccessKeySecret,
	// 		stsToken: result.SecurityToken,
	// 		endpoint: '<oss endpoint>',
	// 		bucket: '<Your bucket name>'
	// 	  });
    //       //storeAs表示上传的object name , file表示上传的文件
	// 	  client.multipartUpload(storeAs, file).then(function (result) {
	// 		console.log(result);
	// 	  }).catch(function (err) {
	// 		console.log(err);
	// 	  });
	// 	});


    },
  }
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
  .submit{
    position: relative;
    background: #392E70;
    padding-bottom: .3rem;
    .submit_hd{
      width: 100%;
      height: auto;
      z-index: 1;
      position: relative;
    }
    .submit_video_wrap{ 
      width: 6.86rem;
      height: 4.9rem;
      background: url('../assets/images/submit_video_bg.png');
      background-size: cover;
      margin: -2.45rem 0 0 .64rem;
      position: relative;
      z-index: 2;
      padding-top: 1.72rem;
      .btn_add{
        display: block;
        width: 1.88rem;
        height: 1.88rem;
        background: url('../assets/images/submit_video_add.png');
        background-size: cover;
        margin-left: 2.34rem;
      }
      .add_txt{
        font-family: FZY4JW--GB1-0;
        font-size: .28rem;
        font-weight: bold;
        color: #FFFFFF;
        letter-spacing: .008rem;
        text-align: center;
        line-height: .34rem;
        padding: .4rem 0 .16rem;
        margin-left: -.4rem;
      }
      .add_tips{
        opacity: 0.49;
        font-family: FZY4JW--GB1-0;
        font-size: .22rem;
        color: rgba(255,255,255,.5);
        letter-spacing: .008rem;
        text-align: center;
        line-height: .34rem;
        margin-left: -.4rem;
      }
    }
    .submit_panel{
      width: 7.1rem;
      height: 12.94rem;
      background: url('../assets/images/submit_panel_bg.png');
      background-size: cover;
      margin: .4rem auto;
      ul{
        padding: 1.34rem 0 0 .56rem;
        li{
          width: 6rem;
          height: .7rem;
          padding-bottom: .3rem;
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
            background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAXCAMAAADneDWzAAAAOVBMVEUAAAAtLS0wMDAtLS0zMzNRUVEtLS0uLi4tLS0uLi4tLS0sLCwsLCwuLi4tLS0sLCwwMDArKysvLy//fX8FAAAAE3RSTlMAmRWTDAZ8dT40j4uEbltXSyQbsQLncgAAAFlJREFUGNONkFkSgCAMQxMoi/ty/8M6iIj58/1lOm2ToBLwYYiuCzcxvdOQSK5NbSzkZ4k3/ijiHFmZDbDIxhKw+06GuY7hN7qnN/WfelGfmkHzaXbtRTu7AI37AndbGJNZAAAAAElFTkSuQmCC') no-repeat scroll calc(~'100% - .13rem') center transparent;
            background-size: .13rem .23rem;
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
            &.input_group_name{
              width: 4.26rem;
            }
            &.input_group_province{
              width: 2.35rem;
              margin-right: .05rem;
            }
            &.input_group_city{
              width: 2.22rem;
            }
            &.input_group_age{
              width: 4.8rem;
            }
            &.input_group_level{
              width: 3.5rem;
            }
            &.input_group_time{
              width: 2.87rem;
            }
            &.input_group_name,&.input_group_phone{
              background-image: none;
            }
            .icon{
              width: .13rem;
              height: .23rem;
              background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAXCAMAAADneDWzAAAAOVBMVEUAAAAtLS0wMDAtLS0zMzNRUVEtLS0uLi4tLS0uLi4tLS0sLCwsLCwuLi4tLS0sLCwwMDArKysvLy//fX8FAAAAE3RSTlMAmRWTDAZ8dT40j4uEbltXSyQbsQLncgAAAFlJREFUGNONkFkSgCAMQxMoi/ty/8M6iIj58/1lOm2ToBLwYYiuCzcxvdOQSK5NbSzkZ4k3/ijiHFmZDbDIxhKw+06GuY7hN7qnN/WfelGfmkHzaXbtRTu7AI37AndbGJNZAAAAAElFTkSuQmCC');
              background-size: cover;
              position: absolute;
              top: .21rem;
              right: .13rem;
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
      margin: -.2rem auto 0;
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