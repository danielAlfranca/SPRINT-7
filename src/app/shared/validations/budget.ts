import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { Field } from "../interfaces/budget";



export const AtLeastOneService: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  
    const fields = control.value || [],
          valid = fields.some((field:Field)=>field.quantity);

    return  !valid ? { message: 'Falta por contratar al menos 1 servicio' } : null;
  
};

export const allExtrasHaveValue: Function = (extras: Field[]): boolean => {


    return extras.every((field:Field)=>field.quantity);
      
};
  