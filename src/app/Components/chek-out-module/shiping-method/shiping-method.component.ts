import { Component, Injectable, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShipingMethod } from 'src/app/models/basket';
import { ChekoutServicesService } from '../services/chekout-services.service';
import { BasketService } from '../../basket-module/services/basket.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/Services/translation.service';
import { Title } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-shiping-method',
  templateUrl: './shiping-method.component.html',
  styleUrls: ['./shiping-method.component.css']
})
export class ShipingMethodComponent implements OnInit {
  @Input() ChekoutForm?: FormGroup;
   AllShiping : ShipingMethod[]=[];
  //  ivaraibe : any=[];
  langFlag:boolean=true;
  public currentLanguage: string='';

  private ShipingmethodSource : BehaviorSubject<ShipingMethod>;
  constructor(private get:ChekoutServicesService ,private basket :BasketService,private translationService: TranslationService,
    private translate: TranslateService,private titleService: Title)
  {
    this.ShipingmethodSource=new BehaviorSubject<ShipingMethod>(JSON.parse(localStorage.getItem("Shiping-id")!));
    translate.setDefaultLang('ar');
    this.langFlag=false;

  }
  get Shiping ()
  {
    return this.ShipingmethodSource.value;
  }
  ngOnInit(): void {
 this.titleService.setTitle('الدفع مراكز مايز لصيانة السيارات');
    this.get.GetShippingDetails().subscribe({

      next:(ship)=> {
        this.AllShiping=ship;
       }
      ,

      error:(err)=>console.log(err)

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

  setshiping(sipmethod :ShipingMethod)
  {
    this.basket.GetShipping(sipmethod)
    localStorage.setItem("Shiping-id",JSON.stringify(sipmethod))
  }

}
