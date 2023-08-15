import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cook_and_book';
  static readonly RECIPE_PAGE: string = 'recipes';
  static readonly SHOPPING_PAGE: string = 'shopping';
  page: string = AppComponent.RECIPE_PAGE;

  switchPage(newPage: string) {
    this.page = newPage;
  }

  isRecipesPage(): boolean {
    return this.page === AppComponent.RECIPE_PAGE;
  }

  isShoppingListPage(): boolean {
    return this.page === AppComponent.SHOPPING_PAGE;
  }

  switchToRecipesPage() {
    this.switchPage(AppComponent.RECIPE_PAGE);
  }

  switchToShoppingListPage() {
    this.switchPage(AppComponent.SHOPPING_PAGE);
  }

  onNavigationEvent(event: string) {
    //console.log(event);
    if (event === 'recipes') {
      this.switchToRecipesPage();
    } else {
      this.switchToShoppingListPage();
    }
  }
}
