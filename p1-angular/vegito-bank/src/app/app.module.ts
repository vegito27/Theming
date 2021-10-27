import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerModule } from './module/customer/customer.module';
import { LayoutModule } from './layout/layout.module';
import { DashboardModule } from './layout/dashboard/dashboard.module';
import { HomeComponent } from './layout/dashboard/pages/home/home.component';
import { SignupComponent } from './layout/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatAccordion} from '@angular/material/expansion';
import {MatExpansionModule} from '@angular/material/expansion';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DetailsComponent } from './layout/details/details.component';


@NgModule({
  declarations: [
    AppComponent,
    // HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomerModule,
    LayoutModule,
    DashboardModule,
    ReactiveFormsModule,
    MatExpansionModule,
    CdkAccordionModule,
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
