import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

import { Recipe } from '../models/recipe.model';


@Injectable()
export class RecipeService {

    private url = 'https://ng-course-recipe-book-94cce.firebaseio.com';
    private recipes: Recipe[] = [];

    recipesChanged = new BehaviorSubject<Recipe[]>(this.recipes.slice());

    constructor(
        private http: HttpClient,
        // private db: AngularFireDatabase,
    ) {
        // this.recipes$ = this.db.list<Recipe>('recipes').valueChanges();
    }

    getRecipes() {

        this.http.get<Recipe[]>(`${this.url}/recipes.json`)
            .pipe(
                map(resp => {
                    const recipes = [];

                    Object.keys(resp).forEach(key => {

                        const recipe = {
                            id: key,
                            ingredients: resp[key].ingredients ? resp[key].ingredients : [],
                            ...resp[key]
                        }

                        recipes.push(recipe);
                    });
                    // console.log(this.recipes);
                    this.recipes = recipes;

                    return this.recipes;
                })
            ).subscribe(recipes => this.recipesChanged.next(recipes));

        return this.recipesChanged.asObservable();

    }

    getRecipe(id: string) {

        return this.http.get<Recipe>(`${this.url}/recipes/${id}.json`).pipe(delay(500));

    }

    addRecipe(recipe: Recipe) {

        return this.http.post(`${this.url}/recipes.json`, recipe).subscribe((id: any) => {

            recipe.id = id.name;
            this.recipes.push(recipe);

            this.recipesChanged.next(this.recipes.slice());

        });

    }

    updateRecipe(id: string, recipe: Recipe) {

        return this.http.put(`${this.url}/recipes/${id}.json`, recipe).subscribe(() => {

            this.recipes.forEach((r: Recipe) => {
                if (r.id === id) {
                    r = { id: id, ...recipe }
                }
            });

            this.recipesChanged.next(this.recipes.slice());
        });

    }

    deleteRecipe(id: string) {

        return this.http.delete(`${this.url}/recipes/${id}.json`).subscribe(() => {

            this.recipes.forEach((recipe, index) => {
                if (recipe.id === id) {
                    this.recipes.splice(index, 1);
                }
            });

            this.recipesChanged.next(this.recipes.slice());
        })

    }

}
