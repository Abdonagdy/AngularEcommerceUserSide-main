import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModuleModule } from '../layout-module/layout-module.module';
import { CategoryModuleRoutingModule } from './category-module-routing.module';
import { CategoryComponent } from './category/category.component';
import { ProductModuleModule } from '../product-module/product-module.module';



@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
  ProductModuleModule,
    CommonModule,
    CategoryModuleRoutingModule,
    LayoutModuleModule,
  ],
  exports:[
  ]
})
export class CategoryModuleModule { }
