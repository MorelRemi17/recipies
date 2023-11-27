import { Component, OnInit } from '@angular/core';
import { debounceTime, Observable, startWith, Subject, switchMap, tap } from 'rxjs';
import { Recipe } from '../../models/Recipe.model';
import { RecipeService } from '../../core/services/Recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {

  recipes$!: Observable<Recipe[]>;
  noRecipesFound = false;
  private searchTerms = new Subject<string>();

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipes$ = this.searchTerms.pipe(
      startWith(''),
      debounceTime(300),
      switchMap((term: string) => term ? this.recipeService.searchRecipesByTitle(term) : this.recipeService.getRecipes()),
      tap(recipes => this.noRecipesFound = recipes.length === 0) // Met à jour l'indicateur en fonction des résultats
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }
}
