import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Budget } from 'src/app/shared/interfaces/budget';

@Component({
  selector: 'app-panel-filter',
  templateUrl: './panel-filter.component.html',
  styleUrls: ['./panel-filter.component.scss']
})
export class PanelFilterComponent {

  @Input()   budgets!:{budget:Budget, urlParam:string , selected?:boolean}[];
  @Output()  budgetsChange = new EventEmitter<{budget:Budget, urlParam:string , selected?:boolean}[]>();
 
  sortType = ''


  get list(){

      const budgets = (this.budgets || []).map(e=>e.budget)

      if(this.sortType=='alfabeticamente') return budgets.sort(this.albabeticamente)

      if(this.sortType=='porFecha') return budgets.sort(this.porFecha)

      return budgets
  }

  constructor() { }

  public change(type:string){

    this.sortType = type;


    if(this.sortType=='alfabeticamente') this.budgets.sort(this.albabeticamente)

    if(this.sortType=='porFecha') this.budgets.sort(this.porFecha)

    this.budgetsChange.emit(this.budgets)

  }

  private albabeticamente(a:any,b:any){

    return a.budget.name > b.budget.name ? 1:0
  }

  private porFecha(a:any,b:any){

    return (a.budget.date || 0) - (b.budget.date || 0)
  }

}
