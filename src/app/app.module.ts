import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { CoreModule } from './core/core.module';
import { HomeModule } from './pages/home/home.module';
import { AuthRoutingModule } from './pages/auth/auth-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ManageComponent } from './layouts/manage/manage.component';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { MaterialModule } from './shared/material.module';
import { MenuListItemsComponent } from './layouts/components/menu-list-items/menu-list-items.component';
import { TableComponent } from './layouts/components/table/table.component';
import { interceptorProvicer } from './interceptor/resource-interceptor.service';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    ManageComponent,
    MenuListItemsComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthRoutingModule,
    CoreModule,
    HomeModule,
    RouterModule,
    HttpClientModule,
    DashboardModule,
    MaterialModule,
    NgxSpinnerModule
  ],
  providers: [
    provideAnimationsAsync(),
    interceptorProvicer
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
