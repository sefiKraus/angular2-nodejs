
import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";
import {ItemService} from "./item.service";
import {Item} from "./item.model";
@Component({
    selector:'app-item-input',
    templateUrl:'./item-input.component.html'
})

export class ItemInputComponent implements OnInit{
    myForm:FormGroup;

    constructor(private authService:AuthService,private itemService:ItemService){}

    ngOnInit()
    {
        this.myForm=new FormGroup({
            category:new FormControl(null,Validators.required),
            title:new FormControl(null,Validators.required),
            content:new FormControl(null,Validators.required),
            pictureLink:new FormControl(null)
        })
    }



    onSubmit()
    {
        const item=new Item(
            this.myForm.value.category,
            this.myForm.value.title,
            this.myForm.value.content,
            localStorage.getItem('userId'),
            this.myForm.value.pictureLink
        );
        this.itemService.addItem(item)
         .subscribe(
         data => console.log(data),
         error => console.error(error)
         );

        this.myForm.reset();
    }

    isAdmin()
    {
        return this.authService.isAdmin();
    }

}