import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/Services/translation.service';
import { BasketService } from '../../basket-module/services/basket.service';
import { ProductService } from '../../product-module/services/product.service';
import { UserService } from '../../user/services/user.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-socialmedia',
  templateUrl: './socialmedia.component.html',
  styleUrls: ['./socialmedia.component.css']
})
export class SocialmediaComponent implements OnInit {
  langFlag:boolean=true;
  urldesc:any;
  
  constructor(private user: UserService,
    private route: Router,
    private basket: BasketService,

    private translationService: TranslationService,
    private translate: TranslateService,
    private Productservice :ProductService,private titleService: Title,private metaService: Meta
  ) { 


  }
  ngOnInit(): void {
    this.titleService.setTitle('منصات مايز مراكز مايز لصيانة السيارات افضل مراكز صيانة سيارات بالسعودية');
    this.metaService.updateTag({ name: 'description', content:'فيما يلي قائمة بمنصات التواصل الإجتماعي لمراكز مايز لصيانة السيارات  ...' });
    this.metaService.updateTag({name:'keywords',content:' مراكز مايز لخدمات و صيانة السيارات - جدة - الرياض - المدينة - مكة - خميس مشيط - جيزان'})
    this.urldesc=`الرئيسية < منصات مايز`
    // this.translationService.getLanguageObservable().subscribe(language => {
    //   if(language=='ar'){
    //    this.langFlag=false;
    //   }
    //   else{
    //       this.langFlag=true;
    //   }
    //    // Do translation logic hereeeeeeee
    //  });
}

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
