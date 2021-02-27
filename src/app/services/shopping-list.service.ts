import { Subject } from 'rxjs';
import { cloneDeep } from 'lodash';

import { Ingredient } from '../models/ingredient.model';

export class ShoppingListService {

    ingredientsChanged = new Subject<Ingredient[]>();
    totalAmount = new Subject<number>();
    editingItem = new Subject<number>();

    private ingredients: Ingredient[] = [
        // new Ingredient('Apples', 5),
        // new Ingredient('Tomatoes', 10),
    ];

    getIngredients(): Ingredient[] {
        // Send a copy from original array
        return this.ingredients.slice();
    }

    getIngredient(idx: number): Ingredient {
        return this.ingredients.slice()[idx];
    }

    updateIngredient(idx: number, newIngredient: Ingredient): void {
        this.ingredients[idx] = newIngredient;

        // Emit changes
        this.ingredientsChanged.next(this.ingredients.slice());
        this.totalAmount.next(this.getTotalAmount());
    }

    removeIngredient(idx: number): void {
        this.ingredients.splice(idx, 1);

        // Emit changes
        this.ingredientsChanged.next(this.ingredients.slice());
        this.totalAmount.next(this.getTotalAmount());
    }

    addIngredient(ingredient: Ingredient): void {

        const newIngredient = this.checkList(ingredient)[0];

        if (newIngredient) {
            this.ingredients.push(newIngredient);
        }

        // Emit changes
        this.ingredientsChanged.next(this.ingredients.slice());
        this.totalAmount.next(this.getTotalAmount());
    }

    addIngredients(ingredients: Ingredient[]): void {
        const newIngredients = this.checkList(ingredients);
        // Push newIngredients array to ingredients
        this.ingredients.push(...newIngredients);

        // Emit changes
        this.ingredientsChanged.next(this.ingredients.slice());
        this.totalAmount.next(this.getTotalAmount());
    }

    getTotalAmount(): number {
        const total = this.ingredients.slice()
            .reduce((value: number, i: Ingredient) => value += i.amount, 0);

        return total;
    }

    private checkList(ingredients: Ingredient[] | Ingredient): Ingredient[] {

        // Copy of ingredients to lose reference of old object
        const ingredientsCopy = cloneDeep(ingredients);

        // Array to store "new" ingredients
        const newIngredients = [];
        let exists = false;

        if (Array.isArray(ingredientsCopy)) {
            // Check if ingredient exists in array, if it does sum its amount otherwise push it to the newIng array
            ingredientsCopy.forEach(newIng => {
                this.ingredients.find(i => {
                    if (i.name === newIng.name) {
                        i.amount += newIng.amount;
                        exists = true;
                    }
                });

                if (!exists) {
                    newIngredients.push(newIng);
                }
            });
        } else {
            this.ingredients.find(i => {
                if (i.name === ingredientsCopy.name) {
                    i.amount += ingredientsCopy.amount;
                    exists = true;
                }
            });

            if (!exists) {
                newIngredients.push(ingredientsCopy);
            }
        }

        return newIngredients;
    }

}
