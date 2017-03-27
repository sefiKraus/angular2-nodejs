var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Item=require('../models/item');
var Comment=require('../models/comment');


/**
 * get items
 */
router.get('/fullList', function (req, res, next) {
    Item.find()
        .populate('publisher')
        .populate('comments')
        .populate('gradedBy')
        .exec(function (err, items) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: items
            });
        });
});
/**
 * Get item list by Regex
 */
    router.get('/regex/:content',function (req,res,next) {
            Item.find({content: new RegExp(req.params.content, "i")})
                .populate('publisher')
                .populate('comments')
                .populate('gradedBy')
                .exec(function (err,items) {
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    }
                    if(!items)
                    {
                        return res.status(500).json({
                            title: 'No Items Found!',
                            error: {message: 'Items not found'}
                        });
                    }
                    res.status(200).json({
                        message: 'Success',
                        obj: items
                    });
                })
    });

/**
 * Get item list by category
 */
router.get('/category/:category', function (req, res, next) {

    Item.find({'category': new RegExp(req.params.category, "i")})
        .populate('publisher')
        .populate('comments')
        .populate('gradedBy')
        .exec(function (err, items) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if(!items)
            {
                return res.status(500).json({
                    title: 'No Items Found!',
                    error: {message: 'Items not found'}
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: items
            });
        });
});

/**
 * Get item list by user email
 */

router.get('/email/:email',function (req,res,next) {

    User.find({email: new RegExp(req.params.email, "i")}).exec(function (err,users) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!users)
        {
            return res.status(500).json({
                title: 'No Publisher Found!',
                error: {message: 'Email not found'}
            });
        }
        Item.find({publisher:{$in:users}})
            .populate('publisher')
            .populate('comments')
            .populate('gradedBy')
            .exec(function (err,items) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                     }
                if(!items)
                {
                    return res.status(500).json({
                        title: 'No Item Found!',
                        error: {message: 'Item not found'}
                    });
                }
                res.status(200).json({
                    message: 'Success',
                    obj: items
                });

            });
    });

});

/**
 * D3 section
 *
 */

router.get('/d3/:graph1',function (req,res,next) {
    Item.find()


});


router.get('/d3/:graph2',function (req,res,next) {



});



//checks if the user is logged in
router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }


        next();
    })


});

/**
 * Thumb up item
 */
router.patch('/rate/:id',function (req,res,next) {
    var decoded=jwt.decode(req.query.token);
     Item.findById(req.params.id).exec(function (err,item) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!item) {
            return res.status(500).json({
                title: 'No Item Found!',
                error: {message: 'Item not found'}
            });
        }

         for(var i=0;i<item.gradedBy.length;i++)
         {
            if(item.gradedBy[i].toString()===decoded.user._id.toString())
            {

                return res.status(500).json({
                    title: 'Already rated this review',
                    error: {message: 'Already rated this review'}
                });
            }
         }
         User.findById(decoded.user._id).exec(function (err,user) {
             user.graded.push(item);
             user.save();
         })
         item.grade=req.body.grade;
         item.gradedBy.push(decoded.user)
         item.save(function (err, result) {
             if (err) {
                 return res.status(500).json({
                     title: 'An error occurred',
                     error: err
                 });
             }
             res.status(201).json({
                 message: 'Saved item',
                 obj: result
             });
         });

     });
});


/**
 * Item Management Section
 */

//checks if the user is admin
router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
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


});
/**
 * Post method
 */
router.post('/', function (req, res, next) {
    var decoded=jwt.decode(req.query.token);
    User.findById(decoded.user,function (err,user) {

        if(err)
        {
            return res.status(401).json({
                title: 'Not Authenticated',
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
        if(user.role!='admin')
        {
            return res.status(401).json({
                title: 'Not An Admin',
                error: err
            });
        }

        var item = new Item({
            title: req.body.title,
            category: req.body.category,
            content: req.body.content,
            publisher:user,
            pictureLink: req.body.pictureLink,

        });
        item.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Saved item',
                obj: result
            });
        });
    })

});

/**
 * update item by id
 */
router.patch('/:id', function (req, res, next) {

    Item.findById(req.params.id, function (err, item) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!item) {
            return res.status(500).json({
                title: 'No Item Found!',
                error: {message: 'Item not found'}
            });
        }
        item.content = req.body.content;
        item.title=req.body.title;
        item.pictureLink=req.body.pictureLink;
        item.publisher=req.body.publisherId;
        item.publishDate=req.body.publishDate;
        item.grade=req.body.grade;
        item.category=req.body.category;
        item.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated item',
                obj: result
            });
        });
    });
});
router.delete('/:id', function (req, res, next) {
    Item.findById(req.params.id).exec(function (err,item) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!item) {

            return res.status(500).json({
                title: 'No Item Found!',
                error: {message: 'Item not found'}
            });
        }
        for(var i=0;i<item.comments.length;i++)
        {
            Comment.findById(item.comments[i]).exec(function (err,comment) {
                comment.remove();
            })
        }
        item.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted item',
                obj: result
            });
        });
    })

});



module.exports = router;