import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'projects/angular/src/auth';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [
  {
    path: 'user/auth',
    loadChildren: () => import('@themost/angular').then( m => m.AuthModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomeModule)
      },
      {
        path: 'customers',
        canActivate: [AuthGuard],
        component: CustomerListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
