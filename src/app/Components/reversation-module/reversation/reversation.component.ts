import { AppointmentReversions, IMadina } from './../../../models/Ireservation';
import { IndexComponent } from './../../product-module/index/index.component';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IBransh, IbranshReservation } from 'src/app/models/Ireservation';
import { ReversationService } from '../services/reversation.service';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/Services/translation.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Iuser, user } from 'src/app/models/iuser';
import { TranslateService } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';
import { UserService } from '../../user/services/user.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-reversation',
  templateUrl: './Reversation.component.html',
  styleUrls: ['./Reversation.component.css']
})
export class ReversationComponent implements OnInit,OnChanges {
  isChecked1:boolean=false;
  selectedOption: string=''; // قيمة الخيار المحدد
  previousOption:string='';
  showResults: boolean = false; // تتبع إظهار النتائج
  isFriday!: boolean;
  AllBranshs:IBransh[]=[];
  branshreservation:IBransh[]=[];
  AllMadina:IMadina[]=[];
  AllReservation:AppointmentReversions[]=[];
  Branshes:IBransh={
    brannum: 0,
    braname: '',
    phone: '',
    location: '',
    imageURL: '',
    appointmentReversions:[]
  };
  phone:any;
  location:any;
  selectedDate!: string;
  name:any;
  Allres:AppointmentReversions[]=[];
  public currentLanguage: string='';
  user!:user;
  tutu:boolean=true;
  RegisterForm:FormGroup=new FormGroup({});
  notfoundapp:boolean=false;
   //d:any=Date.now; 
  ischeckedWithOutBoolean: any=true;
  isclicked:boolean=true; 
  displayParameter:any;
  count:number=0;
  currentDate: string = new Date().toISOString().split('T')[0]; // تاريخ اليوم الحالي
  currentDate1: Date = new Date();
  currentDay!: number;
  selectedItem: any;
  prevSelectedItem: any;
  
  langFlag:boolean=true;

  urldesc:any;

  Allbranch:any;
  @Input() myInputValue: string | undefined;
  constructor(private Productservice :ReversationService,
    private route:Router,private userservie:UserService,
    private translationService:TranslationService,private fb:FormBuilder,private translate: TranslateService,private titleService: Title,private metaService: Meta)
    {
      this.RegisterForm=this.fb.group(
        {
          UserName:['',[Validators.required,Validators.pattern("[A-Za-z0-9]{3,50}")]],
          se:["",[Validators.required]],
          radio1:["",[Validators.required]],
           date:[(new Date()).toISOString().substring(0,10),[Validators.required]],
           Email:['',[Validators.required]],
           PhoneNumber:['',[Validators.required, Validators.pattern("(05)([0-9]{8})"),
           Validators.minLength(10), Validators.maxLength(10)]],
           Maintaence:['',[Validators.required]]
        });
    }
  ngOnChanges(changes: SimpleChanges): void {
  
    if (changes['myInputValue']) {
      this.selectedItem = changes['myInputValue'].previousValue;
      this.previousOption = changes['myInputValue'].currentValue;
   
    }
   this.getBranchData(changes['myInputValue'].currentValue)
  }


  ngOnInit():void {
    this.titleService.setTitle('حجز موعد صيانة بمراكز مايز لصيانة السيارات');
    this.metaService.updateTag({ name: 'description', content:'حجز موعد صيانة في  مراكز مايز لصيانة السيارات، يمكنك من خلال هذه الصفحة البحث عن موعد متوفر في أحد مراكزنا و سوف يصلكم رسالة نصية عند تأكيد الحجز' });
    this.metaService.updateTag({name:'keywords',content:'موعد صيانة سيارة - مواعيد الصيانة في مراكز مايز لخدمات و صيانة السيارات - جدة - الرياض - المدينة - مكة - خميس مشيط - جيزان'})
    this.metaService.addTag({name: 'robots', content: 'index,follow'});
    this.metaService.addTag({name: 'author', content: 'Mize'});
    this.urldesc=`الرئيسية < حجز موعد صيانة`;
    this.Productservice.GetallBransh1().subscribe(
      {
        next:(pro)=> {
          this.AllBranshs=pro;
   
         }
        ,

        error:(err)=>console.log('لقد حدث خطا ما')

      })

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
    
  
    const token = localStorage.getItem('token');
    this.userservie.getuserValue(token).subscribe(
      {
        next:(pro)=> {
          this.user=pro;
        
          if(this.user==null){
            this.RegisterForm=this.fb.group(
              {
                UserName:['',[Validators.required,Validators.pattern("[A-Za-z0-9]{3,50}")]],
                se:["",[Validators.required]],
                radio1:["",[Validators.required]],
                 date:[(new Date()).toISOString().substring(0,10),[Validators.required]],
                 Email:['',[Validators.required]],
                 PhoneNumber:['',[Validators.required, Validators.pattern("(05)([0-9]{8})"),
                 Validators.minLength(10), Validators.maxLength(10)]],
                 Maintaence:['',[Validators.required]]
              }
        
            );
            
          }
       else{
          this.RegisterForm=this.fb.group(
            {
              UserName:[this.user.username,[Validators.required,Validators.pattern("[A-Za-z0-9]{3,50}")]],
              se:["",[Validators.required]],
              radio1:["",[Validators.required]],
               date:[ (new Date()).toISOString().substring(0,10),[Validators.required]],
               Email:[this.user.email,[Validators.required]],
               PhoneNumber:[this.user.phoneNumber,[Validators.required]],
               Maintaence:['',[Validators.required]]
            }
      
          );    
        }

        }});

    

    
// this.Productservice.GetallMadina().subscribe(
//   {
//     next:(pro)=> {
//       this.AllMadina=pro;
//    //   console.log(this.AllBranshs)
//      }
//     ,

//     error:(err)=>console.log('لقد حدث خطا ما')

//   })
  // this.Productservice.GetAllBransh().subscribe(
  //   {
  //     next:(pro)=> {
  //       this.Allbranch=pro;
  //       console.log(this.Allbranch)
  //      }
  //     ,
  
  //     error:(err)=>console.log('لقد حدث خطا ما')
  
  //   })



this.Productservice.Getallreservation().subscribe(
  {
    next:(pro)=> {
      this.AllReservation=pro;
        
         }     ,

    error:(err)=>console.log(err)

  }
  
)   


}



  get UserName()
  {
    return this.RegisterForm.get('UserName');
  }

  get se()
  {
    return this.RegisterForm.get('se');
  }
  get radio1()
  {
    return this.RegisterForm.get('radio1');
  }
  get date()
  {
    return this.RegisterForm.get('date');
  }

  get Email()
  {
    return this.RegisterForm.get('Email');
  }
  get PhoneNumber()
  {
    return this.RegisterForm.get('PhoneNumber');
  }
  get Maintaence()
  {
    return this.RegisterForm.get('Maintaence');
  }
 
onOptionChange()
{ 

  if (this.selectedOption === this.previousOption && this.selectedOption !== '') {
     this.getBranchData(this.previousOption)
     
    }
     else {
      this.getBranchData(this.selectedOption)
    }
    this.previousOption = this.selectedOption;  
}

checkAppoinment()
{
  let date:any = this.RegisterForm.get('date')?.value;
  let brach:any = this.RegisterForm.get('se')?.value;
  let main :any= this.RegisterForm.get('Maintaence')?.value;
  
        this.Productservice.Getallreservationbransh(brach,date,main).subscribe(
          {
            next:(pro)=> {
            this.Allres=pro;  

             this.Allres.forEach(element => {
                if(element.isav == false)
                this.count++; 
             });
          if(pro.length==this.count)
          {
            console.log(this.count)
              this.notfoundapp=true;
              this.RegisterForm=this.fb.group(
                {
                  UserName:[this.user.username,[Validators.required,Validators.pattern("[A-Za-z]{3,50}")]],
                  se:["",[Validators.required]],
                  radio1:["",[Validators.required]],
                   date:[(new Date()).toISOString().substring(0,10),[Validators.required]],
                   Email:[this.user.email,[Validators.required]],
                   PhoneNumber:[this.user.phoneNumber,[Validators.required]],
                   Maintaence:['',[Validators.required]]

                })
              
          }
          else
          {
              this.notfoundapp=false;
              this.Allres=pro;      
          }
             
             }
            ,
            error:(err)=>console.log(err)
          });
}


CreateReservation()
{
  const data=this.RegisterForm.value;
this.ischeckedWithOutBoolean=false;
Swal.fire({
  title: 'هل انت متاكد من حجز الموعد',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'نعم قم بحجز الموعد'
}).then((result) => {
  if (result.isConfirmed) {
      this.Productservice.Register(data,this.ischeckedWithOutBoolean).subscribe({

      next:(c)=>{
     if(c.message==="لقد تم حجز هذا الموعد من قبل شكرا لكم")
        {
        Swal.fire(this.user.username,c.message , 'error');
      }
      else
      {
        Swal.fire('',`لقد تم حجز الموعد بنجاح برقم ${c.revnumber} مركز فرع ${c.branshname}      شكرا لكم` ,  'success')
        Swal.fire({
          title: `لقد تم حجز الموعد بنجاح برقم ${c.revnumber}  ${c.branshname}      شكرا لكم`,
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff",
          backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `
        }).then((result) => {
          /* Read more about handling dismissals below */
          location.reload();
          if (result.dismiss === Swal.DismissReason.timer) {
          }
        });
        
      }
      },
      error:(err)=>{
        Swal.fire(this.user.username, 'لقد حصل خطا أثناء حجز الموعد حاول مره آخرى ', 'error')
    
      }
     });
  }
})

}





getBranchData(r:string)
{
  this.Productservice.Bransh(Number(r)).subscribe({
    next:(c)=>{
      this.Branshes=c;
      this.phone=c.phone;
      this.location=this.Branshes.location;
      this.name=this.Branshes.braname
      Swal.fire({
        title: `<strong class="mt-2 mb-2">${this.name}</strong>`,
        icon: 'info',
        html:
          `<a href=${this.location} class="mt-2 mb-2 text-decoration-none ">موقع الفرع</a></br> </br>`+
          `<strong><a href="tel:${this.phone}" class="text-decoration-none mt-2 mb-2">  رقم التليفون للتواصل عن طريق مكالمة هاتفية:${this.phone}</a></strong>`,
        // showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          'هل تود الاستمرار فى عملية الحجز',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          'اريد التواصل مع خدمة عملاء الفرع عن طريق الواتس اب',
        cancelButtonAriaLabel: 'Thumbs down'
      }).then((result) => {
    
        if (result.isConfirmed) {
           
        }
        else if (result.isConfirmed ===false){          
          window.location.href =  `https://api.whatsapp.com/send/?phone=%2B${this.phone}&text&type=phone_number&app_absent=0`;
        }
      })
    },
    error:(err)=>{
   
      console.log(err);}
    });
}

onSelectChange(value: any) {
  if (value.value != this.prevSelectedItem) {
    this.getBranchData(value.value)
    // Perform your desired action here when the same option is selected twice
  }
  else
  {
  }
  this.prevSelectedItem = value;
}


}