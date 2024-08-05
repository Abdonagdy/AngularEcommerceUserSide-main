import { user } from './../../../models/iuser';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Coupon, IReview, IaddWishlist, Iproduct, IproductDetails, Review } from 'src/app/models/iproduct';
import { TranslationService } from 'src/app/Services/translation.service';
import { Observable } from 'rxjs';
import { Basket, BasketItem, ShipingTotal } from 'src/app/models/basket';
import { BasketService } from '../../basket-module/services/basket.service';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { CurrencyPipe } from '@angular/common';
import { IBlog } from 'src/app/models/Iblog';
import { UserService } from '../../user/services/user.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productid :number  | undefined;
  PoductDetails!: IproductDetails;
  src!: string;
  ProductBasket!: Iproduct;
  ProductBasket1: Iproduct[]=[];
  count:number=1;
  ImageCount=0;
  img:any;
  inputprice:number=100;
  name:any;
  description:any;
  discountPercentage:any;
  oldPrice:any;
  price:any;
  serviceCode:any;
  quantity:any;
  shortDescription:any;
  shortDescriptionen:any;
  nameEn:any;
  descriptionen:any;
  descriptionenen:any;
  CtegoryId:any;
  metaKeywords:any; 

  metaDescription:any; 

 metaTitle:any; 

 seName:any;
  public currentLanguage: string='';
  basketitem:Observable<Basket |null> | undefined;
Shippingitem:Observable<ShipingTotal|null>| undefined;
user!:user;
public reviews: IReview[] = [];
public reviews1: Review[] = [];
isPrinted:boolean=false;
commentreslut:any;
langFlag:boolean=true;
articals:IBlog[]=[];
catname:any;
desc:boolean=true;
urldesc:any;
reviewForm = new FormGroup({
 username: new FormControl(''),
 comment: new FormControl(''),
 ratingValue: new FormControl(0),
});
IaddWishlist!:IaddWishlist;
// langFlag:boolean=true;


@ViewChild('htmlContainer') htmlContainer!: ElementRef;
  constructor(private Getid:ActivatedRoute ,private userservice:UserService,
    private productservise:ProductService,
    private translationService:TranslationService ,private translate: TranslateService,private basket:BasketService,private route:Router,private titleService: Title,private meta: Meta)
  {
    
   }

  ngOnInit(): void {



this.Getid.paramMap.subscribe(
  param=>{

  }
)


 
this.productid=Number (this.Getid.snapshot.paramMap.get("id")); 
const Catname =String(this.Getid.snapshot.paramMap.get('name')) ;
const Catname1 =String(this.Getid.snapshot.paramMap.get('catename'));
this.productservise.GetProductById(this.productid).subscribe(
{
  next: (pro)=>
   {
    this.PoductDetails=pro;
    this.seName=this.PoductDetails.seName;
    this.metaTitle=this.PoductDetails.metaTitle;
    this.metaKeywords=this.PoductDetails.metaKeywords;
    this.metaDescription=this.PoductDetails.metaDescription;
    this.img=this.PoductDetails.images ;
    this.name=this.PoductDetails.name;
    this.nameEn=this.PoductDetails.nameEN;
    this.description=this.PoductDetails.description;
    this.descriptionen=this.PoductDetails.descriptionEN;
    this.htmlContainer.nativeElement.innerHTML = this.description;
    this.discountPercentage=this.PoductDetails.discountPercentage;
    this.quantity=this.PoductDetails.quantity;
    this.price=this.PoductDetails.price;
    this.oldPrice=this.PoductDetails.oldPrice;
    this.serviceCode=this.PoductDetails.serviceCode;
    this.shortDescription=this.PoductDetails.shortDescription;
    this.shortDescriptionen = this.PoductDetails.shortDescriptionEN;
    this.CtegoryId=this.PoductDetails.categoriesNames;
    this.ImageCount=0;
    this.catname=this.PoductDetails.categoryName;   
    this.articals=this.PoductDetails?.articals;
    if(this.PoductDetails.description == null)
    {
      this.desc=false;
    }
    this.titleService.setTitle(this.metaTitle); 

    this.meta.addTag({name: 'seoname', content: this.seName });
    this.meta.updateTag({name: 'keywords', content: this.metaKeywords });
    this.meta.updateTag({name: 'description', content: this.metaDescription });
    this.meta.addTag({name: 'robots', content: 'index,follow'});
    this.meta.addTag({name: 'author', content: 'Mize'});
console.log(this.CtegoryId)
    this.urldesc=`الرئيسية < ${Catname1} < ${this.name}`
  },
  error:(err)=>console.log(err)
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
      
    } // Do translation logic hereeeeeeee
});
  this.productservise.getAll(this.productid).subscribe((reviews) => {
    this.reviews1 = reviews;
  });



  }
   calculateDiscountedPrice(originalPrice: number, discountPercentage: number): number {
    let discountAmount = (originalPrice * discountPercentage) / 100;
    let discountedPrice = originalPrice - discountAmount;
    return discountedPrice;
  }

  getSrc(src:string)
  {
    this.src=src;
  }

  inccrementitem(item:any)
  {
    
    this.ProductBasket1.push(item)
    this.count++;
  }

  removeitem()
  {
    if(this.count ===1)
      this.count = 1;
  else
  {
    this.ProductBasket1.pop()
    this.count--;   
  }
  }
  handleChange(value: any) {
    this.inputprice = value.value;  
  }

  additemtobasket()
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
  if(this.count >=1 )
   {
    if(this.PoductDetails.name =='صيانة عامة')
    {
      if(this.inputprice >=100)
      {
        this.PoductDetails.price=this.inputprice;
        this.ProductBasket1.push(this.PoductDetails);
        for (var item of this.ProductBasket1) {     
          this.basket.AddItemToBasket(item); 
     }
   this.count=1;
   this.ProductBasket1=[];
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
      }
    else 
    {
      alert("السعر اقل من 100 ريال ");
    }
    }
   else if(this.PoductDetails.name!='صيانة عامة')
   {
    this.ProductBasket1.push(this.PoductDetails);
    for (var item of this.ProductBasket1) {     
      this.basket.AddItemToBasket(item); 
 }
       this.count=1;
      this.ProductBasket1=[];
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
 
   }
 
   } 
   
   
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



//<-- ----------------Reviews---------------- -->
onSubmit(): void {
  var token = localStorage.getItem('token');

  this.userservice.getuserValue(token).subscribe(
    {
     next:(pro)=> {
       this.user=pro;
       if(this.user !=null)
       {
       // const productId = this.productid;
         const review:IReview = {
         userId:this.user.id,
         comment: this.reviewForm.controls.comment.value ?? '',
         ratingValue: this.reviewForm.controls.ratingValue.value ?? 0,
         productID: this.productid,
         date: new Date(),
        // userName:this.user.username
       };
       
       this.productservise.add(review).subscribe(
         {
           next:(pro)=> {
             
             this.commentreslut=pro.ratingValue;
             console.log(this.commentreslut);
             if(this.commentreslut !== 0) 
             {
               console.log(pro.ratingValue)
               Swal.fire(this.user.username,`لقد تمت العملية بنجاخ ` , 'success')
               this.reviewForm.reset();
               location.reload();
            
              
             }
             else
             {
               console.log(typeof(pro.ratingValue) )
               Swal.fire(this.user.username,`لقد قمت بالتعليق من قبل شكرا لك  ` , 'error')
            
               
             }
       
            }
           ,
           error:(err)=>Swal.fire('',`لقد حدث خطا ما الرجاء المحاوله مره اخرى` , 'error')
           
       
         }
       
         
         
       );
       }
       else
       {
         this.route.navigate(['/Login'])
       }
    }})

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
       
       this.productservise.addtowishlist(this.IaddWishlist).subscribe(
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





VeiwDetails(id :number , name:any)
{ 
  this.route.navigate(["BlogDetails",id,name])
}


}
