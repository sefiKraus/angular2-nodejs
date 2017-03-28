var express = require('express');
var router = express.Router();
var axios=require('axios');
var API = 'http://api.openweathermap.org/data/2.5/forecast?id=294640&APPID=56b147cf18b89ad1466e51a610dc4532';
/* GET api listing. */
router.get('/', function(req, res,next){
    res.send('api works');
});

// Get all posts
router.get('/posts', function(req, res,next){
    axios.get(`${API}`)
        .then(posts => {
            var weatherDetails={
                city:posts.data.city.name,
                details:{
                    temp:posts.data.list[0].main.temp,
                    temp_min:posts.data.list[0].main.temp_min,
                    temp_max:posts.data.list[0].main.temp_max,
                    weatherDescription:posts.data.list[0].weather[0].description,
                    time:posts.data.list[0].dt_txt
                }
            };
           // console.log(weatherDetails);
        res.status(200).json({
            message:'Success',
            obj:weatherDetails
        });
        })
    .catch(error => {
        res.status(500).send(error)
});


    /**
     * { dt: 1490616000,
  main:
   { temp: 293.25,
     temp_min: 293.25,
     temp_max: 294.081,
     pressure: 1009.65,
     sea_level: 1029.25,
     grnd_level: 1009.65,
     humidity: 50,
     temp_kf: -0.83 },
  weather:
   [ { id: 803,
       main: 'Clouds',
       description: 'broken clouds',
       icon: '04d' } ],
  clouds: { all: 68 },
  wind: { speed: 3.57, deg: 307.502 },
  rain: {},
  sys: { pod: 'd' },
  dt_txt: '2017-03-27 12:00:00' }

     */



});


module.exports = router;