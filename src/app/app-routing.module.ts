import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ShoppingListComponent} from "./shop/shopping-list/shopping-list.component";
import {RecipesContainerComponent} from "./recipes/recipes-container/recipes-container.component";
import {RecipeEmptyComponent} from "./recipes/recipe-empty/recipe-empty.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {RecipesResolverService} from "./recipes/recipes-resolver.service";

const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {path: 'recipes', component: RecipesContainerComponent,
  children: [
    {path: '', component: RecipeEmptyComponent, pathMatch: 'full', resolve:[RecipesResolverService]},
    {path: 'new', component: RecipeEditComponent, resolve:[RecipesResolverService]},
    {path: ':id', component: RecipeDetailComponent, resolve:[RecipesResolverService]},
    {path: ':id/edit', component: RecipeEditComponent, resolve:[RecipesResolverService]},
  ]},
  {path: 'shopping', component: ShoppingListComponent},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
