import {NgModule} from '@angular/core';
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ShoppingRoutingModule} from "./shopping-routing.module";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ShoppingRoutingModule,
  ],
  exports: [
  ]
})
export class ShoppingModule {
}
