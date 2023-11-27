import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesListComponent} from "./recipes/recipes-list/recipes-list.component";
import {RecipesByIdComponent} from "./recipes/recipes-by-id/recipes-by-id.component";
import {RecipesNewComponent} from "./recipes/recipes-new/recipes-new.component";
import {EditRecipesComponent} from "./recipes/edit-recipes/edit-recipes.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {HomeComponent} from "./core/home/home.component";
import {UserByIdComponent} from "./users/user-by-id/user-by-id.component";
import {NewUserComponent} from "./users/new-user/new-user.component";
import {LoginComponent} from "./auth/login/login.component";
import {AuthGuard} from "./auth/guards/authGuard";
import {EditUserComponent} from "./users/edit-user/edit-user.component";


const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},

  // Recipes
  {
    path: 'recipes',
    children: [
      {path: 'list', component: RecipesListComponent, canActivate: [AuthGuard]},
      {path: 'new', component: RecipesNewComponent, canActivate: [AuthGuard]},
      {path: ':id', component: RecipesByIdComponent, canActivate: [AuthGuard]},
      {path: 'edit/:id', component: EditRecipesComponent, canActivate: [AuthGuard]},
    ]
  },

  // Users
  {
    path: 'users',
    children: [
      {path: 'new', component: NewUserComponent},
      {path: ':id', component: UserByIdComponent, canActivate: [AuthGuard]},
      {path: 'edit/:id', component: EditUserComponent, canActivate: [AuthGuard]},
    ]
  },

  // Login
  {path: 'auth/login', component: LoginComponent},

  // Wildcard route for a 404 page
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', redirectTo: 'not-found'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
