import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { RestPasswordComponent } from './rest-password/rest-password.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AdressDetailsComponent } from './adress-details/adress-details.component';
import { PointsComponent } from './points/points.component';

const routes: Routes = [
  {path:'register/:referralCode',component:SignUpComponent},
  {path:'register',component:SignUpComponent},
  {path:'Login',component:LoginComponent},
  {path:'UserInfo',component:UserinfoComponent},
  {path:'RestPassword',component:RestPasswordComponent},
  {path:'changepassword',component:ChangepasswordComponent},
  {path:'ForgetPassword',component:ForgetpasswordComponent},
  {path:'AdressDetails',component:AdressDetailsComponent},
  {path:'Reward Points',component:PointsComponent},
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
