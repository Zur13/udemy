import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipesService} from "../recipes.service";

@Component({
  selector: 'app-recipes-container',
  templateUrl: './recipes-container.component.html',
  styleUrls: ['./recipes-container.component.css']
})
export class RecipesContainerComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recSrv: RecipesService) {
  }

  ngOnInit(): void {
    this.recSrv.recipeSelected.subscribe((recipe: Recipe) => {
      this.selectedRecipe = recipe;
    })
  }
}
