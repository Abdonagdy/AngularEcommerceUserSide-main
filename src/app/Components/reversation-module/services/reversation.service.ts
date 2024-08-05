import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { IBransh, IbranshReservation, AppointmentReversions, ReservationLargeDto, Iresult, IMadina, IbranchMadina } from 'src/app/models/Ireservation';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class ReversationService   {
 
 
 
 
 
  httpOptions={};
  constructor(private http :HttpClient ,private route:Router)
   {
    const httpOptions ={
      Headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   }

   GetallMadina():Observable<IMadina[]>
   {
     return this.http.get<IMadina[]>(`${environment.APIURL}/api/Resrvation/GetAllMadina`);
   }

   GetallBransh1():Observable<IBransh[]>
   {
     return this.http.get<IBransh[]>(`${environment.APIURL}/api/Resrvation/GetAllBranshs1`);
   }
   GetallBransh(id:string):Observable<IBransh[]>
   {
     return this.http.get<IBransh[]>(`${environment.APIURL}/api/Resrvation/GetAllBranshs?madinaid=${id}`);
   }

  Bransh(id:any):Observable<IBransh>
   {
     return this.http.get<IBransh>(`${environment.APIURL}/api/Resrvation/Bransh?brannum=${id}`);
   
   }
   Getallreservation():Observable<AppointmentReversions[]>
   {
     
     return this.http.get<AppointmentReversions[]>(`${environment.APIURL}/api/Resrvation/GetAllres`);
   
   }
   Getallreservationbransh(t:any,d:any,m:any):Observable<AppointmentReversions[]>
   {   
     return this.http.get<AppointmentReversions[]>(`${environment.APIURL}/api/Resrvation/GetAllresbyid?BranshId=${t}&dateTime=${d}&Maintaence=${m}`);
   }
   Getallreservationbranshid(t:any):Observable<AppointmentReversions[]>
   {
     
     return this.http.get<AppointmentReversions[]>(`${environment.APIURL}/api/Resrvation/BranshId?brannum=${t}`);
   
   }

   Register(value:any,value1:any):Observable<Iresult>


   {
  return this.http.put<Iresult>(`${environment.APIURL}/api/Resrvation/Register?radio1=${value1}`,value).pipe(
    
    map(
          Iresult=>{
                 console.log(Iresult);
                  return Iresult;
                  
             }  
    )

    );
}



Getallservices():Observable<any>
{
  
  return this.http.get<any>(`${environment.APIURL}/api/BranchServises/GetAllServices`);

}


BranshService(id:any):Observable<any>
   {
     return this.http.get<any>(`${environment.APIURL}/api/BranchServises/GetAllServicesByBranchId?brid=${id}`);
   
   }

   GetAllBransh():Observable<IbranchMadina[]>
   {
     return this.http.get<IbranchMadina[]>(`${environment.APIURL}/api/Resrvation/GetAllBransh`);
   
   }



}


