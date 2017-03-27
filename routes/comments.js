var express = require('express');
var router = express.Router();
var Comment=require('../models/comment');
var Item=require('../models/item');
var jwt = require('jsonwebtoken');
var User=require('../models/user');

router.get('/',function (req,res,next) {
    Comment.find()
        .populate('user','email')
        .exec(function (err,comments) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        res.status(200).json({
            message: 'Success',
            obj: comments
        });
    })
    
});

router.get('/:itemId',function (req,res,next) {
    var itemId=req.params.itemId;
    Comment.find({item:itemId})
        .exec(function (err,comments) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if(!comments)
            {
                return res.status(500).json({
                    title: 'No Comments Found!',
                    error: {message: 'Comments not found'}
                });
            }
            res.status(200).json({
             message: 'Success',
             obj: comments
             });
        })
});


//checks if the user is verified
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
router.post('/',function (req,res,next) {
    var decoded=jwt.decode(req.query.token);
    console.log(req.body.itemId);
    Item.findById(req.body.itemId).exec(function (err,item) {

        if(err)
        {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        if(!item)
        {
            return res.status(500).json({
                title: 'No Item Found!',
                error: {message: 'Item not found'}
            });
        }

        var comment = new Comment({
            content: req.body.content,
            user: req.body.userId,
            item:item,
            publishDate:req.body.publishDate
        });
        item.comments.push(comment);
        item.save();
        comment.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Saved comment',
                obj: result
            });
        });

    });


});


router.delete('/:id',function (req,res,next) {
    var id=req.params.id;
    Item.find({'comments':{$in:[id]}}).exec(function (err,items) {
           if (err) {
             return res.status(500).json({
             title: 'An error occurred',
             error: err
             });
         }
         if (!items) {
             return res.status(500).json({
             title: 'No Review Found!',
             error: {message: 'Comment not found in any review'}
             });
         }
         for(var i=0;i<items[0].comments.length;i++)
         {
             if(items[0].comments[i].toString()===id)
             {
                 items[0].comments.splice(items[0].comments.indexOf(i,1));
                 items[0].save()
             }
         }
         Comment.findById(id).exec(function (err,comment) {
             comment.remove()
         })

    });

});


router.patch('/:id',function (req,res,next) {
    var decoded=jwt.decode(req.body.token);
    Comment.findById(req.params.id,function (err,comment) {
        if(err)
        {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        if (!comment) {
            return res.status(500).json({
                title: 'No Comment Found!',
                error: {message: 'Comment not found'}
            });
        }
        comment.content=req.body.content;
        comment.user=req.body.userId;
        comment.item=req.body.itemId;
        comment.commentDate=req.body.commentDate;
        comment.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated Comment',
                obj: result
            });
        });
    })
});
module.exports = router;
