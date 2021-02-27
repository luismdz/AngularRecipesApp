import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ShoppingListService } from 'src/app/services/shopping-list.service';

import { Ingredient } from 'src/app/models/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  shoppingListForm: FormGroup;
  ingredient: Ingredient;
  editingIndex: number;
  editMode = false;
  subcription: Subscription;

  constructor(
    public slService: ShoppingListService
  ) { }

  ngOnInit(): void {
    this.createForm();

    this.subcription = this.slService.editingItem
      .subscribe((index: number) => {
        this.editingIndex = +index;
        const item = this.slService.getIngredient(this.editingIndex);
        this.completeForm(item);
        this.editMode = true;
      });
  }

  createForm(): void {
    this.shoppingListForm = new FormGroup({
      name: new FormControl(
        null,
        [Validators.required, Validators.minLength(2)]),
      amount: new FormControl(
        0,
        [Validators.required, Validators.min(1)]),
    });
  }

  completeForm({ name, amount }): void {
    this.shoppingListForm.setValue({
      name,
      amount
    });
  }

  onSubmit(): void {
    if (this.shoppingListForm.valid) {

      const { name, amount } = this.shoppingListForm.value;
      this.ingredient = new Ingredient(name, amount);

      if (this.editMode) {
        this.slService.updateIngredient(this.editingIndex, this.ingredient);
        this.editMode = false;
      } else {
        this.slService.addIngredient(this.ingredient);
      }

      this.shoppingListForm.reset({
        amount: 0
      });
    }
  }

  onClear(): void {
    this.shoppingListForm.reset({
      amount: 0
    });
    this.editMode = false;
  }

  onDelete(): void {
    this.slService.removeIngredient(this.editingIndex);
    this.onClear();
  }

}
