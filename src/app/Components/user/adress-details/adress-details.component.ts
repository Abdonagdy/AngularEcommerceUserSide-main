import { IAdress } from './../../../models/iuser';
import { UserService } from 'src/app/Components/user/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/Services/translation.service';
import { user } from 'src/app/models/iuser';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-adress-details',
  templateUrl: './adress-details.component.html',
  styleUrls: ['./adress-details.component.css']
})
export class AdressDetailsComponent implements OnInit{
  langFlag:boolean=true;
  public currentLanguage: string='';
  islenght:boolean=false; 
  user!:user;
  AllAdrees:IAdress[]=[];
  constructor(private AddressService :UserService,
    private route:Router,
   private translationService: TranslationService,
    private translate: TranslateService ,private titleService: Title ,private UserSerice:UserService)
    {
  
    }
  ngOnInit(): void {
    
    this.titleService.setTitle('جميع العناوين مراكز مايز لصيانة السيارات افضل مراكز صيانة سيارات بالسعودية');
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
    this.UserSerice.getuserValue(token).subscribe(
     {
      next:(pro)=> {
        this.user=pro;
        if(this.user===null)
     {
      this.route.navigate(['/Home']);
       
     }
     else
     {
       this.AddressService.AllAdress(this.user.id).subscribe(
         (response) => {
           if(response.length !== 0)
           {
             this.islenght=true;
             this.AllAdrees=response;
           }
           else
           {
             
             this.islenght=false;
           }
              },
              (error) => {
                console.error('Error not Address:', error);
              }
       );
     }  
 }
      ,
      error:()=>Swal.fire('',`لقد حدث خطا ما الرجاء المحاوله مره اخرى` , 'error')
  
     } )




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
