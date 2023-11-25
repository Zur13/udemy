import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import * as events from "events";
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
  // styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isMainCollapsed = false;
  isManageShown = false;
  private authSub;
  isAuthenticated = false;

  constructor(
    private datStore: DataStorageService,
    private authSrv: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.authSub = this.authSrv.user.subscribe(user => {
        this.isAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  onSaveData() {
    this.datStore.storeRecipes();
  }

  onFetchData() {
    this.datStore.fetchRecipes().subscribe();
  }

  onLogout() {
     this.authSrv.logout();
  }
}
