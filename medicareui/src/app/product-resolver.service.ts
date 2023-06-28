 import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';


import { ImageProcessingService } from './image-processing.service'
import { map } from 'rxjs/operators';
import { Product } from './model/product.model';
import { ProductService } from './services/product.service';

@Injectable({
  providedIn: "root",
})
export class ProductResolveService implements Resolve<Product> {
  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> {
    const pId = route.paramMap.get("productId");

    if (pId) {
      //then we have to fetch details from backend
       return this.productService.getProductById(pId)
              .pipe(
                map(p => this.imageProcessingService.createImages(p))
              );
    } else {
      // return empty product observable.
      return of(this.getProductDetails());
    }
  }

  getProductDetails() {
    return {
      productId:null,
      productName: "",
      active:false,
      brand:'',
      quantity:0,
      productDescription: "",
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages: [],
      category:{
        id:0
    }
    };
  }
}