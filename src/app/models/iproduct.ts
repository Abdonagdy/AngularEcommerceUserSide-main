import { IBlog } from "./Iblog";

export interface pricelist
{
  name:string;
  price:number
}

export interface Iproduct {
  id:number;
  name:string;
  description:string;
  nameEN:string;
  descriptionEN:string;
  discountPercentage:number;
  oldPrice:number;
  price:number;
  serviceCode:string;
  quantity:number;
  images:string;
  shortDescription:string;
  shortDescriptionEN:string;
  categoriesNames:number[];
  categoriesNames1:string[];
  priceList:pricelist[];
  metaKeywords:string; 
  categoryName:string;
  metaDescription:string; 

 metaTitle:string; 

 seName:string;
}
export interface IproductDetails {
  id:number;
  name:string;
  description:string;
  nameEN:string;
  descriptionEN:string;
  discountPercentage:number;
  oldPrice:number;
  price:number;
  serviceCode:string;
  quantity:number;
  images:string;
  shortDescription:string;
  shortDescriptionEN:string;
  categoriesNames:number[];
  categoriesNames1:string[];
  priceList:pricelist[];
  metaKeywords:string; 
  articals:IBlog[] ;
  categoryName:string;
  metaDescription:string; 

 metaTitle:string; 

 seName:string;
}
export interface Icategory {
  id:number;
  name:string;
  nameEN:string;
  imageUrl:string;
   metaKeywords:string; 
   metaDescription:string; 
  metaTitle:string; 
  seName:string;
  subCategories:Icategory1[];
  products:Number[];
}

export interface Icategory1{
  id:number;
  name:string;
  nameEN:string;
  imageURL:string;
  metaKeywords:string; 

  metaDescription:string; 

 metaTitle:string; 

 seName:string;
}

export interface IReview {
  productID: any,
  userId: number,
  comment: string,
  ratingValue: number,
  date:Date

}

export interface Review {
  id:number,
  productID: any,
  userId: number,
  userName?:string,
  comment: string,
  ratingValue: number,
  date:Date

}

export interface IaddWishlist
{
  uid:number;
  pid:number;
}
export interface IaddWishlistresult
{
  result:string;
}
export interface Coupon {
  id:number;
  code: string;
  discountAmount: number;
  expirationDate: Date;
  isavliable:boolean;

}