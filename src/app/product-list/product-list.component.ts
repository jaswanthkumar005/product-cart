import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import {Product} from '../product.model';
import { PaginationControlsComponent } from 'ngx-pagination';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
   products:any;
   searchKeyword:string;
   data:Array<any>;
   totalRecords:Number;
   page:Number = 1;
  constructor(private productservice:ProductService) {
    this.data = new Array<any>();
  }

  ngOnInit() {
   this.productservice.getProduct().subscribe((product) => {
    this.products = product ;
    console.log(this.products,"ptob")
    const filteredItem = this.products.filter((product) => {
     return  product.availableQuantity > 0;
    })
    this.products = filteredItem;
    this.data = filteredItem;
    console.log(filteredItem);
    this.totalRecords = filteredItem.length;


  });
  this.productservice.getpostListener();

  }



  fetchProducts(){
   return this.productservice.fetchProduct(this.products);
  }
  addProductToCart(product){
   console.log(product);
   this.productservice.getOrderedProduct(product);
  }
}
