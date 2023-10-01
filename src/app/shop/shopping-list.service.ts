import {EventEmitter, Injectable, Output} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

@Injectable({providedIn: "root"})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  onEditItemStarted = new Subject<number>();

  private ingredientsArr: Ingredient[] = [
    new Ingredient('Apples', 8),
    new Ingredient('Sausages', 12),
    new Ingredient('Chocolate Bar', 2),
  ];

  get ingredients(): Ingredient[] {
    // console.log("Ingredients requested");
    return this.ingredientsArr.slice();
  }

  addIngredient(ing: Ingredient) {
    this.ingredientsArr.push(ing);
    this.ingredientsChanged.next(this.ingredients);
  }

  addIngredients(ings: Ingredient[]) {
    this.ingredientsArr.push(...ings);
    this.ingredientsChanged.next(this.ingredients);
  }

  updateIngredient(idx: number, name, amount: number) {
    let ing = this.ingredientsArr[idx];
    ing.name = name;
    ing.amount = amount;
    this.ingredientsChanged.next(this.ingredients);
  }

  getIngredient(idx: number) {
    return this.ingredientsArr[idx];
  }

  deleteIngredient(idx: number) {
    this.ingredientsArr.splice(idx, 1);
    this.ingredientsChanged.next(this.ingredients);
  }
}
