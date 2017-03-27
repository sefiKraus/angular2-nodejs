var express = require('express');
var router = express.Router();
var axios=require('axios');
var API = 'http://api.geonames.org/weatherJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&username=demo';

/* GET api listing. */
router.get('/', function(req, res,next){
    res.send('api works');
});

// Get all posts
router.get('/posts', function(req, res,next){
    axios.get(`${API}/posts`)
        .then(posts => {
        res.status(200).json(posts.data);
        })
    .catch(error => {
        res.status(500).send(error)
});







});


module.exports = router;