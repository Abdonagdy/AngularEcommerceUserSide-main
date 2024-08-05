import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModuleModule } from '../layout-module/layout-module.module';
import { BlogModuleRoutingModule } from './blog-module-routing.module';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';


@NgModule({
  declarations: [
    BlogComponent,
    BlogDetailComponent
  ],
  imports: [
    CommonModule,
    BlogModuleRoutingModule,
    LayoutModuleModule
  ]
})
export class BlogModuleModule { }
