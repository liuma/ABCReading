<template>
  <div class="result">
    <img src="../assets/images/result_hd.png" class="result_hd">
    <img src="../assets/images/result_txt_suc.png" class="result_txt_suc">
    <p class="txt_tips">
      信息审核中… …<br/>
      将在48小时内审核完成哦
    </p>
    <div class="code_wrap">
      <div class="code_box"></div>
    </div>
    <p class="code_txt">
      关注公众号<br/>
      查询审核结果
    </p>
  </div>
</template>
<script>
import Eject from './Eject'
export default {
  name: 'Submit',
  components: {
    eject: Eject,
  },
  data(){
    return{
    }
  },
  created(){
  },
  mounted(){
    // this.getIndexInfo()
  },
  methods:{
    getIndexInfo(){
      let openid = window.localStorage.getItem('voteOpenid')
      let memberId = window.localStorage.getItem('voteMemberid')
      let indexUrl = this.$common.config.gzhUrl + 'v3/vote/vote/home'
      let fd = this.$common.getParam('get',{openid:openid,member_id:memberId});

    },
    toResult(){
      this.$router.push({name:'Result'})
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
  .result{
    position: relative;
    background: #392E70;
    min-height: 100vh;
    .result_hd{
      width: 100%;
      height: auto;
      z-index: 1;
      position: relative;
    }
    .result_txt_suc{
      width: 4.84rem;
      height: auto;
      margin-top: .9rem;
    }
    .txt_tips{
      font-family: FZY4JW--GB1-0;
      font-size: .25rem;
      font-weight: bold;
      color: #fff;
      letter-spacing: 0.0077rem;
      text-align: center;
      line-height: .4rem;
      padding: .17rem 0 .3rem;
    }
    .code_wrap{
      width: 4rem;
      height: 3.86rem;
      background: #8159C9;
      border-radius: .2rem;
      margin: auto;
      padding-top: .14rem;
      .code_box{
        width: 3.72rem;
        height: 3.72rem;
        background: #fff;
        margin: auto;
        border-radius: .2rem;
      }
    }
    .code_txt{
      font-family: FZY4JW--GB1-0;
      font-size: .25rem;
      font-weight: bold;
      color: #FFFFFF;
      letter-spacing: 0.0077rem;
      text-align: center;
      line-height: .4rem;
      padding: .28rem 0 .1rem;
    }
  }
</style>
