import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Coupon, IReview, IaddWishlist, IaddWishlistresult, Icategory, Iproduct, IproductDetails, Review } from 'src/app/models/iproduct';
import { environment } from 'src/environments/environment.development';
import { HttpParams } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProductService   {
  httpOptions={};
    Allcategory:Icategory[]=[];
  constructor(private http :HttpClient ,private route:Router)
   {
    const httpOptions ={
      Headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   }

GetallProduct():Observable<Iproduct[]>
{
  return this.http.get<Iproduct[]>(`${environment.APIURL}/api/Product/AllProduct`);

}
GetProductById(productid:any):Observable<IproductDetails>
{
  return this.http.get<IproductDetails>(`${environment.APIURL}/api/Product/${productid}`);

}
GetallProductByCategory(id:number):Observable<Iproduct[]>
{
  this.GetAllCategory();
  return this.http.get<Iproduct[]>(`${environment.APIURL}/api/Product/AllProduct?categoryId=${id}`);

}




//////////////////filter by category///////////////////////////
GetAllCategory():Observable<Icategory[]>
{

  return this.http.get<Icategory[]>(` ${environment.APIURL}/api/Category/GetAllCategory`,this.httpOptions);
}
GetAllCategoryByCategory(id:number):Observable<Icategory>
{

  return this.http.get<Icategory>(`${environment.APIURL}/api/Category/GetAllCategoryBycategory?query=${id}`,this.httpOptions);
}

getAll(productId: any): Observable<any> {
  const url =`${environment.APIURL}/api/UserReview/allreview?productId=${productId}`;
  return this.http.get<any>(url);
}






add(review: IReview): Observable<IReview> {
  const url = `${environment.APIURL}/api/UserReview/CreateReview`;
  const body = {
    comment: review.comment,
    ratingValue: review.ratingValue,
    date: review.date,
    userId: review.userId,
    productId:review.productID 
  };
  return this.http.post<IReview>(url, body,this.httpOptions);
}




addtowishlist(value:IaddWishlist):Observable<IaddWishlistresult>
{
  return this.http.post<IaddWishlistresult>(`${environment.APIURL}/api/Wishlist/AddWishlist`,value).pipe(
    map(
      user=>{
             
        return user;
      }
    )


  )
    }

    deleteitemfromwishlist(value:number,value1:number):Observable<Boolean>
    {
      return this.http.delete<Boolean>(`${environment.APIURL}/api/Wishlist/RemoveWishlist?Uid=${value}&Pid=${value1}`).pipe(
        map(
          user=>{
                 
            return user;
          }
        )
    
    
      )
        }

Showwishlist(uid:any):Observable<Iproduct[]>
{   
  return this.http.get<Iproduct[]>(`${environment.APIURL}/api/Wishlist/ShowAllWishlist?uid=${uid}`,this.httpOptions)
}



applyCoupon(copon:string):Observable<Coupon>
{
  return this.http.get<Coupon>(`${environment.APIURL}/api/Coupon/GetCoupon?code=${copon}`,this.httpOptions)
}
   





}


