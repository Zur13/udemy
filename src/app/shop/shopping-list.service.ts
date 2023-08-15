import {EventEmitter, Injectable, Output} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";

@Injectable({providedIn: "root"})
export class ShoppingListService {

  private ingredientsArr: Ingredient[] = [
    new Ingredient('Apples', 8),
    new Ingredient('Chocolate Bar', 2),
  ];

  get ingredients(): Ingredient[] {
    return this.ingredientsArr.slice();
  }

  addIngredient(ing: Ingredient) {
    this.ingredientsArr.push(ing);
  }

  addIngredients(ings: Ingredient[]) {
    this.ingredientsArr.push(...ings);
  }
}
