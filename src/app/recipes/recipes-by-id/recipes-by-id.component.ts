import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../models/Recipe.model";
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeService} from "../../core/services/Recipe.service";
import {ToastService} from "../../core/services/Toast.service";

@Component({
  selector: 'app-recipes-by-id',
  templateUrl: './recipes-by-id.component.html',
  styleUrls: ['./recipes-by-id.component.scss']
})
export class RecipesByIdComponent implements OnInit {
  recipe!: Recipe;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private toastService: ToastService,
  ) {
  }

  ngOnInit(): void {
    console.log(localStorage)
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.recipeService.getRecipeById(id).subscribe(
        (recipe) => {
          console.log(   recipe)
          this.recipe = recipe;
        },
        (error) => {
          console.error('Error fetching recipe details', error);
        }
      );
    });
  }

  deleteRecipe(): void {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette recette ?")) {
      this.recipeService.deleteRecipe(this.recipe.id).subscribe({
        next: () => {
          this.toastService.show('Succès', 'Recette supprimée avec succès');
          this.GoingBackToTheRecipiesList();
        },
        error: (err) => {
          this.toastService.show('Erreur', 'Erreur lors de la suppression de la recette');
          console.error("Erreur lors de la suppression de la recette", err);
        }
      });
    }
  }

  GoingBackToTheRecipiesList(): void {
    this.router.navigateByUrl('/recipes/list');
  }

}
