import { Routes, RouterModule } from "@angular/router";
import {AuthenticationComponent} from "./auth/authentication.component";
import {AUTH_ROUTES} from "./auth/auth.routes";
import {ItemInputComponent} from "./item/item-input.component";
import {ItemListComponent} from "./item/item-list.component";
import {CategoryListComponent} from "./item/category-list.component";
import {ItemComponent} from "./item/item.component";
import {UserComponent} from "./auth/user.component";
import {ItemCategoryListComponent} from "./item/item-category-list.component";
import {WeatherComponent} from "./webservice/weather-service.component";


//TODO:set children routes from items, add routing for other components

const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthenticationComponent ,children:AUTH_ROUTES },
  {path:'item-input',component:ItemInputComponent},
  {path:'item/:id', component:ItemComponent,pathMatch:'full'},
  {path:'category-list', component:CategoryListComponent},
  {path:'item-category-list/:data',component:ItemCategoryListComponent},
  {path:'user/:id',component:UserComponent,pathMatch:'full'},
  {path:'search',component:ItemListComponent},
  {path:'weather',component:WeatherComponent}


];

export const routing = RouterModule.forRoot(APP_ROUTES);