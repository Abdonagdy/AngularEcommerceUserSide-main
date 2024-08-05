import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReversationComponent } from './reversation/reversation.component';

const routes: Routes = [
  {path:'AppointmentBooking',component:ReversationComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReversationModuleRoutingModule { }
