import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  itemsInShoppingList: number;

  constructor(
    private slService: ShoppingListService
  ) { }


  ngOnInit(): void {

    // Get total of amounts of all ingredients in shopping list
    this.itemsInShoppingList = this.slService.getTotalAmount();

    // Refresh total amount
    this.slService.totalAmount
      .subscribe((total: number) => this.itemsInShoppingList = total);

  }

}
