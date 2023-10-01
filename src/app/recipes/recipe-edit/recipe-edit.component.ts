import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipesService} from "../recipes.service";
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private recSrv: RecipesService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.editMode = params['id'] != null;
      this.id = this.editMode ? +params['id'] : undefined;
      this.initForm();
    })
  }

  private initForm() {
    let recipeName = '';
    let recImg = '';
    let recDesc = '';
    let recIngr = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recSrv.getRecipe(this.id);
      recipeName = recipe.name;
      recImg = recipe.imagePath;
      recDesc = recipe.description;
      if (recipe['ingredients']) {
        for (let ing of recipe.ingredients) {
          recIngr.push(
            new FormGroup({
              'name': new FormControl(ing.name, Validators.required),
              'amount': new FormControl(ing.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup<any>({
      'name': new FormControl(recipeName, Validators.required),
      'desc': new FormControl(recDesc, Validators.required),
      'imagePath': new FormControl(recImg, Validators.required),
      'ingredients': recIngr,

    });
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    console.log(this.recipeForm);
    const recipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['desc'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients'],
    );
    if (this.editMode) {
      this.recSrv.updateRecipe(this.id, recipe);
    } else {
      this.recSrv.addRecipe(recipe);
    }
    this.router.navigate([".."], {relativeTo: this.route});
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup(
      {
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      }
    ));
  }

  onDeleteIngredient(idx: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(idx);
  }
}
