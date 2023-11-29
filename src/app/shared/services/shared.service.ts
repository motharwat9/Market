import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {NgxSpinnerService }from "ngx-spinner"
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private toaster:ToastrService,
              private spinner:NgxSpinnerService ) { }

  showSuccess(title:any,message:any){
    this.toaster.success(title,message)
  }
  showError(title:any,message:any){
    this.toaster.error(title,message)
  }
  showWarning(title:any,message:any){
    this.toaster.warning(title,message)
  }
  showInfo(title:any,message:any){
    this.toaster.info(title,message)
  }
  showSpinner(){
    this.spinner.show()
  }
  hideSpinner(){
    this.spinner.hide()
  }

}
