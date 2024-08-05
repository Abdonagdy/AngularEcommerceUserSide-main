import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/Services/translation.service';

@Component({
  selector: 'app-submit-order',
  templateUrl: './submit-order.component.html',
  styleUrls: ['./submit-order.component.css']
})
export class SubmitOrderComponent implements OnInit{
  langFlag:boolean=true;
  public currentLanguage: string='';

  constructor(private translationService: TranslationService,
    private translate: TranslateService,private titleService: Title)
  {
    translate.setDefaultLang('ar');
    this.langFlag=false;

  }
  ngOnInit(): void {
    this.titleService.setTitle('الدفع مراكز مايز لصيانة السيارات')
    this.translationService.getLanguageObservable().subscribe(language => {
      this.currentLanguage = language;
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
