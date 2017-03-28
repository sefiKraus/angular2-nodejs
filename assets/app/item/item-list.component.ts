
import {Component, OnInit} from "@angular/core";
import {Item} from "./item.model";
import {ItemService} from "./item.service";
import {ActivatedRoute} from "@angular/router";


@Component({
    selector:'app-item-list',
    styleUrls:['./item.component.css'],
    template:`
                 <app-search (searchEvent)="setData($event)"></app-search>
                 <hr>
                      <ul *ngIf="items">
                     <li routerLinkActive="active" *ngFor="let item of items">
                        <a [routerLink]="['/item',item.itemId]">{{item.title}}</a>

                    </li>
                    </ul>   
                    
 
                 
`

})

export class ItemListComponent {
    items:Item[];
    data:any;
    constructor(private itemService:ItemService,private route: ActivatedRoute){}

    setData(data:any)
    {
        this.items=[];
        this.data=data;
        if(this.data.category)
        {
            this.itemService.getItemsByCategory(this.data.content)
                .subscribe((items:Item[])=>{
                console.log(items);
                this.items=items
            });
        }
        else if(this.data.email)
        {
            this.itemService.getItemsByAuthourEmail(this.data.content)
                .subscribe((items:Item[])=>
                {
                    this.items=items;
                })
        }
        else
        {
            this.itemService.getItemsByRegex(this.data.content)
                .subscribe((items:Item[])=>{
                    this.items=items;
                })
        }
    }

}