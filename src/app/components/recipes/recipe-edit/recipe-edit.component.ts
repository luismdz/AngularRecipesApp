import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators, FormBuilder } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipes.service';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  editMode = false;
  recipe = new Recipe();
  recipeForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private fb: FormBuilder
  ) { }

  async ngOnInit() {
    this.recipeForm = this.fb.group({

      name: new FormControl(null, Validators.required),
      imagePath: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      ingredients: null

    });

    this.route.params.subscribe(params => {

      this.editMode = params.id != null;
      //  console.log(params);
      if (params.id) {
        this.recipe.id = params.id;
      }

    });

    const data = await this.recipeService.getRecipe(this.recipe.id).toPromise();

    this.recipe = { id: this.recipe.id, ...data };

    console.log(this.editMode);
    this.initRecipeForm();
  }


  // Getters
  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  // Init form
  private initRecipeForm(): void {

    const ingredientsFormArray = new FormArray([]);

    if (this.editMode) {

      if (this.recipe.ingredients) {

        this.recipe.ingredients.forEach(i => {

          ingredientsFormArray.push(
            new FormGroup({
              name: new FormControl(i.name, Validators.required),
              amount: new FormControl(i.amount,
                [Validators.required, Validators.min(1)]
              ),

            })
          );

        });
      }

      this.recipeForm = this.fb.group({
        name: new FormControl(this.recipe.name, Validators.required),
        imagePath: new FormControl(this.recipe.imagePath, Validators.required),
        description: new FormControl(this.recipe.description, Validators.required),
        ingredients: ingredientsFormArray
      });

    }

  }

  // Add new ingredient to formArray
  onAddIngredient(): void {
    this.ingredients.push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(
          null, [Validators.required, Validators.min(1)]
        ),

      })
    );

  }

  onDeleteIngredient(idx: number): void {
    this.ingredients.removeAt(idx);
  }

  onCancel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  // Submit event
  onSubmit(): void {
    const { name, description, imagePath, ingredients } = this.recipeForm.value;

    const newRecipe: Recipe = {
      name,
      description,
      imagePath,
      ingredients
    };

    if (this.editMode) {
      this.recipeService.updateRecipe(this.recipe.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }

    this.recipeForm.reset();
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
