import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { IndexComponent } from './index/index.component';
import { FilterByCategoryComponent } from './filter-by-category/filter-by-category.component';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { FilterByPriceComponent } from './filter-by-price/filter-by-price.component';

const routes: Routes = [
  {path:'AllProduct',component:ProductsComponent},
  {path:'Home',component:IndexComponent},
  {path:'ProductDetails/:catename/:cat/:id',component:ProductDetailsComponent},
  {path:'WishList',component:WishListComponent},
  {path:'Category/:cat/:id',component:FilterByCategoryComponent},
  {path:'Price/:min/:max',component:FilterByPriceComponent},




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductModuleRoutingModule { }
