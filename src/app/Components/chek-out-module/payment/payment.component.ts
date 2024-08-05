import { ShipingMethod } from './../../../models/basket';
import { Order } from './../../../models/check-out';
import { Component, OnInit } from '@angular/core';
import { BasketItem } from 'src/app/models/basket';
import { AdressComponent } from '../adress/adress.component';
import { SignUpComponent } from '../../user/sign-up/sign-up.component';
import { BasketService } from '../../basket-module/services/basket.service';
import { ChekoutServicesService } from '../services/chekout-services.service';
import { CreatOrder, itemCart } from 'src/app/models/check-out';
import { ShipingMethodComponent } from '../shiping-method/shiping-method.component';
import { UserService } from '../../user/services/user.service';
import { Router } from '@angular/router';
import { Adress, user } from 'src/app/models/iuser';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/Services/translation.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit{
code:any=localStorage.getItem('appliedCoupon')!;
langFlag:boolean=true;
public currentLanguage: string='';
user!:user;
  constructor(private adressId:AdressComponent,private shipId:ShipingMethodComponent, private basket:BasketService ,private Check:ChekoutServicesService,private route :Router,  
    private translationService: TranslationService,private UserService:UserService,
    private translate: TranslateService,private titleService: Title
    ){}


  ngOnInit(): void {
  
    this.titleService.setTitle('الدفع مراكز مايز لصيانة السيارات')

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
 





MapingItemForOrder(item :BasketItem[]):itemCart[]
{
  let i:itemCart[]=[];


  for (const itemOrder of item) {
    let x:itemCart={
      productId: itemOrder.id,
      Price: itemOrder.price *itemOrder.quantity,
      Quantity: itemOrder.quantity
    }
  i.push(x);

    }
  return  i;

}
CreatOrder()
{

  const token = localStorage.getItem('token');
  this.UserService.getuserValue(token).subscribe(
    {
      next:(pro)=>
      {
        this.user=pro;
        let Adress=JSON.parse(localStorage.getItem('Adress_id')!);
        let  ShipingMethodid=JSON.parse(localStorage.getItem('Shiping-id')!);
        let itemCart :itemCart[]=[];
        const AdressId=Adress.id;
        const ShipingId =ShipingMethodid.id;
        const Total =this.basket.CurentshipingValue?.total;
        const basketid =this.basket.GetCurrentBasketValue?.items;
        const User =this.user.id;
        const code = this.code;
        if(basketid)
        {
            itemCart = this.MapingItemForOrder(basketid);
        }
       
        let Order :CreatOrder={
          total:Number(Total),
          shoppingmethodId: ShipingId,
          addressId:AdressId,
          userId: User,
          ItemsOfProductListCart: itemCart,
          code:code
        };
      
      this.Check.CreateOrder(Order).subscribe({
        next:(order)=>{
          localStorage.removeItem("basket_id");
          localStorage.removeItem("shipingTotal");
          localStorage.removeItem("appliedCoupon");
          localStorage.removeItem("Adress_id");
          localStorage.removeItem("Shiping-id");
          this.basket.basketsource.next(null);
          this.basket.basketTotalShippingsource.next(null);
          this.route.navigate(["OrderConfirmed"])
        },
        error:(err)=>{console.log(err);}
      })
      
      }
   
    }
  )
 
}

}
