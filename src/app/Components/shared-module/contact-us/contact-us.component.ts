import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/Services/translation.service';
import { BasketService } from '../../basket-module/services/basket.service';
import { ProductService } from '../../product-module/services/product.service';
import { UserService } from '../../user/services/user.service';
import { Meta, Title } from '@angular/platform-browser';
import { ReversationService } from '../../reversation-module/services/reversation.service';
import * as anime from 'animejs';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  langFlag:boolean=true;
  urldesc:any;
  Allbranch:any;
  constructor(private user: UserService,
    private route: Router,
    private basket: BasketService,

    private translationService: TranslationService,
    private translate: TranslateService,
    private Productservice :ProductService,private titleService: Title,private metaService: Meta,private Branceservice :ReversationService
  ) { 


  }
  ngOnInit(): void {
    this.titleService.setTitle('تواصل معنا مراكز مايز لصيانة السيارات افضل مراكز صيانة سيارات بالسعودية');
    this.metaService.updateTag({ name: 'description', content:'فيما يلي قائمة بأرقام التواصل مع مراكز مايز عن طريق الواتساب و حسب منطقتك ضيفنا الكريم. خدمة العملاء 0558023145, من الثامنة صباحا, حتى الرابعة عصرا. جدة. مركز ...' });


    this.urldesc=`الرئيسية < تواصل معنا`
    // this.translationService.getLanguageObservable().subscribe(language => {
    //   if(language=='ar'){
    //    this.langFlag=false;
    //   }
    //   else{
    //       this.langFlag=true;
    //   }
    //    // Do translation logic hereeeeeeee
    //  });
    this.Branceservice.GetAllBransh().subscribe(
      {
        next:(pro)=> {
          this.Allbranch=pro;
        
         }
        ,
    
        error:(err)=>console.log('لقد حدث خطا ما')
    
      })

      this.animate();
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

  animate(): void {

      anime({
        targets: '.box',
        translateX: 250,
        rotate: '1turn',
        backgroundColor: '#FFF',
        duration: 800,
        easing: 'easeInOutQuad'
      });
  
      // Scale up and down
      anime({
        targets: '.box',
        scale: [1, 1.5],
        duration: 1000,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: true,
        delay: 1000
      });
  
      // Change opacity
      anime({
        targets: '.box',
        opacity: [1, 0.5],
        duration: 1000,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: true,
        delay: 2000
      });
  
      // Color transition
      anime({
        targets: '.box',
        backgroundColor: ['#FFF', '#FF5733'],
        duration: 2000,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: true,
        delay: 3000
      });
    }
}



