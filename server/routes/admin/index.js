// const { query } = require('express')

/*
 * @Author: your name
 * @Date: 2021-10-09 18:15:41
 * @LastEditTime: 2021-10-19 09:26:32
 * @LastEditors: llxs
 * @Description: In User Settings Edit
 * @FilePath: /LOL-Game1/server/routes/admin/index.js
 */

// 前后端都可以做校验 前端校验可以防止不必要的接口通讯 这样能减小一下后端的压力 但是后端才是主要的
module.exports = app => {

    // express
    const express = require('express')

    // jsonwebtoken
    const jwt = require('jsonwebtoken')

    // AdminUser模型
    const AdminUser = require('../../models/AdminUser')

    // 内部测试
    const assert = require('http-assert')

    const authMiddleware = require('../../middleware/auth')
    const resourceMiddleware = require('../../middleware/resource')


    //定义一个路由（这个是express的子路由）
    const router = express.Router({
       /*
        * 合并url参数。把父级app.use中的参数合并到router实例中，子路由继承父路由的参数
        * 这样才能在接口中通过res.params.resource获取到 app.use父级中的resource动态参数
        */
        mergeParams: true
    })

    // const Category = require('../../models/Category')

    // 新建分类
    router.post('/', async (req,res) => {
        // const Model = require(`../../models/${req.params.resource}`)
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    // 资源列表 populate关联上级分类-对象
    // 中间价
    router.get('/',authMiddleware(),async (req,res) => {
        // 对应下载inflection库 把复数形式转为类名形式，在利用classify 拼接出模型的路径,可以不用引入，写出一个暂存空间存储
        // 设置一个中间件处理
        /* const modelName = require('inflection').classify(req.params.resource)
        const Model = require(`../../models/${modelName}`) */
        let queryOptions = {  }
        if (req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })

    // 获取详细分类
    router.get('/:id', async (req,res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })

    // 编辑分类
    router.put('/:id', async (req,res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 删除分类
    // router.delete('/:id', authMiddleware(), async (req,res) => {
    router.delete('/:id', async (req,res) => {

        // 不需要返回数值
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 通用CRUD接口 示例



    // app.use('/admin/api',router)
    // 中间件
    // app.use('/admin/api/rest/:resource',authMiddleware(),resourceMiddleware(),router)
    app.use('/admin/api/rest/:resource', resourceMiddleware(),router)


    // 图标上传 中间件multer
    const multer = require('multer')

    const upload = multer({
        dest: __dirname + '/../../uploads'
    })

    app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
        //之所以可以用req.file获取到文件数据，是因为用multer库的upload.single('file')将file参数赋值到req上
        let file = req.file
        //文件路径
        // let FilePath = file.path;
        //文件名
        // let fileName = file.filename
        file.url = `http://localhost:3009/uploads/${file.filename}`
        res.send(file)
    })


    // 登录接口
    app.post('/admin/api/login', async (req, res) => {
        
        const { username, password } = req.body


        // 1.根据用户名找用户
        // findOne 找一条

        // 422报错 需要错误处理 捕获异常
        const user = await AdminUser.findOne({ username }).select(`+password`)
        // assert 没有捕获信息，升级express版本express@5.0.0-alpha.8
        assert( user, 422, '用户名不存在')

        // if(!user){
        //     return res.status(422).send({
        //         message: "用户名不存在"
        //     })
        // }
        // res.send('用户名不存在')
        
        // 2.校验密码

        // password明文密码  user.password密文密码 此处明文密码取不到，需.select(`+password`)
        const isValid = require('bcryptjs').compareSync(password, user.password)
        // 错误没有弹窗是因为AdminUser模型下 select:false ,改为true
        assert( isValid, 422, '密码输入错误')
    
        // if (!isValid) {
        //     return res.status(422).send({
        //       message: '密码输入错误'
        //     })
        // }
        // res.send('密码输入错误')
        
        // 3.生成token

        // index.js 全局添加一个属性 sign生成散列 secret 秘钥 get传入一个参数
        // sign 签名
        const token = jwt.sign({ id: user._id }, app.get('secret'))
        res.send({ token })

    })

    // 错误处理函数(错误处理中间件)
    app.use(async (err, req, res, next) => {
        // console.log(err)
        res.status(err.statusCode || 500).send({
          message: err.message
        })
    })

}