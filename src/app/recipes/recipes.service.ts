import {EventEmitter, Injectable, OnInit, Output} from "@angular/core";
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";

@Injectable({providedIn: "root"})
export class RecipesService implements OnInit {
  private recipesArr: Recipe[] = [
    new Recipe("Salad",
      "Some vegan fast food",
      "https://static01.nyt.com/images/2023/06/15/multimedia/kc-grilled-tofu-salad-cphf-copy/kc-grilled-tofu-salad-cphf-jumbo.jpg",
      [new Ingredient('Canned Peacock', 1),
        new Ingredient('Tomatoes', 2),
        new Ingredient('Cabbage', 1),
        new Ingredient('Olive Oil', 1)
      ]
    ),
    new Recipe("Ratatouille",
      "As the title says",
      "https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg",
      [new Ingredient('Eggplant', 2),
        new Ingredient('Olive Oil', 1),
        new Ingredient('Tomatoes', 4)
      ]
    ),
    new Recipe("Pancakes",
      "Mega tasty pancakes",
      "https://www.inspiredtaste.net/wp-content/uploads/2016/07/Pancake-Recipe-1-1200.jpg",
      [new Ingredient('Flour', 2),
        new Ingredient('Eggs', 5),
        new Ingredient('Olive Oil', 2),
        new Ingredient('Jam', 1)

      ]
    )
  ];

  @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor() {
  }

  ngOnInit(): void {
  }

  get recipes(): Recipe[] {
    return this.recipesArr.slice();
  }
}
