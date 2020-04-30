module.exports = {
    outputDir:'/Users/liujian3/Desktop/abctime-h5/h5/2020/hd/cash_back/',
    assetsDir:'././',
    publicPath: "./",
    productionSourceMap: false,
    devServer: {
        // host: 'localhost',
        host: "0.0.0.0",
        port: 8000, // 端口号
        https: false, // https:{type:Boolean}
        open: false, //配置自动启动浏览器  http://172.11.11.22:8888/rest/XX/ 
        hotOnly: true, // 热更新
        // proxy: 'http://localhost:8000'   // 配置跨域处理,只有一个代理
        proxy: { //配置自动启动浏览器
            '/apis': {    //将www.exaple.com印射为/apis
                target: 'http://dev.gzh.abctime.com',  // 接口域名
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/apis': ''   //需要rewrite的,
                }              
            }
        }
    }
}