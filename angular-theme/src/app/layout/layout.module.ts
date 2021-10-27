import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderListComponent } from '../shared/header/header-list/header-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from '../shared/footer/footer.component';
import { OptionsbarComponent } from '../shared/optionsbar/optionsbar.component';
import { NavComponent } from './nav/nav.component';
import { LayoutComponent } from '../shared/layout/layout.component';
import { DynamicFormsComponent } from './dynamic-forms/dynamic-forms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    HeaderListComponent,
    DashboardComponent,
    FooterComponent,
    OptionsbarComponent,
    NavComponent,
    LayoutComponent,
    HomeComponent,
    DynamicFormsComponent,

  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
   
  ]
})
export class LayoutModule { }
