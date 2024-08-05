import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/Services/translation.service';
import { user } from 'src/app/models/iuser';
import { UserService } from '../services/user.service';
import { Title } from '@angular/platform-browser';
import { ConfirmPasswordValidator } from 'src/app/Validateors/confirm-password.validator';
import { Observable } from 'rxjs/internal/Observable';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit{
  user2!:user;
  langFlag:boolean=true;
  public currentLanguage: string='';
wards:any;   
RegisterForm:FormGroup=new FormGroup({});

  constructor(private route :Router , private fb:FormBuilder,private Getid:ActivatedRoute,
    private translationService: TranslationService,private user: UserService,
    private translate: TranslateService , private UserService:UserService,private titleService: Title)
  {
  this.RegisterForm =this.fb.group({
      Id: [''], // Assuming this is a string, modify if it's a different type
      UserName: [''],
      FirstName: [''],
      LastName: [''],
      Phone: [''],
      Email: [''],
    });
  }
  ngOnInit(): void {
   this.titleService.setTitle('معلومات المستخدم مراكز مايز لصيانة السيارات')
    
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
        {
          next:(pro)=> {
            this.user2=pro;
            if(this.user2 ==null)
            {
              this.route.navigate(['/Home']);
            }
            else
            {
              
              this.UserService.AllPoint(this.user2.id).subscribe(
                (response) => {
                  this.wards=response;
                     console.log('Points:', response);
                     },
                     (error) => {
                       console.error('Error not points:', error);
                     }
              );
              this.RegisterForm=this.fb.group(
                {
                  Id:[pro.id],
                  UserName:[pro.username,[Validators.required,Validators.pattern("[A-Za-z0-9]{3,50}")]],
                  FirstName:[pro.fname,[Validators.required,Validators.pattern("[A-Za-z]{3,50}")]],
                  LastName:[pro.lname,[Validators.required,Validators.pattern("[A-Za-z]{3,50}")]],
                  Email:[pro.email,[Validators.required,,Validators.pattern("")]],
                  Phone:[pro.phoneNumber,[Validators.required, Validators.pattern("(05)([0-9]{8})"),
                  Validators.minLength(10), Validators.maxLength(10)]],
          
          
                }
              );
            }
            localStorage.setItem('token', this.user2.token);
           }
          ,
          error:(err)=>console.log('لقد حدث خطا ما')
        });
    
   
   

  
   // console.log(this.user.userValue)
  }
  get Id()
  {
    return this.RegisterForm.get('Id');
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

  EditeAccount()
  {
    const data=this.RegisterForm.value;
     console.log(data)
    return this.user.EditeProfile(data).subscribe({

      next:(user)=>{
        if(user.result=="Profile Updated Sucessfully")
        {
          
        Swal.fire("",`لقد تم تعديل البيانات بنجاح`,'success')
          location.reload();
        }
      else
      Swal.fire("",`لقد تم تعديل البيانات بنجاح`,'success')
      },
      error:(err)=>{
        console.log(err)
        Swal.fire("",`لم يتم تعديل البيانات بنجاح`,'error')
      }
     });

  }
}
