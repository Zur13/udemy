import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as events from "events";
import {DataStorageService} from "../shared/data-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
  // styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMainCollapsed = false;
  isManageShown = false;

  constructor(private datStore: DataStorageService) {
  }

  onSaveData() {
    this.datStore.storeRecipes();
  }

  onFetchData() {
    this.datStore.fetchRecipes().subscribe();
  }
}
