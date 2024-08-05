import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutModuleModule } from '../layout-module/layout-module.module';
import { ChekOutModuleRoutingModule } from './chek-out-module-routing.module';
import { CheckOutComponent } from './check-out/check-out.component';
import { AppModule } from 'src/app/app.module';
import { AdressComponent } from './adress/adress.component';
import { ReviewComponent } from './review/review.component';
import { ShipingMethodComponent } from './shiping-method/shiping-method.component';
import { PaymentComponent } from './payment/payment.component';
import { Injectable } from '@angular/core';
import { SubmitOrderComponent } from './submit-order/submit-order.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AllOrderComponent } from './all-order/all-order.component';
import { TestComponent } from './test/test.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@Injectable({
  providedIn: 'any',
})

@NgModule({
  declarations: [
    CheckOutComponent,
    AdressComponent,
    ReviewComponent,
    ShipingMethodComponent,
    PaymentComponent,
    SubmitOrderComponent,
    OrderDetailsComponent,
    AllOrderComponent,
    TestComponent,
  ],
  imports: [
    CommonModule,
    ChekOutModuleRoutingModule,
    LayoutModuleModule, 
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })

  ]
})
export class ChekOutModuleModule { }
