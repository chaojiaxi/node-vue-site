module.exports = options => {
    return async (req,res,next) =>{
        const modelName = require('inflection').classify(req.params.resource)
        // 挂载属性 Model
        req.Model = require(`../models/${modelName}`)
        next()
    }

}