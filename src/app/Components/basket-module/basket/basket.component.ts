import { UserService } from 'src/app/Components/user/services/user.service';
import { ProductService } from './../../product-module/services/product.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Basket, BasketItem, ShipingTotal } from 'src/app/models/basket';
import { BasketService } from '../services/basket.service';
import { TranslationService } from 'src/app/Services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Coupon } from 'src/app/models/iproduct';
import Swal from 'sweetalert2';
import { Order, OrderDetails } from 'src/app/models/check-out';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from 'src/app/models/iuser';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
basketitem:Observable<Basket |null> | undefined;
Shippingitem:Observable<ShipingTotal|null>| undefined;
// langFlag:boolean=true;
userinfo: Observable<user> | undefined;
couponCode = '';
@ViewChild('radioOption1') radioOption1: any;
isChecked: boolean = true;
appliedCoupon!: Coupon;
ApplyCodeForm:FormGroup=new FormGroup({Code:new FormControl('')});
items: Basket[] =JSON.parse(localStorage.getItem('basket_id')!);
total: number = 0;
langFlag:boolean=true;
public currentLanguage: string='';
returnurl:string="";
user!:user;
user2!:user;
constructor(private basket:BasketService
  ,private translationService: TranslationService,
  private translate: TranslateService,private productservise:ProductService,private meta:Meta,
  private route:Router ,private UserService:UserService,private titleService: Title,private activedservice:ActivatedRoute)
  {
          
  }

  ngOnInit(): void {
    this.titleService.setTitle('سلة التسوق مراكز مايز لصيانة السيارات');
    this.meta.addTag({name: 'author', content: 'Mize'});
    this.meta.addTag({name: 'robots', content: 'index, follow'});
    this.basketitem=this.basket.Basketid;
    this.Shippingitem=this.basket.ShippingTotal;
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

  inccrementitem(item:BasketItem)
  {
    this.basket.AddItemToBasket(item);
  }

  removeitem(id:number,quantity:number)
  {
    this.basket.removeitemFromBasket(id,quantity);
  }

  get Code()
  {
    return this.ApplyCodeForm.get('Code');
  }

  applyCoupon() {
    this.couponCode=this.ApplyCodeForm.controls['Code'].value ?? '';
    this.productservise.applyCoupon(this.couponCode).subscribe(
      {
        next:(pro)=> {
          if(pro !==null)
          {
            this.appliedCoupon=pro;
            localStorage.setItem('appliedCoupon',this.appliedCoupon.code)
             Swal.fire('',  `تهانيا لقد تم تفعيل كود الخصم` ,  'success')
  
          console.log(pro);
          this.couponCode=pro.code;
          this.appliedCoupon=pro;
         }
         else
         {
          Swal.fire('',  `كود الخصم منتهى الصلاحية او استخدم من قبل شكرا لك` ,  'error')
         }
        }
        
        ,
        error:(err)=>Swal.fire('',`لقد حدث خطا ما الرجاء المحاوله مره اخرى` , 'error')
  
      }
  
    );
    this.couponCode = '';
  
  }


  checkRadioButton() {    
   

    if (this.radioOption1.nativeElement.checked) {
        this.isChecked=true;
        const token = localStorage.getItem('token');
        this.UserService.getuserValue(token).subscribe(
          {
            next:(pro)=> {
              this.user2=pro;
              if(this.user2 ==null)
              {
                this.UserService.setReturnUrl(this.route.url)
                this.route.navigate(['/Login']);
              }
              else
              {
                this.route.navigateByUrl('/CheckOut');        
                
                        }          } }
                );
        
      }
    else {
     this.isChecked=false;
    }
  }

}
