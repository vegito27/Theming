import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';

const routes: Routes = [{
  path: '',loadChildren:()=>import('./layout/layout.module').then(mod => mod.LayoutModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
