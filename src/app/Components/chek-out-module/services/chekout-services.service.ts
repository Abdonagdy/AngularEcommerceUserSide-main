import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ShipingMethod, ShipingTotal } from 'src/app/models/basket';
import { CreatOrder, Order, OrderDetails } from 'src/app/models/check-out';
import { Adress } from 'src/app/models/iuser';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ChekoutServicesService {

  constructor(private http :HttpClient) { }
 


  AddUserAdress(value:any):Observable<Adress>
  {
      return this.http.post<Adress>(`${environment.APIURL}/api/Addresses/SetAdress`,value);
  }

  GetShippingDetails():Observable<ShipingMethod[]>
  {
    return this.http.get<ShipingMethod[]>(`${environment.APIURL}/api/ShoppingMethod/GetShiping`).pipe(
      map((ship)=>{

           return ship.sort((a,b)=>b.price-a.price);

      }

      )
    )

  }

  CreateOrder(Order :CreatOrder) :Observable<CreatOrder>
  {
    return this.http.post<CreatOrder>(`${environment.APIURL}/api/Orders/createOrder`,Order);
  }

  AllOrder(userid:number) :Observable<Order[]>
  {
    return this.http.get<Order[]>(`${environment.APIURL}/api/Orders/GetOrders?userid=${userid}`);
  }


  OrderDeatils(OrderId:number) :Observable<OrderDetails>
  {
    return this.http.get<OrderDetails>(`${environment.APIURL}/api/Orders/GetDetails?OrderId=${OrderId}`);
  }
}
