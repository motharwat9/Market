import { Subscription } from 'rxjs';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProducts } from 'src/app/model/iproducts';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ItemCart } from 'src/app/View-Model/item-cart';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements  OnInit{

  subscriptions:Subscription[]=[];
  products:IProducts[]=[];
  catigroies:string[]=[];
  additemToCart:ItemCart[]=[];
  constructor(private srvice:ProductService,
              private shared:SharedService,){
  }


  ngOnInit(): void {

    this.getAllProduct();
    this.getAllCategories();
  }
  filterCatogry(categiory:string){
    (categiory === 'All')?this.getAllProduct():this.getProductByCat(categiory)  
  }
  getAllProduct(){
    this.shared.showSpinner();
    let allProducts= this.srvice.getAllProducts().subscribe({
      next:(data:IProducts[])=>{
        this.shared.hideSpinner();
        this.products=data
      },
      error:(error:HttpErrorResponse)=>{
        this.shared.showError(error.message,'Error')
        this.shared.hideSpinner();
      },
      complete:()=>{
        this.shared.hideSpinner();
        console.log("OK")
      }
    })

    this.subscriptions.push(allProducts);

  }
  getAllCategories(){
    let allCategory=this.srvice.getAllCategory().subscribe(cat=>{
      this.catigroies=cat
    })
    this.subscriptions.push(allCategory);
    
  }
  getProductByCat(cat:string){
    this.shared.showSpinner();
    let productsByCat=this.srvice.getProductByCategoires(cat).subscribe(cat=>{
      this.shared.hideSpinner();
      this.products=cat;
    })
    this.subscriptions.push(productsByCat);
  }
  addToCart(obj:ItemCart){
    if('cart' in localStorage){
      this.additemToCart = JSON.parse(localStorage.getItem('cart')!)
      if(this.additemToCart.find(item=>item.item.id == obj.item.id)){
        this.shared.showError('this item is already exsit','Error')
      }else{
        this.additemToCart.push(obj);
        localStorage.setItem('cart',JSON.stringify(this.additemToCart));
      }
    }else {
      this.additemToCart.push(obj);
      localStorage.setItem('cart',JSON.stringify(this.additemToCart));
    }
  }
  
}

