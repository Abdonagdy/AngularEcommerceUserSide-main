import { Component, OnInit } from '@angular/core';
import { BasketService } from '../../basket-module/services/basket.service';
import { Observable } from 'rxjs';
import { Basket } from 'src/app/models/basket';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/Services/translation.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  basketitem:Observable<Basket |null> | undefined;
  langFlag:boolean=true;
  public currentLanguage: string='';
 
  constructor(private basket:BasketService,private translationService: TranslationService,
    private translate: TranslateService,private titleService: Title){
  
    }
  ngOnInit(): void {

    this.titleService.setTitle('الدفع مراكز مايز لصيانة السيارات');
this.basketitem=this.basket.Basketid;
this.translationService.getLanguageObservable().subscribe(language => {
  this.currentLanguage = language;
  //console.log(this.currentLanguage)
  // Do translation logic hereeeeeeee
  if(language=='ar')
  {
    this.translate.setDefaultLang('ar');
    this.langFlag=false;
  }
  else
  {
    this.translate.setDefaultLang('en');
    this.langFlag=true;
    
  }
});



  }


}
