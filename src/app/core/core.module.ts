import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { MenuManageComponent } from './menu-manage/menu-manage.component';



@NgModule({
  declarations: [
    FooterComponent,
    MenuComponent,
    MenuManageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
