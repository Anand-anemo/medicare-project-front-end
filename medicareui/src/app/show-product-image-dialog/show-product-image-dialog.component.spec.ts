import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProductImageDialogComponent } from './show-product-image-dialog.component';

describe('ShowProductImageDialogComponent', () => {
  let component: ShowProductImageDialogComponent;
  let fixture: ComponentFixture<ShowProductImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProductImageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProductImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
