
import {Component, OnInit, Input} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {ItemService} from "./item.service";
import {Item} from "./item.model";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {User} from "../auth/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {isNullOrUndefined} from "util";
@Component({
    selector:'app-item',
    templateUrl:'./item.component.html'

})


export class ItemComponent implements OnInit{
     item:Item;
    myForm:FormGroup;
    gradedBy:User[]=[];
    allowToRate:boolean;
    constructor(private authService:AuthService,private itemService:ItemService,
                private route: ActivatedRoute,private router:Router){}


    /**
     * TODO: add regex validator to picture link
     * [
     Validators.required,
     Validators.pattern("")

     ]
     */

    ngOnInit()
    {
        this.route.params
            .map(params => params['id'])
            .subscribe((id) => {
                this.item=this.itemService.getItemById(id);
                this.myForm=new FormGroup({
                    category:new FormControl(this.item.category,Validators.required),
                    title:new FormControl(this.item.title,Validators.required),
                    content:new FormControl(this.item.content,Validators.required),
                    pictureLink:new FormControl(this.item.pictureLink),
                    publishDate:new FormControl(this.item.publishDate,Validators.required),
                    publisherEmail:new FormControl(this.item.publisher.email,Validators.required),
                    grade:new FormControl(this.item.grade,Validators.required)
                });
                if(this.item.gradedByUsers.length>0)
                    this.gradedBy=this.item.gradedByUsers;
                this.allowToRate=this.isAllowToRate();

            });

    }

    isAdmin()
    {
        return this.authService.isAdmin();
    }

    onEdit()
    {
        const item=new Item(
            this.myForm.value.category,
            this.myForm.value.title,
            this.myForm.value.content,
            this.item.publisherId,
            this.myForm.value.pictureLink,
            this.item.publisher,
            this.item.itemId,
            this.item.publishDate,
            this.item.grade,
            this.item.gradedByUsers
        );
        this.item=item
        this.itemService.editItem(this.item)
            .subscribe(

                result=> console.log(result),
            )
    }

    onDelete()
    {
        const category=this.item.category
        this.itemService.deleteItem(this.item)
            .subscribe(
                result => {
                    console.log(result),
                    this.router.navigateByUrl('item-list/')
                }

            );
    }

    addRateToItem()
    {

       this.item.grade=Number(this.item.grade.valueOf()+1);
         this.itemService.rateItem(this.item)
            .subscribe(
                (result)=> {
                    this.myForm.patchValue({
                        grade:this.item.grade
                    });
/*
                    this.router.navigateByUrl('item/'+this.item.itemId);
*/
                    }
                    )
    }

    isAllowToRate()
    {

        for(var i=0;i<this.item.gradedByUsers.length;i++)
        {
            if(this.item.gradedByUsers[i].userId===localStorage.getItem('userId'))
            {
                return false;
            }
        }
        return true;
    }

}


