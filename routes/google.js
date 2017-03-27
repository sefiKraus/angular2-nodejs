var express = require('express');
var router = express.Router();

router.get('/',function (req,res,next) {

   var markers=[
       {
           lat: 31.970485,
           lng:  34.771972,
           label: 'A',
           draggable: true
       }
   ];
    res.status(200).json({
        message: 'Success',
        obj: markers
    });
});



module.exports = router;
