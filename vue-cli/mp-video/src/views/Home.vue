<template>
  <div class="home">
    <Login v-if="!hasLogin" :hasLogin.sync='hasLogin' :userData.sync='userData'></Login>
    <div v-else class="main_box">
        <img @click="toAppGroup()" class="img_hd" src="https://qnwechat.abctime.com/group_banner.png">
        <div class="txt_hd">ABC Reading美国小学绘本馆</div>
        <ul>
            <li v-for="(item,index) in productList" :key=index @click="toProduct(item.product_id)">
                <img class="li_img" :src="'https://qnfile.abctime.com/abc_h5/mp/list_'+ item.product_id +'.png'">
                <img class="btn_img" @click.stop="toBookList(item.product_id)" :src="item.is_pay?'https://qnfile.abctime.com/abc_h5/mp/study_now.png':'https://qnfile.abctime.com/abc_h5/mp/listen_now.png'">
            </li>
        </ul>
    </div>
    <eject :message="ejectText" :showState="ejectStatus"></eject>
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
import Eject from '@/components/Eject.vue'

export default {
    name: 'Home',
    components: {
        Login,
        Eject
    },
    data (){
        return {
            hasLogin: false,
            userData: {},
            productList:[],
            errorData:{},
            ejectText:'',
            ejectStatus: false,
            newSts: false
        }
    },
    created(){
        this.matches();
        this.getMemInfo();
    },
    mounted(){

    },
    methods: {
        toBookList(pid){
            this.$router.push({
                path: `/list/${pid}`
            })
        },
        toProduct(pid){
            this.$router.push({
                path: `/product/${pid}`
            })
        },
        toAppGroup(){
            location.href = window.location.origin + '/app_h5/appGroup.html'
        },
        async matches() {
            // 这里用try catch包裹，请求失败的时候就执行catch里的
            try {
                //定义参数对象
                let params = {
                    type: 'zc'
                }
                let res = await this.$api.wxConfig(params)
                this.confData = res;
            } catch (e) {
                this.errorData = e
            }
        },
        async getMemInfo() {
            try {
                let extendAbcOpenid = localStorage.getItem('extendAbcOpenid');
                //定义参数对象
                
                let params = this.$common.getParam('post',{openid:extendAbcOpenid})
                let res = await this.$api.getMemberInfo(params)
                if(res.code==200 && res.data.phone){
                    this.hasLogin = true;
                    this.userData = res.data;
                    this.getListInfo();
                }else{
                    // console.log(res.phone)   
                }
            } catch (e) {
                this.errorData = e
            }
        },
        async getListInfo() {
            try {
                let memberId = localStorage.getItem('extendAbcMemberid');
                //定义参数对象
                let params = this.$common.getParam('post',{member_id:memberId})
                let res = await this.$api.getHomeList(params);
                if(res.code==200){
                    this.productList = Object.values(res.data);
                }else{
                    // console.log(res.phone)   
                }
            } catch (e) {
                this.errorData = e
            }
        }, 
        toGzh(){
            location.href = 'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI3MTg2NjA5Mw==#wechat_redirect';
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
<style lang="less" scope>
    .home{
        position: relative;
    }
    .main_box{
        .img_hd{
            width: 100%;
        }
        .txt_hd{
            background: #fff;
            margin: 23px 0 23px 23px;
            text-align: left;
            padding-left: 23px;
            border-left: 6px solid #F6844D;
            font-size: 24px;
            color: #909A9F;
            letter-spacing: 1px;
            font-family: Arial;
            font-weight: bold;
        }
        ul{
            background: #FFE371;
            padding: 20px 0;
            li{
                width: 700px;
                height: 283px;
                margin: 0 auto 20px;
                position: relative;
                .li_img{
                    width: 100%;
                    height: 100%;
                }
                .btn_img{
                    width: 228px;
                    height: 78px;
                    display: block;
                    position: absolute;
                    right: 30px;
                    bottom: 20px;
                }
            }
        }
    }
</style>
