import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModuleRoutingModule } from './layout-module-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SumarryOrderComponent } from './sumarry-order/sumarry-order.component';
import { StepperComponent } from './stepper/stepper.component';
import{CdkStepperModule} from '@angular/cdk/stepper';
import { FormGroup, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// import { ToastrModule } from 'ngx-toastr';
// import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SumarryOrderComponent,
    StepperComponent,
  ],
  imports: [
    CommonModule,
    LayoutModuleRoutingModule,
    CdkStepperModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),

    NgxPaginationModule

  ]
  ,
  exports:[
    RouterModule,
    FooterComponent,
    HeaderComponent,
    SumarryOrderComponent,
    StepperComponent,
    CdkStepperModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
 
  ]

})
export class LayoutModuleModule { }
