import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import {Product} from '../product.model';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
   products:Product;
  constructor(private productservice:ProductService) { }

  ngOnInit() {
   this.productservice.getProduct().subscribe((product) => {
    this.products=product ;
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
