import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileHandle } from '../model/file-handle.model';

@Component({
  selector: 'app-show-product-image-dialog',
  templateUrl: './show-product-image-dialog.component.html',
  styleUrls: ['./show-product-image-dialog.component.css']
})
export class ShowProductImageDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any){}
  ngOnInit(): void {
    this.recieveImages();
    
  }
  recieveImages(){
     
  }

}
