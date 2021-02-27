import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipesDetailComponent } from './components/recipes/recipes-detail/recipes-detail.component';
import { NoRecipeSelectedComponent } from './components/recipes/no-recipe-selected.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';

import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';

const ROUTES: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      { path: '', component: NoRecipeSelectedComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipesDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent },
    ]
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent
  },
  { path: '**', redirectTo: 'recipes', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
