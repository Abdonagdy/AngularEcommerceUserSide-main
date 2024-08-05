import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SocialmediaComponent } from './socialmedia/socialmedia.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { ConditionComponent } from './condition/condition.component';
import { ServiceComponent } from './service/service.component';
const routes: Routes = [
  {path:'AboutUs',component:AboutUsComponent},
  {path:'ContactUs',component:ContactUsComponent},
  {path:'SocailMedia',component:SocialmediaComponent},
  {path:'PrivacyPolicy',component:PrivacypolicyComponent},
  {path:'TermsOfUse',component:ConditionComponent},
  {path:'OurServices',component:ServiceComponent},
  {path:'**',component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedModuleRoutingModule { }
