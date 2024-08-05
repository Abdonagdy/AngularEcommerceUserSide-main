import { IAdress } from './../../../models/iuser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject, catchError, map, of, throwError } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IaddWishlistresult } from 'src/app/models/iproduct';
import { Adress, Changepasswordresult, Forgetpasswordresult, IForgotPassword, Iuser, user } from 'src/app/models/iuser';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private CurrentUserSource= new ReplaySubject<user | null>(1);
   CurrentUser$=this.CurrentUserSource.asObservable();
 Httpheader={};

 private returnUrl: string | null = null;


  constructor(private http:HttpClient , private route :Router)
   {
    this.Httpheader={
      Headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }
  // Method to set the returnUrl
  setReturnUrl(url: string): void {
    this.returnUrl = url;
  }

  // Method to get the returnUrl and clear it after retrieval
  getReturnUrl(): string | null {
    const returnUrl = this.returnUrl;
    this.returnUrl = null; // Clear returnUrl after retrieval
    return returnUrl;
  }

  getuserValue(token: string | null): Observable<any> {
    if (!token) {
      this.CurrentUserSource.next(null);
      return of(null);
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<user>(`${environment.APIURL}/api/UserAccount/GetCurrentUser`, { headers }).pipe(
      map(
        user => {
          localStorage.setItem('token', user.token);
        
          this.CurrentUserSource.next(user);
          return user;
        }
      ),
      catchError(error => {
        console.error('Error getting current user:', error);
        return throwError(error); // Re-throw the error to propagate it further
      })
    );
  }
  

Register(value:any):Observable<user>
{

  return this.http.post<user>(`${environment.APIURL}/api/UserAccount/Register`,value).pipe(
    map(
      user=>{
                localStorage.setItem('token',user.token);
           
                this.CurrentUserSource.next(user);
        return user;
      }
    )

  )



}

LoginUser(value: any): Observable<user> {
  return this.http.post<user>(`${environment.APIURL}/api/UserAccount/Login`, value).pipe(
    map(user => {
      localStorage.setItem('token', user.token);
    
      this.CurrentUserSource.next(user);
      return user;
    })
  );
}


LogOut()
{
  localStorage.removeItem('token');
  localStorage.removeItem('Adress_id');
  localStorage.removeItem('Shiping-id');
  localStorage.removeItem('shipingTotal');
  this.CurrentUserSource.next(null);
  this.route.navigateByUrl('/Home');
  
}


ForgetPassword(value:any):Observable<Forgetpasswordresult>
{
  return this.http.post<Forgetpasswordresult>(`${environment.APIURL}/api/UserAccount/ForgotPassword`,value).pipe(
    map(
      user=>{
            
        return user;
      }
    )

  )



}

ResetPassword(value:any):Observable<Forgetpasswordresult>
{
  return this.http.post<Forgetpasswordresult>(`${environment.APIURL}/api/UserAccount/reset-password`,value).pipe(
    map(
      user=>{
             
        return user;
      }
    )


  )
    }
  ChangePassword(value:any):Observable<Changepasswordresult>
{
 
  return this.http.post<Changepasswordresult>(`${environment.APIURL}/api/UserAccount/ChangePassword`,value).pipe(
    map(
      user=>{
             
        return user;
      }
    )

  )

}

AllAdress(userId: any): Observable<IAdress[]> {
  return this.http.get<IAdress[]>(`${environment.APIURL}/api/Addresses/GetAllAddressForUSer?UserId=${userId}`);

}

DeleteAdress(Id:any): Observable<any> {
  return this.http.delete<any>(`${environment.APIURL}/api/Addresses/DeleteAddress?Id=${Id}`);
}

AllPoint(userId: any): Observable<any> {
  const url =`${environment.APIURL}/api/UserAccount/asd?UserId=${userId}`;
  return this.http.get<any>(url);
}


getAutoReply(message: string): string {
  
  // قم بتحديد الرد التلقائي هنا بناءً على الرسالة المستلمة
  if(message==="كيف الحال")
  return 'رد تلقائي: شكرًا على رسالتك الحمد لله بخير'
else
  return 'رد تلقائي: شكرًا على رسالتك!';
}

private previousPage: string = '';

savePreviousPage(page: string) {
  this.previousPage = page;
  localStorage.setItem('previousPage', page);
}

getPreviousPage(): string {
  return this.previousPage || localStorage.getItem('previousPage') || '/';
}

clearPreviousPage() {
  this.previousPage = '';
  localStorage.removeItem('previousPage');
}

EditeProfile(value:any):Observable<IaddWishlistresult>
{
  
  return this.http.post<IaddWishlistresult>(`${environment.APIURL}/api/User/UpdateInfo`,value).pipe(
    map(
      user=>{
        return user;
      }
    )

  )
}
getuser(userId: any): Observable<any> {
  return this.http.get<any>(`${environment.APIURL}/api/User/getuserbyid?id=${userId}`);

}


}
