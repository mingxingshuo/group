const router = require('koa-router')()
var GroupModel = require('../model/Group');
var CategoryModel = require('../model/Category');

router.prefix('/group');

router.post('/', async(ctx, next) => {
    var name = ctx.request.body.name
    var messages = await GroupModel.find({groupName: name})
    if(!messages || messages.length == 0){
        messages = await CategoryModel.find({categoryName: name})
    }
    ctx.body = {messages: messages}
})

router.post('/update', async(ctx, next) => {
    var id = ctx.request.body.id;
    var message = {
        categoryId: ctx.request.body.categoryId
    }
    var docs = await GroupModel.findByIdAndUpdate(id, message)
    if (docs) {
        ctx.body = {success: '修改成功', data: docs}
    } else {
        ctx.body = {err: '修改失败'}
    }
})