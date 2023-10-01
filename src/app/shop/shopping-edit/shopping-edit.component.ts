import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;

  private sub: Subscription;
  editMode = false;
  editIdx: number;
  editItem: Ingredient;

  constructor(private shpSrv: ShoppingListService) {
  }

  ngOnInit(): void {
    this.sub = this.shpSrv.onEditItemStarted.subscribe(
      (idx) => {
        this.editIdx = idx;
        this.editItem = this.shpSrv.getIngredient(this.editIdx);
        this.editMode = true;
        this.loadEditedItem();
      }
    );
  }

  private loadEditedItem() {
    this.slForm.setValue({
      name: this.editItem.name,
      amount: this.editItem.amount,
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onAdd(iName: string, iAmount: number) {
    this.shpSrv.addIngredient(new Ingredient(iName, iAmount));
  }

  private onEdit(idx: number, iName: string, iAmount: number) {
    this.shpSrv.updateIngredient(idx, iName, iAmount);
  }

  onClear() {
    this.editIdx = undefined;
    this.editMode = false;
    this.editItem = undefined;
    this.slForm.reset();
  }

  onDelete() {
    this.shpSrv.deleteIngredient(this.editIdx);
    this.onClear();
  }

  onSubmit(form: NgForm) {
    const vl = form.value;
    if (this.editMode) {
      this.onEdit(this.editIdx, vl.name, Number.parseInt(vl.amount));
    } else {
      this.onAdd(vl.name, Number.parseInt(vl.amount));
    }
    this.onClear();
  }
}
