import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http:HttpClient) { 

  }
  createNewCart(Model:any){
    let httpOptions = {
      headers:new HttpHeaders({
        'Content-Type':  'application/json',
      })
    }
    return this.http.post(`${environment.APIURL}/carts`,JSON.stringify(Model),httpOptions)
  }
}
