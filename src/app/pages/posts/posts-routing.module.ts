import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewPostComponent } from './new-post/new-post.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { MaterialModule } from '../../shared/material.module';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpperTextOnlyDirective } from '../../shared/directives/upper-text-only.directive';
import { TextOnlyDirective } from '../../shared/directives/text-only.directive';
import { NumbersOnlyDirective } from '../../shared/directives/numbers-only.directive';
import { SectionComponent } from './components/section/section.component';
import { SectionV2Component } from './components/section-v2/section-v2.component';
import { ParagraphComponent } from './components/paragraph/paragraph.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { RedactComponent } from './redact/redact.component';

const routes: Routes = [
  {
    path: 'new-post',
    component: NewPostComponent
  },
  {
    path: 'my-posts',
    component: MyPostsComponent,
  },
  {
    path: 'edit-post',
    component: EditPostComponent,
  },
  {
    path: 'redact',
    component: RedactComponent,
  },
  {
    path: '**',
    redirectTo: 'my-posts'
  }
];

@NgModule({
  declarations: [
    NewPostComponent,
    MyPostsComponent,
    EditPostComponent,
    RedactComponent,
    SectionComponent,
    ParagraphComponent,
    SectionV2Component,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    RouterModule.forChild(routes),
    TextFieldModule,
    FormsModule,
    ReactiveFormsModule,
    UpperTextOnlyDirective,
    TextOnlyDirective,
    NumbersOnlyDirective
  ],
  exports: [RouterModule],
  providers: []
})
export class PostsRoutingModule { }
