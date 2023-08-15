import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesContainerComponent } from './recipes-container.component';

describe('RecipesContainerComponent', () => {
  let component: RecipesContainerComponent;
  let fixture: ComponentFixture<RecipesContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipesContainerComponent]
    });
    fixture = TestBed.createComponent(RecipesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
