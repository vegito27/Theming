import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';


const routes:Routes=[{
  path:'home',
  component:HomeComponent},
{
  path:'portfolio',
  component:PortfolioComponent
}]

@NgModule({
  declarations: [
    HomeComponent,
    PortfolioComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LayoutModule { }
