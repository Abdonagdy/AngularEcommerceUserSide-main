import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/services/user.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/Services/translation.service';
import { BasketService } from '../../basket-module/services/basket.service';
import { ProductService } from '../../product-module/services/product.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  langFlag:boolean=true;

  public currentLanguage: string='';
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
    this.titleService.setTitle('من نحن مراكز مايز لصيانة السيارات افضل مراكز صيانة سيارات بالسعوديه');
    this.metaService.updateTag({ name: 'description', content:'شــركة منيــف عامر عبدالله النهــدي للتجارة تفتخــر بعملائهــا وخدمتهــم فــي مراكــز مايــز لصيانــة الســيارات بشــتى الخدمــات تحــت بيئــة مجهــزة بأعلــى االامكانيـات والفنييـن وممثلـي خدمـة العمـلاء لتلبيـة طلباتهـم بأسـرع وقـت وخدمــة عمــلاء مــا بعــد البيــع' });
     

    this.urldesc=`الرئيسية < من نحن`
    // this.translationService.getLanguageObservable().subscribe(language => {
    //   console.log(language)
    //   if(language=='ar'){
    //    this.langFlag=false;
    //   }
    //   else{
    //     this.currentLanguage=language
    //       this.langFlag=true;
    //   }
    //    // Do translation logic hereeeeeeee
    //  });
}



}
