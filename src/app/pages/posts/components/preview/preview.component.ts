import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from '@angular/material/dialog';
import { PostDto } from '../../interfaces/post-dto';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css',
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class PreviewComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: PostDto) {

  }

  ngOnInit(): void {
    console.log("Data recibida");
    console.log(this.data);
  }



}
