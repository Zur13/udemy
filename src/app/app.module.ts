import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {RecipesContainerComponent} from './recipes/recipes-container/recipes-container.component';
import {RecipesListComponent} from './recipes/recipes-list/recipes-list.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './recipes/recipes-list/recipe-item/recipe-item.component';
import {ShoppingListComponent} from './shop/shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './shop/shopping-edit/shopping-edit.component';
import {DropdownDirective} from "./shared/dropdown.directive";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesContainerComponent,
    RecipesListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    DropdownDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
