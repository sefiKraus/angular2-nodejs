import {AuthService} from "../auth/auth.service";
import {Http, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Injectable, EventEmitter} from "@angular/core";
import {Comment} from "./comment.model";
import {ErrorService} from "../error/error.service";

@Injectable()
export class CommentService{
    private comments:Comment[]=[];

    constructor(private authService:AuthService,private http:Http,private errorService:ErrorService){}



    getList()
    {

        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get('http://localhost:3000/comment/'+token)
            .map((respone:Response)=>{
                const comments=respone.json().obj;
                let received:Comment[]=[];
                for(let comment of comments)
                {
                    received.push(new Comment(
                        comment.content,
                        comment.userId,
                        comment.itemId,
                        comment.commentDate,
                        comment._id

                    ))
                }
                this.comments=received;
                return received;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });
    }

    addComment(comment:Comment)
    {
        const body = JSON.stringify(comment);
        console.log(comment)
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('http://localhost:3000/comment' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const comment=new Comment(
                        result.obj.content,
                    result.obj.user,
                    result.obj.item,
                    result.obj.commentDate,
                    result.obj._id
                );
                this.comments.push(comment);
                return comment;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });    }

    editComment(comment:Comment)
    {
        const body = JSON.stringify(comment);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';

        return this.http.patch('http://localhost:3000/comment/' + comment.commentId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });    }

    deleteComment(comment:Comment)
    {
        this.comments.splice(this.comments.indexOf(comment),1);
        const token= localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete('http://localhost:3000/comment/' + comment.commentId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });
    }


    getListByItemId(itemId:string)
    {

        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get('http://localhost:3000/comment/'+itemId+token)
            .map((respone:Response)=>{
                const comments=respone.json().obj;
                let received:Comment[]=[];
                for(let comment of comments)
                {
                    received.push(new Comment(
                        comment.content,
                        comment.user,
                        comment.item,
                        comment.commentDate,
                        comment._id

                    ));
                }
                this.comments=received;
                return received;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());

            });    }
}