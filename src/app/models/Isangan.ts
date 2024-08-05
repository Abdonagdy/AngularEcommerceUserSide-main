export interface IcarModel
{
  id:number;
  name:string;
  carName:Icarname[];
}
export interface pricelist
{
  name:string;
  price:number;
  checked: boolean;
}
export interface Icarname
{
  id:number;
  name:string;
  carServices:Icarservice[];
}
export interface IEnginetype
{
  id:number;
  name:string;
}
export interface IYear
{
  id:number;
  yearNname:string;
}
export interface IDistance
{
  id:number;
  name:string;
}

export interface Icarservice
{
  id:number;
  name:string;
  description:string;
  prices:pricelist[];
}

export interface Ifinshed {
  Fname: string;
  Lname: string;
  Email: string;
  PhoneNumber: string;
  Model: number;
  Car: number;
  Year: number;
  EngineType: number;
  Distance: number;
  City: string;
  Region:number;
  SelectedServices: Icarservice[];
  Totalprice:number;
  Tax:number;
}

