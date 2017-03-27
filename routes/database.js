var express = require('express');
var router = express.Router();
var User=require('../models/user');
var bcrypt = require('bcryptjs');
var Comment=require('../models/comment');
var Item=require('../models/item');

var users=[{
    user:{
        _id:'58d8d42954470c28847a6d38',
        firstName:'sefi',
        lastName:'krausz',
        password:'123456789',
        email:'sefik1600@gmail.com',
        role:'admin'
    },
    user:{
        _id:'58d8d42954470c28847a6d39',
        firstName:'lior',
        lastName:'shachar',
        password:'123456789',
        email:'lior@gmail.com',
        role:'admin'
    },
    user:{
        _id:'58d8d42954470c28847a6d40',
        firstName:'tom',
        lastName:'hivert',
        password:'123456789',
        email:'tomh@gmail.com',
        role:'admin'
    },
    user:{
        _id:'58d8d42954470c28847a6d41',
        firstName:'tom',
        lastName:'shabtay',
        password:'123456789',
        email:'toms@gmail.com',
        role:'admin'
    }

}];

/*var items=[{

    item1:{
  /!*      title:,
        category:,
        content:,
        pictureLink:,
        publishDate:,*!/

    },
    item2:{

    },
    item3:{

    },
    item4:{

    },
    item5:{

    },
    item6:{

    }

}]*/


router.get('/',function (req,res,next) {

    for(var i=0;i<users.length;i++)
    {
        console.log(users[i].user)
        User.insert(users[i].user);
    }

})

module.exports = router;

