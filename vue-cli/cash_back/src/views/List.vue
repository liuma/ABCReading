<template>
  <div class="list">
    <ul v-if="list.length>0">
        <li :class="'li'+item.apply_status" v-for="(item,$index) in list" :key="$index">
            <div class="main_box">
                <div class="l">
                    <p class="title">{{item.title || '0元学-返学费'}}</p>
                    <p class="date">{{timestampToTime(item.create_time)}}</p>
                </div>
                <div class="r">
                    <p class="amount">¥{{item.money}}元</p>
                    <p v-if="item.apply_status == 1" :class="'sts sts'+item.apply_status">成功提现</p>
                    <p v-else-if="item.apply_status == 0" :class="'sts sts'+item.apply_status">已申请，提现中</p>
                    <p v-else-if="item.apply_status == 2" :class="'sts sts'+item.apply_status">超时未领取，已退还</p>
                    <p v-else-if="item.apply_status == 3" :class="'sts sts'+item.apply_status">未通过审核</p>
                </div>
            </div>
            <div class="reason_box" v-if="item.apply_status == 3">
                未通过原因：{{item.reason}}
            </div>
            
        </li>
    </ul>
    <div v-else class="txt_none">暂无提现记录~</div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            list:[]
        }
    },
    mounted(){
        this.getList2();
        document.title = '提现记录'
    },
    methods:{
        async getList() {
            try {
                let extendAbcOpenid = localStorage.getItem('extendAbcOpenid');
                //定义参数对象
                let params = this.$common.getParam('post',{openid:extendAbcOpenid})
                let res = await this.$api.getCashList(params);
                console.log(res)
                if(res.code==200){
                    this.list = res.data
                    // this.status = res.data.status;
                    
                }else{
                    // console.log(res.phone)   
                }
            } catch (e) {
                this.errorData = e
            }
        },
        getList2(){
            // if(Math.random()*10>5){
                this.list = [
                    {
                        title: '0元学-返学费2',
                        money: '388.00',
                        apply_status: 1,
                        create_time: '1585798933'
                    },
                    {
                        title: '0元学-返学费',
                        money: '388.00',
                        apply_status: 0,
                        create_time: '1585798944'
                    },
                    {
                        title: '0元学-返学费',
                        money: '388.00',
                        apply_status: 2,
                        create_time: '1585798933'
                    },
                    {
                        title: '0元学-返学费',
                        money: '388.00',
                        apply_status: 3,
                        create_time: '1585798933',
                        reason: '您提交的身份证信息有误，无法通过审核！'
                    }
                ]
        },
        timestampToTime(timestamp) {
            let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            let Y = date.getFullYear() + '.';
            let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
            let D = date.getDate() + '  ';
            let h = date.getHours() + ':';
            let m = date.getMinutes();
            //   var s = date.getSeconds();
            return Y+M+D+h+m;
        }
    }
}
</script>
<style lang="less" scope>
    .txt_none{
        padding-top: 100px;
        font-family: PingFangSC-Regular;
        font-size: 48px;
        color: #262423;
        letter-spacing: 0;
    }
    li{
        margin: 24px auto;
        width: 686px;
        min-height: 154px;
        background: #FFFFFF;
        box-shadow: 0 2px 8px 0 rgba(38,36,35,0.12);
        border-radius: 12px;
        &.li3{
            padding-bottom: 32px;
        }
        .main_box{
            margin: auto;
            display: flex;
            .l{
                width: 50%;
                text-align: left;
                padding: 32px 0 0 32px;
                .title{
                    font-family: PingFangSC-Regular;
                    font-size: 32px;
                    color: #262423;
                    letter-spacing: 0;
                    padding-bottom: 15px;
                } 
                .date{
                    font-family: PingFangSC-Regular;
                    font-size: 20px;
                    color: rgba(57,53,51,.6);
                    letter-spacing: 0;
                } 
            }
            .r{
                width: 50%;
                text-align: right;
                padding: 32px 32px 0 0;
                .amount{
                    font-family: PingFangSC-Regular;
                    font-size: 32px;
                    color: #EE484B;
                    letter-spacing: 0;
                    text-align: right;
                    padding-bottom: 12px;
                }
                .sts{
                    font-family: PingFangSC-Semibold;
                    font-weight: bold;
                    font-size: 24px;
                    letter-spacing: 0;
                    text-align: right;
                    &.sts1{
                        color: #56B825;
                    }
                    &.sts0{
                        color: #F9822B;;
                    }
                    &.sts2{
                        // color: rgba(57,53,51,.6);
                    }
                }
            } 
        } 
        .reason_box{
            width: 590px;
            padding: 16px 16px;
            margin: 14px auto 0;
            background: rgba(235,233,233,.6);
            border-radius: 12px;
            font-family: PingFangSC-Regular;
            font-size: 24px;
            text-align: left;
            color: #393533;
            letter-spacing: 0;
        }
    }
</style>
