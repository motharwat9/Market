export interface ItemCart {
  item: {
    category:string,
    description:string,
    id:string,
    image:string,
    price:number
    rating?:{
      count:number,
      rate:number
    }
  },
  quantity:number
}
