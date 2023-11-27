import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Recipe} from "../../models/Recipe.model";
import {RecipeService} from "../../core/services/Recipe.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-recipe-update',
  templateUrl: './edit-recipes.component.html',
  styleUrls: ['./edit-recipes.component.scss']
})
export class EditRecipesComponent implements OnInit {
  recipeForm!: FormGroup;
  recipe!: Recipe;
  id!: number;

  constructor(
    private recipeService: RecipeService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recipeForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      ingredients: ['', Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern(/(http[s]?:\/\/.*\.(?:png|jpg|jpeg|gif|png|svg))/i)]],
      prepTime: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      cookTime: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });

    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.recipeService.getRecipeById(this.id).subscribe(recipe => {
        this.recipe = recipe;
        this.recipeForm.patchValue(this.recipe);
      });
    });
  }

  onSubmit(): void {
    if (this.recipeForm.valid) {
      const updatedRecipe = { ...this.recipe, ...this.recipeForm.value };
      this.recipeService.updateRecipe(this.id, updatedRecipe).subscribe({
        next: () => this.router.navigateByUrl('/recipes/list'),
        error: err => console.error('Error updating recipe:', err)
      });
    }
  }
}

