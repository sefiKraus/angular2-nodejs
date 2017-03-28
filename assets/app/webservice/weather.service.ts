import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class WeatherService{

    constructor(private http:Http){}

    getWeather()
    {
        return this.http.get('http://localhost:3000/rss/posts')
            .map((response:Response)=>{
                var weather=response.json().obj
                return weather;
            })
            .catch((error: Response) => {
                return Observable.throw(error.json());

            });


    }
}