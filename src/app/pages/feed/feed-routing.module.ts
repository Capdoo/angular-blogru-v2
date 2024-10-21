import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { TopicsComponent } from './components/topics/topics.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ReadComponent } from './components/read/read.component';
import { MaterialModule } from '../../shared/material.module';

const routes: Routes = [
  {
    path: '',
    component: FeedComponent,
  },
  {
    path: ':id',
    component: ReadComponent,
  },
  {
    path: 'topics',
    component: TopicsComponent,
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
    TopicsComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,

  ],
  exports: [
    RouterModule
  ]
})
export class FeedRoutingModule { }
