import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {RecipesService} from "../recipes/recipes.service";
import {Recipe} from "../recipes/recipe.model";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  url = 'https://ng-complete-cook-and-book-default-rtdb.europe-west1.firebasedatabase.app';
  recUrl = this.url + '/recipes.json';

  constructor(
    private http: HttpClient,
    private recSrv: RecipesService,
    private authSrv: AuthService,
  ) {
  }

  storeRecipes() {
    const recipes = this.recSrv.recipes;
    this.http.put(this.recUrl, recipes).subscribe(resp => {
      console.log(resp);
    });
  }

  fetchRecipes() {
    // take operator required to not do a long subscription but to take only 1 value and immediately unsubscribe
    // this.authSrv.user.pipe(take(1)).subscribe(user => {
    // });

    // manually add auth token (without interceptors)
    // return this.authSrv.user.pipe(
    //   // take 1 user and unsubscribe from authSrv.user
    //   take(1),
    //   // replace the user observable with the http.get observable
    //   exhaustMap(user => {
    //     return this.http.get<Recipe[]>(
    //       this.recUrl,
    //       {
    //         params: new HttpParams().set('auth', user.token),
    //       }
    //     );
    //   }),
    //   // convert http response to Recipe[] array
    //   map(recipes => {
    //     return recipes.map(recipe => {
    //       return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
    //     });
    //   }),
    //   // do action on recipes array
    //   tap(recipes => {
    //       this.recSrv.setRecipes(recipes);
    //     }
    //   ),
    // );

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
