var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url);

var RuleSchema = new Schema({
    name: String,
    contents:[{
        type:{type: Number, default:0},//0:文本 1:链接 2:图片
        title:String,
        description:String,
        url:String,
        picurl:String
    }],
    category:Array,
    remarks:String,
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: {createdAt: 'createAt', updatedAt: 'updateAt'}
});

var RuleModel = db.model('Rule', RuleSchema);

module.exports = RuleModel;