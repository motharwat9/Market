import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {

  shoppingCart: any[] = [];
  totalPrice: number = 0;
  dataLocalStorage: boolean = localStorage.getItem('cart') ? true : false;
  constructor(private share:SharedService,private services:CartService){}
  ngOnInit(): void {
    this.getAllProductFromLoacal();
  }
  getAllProductFromLoacal() {
    if ('cart' in localStorage) {
      this.shoppingCart = JSON.parse(localStorage.getItem('cart')!);
      this.getTotalCart();
    } 
  }
  getTotalCart() {
    this.totalPrice = 0;
    if ('cart' in localStorage) {
      for (let item of this.shoppingCart) {
        this.totalPrice += item.item.price * item.quantity;
      }
    } else {
      this.totalPrice = 0;
    }
  }
  minProduct(index: number) {
    if (this.shoppingCart[index].quantity == 1) {
      if(this.shoppingCart.length == 1){
        this.clearAllProduct()
      }else {
        this.deleteProduct(index)
      }
    }else {
      this.shoppingCart[index].quantity--;
      this.getTotalCart()
      localStorage.setItem('cart', JSON.stringify(this.shoppingCart));
    }
  }
  addProduct(index: number) {
    this.shoppingCart[index].quantity++;
    this.getTotalCart()
    localStorage.setItem('cart', JSON.stringify(this.shoppingCart));
  }
  detectchange(index:number) {
    if(this.shoppingCart[index].quantity >0){
      localStorage.setItem('cart', JSON.stringify(this.shoppingCart));
    }else {
      if(this.shoppingCart.length <= 1){
        this.clearAllProduct()
      }else{
        this.share.showError('is quantity equal or more one','Error')
        this.deleteProduct(index)
        localStorage.setItem('cart', JSON.stringify(this.shoppingCart));
      }
    }
    this.getTotalCart()
  }
  deleteProduct(index:number){
    if(this.shoppingCart.length == 1){
      this.clearAllProduct()
      this.shoppingCart= [];
    }else {
      this.shoppingCart.splice(index,1)
      this.getTotalCart()
      localStorage.setItem('cart',JSON.stringify(this.shoppingCart))
    }
  }
  clearAllProduct(){
    localStorage.removeItem('cart')
    this.dataLocalStorage=false
    this.shoppingCart= [];
    this.getTotalCart()
  }
  sendModelCart(){
    let products=this.shoppingCart.map(ele=>{
      return {productId:ele.item.id,quantity:ele.quantity}
    })

    let Model= {
      userId:5,
      date:new Date(),
      products:products
    }
    this.services.createNewCart(Model).subscribe(res=>{
      this.share.showSuccess('Order Is Success','Success')
      this.clearAllProduct()
    })
  }
}
