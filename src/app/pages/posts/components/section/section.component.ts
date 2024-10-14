import { Component, Input, OnInit } from '@angular/core';
import { ParagraphDto, SectionDto } from '../../interfaces/post-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent implements OnInit{
  
  @Input() section: SectionDto;

  
  // listParagraphs: ParagraphDto[] = [];
  subtitle: string;

  createSectionFormGroup!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {

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
      createSectionParagraphs: [this.section.listParagraphsDto, ],

    });
  }

  addParagraph(): void {
    let paragraph:ParagraphDto = {} as ParagraphDto;
    this.section.listParagraphsDto.push(paragraph);
  }


  verSeccion(): void {
    console.log(this.section.title)
    console.log(this.createSectionFormGroup.get('createSectionSubtitle').value);

    console.log(this.section.listParagraphsDto)
    console.log(this.createSectionFormGroup.get('createSectionParagraphs').value);

  }


}
