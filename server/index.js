/*
 * @Author: your name
 * @Date: 2021-10-09 18:09:45
 * @LastEditTime: 2021-10-19 09:19:38
 * @LastEditors: llxs
 * @Description: In User Settings Edit
 * @FilePath: /LOL-Game1/server/index.js
 */
const express = require('express')
const app = express()
const port = 3009
/* 
 * 此处连接错误Access to XMLHttpRequest at 'http://localhost:3001/admin/api/categories' from origin 'http://localhost:8080' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
 * app.use(require(cors)())一定要写在注册路由的前面!
 */
// 秘钥 随意输入一个字符串变量  flyme123456  应该放到环境中，不是放到代码中
app.set('secret','flyme123456')

//对post请求体进行解析
app.use(express.json())


//引用跨域模块
app.use(require('cors')())

//请求静态托管物品图标
//托管静态文件，使该目录里的文件可以被客户端通过 /upload 这个地址访问
// app.use('/upload', express.static(`${__dirname}/upload`))
app.use('/uploads', express.static( __dirname + '/uploads'))

//引入数据库配置
require('./plugins/db')(app)

//引入后端路由（后台管理系统）
require('./routes/admin')(app)


require('./routes/web')(app)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})