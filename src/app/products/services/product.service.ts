import { IProducts } from './../../model/iproducts';
import { retry, Observable, throwError, catchError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { SharedService } from 'src/app/shared/services/shared.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 404){
      return throwError(() => new Error('Error in Server'));
    }else if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    // console.error('An error occurred:', error.error);
    return throwError(() => new Error('ERR_INTERNET_DISCONNECTED'));
  } 
    return throwError(() => new Error('Something bad happened; please try again later.'));

  }
  getAllProducts():Observable<IProducts[]>{
    return this.http.get<IProducts[]>(`${environment.APIURL}/products`).pipe(
      retry(2),
      catchError(this.handleError)
    )
  } 
  getAllCategory():Observable<string[]>{
    return this.http.get<string[]>(`${environment.APIURL}/products/categories`).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
  getProductByCategoires(cat:string):Observable<IProducts[]>{
    return this.http.get<IProducts[]>(`${environment.APIURL}/products/category/${cat}`).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
  getProductByTd(productId:number):Observable<IProducts>{
    return this.http.get<IProducts>(`${environment.APIURL}/products/${productId}`).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }
}
