const router = require('koa-router')()
var RuleModel = require('../model/Rule');
var weichat_conf = require('../conf/weichat.json');
var fs = require('fs')
const multer = require('koa-multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
var upload = multer({ storage: storage });

router.prefix('/rule');

router.post('/upload',upload.single('imageFile'),async (ctx) => {
    fs.rename(ctx.req.file.path, "./public/uploads/"+ ctx.req.file.filename, function(err) {
        if (err) {
            throw err;
        }
        console.log('上传成功!');
    })
    ctx.body = {filename: ctx.req.file.filename};
});

router.get('/', async (ctx, next) => {
    var messages = await RuleModel.find().limit(20).sort({_id:-1});
    ctx.body= {messages:messages}
})

// router.get('/get_code', async (ctx, next) => {
//     var codes= [];
//     for (var key in weichat_conf) {
//         codes.push(weichat_conf[key]);
//     }
//     console.log(codes)
//     ctx.body= {codes: codes}
// })


router.post('/create', async (ctx,next)=>{
    var message = {
        name:ctx.request.body.codes,
        contents: ctx.request.body.contents,
        category: ctx.request.body.category,
        remarks: ctx.request.body.remarks
    }
    var docs = await RuleModel.create(message);
    if (docs) {
        ctx.body= {success: '成功', data: docs}
    } else {
        ctx.body= {err: '创建失败，请检查输入是否有误'}
    }

})

router.post('/update', async (ctx,next)=>{
    var id = ctx.request.body.id;
    var message = {
        name:ctx.request.body.codes,
        contents: ctx.request.body.contents,
        category: ctx.request.body.category,
        remarks: ctx.request.body.remarks
    }
    var docs = await RuleModel.findByIdAndUpdate(id,message)
    if (docs) {
        ctx.body= {success: '修改成功', data: docs}
    } else {
        ctx.body= {err: '修改失败'}
    }
})

router.get('/delete',async (ctx,next)=>{
    var id = ctx.request.query.id;
    var docs = await RuleModel.findByIdAndDelete(id)
    var docs1 = await RuleModel.find()
    ctx.body = {success: '删除成功', data: docs1}
})

// router.get('/send',async (ctx,next)=>{
//     var id = ctx.request.query.id;
//     var take_over = ctx.request.query.take_over;
//     console.log('take_over-------------'+take_over)
//     if (take_over) {
//         sendUser.get_message(id);
//         ctx.body = {success: '发送成功'}
//     } else {
//         send.get_message(id);
//         ctx.body = {success: '发送成功'}
//     }
//
// })


module.exports = router