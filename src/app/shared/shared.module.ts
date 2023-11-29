import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";
import { SelectComponent } from './components/select/select.component';
import { SpinnerComponent } from './components/spinner/spinner.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SelectComponent,
    SpinnerComponent

  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:'toast-center-center',
      preventDuplicates:true,
      timeOut:4000,
      easing:'ease-in',
      easeTime:1000

    }),
    NgxSpinnerModule.forRoot({ type: 'line-spin-clockwise-fade-rotating' })

  ],
  exports : [
    HeaderComponent,
    SelectComponent
    ]
})
export class SharedModule { }
