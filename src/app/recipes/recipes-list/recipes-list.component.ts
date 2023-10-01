import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipesService} from "../recipes.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {
  private _recipes: Recipe[];
  recipeSub: Subscription;

  get recipes(): Recipe[] {
    return this._recipes;
  }

  constructor(public recSrv: RecipesService) {
  }

  ngOnInit() {
    this.recipeSub = this.recSrv.recipeChanged.subscribe(
      (recipes: Recipe[]) => {
        this._recipes = recipes;
      }
    );
    this._recipes = this.recSrv.recipes;
  }

  ngOnDestroy(): void {
    this.recipeSub.unsubscribe();
  }

}
