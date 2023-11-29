import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProducts } from 'src/app/model/iproducts';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() element!:IProducts
  amount:number=1
  showQuantity:boolean=false
  @Output() item:EventEmitter<any>
  constructor(){
    this.item=new EventEmitter<any>()
  }
  add(){
    this.item.emit({item:this.element,quantity:this.amount})
    this.showQuantity=false
  }
}
