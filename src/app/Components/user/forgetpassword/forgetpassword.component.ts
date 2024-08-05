import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/Services/translation.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit{
  ForgetPasswordForm:FormGroup = new FormGroup({});
  langFlag:boolean=true;
  public currentLanguage: string='';

  
  constructor(private route :Router , private fb:FormBuilder,private user:UserService,
    private translationService: TranslationService,
    private translate: TranslateService ,private titleService: Title)
  {
    this.ForgetPasswordForm=this.fb.group(
      {
        Email:["",Validators.required],
      }
    );

    translate.setDefaultLang('ar');
    this.langFlag=false;
  }
  ngOnInit(): void {
  
     this.titleService.setTitle('نسيت كلمة السر مراكز مايز لصيانة السيارات ');
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


  get Email()
  {
    return this.ForgetPasswordForm.get('Email');
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


  ForgetPassword()
  {
    const data = this.ForgetPasswordForm.value;
    return this.user.ForgetPassword(data).subscribe(
      {
     
       next:(user)=>{
     Swal.fire("",`إذا كنت مشترك معنا سوف يتم ارسال رابط على الايميل الخاص بك`,'success')

     
     },
     error:(user)=>{
       Swal.fire("", 'لقد حصل خطا ما  حاول مره آخرى ', 'error')
     }
     
     }
     )


  } 
}
