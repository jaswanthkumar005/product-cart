import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from './product.model';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  orderedProduct:any[]=[];
  products:Product[]=[];
  private ordersUpdated = new Subject<Product[]>();
  private postProducts = new Subject<Product[]>();
  constructor(
    private http:HttpClient,
    private route:Router,
    private activateRoute: ActivatedRoute
    ) { }

  getProduct(){
    return this.http.get<Product>("https://uiexercise.onemindindia.com/api/Product");
  }

  getOrderedProduct(product){
    const productExist = this.orderedProduct.find(({productName}) => productName === product.productName );

    if(!productExist){
      product.availableQuantity -= 1;
      this.orderedProduct.push({...product,num:1});
      console.log(this.orderedProduct);
    } else {
      product.availableQuantity -= 1;
      productExist.num +=1;
    }

    console.log(this.orderedProduct);
    this.ordersUpdated.next([...this.orderedProduct]);
  }
  getupdatedListener(){
    return this.ordersUpdated.asObservable();
   }
   getpostListener(){
     return this.postProducts.asObservable();
   }
  getOrder(){
     this.ordersUpdated.next([...this.orderedProduct]);
     return this.orderedProduct;
  }

  fetchProduct(product){
    this.postProducts.next(product);
  }

  removeProduct(product){
    const productExist = product.num;
    product.availableQuantity += product.num;
    console.log(product,"product");
     this.orderedProduct=this.orderedProduct.filter(({productName}) => {
      return productName !== product.productName;
    });

     this.ordersUpdated.next([...this.orderedProduct]);

  }

  postProd(createProduct){
   this.http.post<any>("https://uiexercise.onemindindia.com/api/Product",createProduct).subscribe((message) => {
     console.log(message);

   })
  }

  postOrder(orders){
    this.http.post<any>("https://uiexercise.onemindindia.com/api/OrderProducts",orders).subscribe((product) =>{
      console.log(product);

      this.ordersUpdated.next([]);
      this.orderedProduct = [];
      this.route.navigate(['/'],{relativeTo:this.activateRoute});
    },
    (error) => {
      console.log(error);
    } )
  }
}
