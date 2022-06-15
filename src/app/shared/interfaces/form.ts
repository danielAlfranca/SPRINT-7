import { EventEmitter, TemplateRef } from "@angular/core";
import { AbstractControl, ValidationErrors } from "@angular/forms";

export type InputsTypes = 'text'|'number'|'radio'|'checkbox'|'select'|'hidden'|'custom';

export interface FormField {

  name:string; 
  label?:string;
  placeholder?:string;  
  value:any; 
  required:boolean;
  validations?:((control: AbstractControl) => ValidationErrors | null)[]
  type:InputsTypes;
  options?:{name:string, value:string, selected?:boolean}
  template?:TemplateRef<any>;
  columns?:number
  
}

export interface FormCreatorField{

  value:any;
  valueChange:EventEmitter<any>;
  update:Function;

}

export interface FormStatus{

  model:Status, 
  fields:{[key:string]:Status}
}

export interface Status{

  valid:boolean,
  touched:boolean,
  errors:string[]
}




