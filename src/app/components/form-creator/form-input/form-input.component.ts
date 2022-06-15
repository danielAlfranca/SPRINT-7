import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormField, Status } from 'src/app/shared/interfaces/form';

// IDEA TOMADA DE AQUI https://blog.angular-university.io/angular-custom-form-controls/

@Component({
  selector: '[app-form-input]',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, // Añade el componente a la lista de value accesors conocidos para que pueda ser utilizado por la api
      multi:true, // NG_VALUE_ACCESSOR provee varios valores no solo 1
      useExisting: FormInputComponent
    }
  ]
})
export class FormInputComponent implements OnInit, AfterViewInit, ControlValueAccessor {  

  @Input() config!:FormField;
  @Input() status!:Status;

  // INPUT PROPERTIES 
  
  value!:any;
  placeholder!:string;

  // TEMPLATE SEGUN INPUT TYPE

  selectedInputTemplate!:TemplateRef<any> | false;

  // INPUTS TEMPLATES 

  @ViewChild('textNumber')    textNumberI!:TemplateRef<HTMLElement>;
  @ViewChild('checkbox')      checkBoxI!:TemplateRef<HTMLElement>;
  @ViewChild('hidden')        hiddenI!:TemplateRef<HTMLElement>;

  // METODOS CONTROLVALUE ACCESOR

  onChange = (value:any)=>{} // PARA EVITAR ERROR SI ES LLAMADO ANTES DE LA ASSIGNACION AL CALLBACK DE CONTROL VALUE ACCESOR
  onTouched =() => {} // LO MISMO

  touched = false;

  constructor() { }

  ngOnInit(): void {

    this.placeholder = this.config.placeholder || '';
    this.value = this.config.value || '';

  }

  ngAfterViewInit(): void {
    
    setTimeout(()=>this.selectedInputTemplate = this.getInputTemplate(this.config.type));
  }

  getInputTemplate(type:string){

    switch (type) {

      case 'text': 
      case 'number': return this.textNumberI;
      case 'checkbox': return this.checkBoxI;    
      case 'hidden': return this.hiddenI;       
    
      default: return this.config.template || false
   
    }
  }

  changeValue(value:any){ // ACTUALIZA VALOR Y LLAMA AL METODO DE NOTIFICACION DE LA API ONCHANGE 

    switch(this.config.type){

      case 'text': 
      case 'number': {    this.value = value.target.value; break }
      case 'checkbox': {  this.value = value.target.checked; break }
      default:{

        this.value = value;
      }
    }   

    this.setAsTouched();
    this.onChange(this.value);    
  }

  setAsTouched(){

    if (!this.touched) {

      this.onTouched();
      this.touched = true;

    }

  }

  // VALUE ACCESORS METODOS

  writeValue(value: any): void { // CUANDO EL FORMULARIO PADRE QUIERE ASIGNAR UN VALOR LA API UTILIZA ESTE METODO

    this.value = value;
    
  }

  registerOnChange(fn: any): void { // COORDINA EL METODO DE ACTUALIZACION DE VALOR CON EL DE LA API
    
    this.onChange = fn;

  }

  registerOnTouched(fn: any): void { // COORDINA EL METODO DE REGISTRO DE SI EL INPUT HA SIDO USADO CON EL DE LA API
    
    this.onTouched = fn;
  }

}
