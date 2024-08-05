import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IaddWishlist, Icategory, Iproduct } from 'src/app/models/iproduct';
import { BasketService } from '../../basket-module/services/basket.service';
import { TranslationService } from 'src/app/Services/translation.service';
import Swal from 'sweetalert2';
import { user } from 'src/app/models/iuser';
import { TranslateService } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';
import { UserService } from '../../user/services/user.service';

@Component({
  selector: 'app-filter-by-category',
  templateUrl: './filter-by-category.component.html',
  styleUrls: ['./filter-by-category.component.css']
})
export class FilterByCategoryComponent implements OnInit {
  Catid: number | null | undefined;
  Catname: string | null | undefined;
  productByCategory: Iproduct[] = [];
  user!:user;
  public currentLanguage: string='';
  totalLength:any;
  IaddWishlist!:IaddWishlist;
  page:number=1;
  catbycat!:Icategory;  
  urldesc:any;
  @Input() product!: Iproduct;
  constructor(private Productservice: ProductService,
    private GetcatbyRoute: ActivatedRoute,private userservice:UserService,
    private basket: BasketService,
    private route: Router ,
    private translationService:TranslationService, private translate: TranslateService,private titleService: Title,private meta: Meta) {
  }
  ngOnInit(): void {
    this.GetcatbyRoute.paramMap.subscribe(
      paramap => {
        this.Catname = paramap.get('cat');
        this.Catid = paramap.get('id') ? Number(this.GetcatbyRoute.snapshot.paramMap.get('id')) : 0;
        this.urldesc=`الرئيسية < ${ this.Catname}`
        if (this.Catname != null && this.Catid != null) {
      this.Productservice.GetAllCategoryByCategory(this.Catid).subscribe(
        {
          next:(pro)=> {
            this.catbycat=pro;     
            this.titleService.setTitle(this.catbycat.metaTitle);
            this.meta.addTag({name: 'seoname', content: this.catbycat.seName });
            this.meta.updateTag({name: 'keywords', content: this.catbycat.metaKeywords });
            this.meta.updateTag({name: 'description', content: this.catbycat.metaDescription });
            this.meta.addTag({name: 'robots', content: 'index,follow'});
            this.meta.addTag({name: 'author', content: 'Mize'});
           }
          ,
          error:(err)=>console.log(err)
  
        }
  
      );
  
          this.Productservice.GetallProductByCategory(this.Catid).subscribe({
            next: (pro) => {
              this.productByCategory = pro;
              this.totalLength=pro.length;
            }
          })

        }
      }

    )


    this.translationService.getLanguageObservable().subscribe(language => {
      this.currentLanguage = language;
  
  
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
    const name=item.name;
    const catname=this.Catname;
    this.route.navigate(["ProductDetails",this.Catname,name,id])
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
}
