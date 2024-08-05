import { BlogService } from './../services/blog.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/Services/translation.service';
import { ActivatedRoute } from '@angular/router';
import { IAllComment, IBlog1, IBlogDetails, IcreateComment } from 'src/app/models/Iblog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { user } from 'src/app/models/iuser';
import { UserService } from '../../user/services/user.service';
import Swal from 'sweetalert2';
import { Meta, Title } from '@angular/platform-browser';
@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  Blogid :number  | undefined;
 BlogDetails:any={};
 userinfo: Observable<user> | undefined;
 userinformation:user=JSON.parse(localStorage.getItem('user')!);
 AllComment:IAllComment[] |undefined; 
 reviewForm = new FormGroup({
  UserName: new FormControl(''),
  Comment: new FormControl(''),
  articalId: new FormControl(0),
 });
 @ViewChild('htmlContainer') htmlContainer!: ElementRef;

 urldesc:any;
 constructor(private translationService: TranslationService,
  private translate: TranslateService,
  private blogService:BlogService  , private Getid:ActivatedRoute,private fb:FormBuilder,private user: UserService,private titleService: Title,private metaService: Meta)
{

}

  ngOnInit(): void {
   
    
   //this.userinfo=this.user.account;
    this.Getid.paramMap.subscribe(
      param=>{

      }
    )

  this.Blogid=Number (this.Getid.snapshot.paramMap.get("id"));
   const name =this.Getid.snapshot.paramMap.get("name");
    this.blogService.GetblogById(this.Blogid).subscribe(
      {
        next:(pro)=> {
          this.BlogDetails=pro;
          this.htmlContainer.nativeElement.innerHTML = this.BlogDetails.articalDescription;
          this.titleService.setTitle(this.BlogDetails.metaTitle);
          this.metaService.addTag({name:'seoname', content:this.BlogDetails.seName });
          this.metaService.updateTag({name:'keywords', content:this.BlogDetails.metaKeywords });
          this.metaService.updateTag({name:'description', content: this.BlogDetails.metaDescription });
          this.metaService.addTag({name:'robots', content: 'index,follow'});
          this.metaService.addTag({name: 'author', content: 'Mize'});
          this.urldesc=`الرئيسية > المدونة < ${name}` 
         
         }
        ,
        error:(err)=>console.log(err)
      }

    );

    this.blogService.getAllComment(this.Blogid).subscribe(
      {
        next:(pro)=> {
          this.AllComment=pro

          console.log(this.AllComment);
         }
        ,
        error:(err)=>console.log(err)
      }

    );

  }

  get Comment()
  {
    return this.reviewForm.get('Comment');
  }
  get UserName()
  {
    return this.reviewForm.get('UserName');
  }
 
    onSubmit(): void {
    // var userid = localStorage.getItem('currentUserId');
    if(this.userinformation !=null)
  {
  // const productId = this.productid;
    const review:IBlog1 = {
      ArticalId: this.BlogDetails.articalId,
      Commentt: this.reviewForm.controls.Comment.value ?? '',
      UserName: this.userinformation.username,
      Date: new Date(),
      
    };

  this.blogService.add(review).subscribe(() => {
    // clear the form and reload the reviews
    console.log(review)
    if(review !== null)
    {
      this.reviewForm.reset();
      location.reload();
      Swal.fire(this.userinformation.username,`لقد تمت العملية بنجاخ ` , 'success')
     
    }
    else
    {
      Swal.fire(this.userinformation.username,`لقد قمت بالتعليق من قبل ` , 'error')
    }
  });
  }
  else if(this.userinformation == null)
  {
    const review:IBlog1 = {
      ArticalId: this.BlogDetails.articalId,
      Commentt: this.reviewForm.controls.Comment.value ?? '',
      UserName: "زائر",
      Date: new Date(),
   
    }; 
    this.blogService.add(review).subscribe(() => {
      // clear the form and reload the reviews
      console.log(review)
      if(review !== null)
      {
        this.reviewForm.reset();
        location.reload();
        Swal.fire(this.userinformation.username,`لقد تمت العملية بنجاخ ` , 'success')
       
      }
      else
      {
        Swal.fire(this.userinformation.username,`لم تتم العملية بنجاح ` , 'error')
      }
    });   
  }
  }
}

