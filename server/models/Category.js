/*
 * @Description: 
 * @Version: 2.0
 * @Autor: llxs
 * @Date: 2021-10-19 09:06:20
 * @LastEditors: llxs
 * @LastEditTime: 2021-10-19 10:32:47
 */
// 分类模型
const mongoose = require('mongoose')

// 创建分类模型的字段
const schema = new mongoose.Schema({
    // 分类名称
    name: {type: String },
    // 上级分类
    parent: {
        type: mongoose.SchemaTypes.ObjectId,ref:'Category'
    }
})

// 子分类
schema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
})

// 此方式调用会有小问题，up主建议可以尝试
schema.virtual('newsList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Article'
})

// 此方式调用会有小问题，up主建议可以尝试
schema.virtual('heroesList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Hero'
})

// 导出一个Category模型
module.exports = mongoose.model('Category', schema)