import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { ProductModuleRoutingModule } from './product-module-routing.module';
import { FilterAsideComponent } from './filter-aside/filter-aside.component';
import { IndexComponent } from './index/index.component';
import { FilterByCategoryComponent } from './filter-by-category/filter-by-category.component';
import { FormsModule  } from "@angular/forms";
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LayoutModuleModule } from '../layout-module/layout-module.module';
import { WishListComponent } from './wish-list/wish-list.component';
import { FilterByPriceComponent } from './filter-by-price/filter-by-price.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { CurrencyLocalizedPipe } from '../currency-localized.pipe';
import { CurrencyPipe } from '@angular/common';




export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    ProductsComponent,
    FilterAsideComponent,
    IndexComponent,
    FilterByCategoryComponent,
    ProductDetailsComponent,
    WishListComponent,
    FilterByPriceComponent,CurrencyLocalizedPipe

  ],
  imports: [
    CommonModule,
    ProductModuleRoutingModule,
    FormsModule,
     LayoutModuleModule,
     TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),



  ],
  exports:[
    FilterAsideComponent,CurrencyLocalizedPipe
  ],providers: [
    CurrencyPipe
  ]
})
export class ProductModuleModule { }
