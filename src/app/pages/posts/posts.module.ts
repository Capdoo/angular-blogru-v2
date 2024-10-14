import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { ManageComponent } from './manage/manage.component';
import { RedactComponent } from './redact/redact.component';

@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }
