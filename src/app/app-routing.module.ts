import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { LoginGuard } from './guard/login.guard';
import { HomeComponent } from './pages/home/home/home.component';

const routes: Routes = [
  {
    path: 'site',
    component: FullComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'auth',
        loadChildren: () => import('./pages/auth/auth.module').then(mod => mod.AuthModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  },
  // {
  //   path: 'dashboard',
  //   component: ManageComponent,
  //   canActivate: [ResourceGuard],
  //   children: [
  //     {
  //       path: '',
  //       component: DashboardComponent
  //     },
  //     {
  //       path: 'pets',
  //       loadChildren: () => import('./pages/pets/pets.module').then(mod => mod.PetsModule),
  //     },
  //     {
  //       path: 'adoptions',
  //       loadChildren: () => import('./pages/adoptions/adoptions.module').then(mod => mod.AdoptionsModule),
  //     },
  //     {
  //       path: '',
  //       redirectTo: '',
  //       pathMatch: 'full'
  //     }
  //   ],
  //   data: {
  //     expectedRol: ['admin', 'user']
  //   }
  // },
  {
    path: '**',
    redirectTo: 'site',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
