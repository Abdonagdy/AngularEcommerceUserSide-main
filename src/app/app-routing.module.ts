import { AuthGuard } from './testguid/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './Components/main/main.component';
import { SpinnerComponent } from './spinner/spinner.component';

const routes: Routes = [
  {path:'',redirectTo:'/Home',pathMatch:'full'},
  {path:'',component:MainComponent,children:[
  
  {
      path: '',
   
      loadChildren: () => import('./Components/product-module/product-module.module').then(m => m.ProductModuleModule)
    },
    {
      path: '',
      loadChildren: () => import('./Components/basket-module/basket-module.module').then(m => m.BasketModuleModule)
    },
    {
      path: '',
      loadChildren: () => import('./Components/reversation-module/reversation-module.module').then(m => m.ReversationModuleModule)
    }
    ,
    {
      path: '',
      loadChildren: () => import('./Components/reversation-module copy/sangan-module.module').then(m => m.SanganModuleModule)
    }
    ,
    {
      path: '',
    
      loadChildren: () => import('./Components/Category-module/category-module.module').then(m => m.CategoryModuleModule)
    },
    {
      path: '',
   
      loadChildren: () => import('./Components/chek-out-module/chek-out-module.module').then(m => m.ChekOutModuleModule)
    },
    {

      path: '',
      loadChildren: () => import('./Components/basket-module copy/blog-module.module').then(m => m.BlogModuleModule)
    },{
      path: '',
      loadChildren: () => import('./Components/user/user.module').then(m => m.UserModule)
    },
    {
      path: '',
      loadChildren: () => import('./Components/shared-module/shared-module.module').then(m => m.SharedModuleModule)
    },
  
  ]}

  
    


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
