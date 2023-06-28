import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) { }
  
   
  public addCategory(category){
    return this.httpClient.post<Category>("http://localhost:8080/category/",category);
  }
  public getCategories(){
    return this.httpClient.get<Category[]>("http://localhost:8080/category/");
  }
  public deleteCategory(id:number){
    return this.httpClient.delete("http://localhost:8080/category/" + id);

  }
  public getCategoryById(id){
    return this.httpClient.get<Category>("http://localhost:8080/category/"+ id);
  }
}
