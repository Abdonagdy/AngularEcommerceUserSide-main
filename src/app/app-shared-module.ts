import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './Components/main/main.component';
import { FormGroup, FormsModule } from '@angular/forms';
import{HttpClientModule} from '@angular/common/http';
import { ComparepasswordDirective } from './directives/comparepassword.directive';
import { LayoutModuleModule } from './Components/layout-module/layout-module.module';

@NgModule({
  declarations: [
    

  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LayoutModuleModule
    
    // JwtModule.forRoot({})



  ],
  exports:[
    BrowserModule
  ],

  providers: [ ], 
  bootstrap: [AppComponent]
})
export class sharedmodule { }
