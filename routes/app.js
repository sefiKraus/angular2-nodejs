var express = require('express');
var router = express.Router();
var User=require('../models/user');
var bcrypt = require('bcryptjs');
var Comment=require('../models/comment');
var Item=require('../models/item');

router.get('/', function (req, res, next) {

/*    var admin=new User({
        firstName:'admin',
        lastName:'admin',
        password:bcrypt.hashSync('admin', 10),
        email:'admin@gmail.com',
        role:'admin'
    });
    admin.save(function (err,result) {
        if(err)
        {
            console.log(err);
        }
    });*/
    res.render('index');

});

module.exports = router;
