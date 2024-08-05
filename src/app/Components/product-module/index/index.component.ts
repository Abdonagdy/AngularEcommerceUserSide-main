import { user } from './../../../models/iuser';
import { Component, Input, OnInit } from '@angular/core';
import { Icategory, Iproduct } from 'src/app/models/iproduct';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from 'src/app/Services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';
import { UserService } from '../../user/services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  langFlag:boolean=true;
  Allcategory:Icategory[]=[];
  productByCategory: Iproduct[] = [];
  storedId: string | null = null;
    totalLength:any;
    page:number=1;
  
    public currentLanguage: string='';
  
    @Input() category!: Icategory;
  constructor(private Productservice :ProductService,private user:UserService,
    private route:Router,private translate: TranslateService,
    private translationService:TranslationService,private GetcatbyRoute: ActivatedRoute,private titleService: Title,private meta: Meta
    ){
      

    }

  ngOnInit():void {


 
    this.titleService.setTitle(
      "الصفحة الرئيسية مراكز مايز لصيانة السيارات"
    ); 
    
    this.meta.addTag({ name: 'seoname', content: "مراكز مايز لصيانة السيارات" });
    this.meta.updateTag({ name: 'keywords', content:"صيانة, سيارات, مراكز صيانة ،ورش صيانة, خدمات سيارات, إصلاح السيارات, فحص السيارات، جدة, الرياض, مكة المكرمة, المدينة المنورة, خميس مشيط, جيزان, الطائف, الدمام , ورشة اصلاح سيارات ، ورشةإصلاح سيارات ، صيانة سيارات ، مركز صيانة سيارات  ، مراكز ميكانيكا سيارات  ، خدمة سيارات  ، ورشة صيانة سيارات ، ورشة تصليح سيارات" });
    this.meta.updateTag({ name:'description', content: "أفضل مراكز صيانة السيارات في المملكة العربية السعودية-أفضل مراكز صيانة سيارات -تصليح سيارات -صيانة سيارات  - جدة - الرياض - مكة المكرمة - المدينة المنورة - خميس مشيط - جيزان - الطائف -الدمام. صيانة سيارات مضمون و موثوق - مايز ،  أفضل مراكز صيانة السيارات  التي تقدم أفضل الخدمات وأعلى جودة في الصيانة ، مركز السيارات الخاص بك يوفر لك دليلًا شاملاً لتلبية احتياجات صيانة سيارتك"});
    this.meta.addTag({name:'robots', content: 'index,follow'});  
    this.meta.addTag({name: 'author', content: 'Mize'});

      this.Productservice.GetAllCategory().subscribe(
        {
          next:(pro)=> {
            this.Allcategory=pro;
            this.totalLength=pro.length;
           }
          ,
  
          error:(err)=>console.log(err)
  
        }
  
      );
  
      this.translationService.getLanguageObservable().subscribe(language => {
        this.currentLanguage = language;
        //console.log(this.currentLanguage)
        // Do translation logic hereeeeeeee
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
    
     this.typeString()
    }
    
    oncliclink(cat:any,id:any)
    {  
      this.route.navigate(["Category",cat,id])
    } 


    typedText: string = '';
    inputString: string = ' مرحبا بكم في مراكز مايز لصيانة السيارات ، الإسم الغني عن التعريف في عالم صيانة السيارات و خدماتها لجميع انواع السيارات ما عدا السيارات الاوربية والنقل .';
    delayBetweenChars: number = 100; // تأخير بين الحروف بالميلي ثانية
    delayBeforeRestart: number = 1000; // تأخير قبل البدء من جديد بالميلي ثانية
  
    
    typeString(): void {
      let index = 0;
      const intervalId = setInterval(() => {
        if (index < this.inputString.length) {
          this.typedText += this.inputString.charAt(index);
          index++;
        } else {
          clearInterval(intervalId);
          setTimeout(() => {
            this.clearText();
          }, this.delayBeforeRestart);
        }
      }, this.delayBetweenChars);
    }
  
    clearText(): void {
      const intervalId = setInterval(() => {
        if (this.typedText.length > 0) {
          this.typedText = this.typedText.slice(0, -1);
        } else {
          clearInterval(intervalId);
          this.typeString();
        }
      }, 50); // سرعة المحو، يمكنك تعديلها حسب الحاجة
    }

}
