import { Component, OnChanges, OnInit } from '@angular/core';
import { ProductsComponent } from '../products/products.component';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/Services/translation.service';
import { Icategory, Iproduct } from 'src/app/models/iproduct';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-filter-aside',
  templateUrl: './filter-aside.component.html',
  styleUrls: ['./filter-aside.component.css'],


})
export class FilterAsideComponent implements OnInit ,OnChanges {

minPrice: string = "0";
maxPrice: string = "10000";
category:Icategory[]=[];
products:Iproduct[] = [];
 Catid:Icategory | undefined;
 catid:string="";
 public currentLanguage: string='';
value:number=0;
 langFlag:boolean=true;

  constructor(private prod:ProductService ,private route :Router,
    private translationService:TranslationService,private translate: TranslateService){

  

}
  ngOnInit(): void {

 
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
  this.prod.GetAllCategory().subscribe(
    {
      next:(Category:Icategory[])=>{
            this.category=Category;
      },
      error:(err)=>{
        console.log(err)
  
      }
    }
  
    );

  }


  ngOnChanges(): void
  {
    // return this.SendCategoryURL(this.Catid)
    this.prod.GetallProduct().subscribe(
      {
        next:(pro)=> {
          this.products=pro;
    
         }
        ,
        error:(err)=>console.log(err)
      }

    );
  }


SendCategoryURL(cat:any,id:any)
{
  this.route.navigate(['Category',cat,id])
}
SendCategoryURL1()
{
  this.route.navigate(['/Offers'])
}
change(e:any)
{
  this.value = e.target.value;
  console.log(this.value); 

}
applyPriceFilter(min: string, max: string) {

  this.route.navigate(['/Price', min, max]);  
 
}
}
