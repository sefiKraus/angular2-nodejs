import {Component, OnInit} from "@angular/core";
import {Item} from "./item.model";
import {ItemService} from "./item.service";
import {ActivatedRoute} from "@angular/router";


@Component({
    selector:'app-item-list-home-page',
    styleUrls:['./item.component.css'],
    template:`

                 <div class="col-md-8 col-md-offset-2">
                      <ul *ngIf="items">
                     <li routerLinkActive="active" *ngFor="let item of items">
                    <a [routerLink]="['/item',item.itemId]">{{item.title}}</a></li>
                    </ul>   
                 <hr>
                 </div>
  

                    `
})

export class ItemListHomePageComponent implements OnInit{
    items:Item[];

    constructor(private itemService:ItemService,private route:ActivatedRoute){}


    ngOnInit()
    {
        this.route.params
            .map(params => params['data'])
            .subscribe((category) => {
                if(category===undefined)
                {
                    this.itemService.getItems()
                        .subscribe((items:Item[])=>
                        {
                            this.items=items;
                        })
                }


            });
    }
}