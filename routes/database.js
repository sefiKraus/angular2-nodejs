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
        role:'admin',
        graded:[]
    }},
    {user:{
        _id:'58d8d42954470c28847a6d39',
        firstName:'lior',
        lastName:'shachar',
        password:'123456789',
        email:'lior@gmail.com',
        role:'admin',
        graded:[]

    }},
    {user:{
        _id:'58d8d42954470c28847a6d40',
        firstName:'tom',
        lastName:'hivert',
        password:'123456789',
        email:'tomh@gmail.com',
        role:'admin',
        graded:[]

    }},
    {user:{
        _id:'58d8d42954470c28847a6d41',
        firstName:'tom',
        lastName:'shabtay',
        password:'123456789',
        email:'toms@gmail.com',
        role:'admin',
        graded:[]

    }

}];

var reviews=[
    {
        _id:'58d927129dc96e1dcc9e601b',
        title:"Desktop AMD A4-4000 Dual Core 3.0GHz - AR2",
        category:'Computers',
        content:"It works. It handles daily tasks well and some gaming no problem." +
                " I built a system for my girlfriend to play Sims on. It handles that fine. " +
                "Terrible heatsink. Do yourself a favor and invest in a heatsink. The stock one is awful. Also, I've had display issues with this apu. Thought it might be driver related but it isn't. It just can't seem to handle a VGA output signal. I recommend using the HDMI port on your motherboard." +
                " For the price you really can't go wrong. AMD is a sold manufacturer and I've always had great experiences with them. I was genuinely excited to build my first AMD system in umteen years. This was a little disappointing but the fact that this is an APU made up for that.",
        pictureLink:'http://img.ksp.co.il/allimg/lrg25752.jpg',
        publisher:'58d8d42954470c28847a6d38',
        comments:['58d97a67bfba0e1ca0bf2e47'],
        grade:10,
        gradedBy:[]


    },
    {
     _id:'58d927129dc96e1dcc9e601c',
     title:'Acer Desktop Computer VM6630G-70092 Intel Core ',
     category:'Computers',
     content:'i5 4th Gen 4590 (3.30 GHz) 8 GB DDR3 1 TB HDD Intel HD Graphics 4600 Windows 7 Professional 64-Bit (Upgradeable to Windows 8 Pro)',
     pictureLink:'http://img.ksp.co.il/allimg/lrg13098.jpg',
     publisher:'58d8d42954470c28847a6d39',
        comments:['58d97a67bfba0e1ca0bf2e48'],
        grade:7,
        gradedBy:[]
     },
    {
        _id:'58d927129dc96e1dcc9e601d',
        title:'Desktop Intel Pentium G4560 3.5GHz - IR22 - w/o DVD Writer',
        category:'Computers',
        content:'Sub Catalog: Recommended Computers; Type: Intel; CPU: Intel Pentium; Capacity: 1TB; Memory Size: 4GB; Chipset: H110; Watts / Amp: 450W; Color: Black. ',
        pictureLink:'http://img.ksp.co.il/allimg/lrg13098.jpg',
        publisher:'58d8d42954470c28847a6d40',
        comments:['58d97a67bfba0e1ca0bf2e49'],
        grade:2,
        gradedBy:[]

    },
    {
        _id:'58d927129dc96e1dcc9e601e',
        title:'Desktop AMD A6-7400K Dual Core 3.5GHz - AR3 ',
        category:'Computers',
        content:'Desktop AMD A6-7400K Dual Core 3.5GHz - AR3',
        pictureLink:'http://img.ksp.co.il/allimg/lrg13098.jpg',
        publisher:'58d8d42954470c28847a6d38',
        comments:['58d97a67bfba0e1ca0bf2e50'],
        grade:5,
        gradedBy:[]

    },

    {
        _id:'58d927129dc96e1dcc9e602a',
        title:'Corsair Gaming SCIMITAR PRO RGB Gaming Mouse, Backlit RGB LED, 16000 DPI, Black Side Panel',
        category:'Gaming Mice',
        content:'Exclusive Key Slider Macro Button Control System Provides Unmatched Customization for Any Play Style',
        pictureLink:'https://images10.newegg.com/NeweggImage/ProductImageCompressAll300/26-816-068-V05.jpg?ex=2',
        publisher:'58d8d42954470c28847a6d38',
        comments:[],
        grade:1,
        gradedBy:[]

    },
    {
        _id:'58d927129dc96e1dcc9e602b',
        title:'Logitech G502 Proteus Spectrum RGB Tunable Gaming Mouse ',
        category:'Gaming Mice',
        content:'Accurate responsive optical sensor',
        pictureLink:'https://images10.newegg.com/ProductImageCompressAll300/26-197-148-07.jpg?ex=2',
        publisher:'58d8d42954470c28847a6d38',
        comments:[],
        grade:3,
        gradedBy:[]

    },

    {
        _id:'58d927129dc96e1dcc9e602c',
        title:'Corsair Gaming K70 LUX Mechanical Keyboard Backlit Red LED Cherry MX Red (CH-9101020-NA) ',
        category:'Keyboards',
        content:'Aircraft-grade Anodized Brushed Aluminum Frame for Superior Durability,CUE Support Enables Advanced Macro and Lighting Programming for ,100% Anti-ghosting with Full Key Rollover on USB',
        pictureLink:'https://images10.newegg.com/NeweggImage/ProductImageCompressAll300/23-816-076-03.jpg?ex=2',
        publisher:'58d8d42954470c28847a6d39',
        comments:[],
        grade:7,
        gradedBy:[]

    },
    {
        _id:'58d927129dc96e1dcc9e602d',
        title:'G.SKILL RIPJAWS KM570 MX Mechanical Gaming Keyboard - Cherry MX Brown',
        category:'Keyboards',
        content:'100% Cherry MX mechanical key switch in crimson red backlighting,On-the-fly macro recording, function combo keys',
        pictureLink:'https://images10.newegg.com/ProductImageCompressAll300/23-828-007-01.jpg?ex=2',
        publisher:'58d8d42954470c28847a6d40',
        comments:[],
        grade:9,
        gradedBy:[]

    },
    {
        _id:'58d927129dc96e1dcc9e602e',
        title:'ASUS ROG GL753VD-DS71 17.3" Intel Core i7 7th Gen ',
        category:'Laptops',
        content:'7700HQ (2.80 GHz) NVIDIA GeForce GTX 1050 16 GB Memory 1 TB HDD Windows 10 Home 64-Bit Gaming Laptop',
        pictureLink:'https://images10.newegg.com/NeweggImage/ProductImageCompressAll300/34-234-452-V14.jpg?ex=2',
        publisher:'58d8d42954470c28847a6d38',
        comments:[],
        grade:9,
        gradedBy:[]

    }

]

var comments=[
    {
        _id:'58d97a67bfba0e1ca0bf2e47',
        content:'Cheap and plays Blu-Ray Rips and 1080p Video with no complaining at all!!',
        user:'58d8d42954470c28847a6d41',
        item:'58d927129dc96e1dcc9e601b',
        commentDate:Date.now()
    },
        {
            _id:'58d97a67bfba0e1ca0bf2e48',
            content:'Great processing speed for what it is, decent integrated graphics means it doesnt require a separate dedicated GPU card, can be overclocked (see Cons), great bargain for a economy build. Doesnt get too hot, stock heat seek is good enough to keep this at nominal temp. Use some Arctic thermal paste and youre gold!',
            user:'58d8d42954470c28847a6d40',
            item:'58d927129dc96e1dcc9e601c',
            commentDate:Date.now()
        },
        {
            _id:'58d97a67bfba0e1ca0bf2e49',
            content:' Tiny cooler (not a big deal because it does run cool)',
            user:'58d8d42954470c28847a6d439',
            item:'58d927129dc96e1dcc9e601d',
            commentDate:Date.now()
        },
        {
            _id:'58d97a67bfba0e1ca0bf2e50',
            content:' This was a package deal from Newegg. Newegg again delivers fine materials.',
            user:'58d8d42954470c28847a6d38',
            item:'58d927129dc96e1dcc9e601e',
            commentDate:Date.now()
        }

    ]

router.get('/',function (req,res,next) {

    for(var i=0;i<users.length;i++)
    {
            var user=new User({
            _id:users[i].user._id,
            firstName:users[i].user.firstName,
            lastName:users[i].user.lastName,
            password:bcrypt.hashSync(users[i].user.password, 10),
            email:users[i].user.email,
            role:users[i].user.role
        })
        user.save();
    }

    for(var i=0;i<reviews.length;i++)
    {
        console.log(reviews[i]);

        var item=new Item({
            _id:reviews[i]._id,
            title:reviews[i].title,
            category:reviews[i].category,
            content:reviews[i].content,
            pictureLink:reviews[i].pictureLink,
            publishDate:Date.now(),
            publisher:reviews[i].publisher,
            comments:reviews[i].comments,
            grade:reviews[i].grade,
            gradedBy:reviews[i].gradedBy

        });

        item.save();
    }

    for(var i=0;i<comments.length;i++)
    {
        var comment=new Comment({
            _id:comments[i]._id,
           content:comments[i].content,
            user:comments[i].user,
            item:comments[i].item,
            commentDate:comments[i].commentDate
        });
        comment.save();
    }

});

module.exports = router;

