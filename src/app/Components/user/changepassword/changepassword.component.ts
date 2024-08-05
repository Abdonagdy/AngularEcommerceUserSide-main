import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { user } from 'src/app/models/iuser';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/Services/translation.service';
import { ConfirmPasswordValidator } from 'src/app/Validateors/confirm-password.validator';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  user1!:user;

  ForgetPasswordForm:FormGroup = new FormGroup({});
  userid :number|undefined;
  tokenn:string|undefined;
  langFlag:boolean=true;
  public currentLanguage: string='';

  constructor(private route :Router , private fb:FormBuilder,private user:UserService,private Getid:ActivatedRoute,
    private translationService: TranslationService,
    private translate: TranslateService,private titleService: Title)
  {
    this.ForgetPasswordForm=this.fb.group(
      {
        NewPassword:["",[Validators.required]],
        ConfirmNewPassword:["",[Validators.required]],
        CurrentPassword:["",[Validators.required]],
        UserName:['',''],
      },
      {
        validator: ConfirmPasswordValidator("NewPassword", "ConfirmNewPassword")

      }
    );


  }
  ngOnInit(): void {
  this.titleService.setTitle('الحساب مراكز مايز لصيانة السيارات')
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
  
  const token = localStorage.getItem('token');
  this.user.getuserValue(token).subscribe(
      (user)=>
      {
        if(user ==null)
    {

      this.route.navigate(['/Home']);
     
    }
    else
    {
      this.ForgetPasswordForm=this.fb.group(
        {
          NewPassword:["",[Validators.required]],
          ConfirmNewPassword:["",[Validators.required]],
          CurrentPassword:["",[Validators.required]],
          UserName:[user.username,''],
        },
        {
          validator: ConfirmPasswordValidator("NewPassword", "ConfirmNewPassword")
  
        }
      );
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


  get NewPassword()
  {
    return this.ForgetPasswordForm.get('NewPassword');
  }
  get ConfirmNewPassword()
  {
    return this.ForgetPasswordForm.get('ConfirmNewPassword');
  }

  get CurrentPassword()
  {
    return this.ForgetPasswordForm.get('CurrentPassword');
  }

  get UserName()
  {
    return this.ForgetPasswordForm.get('UserName');
  }



  ChangePassword()
  {
    const data = this.ForgetPasswordForm.value;

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'هل تود تغيير الرقم السرى',
      text: "اليس كذلك!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم اود تغييرة',
      cancelButtonText: 'لا شكرا',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) { 
         this.user.ChangePassword(data).subscribe(
          {
         
           next:(user)=>{
         
         //  this.route.navigate(['/Home'])
         if(user.result==="تم تعديل الرقم السرى بنجاح"){
          Swal.fire({
            title: 'هل تود البقاء قيد التسجيل ؟',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'نعم',
            denyButtonText: ` لا اود تسجيل الدخول من جديد`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('شكرا لك !', '', 'success')
            } else if (result.isDenied) {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              this.route.navigate(["/Login"]);
            location.reload();
            }
          })
        }
         else
         {
      Swal.fire("", 'لقد حصل خطا ما حاول مره آخرى ', 'error');
       }   
         
         },
         error:(user)=>{
           //this.invalidlogin = true;
           Swal.fire("", 'لقد حصل خطا ما حاول مره آخرى ', 'error')
    
           console.log(user)
         }
         
         }
         )
    
        
       



           swalWithBootstrapButtons.fire(
          'تم تغيير الرقم السرى بنجاح',
          'تمت العملية بنجاح',
          'success'
        )
      } 
      else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })

    


  } 


}
