<template>
    <div class="main">
        <div class="title_tag">
            <p class="txt">根据国家税务要求请填写个人身份信息，作为凭证</p>
            <p class="txt_link">查看《提现信息收集说明》</p>
        </div>
        <div class="wx_box">
            <span>微信号</span>
            <input type="text" placeholder="请输入您的微信号"/>
        </div>
        <div class="card_img_box">
            <p class="txt_title">身份证照片</p>
            <p class="txt_info">
                1.身份证照片不得有遮挡，保证自己清晰<br/>
                2.请从证件的正上方拍摄，防止画面变形<br/>
                3.请在白色背景下拍摄，保证身份证边缘清晰
            </p>
            <div class="card_imgs">
                <input id="file_face" class="Hidden" type="file" @change="checkImg($event,1)">
                <label for="file_face" class="img_wrap card_face">
                    <img v-show="card.img_face" :src="card.img_face">
                </label>
                <input id="file_back" class="Hidden" type="file" @change="checkImg($event,2)">
                <label for="file_back" class="img_wrap card_back">
                    <img v-show="card.img_back" :src="card.img_back">
                </label>
            </div>
        </div>
        <div class="card_txt_box">
            <div class="name_box">
                <span>姓名</span>
                <input type="text" v-model="card.name"/>
            </div>
            <div class="num_box">
                <span>身份证号</span>
                <input type="text" v-model="card.num"/>
            </div>
        </div>
        <div class="order_img_box">
            <p class="txt_title">购买ABC年卡订单截图</p>
            <div class="card_imgs">
                <div class="img_wrap img_order"></div>
            </div>
        </div>
        <p class="txt_tag_ft">请务必填写真实的信息，若信息有误，则不可进行体现<br/>
            <input type="checkbox" id="agreeTag"><label for="agreeTag">我已阅读并同意《返现说明》</label>
        </p>
        <div class="btn_submit">提交提现申请</div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[],
            card: {
                name: '张三',
                num: '132222180009094455',
                img_face: '',
                img_back: ''
            }
        }
    },
    mounted(){
        // this.getList();
        document.title = '提现申请'
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
        },
        checkImg(e,flag){
            let file = e.target.files[0],_this = this;
            if(file.size > 0){
                let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function (e) {
                    let imgcode = e.target.result;
                    if(flag == 1){
                        _this.card.img_face = imgcode;
                    }else{
                        _this.card.img_back = imgcode;
                    }
                    _this.checkCardImg(imgcode,flag);
                }
            }
                
        },
        async checkCardImg(imgBase64,sideTag) {
            console.log(imgBase64);    
            console.log(sideTag);    
            try {
                //定义参数对象
                let params = {
                    "image": imgBase64.split(',')[1],
                    "configure": {"side": sideTag==1?'face':'back'}
                }
                let res = await this.$api.checkCard(params);
                console.log(res)
                if(res.code==200){
                    // this.list = res.data
                    // this.status = res.data.status;
                    
                }else{
                    // console.log(res.phone)   
                }
            } catch (e) {
                this.errorData = e
            }
        },
    }
}
</script>
<style lang="less" scope>
    .main{
        padding-bottom: 72px;
    }
    .title_tag{
        position: relative;
        width: 686px;
        height: 122px;
        margin: 32px auto 44px;
        background: rgba(249,130,43,.1);
        border-radius: 8px;
        text-align: left;
        .txt{
            padding: 24px 0 0 90px;
            font-family: PingFangSC-Medium;
            font-size: 24px;
            color: #F9822B;
            letter-spacing: 0;
        }
        .txt_link{
            padding-left: 90px;
            font-family: PingFangSC-Regular;
            font-size: 24px;
            color: #409EFF;
            letter-spacing: 0;
        }
        &::before{
            display: block;
            content: '';
            width: 52px;
            height: 52px;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAMAAADypuvZAAAAXVBMVEUAAAD6hCz6giv6giv6gyz5gyz/hTH6gyz8gi7/iDP6gyv6gyz6gyv5gyz6giz7hS7/tkL6gyz6gyv6gyz7hSz/hC75gyv5gyv5gyz7gyz/mTP5giz6gyz7hCz5givTsU3eAAAAHnRSTlMAXb36jd4kZikT8y/t45U2BKnBa0YbreCGfwq0nnoGzfV/AAABT0lEQVRIx52W2XKDMAxFFe9mTUggS1v9/2d27BlKE65DxHnEc4C5smwRwPlO2UbrxqrOO/qA2rT8RGvqDaVXDFA9lXEnLnByhDkazUW0OSInKn6LimsnWN7AhlfnUvEm1eXlO8AB1tO3ouWPsPFfbiADM7pvkMaSoeEVU3qO3vVXU1AfnxbOoF5zldE+OKSFA9oblOlZInGfJSWTVO4FlklcL9GVJBxgK5VaIsdSiR15ueSpk0sdKbmkyMolS41cakjLJb1L2vV7u4LYFflSXNi5kG7ZRqBBv0ovDIz5iaNhjEutIaTNTSjE5HbHaM2YfDEODKj84+ErGHj5CDsXI+8pM4GlmBYirkUmgL8f08JYPJZxgPf0/I6imzmus9C3EG4aXjUz8Sq81DK18PqUX9QL9VU4EmTiIBg+BGMOJEyCgWqhHwSjm2RIxIStcfQXaPHgn3FMPu4AAAAASUVORK5CYII=");
            background-size: cover;
            position: absolute;
            top: 24px;
            left: 24px;
        }
    }
    .wx_box,.name_box,.num_box{
        position: relative;
        width: 686px;
        height: 94px;
        line-height: 94px;
        margin: auto;
        border-bottom: 2px solid #EBE9E9;
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #262423;
        letter-spacing: 0;
        text-align: right;
        span{
            position: absolute;
            left: 0;
            top: 0;
        }
        input{
            width: 400px;
            font-size: 30px;
            text-align: right;
            &::placeholder{
                color: #C0C0BF;
            }
        }
    }
    .img_wrap{
        background: #EBE9E9;
        border-radius: 16px;
        overflow: hidden;
        position: relative;
        &::before{
            display: block;
            content: '';
            width: 80px;
            height: 63px;
            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAA/CAMAAABAbb8QAAAAY1BMVEX///8AAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////53ATpAAAAIXRSTlOYAIE5C3+FjWccBwSRe1xtPVInEAJ3FldMMSSKRnFBLGCjFz6NAAACPUlEQVRYw8XYbW+zIBSA4YOiiOBrfW9r+/9/5RM8JmszoM+hJLu/LMvitVrw0A3Yh8om+1VTMmcfwQIsFeHgDazdQsEeHPVh4EW4QHEJAVUFzioVANbg6ekFFbe0g7edv6V+wLLLIUJ5VyLYIxeD7A0oIWKSgapigpWCFrCkGGOILeCzqlfGmIzwYgtAJMUHQ39/z5CYL1fHTqaXIHj3zxY6mJ/gDI7GpX3Ibd3n/DP4Mo34FWxl7ctokYv+H/AqjddYt386sLf4/AHEmu5pHX61ZUzJ3At6a5ktfg8FH6cw9F0xVsW8luf3TRh4vr5yEXCma1wgnoSAM3rr2+LrnZkmQQdzZd/t9bHsOx1cLR6Kx6mRU8Hx8B7O9zalgumxHtaHR5uVUZoIcgMunuUqSCBOoEGANV3iPVPAxYC9b8EmEohvfAeYdaFLEohPXeF9QwQJlOaS0TkEzE8TEriZSyqwhzP+SgFxGza+XT8ACbx5j8HCnLo08ImPl6Md9xQFFGamcHA04RlJAfEkLDyDI6eBOKQm9xaQ5Hk4OZ+VAncAEcTLBssBl5nRsAEZxKePj78umswvGgNAcdy0quGthuMODQAh4czUV6+fTJipDTzoq/Nj0tZlGkDn9UOdXiAI1+3nL2fOzoYZgkCsQ+cleYdvQBC38pWbngDhIKabdlLHXculAiCAvkSWaMBigNifgFlcMIMmLtjAEhdc4CJieuICLI0JpgxwJkeqw39ibFmkFd6YAU1yTb9ulQf1DwyLFzsfVpQMAAAAAElFTkSuQmCC");
            background-size: cover;
            position: absolute;
            top: calc(~'50% - 32px');
            left: calc(~'50% - 40px');
        }
        img{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2;
        }
        input{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 3;
        }
    }
    .card_img_box{
        padding: 26px 0 0 32px;
        text-align: left;
        font-family: PingFangSC-Regular;
        letter-spacing: 0;
        .txt_title{
            font-size: 32px;
            color: #262423;
        }
        .txt_info{
            padding-top: 8px;
            font-size: 20px;
            color: rgba(57,53,51,.6);
        }
        .card_face,.card_back{
            position: relative;
            display: inline-block;
            margin: 32px 32px 0 0;
            width: 300px;
            height: 190px;
            &::after{
                width: 100%;
                position: absolute;
                top: 206px;
                font-family: PingFangSC-Regular;
                text-align: center;
                font-size: 24px;
                color: #393533;
                letter-spacing: 0;
            }
            &.card_face::after{
                content: '身份证正面照';
            }
            &.card_back::after{
                content: '身份证背面照';
            }
        }
        
    }
    .card_txt_box{
        width: 686px;
        margin: 80px auto 0;
        border-top: 2px solid #EBE9E9;
    }
    .order_img_box{
        width: 686px;
        margin: auto;
        padding: 26px 0 81px 32px;
        text-align: left;
        font-family: PingFangSC-Regular;
        letter-spacing: 0;
        border-bottom: 2px solid #EBE9E9;
        .txt_title{
            font-size: 32px;
            color: #262423;
        }
        .img_order{
            position: relative;
            display: inline-block;
            margin: 32px 32px 0 0;
            width: 240px;
            height: 240px;
            &::after{
                content: '年卡订单截图';
                width: 100%;
                position: absolute;
                top: 256px;
                font-family: PingFangSC-Regular;
                text-align: center;
                font-size: 24px;
                color: #393533;
                letter-spacing: 0;
            }
        }
        
    }
    .txt_tag_ft{
        padding: 48px 0 24px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #EE484B;
        letter-spacing: 0;
        text-align: center;
    }
    .btn_submit{
        width: 628px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-weight: bold;
        margin: auto;
        background: #D0CBC6;
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        font-size: 40px;
        color: #FFF;
        letter-spacing: 7.09px;
        border-radius: 50px;
        &.active{
            background-image: linear-gradient(135deg, #FEBA40 0%, #FF7360 100%);
        }
    }
</style>
