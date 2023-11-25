import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AlertComponent} from "./alert/alert/alert.component";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner/loading-spinner.component";
import {DropdownDirective} from "./dropdown.directive";


@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    AlertComponent,
    LoadingSpinnerComponent,
    DropdownDirective,
  ]
})
export class SharedModule {
}
