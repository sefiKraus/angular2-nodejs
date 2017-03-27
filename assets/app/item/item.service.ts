import {Http, Headers, Response, RequestOptions} from "@angular/http";
import {Injectable, EventEmitter} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {ErrorService} from "../error/error.service";
import {Item} from "./item.model";
import {Observable} from "rxjs";
import {User} from "../auth/user.model";

@Injectable()
export class ItemService{
    private items:Item[]=[];

    constructor(private authService:AuthService,private http:Http,private errorService:ErrorService){}

    getItemById(id:string)
    {
        for(var i=0;i<this.items.length;i++)
        {
            if(this.items[i].itemId===id)
            {
                return this.items[i];
            }
        }
    }
    getItemsByRegex(content:string)
    {

        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get('http://localhost:3000/item/regex/'+content)
            .map((respone:Response)=>{
                const items=respone.json().obj;
                let received:Item[]=[];
                for(let item of items)
                {
                    var gradedBy:User[]=[];
                    if(item.gradedBy.length>0)
                    {
                        for(let user of item.gradedBy)
                        {
                            gradedBy.push(new User(
                                user.email,
                                user.password,
                                user.role,
                                user.firstName,
                                user.lastName,
                                user._id
                            ));

                        }
                    }
                    received.push(new Item(
                        item.category,
                        item.title,
                        item.content,
                        item.publisher._id,
                        item.pictureLink,
                        item.publisher,
                        item._id,
                        item.publishDate,
                        item.grade,
                        gradedBy


                    ));
                }
                this.items=received;
                return received;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });
    }
    getItems()
    {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get('http://localhost:3000/item/fullList'+token)
            .map((respone:Response)=>{
                const items=respone.json().obj;
                let received:Item[]=[];
                for(let item of items)
                {

                    var gradedBy:User[]=[];
                    if(item.gradedBy.length>0)
                    {
                        for(let user of item.gradedBy)
                        {
                            gradedBy.push(new User(
                                user.email,
                                user.password,
                                user.role,
                                user.firstName,
                                user.lastName,
                                user._id
                            ));

                        }
                    }
                    received.push(new Item(
                        item.category,
                        item.title,
                        item.content,
                        item.publisher._id,
                        item.pictureLink,
                        item.publisher,
                        item._id,
                        item.publishDate,
                        item.grade,
                        gradedBy


                    ));
                }
                this.items=received;
                return received;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });    }
    getItemsByAuthourEmail(email:string)
    {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get('http://localhost:3000/item/email/'+email+token)
            .map((respone:Response)=>{
                const items=respone.json().obj;
                let received:Item[]=[];
                for(let item of items)
                {
                    var gradedBy:User[]=[];
                    if(item.gradedBy.length>0)
                    {
                        for(let user of item.gradedBy)
                        {
                            gradedBy.push(new User(
                                user.email,
                                user.password,
                                user.role,
                                user.firstName,
                                user.lastName,
                                user._id
                            ));

                        }
                    }
                    received.push(new Item(
                        item.category,
                        item.title,
                        item.content,
                        item.publisher._id,
                        item.pictureLink,
                        item.publisher,
                        item._id,
                        item.publishDate,
                        item.grade,
                        gradedBy


                    ));
                }
                this.items=received;
                return received;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });    }
    getItemsByCategory(category:string)
    {
        const token = localStorage.getItem('token')
        ? '?token=' + localStorage.getItem('token')
        : '';
        return this.http.get('http://localhost:3000/item/category/'+category+token)
            .map((respone:Response)=>{
                const items=respone.json().obj;
                let received:Item[]=[];
                for(let item of items)
                {
                    var gradedBy:User[]=[];
                    if(item.gradedBy.length>0)
                    {
                        for(let user of item.gradedBy)
                        {
                            gradedBy.push(new User(
                                user.email,
                                user.password,
                                user.role,
                                user.firstName,
                                user.lastName,
                                user._id
                            ));

                        }
                    }
                    received.push(new Item(
                        item.category,
                        item.title,
                        item.content,
                        item.publisher._id,
                        item.pictureLink,
                        item.publisher,
                        item._id,
                        item.publishDate,
                        item.grade,
                        gradedBy


                    ));
                }
                this.items=received;
                return received;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });    }

    getCategories()
    {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get('http://localhost:3000/item/fullList'+token)
            .map((respone:Response)=>{
                const items=respone.json().obj;
                let received:string[]=[];
                for(let item of items)
                {
                    if(!received.includes(item.category))
                        received.push(item.category);
                }
                return received;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });    }


    addItem(item:Item)
    {
      const body = JSON.stringify(item);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
           return this.http.post('http://localhost:3000/item' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const users:User[]=[];
                for(let user of result.obj.gradedBy)
                {
                    users.push(new User(
                        user.email,
                        user.password,
                        user.role,
                        user.firstName,
                        user.lastName,
                        user._id
                    ));
                }
                const item = new Item(
                        result.obj.category,
                        result.obj.title,
                        result.obj.content,
                        result.obj.publisher._id,
                        result.obj.pictureLink,
                        result.obj.publisher,
                        result.obj._id,
                        result.obj.publishDate,
                        result.obj.grade,
                        users
                    );

              this.items.push(item);
                return item;
            })
               .catch((error: Response) => {
                   this.errorService.handleError(error.json());
                   return Observable.throw(error.json());

               });       }

    deleteItem(item:Item)
    {

        for(var i=0;i<this.items.length;i++)
        {
            if(this.items[i]===item)
            {
                this.items.splice(i,1);
            }
        }
        const token= localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete('http://localhost:3000/item/' + item.itemId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });    }

    editItem(item:Item)
    {
        const body = JSON.stringify(item);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.patch('http://localhost:3000/item/rate' + item.itemId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });    }

    rateItem(item:Item)
    {
        const body = JSON.stringify(item);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.patch('http://localhost:3000/item/rate/' + item.itemId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });    }

}