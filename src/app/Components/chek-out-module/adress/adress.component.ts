import { UserService } from 'src/app/Components/user/services/user.service';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckOutComponent } from '../check-out/check-out.component';
import { ChekoutServicesService } from '../services/chekout-services.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Adress, IAdress, user } from 'src/app/models/iuser';
import { ReversationService } from '../../reversation-module/services/reversation.service';
import { IBransh, IMadina } from 'src/app/models/Ireservation';
import { TranslationService } from 'src/app/Services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-adress',
  templateUrl: './adress.component.html',
  styleUrls: ['./adress.component.css']
})
export class AdressComponent implements OnInit{
  userinfo: Observable<user> | undefined;
  @Input() ChekoutForm?: FormGroup;
  AllAdrees:IAdress[]=[];
  langFlag:boolean=true;
  public currentLanguage: string='';
  
  addss:any= localStorage.getItem("Adress_id");
  message: boolean=false;
  message1:boolean=false;
  AllMadina:IMadina[]=[];
  AllMadina1:any;
  AllBranshs:IBransh[]=[];
  user!:user;
  private AdressSubject :BehaviorSubject<Adress>;
  selectedBranch: string = '';

  constructor(public adress:CheckOutComponent,private chekout:ChekoutServicesService,private toastr: ToastrService,
    private Productservice :ReversationService,private AddressService :UserService,private UserService:UserService,private route:Router
    
    ,private translationService: TranslationService,
    private translate: TranslateService,private titleService: Title){  
    this.AdressSubject=new BehaviorSubject<Adress>(JSON.parse(localStorage.getItem("Adress_id")!));

   
    
  }
  get adressvalue()
  {
    return this.AdressSubject.value;
  }


  ngOnInit(): void {
    this.titleService.setTitle('الدفع مراكز مايز مايز لصيانة السيارات');

    const token = localStorage.getItem('token');
    this.AddressService.getuserValue(token).subscribe(
      {
        next:(pro)=> {
          this.user=pro;
        
         
    if(this.user !=null){
      this.AddressService.AllAdress(this.user.id).subscribe(
        (response) => {
          this.AllAdrees=response;
             },
             (error) => {
               console.error('Error not address:', error);
             }
      );
     
      this.Productservice.GetallMadina().subscribe(
        {
          next:(pro)=> {
            this.AllMadina=pro;
           }
          ,
          error:(err)=>console.log(err)
        });
     
      }
      else
      {
        
        this.UserService.savePreviousPage('/CheckOut')
        this.route.navigate(['/Login'])
      }
    
       
        }

        });



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
  
SafeUserAddress()
{
    this.chekout.AddUserAdress(this.ChekoutForm?.get('adressform')?.value).subscribe({
      next:(form)=>{
        this.toastr.success('تم إضافة عنوانك بنجاح');
        localStorage.setItem("Adress_id",JSON.stringify(form))
        this.message=true;


      },
      error:(error)=>{
        console.log(error)
        this.toastr.error('حصل خطأ أثناء إضافة العنوان الرجاء المحاوله مره اخرى');
      }
    });
}
PayUserAddress(add:any)
{
  const addd =
  {
    userId:this.user.id,
  city:add.city,
  region:add.region,
  country:add.country,
  email:add.email
  }
  this.chekout.AddUserAdress(addd).subscribe({
    next:(form)=>{
      this.toastr.success('تم الدفع بهذا العنوان ');
      localStorage.setItem("Adress_id",JSON.stringify(form))
      this.message1=true;


    },
    error:(error)=>{
      console.log(error)
      this.toastr.error('حصل خطأ أثناء إضافة العنوان الرجاء المحاوله مره اخرى');
    }
  });
}
onDelete(id: number): void {
  Swal.fire({
    title: "هل انت متاكد من حذف هذا العنوان ؟",
    text: "لن تستطيع استعادتة مره اخرى!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText:"لا تقم بحذفة",
    confirmButtonText: "نعم قم بحذفة"
  }).then((result) => {
    if (result.isConfirmed) {
      this.AddressService.DeleteAdress(id).subscribe(
        response => {
          if(response ===true)
          {
  
          Swal.fire({
            title: "لا اريد حذف هذا العنوان",
            text: "لقد تم حذفة بنجاح",
            icon: "success"
          });
          window.location.reload();
        }
      
      else
      {
        Swal.fire({
          
          text: "لم يتم حذف العنوان",
          icon: "success"
        });
      }
      })}});
}
onSelectChange(event:any)
{
  const id = event.value;
  this.Productservice.GetallBransh(id).subscribe(
    {
      next:(pro)=> {
       
        this.AllBranshs=pro;
       }
      ,
      error:(err)=>console.log(err)
    });
}
}
