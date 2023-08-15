import {Component} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
  get ingredients(): Ingredient[] {
    return this.shpSrv.ingredients;
  }

  constructor(private shpSrv: ShoppingListService) {
  }
}
