import { Component } from "@angular/core";
import {AuthService} from "./auth/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-header',
    template: `
        <header class="row">
            <nav class="col-md-8 col-md-offset-2">
                <div class="collapse navbar-collapse" id="myNavbar">
                 <ul class="nav navbar-nav">
                    <li  routerLinkActive="active"><a [routerLink]="['/search']" >Search</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['/item-list']">Review List</a></li>
                    <li *ngIf="isAdmin()" routerLinkActive="active"><a [routerLink]="['/item-input']">Review Input</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['/category-list']">Categories</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li routerLinkActive="active"><a [routerLink]="['/auth']">Authentication</a></li>
                </ul>

                </div>
            </nav>
        </header>
     
    `
})
export class HeaderComponent {
    constructor(private authService:AuthService,public router:Router){}

    isAdmin()
    {
        return this.authService.isAdmin();
    }
}
