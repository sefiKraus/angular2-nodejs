var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

router.post('/', function (req, res, next) {
      var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email,
        role:'user'

    });
    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});

router.post('/signin', function(req, res, next) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id,
            userRole:user.role
        });
    });
});


router.use('/',function (req,res,next) {
    jwt.verify(req.query.token,'secret',function (err,decoded) {
        if(err)
        {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        if(decoded.user.role!='admin')
        {
            return res.status(401).json({
                title: 'Not An Admin',
                error: err
            });
        }
        next();
    })
})

router.get('/getList',function (req,res,next) {

    User.find().exec(function (err,users) {
        if(err)
        {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!users)
        {
            return res.status(500).json({
                title: 'No Users Found!',
                error: {message: 'Users not found'}
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: users
        });
    })
});

router.get('/:id',function (req,res,next) {
    console.log(req.params.id);
    User.findById(req.params.id).exec(function (err,user) {
        if(err)
        {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!user)
        {
            return res.status(500).json({
                title: 'No User Found!',
                error: {message: 'User not found'}
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: user
        });
    })
});

router.patch('/:id',function (req,res,next) {

    var decoded=jwt.decode(req.body.token);
    User.findById(req.params.id,function (err,user) {
        if(err)
        {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(500).json({
                title: 'No User Found!',
                error: {message: 'User not found'}
            });
        }
        user.role=req.body.role;
        user.email=req.body.email;
        user.firstName=req.body.firstName;
        user.lastName=req.body.lastName;

        user.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated user',
                obj: result
            });
        });
    })
});

router.delete('/:id',function (req,res,next) {
    var decoded=jwt.decode(req.body.token);
    var id=req.params.id;
    User.findById(id).exec(function (err,user) {
        if(err)
        {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!user)
        {
            return res.status(500).json({
                title: 'No User Found!',
                error: {message: 'User not found'}
            });
        }

        user.remove(function (err,result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted user',
                obj: result
            });
        });
    });
});


module.exports = router;
