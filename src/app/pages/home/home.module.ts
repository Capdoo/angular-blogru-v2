import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ModulesComponent } from './components/modules/modules.component';
import { ListTopicsComponent } from './components/list-topics/list-topics.component';



@NgModule({
  declarations: [
    HomeComponent,
    ModulesComponent,
    ListTopicsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
  ]
})
export class HomeModule { }
