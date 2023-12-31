import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Recipe} from '../../models/Recipe.model'


@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    private apiUrl = 'http://localhost:3307/api';
    private recipesEndpoint = '/recipes';

    constructor(private http: HttpClient) {
    }

    getRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.apiUrl}${this.recipesEndpoint}`);
    }

    getRecipeById(id: number): Observable<Recipe> {
        return this.http.get<Recipe>(`${this.apiUrl}${this.recipesEndpoint}/${id}`);
    }

    createRecipe(recipe: Recipe): Observable<Recipe> {
        return this.http.post<Recipe>(`${this.apiUrl}${this.recipesEndpoint}`, recipe);
    }

    updateRecipe(id: number, recipe: Recipe): Observable<Recipe> {
        return this.http.put<Recipe>(`${this.apiUrl}${this.recipesEndpoint}/${id}`, recipe);
    }

    deleteRecipe(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}${this.recipesEndpoint}/${id}`);
    }

    searchRecipesByTitle(title: string): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(`${this.apiUrl}${this.recipesEndpoint}/search`, {params: {title}});
    }
}
