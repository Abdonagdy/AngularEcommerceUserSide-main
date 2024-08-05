import { Component } from '@angular/core';
import { SpinnerServiceService } from '../Components/spinner-service.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  constructor(
    public spinnerService: SpinnerServiceService,
  
  ) {}

  ngOnInit() {
   
  }
}
