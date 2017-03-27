

import {Component, OnInit} from "@angular/core";
import {AuthService} from "./auth.service";
import {User} from "./user.model";
import {Router} from "@angular/router";
@Component({
    selector:'app-user-list',
    template:`
                <div class="col-md-8 col-md-offset-2" *ngIf="isAdmin()">
                <!-- <app-user *ngFor="let user of users" [user]="user"  ></app-user>-->
                     <ul>
                     <li routerLinkActive="active" *ngFor="let user of users">
                    <a *ngIf="!isWatching(user.userId)" [routerLink]="['/user',user.userId]">{{user.email}}</a></li>
                      <!--<a (click)="navigateToCategoryList(category)">{{category}}</a></li>-->
                    </ul>
                 <hr>

                </div>
              

`
})

export class UserListComponent  implements OnInit{
    users:User[];

    constructor(private authService:AuthService,private router:Router){}


    ngOnInit()
    {
        if(this.isAdmin())
        {
            this.authService.getList()
                .subscribe((users:User[])=>
                    {
                        this.users=users;
                    }
                );
        }
        else {
            this.router.navigateByUrl('/auth');
        }

    }

    isAdmin()
    {
        return this.authService.isAdmin();
    }

    isWatching(userId:string)
    {
        return userId===localStorage.getItem('userId');
    }
}