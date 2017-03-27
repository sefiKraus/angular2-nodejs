
import {Component, OnInit, Input} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {CommentService} from "./comment.service";
import {Comment} from "./comment.model";
import {FormGroup, FormControl, Validators} from "@angular/forms";
@Component({
    selector:'app-comment',
    templateUrl:'./comment.component.html'
})

export class CommentComponent implements OnInit{
    @Input() itemId:string;
    @Input() comment:Comment;
    myForm:FormGroup;
    constructor(private authService:AuthService,private commentService:CommentService){}

    ngOnInit()
    {
        this.myForm=new FormGroup({
            content:new FormControl(this.comment.content,Validators.required),
            commentDate:new FormControl(this.comment.commentDate,Validators.required)
        })
    }


    /**
     * public content:string,
     public userId:string,
     public itemId?:string,
     public commentDate?:Date,
     public commentId?:string
     */
    onEdit()
    {
        const comment=new Comment(
            this.myForm.value.content,
            localStorage.getItem('userId'),
            this.itemId,
            this.comment.commentDate,
            this.comment.commentId
        );
        this.comment=comment
        this.commentService.editComment(this.comment)
            .subscribe(
                result=> console.log(result)
            )

    }

    onDelete()
    {
        this.commentService.deleteComment(this.comment)
            .subscribe(
                result => console.log(result)
            );
    }

    isOwnerOrAdmin()
    {
        return (this.authService.isAdmin() || this.comment.userId==localStorage.getItem('userId'));
    }
}