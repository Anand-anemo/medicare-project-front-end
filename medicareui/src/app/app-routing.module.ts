import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './auth/auth.guard';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ShowProductDetailsComponent } from './show-product-details/show-product-details.component';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import { ProductResolveService } from './product-resolver.service';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { BuyProductResolverService } from './buy-product-resolver.service';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { CategoryComponent } from './category/category.component';
import { CategoryResolverService } from './services/category-resolver.service';

const routes: Routes = [
  {
    path: '', component: HomeComponent

  },
  {
    path: 'admin', component: AdminComponent , canActivate:[AuthGuard], data:{roles:['Admin']},
  },
  {
    path: 'user', component: UserComponent, canActivate:[AuthGuard], data:{roles:['User']},
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'forbidden', component: ForbiddenComponent
  },
  {
    path:'addNewProduct', component: AddNewProductComponent , canActivate:[AuthGuard], data:{roles:['Admin']},
    resolve:{
      product:ProductResolveService
    }
  },
  {
    path:'showProductDetails', component: ShowProductDetailsComponent
  },
  {
    path:'productViewDetails' , component: ProductViewDetailsComponent ,  resolve: { product: ProductResolveService },
  },
  {
    path:'buyProduct' , component: BuyProductComponent , resolve: {productDetails: BuyProductResolverService},
  },
  {
    path:'orderConfirm' , component: OrderConfirmationComponent
  },
  {
    path:'category' , component: CategoryComponent , resolve:{
      category: CategoryResolverService
    }
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
