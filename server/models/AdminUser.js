/*
 * @Author: your name
 * @Date: 2021-10-10 22:22:15
 * @LastEditTime: 2021-10-10 22:24:08
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /LOL-Game1/server/models/item.js
 */
// 管理员模型
const mongoose = require('mongoose')

// 管理员
const schema = new mongoose.Schema({
    // 管理员
    username: { 
        type: String,
        // unique: true
    },
    // 密码
    password: { 
        type: String,
        // 查询这个模型的时候不查询password这个字段
        select: true,
        // 密码加密处理 安全指数10~12 bcryptj比md5加密有安全
        set(val){
            return require('bcryptjs').hashSync(val, 10)
        }
    }
})

// 导出一个AdminUser模型
module.exports = mongoose.model('AdminUser', schema)