import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SanganComponent } from './sangan/sangan.component';

const routes: Routes = [
  {path:'Sangan',component:SanganComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SanganModuleRoutingModule { }
