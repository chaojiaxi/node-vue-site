module.exports = options => {

    return async(req, res, next) => {

        // jsonwebtoken
        const jwt = require('jsonwebtoken')

        // AdminUser模型
        const AdminUser = require('../models/AdminUser')

        // 内部测试
        const assert = require('http-assert')

        // const token = req.headers.authorization
        // split 分割   pop 获取最后一个元素
        const token = String(req.headers.authorization || '').split(' ').pop()
        assert(token, 401, '请先登录')


        const { id } = jwt.verify(token, req.app.get('secret'))
        assert(id, 401, '请先登录')

        req.user = await AdminUser.findById(id)
        assert(req.user, 401, '请先登录')

        // next()表示处理这个函数后在处理下个函数
        await next()
    }
}