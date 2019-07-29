<template>
  <div class="hv_tip">
    <div class="icon"></div>
    <p>请旋转至竖屏，体验更佳</p>
  </div>
</template>
<script>
  export default{
    name:'eject',
    data(){
      return{
        showStatus: this.showState
      }
    },
    props:['message','showState'],
    methods:{
      hideEject(){
        this.showStatus = false
        this.$parent.initEject()
      }
    },
    watch:{
      showState:function (val,oldVal) {
        if(val){
          this.showStatus = true
          setTimeout(this.hideEject,2000)
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .hv_tip{
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .8);
    z-index: 1001;
    font-size: .2rem;
    font-family: PingFangSC-Semibold;
    font-weight: bold;
    color: #FFD356;
    .icon{
      width: .75rem;
      height: 1rem;
      margin: 1rem auto 0;
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAADJCAMAAAD2BzvyAAAAdVBMVEUAAADr9f/////9///////////9/f/z///u9P/////z///////w+P/////////////////////////y8v/u9/////////////////////////////////////////////////////////////////////////+evVFzAAAAJnRSTlMAGo+Wi5KbBxfoC9wQ9wShYWWwFB7xuOGnTuuHdSrEWz1tNiN80K40gGQAAAULSURBVHja7d3ZcuIwEEBRNcS0vAlsA2EJSzb9/yfOxDjpZGCCLLlJz5TuWx5SdUrI8oKxFVvZrM5L26syr2eZYq1KrVdppfjCqfVuioorUvm4FFOVDapSLGVpGCvlmfczeyqfjtqW1xz1qG163/09UxzVtm2C3d/Ha6ynP7aUWnGUn8YKVRcuvldtjOrC+9O/Ko7K02Cpjx6dp/jqtK4qjmzbnaK+nV21ohLbpihOlnkp/4YqH8zNWdS82iYX2lag1I1ZbkVWZEVWZEVWZP0saxRZkRVZkRVZkRVZkRVZkcXBSjJEgawxAOgmQ4Gst3SBElmtzEhk/a5Bkaw3mEgWQGFEsgAKmSzQKJIFkMlkQWNEskAbNlbx7M8CjTwsXVu7GT33ZVHIwlratuXalwUZA2tn38sfCj8W4PCstaXKyc6LBTg46/mPLwS9WBqHZqmx/dLRhwXaDM1SD4vPrJEXC/TQLHPIP7MmfiwoBmXhrEVRM08W4HAsrO7t1xaZL0sPxloTiqaWLwuKYVjz2p737M8CHIJVLex5SxXA0uGs3f4L5524DmEBhrLWC0uV493GtuUqiKUDWQ+fUXf6Y3/9GMaCLISFU0utnukwYlEEsnQAS+8J9fqk3jKnNXWrAlmA3iyd0+f3YtSpp/RtM8RgVuPLymis8if1UVNt10oFs8D4sXBJO+XzwQlnFX6s1YfqQSkGlvZijWxXeVAsLEAP1tp2bY6KiVX0ZxX372P1pLhYuj9ramnXx8UC05e1ptnOyMp6soq0U40VJ6voyXrpVDmysnQ/Fm7oTJCTBf1Yj51qpZhZ6MyigwS70KJYBzrSY2ZlfVj7bnlHbhZtinfXWUVp6UiPl9U4s2gpnfOzdA/WxLbtlSxW2u12ZLF29tROFuvQLVpKFuuFLjGws8CRRTP+TthoLbslXgzruF+8HlRu2w7bfFM/C1hOj/atpFvj03b/o39+57O3521/nnXxkh8vK3NgvdrzxrwsdGDNzlXljpdlHFhqfMY6KOZTDAcWuUjFy2rOWC6umRqANU9Se1aazGlDvMIiF6nCWYm9WEIz3oFFLlKFsdLLrJRmvAOLXDPFzmqUI4tcM++f5K6cP8SM/nVy/Se5s9fF/uj/A+b7ueuUp88Qc8YfMNe2bTXvuzzghO/n3rSbuF9NXEpGXdP82/n8nz5KQOiDF6Q+pkLqQz2EPgJF7ANjYrFYLBaLxZyScGxEsR1RVam9YWnFetzNfLR+OxW5vM7p+Ku4zoCZz5vpekHytVFgd5eauF5lqGkWMud+TYauRXGr+l7BKmnTuE1Tp0fw0S3vN2pk2yIrstR/xELMika/BVo3RZGh8WLVT2YgkckKDRf6rUPTg9W1manwkEgXazLjzuqqTeA4kek7WeLGoh6CBqoBtyZ9WSV4ozINwMAKu0yPTqh5kqbJ3IO15ULRN3eJByvxURXgWGp/lzKzaKhcs228LBoqeSyjQSALNQhkoQaBLAQQyMpAIgtBIgtBIstoiSyjQSKrAYmsDCSyEESytEhWARJZBkSyCpEshLPYD5q3nksW8ylG5T1YnCdk5ZxtsKj+rBePzZCftTQemyE3a/HoscBzs5ZH9NgbsrNGyqVCJkuLZCGIZGUyWY1MlmZghX9xhzBI9O4s93eG8bPm9KYx5zes8c/4Ob2Xze19dJO7KyXj8FYfb7H7N284EHp7htSbWaTe+iP0RimJt5X9AqqCPYsPKUxHAAAAAElFTkSuQmCC');
      background-size: cover;
    }
    p{
      padding-top: .2rem;
    }
  }
  /*竖屏*/
  @media screen and (orientation:portrait){
    .hv_tip{
      display: none;
    }
  }
  /*横屏*/
  @media screen and (orientation:landscape){
    .hv_tip{
      display: block;
    }
  }
</style>
