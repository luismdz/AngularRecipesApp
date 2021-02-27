import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RecipeService } from '../../../services/recipes.service';
import { Recipe } from '../../../models/recipe.model';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit, OnDestroy {

  // recipes: Recipe[];
  // subscription: Subscription;
  recipes: Observable<Recipe[]>;
  recipeArr: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipes = this.recipeService.recipesChanged;

  }

  onNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}
