import { Component, OnInit } from '@angular/core';
import { Category } from '../model/category.model';
import { NgForm } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  isNewCategory = true;
  categoryDetails:Category[]=[];
  displayedColumns: string[] = ['Id', 'Category Name', 'Edit', 'Delete'];

  category: Category = {
    categoryName: '',
    id: null
  }
  constructor(private categoryService: CategoryService, private snack: MatSnackBar,
    private route:Router,private activatedRoute:ActivatedRoute) { }
  ngOnInit(): void {
    this.getCategories();
    this.category=this.activatedRoute.snapshot.data['category']
    if(this.category && this.category.id){
      this.isNewCategory = false;
    }

  }
  addcategory(categoryForm: NgForm) {

    if (this.category.categoryName.trim() == '' || this.category.categoryName == null) {
      this.snack.open('Name Required !! ', '', { duration: 3000, });
      return;

    }
    this.categoryService.addCategory(this.category).subscribe({
      next: (res) => {this.getCategories();
        categoryForm.reset();
        
        Swal.fire('success', 'category added', 'success')},
      error: (err) => console.log(err),
      complete: () => console.log()
    });

  }

  public getCategories(){
    this.categoryService.getCategories().subscribe({
      next:(res:Category[]) => {console.log(res)
        this.categoryDetails=res;
      
    },
      error:(err)=>console.log(err),
      complete:()=>console.log('done')
       });

  }

  public deleteCategory(id:any){
    this.categoryService.deleteCategory(id).subscribe({
      next:(res)=>{this.getCategories();
      Swal.fire('success','successfully delete','success')},
      error:(err)=>console.log(err),
      complete:()=>console.log('deleted')

    });
  }

  public editCategory(id:any){
    this.route.navigate(['/category',{id: id}]);

  }


}
