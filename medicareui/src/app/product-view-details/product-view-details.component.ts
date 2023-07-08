import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import Swal from 'sweetalert2';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css']
})
export class ProductViewDetailsComponent implements OnInit {

  selectProductIndex=0;

  product: Product;

  constructor(private activatedRoute: ActivatedRoute , private router:Router , 
    private productService: ProductService,
    private userAuthService: UserAuthService){

  }
  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);
  }

  addToCart(productId) {
    this.productService.addToCart(productId).subscribe(
      (response) => {
      if(response==null){
        Swal.fire('product already exist in cart','product already exist in cart !!!','success');
      }
      Swal.fire('product added to the cart','product added ','success');
        console.log(response);
      }, (error)=> {
        console.log(error);
      }
    );
  }

  changeIndex(index){
    this.selectProductIndex = index;
  }

   buyProduct(productId){
    this.router.navigate(['/buyProduct' , {isSingleProductCheckout: true, id: productId}]);

   }

   public isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }
  
  



}
