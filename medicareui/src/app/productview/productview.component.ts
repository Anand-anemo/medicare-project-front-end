import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ImageProcessingService } from '../image-processing.service';
import { Product } from '../model/product.model';
import { Subscription, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-productview',
  templateUrl: './productview.component.html',
  styleUrls: ['./productview.component.css']
})
export class ProductviewComponent implements OnInit {
  productData = [];
  private routeSub: Subscription;
  constructor(private productService:ProductService , 
    private imageProcessingService: ImageProcessingService,
    private route: ActivatedRoute , private router: Router){

     

  }
  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
    
      this.productService.getActiveProductOfCategory(params['id'])
      .pipe(map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product))))
      .subscribe({
        next: (res: any) => {
          console.log(res)
          this.productData = res;
          
          //res.forEach(p => this.productData.push(p));
        },
        error: (err) => console.log(err),
        complete: () => console.log('complete')
      });
     
    });

    
    
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  // public getProductByCategory(params['id']) {
  //   this.productService.getProductByCategory(params['id'])
  //     .pipe(map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product))))
  //     .subscribe({
  //       next: (res: any) => {
  //         console.log(res)
  //        // this.productData = res;
          
  //         res.forEach(p => this.productData.push(p));
  //       },
  //       error: (err) => console.log(err),
  //       complete: () => console.log('complete')
  //     });
  // }

  
  // showProductDetails(productId) {

  //   this.router.navigate(['/productViewDetails', { productId: productId }]);

  // }
  showProductDetails(productId) {

    this.router.navigate(['/productViewDetails', { productId: productId }]);

  }

}
