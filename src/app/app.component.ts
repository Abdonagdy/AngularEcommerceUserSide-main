import { user } from './models/iuser';
import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import { TranslationService } from './Services/translation.service';
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { UserService } from './Components/user/services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
   title = 'مراكز مايز لصيانة السيارات';
   langFlag:boolean=true;

  constructor(private translate: TranslateService,private titleservice :Title, private meta:Meta, 
    private translationService: TranslationService,private sanitizer: DomSanitizer,private user:UserService
    ) {
      
      translate.setDefaultLang('ar');
      this.langFlag=false;
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  ngOnInit(): void {

    this.titleservice.setTitle('مراكز مايز لصيانة السيارات');
    this.meta.addTag({name: 'author', content: 'Mize'});
    this.meta.addTag({name: 'robots', content: 'index, follow'});
    this.meta.addTag({name: 'keywords', content: 'صيانة, سيارات, مراكز صيانة ،ورش صيانة, خدمات سيارات, إصلاح السيارات, فحص السيارات، جدة, الرياض, مكة المكرمة, المدينة المنورة, خميس مشيط, جيزان, الطائف, الدمام , ورشة اصلاح سيارات ، ورشةإصلاح سيارات ، صيانة سيارات ، مركز صيانة سيارات  ، مراكز ميكانيكا سيارات  ، خدمة سيارات  ، ورشة صيانة سيارات ، ورشة تصليح سيارات">'});
    this.meta.addTag({name: 'description', content: 'أفضل مراكز صيانة السيارات في المملكة العربية السعودية-أفضل مراكز صيانة سيارات -تصليح سيارات -صيانة سيارات  - جدة - الرياض - مكة المكرمة - المدينة المنورة - خميس مشيط - جيزان - الطائف -الدمام. صيانة سيارات مضمون و موثوق - مايز ،  أفضل مراكز صيانة السيارات  التي تقدم أفضل الخدمات وأعلى جودة في الصيانة ، مركز السيارات الخاص بك يوفر لك دليلًا شاملاً لتلبية احتياجات صيانة سيارتك'})
    this.translationService.getLanguageObservable().subscribe(language => {
     
      if(language=='ar'){
      this.langFlag=false;
     }
     else{
         this.langFlag=true;
     }
    });

    
  }
}

