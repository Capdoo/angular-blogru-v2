import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { MenuManageComponent } from './menu-manage/menu-manage.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [
    FooterComponent,
    MenuComponent,
    MenuManageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MenuComponent,
  ]
})
export class CoreModule { }
