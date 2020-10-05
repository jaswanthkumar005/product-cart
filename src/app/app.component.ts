import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){

  }
  title = 'product-cart';
  searchKey(myVal:HTMLInputElement){
    console.log(myVal.value);

  }
}
