import { Component } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  constructor(){
    render({
      id: "#test",
      value: 'USD',
      currency: '100.00',
      onApprove:(details)=>{
        alert("thanks");
      }
    });
  }

}
