export interface IBlog {
    articalId:number;
    articalName:string;
    articalTitle:string;
    articalDescription:string;
    imageURL:number;
    date:string;
    metaKeywords:string; 

    metaDescription:string; 
  
   metaTitle:string; 
  
   seName:string;
  }


  export interface IBlogDetails {
    articalId:number;
    articalName:string;
    articalTitle:string;
    articalDescription:string;
    imageURL:number;
    date:string;
    metaKeywords:string; 

    metaDescription:string; 
  
   metaTitle:string; 
  
   seName:string;

  }

  export interface IcreateComment
  {
     id:number; 
     text:string ;
     comment:string ;
     date:Date ;
     name: string;
  }

  export interface IBlog1
  {
    Commentt:string;
    Date:Date;
    UserName:string;
    ArticalId:number;

  }

  export interface IAllComment
  {
    commentId:number; 
     commentt:string ;
     date:Date ;
     userName: string;
  }