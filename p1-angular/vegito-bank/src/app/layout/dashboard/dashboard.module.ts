import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderListComponent } from './components/header-list/header-list.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';


// const route: Routes = [
//   {
//       path: 'page',
//       component: HomeComponent
//   }
// ]


const route: Routes = [{
    path:'home',
    component:HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  }]

@NgModule({
  declarations: [HeaderListComponent,FooterComponent,HeaderComponent,HomeComponent,DashboardComponent],
  imports: [
    RouterModule.forChild(route),
    CommonModule
  ],
  exports: [RouterModule]
})
export class DashboardModule { }
