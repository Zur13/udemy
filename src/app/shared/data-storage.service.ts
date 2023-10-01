import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RecipesService} from "../recipes/recipes.service";
import {Recipe} from "../recipes/recipe.model";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  url = 'https://ng-complete-cook-and-book-default-rtdb.europe-west1.firebasedatabase.app';
  recUrl = this.url + '/recipes.json';

  constructor(private http: HttpClient, private recSrv: RecipesService) {
  }

  storeRecipes() {
    const recipes = this.recSrv.recipes;
    this.http.put(this.recUrl, recipes).subscribe(resp => {
      console.log(resp);
    });
  }

  fetchRecipes() {
    const recipes = this.recSrv.recipes;
    return this.http.get<Recipe[]>(this.recUrl)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
        }),
        tap(recipes => {
            this.recSrv.setRecipes(recipes);
          }
        ),
      );
    // .subscribe(resp => {
    //   //console.log(resp);
    //   this.recSrv.setRecipes(resp);
    // });
  }

}
