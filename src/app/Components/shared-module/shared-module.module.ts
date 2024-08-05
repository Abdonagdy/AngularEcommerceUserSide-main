import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModuleRoutingModule } from './shared-module-routing.module';
import { LayoutModuleModule } from '../layout-module/layout-module.module';
import { SocialmediaComponent } from './socialmedia/socialmedia.component';
import { PrivacypolicyComponent } from './privacypolicy/privacypolicy.component';
import { ConditionComponent } from './condition/condition.component';
import { ServiceComponent } from './service/service.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}



@NgModule({
  declarations: [
    AboutUsComponent,
    ContactUsComponent,
    SocialmediaComponent,
    PrivacypolicyComponent,
    ConditionComponent,
    ServiceComponent,
    NotFoundComponent,


  ],
  imports: [
    CommonModule,
    SharedModuleRoutingModule,
    LayoutModuleModule,    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),



  ],

})
export class SharedModuleModule { }
