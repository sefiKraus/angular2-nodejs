import {Injectable, OnInit} from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import {User} from "./user.model";
import {ErrorService} from "../error/error.service";
import forEach = require("core-js/fn/array/for-each");


@Injectable()
export class AuthService implements OnInit{
    private users:User[];


    constructor(private http: Http,private errorService:ErrorService) {}

    ngOnInit()
    {
        this.http.get('http://localhost:3000/user')
    }
    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });

    }

    logout()
    {
        localStorage.clear();
        this.users=[];
    }
    getList()
    {

        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get('http://localhost:3000/user/getList'+token)
            .map((respone:Response)=>{
                const users=respone.json().obj;
                let received:User[]=[];
                for(let user of users)
                {
                    received.push(new User(
                        user.email,
                        user.password,
                        user.role,
                        user.firstName,
                        user.lastName,
                        user._id));
                }
                this.users=received;
                return received;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });


    }

    deleteUser(user:User)
    {
        this.users.splice(this.users.indexOf(user),1);
        const token= localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
         : '';
        return this.http.delete('http://localhost:3000/user/' +
            user.userId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });
    }

    updateUser(user:User)
    {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.patch('http://localhost:3000/user/' + user.userId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });    }

    getUserById(id:string)
    {

        var userRequested:User;
        var userRequesting:User;
        if(this.users!==undefined) {

            for (var i = 0; i < this.users.length; i++) {
                if (this.users[i].userId == id) {
                    userRequested = this.users[i];
                }
                if (this.users[i].userId === localStorage.getItem('userId')) {
                    userRequesting = this.users[i];
                }

            }

            if (userRequesting.role === 'admin') {
                return userRequested;
            }
        }

    }

    isLoggedIn()
    {
        return localStorage.getItem('token')!==null;
    }




    isAdmin()
    {
        return (this.isLoggedIn() &&localStorage.getItem('userRole')==='admin');
    }

}