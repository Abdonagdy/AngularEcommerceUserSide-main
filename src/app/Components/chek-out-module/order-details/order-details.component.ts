import { Component, OnInit } from '@angular/core';
import { IShopingMethod, Order, OrderDetails } from 'src/app/models/check-out';
import { ChekoutServicesService } from '../services/chekout-services.service';
import { UserService } from '../../user/services/user.service';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';
import { Iproduct } from 'src/app/models/iproduct';
import { Adress } from 'src/app/models/iuser';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/Services/translation.service';
import { Title } from '@angular/platform-browser';
import {ElementRef, ViewChild } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';



@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
 Order!: OrderDetails ;
 Orderid?: number;
 Prosucts:Iproduct[]=[];
  @ViewChild('sectionToPrint', { static: false })
  sectionToPrint!: ElementRef;
 Adress:Adress={
   city: "",
   country: "",
   region: "",
   email: "",
   id: 0,
   userId: 0,
   phone:""
 };
 id:any;
 date:any;
 total:any;
 status:any;
 tax:any;
 langFlag:boolean=true;
 userdetail:any;
 public currentLanguage: string='';
 ShopingMethod:any;
 ShopingMethodNAME:any;
 Shipping:any;
 username:any;
 fname:any;
 lname:any;
 email:any;
 phone:any;
 country:any;
 city:any;
 branch:any;
  constructor(private GetOrder:ChekoutServicesService ,private user :UserService ,private Route :ActivatedRoute,private translationService: TranslationService,
    private translate: TranslateService ,private titleService: Title ){

      (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
    }


  ngOnInit(): void {
   this.titleService.setTitle('تفاصيل الطلب مراكز مايز لصيانة السيارات')
   this.Orderid= this.Route.snapshot.paramMap.get('Ord')?Number(this.Route.snapshot.paramMap.get('Ord')):0;
  // console.log(this.Orderid)

    this.GetOrder.OrderDeatils(this.Orderid).subscribe({
      next:(ord)=>{
        if(ord!==undefined)
        this.Order=ord;
        this.Prosucts=this.Order.products;
        this.username=this.Order.userName;
        this.fname=this.Order.fname;
        this.lname=this.Order.lname;
        this.email=this.Order.email;
        this.country=this.Order.country;
        this.city=this.Order.city;
        this.branch=this.Order.branch;
        this.total=this.Order.total;
        this.status=this.Order.status;
        this.id=this.Order.id;
        this.date=this.Order.date;
        this.ShopingMethod=this.Order.shopingMethod;
        this.Shipping=this.Order.shipping;
        this.ShopingMethodNAME=this.Order.shopingMethod.name;
        this.tax=this.Order.tax; 
      },
      error:(erorr)=>{
        console.log(erorr)
      }

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
  }


  print()
  {
    location.reload();
    const sectionToPrint = document.getElementById('sectionToPrint');
    if (sectionToPrint) {
  
    document.write(`<html>
   <head>
     <meta charset="utf-8">
     <title>مراكز مايز لصيانة السيارات</title>
     <base href="/">
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <link rel="icon" type="image/x-icon" href="assets/WhatsApp Image 2023-10-04 at 2.25.05 PM.jpeg">
      <!-- Favicon -->
      <link href="assets/WhatsApp Image 2023-10-04 at 2.25.05 PM.jpeg" rel="icon">
   
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
     <link rel="preconnect" href="https://fonts.googleapis.com">
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@700&display=swap" rel="stylesheet">
     <link rel="preconnect" href="https://fonts.googleapis.com">
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@700&display=swap" rel="stylesheet">
     <link rel="preconnect" href="https://fonts.googleapis.com">
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     <link href="https://fonts.googleapis.com/css2?family=Cairo&display=swap" rel="stylesheet">
   
     <link rel="preconnect" href="https://fonts.gstatic.com">
     <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
     <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
   </head>`);
    window.document.write(sectionToPrint.innerHTML)
    document.write('</body></html>');
    print();
    close();
    location.reload();
    } else {
      console.log('Section with id "sectionToPrint" not found.');
    }
  }

  
genrate()
{
 
  const content = this.sectionToPrint.nativeElement.innerHTML;

  const docDefinition = {
    content: [
      {
        text: content,
      }
    ]
  };

  const pdfDoc = pdfMake.createPdf(docDefinition);
  pdfDoc.download('document.pdf');
}
}
