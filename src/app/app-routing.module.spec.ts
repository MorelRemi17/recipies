import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import {RecipesListComponent} from "./recipes/recipes-list/recipes-list.component";

describe('mon test de routeur', () => {
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: HomeComponent },
          { path: 'recipes/list', component: RecipesListComponent },
        ])
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
  }));

  it('devrait renvoyer la bonne réponse pour une route valide', waitForAsync(() => {
    router.navigate(['/recipes/list']).then(() => {
      expect(router.url).toEqual('/recipes/list');
    });
  }));
});
