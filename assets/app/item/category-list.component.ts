import {Component, OnInit} from "@angular/core";
import {ItemService} from "./item.service";
import {Router} from "@angular/router";


@Component({
    selector:'app-category-list',
    styleUrls:['./item.component.css'],
    template:`  
  
             <div class="card" *ngFor="let category of categories">
                 <img src="http://localhost:3000/public/{{category}}.jpg" style="width:100%">
                  <div class="container">
                    <a [routerLink]="['/item-list',category]">{{category}}</a>
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