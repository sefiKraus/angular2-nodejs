import {ItemService} from "./item.service";
import {OnInit, Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Item} from "./item.model";
@Component({
    selector:'app-item-category-list',
    template:`
             <ul *ngIf="items">
                     <li routerLinkActive="active" *ngFor="let item of items">
                        <a [routerLink]="['/item',item.itemId]">{{item.title}}</a>

                    </li>
                    </ul>   
        `
})

export class ItemCategoryListComponent implements OnInit{

    items:Item[];

    constructor(private itemService:ItemService,private route: ActivatedRoute){}

    ngOnInit()
    {
        this.route.params
            .map(params => params['data'])
            .subscribe((category) => {
                if(category!==undefined)
                {
                    this.itemService.getItemsByCategory(category)
                        .subscribe((items:Item[])=>
                        {
                            this.items=items;
                        });
                }
            });
    }



}
