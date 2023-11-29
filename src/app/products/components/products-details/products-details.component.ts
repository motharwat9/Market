import { SharedService } from 'src/app/shared/services/shared.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { IProducts } from 'src/app/model/iproducts';
import { Location } from '@angular/common';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent implements OnInit {
  productId:number=0;
  product:IProducts |null=null
  constructor(private route:ActivatedRoute
              ,private productService:ProductService
              ,private sharedService:SharedService
              ,private location:Location){

                
              }
  ngOnInit(): void {
    this.productId=Number(this.route.snapshot.paramMap.get('pid'))
    console.log(this.productId)
    this.getProduct()
  }
  getProduct(){
    this.productService.getProductByTd(this.productId).subscribe(res=>{
      this.sharedService.showSpinner()
      this.product=res
      this.sharedService.hideSpinner()
    })
  }
  goBack(){
    this.location.back()
  }

}
