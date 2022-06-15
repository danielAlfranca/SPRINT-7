import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Field } from "../interfaces/budget";


export const allExtrasHaveValue: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {


    const fields = control.value, valid = fields.every((field:Field)=>{
  
            return !field.extras || !field.extras?.length || field.extras?.every(extra=>extra.quantity);
  
          });

    return  !valid ? { message: 'Algunos extras no tienen valor' } : null;
  
};
  
export const AtLeastOneService: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  
    const fields = control.value || [],
          valid = fields.some((field:Field)=>field.quantity);

    return  !valid ? { message: 'Falta por contratar al menos 1 servicio' } : null;
  
};

