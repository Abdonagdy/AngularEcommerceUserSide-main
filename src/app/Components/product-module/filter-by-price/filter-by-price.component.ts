import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from 'src/app/Services/translation.service';
import { Iproduct, IaddWishlist } from 'src/app/models/iproduct';
import { user } from 'src/app/models/iuser';
import Swal from 'sweetalert2';
import { BasketService } from '../../basket-module/services/basket.service';
import { ProductService } from '../services/product.service';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { UserService } from '../../user/services/user.service';
@Component({
  selector: 'app-filter-by-price',
  templateUrl: './filter-by-price.component.html',
  styleUrls: ['./filter-by-price.component.css']
})
export class FilterByPriceComponent implements OnInit {
  MinPrice: number | null | undefined;
  MaxPrice: number | null | undefined;
  productByCategory: Iproduct[] = [];
  user:user=JSON.parse(localStorage.getItem('user')!);
  public currentLanguage: string='';
  totalLength:any;
  IaddWishlist!:IaddWishlist;
  page:number=1;
  @Input() product!: Iproduct;
  Catname: string | null | undefined;
  langFlag:boolean=true;
  constructor(private Productservice: ProductService,
    private GetcatbyRoute: ActivatedRoute,
    private basket: BasketService,private UserSerive:UserService,
    private route: Router ,
    private translationService:TranslationService,private translate: TranslateService,private titleService: Title) { 

      translate.setDefaultLang('ar');
      this.langFlag=false;
     

    }
  ngOnInit(): void {

    this.titleService.setTitle('خدمات مراكز مايز لصيانة السيارات');
    this.GetcatbyRoute.paramMap.subscribe(
      paramap => {
        this.MinPrice = paramap.get('min')?Number(this.GetcatbyRoute.snapshot.paramMap.get('min')) : 0;
        this.MaxPrice = paramap.get('max')?Number(this.GetcatbyRoute.snapshot.paramMap.get('max')) : 0;

       if(this.MinPrice !=null && this.MaxPrice !=null)
       {
        this.Productservice.GetallProduct().subscribe(
          {
            
            next:(pro)=> {
              this.productByCategory=pro.filter(
                (product) => product.price >=this.MinPrice! && product.price <=this.MaxPrice!
              );
              }});
       
            }
        
        
      }

    )
    this.translationService.getLanguageObservable().subscribe(language => {
      this.currentLanguage = language;
      if(language=='ar')
      {
       // this.translate.setDefaultLang('ar');
        this.langFlag=false;
      }
      else
      {
        //this.translate.setDefaultLang('en');
        this.langFlag=true;
        
      }
    
    });

  }


  AddProductToBasket(item: Iproduct) {
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
    const name = item.name;
    const  catname=item.categoryName;

    this.route.navigate(["ProductDetails",catname,name,id])


  }

  AddProductToWishlist(Uid:number)
  {
    const token = localStorage.getItem('token');

    this.UserSerive.getuserValue(token).subscribe(
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

}
