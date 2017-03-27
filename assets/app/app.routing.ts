import { Routes, RouterModule } from "@angular/router";
import {AuthenticationComponent} from "./auth/authentication.component";
import {AUTH_ROUTES} from "./auth/auth.routes";
import {ItemInputComponent} from "./item/item-input.component";
import {ItemListComponent} from "./item/item-list.component";
import {CategoryListComponent} from "./item/category-list.component";
import {ItemComponent} from "./item/item.component";
import {UserComponent} from "./auth/user.component";
import {ItemListHomePageComponent} from "./item/item-list-home-page.component";


//TODO:set children routes from items, add routing for other components

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthenticationComponent ,children:AUTH_ROUTES },
  {path:'item-input',component:ItemInputComponent},
  {path:'item-list', component:ItemListHomePageComponent},
  {path:'item-list/:data', component:ItemListComponent},
  {path:'item/:id', component:ItemComponent,pathMatch:'full'},
  {path:'category-list', component:CategoryListComponent},
  {path:'user/:id',component:UserComponent,pathMatch:'full'},
  {path:'search',component:ItemListComponent},


];

export const routing = RouterModule.forRoot(APP_ROUTES);