import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { BudgetService } from 'src/app/services/budget.service';
import { Budget } from 'src/app/shared/interfaces/budget';

@Component({
  selector: 'app-budgets-list',
  templateUrl: './budgets-list.component.html',
  styleUrls: ['./budgets-list.component.scss']
})

export class BudgetsListComponent implements OnInit, OnDestroy {

  @Output() onSelected = new EventEmitter<Budget>();

  public budgets!:{budget:Budget, urlParam:string , selected?:boolean}[];
  public selected!:number;

  private subscription:Subscription;
  constructor(private budgetService:BudgetService) {
  
    this.subscription = this.budgetService.budgetListUpdates.subscribe(budgets=> {
      this.budgets = budgets; 
      this.selected = this.budgets.length // indice uno mas que el ultimo para deseleccionar todos
    })
  }

  ngOnInit(): void { this.budgets = this.budgetService.getBudgets(); }

  select(budget:Budget, index:number){

    this.selected = index;
    this.onSelected.emit(budget);
  }

  ngOnDestroy(): void {
    
    this.subscription.unsubscribe();
  }

}
