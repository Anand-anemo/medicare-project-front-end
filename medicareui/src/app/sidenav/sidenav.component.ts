import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../model/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  categoryDetails: Category[];

  constructor(private categoryService:CategoryService , private router:Router){

  }
  ngOnInit(): void {
    this.getCategories();
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

  // public Pcategory(id){
  //   this.router.navigate(['/productview' , {id:id}]);

  // }


}
