import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/check-out';
import { ChekoutServicesService } from '../services/chekout-services.service';
import { UserService } from '../../user/services/user.service';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/Services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { user } from 'src/app/models/iuser';


@Component({
  selector: 'app-all-order',
  templateUrl: './all-order.component.html',
  styleUrls: ['./all-order.component.css']
})
export class AllOrderComponent implements OnInit{
  OrderDetails:Order[]=[];
  userId!: number;
  name!:string;
  langFlag:boolean=true;
  isregistred:boolean=true;
  islenght:boolean=false;
  public currentLanguage: string='';

  user1!:user;
  constructor(private GetOrder:ChekoutServicesService ,private user :UserService, private route :Router
    , private translationService: TranslationService,private titleService: Title,
    private translate: TranslateService){
  
    }
  ngOnInit(): void {
    console.log('hello')
    this.titleService.setTitle('جميع الطلبات مراكز مايز لصيانة السيارات');
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

    this.user.getuserValue(token).subscribe(
      {
        next:(pro)=> {
          this.user1=pro;
          if(this.user1 !=null)
          {  
            this.isregistred=true;  
            this.userId=this.user1.id;
            this.GetOrder.AllOrder(this.userId).subscribe({
           
            next:(order)=>{
              if(order.length === 0 )
                   {
                    this.islenght=false;
                   }
                   else
                   {
                    
                      this.OrderDetails=order;
                       
                       this.islenght=true;
                     }
                 },
            error:(erorr)=>{
              
            }
      
          })
          this.name= this.user1.username;//this.user.userValue.username;
        }
        else if(this.user1==null)
            {
              this.isregistred=false;
            }
      
        
        }
      }
    )
  }




 OderId(id:number)
 {
  this.route.navigate(["OrderDetials",id])

 }
}
