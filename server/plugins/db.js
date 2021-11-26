/*
 * @Description: 
 * @Version: 2.0
 * @Autor: llxs
 * @Date: 2021-10-19 09:06:20
 * @LastEditors: llxs
 * @LastEditTime: 2021-10-19 09:15:33
 */
//数据库配置
module.exports = app => {
    const mongoose = require('mongoose')
  
    //连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017/LOL-game9', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log("数据库连接成功！！！"))
    .catch((err) => console.log(err))
}