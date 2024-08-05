import { ProductModuleModule } from './../../product-module/product-module.module';
import { ProductModuleRoutingModule } from '../../product-module/product-module-routing.module';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslationService } from 'src/app/Services/translation.service';
import { Icategory, Icategory1, Iproduct } from 'src/app/models/iproduct';
import { ProductService } from '../../product-module/services/product.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  Allcategory:Icategory1[]=[];
  productByCategory: Iproduct[] = [];
  catbycat!:Icategory;  
    totalLength:any;
    page:number=1;
    urldesc:any;
    public currentLanguage: string='';
  
    @Input() category!: Icategory;
  constructor(private Productservice :ProductService,
    private route:Router,
    private translationService:TranslationService,private GetcatbyRoute: ActivatedRoute,private titleService: Title,private metaService: Meta
    ){}

  ngOnInit():void {
   // this.titleService.setTitle('عروض مراكز مايز لصيانة السيارات');

    this.metaService.updateTag({ name: 'description', content:'عروض مراكز مايز لصيانة السيارات، يمكنك من خلال هذه الصفحة معرفة جميع العروض المتاحة لدى مراكز مايز لصيانة السيارات' });
    this.metaService.addTag({name: 'robots', content: 'index,follow'});

      this.translationService.getLanguageObservable().subscribe(language => {
        this.currentLanguage = language;
        // Do translation logic hereeeeeeee
      });
      this.urldesc=`الرئيسية < العروض`
      this.Productservice.GetAllCategoryByCategory(1).subscribe(
        {
          next:(pro)=> {
            this.catbycat=pro;
            this.Allcategory=this.catbycat.subCategories;
            this.titleService.setTitle(this.catbycat.metaTitle); 
    
            this.metaService.addTag({ name: 'seoname', content: this.catbycat.seName });
            this.metaService.updateTag({ name: 'keywords', content: this.catbycat.metaKeywords });
            this.metaService.updateTag({ name: 'description', content: this.catbycat.metaDescription });
            this.metaService.addTag({name: 'robots', content: 'index,follow'});     
            this.metaService.addTag({name: 'author', content: 'Mize'}); 
           }
          ,
  
          error:(err)=>console.log(err)
  
        }
  
      );
  

    }
  
      VeiwProductCategory(id :number)
      {
        this.GetcatbyRoute.paramMap.subscribe(
          paramap => {
            if (id!= null) {
              this.Productservice.GetallProductByCategory(id).subscribe({
                next: (pro) => {
                  this.productByCategory = pro
                }
              })
    
            }
          }
    
        )

      }
  
      oncliclink(cat:any,id:any)
      {   
        this.route.navigate(["Category",cat,id])
      } 
  
      SendCategoryURL(cat:any,id:any)
      {
        this.route.navigate(['Category',cat,id])
      }
      SendCategoryURL1()
      {
        this.route.navigate(['/Offers'])
      }
  }
  