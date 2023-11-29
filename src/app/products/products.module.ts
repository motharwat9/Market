import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './components/product/product.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AllProductsComponent,
    ProductsDetailsComponent,
    ProductComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgxSpinnerModule.forRoot({ type: 'line-spin-clockwise-fade-rotating' }),
    RouterModule


  ],

})
export class ProductsModule { }
