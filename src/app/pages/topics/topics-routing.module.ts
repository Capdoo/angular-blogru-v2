import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TopicsComponent } from './topics/topics.component';
import { MaterialModule } from '../../shared/material.module';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  {
    path: '',
    component: TopicsComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [
    TopicsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    NgxSpinnerModule
  ],
  exports: [
    RouterModule
  ]
})
export class TopicsRoutingModule { }
