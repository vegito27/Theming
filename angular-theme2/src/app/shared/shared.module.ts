import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionsBarComponent } from './optionsBar/options-bar/options-bar.component';
import { HeaderComponent } from './header/header/header.component';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';
import { HeaderListComponent } from './header/header-list/header-list.component';
import { OptionBarThemesComponent } from './optionsBar/option-bar-themes/option-bar-themes.component';
import { OptionBarThemeModeComponent } from './optionsBar/option-bar-theme-mode/option-bar-theme-mode.component';
import { OptionBarLayoutComponent } from './optionsBar/option-bar-layout/option-bar-layout.component';



@NgModule({
  declarations: [
    HeaderComponent,
    OptionsBarComponent,
    SidebarComponent,
    HeaderListComponent,
    OptionBarThemesComponent,
    OptionBarThemeModeComponent,
    OptionBarLayoutComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent,
    OptionsBarComponent,
    SidebarComponent]
})
export class SharedModule { }
