
import {Component, OnInit, Input} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {CommentService} from "./comment.service";
import {Comment} from "./comment.model";
@Component({
    selector:'app-comment-input',
    templateUrl:'./comment-input.component.html'

})

export class CommentInputComponent implements OnInit{
    myForm:FormGroup;
    @Input() itemId:string
    constructor(private authService:AuthService, private commentService:CommentService){}


    ngOnInit()
    {

        this.myForm=new FormGroup({
            content:new FormControl(null,Validators.required),
        })

    }

    onSubmit()
    {
        const comment=new Comment(
            this.myForm.value.content,
            localStorage.getItem('userId'),
            this.itemId
        );
      this.commentService.addComment(comment)
       .subscribe(
       data => console.log(data),
       error => console.error(error)
       );
      this.myForm.reset();
    }

    isLoggedIn()
    {
        return this.authService.isLoggedIn()
    }
}