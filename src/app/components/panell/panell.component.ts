import { Component, EventEmitter, Input, OnInit,Output,TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Field } from 'src/app/shared/interfaces/budget';
import { FormField } from 'src/app/shared/interfaces/form';
import { trigger, style, animate, transition } from '@angular/animations';
import { allExtrasHaveValue } from 'src/app/shared/validations/budget';

@Component({
  selector: 'app-panell',
  templateUrl: './panell.component.html',
  styleUrls: ['./panell.component.scss'],
  animations: [
    trigger(
      'formAnimation', 
      [
        transition(
          ':enter', 
          [
            style({ scale: '0 0' }),
            animate('0.5s ease-out', 
                    style({ scale: '1 1' }))
          ]
        ),
        transition(
          ':leave', 
          [
            style({ scale: '1 1' }),
            animate('0.5s ease-in', 
                    style({ scale: '0 0' }))
          ]
        )
      ]
    )
  ]
})

export class PanellComponent {

  @Input() value!:Field[]
  @Output() valueChange  = new EventEmitter<any>();

  formFields!:FormField[];

  modalRef?: BsModalRef;
  modalText="";

  touched = false

  get allHasvalue(){

    return allExtrasHaveValue(this.value||[])
  }

  constructor(private modalService: BsModalService) { }

  update(index:number, add:boolean){

    let fields = [...this.value||[]], field = fields[index], value = field.quantity;    

    field.quantity = value + (Number(add) ||  ( !value ? 0: -1 ));

    this.touched = true;
  
    this.valueChange.emit(fields);
  }

  createFormGroupFields(fields:Field[]){

    return fields.map(field=>{

      return{

          name:'quantity',
          label:field.title,
          value:field.quantity,
          required:true,
          type:'number',
          columns:6           
      };
  });
}

  openModal(extra:Field, template:TemplateRef<HTMLElement>){

    this.modalText = {

      idiomas:'En este campo deberá indicar el numero de idiomas',
      paginas:'En este campo deberá indicar el numero de páginas'

    }[extra.name as 'idiomas'|'paginas' ];

    this.modalRef = this.modalService.show(template);
  }



}
