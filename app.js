// 通过nodejs+express搭建本地服务器测试打包后的项目是否可访问

// 导入express模块
const express = require('express')

// 创建express服务器实例
const app = express()

// 将dist文件夹作为express静态资源服务器的资源
app.use(express.static('./dist'))

// 开启服务器并指定端口号
app.listen(8888, function () {
  console.log('Express server running at http://127.0.0.1:8888')
})
