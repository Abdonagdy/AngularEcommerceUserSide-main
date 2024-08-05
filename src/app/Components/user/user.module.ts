import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserRoutingModule } from './user-routing.module';
// import { FormGroup, FormsModule } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LayoutModuleModule } from '../layout-module/layout-module.module';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { RestPasswordComponent } from './rest-password/rest-password.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AdressDetailsComponent } from './adress-details/adress-details.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { PointsComponent } from './points/points.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}




@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent,
    UserinfoComponent,
    ForgetpasswordComponent,
    RestPasswordComponent,
    ChangepasswordComponent,
    AdressDetailsComponent,
    PointsComponent,


  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    LayoutModuleModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),

      
    // FormsModule,
    // ReactiveFormsModule,

  ]


})
export class UserModule { }
