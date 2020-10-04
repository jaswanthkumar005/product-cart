import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css']
})
export class ProductOrderComponent implements OnInit {

  orderedList:any[]=[]

  constructor( private productservice:ProductService) { }

  ngOnInit() {
    this.orderedList=this.productservice.getOrder();
    this.productservice.getupdatedListener().subscribe((product) =>{
      this.orderedList = product;
      console.log(this.orderedList);
    } );
  }
  removeItem(product){
    console.log(product);
   this.productservice.removeProduct(product);
  }
  checkoutOrder(){

    const orders = {};
    for(let order of this.orderedList){
     /* orders.push({
        "orderId":order.productId,
        "customerId":order.productId,
       "productId": order.productId,
       "quantity": order.num
      })*/
      orders["orderId"] = order.productId;
      orders["customerId"] = order.productId;
      orders["productId"] = order.productId;
      orders["quantity"] = order.num;
      console.log(JSON.stringify(orders),"order");
      this.productservice.postOrder(orders);
    }

    //alert(JSON.stringify(orders));

  }

}
