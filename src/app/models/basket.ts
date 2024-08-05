import * as cuid from "cuid";
export interface BasketItem {
  id:number;
  name:string;
  nameEN:string;
  price:number;
  image:string;
  quantity:number;
  itemQuant:number;
}

export interface Basket
{
  id:string;
  items:BasketItem[];

}

export class Basket implements Basket{
id: string=cuid();
items: BasketItem[]=[];
}

export interface ShipingTotal
{
  shipping:number;
  Subtotal:number;
  total:number;
}

export interface ShipingMethod
{
  id:number;
  name:number;
  price:number;
  orderIds:number[];
}
