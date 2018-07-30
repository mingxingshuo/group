const router = require('koa-router')()
var CategoryModel = require('../model/Category');

router.prefix('/category');

router.get('/', async(ctx, next) => {
    var messages = await CategoryModel.find();
    ctx.body = {messages: messages}
})

router.post('/create', async(ctx, next) => {
    var message = {
        categoryName: ctx.request.body.name
    }
    var docs = await CategoryModel.create(message);
    if (docs) {
        ctx.body = {success: '成功', data: docs}
    } else {
        ctx.body = {err: '创建失败，请检查输入是否有误'}
    }

})

router.post('/update', async(ctx, next) => {
    var id = ctx.request.body.id;
    var message = {
        categoryName: ctx.request.body.name
    }
    var docs = await CategoryModel.findByIdAndUpdate(id, message)
    if (docs) {
        ctx.body = {success: '重命名成功', data: docs}
    } else {
        ctx.body = {err: '重命名失败'}
    }
})

router.get('/delete', async(ctx, next) => {
    var id = ctx.request.query.id;
    var docs = await CategoryModel.remove({_id:id})
    var docs1 = await CategoryModel.find()
    ctx.body = {success: '删除成功', data: docs1}
})


module.exports = router
