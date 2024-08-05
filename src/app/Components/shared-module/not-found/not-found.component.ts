import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/Services/translation.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit{
 
 
  langFlag:boolean=true;
 public currentLanguage:string=''; 
 
  constructor(
    private translationService: TranslationService,
    private translate: TranslateService,
  
  ) { 


  }
  ngOnInit(): void {
    
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
        
      } // Do translation logic hereeeeeeee
  });
}

}
