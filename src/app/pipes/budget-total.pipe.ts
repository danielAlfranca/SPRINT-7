import { Pipe, PipeTransform } from '@angular/core';
import { BudgetService } from '../services/budget.service';
import { Budget } from '../shared/interfaces/budget';

@Pipe({
  name: 'TOTAL_PRICE'
})
export class BudgetTotalPipe implements PipeTransform {

  constructor(private budgetService:BudgetService){}

  transform(value: Budget, ...args: unknown[]): unknown {

    return this.budgetService.totalBudgetPrice(value) +  ' ' + value.currency;
  }

}
