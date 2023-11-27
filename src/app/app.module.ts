import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './core/header/header.component';
import {FooterComponent} from './core/footer/footer.component';
import {RecipesListComponent} from './recipes/recipes-list/recipes-list.component';
import {RecipesByIdComponent} from './recipes/recipes-by-id/recipes-by-id.component';
import {RecipesNewComponent} from './recipes/recipes-new/recipes-new.component';
import {HttpClientModule} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";
import {ToastComponent} from '../shared/toast/toast.component';
import {ReactiveFormsModule} from "@angular/forms";
import {EditRecipesComponent} from './recipes/edit-recipes/edit-recipes.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {HomeComponent} from './core/home/home.component';
import {NewUserComponent} from './users/new-user/new-user.component';
import {EditUserComponent} from './users/edit-user/edit-user.component';
import {UserByIdComponent} from './users/user-by-id/user-by-id.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthModule} from "./auth/auth.module";
import {httpInterceptorProviders} from "./interceptors";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        RecipesListComponent,
        RecipesByIdComponent,
        RecipesNewComponent,
        ToastComponent,
        EditRecipesComponent,
        NotFoundComponent,
        HomeComponent,
        NewUserComponent,
        EditUserComponent,
        UserByIdComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgOptimizedImage,
        ReactiveFormsModule,
        AuthModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'fr-FR' },
        httpInterceptorProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
