import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardModule } from './dashboard/dashboard.module';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {  MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


const routes: Routes = [
  {
    path:'signup',
    component: SignupComponent
  },

  {
    path:'',
    loadChildren:()=>import('./dashboard/dashboard.module').then(component=>component.DashboardModule)
  },
];


@NgModule({
  declarations: [SignupComponent,DetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DashboardModule,
    MatDatepickerModule,
    CdkAccordionModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [RouterModule]
})
export class LayoutModule { }
