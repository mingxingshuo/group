var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connect_url = require('../conf/proj.json').mongodb;
var db = mongoose.createConnection(connect_url);

var GroupSchema = new Schema({
    groupName:String,
    categoryId: String,
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: { createdAt: 'createAt', updatedAt: 'updateAt' }
});

var GroupModel = db.model('Group', GroupSchema);

module.exports = GroupModel;