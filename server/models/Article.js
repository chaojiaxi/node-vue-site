/*
 * @Description: 
 * @Version: 2.0
 * @Autor: llxs
 * @Date: 2021-10-19 09:06:20
 * @LastEditors: llxs
 * @LastEditTime: 2021-10-19 10:34:54
 */
const mongoose = require('mongoose')

// 要么查询的时候加where把parent=新闻筛选出来，要么在前端for循环中筛选
const schema = new mongoose.Schema({
  // 标题
  title: {
    type: String
  },
  // 文章分类 (单个英雄可能属于多个分类，所以这里使用数组方式)
  categories: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Category'
    }
  ],
  body: {
    type: String
  }
})

module.exports = mongoose.model('Article', schema, 'articles')