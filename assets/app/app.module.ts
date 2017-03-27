import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import { AppComponent } from "./app.component";
import {routing} from "./app.routing";


import {AuthService} from "./auth/auth.service";
import {ErrorService} from "./error/error.service";
import {ErrorComponent} from "./error/error.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {SignupComponent} from "./auth/signup.component";
import {SigninComponent} from "./auth/signin.component";
import {LogoutComponent} from "./auth/logout.component";
import {HeaderComponent} from "./header.component";
import {UserComponent} from "./auth/user.component";
import {UserListComponent} from "./auth/user-list.component";
import {CommentService} from "./comment/comment.service";
import {CommentComponent} from "./comment/comment.component";
import {CommentInputComponent} from "./comment/comment-input.component";
import {CommentListComponent} from "./comment/comment-list.component";
import {ItemComponent} from "./item/item.component";
import {ItemInputComponent} from "./item/item-input.component";
import {ItemService} from "./item/item.service";
import {ItemListComponent} from "./item/item-list.component";
import {CategoryListComponent} from "./item/category-list.component";
import {SearchComponent} from "./search/search.component";
import {AgmCoreModule} from 'angular2-google-maps/core';

import {GoogleMapsComponent} from "./webservice/google-maps.component";
import {ItemListHomePageComponent} from "./item/item-list-home-page.component";
import {GoogleMapsService} from "./webservice/google-maps.service";



@NgModule({
    declarations: [
        AppComponent,
        ErrorComponent,
        AuthenticationComponent,
        SignupComponent,
        SigninComponent,
        LogoutComponent,
        HeaderComponent,
        UserComponent,
        UserListComponent,
        CommentInputComponent,
        CommentComponent,
        CommentListComponent,
        ItemComponent,
        ItemInputComponent,
        ItemListComponent,
        ItemListHomePageComponent,
        CategoryListComponent,
        SearchComponent,
        GoogleMapsComponent

    ],
    imports: [ BrowserModule,
                FormsModule,
                routing,
                ReactiveFormsModule,
                HttpModule,
                AgmCoreModule.forRoot({ apiKey: 'AIzaSyAWQNC3fjVyzB-C7QeA8U8U4D9VlRNIaBA'})

    ],


    providers:[AuthService,ErrorService,CommentService,ItemService,GoogleMapsService],
    bootstrap: [AppComponent]
})
export class AppModule {

}