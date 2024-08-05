import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationService } from 'src/app/Services/translation.service';
import { TranslateService } from '@ngx-translate/core';
import { IBlog } from 'src/app/models/Iblog';
import { BlogService } from '../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
langFlag:boolean=true;

bloglistitem:IBlog[]=[]
urldesc:any;
constructor(  private translationService: TranslationService,
  private translate: TranslateService,
  private blogService:BlogService,
  private route:Router,
  private Getid:ActivatedRoute,private titleService: Title,private metaService: Meta
  ){}
  ngOnInit(): void {
    this.titleService.setTitle('المدونة مراكز مايز لصيانة السيارات');
    this.metaService.updateTag({ name: 'description', content:'المدونة مراكز مايز لصيانة السيارات، يمكنك من خلال هذه الصفحة يمكنط من خلال هذه الصفحة قراءه بعض المقالات عن كيفية عمل صيانة لسياراتك ' });
    this.metaService.updateTag({name: 'keywords', content: "المدونة ورشة اصلاح سيارات ورشة إصلاح سيارات صيانة سيارات مركز صيانة سيارات ورشة ميكانيكا سيارات خدمة سيارات ورشة صيانة سيارات ورشة تصليح سيارات " });
    this.metaService.addTag({name: 'robots', content: 'index,follow'});
    this.metaService.addTag({name: 'author', content: 'Mize'});
     this.urldesc=`الرئيسية > المقالات`
    this.blogService.GetallBlog().subscribe(
      {
        next:(pro)=> {
          this.bloglistitem=pro;
        
         }
        ,
        error:(err)=>console.log(err)
      }

    );
    this.blogService.GetblogById(1).subscribe(
      {
        next:(pro)=> {
          
          console.log(pro);
         }
        ,
        error:(err)=>console.log(err)
      }

    );



  }


  VeiwProduct(id :number, name:any)
  {
    this.route.navigate(["BlogDetails",id,name])
  }


}

