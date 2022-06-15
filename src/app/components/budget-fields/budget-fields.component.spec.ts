import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetFieldsComponent } from './budget-fields.component';

describe('BudgetFieldsComponent', () => {
  let component: BudgetFieldsComponent;
  let fixture: ComponentFixture<BudgetFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
