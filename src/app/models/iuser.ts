
export interface Iuser {
  UserName:string;
  FirstName:string;
  LastName:string;
  Email:string;
  Phone:string;
  Password:string;
  UserReferralCode?:string;

}


export interface user {
  id:number;
  message:string;
  email : string;
  expiresOn : string;
  isAuthenticated  : string;
  roles : string;
  username : string;
  fname:string;
  phoneNumber?:string;
  lname:string; 
  token : string;
  referralCode?:string; 
  urlReferralCode?:string;
}

export interface Adress {
  id:number;
  userId:number;
  city:string;
  region:string;
  country:string;
  email:string;
  phone:string;
 }
 export interface IAdress {
  id:number;
  city:string;
  region:string;
  country:string;
  email:string;
  fanme:string;
  lanme:string;
  phone:string;
 }

 export interface IForgotPassword
 {
   email:string;
//   emailSent:boolean;
 }

 export interface Forgetpasswordresult
 {
  result:string;
 }


 export interface RestPassword 
 {
  
   userId:number
   token:string; 
   newPassword: string;
   confirmNewPassword: string;
    
 }

 export interface Forgetpasswordresult
 {
  result:string;
  isSuccess:boolean;
 }
 export interface Changepasswordresult
 {
  result:string;
  
 }
