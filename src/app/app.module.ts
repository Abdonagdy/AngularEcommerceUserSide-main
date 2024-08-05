import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './Components/main/main.component';
import { ComparepasswordDirective } from './directives/comparepassword.directive';
import { LayoutModuleModule } from './Components/layout-module/layout-module.module';

import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';

import { CurrencyLocalizedPipe } from './Components/currency-localized.pipe';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './testguid/auth.guard';
import { SpinnerComponent } from './spinner/spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerServiceService } from './Components/spinner-service.service';
import { HttpInterceptorService } from './http-interceptor.service';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ComparepasswordDirective,
    SpinnerComponent,

 

  ],
  imports: [
    BrowserModule,CommonModule,
    AppRoutingModule,MatProgressSpinnerModule,
     TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    HttpClientModule,
    LayoutModuleModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right'
    })
 
  ],

exports:[
  SpinnerComponent
],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
