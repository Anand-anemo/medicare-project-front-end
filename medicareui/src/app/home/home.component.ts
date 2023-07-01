import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
//import { HttpErrorResponse } from '@angular/common/http';

import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageNumber: number = 0;
  showLoadButton = false;

  productData = [];

  constructor(private productService: ProductService, private imageProcessingService: ImageProcessingService,
    private router: Router) {

  }
  ngOnInit(): void {
    this.getProduct();
  }

  searchByKeyword(searchkeyword) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.productData = [];
    this.getProduct(searchkeyword);
  }

  public getProduct(searchKey: string = "") {
    this.productService.getProduct(this.pageNumber, searchKey)
      .pipe(map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product))))
      .subscribe({
        next: (res: any) => {
          console.log(res)
         // this.productData = res;
          if (res.length == 12) {
            this.showLoadButton = true;
          } else {
            this.showLoadButton = false;
          }
          res.forEach(p => this.productData.push(p));
        },
        error: (err) => console.log(err),
        complete: () => console.log('complete')
      });
  }


  

  // public getAllProducts(searchKey: string=""){
  //   this.productService.getAllProducts(this.pageNumber , searchKey)

  //   .pipe(
  //     map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
  //   )
  //   .subscribe(
  //     (resp:Product[])=>{
  //       console.log(resp);
  //       if(resp.length == 12) {
  //         this.showLoadButton = true;
  //       } else {
  //         this.showLoadButton = false;
  //       }
  //       resp.forEach(p=> this.productDetails.push(p));


  //     },(error: HttpErrorResponse)=> {
  //       console.log(error);
  //     }

  //   );
  // }

  showProductDetails(productId) {

    this.router.navigate(['/productViewDetails', { productId: productId }]);

  }
  public loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getProduct();
  }


}
