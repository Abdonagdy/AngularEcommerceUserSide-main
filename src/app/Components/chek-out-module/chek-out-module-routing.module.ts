import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckOutComponent } from './check-out/check-out.component';
import { SubmitOrderComponent } from './submit-order/submit-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AllOrderComponent } from './all-order/all-order.component';
import { TestComponent } from './test/test.component';
import { AdressComponent } from './adress/adress.component';

const routes: Routes = [
  {path:'CheckOut',component:CheckOutComponent},
  {path:'OrderConfirmed',component:SubmitOrderComponent},
  {path:'OrderDetials/:Ord',component:OrderDetailsComponent},
  {path:'Orders',component:AllOrderComponent},
  {path:'test',component:TestComponent},
  {path:'Adress',component:AdressComponent}





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChekOutModuleRoutingModule { }
