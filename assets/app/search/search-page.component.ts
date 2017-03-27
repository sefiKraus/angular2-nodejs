import {Component, Input} from "@angular/core";


@Component({
    selector:'app-search-page',
    template:`
            <app-search (searchEvent)="printData($event)"></app-search>
            <app-item-list [data]="dataFromSearch"></app-item-list>
`
})

export class SearchPageComponent{

    dataFromSearch:any;

    printData(data:any)
    {
        this.dataFromSearch=data;
    }
}