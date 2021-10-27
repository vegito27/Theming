import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/dashboard/pages/home/home.component';
import { SignupComponent } from './layout/signup/signup.component';

const routes: Routes = [
  {
  path:'',
  loadChildren:()=>import('./layout/layout.module').then(mod => mod.LayoutModule)
},
{
  path:'customer',
  loadChildren:()=>import('./module/customer/customer.module').then(mod => mod.CustomerModule)
},
// {
//   path:'dashboard',
//   loadChildren:()=>import('./layout/dashboard/dashboard.module').then(mod => mod.DashboardModule)
// },
{
  path: 'home',
  component: HomeComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
