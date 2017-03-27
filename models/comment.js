var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');
var Item=require('./item');

var schema = new Schema({
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    item:{type:Schema.Types.ObjectId,ref:'Item'},
    commentDate:{type:Date,default:Date.now}
});



module.exports = mongoose.model('Comment', schema);