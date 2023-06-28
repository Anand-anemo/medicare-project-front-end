import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { FormControl, NgForm } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/category.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

   product: Product = {
    productId: null,
    productName: "",
    active: true,
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: [],
    brand: '',
    quantity: 0,
    category:{
      id:0,
      
    }
  }

  categories=[];





  constructor(private productService: ProductService, private sanitizer: DomSanitizer,
    private categoryService:CategoryService,private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {

      this.product=this.activatedRoute.snapshot.data['product'];

      this.categoryService.getCategories().subscribe((data:any)=>
      this.categories=data
      );
    

      //  this.product=this.activatedRoute.snapshot.data['product'];

  }
  // addingCategories(){
  //   this.categoryService.getCategories().subscribe((data:any)=>
  //   this.categories=data
  //     );
  // }


 addProduct(productForm: NgForm) {

    const productFormData = this.prepareFormData(this.product);


    this.productService.addProduct(productFormData).subscribe(
      (response: Product) => {
        productForm.reset();
        this.product.productImages = [];
        Swal.fire('success','product added !!!','success');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );


  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));

    for (var i = 0; i < this.product.productImages.length; i++) {
      formData.append('imageFile', product.productImages[i].file,
        product.productImages[i].file.name
      );
    }

    return formData;

  }
  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {

        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )


      }
      this.product.productImages.push(fileHandle);
    }

  }

  public removeImages(i: number) {
    this.product.productImages.splice(i, 1);
  }

  




}
