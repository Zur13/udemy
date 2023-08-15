import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../shop/shopping-list.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  isManageShown: boolean = false;

  constructor(private shpSrv: ShoppingListService) {
  }

  ngOnInit(): void {
  }


  toShoppingList() {
    // for (let ing of this.recipe.ingredients) {
    //   this.shpSrv.addIngredient(ing);
    // }
    this.shpSrv.addIngredients(this.recipe.ingredients);
  }
}
