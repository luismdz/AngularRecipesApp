import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-recipe-selected',
  template: `
  <div class="container">
    <h4 class="display-4">
      Please select a recipe from the list.
    </h4>
  </div>
  `,
  styles: [`
    .container {
      height: 100%;
    }

    h4.display-4 {
      font-size: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  `
  ]
})
export class NoRecipeSelectedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
