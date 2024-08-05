import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { TranslationService } from '../Services/translation.service';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'currencyLocalized'
})
export class CurrencyLocalizedPipe implements PipeTransform {

  public currentLanguage: string='';
  langFlag:boolean=true;
  currencySymbol:string='';

  constructor(
    private currencyPipe: CurrencyPipe, 
    private translationService:TranslationService,
    private translate: TranslateService
  ) {}

  transform(value: number, currencyCode: string='ar'): any {
       
    this.translationService.getLanguageObservable().subscribe(language => {
      this.currentLanguage = language;
      if(language == 'ar') {
        this.langFlag = false;
        currencyCode = language;
        this.currencySymbol = 'ر.س';
      } else {
        this.langFlag = true;
        currencyCode = language;
        this.currencySymbol ='SAR';
      }
    });
    
   
    // Reverse the order of currency symbol and formatted value
    return ` ${value}  ${this.currencySymbol}`;
  }
}
