import {Injectable, OnInit} from "@angular/core";
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

@Injectable({providedIn: "root"})
export class RecipesService implements OnInit {
  recipeChanged = new Subject<Recipe[]>();

  private recipesArr: Recipe[] = [
    // new Recipe("Salad",
    //   "Some vegan fast food",
    //   "https://static01.nyt.com/images/2023/06/15/multimedia/kc-grilled-tofu-salad-cphf-copy/kc-grilled-tofu-salad-cphf-jumbo.jpg",
    //   [new Ingredient('Canned Peacock', 1),
    //     new Ingredient('Tomatoes', 2),
    //     new Ingredient('Cabbage', 1),
    //     new Ingredient('Olive Oil', 1)
    //   ]
    // ),
    // new Recipe("Ratatouille",
    //   "As the title says",
    //   "https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg",
    //   [new Ingredient('Eggplant', 2),
    //     new Ingredient('Olive Oil', 1),
    //     new Ingredient('Tomatoes', 4)
    //   ]
    // ),
    // new Recipe("Pancakes",
    //   "Mega tasty pancakes",
    //   "https://www.inspiredtaste.net/wp-content/uploads/2016/07/Pancake-Recipe-1-1200.jpg",
    //   [new Ingredient('Flour', 2),
    //     new Ingredient('Eggs', 5),
    //     new Ingredient('Olive Oil', 2),
    //     new Ingredient('Jam', 1)
    //
    //   ]
    // )
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  get recipes(): Recipe[] {
    return this.recipesArr.slice();
  }

  getRecipe(id: number) {
    if( id !== undefined && id !== null ){
      return this.recipesArr[id];
    }
    return undefined;
  }

  addRecipe(recipe: Recipe){
    this.recipesArr.push(recipe);
    this.recipeChanged.next(this.recipes);
  }

  updateRecipe(index: number, recipe:Recipe){
    this.recipesArr[index] = recipe;
    this.recipeChanged.next(this.recipes);
  }

  deleteRecipe(index: number){
    this.recipesArr.splice(index, 1);
    this.recipeChanged.next(this.recipes);
  }

  setRecipes(recipes: Recipe[]){
    this.recipesArr = recipes.slice();
    this.recipeChanged.next(this.recipes);
  }

}
