import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../shop/shopping-list.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipesService} from "../recipes.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: Recipe;
  recipe: Recipe;
  id: number;
  isManageShown: boolean = false;


  constructor(private shpSrv: ShoppingListService, private recipesSrv: RecipesService,
              private route: ActivatedRoute, private router: Router
  ) {
  }

  ngOnInit(): void {
    // console.log(this.route.snapshot.params);
    this.loadRecipe(this.route.snapshot.params['id']);

    this.route.params.subscribe((params: Params) => this.loadRecipe(params['id']));
  }

  private loadRecipe(id: number) {
    this.id = id;
    this.recipe = this.recipesSrv.recipes[this.id];
  }

  toShoppingList() {
    // for (let ing of this.recipe.ingredients) {
    //   this.shpSrv.addIngredient(ing);
    // }
    this.shpSrv.addIngredients(this.recipe.ingredients);
  }

  deleteRecipe() {
    this.recipesSrv.deleteRecipe(this.id);
    this.router.navigate(['..'], {relativeTo: this.route});
  }
}
