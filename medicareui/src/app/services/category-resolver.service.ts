import { Injectable } from '@angular/core';
import { Category } from '../model/category.model';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryResolverService implements Resolve<Category> {

  constructor(private categoryService:CategoryService) { }
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<Category> {
    const id = route.paramMap.get("id");
    if(id){

      return this.categoryService.getCategoryById(id)


    }
    else{
      return of(this.getCategoryDetails());

    }
    }
    getCategoryDetails(){
      return{
        id:null ,
        categoryName:''

      };
    }
    
}
