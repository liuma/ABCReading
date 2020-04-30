<template>
  <div class="list">
    <ul>
        <li v-for="(item,$index) in bookList" :key="$index">
            <p class="lesson_num">lesson{{$index+1}}</p>
            <div class="lesson_box" @click="showVideo(item.video_url,item.is_lock)">
                <img class="cover" :src="item.pic">
                <div v-show="!item.is_lock" class="locked"></div>
                <div class="book_info">
                    <p class="book_name">《{{item.book_name}}》</p>
                    <p class="book_desc">Words: {{item.words_num}}<span>{{item.visited_nums}}</span></p>
                </div>
            </div>
        </li>
    </ul>
    <div v-show="showVideoBox" class="video_wrap">
        <img @click="closeVideo()" class="close" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADIAgMAAADQNkYNAAAADFBMVEUAAADm5ubn5+fm5uZvNYZ9AAAAA3RSTlMAqlW1nzXGAAACjElEQVRo3ozPsXFCQRAE0ZMcGUpAnhz5SkGRCRKjSIEQCAIDB4ajagCjjT6srd1/M7xx//2Mxd/Xc9qtPvl/DO/5W3vxlm2nzxzWnnzk2Ok3p7Un3zl32uey9mSTaylJMUpJtqWkGKUkx1JSjFKScykpRinJtZRinFLMpBTjlGImpRinFDMpxTjljimlGKMUMynFOKWYSSnGKcVMSjFOKaYTMaQ0u33FCKWC1+iURr8KnVIAMEoZwChlAKOUAYxTgFEKMU4hRinEGMUwpBiGFC6cIhhSuFEKe5XClVJY7BTulMJmpXCpFFY7hVulsFspXCuF5U7hXilsVwoPSmG9UOSCLOnnP3YlowTjFN6YZBin8MggwTiFV+YYxik8M0YwTuGdKYZxCj9giGCcwi+YoRilEKMUYpxCjFKIcQoxpCiGFMWA4hhQHAOKY0hxDCiOAcUxoDjmxpkdHQEIwzAM3X/fDtAB/KHcG4A7BCWxxaA0zKA0zKA0zKA0zKAEzKAEzKAkzKI0zKI0zKI0zKI0zKI0zKI0zKI0zKI0zKI0zKI0zKI0zJNL4MYAHx6yvEo4MHAs4fDLJwYfMowLGEoy+mDAwhiHZSErCRYfrFdY4hIVIJBA7IFwJREOgiLEUQi9Eq0hwENNgDIilQeKFdQ3KIlSRaHwQq2G8i6KAEQE6A6QKqJuQBCBhgLZJUoNxB3oQZCQojpBqIK2BTksChpEN+h0kPb6a+D+A+J3aocEAAAAAIL+v7a4gAd2ORs2B8wUWDYwhmA/weSClQbDDrYgzEdZnDBSYdfCFJb1DIMbNjrMeiABAA+ANwCiAKoBIATYCeAWIDQAdYADAToC2gSACpgWYDAgZwDbgM8B0gumVgS5cfjZJQAAAABJRU5ErkJggg==">
        <video ref="vid" :src="videoSrc" controls controlslist="nodownload"></video>
    </div>
    <eject :message="ejectText" :showState="ejectStatus"></eject>
  </div>
</template>
<script>
import Eject from '@/components/Eject.vue'
export default {
    components:{
        Eject,
    },
    data(){
        return{
            bookList:[   
                {
                    "book_id": 1314,
                    "is_lock": 1,
                    "book_name": "Red",
                    "words_num": 24,
                    "pic": "http://file.abctime.com/book_1314.jpg",
                    "visited_nums": 465374,
                    "star_num": 2,
                    "video_url": "https://qnfile.abctime.com/wechat/aa_1314.mp4"
                },
                {
                    "book_id": 1350,
                    "is_lock": 1,
                    "book_name": "Yellow",
                    "words_num": 24,
                    "pic": "http://file.abctime.com/book_1350.jpg",
                    "visited_nums": 384508,
                    "star_num": 3
                },
                {
                    "book_id": 1272,
                    "is_lock": 1,
                    "book_name": "Blue",
                    "words_num": 24,
                    "pic": "http://file.abctime.com/book_1272.jpg",
                    "visited_nums": 309580,
                    "star_num": 1
                },
                {
                    "book_id": 1286,
                    "is_lock": 1,
                    "book_name": "Green",
                    "words_num": 24,
                    "pic": "http://file.abctime.com/book_1286.jpg",
                    "visited_nums": 199096,
                    "star_num": 2
                },
                {
                    "book_id": 1279,
                    "is_lock": 1,
                    "book_name": "Colorful Eggs",
                    "words_num": 24,
                    "pic": "http://file.abctime.com/book_1279.jpg",
                    "visited_nums": 421638,
                    "star_num": 1
                },
                {
                    "book_id": 1278,
                    "is_lock": 1,
                    "book_name": "Farm Animals",
                    "words_num": 16,
                    "pic": "http://file.abctime.com/book_1278.jpg",
                    "visited_nums": 5531407,
                    "star_num": 1
                },
                {
                    "book_id": 1308,
                    "is_lock": 1,
                    "book_name": "Pets",
                    "words_num": 16,
                    "pic": "http://file.abctime.com/book_1308.jpg",
                    "visited_nums": 2379373,
                    "star_num": 1
                },
                {
                    "book_id": 1310,
                    "is_lock": 1,
                    "book_name": "Plains Animals",
                    "words_num": 16,
                    "pic": "http://file.abctime.com/book_1310.jpg",
                    "visited_nums": 1685827,
                    "star_num": 1
                },
                {
                    "book_id": 1313,
                    "is_lock": 1,
                    "book_name": "Rainforest Animals",
                    "words_num": 16,
                    "pic": "http://file.abctime.com/book_1313.jpg",
                    "visited_nums": 1501662,
                    "star_num": 2
                },
                {
                    "book_id": 1325,
                    "is_lock": 1,
                    "book_name": "The Chicken",
                    "words_num": 16,
                    "pic": "http://file.abctime.com/book_1325.jpg",
                    "visited_nums": 333958,
                    "star_num": 3
                },
                {
                    "book_id": 1318,
                    "is_lock": 1,
                    "book_name": "Spring",
                    "words_num": 16,
                    "pic": "http://file.abctime.com/book_1318.jpg",
                    "visited_nums": 324199,
                    "star_num": 2
                },
                {
                    "book_id": 1319,
                    "is_lock": 1,
                    "book_name": "Summer",
                    "words_num": 16,
                    "pic": "http://file.abctime.com/book_1319.jpg",
                    "visited_nums": 813554,
                    "star_num": 2
                },
                {
                    "book_id": 1288,
                    "is_lock": 1,
                    "book_name": "It Is Fall",
                    "words_num": 16,
                    "pic": "http://file.abctime.com/book_1288.jpg",
                    "visited_nums": 414223,
                    "star_num": 0
                },
                {
                    "book_id": 1349,
                    "is_lock": 0,
                    "book_name": "Winter",
                    "words_num": 17,
                    "pic": "http://file.abctime.com/book_1349.jpg",
                    "visited_nums": 415796,
                    "star_num": 0
                },
                {
                    "book_id": 1333,
                    "is_lock": 0,
                    "book_name": "The Street",
                    "words_num": 16,
                    "pic": "http://file.abctime.com/book_1333.jpg",
                    "visited_nums": 250056,
                    "star_num": 0
                },
                {
                    "book_id": 1332,
                    "is_lock": 0,
                    "book_name": "The Playground",
                    "words_num": 16,
                    "pic": "http://file.abctime.com/book_1332.jpg",
                    "visited_nums": 182038,
                    "star_num": 0
                },
                {
                    "book_id": 2032,
                    "is_lock": 0,
                    "book_name": "The Subway",
                    "words_num": 16,
                    "pic": "https://qnfile.abctime.com/book_1516767595.png",
                    "visited_nums": 77801,
                    "star_num": 0
                },
                {
                    "book_id": 1321,
                    "is_lock": 0,
                    "book_name": "The Backyard",
                    "words_num": 16,
                    "pic": "http://file.abctime.com/book_1321.jpg",
                    "visited_nums": 92165,
                    "star_num": 0
                },
                {
                    "book_id": 1337,
                    "is_lock": 0,
                    "book_name": "This Kitchen",
                    "words_num": 18,
                    "pic": "http://file.abctime.com/book_1337.jpg",
                    "visited_nums": 120063,
                    "star_num": 0
                },
                {
                    "book_id": 1331,
                    "is_lock": 0,
                    "book_name": "The Plant",
                    "words_num": 17,
                    "pic": "http://file.abctime.com/book_1331.jpg",
                    "visited_nums": 406222,
                    "star_num": 0
                },
                {
                    "book_id": 1320,
                    "is_lock": 0,
                    "book_name": "Ten",
                    "words_num": 16,
                    "pic": "http://file.abctime.com/book_1320.jpg",
                    "visited_nums": 132103,
                    "star_num": 0
                },
                {
                    "book_id": 1304,
                    "is_lock": 0,
                    "book_name": "Orange",
                    "words_num": 24,
                    "pic": "http://file.abctime.com/book_1304.jpg",
                    "visited_nums": 193812,
                    "star_num": 0
                },
                {
                    "book_id": 1295,
                    "is_lock": 0,
                    "book_name": "My Garden",
                    "words_num": 16,
                    "pic": "http://file.abctime.com/book_1295.jpg",
                    "visited_nums": 48951,
                    "star_num": 0
                },
                {
                    "book_id": 1309,
                    "is_lock": 0,
                    "book_name": "Picking Apples",
                    "words_num": 16,
                    "pic": "http://file.abctime.com/book_1309.jpg",
                    "visited_nums": 120828,
                    "star_num": 0
                }
    
            ],
            videoSrc: '',
            showVideoBox: false,
            ejectText:'',
            ejectStatus: false,
        }
    },
    mounted(){
        this.getList(this.$route.params.pid)
    },
    methods:{
        async getList(pid) {
            try {
                let memberId = localStorage.getItem('extendAbcMemberid');
                //定义参数对象
                let params = this.$common.getParam('post',{member_id:memberId,product_id:pid})
                let res = await this.$api.getBookList(params);
                console.log(res)
                if(res.code==200){
                    this.bookList = res.data
                    // this.status = res.data.status;
                    
                }else{
                    // console.log(res.phone)   
                }
            } catch (e) {
                this.errorData = e
            }
        },
        showVideo(url,canPlay){
            if(url && canPlay){
                this.showVideoBox = true;
                this.videoSrc = url;
                if(this.$refs.vid.paused){
                    this.$refs.vid.play();
                }
            }else{
                this.showEject('仅限vip会员观看哦～')
            }
        },
        closeVideo(){
            if(!this.$refs.vid.paused){
                this.$refs.vid.pause();
            }
            this.showVideoBox = false;
        },
        showEject: function (text) {
            this.ejectText = text
            this.ejectStatus = true
        },
        initEject: function () {
            this.ejectStatus = false
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
    .list{
        -webkit-overflow-scrolling: touch;
        padding: 40px 0;
        background: #FDDB5A;
        ul{
            li{
                width: 710px;
                height: 324px;
                margin: auto;
                margin-bottom: 40px;
                border-radius: 30px;
                position: relative;
                background: #FFF;
                .lesson_num{
                    width: 673px;
                    margin: auto;
                    text-align: left;
                    font-size: 28px;
                    line-height: 65px;
                    color: #4FABE2;
                    padding: 15px 16px;
                }
                .lesson_box{
                    width: 673px;
                    height: 200px;
                    margin: auto;
                    border-top:2px solid #EBEBEB;
                    position: relative;
                    .cover{
                        width: 200px;
                        height: 200px;
                        position: absolute;
                        top: 8px;
                        left: 5px;
                    }
                    .locked{
                        width: 200px;
                        height: 200px;
                        position: absolute;
                        top: 8px;
                        left: 5px;
                        z-index: 2;
                        background: rgba(68,68,68,.5);
                        &::before{
                            content:'';
                            position: absolute;
                            top: 72px;
                            left: 78px;
                            width: 44px;
                            height: 56px;
                            background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAA4CAMAAACxHeq+AAAAdVBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////li2ZAAAAAJnRSTlMAqpz77ucDCLx1GvbKt7GWVFE+3tjSw0xIKfCbhYRrYlpDMyIVESNUPOIAAAFTSURBVEjH7dTJkoMgFAVQEFFwNk4x8/j+/xO7U0RbeDSyyDJ3eT1UMZSPmEkuQdakaZMFl4S4sykYzGHFxkGTHIzkyX92CAElHOy2ZmAJq63bVRZry8bjZgmWC5sY4eMMaT3G8VjTecHRtBEHFTFO1SjeFY8MvJ3uavEhmm5ya2CpapZo985UKw1cqrrX2161pYGpqqm9/eIvhkJvCyfmkf5HIPw8CB4yUNmFi+zeJQu5ODxf9srBK/xKSBKCZ8KE7ME7e9L5444wXApZVVLgnhFUtZv3OGvRJ4RpPA80uoY7ZZXuHBgNn60L4+d2YkG0CCfOdZw7cavj1onZfWnvzIHNgVmuPUr9Z2tYw+l5sucUY5RB2QHAA1cKV5/HUmHphbPoZaPMC0MQExIHYMGppeRFwS11SnrwTk+kP5aLg+Dggz+on6UP8srtVAYrKU+3X/gDpr3Qu6WrC1gAAAAASUVORK5CYII=");
                            background-size: cover;
                        }
                    }
                    .book_info{
                        text-align: left;
                        padding: 8px 0 0 238px;
                        .book_name{
                            font-size: 30px;
                            color: #444;
                            height: 40px;
                            line-height: 40px;;
                        }
                        .book_desc{
                            line-height: 60px;
                            font-size: 24px;
                            color: #999;
                            span{
                                padding-left: 23px;
                                &::before{
                                    content:'';
                                    display: inline-block;
                                    width: 26px;
                                    height: 18px;
                                    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAASCAYAAAEyHv41AAAAAXNSR0IArs4c6QAAAzdJREFUOBGVlU1IVFEUx30z4wczi5qFFtmmjUrhzo0hhhRZLjMkFYlwdBICNxUthCICIzdCRMyMjhGELZJaiX0hFbOoTQW1kzIUISlaZJnjjPb7X959vZk+oAtvzjn/8z8f99z73pSUsMbGxg4lEolh6SXJZPKzUfgB3DQ64JpnCMH4JukUoK7HxDg+43s8Ho+Qo31zc/MOeFlATi3Hcd5KVlRUzEiyjptIaURkiNiOWkeGdRV7htGE4U//qwvSTRLRqWCe/hA/ZvX393ehdNl2TTj7bs7n80/EIPI2pE6vOMwYeEpOdy1A2kl6y1mmj23yOXR6AMdDy6ypqSmdn58PZbPZVbAkxDicFTgRy9EMeqwh2dLSkotEIrbnLa7vk59jS2s2a2Qrk5O2vqIPIRuRx2wA9gn2dMMLkmN6erp8cXHxEmo7TxUBL4PB4IVYLPZYfrtMEE7tTRciKgcZ84iP4DtkawUCga6+vr5J6c7ExESFu2nZJWTeR+anxuCHZDmCg679gLm0BvwBOBYUwPgf2cPayrIJkAd1bt4NkoMWxl3CfkkCz3V0dKy4mBEbGxt3C4IAWl3Cc0lauezafnFPAxik51GLRqPRENk1CLPwv8O/y9okcsz0aOMU4FXrYHppiG+w9a6Vu7h5O6QXnBPBU2BHXJIRJPjBXjXRFxYvCLJgOp2uzOVyqj5AxUqL/0uSfInnWjgcvt7d3f2lmOsVcs/4FoSC7tyADTocZrijzMHc3VQqpbdmiCdenFQ2RW/ii8FfN7Z+GKrAHunFiwJnuXEjwuHogGq5aKuM5YPlgo3iG7S2X1IwwXtxUoEzkOw18HPU1RSkowLZwRl2dMVPoOBhCpqvFnn0odrr91udPNO6d3ssUCwJXPZhpT7dqh5WxLV+I/HVO+Pj47UcvK6Y/Y54JDrRnW1gV68Ezs7Ohubm5hoY52pvb+9rS2Q3rSSz32MLG0mOLL7d3mWAPAJwuoDlGpAzJO/2n4tcXO16fPpS/3Eq+M7T5EVxvUIytAiuk+Bplv2/i+T3eQa4QO/9sb8V8julUziMaGJHjVwGff+qSKQ/O30Pl8Az1dXVmba2tjWwv66fcvmCrOidu1AAAAAASUVORK5CYII=");
                                    background-size: cover;
                                    margin-right: 10px;
                                }
                            }
                        }
                    }
                }
            }
        }
        .video_wrap{
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            background: #000;
            z-index: 5;
            video{
                width: 100%;
                margin-top: 40vh; 
                transform: translateY(-50%); 
            }
            .close{
                width: 50px;
                height: 50px;
                position: absolute;
                top: 20px;
                right: 30px;
            }
        }
    }
</style>
