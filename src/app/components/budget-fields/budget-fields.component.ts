import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Field } from 'src/app/shared/interfaces/budget';
import { FormCreatorField } from 'src/app/shared/interfaces/form';

@Component({
  selector: 'app-budget-fields',
  templateUrl: './budget-fields.component.html',
  styleUrls: ['./budget-fields.component.scss']
})
export class BudgetFieldsComponent implements FormCreatorField {

  @Input() value!:Field[]
  @Output() valueChange  = new EventEmitter<Field[]>();

  constructor() { }

  update(newValue:any, index:number){

    let field = this.value[index];

    field.quantity = newValue;

    this.valueChange.emit(this.value);
  }

}
