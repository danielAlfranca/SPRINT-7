import { Injectable } from '@angular/core';
import { Budget, defaultDataBudget, Field} from '../shared/interfaces/budget';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BudgetService {

  private budgets:Budget[] = [];

  private _budgetUpdates = new Subject<Budget>();
  private _budgetListUpdates = new Subject<{budget:Budget, urlParam:string}[]>();

  public get budgetUpdates(){

    return this._budgetUpdates as Observable<Budget>;
  }

  public get budgetListUpdates(){

    return this._budgetListUpdates as Observable<{budget:Budget, urlParam:string}[]>
  }
  
  constructor(private activatedRoute:ActivatedRoute,private router:Router) { 

    this.activatedRoute.queryParamMap.subscribe(params => {

      const budgetURL = params.get('budget');  

      if(budgetURL){

        const budget = JSON.parse(decodeURIComponent(budgetURL));
        this._budgetUpdates.next(budget);
      }      

    });    
  }

public getBudget(refresh?:true){ 
  
  const currentBudget = this.activatedRoute.snapshot.queryParamMap.get('budget'),
        budget = currentBudget && !refresh ? this.getBudgetFromURL(currentBudget):{...defaultDataBudget};
    
  this.setURLFromBudget(budget);

  this._budgetListUpdates.next(this.getBudgets()); // PARA RESET

  return budget
}

// MANEJO URL - BUDGET 

public setURLFromBudget(budget:Budget){

  this.router.navigate(['home'],{queryParams: {}});

  setTimeout(()=>{ // TRIGGER UPDATE activatedRoute.queryParamMap YA QUE SOLO HAY 1 PARAMETRO

    this.router.navigate(
      ['home'], 
      {
        queryParams: { budget: this.encodeBudgetURLParameter(budget)}
      });
  })  
}

private getBudgetFromURL(url:string):Budget{

  return JSON.parse(decodeURIComponent(url));
}

private encodeBudgetURLParameter(budget:Budget){

  return encodeURIComponent(JSON.stringify(budget))
}

public getBudgets(){   return [...this.budgets].map(budget=>({

  budget:budget,
  urlParam:this.encodeBudgetURLParameter(budget)

}))  }

public saveBudget(budget:Budget){

  if(!budget.id) budget.id = this.budgets.length + 1 ;

  this.budgets[Number(budget.id)-1] = budget

  this.setURLFromBudget({...defaultDataBudget});

  this._budgetListUpdates.next(this.getBudgets());

}

// CALCULAR PRECIO PRESUPUESTO

public totalBudgetPrice(budget:Budget){

  return budget.fields.reduce((sum,field:Field)=>sum+this.totalFieldPrice(field),0);
}

public totalFieldPrice(field:Field):number{

  const price = field.unit_price * field.quantity;

  return !price ? price : price + this.totalExtrasPrice(field.extras);
}

private totalExtrasPrice(fields?:Field[]):number{      

  return (fields || []).reduce((sum,extra:Field)=> sum + this.totalFieldPrice(extra) ,0);
}
  
}
