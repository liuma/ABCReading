<template>
  <div class="list">
    <!--<router-link :to="{name:'list.one'}">第一阶段</router-link>-->
    <!--<router-view></router-view>-->
    <ul>
      <li v-for="(item,index) in list" :class="'item_wrap li_'+index">
        <div :class="index%2==0?'item item_f':'item item_s'">
            <div v-for="(p,ind) in item" :class="'part '+ind">
              <div v-if="ind === 'part1'">
                <div class="img_wrap" @click="toPart(p,index+1,1)">
                  <img v-if="p" class="active" src="../assets/imgs/list_part1.png">
                  <img v-else class="active" src="../assets/imgs/list_lock.png">
                </div>
                <p>亲子对话</p>
              </div>
              <div v-else-if="ind === 'part2'">
                <div class="img_wrap" @click="toPart(p,index+1,2)">
                  <img v-if="p" class="active" src="../assets/imgs/list_part2.png">
                  <img v-else class="active" src="../assets/imgs/list_lock.png">
                </div>
                <p>RAZ绘本</p>
              </div>
              <div v-else-if="ind === 'part3'">
                <div class="img_wrap" @click="toPart(p,index+1,3)">
                  <img v-if="p" class="active" src="../assets/imgs/list_part3.png">
                  <img v-else class="active" src="../assets/imgs/list_lock.png">
                </div>
                <p>儿歌拓展</p>
              </div>
            </div>
        </div>
      </li>
    </ul>
    <div class="lesson_btn" @click="yz">
      <span class="icon"></span>
      更多课程
    </div>
  </div>
</template>

<script>
export default {
  name: 'list',
  data () {
    return {
      list:[
        {
          part1:false,
          part2:false,
          part3:false,
        },
        {
          part1:false,
          part2:false,
          part3:false,
        },
        {
          part1:false,
          part2:false,
          part3:false,
        },
        {
          part1:false,
          part2:false,
          part3:false,
        },
        {
          part1:false,
          part2:false,
          part3:false,
        }
      ],
      li_day:1,
      li_location:1
    }
  },
  mounted(){
    // this.getList();
    this.getLocation();
  },
  methods: {
    yz(){
      window.location.href = 'https://j.youzan.com/7qEyW9'
    },
    getList(){
      this.list = [
        {
          part1:true,
          part2:true,
          part3:true,
        },
        {
          part1:true,
          part2:true,
          part3:true,
        },
        {
          part1:true,
          part2:true,
          part3:true,
        },
        {
          part1:true,
          part2:true,
          part3:true,
        },
        {
          part1:true,
          part2:true,
          part3:true,
        }
      ]
    },
    getLocation(){
      let memberId = window.localStorage.getItem('extendNueMemberId');
      let url = this.$common.config.gzhUrl + 'v2/distribute/activity/get-read-location'
      let fd = this.$common.getParam('get',{member_id:memberId,activity_id:1})
      let _this = this;
      this.$axios.get(url+'?'+fd).then((res) => {
        if(res.data.code == 200){
          if(!res.data.data.day_num){
            _this.getLocation();
            return;
          }
          let day_num = res.data.data.day_num;
          _this.li_day = res.data.data.day_num;
          _this.li_location = res.data.data.location_num;
          let location_num = res.data.data.location_num;
          if(day_num>1){
            for(var i=0;i<day_num-1;i++){
              console.log(i)
              _this.list[i].part1 = true;
              _this.list[i].part2 = true;
              _this.list[i].part3 = true;
            }
            for(var j=1;j<=location_num;j++){
              let ind = day_num-1;
              switch(j){
                case 1:
                  _this.list[ind].part1 = true;
                  break;
                case 2:
                  _this.list[ind].part2 = true;
                  break;
                case 3:
                  _this.list[ind].part3 = true;
                  break;
                default: break;
              }
            }
          }else{
            for(var j=1;j<=location_num;j++){
              switch(j){
                case 1:
                  _this.list[0].part1 = true;
                  break;
                case 2:
                  _this.list[0].part2 = true;
                  break;
                case 3:
                  _this.list[0].part3 = true;
                  break;
                default: break;
              }
            }
          }
        }
      })
    },
    toPart(flag,day,part) {
      if(flag){
        this.$router.push({name:'list'+part,query:{ind:day}})
        if(day == this.li_day && part == this.li_location){
          if(part<3){
            part +=1;
          }else{
            if(day == 5) {
              return false;
            }
            day +=1;
            part = 1;
          }
          let memberId = window.localStorage.getItem('extendNueMemberId');
          let ph = window.localStorage.getItem('extendNuePhone');
          let url = this.$common.config.gzhUrl + 'v2/distribute/activity/add-read-location'
          let fd = this.$common.getParam('get',{member_id:memberId,phone:ph,activity_id:1,day_num:day,location_num:part})
          let conf = {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}}
          this.$axios.post(url,fd,conf).then(
            (res) => {
            if(res.data.code == 200){
          }else{
          }
        })
        }
      }else {
      }
    }
  }
}
</script>

<style scoped lang="less">
  .list{
    background: url('../assets/imgs/list_bg.png') no-repeat;
    background-size: 100%;
    padding-top: 1.7rem;
    width: 100%;
    height: 39.69rem;
    .item_wrap{
      margin-top: 1.25rem;
      &:nth-child(1){
        margin-top: 0;
      }
      .item{
        width: 5.1rem;
        height: 5.99rem;
        margin: auto;
        position: relative;
        font-size: .24rem;
        color: #56536C;
        letter-spacing: 0;
        .img_wrap{
          .active{
            width: 1.6rem;
            height: 1.14rem;
          }
        }
        &.item_f{
          background: url('../assets/imgs/list_bg_f.png');
          background-size: cover;
          .part{
            position: absolute;
            &.part1{
              left: .09rem;
              top: .09rem;
            }
            &.part2{
              right: .09rem;
              top: 2.15rem;
            }
            &.part3{
              left: .09rem;
              top: 4.22rem;
            }
          }
        }
        &.item_s{
          background: url('../assets/imgs/list_bg_s.png');
          background-size: cover;
          .part{
            position: absolute;
            &.part1{
              right: .09rem;
              top: .09rem;
            }
            &.part2{
              left: .09rem;
              top: 2.15rem;
            }
            &.part3{
              right: .09rem;
              top: 4.22rem;
            }
          }
        }
      }
    }
    .lesson_btn{
      position: relative;
      span{
        display: inline-block;
        width: .53rem;
        height: .53rem;
        background: url('../assets/imgs/list_icon1.png');
        background-size: cover;
        vertical-align: top;
        margin-top: .26rem;
        /*position: absolute;*/
      }
      margin: 1.4rem auto 0;
      width: 6rem;
      height: 1.1rem;
      line-height: 1.1rem;
      background: #FC9126;
      box-shadow: 0 .06rem 0 0 rgba(0,0,0,0.10);
      border-radius: .55rem;
      font-family: Helvetica;
      font-size: .48rem;
      color: #FFFFFF;
      letter-spacing: .03rem;
    }
  }
</style>
