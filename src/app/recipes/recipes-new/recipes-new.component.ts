import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from "../../core/services/Recipe.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../../core/services/Auth.service";


@Component({
  selector: 'app-recipes-new',
  templateUrl: './recipes-new.component.html',
  styleUrls: ['./recipes-new.component.scss']
})
export class RecipesNewComponent implements OnInit {

  recipeForm!: FormGroup;
  urlRegex!: RegExp;
  errorMessage: string = '';
  userName: string = '';
  userId: string = '';
  subscriptions: Subscription[] = [];

  constructor(private recipeService: RecipeService, private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    this.subscriptions.push(
      this.authService.userName$.subscribe(userName => this.userName = userName),
      this.authService.userId$.subscribe(userId => this.userId = userId)
    );
    this.recipeForm = this.formBuilder.group({
      description: [null, Validators.required],
      imageUrl: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
      title: [null, Validators.required],
      ingredients: [null, Validators.required],
      prepTime: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      cookTime: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }

  onSubmitForm() {
    if (this.recipeForm.valid) {
      const formValueWithAuthor = {
        ...this.recipeForm.value,
        author: this.userId
      };
      this.recipeService.createRecipe(this.recipeForm.value).subscribe({
        next: () => this.router.navigateByUrl('/recipes/list'),
        error: (error: any) => {
          this.errorMessage = error.error.message || `Une erreur est survenue lors de la création de la recette. Code d'erreur : ${error.status}`;
          console.error('Error creating recipe:', error);
        }
      });
    }
  }

}
