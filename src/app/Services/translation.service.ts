import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class TranslationService {


   private languageSubject = new BehaviorSubject<string>('ar');
  constructor() {
let x=localStorage.getItem('lang') as string;
if(x)
    this.setLanguage(x)
  else
    x="en";

  }
  public get currentLanguage(): string {
    return this.languageSubject.value;
  }

  public setLanguage(language: string) {

    this.languageSubject.next(language);
  }

  public getLanguageObservable() {
    return this.languageSubject.asObservable();
  }
}
