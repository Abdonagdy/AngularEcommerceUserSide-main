import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ReservationLargeDto } from 'src/app/models/Ireservation';
import { IDistance, IEnginetype, IYear, IcarModel, Icarname, Icarservice, Ifinshed } from 'src/app/models/Isangan';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SanganService   {
 
 
 
 
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })
  };
  constructor(private http: HttpClient, private route: Router) {
  }

   GetallcarModel():Observable<IcarModel[]>
   {
     return this.http.get<IcarModel[]>(`${environment.APIURL}/api/Sanganservice/GetAllModelcar`);
   }
   
   
   
   GetDistance():Observable<IDistance[]>
   {
     return this.http.get<IDistance[]>(`${environment.APIURL}/api/Sanganservice/GetAllDistance`);
   }
   

   GetYear(id:any):Observable<IYear[]>
   {
     return this.http.get<IYear[]>(`${environment.APIURL}/api/Sanganservice/GetAllyear?id=${id}`);
   }


   GetallcarnameBymodel(id:number):Observable<Icarname[]>
   {
     return this.http.get<Icarname[]>(`${environment.APIURL}/api/Sanganservice/GetAllcarBymodel?modelid=${id}`);
   }

   Getallenginetype(id:any):Observable<IEnginetype[]>
   {
     return this.http.get<IEnginetype[]>(`${environment.APIURL}/api/Sanganservice/GetEngineType?id=${id}`);
   }

   GetallcarserviceBycar(id:number,id1:any):Observable<Icarservice[]>
   {
     return this.http.get<Icarservice[]>(`${environment.APIURL}/api/Sanganservice/GetAllserviceforcarbydis?id=${id}&disid=${id1}`);
   }
   

   add(review: Ifinshed): Observable<ReservationLargeDto> {
    const url = `${environment.APIURL}/api/Sanganservice/Add`;

    return this.http.post<ReservationLargeDto>(url,review,this.httpOptions);
  }
   
}


//////////////////////////////////////////////
