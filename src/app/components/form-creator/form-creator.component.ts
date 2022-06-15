import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormField, FormStatus, Status } from 'src/app/shared/interfaces/form';

// IDEA TOMADA DE AQUI https://angular.io/guide/dynamic-form#create-a-form-object-model

@Component({
  selector: 'app-form-creator',
  templateUrl: './form-creator.component.html',
  styleUrls: ['./form-creator.component.scss']
})
export class FormCreatorComponent implements OnChanges, OnDestroy {

  @Input() formFields!:FormField[];
  @Input() globalValidators?:any; // PARA CROSS FIELD VALIDATIONS 
  @Output() formChange = new EventEmitter<{status:FormStatus, model:any}>();

  public model!:FormGroup;
  private subscription!:Subscription;

  public status!:FormStatus  // STATUS DEL FORM Y LOS CAMPOS A TRAVES DE GETTERS

  constructor(private fb:FormBuilder) { }

  ngOnChanges(): void  {

    if(this.subscription) this.subscription.unsubscribe();
    
    this.model = this.createFormModel(this.formFields);
    this.status = this.createFormStatus();
        
    this.subscription = this.model.valueChanges.subscribe(value=> {
      
      this.formChange.emit({status:this.status, model:value})

    });

  }

  private createFormModel(fields:FormField[]){ // CREA FORM GROUP

    let validators:any;

    const formBuilderFields = fields.reduce((obj,field:FormField)=>{

      validators = this.createFieldValidators(field);

      return {...obj, ...{[field.name]:[field.value, validators ]}}

    },{})

    return this.fb.group(formBuilderFields, {validators:this.globalValidators || []});
  }

  private createFieldValidators(field:FormField){ // CREA VALIDATORS

    let validators:any = null, required = field.required ? [Validators.required] :[];

    validators = field.required || field.validations ? [...required, ...(field.validations||[])]: null

    return validators
  }

  private createFormStatus(){ // CREA STATUS DEL FORM Y LOS CAMPOS A TRAVES DE GETTERS

    let field;

    return{

      model:this.getStatusObject(this.model),
      fields:this.formFields.reduce((object,item)=>{
        
        field = this.model.controls[item.name] as FormControl;

        return {...object, [item.name]:this.getStatusObject(field, item.name) }
      
      },{})
    }
  }

  private getStatusObject(obj:FormGroup|FormControl, name?:string){ // CREA LOS GETTERS DE CADA STATUS PARA FORM Y FIELDS

    return  { 
              
      get valid(){

        return obj.valid
      },

      get touched(){

        return obj.touched
      },

      get errors(){ 
        
        const   errors = {...(obj['errors'] || {})},
                required = errors['required'] ? ['el campo es obligatorio']:[],
                keys = Object.keys(errors).filter(key=>key!='required');

        return required.concat(keys.map(key=>errors[key]))

      }
    }
  }

  ngOnDestroy(): void { this.subscription.unsubscribe(); }
}
