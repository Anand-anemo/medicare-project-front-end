import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { OrderDetails } from '../model/order-details.model';
import { AddNewProductComponent } from '../add-new-product/add-new-product.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }

  public addProduct(product: FormData){
       return this.httpClient.post<Product>("http://localhost:8080/product/", product);
  }
  // public getAllProducts(pageNumber , searchKeyword: string = ""){
  //   return this.httpClient.get<Product[]>("http://localhost:8080/getAllProducts?pageNumber="+ pageNumber+"&searchKey="+searchKeyword);
  // }
  public getProduct(){
    return this.httpClient.get<Product[]>("http://localhost:8080/product/");
  }

  public deleteProduct(productId:any){
     return this.httpClient.delete("http://localhost:8080/product/"+productId);

  }
  public getProductById(productId){
    return this.httpClient.get<Product>("http://localhost:8080/product/"+productId)
  }
  // public getProductDetailsById(productId) {
  //   return this.httpClient.get<Product>("http://localhost:8080/getProductDetailsById/"+productId);
  // }
  public getProductDetails(isSingleProductCheckout, productId) {
    return this.httpClient.get<Product[]>("http://localhost:8080/product/getProductDetails/"+isSingleProductCheckout+"/"+productId);
  }
  public placeOrder(orderDetails: OrderDetails) {
    return this.httpClient.post("http://localhost:8080/placeOrder", orderDetails);
  }
}
