import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/Services/translation.service';
import { ConfirmPasswordValidator } from 'src/app/Validateors/confirm-password.validator';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-rest-password',
  templateUrl: './rest-password.component.html',
  styleUrls: ['./rest-password.component.css']
})
export class RestPasswordComponent implements OnInit{
  ForgetPasswordForm:FormGroup = new FormGroup({});
  userid :number|undefined;
  tokenn:string|undefined;
  langFlag:boolean=true;
  public currentLanguage: string='';
  constructor(private route :Router , private fb:FormBuilder,private user:UserService,private Getid:ActivatedRoute,
    private translationService: TranslationService,
    private translate: TranslateService ,private titleService: Title)
  {
  }
  ngOnInit(): void {

    this.titleService.setTitle('الحساب مراكز مايز لصيانة السيارات');
    this.Getid.queryParamMap.subscribe(
      param=>{
        this.userid=Number(param.get('id'));
        this.tokenn=String(param.get("token"));
      
      }
    )
    this.ForgetPasswordForm=this.fb.group(
      {
        NewPassword:["",[Validators.required]],
        ConfirmNewPassword:["",[Validators.required]],
      },
      {
        validator: ConfirmPasswordValidator("NewPassword", "ConfirmNewPassword")

      }
    );

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


  get NewPassword()
  {
    return this.ForgetPasswordForm.get('NewPassword');
  }
  get ConfirmNewPassword()
  {
    return this.ForgetPasswordForm.get('ConfirmNewPassword');
  }

 



  RestPassword()
  {
    const data ={
      NewPassword:this.ForgetPasswordForm.controls['NewPassword'].value ?? '',
      UserId:this.userid,
      Token:this.tokenn,
      ConfirmNewPassword:this.ForgetPasswordForm.controls['ConfirmNewPassword'].value?? 0

    } 
    //this.ForgetPasswordForm.value;

    
    return this.user.ResetPassword(data).subscribe(
      {
     
       next:(user)=>{
     
        console.log(user.isSuccess);
        console.log(user);
     //  this.route.navigate(['/Home'])
     if(user.isSuccess==true){
          Swal.fire("",  `تمت العملية بنجاح` ,'success');
          this.route.navigate(["/Login"]);
    }
     else
     {
      Swal.fire("", 'لقد حصل خطا ما حاول مره آخرى ', 'error');
     }   
     
     },
     error:(user)=>{
       
      Swal.fire("", 'لقد حصل خطا ما حاول مره آخرى ', 'error')

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
