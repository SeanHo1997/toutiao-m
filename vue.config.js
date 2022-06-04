const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    open: true,
    // 设置反向代理
    proxy: {
      // 当我们的本地的请求 有/api的时候，就会代理我们的请求地址向另外一个服务器发出请求
      'http://toutiao.itheima.net': {
        target: 'http://toutiao.itheima.net', // 跨域请求的地址
        changeOrigin: true // 是否跨域，需要设置为true,才能代理发出请求
      }
    }
    // before: require('./mock/mock-server.js')
  }
})
