
import {Component, OnInit, NgZone, Output, EventEmitter} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";
@Component({
    selector:'app-search',
    templateUrl:'/search.component.html'
})

export class SearchComponent implements OnInit{

    myForm:FormGroup;
    category=false;
    byEmail=false;
    @Output() searchEvent=new EventEmitter<any>();
    constructor(public router:Router){}
    ngOnInit()
    {
        this.myForm=new FormGroup({
            content:new FormControl(null,Validators.required),
        });
    }

    onSearch()
    {
       this.searchEvent.emit({email:this.byEmail,category:this.category,content:this.myForm.value.content});
        this.byEmail=false;
        this.category=false;
        this.myForm.reset();

    }
    changeCategoryBox()
    {
        if(this.byEmail)
        {
            this.byEmail=!this.byEmail;
            this.category=!this.category
        }
        else
        {
            this.category=!this.category
        }
    }

    changeEmailBox()
    {
        if(this.category)
        {
            this.byEmail=!this.byEmail;
            this.category=!this.category
        }
        else
        {
            this.byEmail=!this.byEmail
        }

    }
}