import { AppointmentReversions, IMadina } from '../../../models/Ireservation';
import { IndexComponent } from '../../product-module/index/index.component';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Observable, last } from 'rxjs';
import { IBransh, IbranshReservation } from 'src/app/models/Ireservation';
import { SanganService } from '../services/sangan.service';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/Services/translation.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Iuser, user } from 'src/app/models/iuser';
import { TranslateService } from '@ngx-translate/core';
import { Meta, Title } from '@angular/platform-browser';
import { IDistance, IEnginetype, IYear, IcarModel, Icarname, Icarservice, Ifinshed, pricelist } from 'src/app/models/Isangan';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { ReversationService } from '../../reversation-module/services/reversation.service';
import { trigger } from '@angular/animations';



@Component({
  selector: 'app-sangan',
  templateUrl: './Sangan.component.html',
  styleUrls: ['./Sangan.component.css']
})
export class SanganComponent  implements OnInit {
  langFlag:boolean=true;
  public currentLanguage: string='';
  AllModelCae:IcarModel[]=[];
  Allyear:IYear[]=[];
  AllDistance:IDistance[]=[];
  ModelCar!:Icarname;
  Allcarbymodel:Icarname[]=[];
  AllEnginnetype:IEnginetype[]=[];
  Allservice:Icarservice[]=[];
  RegisterForm:FormGroup=new FormGroup({});
  totalPrice = 0;
  AllMadina:IMadina[]=[];
  AllMadina1:any;
  AllBranshs:IBransh[]=[];
  selectedBranch: string = '';
  selectedServices: Icarservice[] = [];
  Icarserviceselected:Icarservice[]=[];
  tax:any;
  urldesc:any;
  constructor(private SanganService :SanganService,
    private route:Router,
    private translationService:TranslationService,private fb:FormBuilder,private translate: TranslateService,private titleService: Title,private metaService: Meta,private Productservice :ReversationService)
    {
    }
  
  
  
  ngOnInit(): void {
    this.titleService.setTitle('حجز موعد صيانة بمراكز مايز لصيانة السيارات');
    this.metaService.updateTag({ name: 'description', content:'حجز موعد صيانة شنجان لدى  مراكز مايز لصيانة السيارات، يمكنك من خلال هذه الصفحة حجز موعد صيانة شنجان فى احد مراكزنا و سوف يصلكم رسالة نصية عند تأكيد الحجز' });
    this.metaService.updateTag({name:'keywords',content:'موعد صيانة سيارة-موعد صيانة شنجان - مواعيد الصيانة في مراكز مايز لخدمات و صيانة السيارات - جدة - الرياض - المدينة - مكة - خميس مشيط - جيزان'})
    this.metaService.addTag({name: 'robots', content: 'index,follow'});
    this.metaService.addTag({name: 'author', content: 'Mize'});
    this.urldesc=`الرئيسية < حجز موعد صيانة شنجان`;
   
    this.translationService.getLanguageObservable().subscribe(language => {
      this.currentLanguage = language;
      if(language=='ar')
      {
        this.translate.setDefaultLang('ar');
        this.langFlag=false;
      }
      else
      {
        this.translate.setDefaultLang('en');
        this.langFlag=true;
        
      }
    
    });
    this.Productservice.GetallMadina().subscribe(
      {
        next:(pro)=> {
          this.AllMadina=pro;
         }
        ,
        error:(err)=>console.log(err)
      });
    this.SanganService.GetallcarModel().subscribe(
      {
        next:(pro)=> {
          this.AllModelCae=pro;
       //   console.log(this.AllBranshs)
         }
        ,
    
        error:(err)=>console.log('لقد حدث خطا ما')
    
      })
       
      this.SanganService.GetDistance().subscribe(
        {
          next:(pro)=> {
            this.AllDistance=pro;
         //   console.log(this.AllBranshs)
           }
          ,
      
          error:(err)=>console.log('لقد حدث خطا ما')
      
      })

        this.RegisterForm=this.fb.group(
          {
            Model:['',[Validators.required]],
            Year:["",[Validators.required]],
            Car:["",[Validators.required]],
            Service:['',[Validators.required]],
            Distance:['',[Validators.required]],
            EngineTpe:['',[Validators.required]],
            City:['',[Validators.required]],
            Region:['',[Validators.required]],
            Fname:['',[Validators.required]],
            Lname:['',[Validators.required]],
            Email:['',[Validators.required]],
            PhoneNumber:["",[Validators.required, Validators.pattern("(05)([0-9]{8})"),
            Validators.minLength(10), Validators.maxLength(10)]],
           }
    
        );
  }


  get Fname()
  {
    return this.RegisterForm.get('Fname');
  }
  get Lname()
  {
    return this.RegisterForm.get('Lname');
  }
  get Email()
  {
    return this.RegisterForm.get('Email');
  }
  get PhoneNumber()
  {
    return this.RegisterForm.get('PhoneNumber');
  }

  get Model()
  {
    return this.RegisterForm.get('Model');
  }

  get Year()
  {
    return this.RegisterForm.get('Year');
  }
  
  get Car()
  {
    return this.RegisterForm.get('Car');
  }

  get EngineTpe()
  {
    return this.RegisterForm.get('EngineTpe');
  }
  get Distance()
  {
    return this.RegisterForm.get('Distance');
  }
  get Service()
  {
    return this.RegisterForm.get('Service');
  }

get City()
{
  return this.RegisterForm.get('City');
}

get Region()
{
  return this.RegisterForm.get('Region');
}


onSelectChange(event:any)
{
 
  const id = event.value;
  this.SanganService.GetallcarnameBymodel(id).subscribe(
    {
      next:(pro)=> {
       
        this.Allcarbymodel=pro;

       }
      ,
      error:(err)=>console.log(err)
    });    
}


onSelectChangecarname(event:any)
{
  const id = event.value;
  this.SanganService.GetYear(id).subscribe(
    {
      next:(pro)=> {
        this.Allyear=pro;
       }
      ,
  
      error:(err)=>console.log('لقد حدث خطا ما')
  
  })
  
}

onSelectChangeYear(event:any)
{
  
  const id = event.value;
  this.SanganService.Getallenginetype(id).subscribe(
    {
      next:(pro)=> {
        this.AllEnginnetype=pro;
       }
      ,
  
      error:(err)=>console.log('لقد حدث خطا ما')
  
  })
  
}


onSelectChange1(event:any)
{
  const id = event.value;
  let date:any = this.RegisterForm.get('Car')?.value;
  this.SanganService.GetallcarserviceBycar(date,id).subscribe(
    {
      
      next:(pro)=> {
       console.log(pro)
       this.Allservice=pro;
      //  this.Allservice=this.ModelCar.carServices;
      this.Allservice.forEach(element => {
       // element.prices[i].checked=true;
        element.prices.forEach(element1 => {
          element1.checked=true;
          this.totalPrice+=element1.price;
          this.tax=this.totalPrice-((this.totalPrice*100))/115;
        });
        
      });
       }
      ,
      error:(err)=>console.log(err)
    });
   
}

  // Function to update total price on checkbox change
  onCheckboxChange(item: Icarservice, price: pricelist) {
    // Toggle the checked property
    price.checked = !price.checked;

    // Update totalPrice based on the checkbox state
    this.totalPrice += price.checked ? Number(price.price) : -Number(price.price);
    this.tax=this.totalPrice-((this.totalPrice*100))/115;
    // Update the selectedServices array
    if (price.checked) {
      // Add the selected service to the array if it's not already present
      const existingServiceIndex = this.selectedServices.findIndex(selected => selected.id === item.id);

      if (existingServiceIndex === -1) {
        const selectedService: Icarservice = { ...item, prices: [price] };
        this.selectedServices.push(selectedService);
      } else {
        // Add the price to the existing selected service
        this.selectedServices[existingServiceIndex].prices.push(price);
      }
    } else {
      // Remove the price from the selected service if it's present
      const existingServiceIndex = this.selectedServices.findIndex(selected => selected.id === item.id);

      if (existingServiceIndex !== -1) {
        const priceIndex = this.selectedServices[existingServiceIndex].prices.findIndex(p => p.price === price.price);

        if (priceIndex !== -1) {
          this.selectedServices[existingServiceIndex].prices.splice(priceIndex, 1);

          // Remove the entire selected service if no prices are left
          if (this.selectedServices[existingServiceIndex].prices.length === 0) {
            this.selectedServices.splice(existingServiceIndex, 1);
          }
        }
      }
    }

    // Log or use the selectedServices array as needed
    console.log(this.selectedServices);
  }


  onSelectMadinaChange(event:any)
  {
    const id = event.value;
    this.Productservice.GetallBransh(id).subscribe(
      {
        next:(pro)=> {
         
          this.AllBranshs=pro;
         }
        ,
        error:(err)=>console.log(err)
      });
  }


  CreateReservation() {
    // Extract values from the form controls
    console.log(this.selectedServices)
    const fname = this.RegisterForm.get('Fname')?.value;
    const lname = this.RegisterForm.get('Lname')?.value;
    const email = this.RegisterForm.get('Email')?.value;
    const phoneNumber = this.RegisterForm.get('PhoneNumber')?.value;
    const model = this.RegisterForm.get('Model')?.value;
    const car = this.RegisterForm.get('Car')?.value;
    const year = this.RegisterForm.get('Year')?.value;
    const engineType = this.RegisterForm.get('EngineTpe')?.value;
    const distance = this.RegisterForm.get('Distance')?.value;
    const service = this.RegisterForm.get('Service')?.value;
    const city = this.RegisterForm.get('City')?.value;
    const region = this.RegisterForm.get('Region')?.value;
  
    // Create the reservation object
    const reservation: Ifinshed = {
      Fname: fname,
      Lname: lname,
      Email: email,
      PhoneNumber: phoneNumber,
      Model: model,
      Car: car,
      Year: year,
      EngineType: engineType,
      Distance: distance,
      City: city,
      Region: region,
      SelectedServices: this.selectedServices,
      Totalprice:this.totalPrice,
      Tax:this.tax
    };
  
    console.log(reservation);
  
    // Call the service to add the reservation
    this.SanganService.add(reservation).subscribe(
      {
        next: (result) => {
          console.log(result);
          Swal.fire('',`لقد تم حجز الموعد بنجاح  شكرا لكم` ,  'success')

          // Add any success handling logic here
        },
        error: (err) => {
          console.error('An error occurred:', err);
          // Add error handling logic here
        }
      }
    );
  }
  

}