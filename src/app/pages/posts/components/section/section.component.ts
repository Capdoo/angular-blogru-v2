import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ParagraphDto, SectionDto } from '../../interfaces/post-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilToolsService } from '../../../../shared/services/util-tools.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent implements OnInit {

  @Input() section: SectionDto;
  @Input() index: number;
  @Output() listenerCambios = new EventEmitter<any>();

  // listParagraphs: ParagraphDto[] = [];
  subtitle: string;

  createSectionFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private utilToolsService: UtilToolsService
  ) {

  }

  ngOnInit(): void {
    console.log("Nace la seccion -->")
    console.log(this.section.id)
    console.log(this.section)


    this.enInicio();
    // this.listParagraphs = this.section.listParagraphsDto;
    if (this.section.listParagraphsDto == null || this.section.listParagraphsDto == undefined) {
      this.section.listParagraphsDto = [];
    }

    this.createSectionFormGroup.get('createSectionSubtitle').valueChanges.subscribe(
      (valor: string) => {
        this.section.title = valor;
      }
    );
  }

  enInicio(): void {

    this.createSectionFormGroup = this._formBuilder.group({
      createSectionSubtitle: [this.section.title, Validators.required],
      createSectionParagraphs: [this.section.listParagraphsDto,],

    });
  }

  addParagraph(): void {
    let paragraph: ParagraphDto = {} as ParagraphDto;
    this.section.listParagraphsDto.push(paragraph);
  }


  verSeccion(): void {
    console.log(this.section.title)
    console.log(this.createSectionFormGroup.get('createSectionSubtitle').value);

    console.log(this.section.listParagraphsDto)
    console.log(this.createSectionFormGroup.get('createSectionParagraphs').value);

  }

  eliminarParrafo(event: any): void {
    this.section.listParagraphsDto.splice(event.index, 1);
  }

  deleteSection(event: any): void {

    Swal.fire({
      title: 'Eliminar sección',
      text: '¿Está seguro de eliminar la sección?',
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



}
