import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModuleModule } from '../layout-module/layout-module.module';
import { ReversationModuleRoutingModule } from './reversation-module-routing.module';
import { ReversationComponent } from './reversation/reversation.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { ProductModuleModule } from '../product-module/product-module.module';
import { FilterAsideComponent } from '../product-module/filter-aside/filter-aside.component';
import { ProductModuleRoutingModule } from '../product-module/product-module-routing.module';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}




@NgModule({
  declarations: [
    ReversationComponent
  ],
  imports: [
    
   
    CommonModule,
    ReversationModuleRoutingModule,
    LayoutModuleModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),

    
  ]
})
export class ReversationModuleModule { }
