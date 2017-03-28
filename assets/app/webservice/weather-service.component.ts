import {Component, OnInit} from "@angular/core";
import {WeatherService} from "./weather.service";

@Component({
    selector:'app-weather',
    styleUrls:['./weather-service.component.css'],
    templateUrl:'./weather-service.component.html'
})

export class WeatherComponent implements OnInit{

     months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    today = new Date();
    day;
    month;
    city;
    weather;
    temp;
    constructor(private weatherService:WeatherService){}

    ngOnInit()
    {
        this.weatherService.getWeather()
            .subscribe((weather)=>{
                this.today.setTime(this.today.getTime());
                this.day=this.today.getDate();
                this.month=this.today.getMonth();
                this.city=weather.city;
                this.weather=weather.details.weatherDescription;
                this.temp=weather.details.temp+'F';
        })

    }
}