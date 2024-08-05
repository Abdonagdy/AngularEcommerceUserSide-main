import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/Services/translation.service';
import { user } from 'src/app/models/iuser';
import { ReversationService } from '../../reversation-module/services/reversation.service';
import Swal from 'sweetalert2';
import { ProductService } from '../services/product.service';
import { Iproduct } from 'src/app/models/iproduct';
import { BasketService } from '../../basket-module/services/basket.service';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from '../../user/services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit{
  langFlag:boolean=true;
 public currentLanguage: string='';
  
  user!:user;
  ProductWishList: Iproduct[]=[];
  ProductBasket!: Iproduct;
  isregistred:boolean=true;
  islenght:boolean=false;
  urldesc:any;

  constructor(private Productservice :ProductService,
    private route:Router,
    private translationService:TranslationService,private fb:FormBuilder, private basket:BasketService,private user1: UserService
   ,private translate: TranslateService,private titleService: Title ){
  
  }

  ngOnInit(): void {

    this.titleService.setTitle('المفضلة مراكز مايز لصيانة السيارات افضل مراكز صيانة سيارات فى السعوديه');
  //  this.userinfo = this.user1.account;

  this.urldesc=`الرئيسية < المفضلة`
  const token = localStorage.getItem('token');
  this.user1.getuserValue(token).subscribe(
   {
    next:(pro)=> {
      this.user=pro;
      if(this.user===null)
   {
     this.isregistred=false;
     
   }
   else
   {
    this.isregistred=true;
     this.Productservice.Showwishlist(this.user.id).subscribe(
       {
         next:(pro)=> {
             
       
         this.ProductWishList=pro;
             if(pro.length === 0 )
             {
              this.islenght=false;
             }
             else
             {
              this.ProductWishList=pro;
              this.islenght=true;
             }

          }
         ,
         error:(err)=>Swal.fire('',`لقد حدث خطا ما الرجاء المحاوله مره اخرى` , 'error')

       })
 
    }}
    
    ,
    error:()=>Swal.fire('',`لقد حدث خطا ما الرجاء المحاوله مره اخرى` , 'error')


   } )
     

     
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

  AddProductToBasket(item :Iproduct)
  {

   
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mx-2'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'تود ارسالة الى السله؟',
      text: "اليس كذلك!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'نعم اود إضافته',
      cancelButtonText: 'لا شكرا',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.basket.AddItemToBasket(item);
        swalWithBootstrapButtons.fire(
          'تم إرساله الى السله',
          'تم نقلة بنجاح',
          'success'
          
        ).then((result)=>
        {
         if(result.isConfirmed)
         this.Productservice.deleteitemfromwishlist(this.user.id,item.id).subscribe(
          {
            next:(pro)=> {
              
                //  Swal.fire('',`لقد تم ارساله الى السلة`,'success');
              
              if(pro===true)
              {
                document.location.reload();
             
              }
              else 
              {
                Swal.fire('',`لم يتم إرسالة إلى السلة` , 'error');
                console.log(pro)
    
              }
             }
            ,
            error:(err)=>Swal.fire('',`لقد حدث خطا ما الرجاء المحاوله مره اخرى` , 'error')
    
          }
    
        );
    
        })
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

  deletefromwishlist(id:number)
  {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mx-2'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ).then((result)=>
        {
         if(result.isConfirmed)
         this.Productservice.deleteitemfromwishlist(this.user.id,id).subscribe(
          {
            next:(pro)=> {
              
                 Swal.fire('',`لقد تم حذف المنتج من المفضلة`,'success');
              
              if(pro===true)
              {
                document.location.reload();
             
              }
              else 
              {
                Swal.fire('',`لم يتم حذف المنتج من المفضلة` , 'error');
                console.log(pro)
    
              }
             }
            ,
            error:(err)=>Swal.fire('',`لقد حدث خطا ما الرجاء المحاوله مره اخرى` , 'error')
    
          }
    
        );
    
        })
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
