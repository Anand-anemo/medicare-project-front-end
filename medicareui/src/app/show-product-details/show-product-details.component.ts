import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product } from '../model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImageDialogComponent } from '../show-product-image-dialog/show-product-image-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css']
})
export class ShowProductDetailsComponent implements OnInit {

  showLoadMoreProductButton = false;

  showTable = false;
 // checked = false;

  pageNumber: number = 0;
  productDetails: Product[] = [];
  displayedColumns: string[] = ['ProductId', 'Product Name', 'Brand', 'Quantity', 'Description', 'Discount Price', 'Actual Price', 'Status', 'Images', 'Edit', 'Delete'];
  constructor(private productService: ProductService , public imagesDialog:MatDialog,
    private imageProcessingService:ImageProcessingService,private router:Router) {

  }
  ngOnInit(): void {
    // this.getAllProducts();
    this.getProduct();

  }
  // public getAllProducts() {
  //   this.showTable = false;
  //   this.productService.getAllProducts(this.pageNumber).subscribe(
  //     (resp: Product[]) => {
  //       console.log(resp);

  //       resp.forEach(product => this.productDetails.push(product));
  //       this.showTable = true;

  //       if (resp.length == 12) {
  //         this.showLoadMoreProductButton = true;
  //       } else {
  //         this.showLoadMoreProductButton = false;
  //       }



  //     }, (error: HttpErrorResponse) => {
  //       console.log(error);
  //     }

  //   );
  // }
  public getProduct(){
    this.productService.getProduct().pipe(map((x:Product[],i)=>x.map((product:Product)=>this.imageProcessingService.createImages(product)))).subscribe({
      next:(res:any)=>{console.log(res)
      res.forEach(product=>this.productDetails.push(product));
    this.showTable=true},
      error:(err)=>console.log(err),
      complete:()=>console.log('complete')
    })
  }

  deleteProduct(productId) {

    this.productService.deleteProduct(productId).subscribe(
      (resp) => {
        this.getProduct();
      }, (error: HttpErrorResponse) => {
        console.log(error)
      }
    );


  }

  showImages(product:Product){

    this.imagesDialog.open(ShowProductImageDialogComponent,{
      data:{
        images:product.productImages
      },
      height: '500px',
      width:'800px'

    });
    
  }

  editProduct(productId){
    this.router.navigate(['/addNewProduct',{productId:productId}]);

  }

  // loadMoreProduct() {
  //   this.pageNumber = this.pageNumber + 1;
  //   this.getAllProducts();
  // }

}
