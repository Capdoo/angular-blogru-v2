import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { MenuManageComponent } from './menu-manage/menu-manage.component';
import { MaterialModule } from '../shared/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FooterComponent,
    MenuComponent,
    MenuManageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    MenuComponent,
    MenuManageComponent,
    FooterComponent
  ]
})
export class CoreModule { }
