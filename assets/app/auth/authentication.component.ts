
import {Component} from "@angular/core";
import {AuthService} from "./auth.service";
@Component({
    selector: 'app-authentication',
    template: `
        <nav class="navbar navbar-inverse">
              <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav navbar-right">
                    <li routerLinkActive="active" *ngIf="!isLoggedIn()"><a [routerLink]="['signup']">Signup</a></li>
                    <li routerLinkActive="active" *ngIf="!isLoggedIn()"><a [routerLink]="['signin']">Signin</a></li>
                    <li routerLinkActive="active" *ngIf="isLoggedIn()"><a [routerLink]="['logout']">Logout</a></li>
                    <li routerLinkActive="active" *ngIf="isAdmin()"><a [routerLink]="['users']">User list</a></li>
                </ul>
                </div>
            </nav>
            <router-outlet></router-outlet>

    `
})

export class AuthenticationComponent{
    constructor(private authService: AuthService) {}

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

    isAdmin()
    {
        return this.authService.isAdmin();
    }
}