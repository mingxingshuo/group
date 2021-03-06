const router = require('koa-router')()
var GroupModel = require('../model/Group');
var CategoryModel = require('../model/Category');

router.prefix('/group');

router.get('/', async(ctx, next) => {
    var id = ctx.request.query.id;
    var messages
    if(id){
        messages = await GroupModel.find({categoryId:id});
    }else{
        messages = await GroupModel.find();
    }
    console.log(messages)
    ctx.body = {messages: messages}
})

router.post('/search', async(ctx, next) => {
    var name = ctx.request.body.name
    var messages = await GroupModel.find({groupName: name})
    if (!messages || messages.length == 0) {
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

router.post('/many_update', async(ctx, next) => {
    var categoryId = ctx.request.body.categoryId;
    var groups = ctx.request.body.groups;
    groups.forEach(async function (group) {
        await GroupModel.findByIdAndUpdate(group, {categoryId: categoryId})
    })
    ctx.body = {success: '修改成功'}
})

module.exports = router