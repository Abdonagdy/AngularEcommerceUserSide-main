import { Component, OnInit,  Renderer2 } from '@angular/core';
import { UserService } from '../../user/services/user.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { user } from 'src/app/models/iuser';
import { BasketService } from '../../basket-module/services/basket.service';
import { Basket, BasketItem } from 'src/app/models/basket';
import { TranslationService } from 'src/app/Services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from '../../product-module/services/product.service';
import { Icategory, Iproduct } from 'src/app/models/iproduct';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { transition } from '@angular/animations';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  price!: BasketItem;
  userinfo: Observable<user> | undefined;
  basketinfo: Observable<Basket | null> | undefined;
  title = 'مراكز مايز لصيانة السيارات';
  langFlag:boolean=true;
  currentLanguage:string='';
  //isregistred:any; 
  id:number=0;
  productByCategory: Iproduct[] = [];
  user1!:user;
  

  searchItems: Iproduct[] = [];
  prdOfferlist: Iproduct[] = [];
  catlist:Icategory[]=[];
  SelectedCatId: number = 0;
   x=localStorage.getItem('lang') as string;
  searchLanguage: string="en";
 
  constructor(public user: UserService,
    private Getid:ActivatedRoute ,
    private route: Router,
    private basket: BasketService,
    private translationService: TranslationService,
    private translate: TranslateService,
    private Productservice :ProductService,private renderer: Renderer2,private userservice:UserService
  ) { 
    
  }

  ngOnInit(): void {

   // this.userinfo = this.user.account;

   const token = localStorage.getItem('token');
   this.user.getuserValue(token).subscribe(
    {
      next:(pro)=> {
        this.user1=pro;
      }
    }
   )
    this.basketinfo = this.basket.Basketid;

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
  }
 
  closeMenuAndShowPage(pageName: string) {
    // إغلاق القائمة الجانبية - اعتمد على طريقة إغلاق القائمة في تطبيقك
      const offcanvasElement = document.getElementById('offcanvasScrolling');
      this.renderer.setStyle(offcanvasElement, 'display', 'none');
    
      this.userservice.setReturnUrl(this.route.url)
       // عرض الصفحة المختارة
       this.route.navigate([`/${pageName}`]);
       
    
  }
  clickMenuAndShowPage() {
    // إغلاق القائمة الجانبية - اعتمد على طريقة إغلاق القائمة في تطبيقك
     const offcanvasElement = document.getElementById('offcanvasScrolling');
      //  console.log(offcanvasElement)
       if(offcanvasElement)
       {
        this.renderer.setStyle(offcanvasElement, 'display', 'block');
        
       }
     else if(!offcanvasElement)
     {
      this.renderer.setStyle(offcanvasElement, 'display', 'none');    
     }
      
    // عرض الصفحة المختارة    
  }


  getcount(items: BasketItem[]) {
    // return  items.reduce((sum,item)=>sum+item.quantity,0);
    return items.reduce((sum, item) => sum + item.quantity, 0)
  }
  
  Logout() {
    this.user.LogOut();
    
  }
  switchToArabic() {
    
    const offcanvasElement = document.getElementById('offcanvasScrolling');
    this.renderer.setStyle(offcanvasElement, 'display', 'none');
    this.translate.use('ar');
    this.langFlag=false;
    localStorage.setItem('lang', 'ar');
    this.translationService.setLanguage("ar");
  

  }
  switchToEnglish() {
    const offcanvasElement = document.getElementById('offcanvasScrolling');
    this.renderer.setStyle(offcanvasElement, 'display', 'none');
    this.translate.use('en');
    this.langFlag=true;
    localStorage.setItem('lang', 'en');
    this.translationService.setLanguage("en");
  }

  VeiwProductCategory(id:any)
  {
    const offcanvasElement = document.getElementById('offcanvasScrolling');
    this.renderer.setStyle(offcanvasElement, 'display', 'none');
  
  // عرض الصفحة المختارة
          this.id=Number(id);  
          const catnaem="باقات غيار زيت المحرك والفلتر"; 
          
              this.route.navigate(['Category',catnaem,id])
            //  console.log(pro)

            
       

 }
 filterByName(item: any) {
  
      this.Productservice.GetallProduct().subscribe(
      {
        
        next:(pro)=> {
          this.searchItems=pro.filter((b) =>
          {
            
            const itemName = b.name.toUpperCase();
            const itemNameen = b.nameEN.toUpperCase();
            const searchQuery = item.toUpperCase();

            // Check if item name, service code, or price contains the search query
            const nameMatch = itemName.includes(searchQuery);
            const nameMatchen = itemNameen.includes(searchQuery);
            const priceMatch = b.price && b.price.toString().includes(searchQuery);
            const serviceCodeMatches = b.serviceCode.includes(searchQuery);
              return nameMatch ||  priceMatch || nameMatchen ||  serviceCodeMatches;
          }
        
    );
    if (item =="" ||item.length ==0) {
      this.searchItems = [];
    }
      
       }
        ,
        error:(err)=>console.log(err)
      }

    );


}
keyfilterByName(item:string)
{
  if (item == "" || item.length == 0) {
    this.searchItems = [];
  }
 
}


  OpenPrdDetails(id:number){
      this.route.navigate(["Category",id])
    }
  
    VeiwProduct(item :any)
    {
      const id = item.id;
      const name=item.name;
      const catename=item.categoryName;
     // Get the current URL using Router
     this.searchItems = [];
     window.location.href = this.route.serializeUrl(this.route.createUrlTree(["ProductDetails",item.categoryName,name,id]));

    }

    navigateWithReferralCode(): void {
      const referralCode = 'yourReferralCode'; // Replace with the actual referral code
      this.route.navigate(['/signup'], { queryParams: { referralCode } });
    }



    checkRadioButton() {    
      this.userservice.setReturnUrl(this.route.url)       
      this.route.navigateByUrl('/Login');
    }
  }


