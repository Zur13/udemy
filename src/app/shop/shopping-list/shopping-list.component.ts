import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private sub: Subscription;

  constructor(private shpSrv: ShoppingListService) {
  }

  ngOnInit(): void {
    this.ingredients = this.shpSrv.ingredients;
    this.sub =this.shpSrv.ingredientsChanged.subscribe((ings => {
      this.ingredients = ings;
      console.log('Ings updated')
    }));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onEditItem(idx: number) {
    this.shpSrv.onEditItemStarted.next(idx);
  }
}
