import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/Services/translation.service';
import { BasketService } from '../../basket-module/services/basket.service';
import { ProductService } from '../../product-module/services/product.service';
import { UserService } from '../../user/services/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-privacypolicy',
  templateUrl: './privacypolicy.component.html',
  styleUrls: ['./privacypolicy.component.css']
})
export class PrivacypolicyComponent implements OnInit {
  langFlag:boolean=true;
  urldesc:any;

  constructor(private user: UserService,
    private route: Router,
    private basket: BasketService,

    private translationService: TranslationService,
    private translate: TranslateService,
    private Productservice :ProductService,private titleService: Title
  ) { 


  }
  ngOnInit(): void {
    this.titleService.setTitle('سياسة الخصوصية افضل مراكز صيانة سيارات بالمملكه العربية السعودية')
    this.urldesc=`الرئيسية < سياسة الخصوصية`
    this.translationService.getLanguageObservable().subscribe(language => {
      if(language=='ar'){
       this.langFlag=false;
      }
      else{
          this.langFlag=true;
      }
       // Do translation logic hereeeeeeee
     });}

  switchToArabic() {
    this.translate.use('ar');
    this.langFlag=false;
    localStorage.setItem('lang', 'ar');
    this.translationService.setLanguage("ar");

  }
  switchToEnglish() {
    this.translate.use('en');
    this.langFlag=true;
    localStorage.setItem('lang', 'en');
    this.translationService.setLanguage("en");
  }


}

