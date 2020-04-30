<template>
    <div class="main">
        <img class="product" :src="'https://qnfile.abctime.com/abc_h5/mp/mp_p'+ product_id +'.png'">
        <img class="download" :src="'https://qnfile.abctime.com/abc_h5/mp/mp_download.png'">
    </div>
</template>
<script>
export default {
    data(){
        return{
            product_id: 1
        }
    },
    mounted(){
        this.product_id = this.$route.params.pid;
    },
}
</script>
<style lang="less" scope>
    .main{
        position: relative;
        .product{
            width: 100%;
        }
        .download{
            width: 230px;
            position: absolute;
            bottom: 135px;
            left: 260px;
        }
    }
</style>
