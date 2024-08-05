import { Iproduct } from "./iproduct";
import { Adress, Iuser, user } from "./iuser";

export interface CreatOrder {
  total:number;
  shoppingmethodId:number;
  addressId:number;
  userId:number;
  ItemsOfProductListCart:itemCart[];
  code?:string;
}
export interface itemCart{
  productId:number;
  Price:number;
  Quantity:number;
}
export interface Order{
  id:number;
  date:Date;
  total:number;
  status:string;
  tax:number;

}
export interface OrderDetails{
  id:number;
  date:Date;
  total:number;
  tax:number;
  status:string;
  products:Iproduct[];
  address :Adress;
  shopingMethod:IShopingMethod,
  shipping:string;
  branch:string;
city:string;
country:string;

email:string;

fname:string;
lname:string;

phone:string;

userName:string;

}

export interface IShopingMethod
{
   id:number;
   name:string;
   price:number;

}

