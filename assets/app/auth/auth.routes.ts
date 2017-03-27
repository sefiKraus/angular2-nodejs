import { Routes } from "@angular/router";

import { SignupComponent } from "./signup.component";
import { SigninComponent } from "./signin.component";
import { LogoutComponent } from "./logout.component";
import {UserListComponent} from "./user-list.component";


export const AUTH_ROUTES: Routes = [
     { path: ''},
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'logout', component: LogoutComponent },
    {path:'users', component:UserListComponent  }
];