import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ReadComponent } from './components/read/read.component';
import { MaterialModule } from '../../shared/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: FeedComponent,
  },
  {
    path: 'post/:id',
    component: ReadComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [
    FeedComponent,
    ReadComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  exports: [
    RouterModule
  ]
})
export class FeedRoutingModule { }
