import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RecipesContainerComponent} from "./recipes-container/recipes-container.component";
import {AuthGuard} from "../auth/auth.guard";
import {RecipeEmptyComponent} from "./recipe-empty/recipe-empty.component";
import {RecipesResolverService} from "./recipes-resolver.service";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";

const routes: Routes = [
  {
    path: '',
    component: RecipesContainerComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: RecipeEmptyComponent, pathMatch: 'full', resolve: [RecipesResolverService]},
      {path: 'new', component: RecipeEditComponent, resolve: [RecipesResolverService]},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
    ]
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutingModule {
}
