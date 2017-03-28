import {Component, OnInit} from "@angular/core";
import {D3Service} from "./d3.service";
@Component({

})

export class D3Component implements OnInit{
data=[];

constructor(private d3Service:D3Service){}

ngOnInit()
{
    this.d3Service.getGraph1().subscribe(
        data=>{

        }
    )
}
}