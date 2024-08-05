import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/Services/translation.service';
import { BasketService } from '../../basket-module/services/basket.service';
import { ProductService } from '../../product-module/services/product.service';
import { UserService } from '../../user/services/user.service';
import { ReversationService } from '../../reversation-module/services/reversation.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  langFlag:boolean=true;
  ServiceBranch:any; 
  urldesc :any;
  constructor(private user: UserService,
    private route: Router,
    private basket: BasketService,
    private service:ReversationService,
    private translationService: TranslationService,
    private translate: TranslateService,
    private Productservice :ProductService,private titleService: Title,private metaService: Meta
  ) { 


  }
  ngOnInit(): void {
    
   this.titleService.setTitle('خدمات مراكز مايز لصيانة السيارات افضل مراكز صيانة سيارات بالسعودية');
   this.metaService.updateTag({ name: 'description', content:' قائمة خدمات مراكز مايز لصيانة السيارات ...' });
   this.urldesc=`الرئيسية < خدمات مايز`

    this.service.Getallservices().subscribe(
      {

        next:(user)=>{
       this.ServiceBranch=user;
        console.log(user);
      //  this.route.navigate(['/Home'])
      
      },
      error:(user)=>{
        console.log(user)
      }
      
      }
    )


    this.service.BranshService(600900).subscribe(
      {

        next:(user)=>{
      
        console.log(user);
      //  this.route.navigate(['/Home'])
      
      },
      error:(user)=>{
        console.log(user)
      }
      
      }
    )
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
