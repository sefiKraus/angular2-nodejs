var mongoose = require('mongoose');
var Comment=require('./comment');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    role:{type:String,required:true,default:'user'},
    graded:[{type:Schema.Types.ObjectId,ref:'Item'}]
});

schema.post('remove',function (user) {

    if(user.graded!==undefined)
    {
        if(user.graded.length>0)
        {

            Item.find({gradedBy:user}).exec(function (err,items) {
                if(items)
                {
                    for(var i=0;i<items.length;i++)
                    {
                        items[i].pull(user);
                        item[i].save();
                    }
                }
            });

        }
    }
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);