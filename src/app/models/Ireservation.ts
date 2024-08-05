

export interface AppointmentReversions {
  id:number;
  tofromHours:string;
  date:Date;
  isav:boolean;
  revnumber:string;
  maintaence:string
}
export interface IBransh {
  brannum:number;
  braname:string;
  phone:string;
  location:string;
  imageURL:string;
  appointmentReversions:AppointmentReversions[];  
}
export interface IMadina
{
  id:number;
  cityName:string;
}
export interface IbranshReservation {
  id:number;
  name:string;
  bransh:IBransh;
  appointmentReversions:AppointmentReversions[];  
}


export interface ReservationLargeDto {
  id:number;
  tofromHours:string;
  reversionNumber:string;
  email:string;
  isav:boolean;
  name:string;
  phoneNumber:string;
  userName:string;

}
export interface Iresult {
  id:number;
  message:string;
  tofromHours:string;
  revnumber :string;
  email:string;
  name:string;
  branshname:String;  
}

export interface IbranchMadina
{
  braname:string;
  phone:string;
  location:string;
  cityName:string;
  from:string;
  to:string;
}
