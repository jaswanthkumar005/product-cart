import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as uuid from 'uuid';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
   myId = uuid.v4();
   //createProduct:Product;
  constructor(private route: Router,private activeRoute:ActivatedRoute,private productService:ProductService) { }

  ngOnInit() {
  }

  postProduct(form:NgForm){
    const createProduct = {
      "productName":form.value.productName,
      "productId": this.myId,
      "availableQuantity":form.value.quantity
    }
    console.log(createProduct);
    this.productService.postProd(createProduct);
    this.route.navigate(['/'], {relativeTo:this.activeRoute});
  }

}
