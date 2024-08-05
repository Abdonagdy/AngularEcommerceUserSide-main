import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormGroup, FormsModule } from '@angular/forms';
import{HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [



  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // JwtModule.forRoot({})



  ],
  exports:[
    BrowserModule
  ],

  providers: [],
  bootstrap: []
})
export class sahreddd { }
