import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../user/services/user.service';
import { Adress, user } from 'src/app/models/iuser';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/Services/translation.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
ChekoutForm:FormGroup=new FormGroup({});
  userid!: number;
  Ad:Adress=JSON.parse(localStorage.getItem('Adress_id')!);

  langFlag:boolean=true;
  public currentLanguage: string='';
 user1!:user;
  
  constructor(private fb:FormBuilder,private user:UserService,private translationService: TranslationService,
    private translate: TranslateService,private titleService: Title)
  {
    this.ChekoutForm= this.fb.group({
      adressform:this.fb.group({
        UserId:["",],
        Fname:['',[Validators.required]],
       Lname:['',[Validators.required]],
       Email:['',[Validators.required]],
       PhoneNumber:['',[Validators.required]],
        City:['',[Validators.required]],
        Region:['',[Validators.required]],
        Country:['',[Validators.required]],
  
  
      }),
      Deleviryform:this.fb.group({
        DelaviryMethod:["",[Validators.required]],
  
      }),
      Paymentform:this.fb.group({
        NameonCard:["",[Validators.required]],
  
      })
    })
  }
  ngOnInit(): void {
   this.titleService.setTitle('الدفع مراكز مايز لصيانة السيارات') 
 
 
const token =localStorage.getItem('token');
this.user.getuserValue(token).subscribe(
  {
    next:(pro)=>
    {
      this.user1=pro;

      if(this.Ad !=null)
 {

  
  this.ChekoutForm= this.fb.group({
    adressform:this.fb.group({
      UserId:[this.user1.id,],
      Fname:[this.user1.fname,[Validators.required]],
      Lname:[this.user1.lname,[Validators.required]],
      Email:[this.user1.email,[Validators.required]],
      PhoneNumber:[this.user1.phoneNumber,[Validators.required]],
      City:['',[Validators.required]],
      Region:[this.Ad.region,[Validators.required]],
      Country:[this.Ad.country,[Validators.required]],

    }),
    Deleviryform:this.fb.group({
      DelaviryMethod:["",[Validators.required]],

    }),
    Paymentform:this.fb.group({
      NameonCard:["",[Validators.required]],

    })
  })
 }
 else
 {
   
  this.ChekoutForm= this.fb.group({
    adressform:this.fb.group({
      UserId:["",],
    Fname:['',[Validators.required]],
      Lname:['',[Validators.required]],
     Email:['',[Validators.required]],
    PhoneNumber:['',[Validators.required]],
      City:['',[Validators.required]],
      Region:['',[Validators.required]],
      Country:['',[Validators.required]],

    }),
    Deleviryform:this.fb.group({
      DelaviryMethod:["",[Validators.required]],

    }),
    Paymentform:this.fb.group({
      NameonCard:["",[Validators.required]],

    })
  })
 }
 this.userid=this.user1.id; 
 this.ChekoutForm.get('adressform')?.get('UserId')?.setValue(this.userid);


    }
  }
) 

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

  public get Country()
  {
    return this.ChekoutForm.get('adressform')?.get('Country')
  }
  public get City()
  {
    return this.ChekoutForm.get('adressform')?.get('City')
  }
  public get Region()
  {
    return this.ChekoutForm.get('adressform')?.get('Region')
  }

  public get Email()
  {
    return this.ChekoutForm.get('adressform')?.get('Email')
  }
}
