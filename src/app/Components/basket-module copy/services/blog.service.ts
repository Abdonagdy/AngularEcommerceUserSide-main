import { IBlog1, IAllComment } from './../../../models/Iblog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { IBlog, IBlogDetails, IcreateComment } from 'src/app/models/Iblog';
import { Iproduct } from 'src/app/models/iproduct';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  httpOptions={};
  constructor(private http :HttpClient ,private route:Router)
   {
    const httpOptions ={
      Headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   }


GetallBlog():Observable<IBlog[]>
{
  return this.http.get<IBlog[]>(`${environment.APIURL}/api/Artical/GetAllArtical`);

}

GetblogById(ArticalId:any):Observable<IBlogDetails>
{
  return this.http.get<IBlogDetails>(`${environment.APIURL}/api/Artical/GetAllArticalDetails?ArticalId=${ArticalId}`);

}

add(review: IBlog1): Observable<any> {
  const url = `${environment.APIURL}/api/Artical/CreateComment`;
  const body = {
    commentt: review.Commentt,
    date: review.Date,
    userName: review.UserName,
    ArticalId:review.ArticalId 
  };
  return this.http.post<IcreateComment>(url, body,this.httpOptions);
}

getAllComment(id: any): Observable<IAllComment[]> {
  const url =`${environment.APIURL}/api/Artical/GetAllComment?id=${id}`;
  return this.http.get<any>(url);
}

}
