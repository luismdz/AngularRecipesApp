import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { RecipeService } from 'src/app/services/recipes.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

import { Recipe } from 'src/app/models/recipe.model';
import { Ingredient } from 'src/app/models/ingredient.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipes-detail.component.html',
  styleUrls: ['./recipes-detail.component.css']
})
export class RecipesDetailComponent implements OnInit {
  recipe = new Recipe();
  loading = true;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private slService: ShoppingListService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.route.params
      .subscribe(params => {
        this.loading = true;

        if (params.id !== null) {
          this.spinner.show();

          this.recipeService.getRecipe(params.id)
            .subscribe(recipe => {

              this.recipe = {
                id: params.id,
                ...recipe
              }
              this.loading = false;
              this.spinner.hide();

            });

        }
      });

  }

  onAddShoppingList(): void {
    const ingredients: Ingredient[] = this.recipe.ingredients;

    this.slService.addIngredients(ingredients);
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe(): void {
    this.recipeService.deleteRecipe(this.recipe.id);
    this.router.navigate(['recipe']);
  }


}
