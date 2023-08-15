import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as events from "events";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
  // styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMainCollapsed = false;
  isManageShown = false;

  @Output() navigationEvent = new EventEmitter<string>();
  @Input() selectedItem;

  onRecipesClicked() {
    this.navigationEvent.emit('recipes');
  }

  onShoppingClicked() {
    this.navigationEvent.emit('shopping');
  }

  getStyleRecipe() {
    if (this.selectedItem === 'recipes') {
      return {'text-decoration': 'underline'};
    }
    return undefined;
  }

  getStyleShopping() {
    if (this.selectedItem === 'shopping') {
      return {'text-decoration': 'underline'};
    }
    return undefined;
  }
}
