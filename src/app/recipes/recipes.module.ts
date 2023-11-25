import {NgModule} from '@angular/core';
import {RecipesContainerComponent} from "./recipes-container/recipes-container.component";
import {RecipesListComponent} from "./recipes-list/recipes-list.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeItemComponent} from "./recipes-list/recipe-item/recipe-item.component";
import {RecipeEmptyComponent} from "./recipe-empty/recipe-empty.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RecipesRoutingModule} from "./recipes-routing.module";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    RecipesContainerComponent,
    RecipesListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeEmptyComponent,
    RecipeEditComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RecipesRoutingModule,
  ],
  exports: [
  ]
})
export class RecipesModule {
}
