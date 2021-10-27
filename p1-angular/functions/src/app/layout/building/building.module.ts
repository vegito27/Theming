import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuildingComponent } from './building.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from '../../components/customer/customer.component';
import { LeadComponent } from '../../components/lead/lead.component';
import { SupervisorComponent } from '../../components/supervisor/supervisor.component';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from '../../home/home.component';




@NgModule({
  declarations: [
    BuildingComponent,
    CustomerComponent,
    LeadComponent,
    SupervisorComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule
  ]
})
export class BuildingModule { }
