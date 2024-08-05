import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {  ConfirmPasswordValidator } from 'src/app/Validateors/confirm-password.validator';
import { Iuser } from 'src/app/models/iuser';
import { UserService } from 'src/app/Components/user/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/Services/translation.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  UserF: Iuser ={} as Iuser;
  invalidlogin:boolean=false;
  erro:any;
  langFlag:boolean=true;
  referralCode: any;
  public currentLanguage:string='';
  
  RegisterForm:FormGroup=new FormGroup({});
  constructor(private User:UserService , private route:Router,private fb:FormBuilder,private translationService: TranslationService,
    private translate: TranslateService,private titleService: Title,private routee: ActivatedRoute
    )
  {

   }

  ngOnInit(): void {

    this.titleService.setTitle('تسجيل مستخدم جديد مراكز مايز لصيانة السيارات');
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


  this.routee.params.subscribe(params => {
    this.referralCode = params['referralCode'];
    if (this.referralCode) {
      // If referral code is present, navigate to the register route with the code
      this.route.navigateByUrl(`/register/${this.referralCode}`);
    } else {
      // If no referral code, navigate to the register route without the code
      this.route.navigateByUrl('/register');
    }
  });
    this.RegisterForm=this.fb.group(
      {
        UserName:["",[Validators.required,Validators.pattern("[A-Za-z0-9]{3,50}")]],
        FirstName:["",[Validators.required,Validators.pattern("[A-Za-z]{3,50}")]],
        LastName:["",[Validators.required,Validators.pattern("[A-Za-z]{3,50}")]],
        Email:["",[Validators.required,,Validators.pattern("")]],
        Phone:["",[Validators.required, Validators.pattern("(05)([0-9]{8})"),
        Validators.minLength(10), Validators.maxLength(10)]],
        Password:["",[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{8,}$')]],
        confirmPassword:["",[Validators.required]],
        UserReferralCode:[this.referralCode]



      },
      {
        validator: ConfirmPasswordValidator("Password", "confirmPassword")

      }

    );
    
   

    }






  get UserName()
  {
    return this.RegisterForm.get('UserName');
  }
  get FirstName()
  {
    return this.RegisterForm.get('FirstName');
  }
  get LastName()
  {
    return this.RegisterForm.get('LastName');
  }
  get Email()
  {
    return this.RegisterForm.get('Email');
  }

  get Phone()
  {
    return this.RegisterForm.get('Phone');
  }
  
  get Password()
  {
    return this.RegisterForm.get('Password');
  }
  get confirmPassword()
  {
    return this.RegisterForm.get('confirmPassword');
  }
 get UserReferralCode()
  {
    return this.RegisterForm.get('UserReferralCode');
  }


  CreateAccount(){
    const data=this.RegisterForm.value  ;
 
  return this.User.Register(data).subscribe({

    next:(user)=>{
     if(localStorage.getItem('previousPage') != null)
     {
       const previousPage = this.User.getPreviousPage();
       this.User.clearPreviousPage(); // Clear previous page after use
       this.route.navigateByUrl(previousPage);

     }
     else
     {
      this.route.navigate(['/Home'])
     }
    },
    error:(err)=>{
      this.invalidlogin=true;
      this.erro=err.errors;
    }
   });
  }


}
