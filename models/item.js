var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');
var Comment=require('./comment');

var schema = new Schema({
    title:{type:String,required:true},
    category:{type:String,required:true},
    content: {type: String, required: true},
    pictureLink:{type:String},
    publishDate:{type:Date,default:Date.now},
    publisher: {type: Schema.Types.ObjectId, ref: 'User'},
    comments:[{type:Schema.Types.ObjectId,ref:'Comment'}],
    grade:{type:Number,default:0},
    gradedBy:[{type:Schema.Types.ObjectId,ref:'User'}]
});

schema.post('remove',function (item) {
    if(item.graded!==undefined)
    {
        User.find({graded:item}).exec(function (err,users) {
            if(users)
            {
                for(var i=0;i<users.length;i++)
                {
                    users[i].pull(item);
                    users[i].save();
                }
            }
        });
    }



});

module.exports = mongoose.model('Item', schema);