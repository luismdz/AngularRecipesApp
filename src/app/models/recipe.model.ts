import { Ingredient } from './ingredient.model';

export class Recipe {
    constructor(
        public id?: string,
        public name: string = null,
        public description: string = null,
        public imagePath: string = null,
        public ingredients: Ingredient[] = null
    ) { }

}