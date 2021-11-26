/*
 * @Author: your name
 * @Date: 2021-10-10 22:22:15
 * @LastEditTime: 2021-10-19 17:48:48
 * @LastEditors: llxs
 * @Description: In User Settings Edit
 * @FilePath: /LOL-Game1/server/models/item.js
 */
// 物品模型
const mongoose = require('mongoose')

// 创建物品模型的字段
const schema = new mongoose.Schema({
    // 物品名称
    name: { type: String },
    // 物品图标、保存图片上传的地址
    icon: { type: String }
})

// 导出一个Category模型
module.exports = mongoose.model('Item', schema, 'items')