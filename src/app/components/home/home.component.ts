import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BudgetService } from 'src/app/services/budget.service';
import { Budget, defaultDataBudget, Field } from 'src/app/shared/interfaces/budget';
import { FormField} from 'src/app/shared/interfaces/form';
import {AtLeastOneService } from 'src/app/shared/validations/budget';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  public budget!:Budget ;
  public formFields?:FormField[];

  @ViewChild('budgetFieldsTemplate', {static:true}) budgetFieldsTemplate!:TemplateRef<any>;

  constructor(private budgetService:BudgetService) { 

    this.budgetService.budgetUpdates.subscribe(budget => { 
      
      this.budget = budget;

      if(!this.formFields) this.formFields = this.createFormFields(this.budget) as FormField[];    
    
    }) 
  }

  ngOnInit() : void { this.budgetService.getBudget(); }

  createFormFields(budget:Budget){

    return [
      
      {
        name:'id',
        value:budget.id, 
        required:true,
        type:'hidden'
      },
      {
        name:'name',
        label:'Nombre del Presupuesto',
        value:budget.name,
        required:true,
        type:'text',
        error: 'El presupuesto debe tener un nombre'
      },
      {
        name:'client',
        label:'Cliente',
        value:budget.client,
        required:true,
        type:'text',
        error: 'El presupuesto debe tener un cliente asociado' 
      },
      {
        name:'currency',
        value:budget.currency, 
        required:true,
        type:'hidden' 
      },
       {
        name:'fields',
        value:budget.fields,
        required:true,
        type:'custom',
        validations:[ AtLeastOneService],
        template:this.budgetFieldsTemplate,
      }, 
    ]
  }

updateURLParameters(budget:Budget){  this.budgetService.setURLFromBudget(budget) }

public saveBudget(){ 
  
  this.formFields = undefined;
  setTimeout(()=>this.budgetService.saveBudget(this.budget),1000) 
  
} 

public selectBudget(budget:Budget){

  this.formFields = this.createFormFields(budget) as FormField[];
  this.updateURLParameters(budget);

}

reset(){

  this.formFields = this.createFormFields(this.budgetService.getBudget(true)) as FormField[];

}


}
