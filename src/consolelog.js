// console.log(process.env)
// 生产环境取消所有的打印语句
if (process.env.NODE_ENV === 'production') {
  console.log = function () {}
  console.warn = function () {}
  console.dir = function () {}
  console.error = function () {}
}
