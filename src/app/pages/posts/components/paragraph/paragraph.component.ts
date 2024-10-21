import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ParagraphDto } from '../../interfaces/post-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrl: './paragraph.component.css'
})
export class ParagraphComponent implements OnInit {

  @Input() paragraph: ParagraphDto;
  @Input() index: number;
  @Output() listenerCambios = new EventEmitter<any>();

  createParagraphFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.enInicio();

    this.createParagraphFormGroup.get('createParagraphContent').valueChanges.subscribe(
      (valor: string) => {
        this.paragraph.content = valor;
      }
    )

  }

  enInicio(): void {

    this.createParagraphFormGroup = this._formBuilder.group({
      createParagraphContent: [this.paragraph.content, Validators.required],
    });


  }

  deleteParagraph(): void {
    Swal.fire({
      title: 'Eliminar parrafo',
      text: '¿Está seguro de eliminar el parrafo?',
      icon: "info",
      // showCancelButton: true,
      confirmButtonColor: "#009788",
      // cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.listenerCambios.emit({
          "index": this.index
        })
      }
    });



  }

  verParrafo(): void {
    console.log(this.paragraph.content);
    console.log(this.createParagraphFormGroup.get('createParagraphContent').value);
  }

}
