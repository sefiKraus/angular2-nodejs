import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {ErrorService} from "../error/error.service";
import {Observable} from "rxjs";


@Injectable()
export class GoogleMapsService{

    constructor(private http:Http,private errorService:ErrorService){}

    getMarkers()
    {
        return this.http.get("http://localhost:3000/google-maps")
            .map((respone:Response)=>{
               return respone.json().obj;
            }).catch((error: Response) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());

        });
    }
}