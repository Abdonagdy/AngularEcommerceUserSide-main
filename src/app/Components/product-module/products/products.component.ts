import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { IaddWishlist, Iproduct } from 'src/app/models/iproduct';
import { ProductService } from '../services/product.service';
import { BasketService } from '../../basket-module/services/basket.service';
import { TranslationService } from 'src/app/Services/translation.service';
import { user } from 'src/app/models/iuser';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../user/services/user.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  Allproduct:Iproduct[]=[];
  ProductBasket!: Iproduct;
  totalLength:any;
  IaddWishlist!:IaddWishlist;
  page:number=1;
  langFlag:boolean=true;
  public currentLanguage: string='';
  user!:user;

  @Input() product!: Iproduct;
constructor(private Productservice :ProductService,
  private basket:BasketService,private userservice:UserService,
  private route:Router,
  private translationService:TranslationService,
  private translate: TranslateService,private titleService: Title
  ){
}
  ngOnInit():void {

    this.titleService.setTitle('جميع خدمات مراكز مايز لصيانة السيارات افضل مراكز صيانة بالمملكه العربية السعودية');
    this.Productservice.GetallProduct().subscribe(
      {
        next:(pro)=> {
          this.Allproduct=pro;
          this.totalLength=pro.length;
      
         }
        ,
        error:(err)=>console.log(err)
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
        title: 'هل تود إرسال المنتج إلى سلة التسوق',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'نعم اود إرسالة',
        cancelButtonText: 'لا اود إرسالة',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.basket.AddItemToBasket(item)
          swalWithBootstrapButtons.fire({
            title: 'هل تود الذهاب إلى سلة التسوق',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'نعم اود الذهاب الى السلة',
            cancelButtonText: 'تواصل التسوق',
            reverseButtons: true
          }).then((result)=>
          {
          if(result.isConfirmed)
          {
              this.route.navigate(['basket'])
          }
          else
          {
            swalWithBootstrapButtons.fire(
              'شكرا لك',
             
            )
          }
        }
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'شكرا لك لم يتم ارسال هذا المنتج إلى السلة',
           
          )
        }
      })
  
    }

    VeiwProduct(item:any) {
      const id = item.id;
      const name=item.name;
      this.route.navigate(["ProductDetails",name,id])
  
    }

   AddProductToWishlist(Uid:number)
   {
    const token = localStorage.getItem('token');

    this.userservice.getuserValue(token).subscribe(
      {
       next:(pro)=> {
         this.user=pro;
         if(this.user===null)
      {
        Swal.fire('',`قم بالتسجيل اولا` , 'error');
        
      }
      else
      {
        this.IaddWishlist={
          uid:this.user.id,
          pid:Uid
        
        }
        
        this.Productservice.addtowishlist(this.IaddWishlist).subscribe(
          {
            next:(pro)=> {
              
              if(pro.result==="Done")
              {
                Swal.fire('',  `لقد تم اضافة المنتج الى المفضلة` ,  'success')
 
              }
              else 
              {
                Swal.fire('',`هذا المنتج موجود فى قائمتك المفضلة` , 'error');
                console.log(pro.result)
 
              }
             }
            ,
            error:(err)=>Swal.fire('',`لقد حدث خطا ما الرجاء المحاوله مره اخرى` , 'error')
 
          }
    
        );
      }}
       
       ,
       error:()=>Swal.fire('',`لقد حدث خطا ما الرجاء المحاوله مره اخرى` , 'error')
   
   
      } )
        
   }

   DeleteProductToWishlist(Uid:number)
   {
      if(this.user===null)
      {
        Swal.fire('',`قم بالتسجيل اولا` , 'error');
      }
      else
      {
        this.IaddWishlist={
          uid:this.user.id,
          pid:Uid
        
        }
        
        this.Productservice.addtowishlist(this.IaddWishlist).subscribe(
          {
            next:(pro)=> {
              
              if(pro.result==="Done")
              {
                Swal.fire('',`لقد تم اضافة المنتج الى المفضلة`,  'success')

              }
              else 
              {
                Swal.fire('',`لقد قمت بإضافة هذا المنتج من قبل` , 'error');
                console.log(pro.result)

              }
             }
            ,
            error:(err)=>Swal.fire('',`لقد حدث خطا ما الرجاء المحاوله مره اخرى` , 'error')

          }
    
        );
      }

       //this.basket.AddItemToBasket(item)
   }


}


