import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomComponent } from './components/custom/custom.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TestDarkComponent } from './components/test-dark/test-dark.component';
import { TestLightComponent } from './components/test-light/test-light.component';

const routes: Routes = [
  {path:'',redirectTo:'/custom',pathMatch:'full'},
  {path:'home',component:HeaderComponent},
  {path:'home2',component:HomeComponent},
  {path:'custom',component:CustomComponent},
  {path:'light',component:TestDarkComponent},
  {path:'dark',component:TestLightComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
