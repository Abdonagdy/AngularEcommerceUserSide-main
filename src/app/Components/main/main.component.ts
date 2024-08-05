import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private titleService: Title,private metaService: Meta)
  {

  }
  ngOnInit(): void {
    this.titleService.setTitle('مراكز مايز لصيانة السيارات');
    this.metaService.addTag({name: 'author', content: 'Mize'});
    this.metaService.addTag({name: 'robots', content: 'index, follow'});
    this.metaService.updateTag({name: 'keywords', content: 'صيانة, سيارات, مراكز صيانة ،ورش صيانة, خدمات سيارات, إصلاح السيارات, فحص السيارات، جدة, الرياض, مكة المكرمة, المدينة المنورة, خميس مشيط, جيزان, الطائف, الدمام , ورشة اصلاح سيارات ، ورشةإصلاح سيارات ، صيانة سيارات ، مركز صيانة سيارات  ، مراكز ميكانيكا سيارات  ، خدمة سيارات  ، ورشة صيانة سيارات ، ورشة تصليح سيارات">'});
    this.metaService.updateTag({name: 'description', content: 'أفضل مراكز صيانة السيارات في المملكة العربية السعودية-أفضل مراكز صيانة سيارات -تصليح سيارات -صيانة سيارات  - جدة - الرياض - مكة المكرمة - المدينة المنورة - خميس مشيط - جيزان - الطائف -الدمام. صيانة سيارات مضمون و موثوق - مايز ،  أفضل مراكز صيانة السيارات  التي تقدم أفضل الخدمات وأعلى جودة في الصيانة ، مركز السيارات الخاص بك يوفر لك دليلًا شاملاً لتلبية احتياجات صيانة سيارتك'})
  }

}
