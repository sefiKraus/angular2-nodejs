import {Component, OnInit} from "@angular/core";
import {ItemService} from "./item.service";
import {Router} from "@angular/router";


@Component({
    selector:'app-category-list',
    styleUrls:['./item.component.css'],
    template:`  
        <div class="row">
        <div class="col-sm-4" *ngFor="let category of categories">
                 <a [routerLink]="['/item-category-list',category]"><b>{{category}}</b></a>
                 <img src="/pictures/{{category}}.jpg" style="width:100%">
                </div>
                </div>
            `
})

export class CategoryListComponent implements OnInit{

    categories:string[];

    constructor(private itemService:ItemService,private router:Router){}

    ngOnInit()
    {
        this.itemService.getCategories()
            .subscribe((categories:string[])=>
            {
                this.categories=categories
            })
    }

/*    navigateToCategoryList(category:string)
    {
        var uri='http://localhost:3000/item-list/'+category+'/';
        var uri_enc = encodeURIComponent(uri);
        var uri_dec = decodeURIComponent(uri_enc);
        console.log(uri_enc);
       // this.router.navigateByUrl(uri_dec);
    }*/
}