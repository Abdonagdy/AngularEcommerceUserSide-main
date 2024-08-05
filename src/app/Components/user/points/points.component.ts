import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/models/iuser';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslationService } from 'src/app/Services/translation.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.css']
})
export class PointsComponent implements OnInit{
  user2!:user;
  langFlag:boolean=true;
  public currentLanguage: string='';
wards:any;   
UserName:any;
  constructor(private translationService: TranslationService,private user: UserService ,private UserService:UserService ,private route :Router,private titleService: Title, private translate: TranslateService)
  {

  }
  ngOnInit(): void {
   
    this.titleService.setTitle('نقاط المكافئة مراكز مايز لصيانة السيارات')
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
  
    const token = localStorage.getItem('token');
      this.user.getuserValue(token).subscribe(
        {
          next:(pro)=> {
            this.user2=pro;
            if(this.user2 ==null)
            {
              this.route.navigate(['/Home']);
            }
            else
            {
              
              this.UserService.AllPoint(this.user2.id).subscribe(
                (response) => {
                  this.wards=response;
                     this.UserName=this.user2.username;
                     },
                     (error) => {
                       console.error('Error not points:', error);
                     }
              );
  }

}
        })
      }
    }