import { Component, Input, OnInit } from '@angular/core';
import { ParagraphDto } from '../../interfaces/post-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrl: './paragraph.component.css'
})
export class ParagraphComponent implements OnInit{

  @Input() paragraph: ParagraphDto;
  
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
    
  }

  verParrafo(): void {
    console.log(this.paragraph.content);
    console.log(this.createParagraphFormGroup.get('createParagraphContent').value);
  }

}