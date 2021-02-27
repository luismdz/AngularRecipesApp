import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ShoppingListService } from 'src/app/services/shopping-list.service';

import { Ingredient } from '../../models/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  totalIngredients: number;

  // Subcriptions objects
  ingSub = new Subscription();
  amountSub = new Subscription();

  constructor(
    public slService: ShoppingListService
  ) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();

    // refresh list on adding new ingredient
    this.ingSub = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => this.ingredients = ingredients
      );

    // Get total of amounts of all ingredients in shopping list
    this.totalIngredients = this.slService.getTotalAmount();

    // Refresh total amount
    this.amountSub = this.slService.totalAmount
      .subscribe((total: number) => this.totalIngredients = total);
  }

  onEditItem(idx: number): void {
    this.slService.editingItem.next(idx);
  }

  ngOnDestroy(): void {
    this.ingSub.unsubscribe();
    this.amountSub.unsubscribe();
  }

}
