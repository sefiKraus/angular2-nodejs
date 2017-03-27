
import {Component, OnInit, Input} from "@angular/core";
import {Comment} from "./comment.model";
import {AuthService} from "../auth/auth.service";
import {CommentService} from "./comment.service";
@Component({
    selector:'app-comment-list',
    template:`
                
                <div class="col-md-8 col-md-offset-2" *ngIf="comments">
                <app-comment [itemId]="itemId" [comment]="comment" *ngFor="let comment of comments" ></app-comment>
                 <hr>

                 </div>

`
})

/**
 *
 */
export class CommentListComponent implements OnInit{
    comments:Comment[];
    @Input() itemId:string;

    constructor(private authService:AuthService,private commentService:CommentService){}


    ngOnInit()
    {
       this.commentService.getListByItemId(this.itemId)
           .subscribe((comments:Comment[])=>
               {
                   this.comments=comments;
               }

           )

    }

    isLoggedIn()
    {
        return this.authService.isLoggedIn();
    }

}